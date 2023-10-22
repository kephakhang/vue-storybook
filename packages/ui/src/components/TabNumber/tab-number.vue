<!--
  Summary. 
   Tab Number isolated component type of tab. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    TabNumber
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 
 
  @return component.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import styles from "./tab-number.module.scss";
import type {
  TabButtonType,
  TabNumberSize,
  TabNumberStyle,
} from "~/types/TabNumber";

export default defineComponent({
  name: "TabNumber",
  props: {
    /** array of buttons */
    tabButtons: {
      type: Array as PropType<TabButtonType[]>,
      default: [] as TabButtonType[],
    },
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
    clickHandler: Function as PropType<(button: TabButtonType) => void>,
    /** tab style  horizontal or vertical */
    tabStyle: {
      type: String as PropType<TabNumberStyle>,
      default: "",
    },
    /** 'large', 'small'  */
    size: {
      type: String as PropType<TabNumberSize>,
      default: "large",
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    /** Compute tab number style */
    TabNumberClassComputed() {
      return `${styles[this.computedTabStyle]}`;
    },
    /** computed tab style */
    computedTabStyle() {
      return `${this.tabStyle}-style-icon-tab`;
    },
  },
  methods: {
    /**
     * set clicked button as active and invoke callback function
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
    <div :class="TabNumberClassComputed">
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
            <b>{{ button.itemRate }}%</b>
            <span>{{ button.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- styles -->
<style scoped lang="scss" module>
@import "./tab-number.module";
</style>
