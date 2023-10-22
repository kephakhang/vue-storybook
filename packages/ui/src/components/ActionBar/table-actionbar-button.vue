<!--
  Summary. 
   Table action bar isolated component collection of buttons for table actions. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.4.0
  @access     module
 
  @alias    TableActionbarButton
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=8247%3A16874&t=24uSIcwaHiGMGQOO-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-accordian--defaul
 
  
  @return {component} Return.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { IconType, IconSize } from "~/types/ActionBar";

const iconLabels: Record<IconType, string> = {
  "change-state": "Change State",
  default: "Change State",
  disable: "Disable",
  note: "Note",
  edit: "Edit",
  enable: "Enable",
  export: "Export",
  view: "View",
  reset: "Reset",
  register: "Register",
  "view-edit-history": "View Edit History",
  "shift-config": "Shift Config",
  "role-user-config": "Role-User Config",
  "remove-from-product": "Remove from Product",
  "role-permission-config": "Set Permission",
  "custom-icon": "Custom icon",
};

export default defineComponent({
  name: "ActionBar",
  props: {
    /** function for click handler */
    emit: Function as PropType<() => Promise<void>>,
    /** active prop to set active state */
    active: Boolean,
    /** disabled prop to set disabled state */
    disabled: Boolean,
    /** iconType to set icon of button (default,disable,note,edit,enable,export..)*/
    iconType: {
      type: String as PropType<IconType>,
      default: "",
    },
    /** size prop to set button size (small or "")*/
    size: {
      type: String as PropType<IconSize>,
      default: "",
    },
    /** imgSrc to set url of the icon */
    imgSrc: {
      type: String as PropType<string>,
    },
    /** label to set text of button */
    label: {
      type: String as PropType<string>,
    },
  },
  computed: {
    /**
     * compute Icon label
     */
    labelTextChange() {
      return iconLabels[this.iconType] ?? this.label ?? "";
    },
    /**
     * compute button style and size
     */
    buttonClassComputed() {
      return `default default-color ${this.iconType} ${this.size}`;
    },
  },
  methods: {
    /**
     * Handle the emit
     * @return void
     */
    executor() {
      // Invoke the emit callback
      this.emit?.();
    },
  },
});
</script>

<template>
  <div
    :class="buttonClassComputed"
    :active="active"
    :disabled="disabled"
    @click="executor"
  >
    <span v-if="iconType === 'custom-icon'">{{ label }}</span>
    <span v-else>{{ labelTextChange }}</span>
    <img
      v-if="iconType === 'custom-icon'"
      class="right-side-image"
      :src="imgSrc"
      alt="embd-actionbar-custom-icon"
    />
    <img
      v-else
      :class="iconType"
      src="#"
      alt="embd-button-actionbar-icon"
    />
  </div>
</template>

<!-- styles -->
<style lang="scss" scoped>
@import "./table-actionbar-button.module";
</style>
