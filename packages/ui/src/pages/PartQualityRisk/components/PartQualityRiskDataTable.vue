<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  type PropType,
} from "@vue/composition-api";
import { DataTableV3, Icon, Pagination } from "~/index";
import type { TableHeader, PartQualityRiskContent } from "../types";
import TableDataWithTooltip from "./TableDataWithTooltip.vue";

const tableHeaders: Readonly<TableHeader[]> = [
  {
    id: 1,
    title: "Part Name",
    styles: {
      width: "",
      align: "start",
    },
    key: "partName",
    disabled: false,
  },
  {
    id: 2,
    title: "Tooling ID",
    styles: {
      width: "",
      align: "start",
    },
    key: "moldCode",
    disabled: false,
  },
  {
    id: 3,
    title: "Supplier",
    styles: {
      width: "",
      align: "start",
    },
    key: "supplierName",
    disabled: false,
  },
  {
    id: 4,
    title: "Plant",
    styles: {
      width: "",
      align: "start",
    },
    key: "locationName",
    disabled: false,
  },
  {
    id: 5,
    title: "Parts Produced",
    styles: {
      width: "",
      align: "end",
    },
    key: "prodQty",
    disabled: false,
  },
  {
    id: 6,
    title: "Estimated Yield Rate",
    styles: {
      width: "",
      align: "end",
    },
    key: "estimYieldRate",
    disabled: false,
  },
  {
    id: 7,
    title: "Trend",
    styles: {
      width: "",
      align: "end",
    },
    key: "trend",
    disabled: true,
  },
] as const;

