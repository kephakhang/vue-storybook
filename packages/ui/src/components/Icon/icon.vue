<!--
  Summary. 
   icon isolated component. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.4.0
  @access     module
 
  @alias    icon
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/
 
 
  @return component.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import styles from "./icon.module.scss";
import type { ButtonType, ButtonClassTypes } from "~/types/Icon";

const buttonClassTypes: ButtonClassTypes = {
  "restore-icon": "customizing-data-table",
  "kebab-menu": "customizing-data-table",
};

export default defineComponent({
  name: "Icon",
  props: {
    /**
     * click handler for icon
     */
    clickHandler: Function as PropType<() => void>,
    /**
     * set active interaction on icon
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * disable the icon active interaction
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * change the icon button type
     */
    buttonType: {
      type: String as PropType<ButtonType>,
      default: "cross-icon",
    },
    /**
     * set icon button style properties {ex {width: 100px; height 100px}}
     */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
  },
  computed: {
    /**   Compute button class based on button type and other properties  */
    buttonClassComputed() {
      return `${styles.default} ${styles[this.buttonType]} ${
        styles[this.classTypeForButton]
      }`;
    },

    /**   Determine additional class type based on button type   */
    classTypeForButton() {
      return buttonClassTypes[this.buttonType] || "";
    },

    /**
     * Returns the alt attribute value for the icon improve the accessibility.
     * This value is based on the buttonType prop.
     */
    altAttributeComputed() {
      return this.buttonType;
    },
  },
  methods: {
    /**
     * Execute click handler method
     */
    executor() {
      // Invoke the clickHandler callback
      this.clickHandler?.();
    },
  },
});
</script>

<!-- template -->
<template>
  <div
    :class="buttonClassComputed"
    :style="styleProps"
    :active="active"
    :disabled="disabled"
    @click="executor"
  >
    <div :class="$style.icon_size">
      <img
        src="#"
        :alt="altAttributeComputed"
      />
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./icon.module";
</style>
