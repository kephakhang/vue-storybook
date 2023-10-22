<script lang="ts">
import type { PropType } from "@vue/composition-api";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  nextTick,
} from "@vue/composition-api";
import { Icon, Modal, Portal, Pagination } from "../../..";
import DataTable from "~/components/DataTableV3/data-table.vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import type { GetProcessChangeDetails } from "~/pages/ProcessChange/types";
import type { SortQuryParamValue } from "~/types/common";
import { DropdownRoot } from "~/components/DropdownV2/index.ts";
import DropdownTrigger from "~/components/DropdownV2/components/dropdown-trigger.vue";
import DropdownPortal from "~/components/DropdownV2/components/dropdown-portal.vue";
import DropdownContent from "~/components/DropdownV2/components/dropdown-content.vue";
import DropdownItem from "~/components/DropdownV2/components/dropdown-item.vue";

const tableHeaders = [
  {
    id: 1,
    title: "Date/ Time",
    key: "procChgTime",
    styles: {
      width: "24%",
      align: "left",
    },
  },
  {
    id: 2,
    title: "Plant",
    key: "locationName",
    styles: {
      width: "21%",
      align: "left",
    },
  },
  {
    id: 3,
    title: "Part Name",
    key: "parts",
    styles: {
      width: "21%",
      align: "left",
    },
  },
  {
    id: 4,
    title: "Reason",
    key: "",
    styles: {
      width: "18%",
      align: "left",
    },
  },
  {
    id: 5,
    title: "Reported by",
    key: "",
    styles: {
      width: "18%",
      align: "left",
    },
  },
];

