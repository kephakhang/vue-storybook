<!--
 * Summary. 
 *  Input Text isolated component contains the defaults input features. 
 * 
 * Description.
 *  This component is a common component, so if you modify it, it can affect everywhere you use this component.
 *  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 *
 * @since      0.4.0
 * @access     module
 *
 * @alias    InputText
 * @memberof emoldino
 *
 * @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
 * @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 *
 *
 * @return {component}.
-->
<script lang="ts">
import styles from "./input-text.module.scss";

import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

type IconType = {
  url: string;
  position?: "right" | "left";
};

// @vue/component
export default defineComponent({
  props: {
    /* declares id to assign elements */
    id: String,

    /* declares custom styles props */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
      default: "",
    },

    /* declares placeholder text for input field */
    placeholderText: {
      type: String,
      default: "Enter Text Here",
    },

    /* declares checkmark to display check */
    checkmark: String,

    /* declares active as true or false */
    active: Boolean,

    /* declares disabled as true or false */
    disabled: Boolean,

    /* declares error as false */
    error: {
      type: Boolean,
      default: false,
    },

    /* declares required as true or false */
    required: Boolean,

    /* declares icon url as object of url and position */
    iconUrl: {
      type: Object as PropType<IconType>,
    },

    /* declares min characters, default as 1 */
    minlength: {
      type: Number,
      default: 1,
    },

    /* declares max characters */
    maxlength: Number,

    /* declares error message to show */
    errorMessage: String,

    /* declares readonly as true or false */
    readonly: Boolean,

    /**
     * Get input value and id of the element
     * @function
     * @param {string} value - input value
     * @param {string} id - element id (only if id props is passed)
     */
    getValue: {
      type: Function as PropType<(value: string, id?: string) => void>,
    },
  },

  data() {
    return {
      validData: false,
      text: "",
      keyPressed: false,
    };
  },
  computed: {
    /* compute the position based on icon url position */
    positionComputed() {
      let item = "";
      const position = this.iconUrl?.position;

      if (position) item += `${styles[position]} `;
      if (this.error) item += `${styles.error} `;
      if (this.disabled) item += `${styles.disable} `;

      return item;
    },

    /**
     * generates the class name for the input text box
     * based on whether an error has occurred or not
     */
    textBoxClassComputed() {
      let item = `${styles.base_input} `;
      if (this.error) item += `${styles.base_input_error} `;
      return item;
    },

    /**
     * Returns the CSS class for the input icon border
     * based on the error status and position of the icon.
     */
    iconBorderComputed() {
      if (!this.error || !this.iconUrl?.position) return "";

      const position = this.iconUrl.position;
      return position === "left"
        ? `${styles.base_input__icon_error_left} `
        : `${styles.base_input__icon_error_right} `;
    },
  },
  methods: {
    /**
     * validates if the provided value is valid or not,
     * based on minlength and maxlength props
     */
    isValid(value: string) {
      const length = value.length;

      if (length < this.minlength) return false;
      if (this.maxlength && length > this.maxlength) return false;

      return true;
    },

    /* updates the component's state when a key is pressed */
    onKeyPressed() {
      if (!this.keyPressed) this.keyPressed = true;
      this.validData = this.isValid(this.text);
    },

    updateText(e: Event) {
      const { value } = e.target as HTMLTextAreaElement;

      this.text = value;
      this.getValue?.(value, this.id);
    },
  },
});
</script>

<!-- template -->
<template>
  <div :class="$style.container">
    <div style="display: flex">
      <div
        tabindex="0"
        :style="styleProps"
        :class="[
          $style.container_input,
          $style.search_bar__input,
          positionComputed,
        ]"
      >
        <span
          v-if="iconUrl"
          :class="[iconBorderComputed, $style.base_input__icon]"
        >
          <span :class="$style.base_input_icon_img">
            <img :src="iconUrl.url" />
          </span>
        </span>
        <input
          :id="id"
          v-model="text"
          :placeholder="placeholderText"
          type="text"
          :class="[
            textBoxClassComputed,
            $style.base_input,
            keyPressed ? $style.caret_color : '',
          ]"
          :active="active"
          :disabled="disabled"
          :error="error"
          :minlength="minlength"
          :maxlength="maxlength"
          :checkmark="checkmark"
          :readonly="readonly"
          :required="required"
          @keyup="onKeyPressed()"
          @input="updateText"
        />
        <span
          v-if="checkmark === 'inside'"
          :class="[validData ? $style.inside1 : $style.inside, $style.validity]"
        ></span>
      </div>

      <!-- outside checkmark -->
      <span
        v-if="checkmark == 'outside'"
        :class="[validData ? $style.outside1 : $style.outside, $style.validity]"
      ></span>
    </div>

    <!-- error message block -->
    <div v-if="error">
      <span :class="$style.error_message">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./input-text.module.scss";
</style>
