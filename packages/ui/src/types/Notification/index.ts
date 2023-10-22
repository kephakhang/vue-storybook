import type { Ref } from "@vue/composition-api";
import type { PageableResponse } from "~/types/common";

export const notificationCategories = [
  "ALERT",
  "WORK_ORDER",
  "DATA_REQUEST",
  "NOTE",
  "USER_ACCESS",
] as const;

export type ReadNotificationsFn = (
  category?: NotificationCategory
) => Promise<void>;

export type ReadNotificationFn = (id: number) => Promise<void>;

export const notificationStatuses = ["READ", "UNREAD"] as const;
export type NotificationStatus = (typeof notificationStatuses)[number];

export type GetNotificationsFn<
  T extends NotificationResponse = NotificationResponse
> = (args: {
  page?: number;
  size?: number;
  category?: NotificationCategory;
  status?: NotificationStatus;
}) => Promise<T>;

export type SetNotificationFn = (value: boolean) => Promise<void>;

export type NotificationCategory = (typeof notificationCategories)[number];

export const notificationPriorities = ["LOW", "MEDIUM", "HIGH"] as const;
export type NotificationPriority = (typeof notificationPriorities)[number];

export interface NotificationContent {
  id: number;
  content: string | undefined | null;
  linkTo: string | undefined | null;
  linkType: string | undefined | null;
  notiCategory: NotificationCategory;
  notiCode: string;
  notiPriority: NotificationPriority;
  notiStatus: NotificationStatus;
  readDateTime?: string;
  sentDateTime: string;
  senderId: number;
  senderName: string;
}

export type NotificationResponse = PageableResponse & {
  content: NotificationContent[];
};

export type NotificationBellResponse = NotificationResponse & {
  on: boolean;
};

export const avatarColors = [
  "#FFACF2",
  "#62B0D9",
  "#FFACAC",
  "#FFA167",
  "#B8F7EF",
] as const;
export type AvatarColor = (typeof avatarColors)[number];

export type NotificationContext = {
  getNotifications: GetNotificationsFn<NotificationBellResponse>;
  readNotificationById: ReadNotificationFn;
  readNotifications: ReadNotificationsFn;
  setNotification: SetNotificationFn;
  open: () => void;
  triggerElement: Ref<HTMLElement | null>;
  isAdminUser: Ref<boolean>;
  isDrawerOpened: Ref<boolean>;
  unreadNotificationsCount: Ref<number>;
};
