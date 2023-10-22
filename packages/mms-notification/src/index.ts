import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  type Messaging,
} from "firebase/messaging";
import {
  getMessaging as getServiceWorkerMessaging,
  onBackgroundMessage as onBackgroundFirebaseMessage,
} from "firebase/messaging/sw";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUovdhr95iIrtFrQ3nMIaXPLstuIdrmcM",
  authDomain: "mms-prod-e6834.firebaseapp.com",
  projectId: "mms-prod-e6834",
  storageBucket: "mms-prod-e6834.appspot.com",
  messagingSenderId: "436409079955",
  appId: "1:436409079955:web:9d2cae5e2b34cc8eb7d566",
};

const firebaseVapidKey =
  "BE8UgIJZW6qPqXHtg0a5ZD7brUakUh6lKLCj_wlNQ2PiG635CSiO3I8BsQN0aORNJwx8J5P8HQ21YhxdUAJ52ZM";

type MmsNotificationConstructorOptions = {
  isFirebaseEnabled?: boolean;
};

export class MmsNotification {
  private app?: ReturnType<typeof initializeApp>;

  private messaging?: Messaging;
  private serviceWorkerMessaging?: Messaging;
  private serviceWorkerRegistration?: ServiceWorkerRegistration;

  constructor(options?: MmsNotificationConstructorOptions) {
    const isFirebaseEnabled = options?.isFirebaseEnabled ?? true;

    if (isFirebaseEnabled) this.app = initializeApp(firebaseConfig);
  }

  async registerServiceWorker(
    ...args: Parameters<typeof navigator.serviceWorker.register>
  ) {
    const [scriptURL, options] = args;
    try {
      this.serviceWorkerRegistration = await navigator.serviceWorker.register(
        scriptURL,
        options
      );
    } catch (error) {
      console.error("Failed to register service worker", error);
    }
  }

  async getFcmToken() {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }

    if (Notification.permission === "denied") {
      throw new Error("Notification permission denied");
    }

    if (!this.messaging) this.messaging = getMessaging(this.app);
    if (!this.serviceWorkerRegistration) {
      console.warn(
        'Service worker is not registered. Call "registerServiceWorker" before calling "getFcmToken".'
      );
    }

    const token = await getToken(this.messaging, {
      vapidKey: firebaseVapidKey,
      serviceWorkerRegistration: this.serviceWorkerRegistration,
    });
    if (token) return token;

    throw new Error(
      "No registration token available. Request permission to generate one."
    );
  }

  onForegroundMessage(callback: Parameters<typeof onMessage>[1]) {
    if (!this.messaging) this.messaging = getMessaging(this.app);
    return onMessage(this.messaging, callback);
  }

  onBackgroundMessage(
    callback: Parameters<typeof onBackgroundFirebaseMessage>[1]
  ) {
    let serviceWorkerMessaging = this.serviceWorkerMessaging;

    if (!serviceWorkerMessaging) {
      serviceWorkerMessaging = getServiceWorkerMessaging();
      this.serviceWorkerMessaging = serviceWorkerMessaging;
    } else {
      console.warn(
        "You are calling onBackgroundMessage multiple times. This is not recommended. You should unsubscribe from the previous callback before subscribing to a new one."
      );
    }

    return onBackgroundFirebaseMessage(serviceWorkerMessaging, callback);
  }
}
