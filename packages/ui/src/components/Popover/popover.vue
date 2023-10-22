<!--
  Summary. 
   Popover isolated component.
  
   Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    Popover
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/J7P8GFHiJ4zwL0gFsAkN8z/Platform-2.0-layout--?node-id=296%3A19831&t=KZ0AzhqeDVU0ma5y-0
  @link URL https://emoldino.github.io/emoldino-ui-components/
 
 
  @return component.
-->
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "CommonPopover",
  props: {
    /** set visible popover false or true */
    visible: {
      type: Boolean,
      default: false,
    },

    /** Set the classes as string of popover */
    classes: {
      type: String,
      default: "",
    },

    /** set position to display popover */
    position: {
      type: Object,
      default: () => ({ top: "", left: "", right: "", bottom: "" }),
    },
    /** close popover when we click outside */
    refName: {
      type: String,
      default: "commonPopover",
    },
  },
  mounted() {
    /** Add click outside handler when component is added to DOM */
    window.addEventListener("click", this.handleClickOutside);
  },
  /** Remove click outside handler before instance of component is destroyed */
  beforeUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    /**
     * it will handle the event of outside click
     * @param event
     */
    handleClickOutside(event: Event) {
      const wrapperElement = this.$refs[this.refName] as Element;
      const contains = wrapperElement?.contains(event.target as Node) ?? false;
      if (!contains && this.visible) this.handleClose();
    },
    /** close handler */
    handleClose() {
      this.$emit("close");
    },
  },
});
</script>

<!-- template -->
<template>
  <div
    v-if="visible"
    :ref="refName"
    :class="[visible ? $style.show : '', $style.common_popover]"
    :style="{
      left: position.left,
      right: position.right,
      top: position.top,
      bottom: position.bottom,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" module>
@import "./popover.module";
</style>
