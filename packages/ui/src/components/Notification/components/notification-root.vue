<script lang="ts">
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import {
  defineComponent,
  ref,
  type PropType,
  provide,
  computed,
  toRef,
  watch,
} from "@vue/composition-api";

import type {
  ReadNotificationsFn,
  ReadNotificationFn,
  GetNotificationsFn,
  NotificationBellResponse,
  NotificationContent,
  SetNotificationFn,
} from "~/types/Notification";

import { notificationContextKey } from "../keys";

export default defineComponent({
  props: {
    isAdminUser: {
      type: Boolean,
      default: false,
    },
    setNotification: {
      required: true,
      type: Function as PropType<SetNotificationFn>,
    },
    readNotifications: {
      required: true,
      type: Function as PropType<ReadNotificationsFn>,
    },
    readNotificationById: {
      required: true,
      type: Function as PropType<ReadNotificationFn>,
    },
    getNotifications: {
      required: true,
      type: Function as PropType<GetNotificationsFn<NotificationBellResponse>>,
    },
    addedNotification: Object as PropType<NotificationContent>,
  },
  setup(props) {
    const triggerElement = ref<HTMLElement | null>(null);
    const isDrawerOpened = ref(false);
    const addedNotification = toRef(props, "addedNotification");
    const open = () => {
      isDrawerOpened.value = true;
    };

    const queryClient = useQueryClient();

    const { data } = useQuery({
      queryKey: ["unreadNotifications", undefined],
      queryFn: async () => {
        return props.getNotifications({
          size: 120,
          status: "UNREAD",
        });
      },
    });

    watch(addedNotification, (newNotification, oldNotification) => {
      if (!newNotification || newNotification?.id === oldNotification?.id) {
        return;
      }

      const updateQueryData = (
        oldData: NotificationBellResponse | undefined
      ) => {
        if (
          !oldData ||
          oldData.content.some(({ id }) => id === newNotification.id)
        ) {
          return oldData;
        }

        return {
          ...oldData,
          content: [newNotification, ...oldData.content],
        };
      };

      queryClient.setQueryData<NotificationBellResponse>(
        ["unreadNotifications", undefined],
        updateQueryData
      );
      queryClient.setQueryData(
        ["unreadNotifications", newNotification.notiCategory],
        updateQueryData
      );
    });

    const unreadNotificationsCount = computed(() => {
      return data.value?.content.length ?? 0;
    });

    provide(notificationContextKey, {
      triggerElement,
      isAdminUser: toRef(props, "isAdminUser"),
      getNotifications: props.getNotifications,
      readNotificationById: props.readNotificationById,
      readNotifications: props.readNotifications,
      setNotification: props.setNotification,
      open,
      isDrawerOpened,
      unreadNotificationsCount,
    });

    return { isDrawerOpened, open, unreadNotificationsCount };
  },
});
</script>
<template>
  <div>
    <slot
      name="trigger"
      :open="open"
      :unread-notifications-count="unreadNotificationsCount"
    ></slot>
    <slot></slot>
  </div>
</template>
