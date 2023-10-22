import { MmsNotification } from "mms-notification";
import { defineStore } from "pinia";

type State = {
  mmsNotification: MmsNotification;
  permission: NotificationPermission;
};

export const useNotificationStore = defineStore("notification", {
  state: (): State => {
    return {
      mmsNotification: new MmsNotification({
        isFirebaseEnabled: new Date().getTimezoneOffset() !== -480,
      }),
      permission: "default",
    };
  },
  actions: {
    async requestPermission() {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission;
    },
  },
});
