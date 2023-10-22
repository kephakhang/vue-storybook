<!--
  Summary. 
   List Group isolated component. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    ListGroup
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components
 
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import styles from "./list-group.module.scss";
import type { ItemType } from "../../types/ListGroup";

const ASSIGNED_LIST_ITEM_CLASS = "assigned_list_item";
const AVAILABLE_LIST_ITEM_CLASS = "available_list_item";

export default defineComponent({
  name: "ListGroup",
  props: {
    /** set the list items */
    list: {
      type: Array as PropType<ItemType[]>,
    },
    setResult: Function as PropType<(item: ItemType) => void>,
    /** set the style properties of the list {e.g {width : 200px}} */
    styleProps: {
      type: String as PropType<StyleValue>,
    },
    /** to show and hide each item's id */
    itemId: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /** to add and remove an option of list items */
    isSelected: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  computed: {
    /**
     * calculate style for a selected list
     */
    selectedStyle() {
      return this.isSelected
        ? ASSIGNED_LIST_ITEM_CLASS
        : AVAILABLE_LIST_ITEM_CLASS;
    },
    /**
     * returns the style for list-group either availableList or assigned list
     */
    listGroupClassComputed() {
      return `${styles[this.selectedStyle]}`;
    },
  },
  methods: {
    /**
     * Updates the availability of an item and invokes the setResult callback.
     * @param item - The item to be updated.
     */
    availableItem(item: ItemType) {
      item.enable = true;

      // Perform the operation after the next rendering cycle
      this.$nextTick(() => {
        if (this.setResult) {
          this.setResult(item);
        }
      });
    },

    /**
     * Performs operations on the selected item in the list.
     * @param  index - The index of the selected item.
     */
    selectedItem(index: number) {
      // Retrieve the item at the specified index
      const item = this.list?.[index];

      // Proceed if item exists
      if (item) {
        // Perform the operation after the next rendering cycle
        this.$nextTick(() => {
          // Invoke the setResult callback with the selected item
          if (this.setResult) {
            this.setResult(item);
          }
        });

        // Remove the item from the list
        this.list?.splice(index, 1);
      }
    },
  },
});
</script>

<!-- template -->
<template>
  <div :style="styleProps">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="$style.selected_item"
    >
      <div
        v-if="itemId"
        :class="listGroupClassComputed"
        :disabled="item.enable"
      >
        {{ item.id }}
      </div>
      <div
        :class="listGroupClassComputed"
        :disabled="item.enable"
      >
        {{ item.name }}
      </div>
      <div
        v-if="isSelected"
        :class="$style.minus_item"
        @click="selectedItem(index)"
      >
        <img
          src="#"
          alt="icon"
          :class="$style.minus_item_icon"
        />
      </div>
      <div
        v-else
        :class="$style.minus_item"
        :disabled="item.enable"
        @click="availableItem(item)"
      >
        <img
          src="#"
          alt="icon"
          :class="$style.plus_item_icon"
        />
      </div>
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module>
@import "./list-group.module";
</style>