export default defineComponent({
  components: {
    DataTable: DataTableV3,
    Icon,
    Pagination,
    TableDataWithTooltip,
  },
  props: {
    contents: {
      type: Array as PropType<PartQualityRiskContent[]>,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalPage: {
      type: Number,
      required: true,
    },
    isFetching: {
      type: Boolean,
      required: true,
    },
    fetchNextPartQualityRisk: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
    fetchPreviousPartQualityRisk: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
    tableSort: {
      type: String,
    },
    setTableSort: {
      type: Function as PropType<(key?: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const tableRef = ref<
      (HTMLElement & { tableWrapper: HTMLDivElement }) | null
    >(null);
    const tableHeaderRef = ref<HTMLDivElement | null>(null);

    const getTableHeaderHeight = () => {
      return tableHeaderRef.value
        ? tableHeaderRef.value.getBoundingClientRect().height
        : 0;
    };

    const tableScrollToTop = () => {
      if (!tableRef.value) return;

      const tableWrapperRef = tableRef.value.tableWrapper;

      if (
        tableWrapperRef &&
        tableWrapperRef.scrollHeight > tableWrapperRef.clientHeight
      ) {
        tableWrapperRef.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const displayTrend = (value: number) => {
      if (!value) {
        if (value === 0) return "0.0%";
        return "-";
      }
      return `${Math.abs(Number(value.toFixed(1)))}%`;
    };

    const getTrendStatus = (rate: number) => {
      if (typeof rate === "undefined") return "";

      switch (Math.sign(rate)) {
        case 0:
          return "steady";
        case 1:
          return "increase";
        case -1:
          return "decrease";
        default:
          return "";
      }
    };

    const setTableAlign = (id: number) => {
      return tableHeaders.find((header) => header.id === id)?.styles.align;
    };

    watch(
      () => props.currentPage,
      () => {
        tableScrollToTop();
      }
    );

    return {
      tableRef,
      tableHeaderRef,
      tableHeaders,
      getTableHeaderHeight,
      displayTrend,
      getTrendStatus,
      setTableAlign,
    };
  },
});
</script>
<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <DataTable
      ref="tableRef"
      :style-props="{
        'flex-grow': 1,
      }"
    >
      <template #colgroup>
        <col
          v-for="(header, index) in tableHeaders"
          :key="index"
          :style="{
            width: header.styles.width,
          }"
        />
      </template>
      <template #thead>
        <tr ref="tableHeaderRef">
          <th
            v-for="(header, index) in tableHeaders"
            :key="index"
            :style="{
              padding: '0.5rem 0.25rem 0.5rem 1rem',
              width: header.styles.width,
              textAlign: header.styles.align,
            }"
          >
            <div :class="$style['table-header']">
              <span>{{ header.title }}</span>
              <Icon
                :button-type="
                  tableSort === `${header.key},asc` ? 'sort-asce' : 'sort-desc'
                "
                :click-handler="() => setTableSort(header.key)"
                :active="tableSort?.includes(header.key)"
                :disabled="header.disabled"
              ></Icon>
            </div>
          </th>
        </tr>
      </template>
      <template #tbody>
        <template v-if="!contents.length">
          <div
            :class="$style['empty-table-body']"
            :style="{ height: `calc(100% - ${getTableHeaderHeight()}px)` }"
          >
            No Data Available
          </div>
        </template>
        <template v-else>
          <tr
            v-for="(data, index) in contents"
            :key="index"
          >
            <td :style="{ textAlign: setTableAlign(1) }">
              <div>
                <TableDataWithTooltip
                  :content="data.partCode"
                ></TableDataWithTooltip>
              </div>
            </td>
            <td :style="{ textAlign: setTableAlign(2) }">
              <div>
                <TableDataWithTooltip
                  :content="data.moldCode"
                ></TableDataWithTooltip>
              </div>
            </td>
            <td :style="{ textAlign: setTableAlign(3) }">
              <div>
                <TableDataWithTooltip
                  :content="data.supplierName"
                ></TableDataWithTooltip>
              </div>
            </td>
            <td :style="{ textAlign: setTableAlign(4) }">
              <div>
                <TableDataWithTooltip
                  :content="data.locationName"
                ></TableDataWithTooltip>
              </div>
            </td>
            <td :style="{ textAlign: setTableAlign(5) }">
              <div>{{ data.prodQty.toLocaleString() }}</div>
            </td>
            <td :style="{ textAlign: setTableAlign(6) }">
              <div>
                {{ data.estimYieldRate ? `${data.estimYieldRate}%` : "" }}
              </div>
            </td>
            <td :style="{ textAlign: setTableAlign(7) }">
              <div
                style="
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  gap: 0.25rem;
                "
              >
                <div
                  v-if="
                    typeof data.trend !== 'undefined' && data.trend !== null
                  "
                  :class="[
                    $style['trend-icon'],
                    $style[`${getTrendStatus(data.trend)}`],
                  ]"
                ></div>
                <span>
                  {{ displayTrend(data.trend) }}
                </span>
              </div>
            </td>
          </tr>
        </template>
      </template>
    </DataTable>
    <!-- TODO(sun.lee): Fix table overflow -->
    <div style="height: calc(0.5rem - 1px)"></div>
    <div
      style="display: flex; justify-content: flex-end; padding-right: 0.5rem"
    >
      <Pagination
        :current-page="currentPage"
        :total-page="totalPage"
        :disabled="isFetching"
        :previous-click-handler="fetchPreviousPartQualityRisk"
        :next-click-handler="fetchNextPartQualityRisk"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.table-header {
  display: inline-flex;
  align-items: center;
  word-break: break-word;
}

.empty-table-body {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #efefef;
  position: absolute;
  font-family:
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 0.75rem;
  color: #4b4b4b;
}

.trend-icon {
  width: 0.75rem;
  height: 0.75rem;
  &.steady {
    background: url(~assets/images/icon/trend-steady.svg) no-repeat center;
  }

  &.increase {
    background: url(~assets/images/icon/trend-increase.svg) no-repeat center;
  }

  &.decrease {
    background: url(~assets/images/icon/trend-decrease.svg) no-repeat center;
  }
}
</style>
