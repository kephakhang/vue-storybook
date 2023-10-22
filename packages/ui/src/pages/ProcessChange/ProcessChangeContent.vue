<script lang="ts">
import { useInfiniteQuery, useQueryClient } from "@tanstack/vue-query";
import {
  defineComponent,
  ref,
  computed,
  toRef,
  watchEffect,
  watch,
  reactive,
  type PropType,
} from "@vue/composition-api";
import type { SortQuryParamValue } from "~/types/common";

import TotalProcessChangesWidget from "~/pages/ProcessChange/components/TotalProcessChangesWidget.vue";
import ProcessChangeDataTable from "~/pages/ProcessChange/components/ProcessChangeDataTable.vue";
import ProcessChangeTrendWidget from "~/pages/ProcessChange/components/ProcessChangeTrendWidget.vue";
import ProcessChangeEventsWidget from "~/pages/ProcessChange/components/ProcessChangeEventsWidget.vue";
import ProcessChangeEventDetailsModal from "~/pages/ProcessChange/components/ProcessChangeEventDetailsModal.vue";

import { WidgetArea, WidgetGroup } from "../..";
import type { GetProcessChange, GetProcessChangeDetails } from "./types";

export default defineComponent({
  components: {
    WidgetArea,
    WidgetGroup,
    ProcessChangeTrendWidget,
    ProcessChangeDataTable,
    ProcessChangeEventsWidget,
    TotalProcessChangesWidget,
    ProcessChangeEventDetailsModal,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    getProcessChanges: {
      type: Function as PropType<GetProcessChange>,
      required: true,
    },
    getProcessChangeDetails: {
      type: Function as PropType<GetProcessChangeDetails>,
      required: true,
    },
    selectedYear: {
      type: [String, Number],
      required: true,
    },
    timeScale: {
      type: String,
      required: true,
    },
    resetTrigger: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const day = ref<string>();
    const month = ref<string>();
    const selectedDateFromChart = ref<string>();
    const tableSort = ref<SortQuryParamValue>();
    const isTableSortByDesc = ref<boolean>(true);
    const selectedMoldId = ref<number>();
    const processChangeEventsWidgetScrollTop = ref<number>();
    const currentPage = ref(1);
    const queryClient = useQueryClient();
    const count = toRef(props, "count");
    const resetTrigger = toRef(props, "resetTrigger");
    const isEventDetailsModalOpened = ref<boolean>(false);
    const eventDetailsParams = reactive<{
      moldId: number | null;
      dateHourRange: string | null;
    }>({
      moldId: null,
      dateHourRange: null,
    });

    const setTableSort = (key) => {
      if (!key) {
        tableSort.value = undefined;
        return;
      }
      isTableSortByDesc.value = !isTableSortByDesc.value;
      tableSort.value = `${key},${isTableSortByDesc.value ? "desc" : "asc"}`;
      currentPage.value = 1;
    };

    const setSelectedMoldId = (id: number, scrollTop: number) => {
      selectedMoldId.value = id;
      processChangeEventsWidgetScrollTop.value = scrollTop;
    };

    const setSelectedDateFromChartItem = (date: string) => {
      const isDay = date.includes("/");

      selectedDateFromChart.value = date;
      day.value = isDay ? `${props.selectedYear + date.replace("/", "")}` : "";
      month.value = isDay ? "" : `${props.selectedYear + date}`;
    };

    const getDateParam = (date: string | undefined) => {
      if (!date) return { day: undefined, month: undefined };

      if (date.includes("/")) {
        return {
          day: `${props.selectedYear + date.replace("/", "")}`,
          month: undefined,
        };
      } else
        return {
          day: undefined,
          month: `${props.selectedYear + date}`,
        };
    };

    const {
      data,
      isLoading,
      error,
      hasPreviousPage,
      hasNextPage,
      fetchNextPage,
      fetchPreviousPage,
      isFetchingNextPage,
      isFetchingPreviousPage,
    } = useInfiniteQuery({
      queryKey: [
        "processChanges",
        selectedDateFromChart,
        tableSort,
        selectedMoldId,
      ],
      queryFn: ({ pageParam = 1 }) => {
        return props.getProcessChanges({
          day: getDateParam(selectedDateFromChart.value).day,
          month: getDateParam(selectedDateFromChart.value).month,
          moldId: selectedMoldId.value,
          page: pageParam,
          size: 20,
          sort: tableSort.value,
        });
      },
      getNextPageParam: (lastPage) => {
        // current page: pageNumber + 1 + nextPage(+1)
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 2;
      },
      getPreviousPageParam: (firstPage) => {
        // current page: pageNumber + 1 + nextPage(-1)
        return firstPage.first ? undefined : firstPage.pageable.pageNumber;
      },
    });

    const totalChanges = computed(() => {
      // totalElements => totalProcChgCount (steve님 요구사항, 2023.09.15)
      // (TODO: emoldino-jun): totalChanges 를 쓰지 않고 totalProcessChangeCount 로 전환해도 될 것으로 보임. 확인필요
      return data.value?.pages.at(-1)?.totalProcChgCount;
    });

    const lastPage = computed(() => {
      return data.value?.pages.at(-1)?.totalPages;
    });

    const fetchNextProcessChanges = async () => {
      await fetchNextPage();
      currentPage.value++;
    };

    const fetchPreviousProcessChanges = async () => {
      await fetchPreviousPage();
      currentPage.value--;
    };

    const openEventDetailModal = (id: number, timeRange: string) => {
      eventDetailsParams.moldId = id;
      eventDetailsParams.dateHourRange = timeRange;
      isEventDetailsModalOpened.value = true;
    };

    const closeEventDetailModal = () => {
      eventDetailsParams.moldId = null;
      eventDetailsParams.dateHourRange = null;
      isEventDetailsModalOpened.value = false;
    };

    const tableData = computed(() => {
      return data.value?.pages.at(currentPage.value - 1)?.content ?? [];
    });

    const isFetchingTableData = computed(() => {
      return isFetchingNextPage.value || isFetchingPreviousPage.value;
    });

    const chartItems = computed(() => {
      return data.value?.pages.at(-1)?.chartItems;
    });

    const topItems = computed(() => {
      return data.value?.pages.at(-1)?.topItems ?? [];
    });

    watch(resetTrigger, () => {
      currentPage.value = 1;
      tableSort.value = undefined;
      selectedMoldId.value = undefined;
      selectedDateFromChart.value = undefined;
      queryClient.invalidateQueries(["processChanges"]);
    });

    watch(count, () => {
      currentPage.value = 1;
      queryClient.invalidateQueries(["processChanges"]);
    });

    watch(selectedMoldId, (newVal, oldVal) => {
      if (newVal !== oldVal) currentPage.value = 1;
    });

    watch(selectedDateFromChart, (newVal, oldVal) => {
      if (newVal !== oldVal) currentPage.value = 1;
    });

    watchEffect(() => {
      console.log(data.value?.pages);
    });

    return {
      currentPage,
      data,
      error,
      hasNextPage,
      hasPreviousPage,
      isFetchingTableData,
      isLoading,
      lastPage,
      tableSort,
      tableData,
      totalChanges,
      chartItems,
      topItems,
      isEventDetailsModalOpened,
      selectedMoldId,
      selectedDateFromChart,
      eventDetailsParams,
      processChangeEventsWidgetScrollTop,
      setTableSort,
      fetchNextProcessChanges,
      fetchPreviousProcessChanges,
      openEventDetailModal,
      closeEventDetailModal,
      setSelectedMoldId,
      setSelectedDateFromChartItem,
    };
  },
});
</script>

