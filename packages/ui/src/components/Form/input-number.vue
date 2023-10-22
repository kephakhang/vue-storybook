<!--
  Summary:
  Input Number isolated component contains the default input features.

  Description:
  This component is a common component, so modifying it can affect everywhere you use this component.
  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

  @since 0.4.0
  @access module

  @alias InputNumber
  @memberof emoldino

  @see Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/

  @return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import styles from "./input-number.module.scss";
import type { IconUrl, CheckmarkPosition } from "../../types/Form";

export default defineComponent({
  name: "InputNumber",
  props: {
    /**
     * The id of the input.
     */
    id: String,
    /**
     * The style properties for the input.
     */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
      default: "",
    },
    /**
     * The placeholder text for the input.
     */
    placeholderText: {
      type: String,
      default: "Enter number",
    },
    /**
     * The position of the checkmark (inside or outside).
     */
    checkmark: {
      type: String as PropType<CheckmarkPosition>,
      default: "outside",
    },
    /**
     * Whether the input is active or not.
     */
    active: Boolean,
    /**
     * Whether the input is disabled or not.
     */
    disabled: Boolean,
    /**
     * Whether there is an error on the input or not.
     */
    error: Boolean,
    /**
     * The URL and position of the icon for the input.
     */
    iconUrl: {
      type: Object as PropType<IconUrl>,
      default: null,
    },
    /**
     * The minimum value for the input.
     */
    min: Number,
    /**
     * The maximum value for the input.
     */
    max: Number,
    /**
     * The step value for the input.
     */
    step: Number,
    /**
     * The change handler function for the input.
     */
    changeHandler: Function as PropType<
      (event: { value: string; id: string | undefined }) => void
    >,
    /**
     * The error message for the input.
     */
    errorMessage: String,
    /**
     * Whether the input is required or not.
     */
    required: Boolean,
    /**
     * Whether the input is read-only or not.
     */
    readonly: Boolean,
  },
  data() {
    return {
      /**
       * The text value of the input.
       */
      text: "",
      /**
       * Whether the input data is valid or not.
       */
      isDataValid: false,
      /**
       * Whether a key is pressed in the input or not.
       */
      isKeyPressed: false,
    };
  },
  computed: {
    /**
     * Computes the position class for the container based on various conditions.
     */
    positionComputed() {
      const classes: string[] = [];

      if (this.iconUrl) {
        classes.push(styles[this.iconUrl.position]);
      }

      if (this.disabled) {
        classes.push(styles.disable);
      }

      if (this.error) {
        classes.push(styles.error);
      }

      return classes.join(" ");
    },

    /**
     * Computes the class for the text box element based on whether there is an error or not.
     */
    textBoxClassComputed() {
      const classes: string[] = [];

      if (this.error) classes.push(styles.base_input_error);

      return classes.join(" ");
    },
  },
  watch: {
    text() {
      if (this.changeHandler) {
        this.changeHandler({ value: this.text, id: this.id });
      }
      this.validateText();
    },
  },
  methods: {
    /**
     * Event handler for the key pressed event in the input.
     */
    keyPressedEvent() {
      if (!this.isKeyPressed) {
        this.isKeyPressed = true;
      }
    },
    /**
     * Validates the input text and sets the data validity.
     */
    validateText() {
      const parsedText = parseInt(this.text);
      this.isDataValid =
        (this.min === undefined || parsedText >= this.min) &&
        (this.max === undefined || parsedText <= this.max);
    },
  },
});
</script>

<!-- template -->
<template>
  <div :class="$style.container">
    <div>
      <div :class="[$style.container_input, positionComputed]">
        <span
          v-if="iconUrl"
          :class="[$style.base_input__icon]"
        >
          <span :class="$style.base_input_icon_img">
            <img
              :src="iconUrl.url"
              alt="input number"
            />
          </span>
        </span>
        <input
          :id="id"
          v-model.trim="text"
          :style="styleProps"
          :placeholder="placeholderText"
          type="number"
          :class="[
            textBoxClassComputed,
            $style.base_input,
            isKeyPressed ? $style.caret_color : '',
          ]"
          :active="active"
          :disabled="disabled"
          :error="error"
          :min="min"
          :max="max"
          :step="step"
          :required="required"
          :readonly="readonly"
          :error-message="errorMessage"
          @keyup="keyPressedEvent()"
        />
        <span
          v-if="checkmark === 'inside'"
          :class="[
            isDataValid ? $style.checkmark_green : $style.checkmark_disabled,
            $style.validity,
          ]"
        ></span>
      </div>
      <span
        v-if="checkmark === 'outside'"
        :class="[
          isDataValid
            ? $style.outside_checkmark_green
            : $style.outside_checkmark_disabled,
          $style.validity,
        ]"
      ></span>
    </div>
    <div v-if="error">
      <span :class="$style.error_message">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./input-number.module.scss";
</style>
