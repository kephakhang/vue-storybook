<!--
  Summary. 
   Alert box isolated component shows alerts or notification on user actions. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    AlertBox
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states

-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import CheckboxButton from "~/components/Checkbox/checkbox-button.vue";
import styles from "./alert-box.module.scss";

const ICONS = ["warning", "info"];

export default defineComponent({
  name: "AlertBox",

  components: {
    CheckboxButton,
  },
  props: {
    /**
     * checkbox click handler
     */
    checkBoxHandler: Function as PropType<(isChecked: boolean) => void>,
    /**
     * true: show alert box, false: hide alert box
     */
    showAlertBox: {
      type: Boolean,
      default: true,
    },
    /**
     * title of alert box
     */
    title: String,
    /**
     * true: display checkbox, false: remove checkbox
     */
    checkbox: {
      type: Boolean,
      default: false,
    },
    /**
     * label value of checkbox
     */
    checkboxLabel: {
      type: String,
      default: "Don't show this warning again.",
    },
    /**
     * true: show close button, false: hide close button
     */
    showCloseButton: {
      type: Boolean,
      default: false,
    },
    styleProps: String as PropType<StyleValue>,
    /**
     * set title icon (warning, info,'URL')
     */
    titleIconUrl: {
      type: String,
      default: "warning",
    },
    /**
     * close button click handler
     */
    onClose: Function as PropType<() => void>,
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    /**
     *  return style for title icon (warning, info)
     */
    computeTitleIcon() {
      return `title-icon title-icon-${this.titleIconUrl}`;
    },
    /**
     * this will return url other than warning and info
     */
    getIconUrl() {
      return ICONS.includes(this.titleIconUrl.toLowerCase())
        ? ""
        : this.titleIconUrl;
    },
    /**
     * returns class for display/hide alert box
     */
    showAlertBoxStyle() {
      return this.showAlertBox ? null : styles["show-alert-box"];
    },
    /**
     * returns class for display/hide close button in alert box
     */
    showCloseButtonStyle() {
      return this.showCloseButton ? null : styles["show-close-button"];
    },
  },
  methods: {
    /**
     * on close handler hides
     */
    handleClose() {
      this.$nextTick(() => {
        this.onClose?.();
      });
    },
    /**
     * check box click handler
     */
    handleCheckboxClick() {
      // Perform the operation after the next rendering cycle
      this.$nextTick(() => {
        // inverse the state of check box
        this.active = !this.active;
        // Invoke the checkBoxHandler callback with the updated checkbox state
        this.checkBoxHandler?.(this.active);
      });
    },
  },
});
</script>

<!-- template -->
<template>
  <div :class="[$style['emdn-alert-box-modal-root'], showAlertBoxStyle]">
    <div
      :class="[$style['alert-box-modal-mask'], showAlertBoxStyle]"
      @click.self="handleClose"
    >
      <div
        tabindex="-1"
        role="dialog"
        :class="[
          $style['alert-box-modal-wrap'],
          $style['alert-box-modal-centered'],
          showAlertBoxStyle,
        ]"
      >
        <div
          role="document"
          :class="$style['alert-box-modal']"
          :style="styleProps"
        >
          <div
            tabindex="0"
            aria-hidden="true"
            :class="$style['alert-box-indexed']"
          ></div>

          <div :class="$style['custom-modal-body-user']">
            <div :class="[$style['close-btn'], showCloseButtonStyle]">
              <div
                :class="[$style['t-close-button'], $style['close-button']]"
                aria-hidden="true"
                @click.stop="handleClose"
              >
                <span :class="$style['t-icon-close']"></span>
              </div>
            </div>
            <div :class="$style['modal-body']">
              <div :class="$style['content-div']">
                <div :class="$style['main-title']">
                  <img
                    :class="[
                      $style['title-icon'],
                      $style[`title-icon-${titleIconUrl}`],
                    ]"
                    :src="getIconUrl"
                  />
                  <span :class="$style['title']">{{ title }}</span>
                </div>
                <div :class="$style['message-and-btn']">
                  <div>
                    <span :class="$style['message-style']">
                      <!-- @slot Use this slot messagebody -->
                      <slot name="messagebody"></slot>
                    </span>
                    <div
                      v-if="checkbox"
                      :class="$style['check-box-styles']"
                    >
                      <checkbox-button
                        button-type="check_list"
                        :label-text="checkboxLabel"
                        size="small"
                        :click-handler="handleCheckboxClick"
                        :active="active"
                      ></checkbox-button>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="$style['footer']">
                <div :class="$style['btn-styles']">
                  <div :class="$style['btn-ind-style']">
                    <!-- @slot Use this slot successbutton -->
                    <slot name="successbutton"></slot>
                  </div>
                  <div :class="$style['btn-ind-style']">
                    <!-- @slot Use this slot rejectbutton -->
                    <slot name="rejectbutton"></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module>
@import "./alert-box.module";
</style>
