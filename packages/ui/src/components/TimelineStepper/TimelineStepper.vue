<!--
Summary.
Timeline stepper component is used to show a numbered list of steps  to indicate the progress and number of steps. 

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    TimelineStepper
@member of emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states


@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
export default defineComponent({
  name: "TimelineStepper",
  props: {
    /** set the status and change shape {e.g unconfirmed, confirmed, start, current} */
    step: {
      type: String,
      default: "current",
    },
    /** it works opposite to the last props. */
    opposite: {
      type: Boolean,
      default: false,
    },
    /** set to true to if its last stepper, to not show the line  */
    last: {
      type: Boolean,
      default: false,
    },
    /** set the style props  */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
  },
});
</script>

<template>
  <div
    :style="styleProps"
    :class="$style.horizontal_progress_bar_content_box"
  >
    <div :class="$style.progress_indicator_box">
      <div :class="[$style.progress_indicator_circle, $style[step]]"></div>
      <div
        :class="[
          $style.progress_indicator_line,
          $style[step],
          opposite ? $style.opposite : '',
          last ? $style.last : '',
        ]"
      ></div>
    </div>
    <div>
      <!-- @slot optional slot for templating -->
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped module>
@import "./timeline_stepper.module";
</style>
