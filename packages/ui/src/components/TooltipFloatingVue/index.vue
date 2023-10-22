<script lang="ts">
import type { PropType } from "@vue/composition-api";
import { defineComponent } from "@vue/composition-api";
import "floating-vue/dist/style.css";

export default defineComponent({
  name: "TooltipFloatingVue",
  props: {
    theme: { type: String as PropType<"dark" | "light">, default: "light" },
    shown: { type: Boolean, default: false },
    triggers: { type: Array, default: () => ["hover", "focus"] },
  },
});
</script>

<template>
  <VDropdown
    :theme="theme"
    :triggers="triggers"
    :shown="shown"
  >
    <!-- popover target -->
    <slot name="tooltip-target"></slot>
    <template #popper>
      <!-- content of the popover -->
      <slot name="tooltip-content"></slot>
    </template>
  </VDropdown>
</template>

<style lang="scss">
@import "./index.scss";
</style>