export default defineComponent({
  components: {
    DropdownItem,
    DropdownContent,
    DropdownPortal,
    DropdownTrigger,
    DropdownRoot,
    Icon,
    DataTable,
    Modal,
    Portal,
    Pagination,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    eventDetailsParams: {
      type: Object as PropType<{
        moldId: number;
        dateHourRange: string;
      }>,
      required: true,
    },
    closeEventDetailModal: {
      type: Function as PropType<() => void>,
      required: true,
    },
    getProcessChangeDetails: {
      type: Function as PropType<GetProcessChangeDetails>,
      required: true,
    },
  },
  setup(props) {
    const tableHeaderRef = ref<HTMLElement | null>(null);
    const tableTooltipRef = ref<HTMLElement | null>(null);
    const tableRef = ref<HTMLElement | null>(null);
    const tableSort = ref<SortQuryParamValue | null>();
    const isTableSortByDesc = ref<boolean>(true);
    const currentPage = ref(1);
    const isOpenedTableTooltip = ref<boolean>(false);
    const tableTooltipInfo = reactive<{
      top: number | null;
      left: number | null;
      text: string | null;
    }>({ top: null, left: null, text: null });
    const badgeInfo = reactive<{
      id: number | null;
      index: number | null;
    }>({ id: null, index: null });

    const onCloseModal = () => {
      props.closeEventDetailModal?.();
    };

    const setTableSort = (key) => {
      if (!key) {
        tableSort.value = null;
        return;
      }
      isTableSortByDesc.value = !isTableSortByDesc.value;
      tableSort.value = `${key},${isTableSortByDesc.value ? "desc" : "asc"}`;
      tableScrollToTop();
    };

    const getTableHeaderHeight = () => {
      if (!tableHeaderRef.value) return 0;
      return tableHeaderRef.value.getBoundingClientRect().height;
    };

    const {
      data,
      fetchNextPage,
      fetchPreviousPage,
      isFetchingNextPage,
      isFetchingPreviousPage,
    } = useInfiniteQuery({
      queryKey: [
        "processChangeDetails",
        props.eventDetailsParams.dateHourRange,
        props.eventDetailsParams.moldId,
        tableSort,
      ],
      queryFn: ({ pageParam = 1 }) => {
        return props.getProcessChangeDetails({
          dateHourRange: props.eventDetailsParams.dateHourRange,
          moldId: props.eventDetailsParams.moldId,
          page: pageParam,
          size: 20,
          sort: tableSort.value ?? undefined,
        });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 2;
      },
      getPreviousPageParam: (firstPage) => {
        return firstPage.first ? undefined : firstPage.pageable.pageNumber;
      },
    });

    const fetchNextDetailPage = async () => {
      await fetchNextPage();
      tableScrollToTop();
      currentPage.value++;
    };

    const fetchPreviousDetailPage = async () => {
      await fetchPreviousPage();
      tableScrollToTop();
      currentPage.value--;
    };

    const setTooltip = async (e, text) => {
      if (e.target.clientWidth >= e.target.scrollWidth || !text) return;

      tableTooltipInfo.text = text;
      isOpenedTableTooltip.value = true;

      await nextTick();
      const targetRect = e.target!.getBoundingClientRect();
      const tooltipRect = tableTooltipRef.value!.getBoundingClientRect();

      tableTooltipInfo.top =
        targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
      tableTooltipInfo.left = targetRect.left + targetRect.width + 8;
    };

    const initializeTableTooltip = () => {
      tableTooltipInfo.top = null;
      tableTooltipInfo.left = null;
      tableTooltipInfo.text = null;
      isOpenedTableTooltip.value = false;
    };

    const openDropdownBadge = (id, index) => {
      if (badgeInfo.id === id && badgeInfo.index === index) {
        badgeInfo.id = null;
        badgeInfo.index = null;
        return;
      }
      badgeInfo.id = id;
      badgeInfo.index = index;
    };

    const closeDropdownBadge = () => {
      badgeInfo.id = null;
      badgeInfo.index = null;
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

    const isFetchingData = computed(() => {
      return isFetchingNextPage.value || isFetchingPreviousPage.value;
    });

    const lastPage = computed(() => {
      return data.value?.pages.at(-1)?.totalPages;
    });

    const moldCode = computed(() => {
      return data.value?.pages.at(currentPage.value - 1)?.moldCode;
    });

    const timeRange = computed(() => {
      return data.value?.pages.at(currentPage.value - 1)?.dateHourRange;
    });

    const contents = computed(() => {
      return data.value?.pages.at(-1)?.content ?? [];
    });

    const tableTooltipPosition = computed(() => {
      return {
        top: `${tableTooltipInfo.top}px`,
        left: `${tableTooltipInfo.left}px`,
      };
    });

    return {
      tableHeaderRef,
      tableTooltipRef,
      tableRef,
      tableHeaders,
      tableSort,
      currentPage,
      lastPage,
      moldCode,
      timeRange,
      contents,
      isFetchingData,
      tableTooltipInfo,
      tableTooltipPosition,
      isOpenedTableTooltip,
      badgeInfo,
      onCloseModal,
      setTableSort,
      getTableHeaderHeight,
      fetchNextDetailPage,
      fetchPreviousDetailPage,
      setTooltip,
      initializeTableTooltip,
      openDropdownBadge,
      closeDropdownBadge,
    };
  },
});
</script>

<template>
  <Portal :open="open">
    <Modal
      :is-opened="open"
      :modal-handler="onCloseModal"
      heading-text="Process Change Event Details"
    >
      <template #body>
        <div :class="$style['main-container']">
          <div :class="$style['header-container']">
            <div>
              <span>Tooling</span>
              <span>{{ moldCode }}</span>
            </div>
            <div>
              <span>Date/ Time</span>
              <span>{{ timeRange }}</span>
            </div>
          </div>
          <div :class="$style['table-container']">
            <DataTable ref="tableRef">
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
                    <div :class="$style['table-header']">
                      <span>{{ header.title }}</span>
                      <Icon
                        :button-type="
                          tableSort === `${header.key},asc`
                            ? 'sort-asce'
                            : 'sort-desc'
                        "
                        :click-handler="() => setTableSort(header.key)"
                        :active="tableSort?.includes(header.key)"
                        :disabled="!header.key"
                      ></Icon>
                    </div>
                  </th>
                </tr>
              </template>
              <template #tbody>
                <div
                  v-if="false"
                  :class="$style['table-empty-body']"
                  :style="{
                    height: `calc(100% - ${getTableHeaderHeight()}px)`,
                  }"
                >
                  No Data Available
                </div>
                <tr
                  v-for="(content, index) in contents"
                  :key="index"
                >
                  <td>
                    <div
                      :class="$style['truncate-text']"
                      @mouseover.stop="
                        (e) => setTooltip(e, content.procChgTime)
                      "
                      @mouseleave.stop="initializeTableTooltip"
                    >
                      {{ content.procChgTime ?? "-" }}
                    </div>
                  </td>
                  <td>
                    <div
                      :class="$style['truncate-text']"
                      @mouseover.stop="
                        (e) => setTooltip(e, content.locationName)
                      "
                      @mouseleave.stop="initializeTableTooltip"
                    >
                      {{ content.locationName ?? "-" }}
                    </div>
                  </td>
                  <td>
                    <div :class="$style['td-width-dropdown-badge']">
                      <div
                        :class="$style['truncate-text']"
                        @mouseover.stop="
                          (e) => setTooltip(e, content.parts[0]?.name)
                        "
                        @mouseleave.stop="initializeTableTooltip"
                      >
                        {{ content.parts[0]?.name ?? "-" }}
                      </div>

                      <DropdownRoot
                        v-if="content.parts.length > 1"
                        position="auto"
                        :on-dropdown-close="closeDropdownBadge"
                      >
                        <DropdownTrigger>
                          <div
                            :class="$style['dropdown-badge-container']"
                            @click="
                              openDropdownBadge(content.parts[0].id, index)
                            "
                          >
                            <span
                              :active="
                                badgeInfo.id === content.parts[0].id &&
                                badgeInfo.index === index
                              "
                              :class="
                                badgeInfo.id === content.parts[0].id &&
                                badgeInfo.index === index
                                  ? $style['-active']
                                  : $style['-inactive']
                              "
                            >
                              <img
                                src="~assets/images/icon/downward-icon-skinny-default.svg"
                                alt="downward-icon"
                              />
                            </span>
                            <span>+{{ content.parts.length - 1 }}</span>
                          </div>
                        </DropdownTrigger>
                        <DropdownPortal>
                          <DropdownContent>
                            <template v-for="(part, index) in content.parts">
                              <DropdownItem
                                v-if="index !== 0"
                                :key="index"
                                :text="part.name"
                              ></DropdownItem>
                            </template>
                          </DropdownContent>
                        </DropdownPortal>
                      </DropdownRoot>
                    </div>
                  </td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </template>
            </DataTable>
          </div>
        </div>
      </template>
      <template #footer>
        <Pagination
          :disabled="isFetchingData"
          :current-page="currentPage"
          :total-page="lastPage ?? 0"
          :next-click-handler="fetchNextDetailPage"
          :previous-click-handler="fetchPreviousDetailPage"
        ></Pagination>
      </template>
    </Modal>
    <Portal :open="isOpenedTableTooltip">
      <div
        ref="tableTooltipRef"
        :style="tableTooltipPosition"
        :class="$style['table-tooltip-container']"
      >
        {{ tableTooltipInfo.text }}
      </div>
    </Portal>
  </Portal>
