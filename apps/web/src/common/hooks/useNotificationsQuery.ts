import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  // To prevent https://github.com/microsoft/TypeScript/issues/42873 this error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type UseInfiniteQueryReturnType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type UseQueryReturnType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type InfiniteData,
} from "@tanstack/vue-query";
import { type MaybeRef, computed, toValue } from "vue";

import {
  notificationApi,
  type NotificationsResponse,
  type NotificationCategory,
} from "../api";

type NotificationQueryOptions = {
  category: MaybeRef<NotificationCategory | undefined>;
};

export const unreadNotificationKeys = {
  base: ["unreadNotifications"] as const,
  all: ["unreadNotifications", "ALL"] as const,
  category: (category?: NotificationCategory) =>
    ["unreadNotifications", category ?? "ALL"] as const,
} as const;

export const readNotificationKeys = {
  base: ["readNotifications"] as const,
  category: (category?: NotificationCategory) =>
    ["readNotifications", category ?? "ALL"] as const,
} as const;

export const useUnreadNotificationsQuery = (
  options?: NotificationQueryOptions
) => {
  const queryClient = useQueryClient();
  const notificationCategory = computed(() => toValue(options?.category));
  const queryKey = computed(() =>
    unreadNotificationKeys.category(notificationCategory.value)
  );

  return useQuery({
    // queryKey already includes notificationCategory.value
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey,
    placeholderData() {
      if (!notificationCategory.value) return;
      const data = queryClient.getQueryData<NotificationsResponse["data"]>(
        unreadNotificationKeys.all
      );
      const content = data?.content;
      if (!content) return;

      return {
        ...data,
        content: content.filter(
          (content) => content.notiCategory === notificationCategory.value
        ),
      };
    },
    queryFn: async () => {
      const res = await notificationApi.getNotifications({
        page: 1,
        size: 500,
        category: notificationCategory.value,
        status: "UNREAD",
      });
      return res.data;
    },
  });
};

export const useReadNotificationsInfiniteQuery = (
  options?: NotificationQueryOptions
) => {
  const notificationCategory = computed(() => toValue(options?.category));
  const enabled = computed(() => !!notificationCategory.value);
  const queryKey = computed(() =>
    readNotificationKeys.category(notificationCategory.value)
  );

  return useInfiniteQuery({
    // queryKey already includes notificationCategory.value
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey,
    enabled,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const res = await notificationApi.getNotifications({
        page: pageParam,
        size: 20,
        category: notificationCategory.value,
        status: "READ",
      });
      return res.data;
    },
    getNextPageParam: (
      // TODO(sun.lee): Remove this type casting when vue-query resolve this https://github.com/TanStack/query/issues/5881
      response: Awaited<
        ReturnType<typeof notificationApi.getNotifications>
      >["data"]
    ) => {
      if (response.last) return null;
      const pageNumber = response.pageable.pageNumber;
      return pageNumber === 0 ? 2 : pageNumber + 1;
    },
  });
};

export const useNotifications = (options?: NotificationQueryOptions) => {
  const unreadNotificationsQueryResult = useUnreadNotificationsQuery(options);
  const readNotificationsQueryResult =
    useReadNotificationsInfiniteQuery(options);

  const notificationCategory = computed(() => toValue(options?.category));

  const notifications = computed(() => {
    const unreadNotifications =
      unreadNotificationsQueryResult.data.value?.content ?? [];
    if (!notificationCategory.value) return unreadNotifications;

    const readNotifications =
      readNotificationsQueryResult.data.value?.pages
        ?.map((page) => page.content)
        ?.flat() ?? [];
    return [...unreadNotifications, ...readNotifications];
  });

  const isLoading = computed(() => {
    if (notifications.value.length !== 0) return false;

    if (!notificationCategory.value) {
      return unreadNotificationsQueryResult.isLoading.value;
    }

    return (
      unreadNotificationsQueryResult.isLoading.value ||
      readNotificationsQueryResult.isLoading.value
    );
  });

  const isFetchingMore = computed(() => {
    let isLoading = unreadNotificationsQueryResult.isLoading.value;
    if (notificationCategory.value) {
      isLoading =
        isLoading ||
        readNotificationsQueryResult.isLoading.value ||
        readNotificationsQueryResult.isFetchingNextPage.value;
    }
    return notifications.value.length !== 0 && isLoading;
  });

  const fetchNextNotifications = () => {
    if (
      !notificationCategory.value ||
      readNotificationsQueryResult.isFetchingNextPage.value ||
      readNotificationsQueryResult.hasNextPage?.value === false
    ) {
      return;
    }
    void readNotificationsQueryResult.fetchNextPage();
  };

  return {
    notifications,
    isLoading,
    fetchNextNotifications,
    isFetchingMore,
  };
};
