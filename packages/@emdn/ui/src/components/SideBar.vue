<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import AppDownloadButton from "./AppDownloadButton.vue";

const isOpened = ref(true);
const toggleIsOpened = () => {
  isOpened.value = !isOpened.value;
};
</script>
<template>
  <div class="group relative">
    <button
      class="absolute top-2 grid h-7 w-7 place-items-center rounded-full bg-brand-900 text-white"
      :class="[
        isOpened
          ? 'right-2 hover:bg-brand-700'
          : 'left-2 rotate-180 group-hover:bg-[#3585E5]',
      ]"
      @click="toggleIsOpened"
    >
      <Icon icon="material-symbols:chevron-left" />
    </button>
    <div
      v-if="isOpened"
      class="flex h-full w-[var(--side-bar-height,5.75rem)] flex-col bg-brand-900"
    >
      <div class="h-11"></div>
      <div class="grow">
        <slot></slot>
      </div>
      <div class="px-3">
        <!-- TODO(sun.lee): Add event -->
        <AppDownloadButton class="h-8 w-full" />
      </div>
      <div class="h-5"></div>
    </div>
    <div
      v-else
      class="h-full w-5 bg-[#818798] group-hover:bg-[#d8e2f8]"
      @click="toggleIsOpened"
    ></div>
  </div>
</template>
