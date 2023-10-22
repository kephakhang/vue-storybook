<script lang="ts">
import { defineComponent, inject, ref, watch } from "@vue/composition-api";
import { notificationContextKey } from "../keys";

export default defineComponent({
  emits: {
    click: (_?: MouseEvent) => true,
  },
  setup(_, { emit }) {
    const iconButton = ref<HTMLElement | null>(null);
    const { triggerElement, isDrawerOpened, unreadNotificationsCount } = inject(
      notificationContextKey
    )!;

    const onButtonClick = () => {
      emit("click");
      isDrawerOpened.value = !isDrawerOpened.value;
    };

    watch(iconButton, () => {
      triggerElement.value = iconButton.value;
    });

    return {
      iconButton,
      isDrawerOpened,
      unreadNotificationsCount,
      onButtonClick,
    };
  },
});
</script>

<template>
  <div>
    <!-- Notification Icon Button -->
    <div style="position: relative">
      <div
        v-if="unreadNotificationsCount > 0"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          position: 'absolute',
          minWidth: '12px',
          height: '12px',
          top: '-6px',
          right: '-6px',
          backgroundColor: '#BD0060',
          color: 'white',
          fontSize: '8px',
        }"
      >
        {{ unreadNotificationsCount > 99 ? "99+" : unreadNotificationsCount }}
      </div>
      <button
        ref="iconButton"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          borderRadius: '4px',
          padding: 0,
          height: '24px',
          width: '24px',
          cursor: 'pointer',
          backgroundColor: '#D8E2F8',
        }"
        @click="onButtonClick"
      >
        <img
          src="~assets/images/icon/notification.svg"
          alt="notification icon"
          :style="{
            width: '16px',
            height: '16px',
          }"
        />
      </button>
    </div>
  </div>
</template>

<style>
p {
  margin: 0;
}
</style>
