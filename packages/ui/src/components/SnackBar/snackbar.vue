<!--
Summary.
Snackbar body isolated component works like a toaster.

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    Snackbar
@memberof emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states

@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";

export default defineComponent({
  name: "SnackBar",
  props: {
    /** set snackbar title */
    snackBarTitle: {
      type: String as PropType<string>,
      default: "Success!",
    },
    /** set a snackbar body message */
    snackBarMessage: {
      type: String as PropType<string>,
      default: "Your data has been saved successfully.",
    },
  },
  data() {
    return {
      active: false,
    };
  },
  watch: {
    /** on active change, it will trigger to onClose() */
    active(newVal: boolean) {
      if (newVal) {
        window.addEventListener("click", this.onClose);
      }
    },
  },
  mounted() {
    /** set snackbar active initially */
    this.active = true;

    /** auto hides the toaster snackbar */
    setTimeout(() => {
      this.active = false;
    }, 6000);
  },
  methods: {
    /** hide the snackbar */
    onClose() {
      this.active = false;
    },
  },
});
</script>

<template>
  <div
    v-if="active"
    :class="$style['dialogbox']"
  >
    <div :class="$style['heading']">{{ snackBarTitle }}</div>
    <p>{{ snackBarMessage }}</p>
    <div
      :class="$style['close']"
      @click="onClose"
    >
      <img
        class="cross_icon"
        src="~assets/images/common-component/cross.svg"
        alt="cross icon"
      />
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./snackbar.module";
</style>
