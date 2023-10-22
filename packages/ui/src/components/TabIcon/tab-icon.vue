<!--
  Summary.
   Tab Icon isolated component type of tab.
 
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    TabIcon
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/
 
 
 @return component.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import styles from "./tab-icon.module.scss";
import type { TabButtonType, TabIconStyle, TabIconSize } from "~/types/TabIcon";

export default defineComponent({
  name: "TabIcon",
  props: {
    /** A list of tab buttons */
    tabButtons: {
      type: Array as PropType<TabButtonType[]>,
      default: [] as TabButtonType[],
    },
    /** A function to call when a tab button is clicked */
    clickHandler: Function as PropType<(button: TabButtonType) => void>,
    /** The tab direction (either "horizontal" or "vertical") */
    tabStyle: {
      type: String as PropType<TabIconStyle>,
      default: "horizontal",
    },
    /** set the tab size {e.g small, large} */
    size: {
      type: String as PropType<TabIconSize>,
      default: "large",
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    /**
     * Compute tab icon style
     */
    tabIconClassComputed() {
      return `${styles[this.computedTabStyle]}`;
    },
    /**
     * Compute tab style
     */
    computedTabStyle() {
      return `${this.tabStyle}-style-icon-tab`;
    },
  },
  methods: {
    /**
     * click handler make active to clicked tab
     * @param button
     */
    executor(button: TabButtonType) {
      this.tabButtons?.forEach((btn) => {
        btn.active = btn === button;
      });
      // Invoke the clickHandler callback with the selected button
      this.clickHandler?.(button);
    },
  },
});
</script>

<!-- template -->
<template>
  <div>
    <div :class="tabIconClassComputed">
      <div
        v-for="(button, index) in tabButtons"
        :id="button.title"
        :key="index"
        :class="[size === 'small' ? $style.small : '', $style.chart_wrapper]"
        :active="button.active"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <div @click="executor(button)">
          <div
            :active="button.active"
            :class="[
              button.active || hover ? $style.img_zone_hover_background : '',
              $style.img_zone,
            ]"
          >
            <img
              :style="button.iconStyle"
              :src="button.icon"
              alt=""
              :class="[button.active ? $style.hover_icon : '']"
            />
          </div>
          <div :class="$style.chart_title">
            <b>{{ button.title }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- styles -->
<style scoped lang="scss" module>
@import "./tab-icon.module";
</style>