</template>

<style lang="scss" module>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-container {
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 3rem;
  padding-bottom: 1.25rem;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 0.938rem;

  & > div {
    display: flex;
    align-items: center;
    width: 50%;
    gap: 1.75rem;

    & > span:first-child {
      font-weight: 700;
    }
  }
}

.table-container {
  width: 100%;
  height: calc(100% - 3rem);

  td {
    vertical-align: top;
  }
}

.table-header {
  display: flex;
  align-items: center;
}

.table-empty-body {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #efefef;
  position: absolute;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 0.75rem;
  color: #4b4b4b;
}

.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}

.td-width-dropdown-badge {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
}

.dropdown-badge-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;

  & > span:first-child {
    display: flex;
    align-items: center;
    transition: all 0.3s;

    &[active] {
      transform: rotate(180deg);
    }

    & img {
      display: block;
    }
  }

  & > span:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 1.25rem;
    background: #3491ff;
    color: #ffffff;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 0.703rem;
  }

  &:hover {
    & > span:nth-child(2) {
      background: #3585e5;
    }
  }
}

.table-tooltip-container {
  width: fit-content;
  min-width: 1.5rem;
  height: fit-content;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  white-space: nowrap;
  color: #ffffff;
  padding: 0.375rem 0.5rem;
  position: absolute;
  border-radius: 0.188rem;
  background: rgba(75, 75, 75, 0.9);
  z-index: 9999;
  transition: all 0.2s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 0.375rem solid transparent;
    border-right-color: rgba(75, 75, 75, 0.9);
    left: 0;
    top: 50%;
    border-left: 0;
    margin-top: -0.375rem;
    margin-left: -0.375rem;
  }
}
</style>
