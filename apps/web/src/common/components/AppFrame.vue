<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuArrow,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "radix-vue";
import { AppBar, AppBarItem, SideBar, SideBarItem } from "@emdn/ui";
import { Icon } from "@iconify/vue";
import { useQueryClient } from "@tanstack/vue-query";
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";

import {
  onNotification,
  useMenuList,
  useAppInfo,
  unreadNotificationKeys,
  useUnreadNotificationsQuery,
} from "../hooks";
import NotificationDrawer from "./NotificationDrawer.vue";

const { me, options, type } = useAppInfo();
const { appBarMenuList, appBarUtilMenuList, sideBarMenuList } = useMenuList();
const sideBarCategories = computed(() =>
  sideBarMenuList.value
    .filter((menu) => menu.type === "CATEGORY")
    .map((menu) => menu.title)
);

const isProfileDropdownOpen = ref(false);
const isNotificationDrawerOpen = ref(false);
const notificationDrawer = ref<HTMLElement | null>(null);
const notificationButton = ref<HTMLElement | null>(null);

onClickOutside(
  notificationDrawer,
  () => {
    isNotificationDrawerOpen.value = false;
  },
  { ignore: [notificationButton] }
);

const queryClient = useQueryClient();
onNotification((notification) => {
  void queryClient.invalidateQueries({
    queryKey: unreadNotificationKeys.all,
  });
  void queryClient.invalidateQueries({
    queryKey: unreadNotificationKeys.category(notification.notiCategory),
  });
});

const { data } = useUnreadNotificationsQuery();
const unreadNotificationCount = computed(() => data.value?.content.length ?? 0);
</script>
<template>
  <div class="flex h-screen w-screen flex-col">
    <AppBar
      :logo="options?.CLIENT.logoUrl ?? '#'"
      :type="type"
    >
      <AppBarItem
        v-for="menu in appBarMenuList"
        :key="menu.title"
        :selected="menu.active"
        :href="menu.url"
      >
        {{ menu.title }}
      </AppBarItem>
      <template #actions>
        <a
          v-for="menu in appBarUtilMenuList"
          :key="menu.title"
          :href="menu.url"
          class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[0.25rem] border-none bg-brand-100 hover:bg-brand-400"
        >
          <img
            class="h-4 w-4"
            :src="menu.iconUrl"
            alt="appbar icon"
          />
        </a>
        <div class="relative">
          <button
            ref="notificationButton"
            class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[0.25rem] border-none bg-brand-100 hover:bg-brand-400"
            @click="isNotificationDrawerOpen = !isNotificationDrawerOpen"
          >
            <Icon
              class="text-brand-700"
              icon="mdi:bell"
            />
          </button>
          <div
            v-if="unreadNotificationCount > 0"
            class="absolute -right-1.5 -top-1.5 flex h-3 min-w-[0.75rem] items-center justify-center rounded-full bg-red-600 p-0.5 text-xs text-white"
          >
            {{ unreadNotificationCount > 99 ? "99+" : unreadNotificationCount }}
          </div>
        </div>
        <DropdownMenuRoot :open="isProfileDropdownOpen">
          <DropdownMenuTrigger as-child>
            <button
              class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[0.25rem] border-none bg-brand-100 hover:bg-brand-400"
            >
              <Icon
                class="h-5 w-5 text-brand-700"
                icon="ic:round-person-2"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              align="end"
              class="rounded-sm border border-solid border-gray-200 bg-white"
            >
              <DropdownMenuLabel as-child>
                <p class="bg-[#f0f3f5] py-2 text-center text-sm font-bold">
                  Account
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator class="h-[1px] bg-gray-200" />
              <DropdownMenuLabel as-child>
                <div class="px-5 py-2">
                  <p class="text-base">{{ me?.name }}</p>
                  <p class="text-sm">{{ me?.email }}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator class="h-[1px] bg-gray-200" />
              <DropdownMenuItem class="cursor-pointer">
                <div class="flex items-center p-3 py-2">
                  <Icon
                    class="h-4 text-gray-200"
                    icon="ic:round-person-2"
                  />
                  <div class="w-5"></div>
                  <p class="text-base">Profile</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator class="h-[1px] bg-gray-200" />
              <DropdownMenuItem class="cursor-pointer">
                <div class="flex items-center p-3 py-2">
                  <Icon
                    class="h-3 text-gray-200"
                    icon="solar:lock-bold"
                  />
                  <div class="w-5"></div>
                  <p class="text-base">Logout</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuArrow />
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </template>
    </AppBar>
    <div class="flex grow overflow-hidden">
      <SideBar>
        <AccordionRoot
          type="multiple"
          collapsible
          :default-value="sideBarCategories"
        >
          <template v-for="menu in sideBarMenuList">
            <template v-if="menu.type === 'CATEGORY'">
              <AccordionItem
                :key="menu.title"
                :value="menu.title"
              >
                <AccordionHeader class="bg-brand-800">
                  <AccordionTrigger
                    class="group flex h-5 w-full items-center justify-between px-2"
                  >
                    <span class="text-xs text-white">
                      {{ menu.title }}
                    </span>
                    <Icon
                      class="h-3 w-3 text-blue-500 group-data-[state=open]:rotate-180"
                      icon="line-md:chevron-small-down"
                    />
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent
                  v-for="childMenu in menu.children"
                  :key="childMenu.title"
                  class="last:pb-4"
                >
                  <SideBarItem
                    :selected="childMenu.active"
                    :icon-url="childMenu.iconUrl"
                    :href="childMenu.url"
                  >
                    {{ childMenu.title }}
                  </SideBarItem>
                </AccordionContent>
              </AccordionItem>
            </template>
            <template v-else>
              <SideBarItem
                :key="menu.title"
                :selected="menu.active"
                :icon-url="menu.iconUrl"
                :href="menu.url"
              >
                {{ menu.title }}
              </SideBarItem>
            </template>
          </template>
        </AccordionRoot>
      </SideBar>
      <div class="flex grow flex-col">
        <div class="grow overflow-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <NotificationDrawer
      ref="notificationDrawer"
      :is-open="isNotificationDrawerOpen"
    />
  </Teleport>
</template>

<style>
:root {
  --app-bar-height: 3.75rem;
  --side-bar-height: 5.75rem;
}
</style>
