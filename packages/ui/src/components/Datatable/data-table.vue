<!--
 * Summary. 
 *  Data Table isolated component. 
 * 
 * Description.
 *  This component is a common component, so if you modify it, it can affect everywhere you use this component.
 *  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 *
 * @since      0.3.22-dev-1
 * @access     module
 *
 * @alias    DataTable
 * @memberof emoldino
 *
 * @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
 * @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 *
 *
 * @return {component}.
-->

<!-- template -->
<template>
  <div
    class="data-table-container"
    :style="styleProps"
  >
    <!--header-->
    <div
      class="data-table-header"
      :style="bgColorComputed"
      :class="{ scrollbar: hasScroll }"
    >
      <table>
        <colgroup>
          <col
            v-for="(item, index) in columnWidthArray"
            :key="index"
            :style="{ width: item }"
          />
        </colgroup>
        <thead>
          <slot name="header"></slot>
        </thead>
      </table>
    </div>

    <!--body-->
    <div
      ref="bodyRef"
      class="data-table-body"
      :style="[
        bgColorComputed,
        {
          maxHeight: bodyHeight,
        },
      ]"
    >
      <table>
        <colgroup>
          <col
            v-for="(item, index) in columnWidthArray"
            :key="index"
            :style="{ width: item }"
          />
        </colgroup>
        <tbody>
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>

    <!--footer-->
    <div v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";

export default defineComponent({
  props: {
    /** set styles of component */
    styleProps: {
      type: String,
      default: "",
    },
    /** set background color */
    bgColor: {
      type: String,
      default: "#F5F8FF",
    },
    /** set height of component */
    bodyHeight: {
      type: String,
      default: "156px",
    },
    /** set column  width array */
    columnWidthArray: Array as PropType<string[]>,
  },
  data() {
    return {
      hasScroll: false,
    };
  },
  computed: {
    /** compute background color of data table */
    bgColorComputed() {
      return {
        "--data-table-bg-color": this.bgColor,
      };
    },
  },
  mounted() {
    this.isOverflowing();
  },
  methods: {
    /** set scroll if component element overflowing */
    isOverflowing() {
      let element = this.$refs.bodyRef as HTMLTableElement;
      if (this.$refs.bodyRef && element.clientHeight < element.scrollHeight) {
        this.hasScroll = true;
      }
    },
  },
});
</script>

<!-- styles -->
<style lang="scss" scoped>
// todo: module
@import "./data-table.module";
</style>
