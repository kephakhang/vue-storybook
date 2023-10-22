<script lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import {
  computed,
  defineComponent,
  ref,
  watch,
  inject,
} from "@vue/composition-api";
import { onClickOutside } from "@vueuse/core";

import type { NotificationCategory } from "~/types/Notification";

import { notificationContextKey } from "../keys";
import { useAvatarColors } from "../hooks/useAvatarColors";
import { useNotificationsQuery } from "../hooks/useNotificationsQuery";
import { toTitleCase } from "../utils/toTitleCase";
import NotificationDrawerHeader from "./notification-drawer-header.vue";
import NotificationDrawerListView from "./notification-drawer-list-view.vue";
import NotificationSidebarButton from "./notification-sidebar-button.vue";

type DrawerSidebarItemType = NotificationCategory | "UNREAD" | "HISTORY_LOG";

export default defineComponent({
  components: {
    NotificationDrawerHeader,
    NotificationDrawerListView,
    NotificationSidebarButton,
  },
  setup() {
    const {
      triggerElement,
      isAdminUser,
      isDrawerOpened,
      setNotification,
      readNotificationById,
      readNotifications,
    } = inject(notificationContextKey)!;

    const drawer = ref<HTMLElement | null>(null);
    const isActivated = ref(false);
    const selectedCategory =
      ref<Exclude<DrawerSidebarItemType, "HISTORY_LOG">>("UNREAD");

    const categories = computed(() => {
      const categories: DrawerSidebarItemType[] = [
        "UNREAD",
        "ALERT",
        "WORK_ORDER",
        "NOTE",
        "USER_ACCESS",
        // TODO(sun.lee): Uncomment when data request feature is ready
        // "DATA_REQUEST",
        "HISTORY_LOG",
      ];
      return categories.filter((category) => {
        if (category !== "USER_ACCESS") return true;
        return isAdminUser.value;
      });
    });

    const computedCategory = computed(() => {
      return selectedCategory.value === "UNREAD"
        ? undefined
        : selectedCategory.value;
    });

    const queryClient = useQueryClient();

    onClickOutside(
      drawer,
      () => {
        isDrawerOpened.value = false;
      },
      { ignore: [triggerElement] }
    );

    watch(computedCategory, (category) => {
      queryClient.invalidateQueries(["unreadNotifications", category]);
      queryClient.invalidateQueries(["readNotifications", category]);
    });

    const {
      isLoading,
      data: notifications,
      getReadNotificationQueryResult,
      fetchNextNotifications,
    } = useNotificationsQuery(computedCategory);

    const senders = computed(() => {
      if (!notifications.value) return new Set<string>();
      return new Set(
        notifications.value.map((notification) => notification.senderName)
      );
    });
    const senderColors = useAvatarColors(senders);

    const onSidebarButtonClick = (category: DrawerSidebarItemType) => {
      if (category === "HISTORY_LOG") return moveToHistoryPage();
      selectedCategory.value = category;
    };

    const moveToHistoryPage = () => {
      const targetPath = "/admin/not-his";
      if (window.location.pathname === targetPath) return;
      window.location.href = targetPath;
      return;
    };

    const readUnreadNotifications = async (category?: NotificationCategory) => {
      try {
        await readNotifications(category);
        queryClient.invalidateQueries(["unreadNotifications"]);
        queryClient.invalidateQueries(["readNotifications"]);
      } catch (error) {
        // TODO(sun.lee): handle error
      }
    };

    return {
      drawer,
      isAdminUser,
      isDrawerOpened,
      isActivated,
      isLoading,
      notifications,
      selectedCategory,
      computedCategory,
      senderColors,
      isFetchingNextPage: getReadNotificationQueryResult.isFetchingNextPage,
      categories,
      setNotification,
      readUnreadNotifications,
      readNotificationById,
      toTitleCase,
      onSidebarButtonClick,
      fetchNextNotifications,
    };
  },
});
</script>
<template>
  <div
    ref="drawer"
    :style="{
      display: 'flex',
      height: 'calc(100vh - 62px)',
      position: 'fixed',
      bottom: 0,
      // sidebar width(80px) + header width(420px) + box shadow width(4px)
      right: isDrawerOpened ? 0 : '-504px',
      zIndex: 100,
      transition: 'right 0.3s ease-in-out',
    }"
  >
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
        width: '80px',
        alignItems: 'center',
        borderRight: '1px solid #8B8B8B',
        backgroundColor: 'white',
      }"
    >
      <div style="height: 40px"></div>
      <div
        v-for="category in categories"
        :key="category"
      >
        <NotificationSidebarButton
          style="margin-top: 20px"
          :selected="selectedCategory === category"
          @click="() => onSidebarButtonClick(category)"
        >
          <template #icon>
            <img
              v-if="category === 'UNREAD'"
              src="~assets/images/icon/unread.svg"
              alt="unread icon"
            />
            <img
              v-else-if="category === 'ALERT'"
              src="~assets/images/icon/alert-with-circle.svg"
              alt="alert icon"
            />
            <img
              v-else-if="category === 'WORK_ORDER'"
              src="~assets/images/icon/work-order.svg"
              alt="work order icon"
            />
            <img
              v-else-if="category === 'USER_ACCESS'"
              src="~assets/images/icon/user-access.svg"
              alt="User Access icon"
            />
            <img
              v-else-if="category === 'NOTE'"
              src="~assets/images/icon/note.svg"
              alt="note icon"
            />
            <img
              v-else-if="category === 'DATA_REQUEST'"
              src="~assets/images/icon/data-request.svg"
              alt="history log icon"
            />
            <img
              v-else
              src="~assets/images/icon/history-log.svg"
              alt="note icon"
            />
          </template>
          {{ toTitleCase(category) }}
        </NotificationSidebarButton>
      </div>
    </div>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        width: '420px',
      }"
    >
      <NotificationDrawerHeader
        :key="isActivated"
        :is-activated="isActivated"
        :on-toggled="setNotification"
        :read-all-messages="() => readUnreadNotifications(computedCategory)"
      />
      <div
        :style="{
          width: '100%',
          height: 'calc(100% - 52px)',
          backgroundColor: 'white',
        }"
      >
        <NotificationDrawerListView
          :category="computedCategory"
          :on-scroll-bottom="fetchNextNotifications"
          :sender-colors="senderColors"
          :read-notification="readNotificationById"
          :is-loading="isLoading"
          :notifications="notifications ?? []"
          :is-fetching-next-page="isFetchingNextPage"
        />
      </div>
    </div>
  </div>
</template>
