<!--
Summary.
Tooltip isolated component show the tips on hover.

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    Tooltip
@member of emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states


@return {component}.
-->

<script lang="ts">
import styles from "~/components/Tooltip/tooltip.module.scss";
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import type { TooltipPosition, TooltipColor } from "~/types/Tooltip";

const LEFT_ICON_POSITION = "left";
const RIGHT_ICON_POSITION = "right";

export default defineComponent({
  name: "Tooltip",
  props: {
    /**
     * set tooltip style properties {e.g {width: 100rem; height 100rem}}
     */
    styleProps: [String, Object] as PropType<StyleValue>,
    /**
     * set tooltip position w.r.t to context {e.g left, right, top, bottom }
     */
    position: {
      type: String as PropType<TooltipPosition>,
      default: "top",
    },
    /**
     * set tooltip color {e.g  black, white}
     */
    color: {
      type: String as PropType<TooltipColor>,
      default: "black",
    },
    /**
     * show and hide tail of tooltip {e.g  true, false}
     */
    hideTail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isHover: false,
      contextWrapper: null as HTMLElement | null,
    };
  },
  computed: {
    tooltipStyle() {
      if (this.hideTail) return;
      return styles[this.getTailDirection(this.position)];
    },
    tooltipPosition() {
      if (!this.contextWrapper) return;
      const { width, height } = this.getElementSize(this.contextWrapper);
      return this.getTooltipStylePosition({
        position: this.position,
        width,
        height,
      });
    },
  },
  watch: {
    isHover() {
      this.contextWrapper = this.$refs.contextWrapper as HTMLElement;
    },
  },
  methods: {
    /** set the direction of tooltip tail */
    getTailDirection(position: TooltipPosition) {
      if (position === LEFT_ICON_POSITION) return RIGHT_ICON_POSITION;
      if (position === RIGHT_ICON_POSITION) return LEFT_ICON_POSITION;
      return position;
    },
    /** set the tooltip position */
    getTooltipStylePosition({
      position,
      width,
      height,
    }: {
      position: TooltipPosition;
      width: number;
      height: number;
    }): StyleValue {
      if (position === "top") return `bottom: ${height + 8}px;`;
      if (position === "bottom") return `top: ${height + 8}px;`;
      if (position === "left") return `right: ${width + 12}px;`;
      return `left: ${width + 12}px;`;
    },
    getElementSize(element: HTMLElement) {
      if (!(element instanceof HTMLElement)) {
        throw new Error("Unexpected element");
      }
      return {
        width: element.clientWidth,
        height: element.clientHeight,
      };
    },
  },
});
</script>

<template>
  <div :class="$style.tooltip">
    <div
      ref="contextWrapper"
      :class="$style.contextWrapper"
      @mouseover="() => (isHover = true)"
      @mouseleave="() => (isHover = false)"
    >
      <!-- @slot tooltip trigger slot for templating -->
      <slot name="context"></slot>
    </div>
    <div
      :style="tooltipPosition"
      style="position: absolute"
    >
      <div
        :style="styleProps"
        :class="$style.main_tooltip"
      >
        <span
          :class="[
            tooltipStyle,
            color === 'white'
              ? $style.tooltip_text_white
              : $style.tooltip_text_black,
          ]"
        >
          <!-- @slot tooltip content slot for templating -->
          <slot name="body"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module scoped>
@import "./tooltip.module";
</style>
