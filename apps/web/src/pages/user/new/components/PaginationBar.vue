<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  total: number;
  activePage: number;
  handlePaging: (page: number) => void;
}>();

const pagination = computed(() =>
  Array.from({ length: props.total }, (_, i) => i + 1)
);

const shouldShowNextBtn = computed(() => props.activePage < props.total);
const shouldShowPreviousBtn = computed(() => props.activePage > 1);
</script>

<template>
  <div class="flex w-full flex-row">
    <ul class="mb-4 mt-0 flex list-none rounded pl-0 leading-tight">
      <li
        v-if="shouldShowPreviousBtn"
        class="-ml-px cursor-pointer border border-solid border-gray-300 bg-white px-3 py-2 first:ml-0 first:rounded-l hover:bg-slate-300 focus:ring focus:ring-blue-100 focus:ring-offset-0"
        @click="handlePaging(activePage - 1)"
      >
        Prev
      </li>
      <li
        v-for="data in pagination"
        :key="data"
        class="-ml-px cursor-pointer border border-solid border-gray-300 bg-white px-3 py-2 first:ml-0 first:rounded-l last:rounded-r hover:bg-slate-300 hover:text-inherit focus:ring focus:ring-blue-100 focus:ring-offset-0"
        :class="{
          'border-blue-300 !bg-blue-300 text-white hover:!bg-blue-300':
            data === activePage,
        }"
        @click="handlePaging(data)"
      >
        {{ data }}
      </li>
      <li
        v-if="shouldShowNextBtn"
        class="-ml-px cursor-pointer rounded-r border border-solid border-gray-300 bg-white px-3 py-2 hover:bg-slate-300 focus:ring focus:ring-blue-100 focus:ring-offset-0"
        @click="handlePaging(activePage + 1)"
      >
        Next
      </li>
    </ul>
  </div>
</template>
