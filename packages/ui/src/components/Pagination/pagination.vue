<!--
  Summary.
   Tab Pagination isolated component.
 
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    pagination
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/J7P8GFHiJ4zwL0gFsAkN8z/Platform-2.0-layout--?node-id=19%3A17795&t=KZ0AzhqeDVU0ma5y-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story
 
-->

<!--script -->
<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

import IconButton from "./../IconButton/icon-button.vue";
import type { ClickHandler } from "../../types/Pagination";

export default defineComponent({
  /**
   * alias for icon-button
   */
  components: {
    IconButton,
  },
  props: {
    styleProps: [String, Object] as PropType<StyleValue>,

    /**
     * Current Page
     */
    currentPage: {
      type: Number,
      default: 1,
    },
    /**
     * Total Pages
     */
    totalPage: {
      type: Number,
      default: 1,
    },
    /**
     * Disable complete pagination component
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Handler for changing page to Previous Page will return object  currentPage: number; totalPage: number
     */
    previousClickHandler: Function as PropType<ClickHandler>,
    /**
     * Handler for changing page to Next Page will return object  currentPage: number; totalPage: number
     */
    nextClickHandler: Function as PropType<ClickHandler>,
  },
  data() {
    return {
      disableNext: false,
      disablePrevious: false,
    };
  },
  computed: {
    /**
     * disable Next button if there is no next page available
     */
    computeNextDisabled() {
      return this.currentPage == this.totalPage || this.disabled;
    },
    /**
     * disable previous button if there is no previous page available
     */
    computePreviousDisabled() {
      return this.currentPage == 1 || this.disabled;
    },
  },
  methods: {
    /**
     * Handler for changing page to Next Page
     * create object  currentPage: number; totalPage: number and send in argument of call back function
     */
    nextHandler() {
      if (this.currentPage >= this.totalPage) return;
      // Invoke the nextClickHandler callback with the current page details
      this.nextClickHandler?.({
        currentPage: this.currentPage + 1,
        totalPage: this.totalPage,
      });
    },
    /**
     * Handler for changing page to Previous Page
     * create object currentPage: number; totalPage: number and send in argument of call back function
     */
    previousHandler() {
      if (this.currentPage <= 1) return;
      // Invoke the previousClickHandler callback with the current page details
      this.previousClickHandler?.({
        currentPage: this.currentPage - 1,
        totalPage: this.totalPage,
      });
    },
  },
});
</script>

<!-- template -->
<template>
  <div
    :style="styleProps"
    :class="$style.pagination_container"
  >
    <span :class="$style.pagination_label"
      >{{ currentPage }} of {{ totalPage }}</span
    >
    <icon-button
      button-type="previous"
      :click-handler="previousHandler"
      :disabled="computePreviousDisabled"
    >
    </icon-button>
    <icon-button
      button-type="next"
      :click-handler="nextHandler"
      :disabled="computeNextDisabled"
    >
    </icon-button>
  </div>
</template>
<!--styles scss -->
<style scoped lang="scss" module>
@import "./Pagination.module";
</style>
