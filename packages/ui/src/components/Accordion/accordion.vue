<!--
Summary. 
Animated accordion isolated component which takes slots for header and body. 
  
Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
@since      0.3.22-dev-1
@access     module
 
@alias    Accordion
@memberof emoldino
 
@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=8247%3A16874&t=24uSIcwaHiGMGQOO-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-accordian--defaul
 
 
@return {component}.
-->
<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

export default defineComponent({
  name: "Accordion",
  props: {
    /** set the width of the accordion */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    /**
     * Gets called when the user clicks on the accordion
     */
    openPannel() {
      this.active = !this.active;
      const panel = this.$refs.panel as HTMLDivElement;
      panel.style.maxHeight = panel.style.maxHeight
        ? ""
        : panel.scrollHeight + "px";
    },
  },
});
</script>

<template>
  <div
    :style="styleProps"
    :class="$style.accordion_main"
  >
    <div :class="$style.button_main">
      <button
        :class="$style.heading"
        @click="openPannel"
      >
        <span><slot name="header"></slot></span>
        <span
          :class="[
            active ? $style.icon_rotate : $style.icon,
            $style.accordion_icon,
          ]"
        >
          <img
            src="~assets/images/common-component/accordian.svg"
            alt="Accordion icon"
          />
        </span>
      </button>
    </div>
    <div
      ref="panel"
      :class="$style.panel"
    >
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style lang="scss" module scoped>
@import "./accordion.module";
</style>
