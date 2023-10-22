<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import Badge from "~/components/Badge/badge.vue";
import { movePage } from "~/utils/move-page";

import AppBarItem from "./components/app-bar-item.vue";
import AppBarIconButton from "./components/app-bar-icon-button.vue";
import type { AppBarMenu, AppBarSubMenu } from "./types";

import accountIconUrl from "~assets/images/icon/account.svg?url";
import notificationIconUrl from "~assets/images/icon/notification.svg?url";

export default defineComponent({
  name: "AppBar",
  components: { AppBarItem, AppBarIconButton, Badge },
  props: {
    companyLogoUrl: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    menuList: {
      type: Array as PropType<AppBarMenu[]>,
      required: true,
    },
    subMenuList: Array as PropType<AppBarSubMenu[]>,
  },
  setup() {
    return { accountIconUrl, notificationIconUrl };
  },
  methods: {
    movePage,
  },
});
</script>
<template>
  <div
    :style="{
      height: '3.75rem',
      width: '100vw',
      backgroundColor: '#040F31',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '0.25rem solid #152143',
      flexShrink: 0,
    }"
  >
    <div style="width: 1.25rem; min-width: 1rem"></div>
    <img
      :src="companyLogoUrl"
      alt="company logo"
    />
    <div style="width: 0.5rem; flex-shrink: 0"></div>
    <div
      :style="{
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        background: '#3491FF',
        color: 'white',
        padding: '0.25rem 0.5rem 0.25rem 0.25rem',
        fontSize: '9px',
        clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
      }"
    >
      {{ userType }}
    </div>
    <div style="width: 5rem; min-width: 1rem"></div>
    <div
      :style="{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'flex-end',
        height: '100%',
        flexShrink: 0,
      }"
    >
      <div style="display: flex">
        <AppBarItem
          v-for="menu in menuList"
          :key="menu.url"
          :selected="menu.active"
          :handle-click="() => movePage(menu.url)"
        >
          {{ menu.title }}
        </AppBarItem>
      </div>
    </div>
    <div style="flex-grow: 1"></div>
    <div
      :style="{
        display: 'flex',
        gap: '0.75rem',
        height: '100%',
        alignItems: 'flex-end',
        paddingBottom: '0.75rem',
      }"
    >
      <AppBarIconButton
        v-for="subTab in subMenuList"
        :key="subTab.url"
        :image-url="subTab.imageUrl"
        :on-click="() => movePage(subTab.url)"
      />
      <Badge>
        <AppBarIconButton
          :image-url="notificationIconUrl"
          :on-click="() => {}"
        />
      </Badge>
      <AppBarIconButton
        :image-url="accountIconUrl"
        :on-click="() => {}"
      />
    </div>
    <div style="width: 1.75rem"></div>
  </div>
</template>
