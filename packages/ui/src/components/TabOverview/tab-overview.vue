<!--
  Summary.
   Tab Overview isolated component type of tab.
 
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    TabOverview
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-tab-overview--default
 
 
  @return component.
-->

<script lang="ts">
import {
  defineComponent,
  isRef,
  unref,
  type PropType,
} from "@vue/composition-api";

export default defineComponent({
  name: "TabOverview",
  props: {
    /**  Position of the tab (top or bottom) */
    position: {
      type: String,
      default: "top",
      validator(value: string) {
        return ["top", "bottom"].includes(value);
      },
    },

    /** Label Align of the tab (top or bottom) */
    labelAlign: {
      type: String,
      default: "top",
      validator(value: string) {
        return ["top", "bottom"].includes(value);
      },
    },

    /** is Active prop */
    isActive: Boolean,

    /** label of tab */
    label: String,
    field: String,
    trend: [String, Number, Object],
    value: [String, Number, Object],

    /** Function to format the value */
    valueFormatter: Function as PropType<
      (value: [string, number, object]) => string
    >,

    /** Function to format the trend */
    trendFormatter: Function as PropType<
      (trend: [string, number, object]) => string
    >,
    clickHandler: Function as PropType<() => void>,
  },

  computed: {
    /**
     * return true if trend is not null
     */
    hasTrend() {
      return this.trend !== null;
    },
    /**
     * check weather trend is positive or not
     */
    isTrendPositive() {
      const trend = isRef(this.trend) ? unref(this.trend) : this.trend;
      if (this.hasTrend) return Number(trend) >= 0;
      return false;
    },

    /**
     * execute callback function valueFormatter that format value
     * @returns  string value
     */
    formattedValue() {
      const value = isRef(this?.value) ? unref(this?.value) : this?.value;
      if (this.valueFormatter) {
        return this.valueFormatter(value as [string, number, object]);
      }
      return "";
    },

    /**
     * execute callback function trendFormatter that formate the trend value
     * @return string value
     */
    formattedTrend() {
      const trend = isRef(this.trend) ? unref(this.trend) : this.trend;
      if (this.hasTrend && this?.trendFormatter)
        return Number(trend) >= 0
          ? `+${this.trendFormatter(trend as [string, number, object])}`
          : `${this.trendFormatter(trend as [string, number, object])}`;
      return "";
    },
  },
  methods: {
    /**
     * handle Click method that execute callback function clickHandler
     */
    handleClick() {
      if (this.clickHandler) {
        this.clickHandler();
      }
    },
  },
});
</script>

<template>
  <div
    :class="[$style.tab_overview, $style[position]]"
    :active="isActive"
    @click="handleClick"
  >
    <div :class="$style.tab_lead">
      <div :class="$style.lead_label">
        {{ label }}
      </div>
      <div
        v-if="hasTrend"
        :class="[$style.lead_trail, isTrendPositive ? $style.positive : '']"
      >
        {{ formattedTrend }}
      </div>
    </div>
    <div :class="$style.tab_divider"></div>
    <div :class="$style.tab_content">
      {{ formattedValue }}
    </div>
  </div>
</template>

<style scoped lang="scss" module>
@import "./tab-overview.module";
</style>
