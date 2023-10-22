<script lang="ts">
import {
  defineComponent,
  ref,
  type PropType,
  computed,
  watch,
  toRef,
} from "@vue/composition-api";
import TabButton from "~/components/TabButton/tab-button.vue";
import Pagination from "~/components/Pagination/pagination.vue";

import TableRow from "./notification-history-log-table-row.vue";

import type {
  GetNotificationsFn,
  NotificationCategory,
  NotificationContent,
  NotificationResponse,
  ReadNotificationFn,
} from "~/types/Notification";

type TabSelectedParams = Parameters<
  NonNullable<InstanceType<typeof TabButton>["clickHandler"]>
>[0];

export default defineComponent({
  components: {
    TabButton,
    TableRow,
    Pagination,
  },
  props: {
    isAdminUser: {
      type: Boolean,
      default: false,
    },
    getNotifications: {
      required: true,
      type: Function as PropType<GetNotificationsFn>,
    },
    readNotificationById: {
      required: true,
      type: Function as PropType<ReadNotificationFn>,
    },
  },
  setup(props) {
    const isAdminUser = toRef(props, "isAdminUser");
    const page = ref(1);
    const isLoading = ref(true);
    const pageInfo = ref<Omit<NotificationResponse, "content">>();
    const selectedCategory = ref<NotificationCategory>();
    const notifications = ref<NotificationContent[]>([]);
    const tabButtonInfos = computed(() =>
      [
        {
          title: "All",
          active: !selectedCategory.value,
        },
        {
          title: "Alert",
          active: selectedCategory.value === "ALERT",
        },
        {
          title: "Work Order",
          active: selectedCategory.value === "WORK_ORDER",
        },
        {
          title: "User Access",
          active: selectedCategory.value === "USER_ACCESS",
        },
        {
          title: "Note",
          active: selectedCategory.value === "NOTE",
        },
        // TODO(sun.lee): Uncomment this when all errors in data request page are fixed
        // {
        //   title: 'Data Request',
        //   active: selectedCategory.value === 'DATA_REQUEST',
        // },
      ].filter((info) => {
        if (info.title === "User Access") return isAdminUser.value;
        return true;
      })
    );

    const fetchNotifications = async (arg?: { skipLoading: boolean }) => {
      const { skipLoading } = arg ?? { skipLoading: false };
      if (!skipLoading) isLoading.value = true;
      try {
        const { content, ...pageInformation } = await props.getNotifications({
          page: page.value,
          size: 9,
          category: selectedCategory.value,
        });
        notifications.value = content;
        pageInfo.value = pageInformation;
      } catch (error) {
        // TODO(appano1): handle error
      }
      isLoading.value = false;
    };

    const onTabSelected = ({ title }: TabSelectedParams) => {
      if (title === "All") {
        selectedCategory.value = undefined;
      } else if (title === "Workorder") {
        selectedCategory.value = "WORK_ORDER";
      } else {
        const converted = title
          .replace(" ", "_")
          .toUpperCase() as NotificationCategory;
        selectedCategory.value = converted;
      }
    };

    const readNotification = async (id: number) => {
      try {
        await props.readNotificationById(id);
        notifications.value = notifications.value.map((notification) => {
          if (notification.id !== id) return notification;
          return {
            ...notification,
            notiStatus: "READ",
            // TODO(sun.lee): If backend returns readDateTime, use it instead of new Date()
            readDateTime: new Date().toString(),
          };
        });
      } catch (error) {
        // TODO(sun.lee): handle error
      }
    };

    const onContentClick = async (id: number) => {
      const notification = notifications.value.find((item) => item.id === id)!;
      if (notification.notiStatus === "UNREAD") await readNotification(id);
      if (notification.linkTo) window.location.href = notification.linkTo;
    };

    watch(selectedCategory, () => {
      page.value = 1;
    });

    watch(
      [page, selectedCategory],
      () => {
        fetchNotifications();
      },
      { immediate: true }
    );

    return {
      page,
      isLoading,
      pageInfo,
      selectedCategory,
      notifications,
      tabButtonInfos,
      onTabSelected,
      onContentClick,
    };
  },
});
</script>
<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      minWidth: '840px',
      overflow: 'auto',
    }"
  >
    <div style="display: flex; justify-content: space-between">
      <TabButton
        style="padding-left: 0"
        tab-type="secondary-tab"
        :click-handler="onTabSelected"
        :tab-buttons="tabButtonInfos"
      />
      <!--
        TODO(sun.lee): Uncomment this when the date dropdown is ready in backend
        <date-dropdown-button />
      -->
    </div>
    <div style="height: 20px"></div>
    <table style="width: 100%">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Priority</th>
          <th>Sender</th>
          <th>Notification Content</th>
          <th>Status</th>
        </tr>
      </thead>
      <!-- TODO(sun.lee): Add loading UI when product team requested -->
      <tbody v-if="!isLoading">
        <TableRow
          v-for="notification in notifications"
          :id="notification.id"
          :key="notification.id"
          :type="notification.notiCategory"
          :priority="notification.notiPriority"
          :sender="notification.senderName"
          :content="notification.content ?? ''"
          :created-at="new Date(notification.sentDateTime)"
          :read-at="
            notification.readDateTime
              ? new Date(notification.readDateTime)
              : undefined
          "
          @click="onContentClick"
        />
      </tbody>
    </table>
    <div style="height: 12px"></div>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'row-reverse',
      }"
    >
      <Pagination
        :disabled="!pageInfo"
        :current-page="page"
        :total-page="pageInfo?.totalPages ?? 1"
        :next-click-handler="
          () => {
            if (pageInfo?.last) return;
            page += 1;
          }
        "
        :previous-click-handler="
          () => {
            if (pageInfo?.first) return;
            page -= 1;
          }
        "
      />
    </div>
  </div>
</template>

<style lang="scss" module scoped>
@import "./styles.module.scss";
</style>

<style>
p {
  margin: 0;
}
</style>
