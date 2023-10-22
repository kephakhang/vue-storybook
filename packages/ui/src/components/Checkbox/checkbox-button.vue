<!--
Summary. 
Checklist isolated component shows checklist. 
 
Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    CheckList
@member of emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states


@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import styles from "./checkbox.module.scss";

import type { ButtonType, ButtonSize } from "~/types/Checkbox";

export default defineComponent({
  name: "CheckboxButton",
  props: {
    /** clickHandler accepts checked value true or false */
    clickHandler: Function as PropType<(isChecked: boolean) => void>,
    /** labelText set label of check box */
    labelText: {
      type: String,
      default: "",
    },
    /** set size of check box large or small */
    size: {
      type: String as PropType<ButtonSize>,
      default: "large",
    },
    /** active prop set check box in active state*/
    active: {
      type: Boolean,
      default: true,
    },
    /** disabled prop set check box disabled */
    disabled: Boolean,

    /** button type prop set type of button (radio or checkbox or check_list) */
    buttonType: {
      type: String as PropType<ButtonType>,
      default: "check_list",
    },
  },
  data() {
    return {
      hover: false,
      check: true,
    };
  },
  computed: {
    buttonClassComputed() {
      let style = `${styles.default_btn} ${styles[this.buttonType]} ${
        styles[this.size]
      } `;
      return style;
    },
    innerShapeStyleComputed() {
      return styles[this.buttonType + "_inner"];
    },
  },

  watch: {
    active(value) {
      this.check = value;
    },
  },
  mounted() {
    this.check = this.active;
  },
  methods: {
    truncateText(text: string, length: number) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    },
    executor() {
      if (!this.clickHandler) return;
      this.check = !this.check;
      this.clickHandler(this.check);
    },
  },
});
</script>

<template>
  <div :class="$style.center_align">
    <div
      :class="buttonClassComputed"
      :active="check"
      :disabled="disabled"
      @click="executor"
    >
      <img
        v-if="buttonType === 'checkbox' && (hover || active)"
        src="#"
        :class="$style.icon_size"
        alt=""
      />
      <div
        v-else
        :class="innerShapeStyleComputed"
      ></div>
    </div>
    <label v-if="labelText != ''">
      <span :class="[size ? $style[size] : '', $style.label_styles]">
        {{ truncateText(labelText, 40) }}
      </span>
    </label>
  </div>
</template>

<style lang="scss" module>
@import "./checkbox.module";
</style>
