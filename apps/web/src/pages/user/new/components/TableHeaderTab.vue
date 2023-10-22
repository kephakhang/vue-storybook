<script setup lang="ts">
import { type CompanyStatuses } from "../api";

export interface BaseList {
  title?: string;
  code?: CompanyStatuses;
}

const props = defineProps<{
  list: BaseList[];
  activeTab: CompanyStatuses;
  onChangeTab: (tab?: CompanyStatuses) => void;
  currentTotalCount?: number;
}>();

const isActiveTab = (tab?: CompanyStatuses) => props.activeTab === tab;
</script>

<template>
  <ul class="mt-0 inline-flex list-none flex-wrap pl-0">
    <li
      v-for="tab in list"
      :key="tab.code"
      class="-mb-px"
      @click="onChangeTab(tab.code)"
    >
      <a
        href="javascript:void(0)"
        class="block rounded-t border border-solid border-transparent px-4 py-2 text-base text-slate-900 hover:cursor-pointer hover:border-slate-300"
        :class="{
          '!border-slate-300  border-b-white font-bold text-slate-400':
            isActiveTab(tab.code),
        }"
      >
        {{ tab.title }}
        <span
          v-if="isActiveTab(tab.code)"
          class="inline-block whitespace-nowrap rounded-lg bg-gray-50 px-2 py-1 text-center align-baseline text-xs font-bold leading-none text-slate-400"
        >
          {{ currentTotalCount }}
        </span>
      </a>
    </li>
  </ul>
</template>
