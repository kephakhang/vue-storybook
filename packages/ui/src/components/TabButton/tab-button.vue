<!--
  Summary. 
   Tab Button isolated component type of tab. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    TabButton
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/
 
 
  @return component.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { TabButtonType, TabType, TabStyleType } from "~/types/TabButton";

export default defineComponent({
  name: "TabButton",
  props: {
    /** list of objects to create tabs */
    tabButtons: {
      type: Array as PropType<TabButtonType[]>,
      default: [] as TabButtonType[],
    },
    /** Click handler for tab */
    clickHandler: Function as PropType<(button: TabButtonType) => void>,
    /** type of tab (primary-tab,secondary-tab) */
    tabType: {
      type: String as PropType<TabType>,
      default: "primary-tab",
    },
    /** style  of tab (horizontal, vertical) */
    tabStyle: {
      type: String as PropType<TabStyleType>,
      default: "horizontal",
    },
  },
  methods: {
    /**
     * click handler make active to clicked tab
     * @param button
     */
    onClick(button: TabButtonType) {
      this.tabButtons.forEach((btn) => {
        btn.active = btn === button;
      });

      this.$forceUpdate();
      // Invoke the clickHandler callback with the selected button
      this.clickHandler?.(button);
      // emit tabButtonsEmit method and returns all tabButtons
      this.$emit("tab-buttons-emit", this.tabButtons);
    },
  },
});
</script>

<!-- template -->
<template>
  <div :class="$style[tabStyle]">
    <button
      v-for="(button, index) in tabButtons"
      :key="index"
      :class="$style[tabType]"
      :active="button.active"
      @click="() => onClick(button)"
    >
      {{ button.title }}
    </button>
  </div>
</template>

<!-- styles -->
<style scoped lang="scss" module>
@import "./tab-button.module.scss";
</style>
