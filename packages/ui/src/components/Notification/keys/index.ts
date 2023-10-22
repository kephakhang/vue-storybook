import type { InjectionKey } from "@vue/composition-api";
import type { NotificationContext } from "~/types/Notification";

export const notificationContextKey =
  Symbol() as InjectionKey<NotificationContext>;
