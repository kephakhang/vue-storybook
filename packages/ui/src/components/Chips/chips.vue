<!--
Summary. 
Chips isolated component shows the tabs with closeable icon. 

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.4.0
@access     module

@alias    Chips
@member of emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states

 
@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

export default defineComponent({
  name: "Chips",
  props: {
    /**
     * set chips container style properties {ex {width: 100px; height 100px}}
     */
    styleProps: [String, Object] as PropType<StyleValue>,

    /**
     * set inactive state
     */
    inactive: {
      type: Boolean as PropType<boolean>,
      default: false,
    },

    /**
     * set close icon handler
     */
    clickHandler: Function,
  },
  methods: {
    /**
     * click handler to return the value
     */
    executor() {
      this.clickHandler?.();
    },
  },
});
</script>

<template>
  <div
    :class="$style['chips-container']"
    :style="styleProps"
    :inactive="inactive"
  >
    <span>
      <!-- @slot optional slot for templating -->
      <slot></slot>
    </span>
    <div
      v-if="!inactive"
      @click="executor"
    >
      <img alt="close-icon" />
    </div>
  </div>
</template>

<style lang="scss" module scoped>
@import "./chips.module";
</style>
