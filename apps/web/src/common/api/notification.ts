import { z } from "zod";
import {
  type PageableQueryParams,
  type SuccessResponse,
  pageableResponseSchema,
  successResponseSchema,
} from "../types";
import { zaxios } from "~/utils/axios";

export const notificationCategories = [
  "ALERT",
  "WORK_ORDER",
  "USER_ACCESS",
  "NOTE",
  "DATA_REQUEST",
] as const;
export type NotificationCategory = (typeof notificationCategories)[number];

const notificationPriorities = ["LOW", "MEDIUM", "HIGH"] as const;

const notificationStatuses = ["READ", "UNREAD"] as const;

export const notificationContentSchema = z.object({
  id: z.number().int().positive(),
  content: z.string().nullish(),
  linkTo: z.string().nullish(),
  linkType: z.string().nullish(),
  notiCategory: z.enum(notificationCategories),
  notiCode: z.string(),
  notiPriority: z.enum(notificationPriorities),
  notiStatus: z.enum(notificationStatuses),
  readDateTime: z.coerce.date().nullish(),
  sentDateTime: z.coerce.date(),
  senderId: z.number().int().positive(),
  senderName: z.string(),
});

export type NotificationContent = z.infer<typeof notificationContentSchema>;

const notificationsResponseSchema = zaxios.response(
  z
    .object({ content: z.array(notificationContentSchema) })
    .merge(pageableResponseSchema)
);

export type NotificationsResponse = z.infer<typeof notificationsResponseSchema>;

abstract class NotificationBaseApi {
  abstract getNotifications(
    options: {
      category?: NotificationCategory;
      status?: (typeof notificationStatuses)[number];
    } & PageableQueryParams
  ): Promise<NotificationsResponse>;
  abstract readNotifications(
    category?: NotificationCategory
  ): Promise<SuccessResponse>;
  abstract readNotificationById(id: number): Promise<SuccessResponse>;
  abstract updateFcmToken(token: string): Promise<SuccessResponse>;
}

class NotificationApi extends NotificationBaseApi {
  override getNotifications: NotificationBaseApi["getNotifications"] = ({
    category,
    status,
    page,
    size,
  }) => {
    return zaxios.get(notificationsResponseSchema, "/api/common/not-bel", {
      params: {
        page,
        size,
        notiCategory: category,
        notiStatus: status,
      },
    });
  };

  override readNotifications: NotificationBaseApi["readNotifications"] = async (
    category
  ) => {
    return zaxios.request(successResponseSchema, {
      method: "post",
      url: "/api/common/not-bel/read",
      params: {
        notiCategory: category,
      },
    });
  };

  override readNotificationById: NotificationBaseApi["readNotificationById"] =
    async (id) => {
      return zaxios.post(
        successResponseSchema,
        `/api/common/not-bel/${id}/read`
      );
    };

  override updateFcmToken: NotificationBaseApi["updateFcmToken"] = async (
    token
  ) => {
    return zaxios.post(successResponseSchema, "/api/common/man-pag/login", {
      messagingToken: token,
    });
  };
}

class NotificationMockApi extends NotificationBaseApi {
  notifications: NotificationContent[] = [];

  async setInitialData() {
    const module = await import("@faker-js/faker");
    const faker = module.faker;
    let linkTo = "https://dev.emoldino.com";

    const notifications: Omit<NotificationContent, "id">[] = [];
    for (let i = 0; i < 300; i++) {
      const category = faker.helpers.arrayElement(notificationCategories);
      if (category === "ALERT") {
        const hash = faker.helpers.arrayElement([
          "disconnection",
          "relocation",
          "machine-downtime",
          "cycle-time",
          "maintenance",
          "refurbishment",
          "detachment",
        ]);
        linkTo = `https://dev.emoldino.com/#${hash}`;
      }

      const status = faker.helpers.arrayElement(notificationStatuses);
      notifications.push({
        notiCategory: category,
        notiCode: faker.helpers.arrayElement([
          "WO_DECLINED",
          "WO_CANCELLED",
          "DATA_REQUESTED",
          "DATA_APPROVED",
          "NOTE_ADDED",
          "USER_INVITED",
          "USER_REMOVED",
          "ALERT_CRITICAL",
          "ALERT_WARNING",
          "ALERT_INFO",
        ]),
        notiPriority: faker.helpers.arrayElement(notificationPriorities),
        notiStatus: status,
        content: faker.lorem.sentence(),
        senderId: faker.number.int(),
        senderName: faker.person.fullName(),
        sentDateTime: faker.date.past(),
        readDateTime: status === "READ" ? faker.date.recent() : undefined,
        linkTo,
      });
    }

    this.notifications = notifications
      .sort((a, b) => b.sentDateTime.getTime() - a.sentDateTime.getTime())
      .map((item, index) => ({
        id: index + 1,
        ...item,
      }));
  }

  sleep(ms = 200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  override getNotifications: NotificationBaseApi["getNotifications"] = async ({
    category,
    status,
    page = 1,
    size = 20,
  }) => {
    await this.sleep(1000);

    if (this.notifications.length === 0) await this.setInitialData();

    const filtered = this.notifications
      .filter((item) => (!status ? true : item.notiStatus === status))
      .filter((item) => (!category ? true : item.notiCategory === category));
    const sliced = filtered.slice((page - 1) * size, page * size);

    return {
      data: {
        content: sliced,
        pageable: {
          sort: {
            unsorted: true,
            sorted: false,
            empty: true,
          },
          offset: 0,
          pageNumber: page,
          pageSize: size,
          unpaged: false,
          paged: true,
        },
        on: false,
        totalElements: filtered.length,
        totalPages: Math.round(filtered.length / size),
        number: 0,
        sort: {
          unsorted: true,
          sorted: false,
          empty: true,
        },
        size,
        first: page === 1,
        last: page * size >= filtered.length,
        numberOfElements: length,
        empty: false,
      },
    };
  };

  override readNotificationById: NotificationBaseApi["readNotificationById"] =
    async (id) => {
      await this.sleep();

      const item = this.notifications.find((item) => item.id === id);
      if (item) {
        item.notiStatus = "READ";
        item.readDateTime = new Date();
      }

      return {
        data: {
          success: true,
        },
      };
    };

  override readNotifications: NotificationBaseApi["readNotifications"] = async (
    category
  ) => {
    await this.sleep();

    this.notifications
      .filter((notification) => {
        if (!category) return true;
        return notification.notiCategory === category;
      })
      .forEach((item) => {
        item.notiStatus = "READ";
        item.readDateTime = new Date();
      });

    return {
      data: {
        success: true,
      },
    };
  };

  override updateFcmToken: NotificationBaseApi["updateFcmToken"] = async (
    _token
  ) => {
    await this.sleep();
    return {
      data: {
        success: true,
      },
    };
  };
}

export const notificationApi = import.meta.env.DEV
  ? new NotificationMockApi()
  : new NotificationApi();
