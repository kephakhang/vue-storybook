<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  type ComputedRef,
} from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import { IsSelectedKey, ToggleValueKey } from "./accordion-item.vue";

export default defineComponent({
  setup() {
    const toggleValue = inject<() => void>(ToggleValueKey)!;
    const isSelected = inject<ComputedRef<boolean>>(IsSelectedKey)!;

    const rotate = computed<StyleValue>(() => {
      return {
        transition: "transform 0.3s ease-in-out",
        transform: `rotate(${isSelected.value ? 180 : 0}deg)`,
      };
    });

    return { toggleValue, isSelected, rotate };
  },
});
</script>
<template>
  <div @click="toggleValue">
    <slot
      :is-selected="isSelected"
      :rotate="rotate"
    ></slot>
  </div>
</template>
