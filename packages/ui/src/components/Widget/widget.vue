<!--
Summary.
Widget component built for ease of use, accessibility, and the practical needs of complex or simple forms

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    TimePicker
@memberof emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states


@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

export default defineComponent({
  props: {
    /**
     * to set the width and height of the widget {e.g {width  : 10rem; height 10rem }}
     * */
    styleProps: [String, Object] as PropType<StyleValue>,
    bodyStyleProps: [String, Object] as PropType<StyleValue>,
    /**
     * use to set the heading
     * */
    headerText: String,
  },
});
</script>

<template>
  <div
    :class="$style['widget-container']"
    :style="styleProps"
  >
    <div :class="$style['widget-header']">
      <div :class="$style['widget-header-info']">
        <p>{{ headerText }}</p>
        <slot name="tooltip"></slot>
      </div>
      <div :class="$style['widget-header-slot']">
        <slot name="header"></slot>
      </div>
    </div>
    <div
      :class="$style['widget-body']"
      :style="bodyStyleProps"
    >
      <slot name="body"></slot>
    </div>
    <div :class="$style['widget-footer']">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "./widget.module.scss";
</style>
