<!--
Summary.
Table Descriptor component which takes slots for header and body.

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    tableDescriptor
@memberof emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=8247%3A16874&t=24uSIcwaHiGMGQOO-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-accordian--defaul


@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import formatter from "~/utils/formatter";
import TableStatus from "~/components/TableStatus/table-status.vue";
import type { StatusItem } from "~/types/TableDescriptor";

export default defineComponent({
  name: "TableDescriptor",
  components: {
    TableStatus,
  },
  props: {
    /** the title align in the upper left of the table */
    title: {
      type: String,
    },
    /** display the value in the upper right of the table */
    total: {
      type: [Number, String],
    },
    /**
     * display the unit of total with an array
     * the first element is used for a singular case
     * the second element is used for a plural case
     * */
    unit: {
      type: Array as PropType<string[]>,
      default: () => ["item", "items"],
      validator(val) {
        return Array.isArray(val) && val.length === 2;
      },
    },
    /** style inject to wrapper element */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
    /** 2 cols label support for key/label structure */
    colLabels: {
      type: Array as PropType<string[]>,
      default: () => ["col 1", "col 2"],
      validator(val) {
        return Array.isArray(val) && val.length === 2;
      },
    },
    /**
     * List items display in table
     * each item should have a category which matches with CategoryTypes and value
     * */
    listItems: Array as PropType<StatusItem[]>,
  },
  data() {
    return {
      formatter,
      results: [],
    };
  },
  computed: {
    displayTotalCount() {
      return this.total !== null;
    },
  },
});
</script>

<template>
  <div
    class="summary_tooltip"
    :style="styleProps"
  >
    <div class="summary_head">
      <div class="summary_title">{{ title }}</div>
      <div
        v-if="displayTotalCount"
        class="summary_total"
      >
        {{ total }}
        <span class="unit">
          {{ total && Number(total) <= 1 ? unit[0] : unit[1] }}
        </span>
      </div>
      <div v-else></div>
    </div>

    <div class="divider"></div>

    <div class="summary_content">
      <div class="summary_content_headbar">
        <span
          v-for="col in colLabels"
          class="headbar_label"
        >
          {{ col }}
        </span>
      </div>

      <div
        v-for="item in listItems"
        class="summary_content_item"
      >
        <div class="summary_content_item_label">
          <table-status :category="item.category"></table-status>
        </div>
        <div class="summary_content_item_value">
          {{ formatter.formatNumber(item.value) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./table-descriptor.module.scss";
</style>
