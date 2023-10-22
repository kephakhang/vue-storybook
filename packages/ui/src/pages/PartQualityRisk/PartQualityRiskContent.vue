<script lang="ts">
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import {
  defineComponent,
  ref,
  computed,
  watch,
  type PropType,
  toRef,
} from "@vue/composition-api";
import type { SortQuryParamValue } from "~/types/common";

import YieldEstimationWidget from "./components/YieldEstimationWidget.vue";
import PartQualityRiskDataTable from "./components/PartQualityRiskDataTable.vue";

import { WidgetArea, WidgetGroup } from "../..";
import type {
  GetHeatmapItems,
  GetMoldItems,
  GetPartQualityRisk,
} from "./types";
import PartQualityRiskWidget from "./components/PartQualityRiskWidget.vue";

export default defineComponent({
  components: {
    WidgetArea,
    WidgetGroup,
    YieldEstimationWidget,
    PartQualityRiskDataTable,
    PartQualityRiskWidget,
  },
  props: {
    refetchTrigger: {
      type: Number,
      required: true,
    },
    getPartQualityRisk: {
      type: Function as PropType<GetPartQualityRisk>,
      required: true,
    },
    getHeatmapItems: {
      type: Function as PropType<GetHeatmapItems>,
      required: true,
    },
    getMoldItems: {
      type: Function as PropType<GetMoldItems>,
      required: true,
    },
    displayDate: {
      type: String,
      requred: true,
    },
  },
  setup(props) {
    const refetchTrigger = toRef(props, "refetchTrigger");
    const tableSort = ref<SortQuryParamValue>();
    const isTableSortByDesc = ref<boolean>(true);
    const currentPage = ref(1);
    const isSelectedMold = ref(false);
    const selectedMoldId = ref<number | null>();
    const selectedMoldCode = ref<string | null>();
    const queryClient = useQueryClient();

    const setTableSort = (key: string) => {
      if (!key) {
        tableSort.value = undefined;
        return;
      }
      isTableSortByDesc.value = !isTableSortByDesc.value;
      tableSort.value = `${key},${isTableSortByDesc.value ? "desc" : "asc"}`;
      currentPage.value = 1;
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
      refetch: refetchPartQualityRiskData,
    } = useInfiniteQuery({
      queryKey: ["partQualityRisk", tableSort],
      queryFn: ({ pageParam = 1 }) => {
        return props.getPartQualityRisk({
          page: pageParam as number,
          size: 20,
          sort: tableSort.value,
        });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 2;
      },
      getPreviousPageParam: (firstPage) => {
        return firstPage.first ? undefined : firstPage.pageable.pageNumber;
      },
    });

    const lastPage = computed(() => {
      return data.value?.pages.at(-1)?.totalPages;
    });

    const fetchNextPartQualityRisk = async () => {
      currentPage.value++;
      isSelectedMold.value = false;
      await fetchNextPage();
    };

    const fetchPreviousPartQualityRisk = async () => {
      currentPage.value--;
      isSelectedMold.value = false;
      await fetchPreviousPage();
    };

    const currentPageData = computed(() => {
      return data.value?.pages.at(currentPage.value - 1);
    });

    const tableData = computed(() => {
      return data.value?.pages.at(currentPage.value - 1)?.content ?? [];
    });

    const isFetchingTableData = computed(() => {
      return isFetchingNextPage.value || isFetchingPreviousPage.value;
    });

    const chartItems = computed(() => {
      return data.value?.pages.at(currentPage.value - 1)?.chartItems;
    });

    const moldId = computed(() => {
      return data.value?.pages.at(currentPage.value - 1)?.moldId;
    });

    const moldCode = computed(() => {
      return data.value?.pages.at(currentPage.value - 1)?.moldCode;
    });

    const { data: heatmapData, refetch: refetchHeatmapData } = useQuery({
      queryKey: ["heatmapItems", selectedMoldId],
      queryFn: () => {
        if (!selectedMoldId.value) return;

        return props.getHeatmapItems({
          moldId: selectedMoldId.value,
        });
      },
      enabled: !!selectedMoldId.value,
    });

    const heatmapItems = computed(() => {
      if (!selectedMoldId) return [];

      return (
        heatmapData.value?.heatmapItems.map((item) => {
          return {
            ...item,
            date: item.date.replace("/", "-"),
          };
        }) ?? []
      );
    });

    const setSelectedMold = async (id: number, code: string) => {
      selectedMoldId.value = id;
      selectedMoldCode.value = code;
      isSelectedMold.value = true;

      if (selectedMoldId.value) await refetchHeatmapData();
    };

    watch(refetchTrigger, () => {
      currentPage.value = 1;
      isSelectedMold.value = false;
      queryClient.invalidateQueries(["partQualityRisk"]);
    });

    watch(
      () => props.displayDate,
      async () => {
        currentPage.value = 1;
        isSelectedMold.value = false;
        await refetchPartQualityRiskData();
      }
    );

    watch(currentPageData, async () => {
      if (isSelectedMold.value) return;
      selectedMoldId.value = moldId.value;
      selectedMoldCode.value = moldCode.value;

      if (selectedMoldId.value) await refetchHeatmapData();
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
      chartItems,
      heatmapItems,
      selectedMoldCode,
      setTableSort,
      setSelectedMold,
      fetchNextPartQualityRisk,
      fetchPreviousPartQualityRisk,
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
      <WidgetArea
        id="1"
        :size="2"
      >
        <YieldEstimationWidget
          :chart-data="chartItems"
          :display-date="displayDate"
        />
      </WidgetArea>
      <WidgetArea
        id="2"
        :size="2"
      >
        <PartQualityRiskWidget
          :heatmap-data="heatmapItems"
          :display-date="displayDate"
          :selected-mold-code="selectedMoldCode"
          :set-selected-mold="setSelectedMold"
          :get-mold-items="getMoldItems"
        ></PartQualityRiskWidget>
      </WidgetArea>
      <WidgetArea
        id="4"
        :size="4"
      >
        <PartQualityRiskDataTable
          :contents="tableData"
          :current-page="currentPage"
          :total-page="!lastPage ? 1 : lastPage"
          :is-fetching="isFetchingTableData"
          :fetch-next-part-quality-risk="fetchNextPartQualityRisk"
          :fetch-previous-part-quality-risk="fetchPreviousPartQualityRisk"
          :table-sort="tableSort"
          :set-table-sort="setTableSort"
        ></PartQualityRiskDataTable>
      </WidgetArea>
    </WidgetGroup>
  </div>
</template>
