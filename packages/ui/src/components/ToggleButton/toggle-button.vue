<!--
Summary. 
Toggle input isolated component switch the state true/false. 

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    Toggle
@member of emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states


@return {component}.
-->
<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { ToggleButtonSize } from "~/types/ToggleButton";

export default defineComponent({
  name: "ToggleButton",
  props: {
    /**
     * set the toggle button value on and off {e.g true, false}
     * @deprecated Use `value` instead.
     */
    toggle: Boolean,
    value: Boolean,
    /** set the toggle button state to disable {e.g true, false} */
    disabled: Boolean,
    /** change the size of toggle button {e.g default, large}  */
    size: {
      type: String as PropType<ToggleButtonSize>,
      default: "default",
    },
    /**
     *  return the toggle button value on click {e.g true, false}
     * @deprecated Use `onChanged` instead.
     */
    clickHandler: Function,
    onChanged: Function as PropType<(value: boolean) => void>,
  },
  data() {
    return {
      checked: this.value ?? this.toggle,
    };
  },
  watch: {
    /** change button state on click */
    toggle(value: boolean) {
      this.checked = value;
    },
    value(value: boolean) {
      this.checked = value;
    },
  },
  methods: {
    /** Event trigger on click to change state of toggle button */
    toggleValue() {
      if (this.onChanged) return this.onChanged(!this.value);
      return this.handleToggle();
    },
    /**
     * @deprecated This will be removed in the next major version.
     */
    handleToggle() {
      if (this.clickHandler && !this.disabled) {
        this.clickHandler();
        this.checked = !this.checked;
        return this.checked;
      }
    },
  },
});
</script>

<template>
  <div :class="$style.d_flex">
    <p
      :class="[
        checked ? $style.btn_off : $style.btn_on,
        disabled && $style.default_off,
      ]"
    >
      Off
    </p>
    <div @click="toggleValue">
      <input
        v-model="checked"
        type="checkbox"
        :disabled="disabled"
      />
      <label
        :class="[
          disabled ? $style.disable_label : '',
          size === 'default'
            ? $style.default_size_label
            : $style.large_size_label,
        ]"
      >
        Toggle
      </label>
    </div>
    <p
      :class="[
        checked ? $style.btn_on : $style.btn_off,
        disabled && $style.default_off,
      ]"
    >
      On
    </p>
  </div>
</template>

<style lang="scss" module scoped>
@import "./toggle-button.module";
</style>
