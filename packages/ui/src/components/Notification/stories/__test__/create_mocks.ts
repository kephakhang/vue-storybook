import {
  type NotificationContent,
  type GetNotificationsFn,
  type ReadNotificationsFn,
  notificationPriorities,
  notificationCategories,
} from "~/types/Notification";

const codes = [
  "WO_CREATED",
  "WO_UPDATED",
  "DATA_REQUESTED",
  "DATA_APPROVED",
  "NOTE_ADDED",
  "USER_INVITED",
  "USER_REMOVED",
  "ALERT_CRITICAL",
  "ALERT_WARNING",
  "ALERT_INFO",
];

const senders = [
  "Admin",
  "Support Emoldino",
  "Jane Doe",
  "John Smith",
  "Sarah Williams",
];

const contents = [
  "Emma Ko (eMoldino) has assigned a General Work Order to you.",
  "Your request for data access has been approved.",
  "A new note has been added to your account.",
  "You have been invited to join the eMoldino team.",
  "Critical system error has occurred. Please take immediate action.",
  "A warning has been issued regarding your account activity.",
  "A new update is available for your software.",
  "Your account has been removed from eMoldino system.",
];

function getRandomPastTime() {
  const now = new Date();
  const pastTime = new Date(
    now.getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
  );
  return pastTime.toString();
}

export function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mockNotifications: NotificationContent[] = [];

for (let i = 1; i <= 50; i++) {
  const category = notificationCategories[Math.floor(Math.random() * 5)];
  const notiCode = codes[Math.floor(Math.random() * 10)];
  const notiPriority = notificationPriorities[Math.floor(Math.random() * 3)];
  const status = Math.random() > 0.5 ? "READ" : "UNREAD";
  const sender = senders[Math.floor(Math.random() * 5)];
  const content = contents[Math.floor(Math.random() * 8)];
  const url = new URL("https://dev.emoldino.com");

  if (category === "WORK_ORDER") {
    const types = [
      "WORK_ORDER",
      "WORK_ORDER_CM_REQUEST_APPROVAL",
      "WORK_ORDER_CM_REQUEST_APPROVAL_APPROVED",
      "WORK_ORDER_CM_REQUEST_APPROVAL_DECLINED",
      "WORK_ORDER_DECLINED",
      "WORK_ORDER_REQUEST_CHANGE",
      "WORK_ORDER_APPROVED_CHANGE",
      "WORK_ORDER_DECLINED_CHANGE",
      "WORK_ORDER_CANCELLED",
    ];
    const randomType = types[Math.floor(Math.random() * types.length)];
    url.searchParams.append("popup", randomType);
  }

  mockNotifications.push({
    id: i,
    notiCode,
    notiCategory: category,
    notiPriority,
    notiStatus: status,
    content,
    senderId: Math.floor(Math.random() * 100),
    senderName: sender,
    linkType: Math.random() > 0.5 ? "internal" : "external",
    linkTo: url.toString(),
    sentDateTime: getRandomPastTime(),
    readDateTime:
      status === "READ" ? getRandomPastTime().toString() : undefined,
  });
}

export function readMockNotifications(
  category: Parameters<ReadNotificationsFn>[0]
) {
  mockNotifications
    .filter((notification) => {
      if (!category) return true;
      return notification.notiCategory === category;
    })
    .forEach((item) => {
      item.notiStatus = "READ";
      item.readDateTime = new Date().toString();
    });
}

export function readMockNotificationById(id: number) {
  const item = mockNotifications.find((item) => item.id === id);
  if (item) {
    item.notiStatus = "READ";
    item.readDateTime = new Date().toString();
  }
}

export function getMockNotifications({
  category,
  status,
  page = 1,
  size = 20,
}: Parameters<GetNotificationsFn>[0]) {
  const filtered = mockNotifications
    .filter((item) => (!status ? true : item.notiStatus === status))
    .filter((item) => (!category ? true : item.notiCategory === category));

  const paged = filtered.slice((page - 1) * size, page * size);

  return {
    content: paged,
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
  };
}
