<!--
  Summary. 
   Icon Button isolated component. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    IconButton
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components
 

-->
<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import styles from "./icon-button.module.scss";
import type { ButtonType } from "../../types/IconButton";

const buttonTypeMap: { [key: string]: string } = {
  filter: "customizing-data-table",
  download: "customizing-data-table",
  "custom-colum": "customizing-data-table",
  "kebab-menu": "customizing-data-table",
  edit: "row-inline-action-buttons",
  trash: "row-inline-action-buttons",
  check: "row-inline-action-buttons",
  clone: "row-inline-action-buttons",
  add: "plus-button",
  remove: "minus-button",
  default: "",
};

export default defineComponent({
  name: "IconButton",
  props: {
    /**
     * set icon button style properties {ex {width: 100px; height 100px}}
     */
    styleProps: [String, Object] as PropType<StyleValue>,
    /**
     * return the icon button value on click
     */
    clickHandler: Function as PropType<() => void>,
    /**
     * set active interaction on icon button
     */
    active: Boolean,
    /**
     * disable the icon button active interaction
     */
    disabled: Boolean,
    /**
     * change the icon button type
     */
    buttonType: {
      type: String as PropType<ButtonType>,
      default: "filter",
    },
    /**
     * set the custom icon button icon URL
     */
    iconUrl: {
      type: String,
    },
  },

  computed: {
    /**
     * Computes Button's class
     */
    buttonClassComputed() {
      return `${styles.default} ${styles[this.buttonType]} ${
        styles[this.classTypeForButton]
      } `;
    },
    /**
     * returns the type of button
     */
    classTypeForButton() {
      return buttonTypeMap[this.buttonType] || buttonTypeMap.default;
    },
  },
  methods: {
    /**
     *  executor method that handles click
     */
    executor() {
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
        v-if="buttonType === 'custom-button'"
        :src="iconUrl"
        alt="icon"
      />
      <img
        v-else
        src="#"
        alt="icon"
      />
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./icon-button.module";
</style>