<template>
  <div style="height: 100%; width: 100%">
    <WidgetGroup
      :style-props="{
        gap: '0.75rem',
      }"
    >
      <WidgetArea id="1">
        <TotalProcessChangesWidget :total-changes="totalChanges" />
      </WidgetArea>
      <WidgetArea
        id="2"
        :size="1"
      >
        <ProcessChangeEventsWidget
          :reset-trigger="resetTrigger"
          :change-event-data="topItems"
          :selected-mold-id="selectedMoldId"
          :set-selected-mold-id="setSelectedMoldId"
          :scroll-top="processChangeEventsWidgetScrollTop"
        />
      </WidgetArea>
      <WidgetArea
        id="3"
        :size="2"
      >
        <ProcessChangeTrendWidget
          :reset-trigger="resetTrigger"
          :chart-data="chartItems"
          :selected-year="selectedYear"
          :time-scale="timeScale"
          :selected-date-from-chart="selectedDateFromChart"
          :set-selected-date-from-chart-item="setSelectedDateFromChartItem"
        />
      </WidgetArea>
      <WidgetArea
        id="4"
        :size="4"
      >
        <ProcessChangeDataTable
          :contents="tableData"
          :current-page="currentPage"
          :total-page="lastPage ?? 0"
          :is-fetching="isFetchingTableData"
          :fetch-next-process-changes="fetchNextProcessChanges"
          :fetch-previous-process-changes="fetchPreviousProcessChanges"
          :table-sort="tableSort"
          :set-table-sort="setTableSort"
          :is-event-details-modal-opened="isEventDetailsModalOpened"
          :open-event-detail-modal="openEventDetailModal"
        ></ProcessChangeDataTable>
      </WidgetArea>
    </WidgetGroup>
    <ProcessChangeEventDetailsModal
      v-if="isEventDetailsModalOpened"
      :open="isEventDetailsModalOpened"
      :get-process-change-details="getProcessChangeDetails"
      :close-event-detail-modal="closeEventDetailModal"
      :event-details-params="eventDetailsParams"
    />
  </div>
</template>
