<script setup lang="ts">
defineProps<{
  label: string;
  required?: boolean;
}>();
</script>

<template>
  <div class="mb-0 py-2 leading-normal text-inherit">
    <label>
      <span>{{ label }}</span>
      <span
        v-if="required"
        class="absolute ml-1 mt-2 h-1.5 w-1.5 rounded-md bg-red-300 text-white"
      ></span>
    </label>
  </div>
</template>
