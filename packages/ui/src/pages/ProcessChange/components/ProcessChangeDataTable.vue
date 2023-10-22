<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  type PropType,
} from "@vue/composition-api";
import { CtaButton, DataTableV3, Icon, Pagination } from "../../..";
import type { ProcessChangeContent } from "~/pages/ProcessChange/types";

const tableHeaders = [
  {
    id: 1,
    title: "Tooling ID",
    styles: {
      width: "20%",
      align: "left",
    },
    key: "moldCode",
  },
  {
    id: 2,
    title: "Date/ Time",
    styles: {
      width: "20%",
      align: "left",
    },
    key: "dateHourRange",
  },
  {
    id: 3,
    title: "Change Events",
    styles: {
      width: "20%",
      align: "left",
    },
    key: "procChgCount",
  },
  {
    id: 4,
    title: "Supplier",
    styles: {
      width: "20%",
      align: "left",
    },
    key: "supplierName",
  },
  {
    id: 5,
    title: "Plant",
    styles: {
      width: "20%",
      align: "left",
    },
    key: "locationName",
  },
];

export default defineComponent({
  components: {
    DataTable: DataTableV3,
    CtaButton,
    Icon,
    Pagination,
  },
  props: {
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
    fetchNextProcessChanges: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
    fetchPreviousProcessChanges: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
    contents: {
      type: Array as PropType<ProcessChangeContent[]>,
      required: true,
    },
    tableSort: String,
    setTableSort: {
      type: Function as PropType<(key?: string) => void>,
      required: true,
    },
    isEventDetailsModalOpened: {
      type: Boolean,
      default: false,
    },
    openEventDetailModal: {
      type: Function as PropType<(id: number, timeRange: string) => void>,
    },
  },
  setup(props) {
    const tableRef = ref<HTMLElement | null>(null);
    const tableHeaderRef = ref<HTMLDivElement | null>(null);

    const clickToOpenEventDetailsModal = (id: number, timeRange: string) => {
      props.openEventDetailModal?.(id, timeRange);
    };

    const getTableHeaderHeight = () => {
      return tableHeaderRef.value
        ? tableHeaderRef.value.getBoundingClientRect().height
        : 0;
    };

    const tableScrollToTop = () => {
      const tableWrapperRef = tableRef.value?.["tableWrapper"];

      if (
        tableWrapperRef &&
        tableWrapperRef.scrollHeight > tableWrapperRef.clientHeight
      ) {
        tableWrapperRef.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    watch(
      () => props.currentPage,
      () => {
        tableScrollToTop();
      }
    );

    return {
      tableRef,
      tableHeaders,
      tableHeaderRef,
      clickToOpenEventDetailsModal,
      getTableHeaderHeight,
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
          :style="{ width: header.styles.width }"
        />
      </template>
      <template #thead>
        <tr ref="tableHeaderRef">
          <th
            v-for="(header, index) in tableHeaders"
            :key="index"
            :style="{ width: header.styles.width }"
          >
            <div class="table-header">
              <span>{{ header.title }}</span>
              <Icon
                :button-type="
                  tableSort === `${header.key},asc` ? 'sort-asce' : 'sort-desc'
                "
                :click-handler="() => setTableSort(header.key)"
                :active="tableSort?.includes(header.key)"
              ></Icon>
            </div>
          </th>
        </tr>
      </template>
      <template #tbody>
        <div
          v-if="!contents.length"
          class="pc-empty-table-body"
          :style="{ height: `calc(100% - ${getTableHeaderHeight()}px)` }"
        >
          No Data Available
        </div>
        <template v-else>
          <tr
            v-for="(data, index) in contents"
            :key="index"
          >
            <td>{{ data.moldCode }}</td>
            <td>{{ data.dateHourRange }}</td>
            <td>
              <CtaButton
                :variant="'text hyperlink'"
                :style-props="{ height: '1.25rem', padding: 0 }"
                :click-handler="
                  () =>
                    clickToOpenEventDetailsModal(
                      data.moldId,
                      data.dateHourRange
                    )
                "
              >
                {{ data.procChgCount }} Changes
              </CtaButton>
            </td>
            <td>{{ data.supplierName }}</td>
            <td>{{ data.locationName }}</td>
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
        :previous-click-handler="fetchPreviousProcessChanges"
        :next-click-handler="fetchNextProcessChanges"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  display: inline-flex;
  align-items: center;
  word-break: break-word;
}

.pc-empty-table-body {
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
  font-size: 12px;
  color: #4b4b4b;
}
</style>
