<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div
    class="relative mb-4 flex w-full min-w-0 flex-col rounded border border-solid border-gray-300 bg-white bg-clip-border"
  >
    <strong
      class="mb-0 rounded-t border-b border-solid border-b-gray-300 bg-gray-50 px-5 py-3 text-slate-700"
    >
      {{ title }}
    </strong>
    <div class="flex w-full flex-auto flex-col gap-y-4 p-5">
      <slot></slot>
    </div>
  </div>
</template>
