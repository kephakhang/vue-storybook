<script setup lang="ts">
import type { AnchorHTMLAttributes } from "vue";

interface Props extends /** @vue-ignore */ AnchorHTMLAttributes {
  selected: boolean;
  iconUrl: string;
}

withDefaults(defineProps<Props>(), {
  selected: false,
});
</script>
<template>
  <a
    v-bind="$attrs"
    class="grid w-full place-items-center border-b-4 pt-1 text-center text-sm leading-tight text-white"
    :class="
      selected
        ? 'border-b-blue-200 bg-brand-700 font-bold'
        : 'border-b-transparent hover:border-b-blue-200 hover:font-bold active:bg-brand-500 active:font-bold'
    "
  >
    <img
      class="h-9 w-9 p-[0.375rem]"
      :src="iconUrl"
      alt="sidebar icon"
    />
    <slot></slot>
    <div class="h-1"></div>
  </a>
</template>
