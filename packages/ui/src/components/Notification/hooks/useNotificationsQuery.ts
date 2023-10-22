import { computed, inject, type Ref } from "@vue/composition-api";
import type {
  NotificationCategory,
  NotificationResponse,
} from "~/types/Notification";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { notificationContextKey } from "../keys";

export const useNotificationsQuery = (
  categoryRef: Ref<NotificationCategory | undefined>
) => {
  const { getNotifications } = inject(notificationContextKey)!;
  const queryClient = useQueryClient();

  const getUnreadNotificationQueryResult = useQuery({
    queryKey: ["unreadNotifications", categoryRef],
    initialData: () => {
      if (!categoryRef.value) return;

      const data = queryClient.getQueryData<NotificationResponse>([
        "unreadNotifications",
        undefined,
      ]);

      const content = data?.content;
      if (!content) return;

      return {
        ...data,
        content: content.filter(
          (content) => content.notiCategory === categoryRef.value
        ),
      };
    },
    queryFn: async () => {
      const response = await getNotifications({
        size: 500,
        category: categoryRef.value,
        status: "UNREAD",
      });
      return response;
    },
  });

  const enabled = computed(() => !!categoryRef.value);
  const getReadNotificationQueryResult = useInfiniteQuery({
    queryKey: ["readNotifications", categoryRef],
    enabled,
    queryFn: ({ pageParam = 1 }) => {
      return getNotifications({
        page: pageParam,
        size: 20,
        category: categoryRef.value,
        status: "READ",
      });
    },
    getNextPageParam: (response) => {
      if (response.last) return undefined;
      const pageNumber = response.pageable.pageNumber;
      return pageNumber === 0 ? 2 : pageNumber + 1;
    },
  });

  const fetchNextNotifications = () => {
    if (
      !categoryRef.value ||
      getReadNotificationQueryResult.isFetchingNextPage.value ||
      getReadNotificationQueryResult.hasNextPage?.value === false
    ) {
      return;
    }
    getReadNotificationQueryResult.fetchNextPage();
  };

  const isLoading = computed(() => {
    if (!categoryRef.value) {
      return getUnreadNotificationQueryResult.isLoading.value;
    }

    return (
      getUnreadNotificationQueryResult.isLoading.value ||
      getReadNotificationQueryResult.isLoading.value
    );
  });

  const data = computed(() => {
    const unreadNotifications =
      getUnreadNotificationQueryResult.data.value?.content ?? [];
    const readNotifications =
      getReadNotificationQueryResult.data.value?.pages
        .map((page) => page.content)
        ?.flat() ?? [];

    if (unreadNotifications.length === 0 && readNotifications.length === 0) {
      return;
    }

    return [...unreadNotifications, ...readNotifications];
  });

  return {
    isLoading,
    data,
    getReadNotificationQueryResult,
    getUnreadNotificationQueryResult,
    fetchNextNotifications,
  };
};
