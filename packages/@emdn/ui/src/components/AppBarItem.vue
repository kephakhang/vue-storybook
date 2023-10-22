<script setup lang="ts">
import type { AnchorHTMLAttributes } from "vue";
interface Props extends /** @vue-ignore */ AnchorHTMLAttributes {
  selected: boolean;
}
withDefaults(defineProps<Props>(), {
  selected: false,
});
</script>
<template>
  <a
    v-bind="$attrs"
    class="box-border grid h-[3.125rem] min-w-[7.5rem] place-items-center px-4 text-base text-white"
    :class="
      selected
        ? 'border-b-[6px] border-solid border-blue-200 bg-brand-700 font-bold'
        : 'bg-transparent font-normal hover:border-b-[6px] hover:border-solid hover:border-blue-200 active:bg-brand-500'
    "
  >
    <slot></slot>
  </a>
</template>
