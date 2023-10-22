<script setup lang="ts">
import { CtaButton } from "@emdn/ui";
import { Icon } from "@iconify/vue";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import {
  DialogContent,
  DialogOverlay,
  DialogRoot,
  DialogTrigger,
} from "radix-vue";
import { type ComputedRef, computed, ref } from "vue";
import { useSystemCodes } from "~/common/hooks";
import { type Company, type CompanyStatuses, companyApi } from "../api";
import { PaginationBar, TableHeaderTab, type BaseList } from "./index";
import { refDebounced } from "@vueuse/core";

const PAGE_SIZE = 20 as const;

const props = defineProps<{
  open: boolean;
  handleSelect?: (data: Company) => void;
  handleOpen: (value: boolean) => void;
}>();

const { systemCodes } = useSystemCodes();
const activeTab = ref<CompanyStatuses>("active");
const page = ref(1);
const searchText = ref("");
const debounceSearchText = refDebounced(searchText, 500);

const { data: rawCompaniesData } = useQuery({
  // PAGE_SIZE is static value, so it's not included in the query key.
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  queryKey: ["companiesQueries", activeTab, page, debounceSearchText],
  queryFn: async () => {
    return companyApi
      .getCompanies({
        page: page.value,
        status: activeTab.value,
        size: PAGE_SIZE,
        query: debounceSearchText.value,
      })
      .then((res) => res.data)
      .catch((error) => console.error("Failed to load company list", error));
  },
  placeholderData: keepPreviousData,
});

const companiesData = computed(() => {
  return rawCompaniesData.value?.content;
});

const tabList: ComputedRef<BaseList[]> = computed(() => {
  return [
    { title: "All", code: "active" },
    ...systemCodes.value.CompanyType,
  ].map((item) => ({
    title: item.title ?? "",
    code: item.code as CompanyStatuses,
  }));
});

const tableColumnList = computed(() => [
  { label: "Company Name", field: "name", algin: "left" },
  { label: "Company ID", field: "companyCode" },
  { label: "Company Type", field: "companyTypeText" },
  { label: "Select", field: "select-action", action: props.handleSelect },
]);

const onChangeTab = (tab?: CompanyStatuses) => {
  activeTab.value = tab ?? "active";
};

const onChangePage = (pageNumber: number) => {
  page.value = pageNumber;
};
</script>

<template>
  <DialogRoot
    :open="open"
    @update:open="handleOpen"
  >
    <DialogTrigger />
    <DialogOverlay
      class="fixed inset-0 z-[1] grid place-items-center overflow-y-auto bg-[rgba(0_0_0_/_0.5)]"
    >
      <DialogContent
        class="pointer-events-auto relative mx-auto my-7 flex w-full max-w-xl flex-col rounded border-none bg-white bg-clip-padding shadow-lg outline-0"
      >
        <div>
          <div
            class="flex items-start justify-between rounded-t-md border-b border-solid border-b-slate-300 p-4"
          >
            <h5>Company Search</h5>
            <button @click="handleOpen(false)">
              <Icon
                icon="ri:close-fill"
                class="h-5 w-5 text-stone-800"
              />
            </button>
          </div>
          <div class="relative flex-auto overflow-x-auto p-4">
            <div class="relative mb-2 flex w-full flex-wrap items-stretch">
              <div
                class="-mr-px mb-0 flex w-11 items-center justify-center whitespace-nowrap rounded rounded-r-none border border-solid border-slate-300 bg-gray-50 text-center align-middle text-base font-normal leading-normal text-stone-400"
              >
                <Icon
                  icon="material-symbols:search"
                  class="h-5 w-5 text-stone-500"
                />
              </div>
              <input
                v-model="searchText"
                class="block grow rounded !rounded-l-none border border-solid border-slate-300 bg-clip-padding px-3 py-1.5 text-base leading-normal text-stone-400 outline-0 transition-[border-color,shadow] delay-150 ease-in-out focus:border-blue-200 focus:text-stone-400 focus:ring focus:ring-blue-100 focus:ring-offset-0"
                type="text"
                placeholder="Search by company name or company ID"
              />
            </div>
            <div>
              <TableHeaderTab
                :list="tabList"
                :active-tab="activeTab"
                :on-change-tab="onChangeTab"
                :current-total-count="rawCompaniesData?.totalElements"
              />
              <table
                class="relative mb-4 w-full max-w-full border-separate border-spacing-0 overflow-x-auto bg-transparent"
              >
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col class="w-16" />
                </colgroup>
                <thead>
                  <tr>
                    <th
                      v-for="column in tableColumnList"
                      :key="column.field"
                      class="border-b-2 border-t border-solid border-y-gray-300 py-2 pl-2 pr-4 text-left align-middle"
                    >
                      {{ column.label }}
                    </th>
                  </tr>
                </thead>
                <tbody class="table-row-group">
                  <tr
                    v-for="item in companiesData"
                    :key="item.id"
                    class="odd:bg-slate-100"
                  >
                    <td
                      v-for="column in tableColumnList"
                      :key="column.field"
                      class="border-b border-t-0 border-solid border-b-gray-300 p-2 text-center align-top"
                      :class="{
                        '!text-left': column.algin === 'left',
                      }"
                    >
                      <div
                        v-if="!column.field.includes('action')"
                        class="max-w-[150px] truncate"
                      >
                        {{ item[column.field as keyof Company] }}
                      </div>
                      <CtaButton
                        v-else
                        variant="outline"
                        class="border border-gray-300 bg-white text-slate-900 hover:border-solid hover:border-white hover:bg-white focus:bg-white active:bg-white"
                        @click="column.action && column.action(item)"
                      >
                        {{ column.label }}
                      </CtaButton>
                    </td>
                  </tr>
                </tbody>
              </table>
              <PaginationBar
                :total="rawCompaniesData?.totalPages || 0"
                :active-page="page"
                :handle-paging="onChangePage"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  </DialogRoot>
</template>
