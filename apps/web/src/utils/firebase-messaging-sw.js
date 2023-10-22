/* eslint-env serviceworker */

import { MmsNotification } from "mms-notification";

const mmsNotification = new MmsNotification();

mmsNotification.onBackgroundMessage(async (payload) => {
  const { title, body } = payload.notification;

  if (title && body) {
    self.registration.showNotification(title, {
      body,
    });
  }

  const clients = await self.clients.matchAll({
    includeUncontrolled: true,
  });

  clients.forEach((client) => {
    client.postMessage(payload);
  });
});
