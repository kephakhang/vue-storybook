import { useMutation } from "@tanstack/vue-query";
import { onMounted, onUnmounted, toRef, watch } from "vue";
import { z } from "zod";

import FirebaseServiceWorkerUrl from "~/utils/firebase-messaging-sw.js?worker&url";
import {
  type NotificationContent,
  notificationContentSchema,
  notificationApi,
} from "../api";
import { useNotificationStore } from "./useNotificationStore";

const __tokenKey__ = "fcmToken";

export function onNotification(
  callback: (notification: NotificationContent) => void
) {
  const store = useNotificationStore();
  const permission = toRef(() => store.permission);
  const { mutate: updateFcmToken, error } = useMutation({
    mutationFn: async (token: string) => {
      return await notificationApi.updateFcmToken(token);
    },
  });

  const onMessage = (event: MessageEvent<unknown>) => {
    const payload = event.data;

    const result = z
      .object({
        data: notificationContentSchema.omit({ notiStatus: true }),
        notification: z.object({
          body: z.string(),
        }),
      })
      .safeParse(payload);

    if (!result.success) return;

    const {
      data: notification,
      notification: { body },
    } = result.data;

    callback({
      ...notification,
      content: body,
      notiStatus: "UNREAD",
    });
  };

  onMounted(async () => {
    const permission = await store.requestPermission();
    if (permission === "denied") {
      return console.error(
        "Notification permission denied. You will not receive any notifications."
      );
    }
    navigator.serviceWorker.addEventListener("message", onMessage);
  });

  watch(permission, async () => {
    if (permission.value !== "granted") return;

    await store.mmsNotification.registerServiceWorker(
      FirebaseServiceWorkerUrl,
      { type: "module" }
    );

    if (!sessionStorage.getItem(__tokenKey__)) {
      const token = await store.mmsNotification.getFcmToken();
      sessionStorage.setItem(__tokenKey__, token);
      updateFcmToken(token);
    }
  });

  watch(error, () => {
    console.error("Failed to update FCM token.", error.value);
  });

  onUnmounted(() => {
    navigator.serviceWorker.removeEventListener("message", onMessage);
  });
}
