<!--
  Summary. 
   Tab Module isolated component type of tab. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    TabModule
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 

  @return component.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import styles from "./tab-module.module.scss";
import type {
  TabButtonType,
  TabModuleStyle,
  TabModuleType,
} from "~/types/TabModule";

export default defineComponent({
  name: "TabModule",
  props: {
    /** array of buttons */
    tabButtons: {
      type: Array as PropType<TabButtonType[]>,
      default: [] as TabButtonType[],
    },
    /** style props */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },

    /** tab click handler */
    clickHandler: Function as PropType<(button: TabButtonType) => void>,
    /* tab style Horizontal | vertical */
    tabStyle: {
      type: String as PropType<TabModuleStyle>,
      default: "horizontal",
    },
    /** tab type primary-tab | secondary-tab */
    tabType: {
      type: String as PropType<TabModuleType>,
      default: "primary-tab",
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    /** computed style for button*/
    buttonClassComputed() {
      return `${styles[this.tabType]}`;
    },
    /**  computed style for tab style*/
    computedClassTabStyle() {
      return `${styles[this.computedTabStyle]}`;
    },
    /** icon style computed*/
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
      this.tabButtons.forEach((btn) => {
        btn.active = button === btn;
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
    <div :class="computedClassTabStyle">
      <div
        v-for="(button, index) in tabButtons"
        :id="button.title"
        :key="index"
        :class="buttonClassComputed"
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
              :src="button.icon"
              alt=""
              :class="[button.active ? $style.hover_icon : '']"
            />
          </div>
          <div :class="$style.chart_title">
            {{ button.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./tab-module.module";
</style>
