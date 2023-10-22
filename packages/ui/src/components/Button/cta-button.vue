<!--
 * Summary.
 *  Button called CTA isolated component shows multiples Sets of buttons i.e primary, secondary actions buttons.
 *
 * Description.
 *  This component is a common component, so if you modify it, it can affect everywhere you use this component.
 *  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 *
 * @since      v0.4.0
 * @access     module
 *
 * @alias    Button
 * @memberof emoldino
 *
 * @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
 * @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 *
 *
 * @return {component}.
-->

<script lang="ts">
// extentions
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

import type { ColorType, ButtonType, TypeAttribute, Size } from "./types";
import styles from "./cta-button.module.scss";

const uniqueVariants = ["text", "text dropdown", "text hyperlink"];

// @vue/component
export default defineComponent({
  props: {
    /**
     * Set the styles for the element {ex: {width: 100, height: 100}}
     */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },

    /**
     * Set active state for the element, applying transition
     */
    active: {
      type: Boolean,
      default: undefined,
    },

    /**
     * Set state for the element
     */
    disabled: Boolean,

    /**
     * Set color type of button {ex: blue, blue-fill}
     */
    colorType: String as PropType<ColorType>,

    /**
     * Set the type of the button
     */
    type: {
      type: String as PropType<TypeAttribute>,
      default: "button",
    },
    /**
     * @deprecated Use variant instead.
     */
    buttonType: {
      type: String as PropType<ButtonType>,
    },

    /**
     * Set variant button type {ex: dropdown, upload}
     */
    variant: {
      type: String as PropType<ButtonType>,
    },

    /**
     * Set size varient for button
     */
    size: {
      type: String as PropType<Size>,
      default: "normal",
    },

    /**
     * Set clickhandler
     */
    clickHandler: Function,
  },

  computed: {
    /**
     *
     * Calculates the computed color type for the button based on variant and buttonType.
     * @function
     * @memberof ButtonComponent
     */
    colorTypeComputed() {
      const colorType = this.colorType;

      if (this.buttonType === "export" || this.variant === "export")
        return "blue-fill";

      if (colorType === undefined) return "blue";

      if (uniqueVariants.includes(colorType)) {
        return "";
      }

      return colorType ?? "blue";
    },

    /**
     *
     * Calculates the computed type for the button based on buttonType.
     * @function
     * @memberof ButtonComponent
     */
    buttonTypeComputed() {
      let buttonType = `${styles.default}`;

      if (uniqueVariants.includes(`${this.variant ?? this.buttonType}`)) {
        buttonType += ` ${this.variant
          ?.split(" ")
          .map((prop) => styles[prop])
          .join(" ")}`;

        buttonType += ` ${this.buttonType
          ?.split(" ")
          .map((prop) => styles[prop])
          .join(" ")}`;
      } else {
        buttonType += ` ${
          styles[this.colorTypeComputed ? this.colorTypeComputed : ""]
        }`;
      }

      buttonType += ` ${styles[this.size ? this.size : ""]}`;
      buttonType += ` ${this.variant ? styles[this.variant] : ""}`;
      buttonType += ` ${this.buttonType ? styles[this.buttonType] : ""}`;

      return buttonType;
    },

    /**
     *
     * Calculates the computed icon for the button based on variant.
     * @function
     * @memberof ButtonComponent
     */
    iconTypeComputed() {
      if (uniqueVariants.includes(`${this.variant ?? this.buttonType}`)) {
        return this.variant
          ?.split(" ")
          .map((style) => styles[style])
          .join(" ");
      }

      return this.variant ?? this.buttonType
        ? this.variant ?? this.buttonType
        : "";
    },

    /**
     *
     * Make visiable viseversa for the icon.
     * @function
     * @memberof ButtonComponent
     */
    showIcon() {
      const buttonType = this.variant ?? this.buttonType;

      // undefined indicates that the buttonType is not selected or passed
      // TODO(raoasifraza11): Handle custom button type (specs are not defined)
      if (buttonType === undefined || buttonType === "custom") return false;

      if (buttonType === "dropdown") {
        return this.colorType !== "red" && this.colorType !== "green";
      }
      if (buttonType === "date-picker") {
        return (
          this.colorType !== "red" &&
          this.colorType !== "green" &&
          this.colorType !== "white"
        );
      }

      if (buttonType === "text") return false;

      return true;
    },
  },
});
</script>

<template>
  <button
    :type="type"
    :class="buttonTypeComputed"
    :style="styleProps"
    :active="active"
    :disabled="disabled"
    @click.stop="() => clickHandler?.()"
  >
    <!-- @slot default solt to handle templating -->
    <slot></slot>
    <img
      v-show="showIcon"
      :class="iconTypeComputed"
      alt="button-icon"
    />
  </button>
</template>

<style lang="scss" module scoped>
@import "./cta-button.module";
</style>
