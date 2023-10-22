<script lang="ts">
import { defineComponent, inject } from "@vue/composition-api";
import { IsSelectedKey } from "./accordion-item.vue";

export default defineComponent({
  setup() {
    const isSelected = inject<boolean>(IsSelectedKey)!;
    return { isSelected };
  },
});
</script>
<template>
  <div v-if="isSelected">
    <slot></slot>
  </div>
</template>
