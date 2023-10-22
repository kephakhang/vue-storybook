<script lang="ts">
import {
  defineComponent,
  ref,
  toRef,
  watch,
  type PropType,
} from "@vue/composition-api";
import type {
  AvatarColor,
  NotificationCategory,
  NotificationContent,
  ReadNotificationFn,
} from "~/types/Notification";
import ListTile from "./notification-drawer-list-tile.vue";
import LineSpinner from "~/components/Spinner/line-spinner.vue";
import DotSpinner from "~/components/Spinner/dot-spinner.vue";
import { shortenName } from "../utils/shorten-name";
import { useInfiniteScroll } from "@vueuse/core";

/** SVG related */
import disconnectionIconUrl from "~assets/images/icon/disconnection-alert.svg?url";
import relocationIconUrl from "~assets/images/icon/relocation-alert.svg?url";
import machineDownTimeIconUrl from "~assets/images/icon/machine-downtime-alert.svg?url";
import cycleTimeIconUrl from "~assets/images/icon/cycle-time-alert.svg?url";
import maintenanceIconUrl from "~assets/images/icon/maintenance-alert.svg?url";
import refurbishmentIconUrl from "~assets/images/icon/refurbishment-alert.svg?url";
import detachmentIconUrl from "~assets/images/icon/detachment-alert.svg?url";
import alertDefaultIconUrl from "~assets/images/icon/alert-default.svg?url";

export default defineComponent({
  components: {
    LineSpinner,
    DotSpinner,
    ListTile,
  },
  props: {
    category: String as PropType<NotificationCategory>,
    isLoading: {
      type: Boolean,
      required: true,
    },
    isFetchingNextPage: {
      type: Boolean,
      default: false,
    },
    notifications: {
      type: Array as PropType<NotificationContent[]>,
      required: true,
    },
    readNotification: {
      required: true,
      type: Function as PropType<ReadNotificationFn>,
    },
    senderColors: {
      required: true,
      type: Object as PropType<Record<string, AvatarColor>>,
    },
    onScrollBottom: Function as PropType<() => void>,
  },
  setup(props) {
    const listViewRef = ref<HTMLElement | null>(null);
    const category = toRef(props, "category");

    const onListTileClick = async (content: NotificationContent) => {
      await props.readNotification(content.id);
      if (!content.linkTo) return;

      const currentURL = new URL(location.href);
      const url = new URL(content.linkTo, currentURL.origin);

      location.href = url.toString();
    };

    const getAlertIconUrl = (url: string) => {
      const parsedUrl = new URL(url, location.href);
      const linkHash = parsedUrl.hash.slice(1);
      switch (linkHash) {
        case "disconnection":
          return disconnectionIconUrl;
        case "relocation":
          return relocationIconUrl;
        case "machine-downtime":
          return machineDownTimeIconUrl;
        case "cycle-time":
          return cycleTimeIconUrl;
        case "maintenance":
          return maintenanceIconUrl;
        case "refurbishment":
          return refurbishmentIconUrl;
        case "detachment":
          return detachmentIconUrl;
        default:
          return alertDefaultIconUrl;
      }
    };

    watch(category, () => {
      if (!listViewRef.value) return;
      listViewRef.value.scrollTo(0, 0);
    });

    useInfiniteScroll(
      listViewRef,
      () => {
        if (!props.onScrollBottom) return;
        props.onScrollBottom();
      },
      { distance: 20 }
    );
    return {
      listViewRef,
      onListTileClick,
      getAlertIconUrl,
    };
  },
  methods: {
    getButtonTextFromCategory(category: NotificationCategory, code?: string) {
      switch (category) {
        case "ALERT":
          return "View Alert";
        case "WORK_ORDER":
          if (
            typeof code === "string" &&
            [
              "WO_DECLINED",
              "WO_CANCELLED",
              "WO_CPT_REJECTED",
              "WO_CPT_CANCELLED",
              "WO_DECLINED",
              "WO_MOD_REJECTED",
              "WO_CRT_DECLINED",
            ].includes(code)
          )
            return "View Reason";
          return "View Work Order";
        case "DATA_REQUEST":
          return "View Reason";
        default:
          return;
      }
    },
    shortenSenderName: shortenName,
    getAvartarBackgroundColor(category: NotificationCategory, sender?: string) {
      if (category === "ALERT" || category === "USER_ACCESS" || !sender) return;
      return this.senderColors[sender];
    },
  },
});
</script>
<template>
  <div
    ref="listViewRef"
    :style="{
      height: '100%',
      width: '100%',
      overflow: 'auto',
    }"
  >
    <div
      v-if="isLoading && notifications.length === 0"
      :style="{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
    >
      <LineSpinner />
    </div>
    <div v-else>
      <ListTile
        v-for="content in notifications"
        :key="content.id"
        :created-at="new Date(content.sentDateTime)"
        :has-read="content.notiStatus === 'READ'"
        :button-text="
          getButtonTextFromCategory(content.notiCategory, content.notiCode)
        "
        :on-click="() => onListTileClick(content)"
        :avartar-background-color="
          getAvartarBackgroundColor(content.notiCategory, content.senderName)
        "
      >
        <template #avartarImage>
          <img
            v-if="content.notiCategory === 'USER_ACCESS'"
            src="~assets/images/icon/user-access-blue.svg"
          />
          <img
            v-else-if="content.notiCategory === 'ALERT'"
            :src="getAlertIconUrl(content.linkTo ?? '')"
            alt="alert icon"
          />
          <span
            v-else
            style="color: #4b4b4b"
          >
            {{ shortenSenderName(content.senderName) }}
          </span>
        </template>
        <template #title>{{ content.content }}</template>
      </ListTile>
      <div
        v-if="isFetchingNextPage"
        :style="{
          overflow: 'hidden',
          height: '32px',
          display: 'grid',
          placeItems: 'center',
        }"
      >
        <DotSpinner
          :height="20"
          :width="20"
        />
      </div>
    </div>
  </div>
</template>
