<script setup lang="ts">
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import { CtaButton, LineSpinner } from "@emdn/ui";
import { Icon } from "@iconify/vue";
import { useInfiniteScroll } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";

import {
  notificationApi,
  type NotificationsResponse,
  type NotificationCategory,
} from "../api";
import {
  readNotificationKeys,
  unreadNotificationKeys,
  useAppInfo,
  useAvatarColors,
  useNotifications,
} from "../hooks";
import NotificationDrawerItem from "./NotificationDrawerItem.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

defineProps<{
  isOpen: boolean;
}>();

const sidebarItems: Readonly<
  {
    icon: string;
    label: string;
    category?: NotificationCategory;
  }[]
> = [
  {
    icon: "emdn:unread",
    label: "Unread",
  },
  {
    icon: "mdi:bell-circle-outline",
    label: "Alert",
    category: "ALERT",
  },
  {
    icon: "emdn:work-order",
    label: "Work Order",
    category: "WORK_ORDER",
  },
  {
    icon: "emdn:note",
    label: "Note",
    category: "NOTE",
  },
  {
    icon: "emdn:user-access",
    label: "User Access",
    category: "USER_ACCESS",
  },
  {
    icon: "emdn:data-request",
    label: "Data Request",
    category: "DATA_REQUEST",
  },
  {
    icon: "emdn:history-log",
    label: "History Log",
  },
] as const;

const { me } = useAppInfo();
const shownSidebarItems = computed(() => {
  const isAdmin = me.value?.admin ?? false;
  return sidebarItems.filter((item) => {
    if (item.label === "User Access") return isAdmin;
    return true;
  });
});
const selectedItemIndex = ref(0);
const category = computed(
  () => shownSidebarItems.value[selectedItemIndex.value].category
);

const queryClient = useQueryClient();
const { notifications, isLoading, fetchNextNotifications, isFetchingMore } =
  useNotifications({ category });
const readNotificationsResult = useMutation({
  async mutationFn() {
    const res = await notificationApi.readNotifications();
    return res.data;
  },
  onSuccess() {
    void queryClient.invalidateQueries({
      queryKey: unreadNotificationKeys.base,
    });
  },
});
const readNotificationResult = useMutation({
  async mutationFn(id: number) {
    const res = await notificationApi.readNotificationById(id);
    return res.data;
  },
  onSuccess(_, id) {
    const data = queryClient.getQueryData<NotificationsResponse["data"]>(
      unreadNotificationKeys.category(category.value)
    );
    const notification = data?.content.find((item) => item.id === id);

    if (!notification) {
      void queryClient.invalidateQueries({
        queryKey: unreadNotificationKeys.base,
      });
      void queryClient.invalidateQueries({
        queryKey: readNotificationKeys.base,
      });
      return;
    }

    queryClient.setQueryData<NotificationsResponse["data"]>(
      unreadNotificationKeys.category(category.value),
      (old) => {
        if (!old) return old;
        return {
          ...old,
          content: old.content.filter((item) => item.id !== id),
        };
      }
    );
    void queryClient.invalidateQueries({
      queryKey: readNotificationKeys.category(category.value),
    });
  },
});

const senders = computed(() => {
  return notifications.value.map((notification) => notification.senderName);
});
const avatarColors = useAvatarColors(senders);

const onDrawerItemClick = async (id: number, link?: string) => {
  await readNotificationResult.mutateAsync(id);
  if (!link) return;
  const origin = new URL(location.href).origin;
  const linkTo = new URL(link, origin);
  location.href = linkTo.toString();
};

const onSideBarItemClick = (index: number) => {
  if (index === shownSidebarItems.value.length - 1) {
    location.href = "/admin/not-his";
    return;
  }
  selectedItemIndex.value = index;
};

const listView = ref<HTMLElement | null>(null);

watch(category, () => {
  listView.value?.scrollTo(0, 0);
});

useInfiniteScroll(
  listView,
  () => {
    fetchNextNotifications();
  },
  { distance: 20 }
);
</script>
<template>
  <div
    class="fixed bottom-0 right-0 flex h-[calc(100vh-var(--app-bar-height,3.75rem))] bg-white shadow-md transition duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Drawer Sidebar -->
    <div
      class="flex w-20 flex-col items-center gap-5 border-r border-r-gray-400 pt-10"
    >
      <button
        v-for="(item, index) in shownSidebarItems"
        :key="item.label"
        class="group grid w-full cursor-pointer place-items-center text-sm underline-offset-0 hover:underline"
        @click="() => onSideBarItemClick(index)"
      >
        <div
          class="grid h-8 w-8 place-items-center rounded-full"
          :class="
            selectedItemIndex === index
              ? 'bg-[#DAEEFF]'
              : 'group-hover:bg-[#007AFF4D]'
          "
        >
          <Icon
            class="h-8 w-8 text-brand-900"
            :class="item.icon === 'mdi:bell-circle-outline' ? 'p-0.5' : null"
            :icon="item.icon"
          />
        </div>
        <div class="h-1"></div>
        {{ item.label }}
      </button>
    </div>
    <!-- Drawer Main -->
    <div class="flex w-[420px] flex-col">
      <!-- Drawer Header -->
      <div
        class="flex h-[52px] w-full shrink-0 items-center border-b border-b-gray-400 bg-[#F5F8FF]"
      >
        <div class="w-6"></div>
        <p class="text-base font-bold">Notification</p>
        <div class="grow"></div>
        <CtaButton
          variant="text"
          class="text-base text-gray-300"
          @click="() => readNotificationsResult.mutate()"
        >
          Mark all as read
        </CtaButton>
        <div class="w-4"></div>
      </div>
      <!-- Drawer Content -->
      <div
        ref="listView"
        class="flex grow flex-col overflow-y-auto"
      >
        <div
          v-if="isLoading"
          class="grid grow place-items-center"
        >
          <LineSpinner class="h-6 w-6" />
        </div>
        <template v-else>
          <DynamicScroller
            class="h-full"
            :items="notifications"
            :min-item-size="52"
          >
            <template #default="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="[item.content]"
                :data-index="index"
              >
                <NotificationDrawerItem
                  :key="item.id"
                  :notification="item"
                  :avatar-color="
                    item.notiCategory === 'ALERT' ||
                    item.notiCategory === 'USER_ACCESS'
                      ? undefined
                      : avatarColors[item.senderName]
                  "
                  @click="() => onDrawerItemClick(item.id, item.linkTo)"
                />
                <div
                  v-if="isFetchingMore && index === notifications.length - 1"
                  class="grid place-items-center py-1"
                >
                  <LineSpinner class="h-4 w-4" />
                </div>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </template>
      </div>
    </div>
  </div>
</template>
