<!--
Summary.
Custom List isolated component.

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.4.0
@access     module

@alias    CustomList
@memberof emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states

@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import type { DraggedContext, MoveEvent } from "vuedraggable";
import draggable from "vuedraggable";

import SearchBar from "../SearchBar/search-bar.vue";
import CtaButton from "../Button/cta-button.vue";
import type { ItemList } from "~/types/CustomList";

/**
 * Maximum number of items allowed in the selected list.
 */
const MAX_NUMBER_COUNT = 10;

export default defineComponent({
  name: "CustomList",
  components: { CtaButton, SearchBar, draggable },
  props: {
    /**
     * Set the styles for the element.
     */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
    /**
     * Set the list of items.
     */
    itemList: {
      type: Array as PropType<ItemList[]>,
      default: [] as ItemList[],
    },
    /**
     * Result handler for the element list.
     */
    setResult: Function as PropType<(items: ItemList[]) => void>,
  },
  data() {
    return {
      /**
       * The list of available items.
       */
      availableList: [] as ItemList[],
      /**
       * The list of selected items.
       */
      selectedList: [] as ItemList[],
    };
  },
  computed: {
    /**
     * The number of remaining items that can be selected.
     */
    selectedListComputed() {
      return MAX_NUMBER_COUNT - Number(this.selectedList.length);
    },
  },
  watch: {
    /**
     * Watch for changes in the selected list and invoke the result handler.
     */
    selectedList() {
      if (this.setResult) {
        this.setResult(this.selectedList);
      }
    },
  },
  /**
   * Set initial data for the list.
   */
  mounted() {
    this.setInitialData();
  },
  methods: {
    /**
     * Set initial data for the list.
     */
    setInitialData() {
      this.availableList = this.itemList.map((item) => ({
        ...item,
        display: true,
      }));
      this.selectedList = this.itemList
        .filter((item) => item.default)
        .slice(0, 10);
    },
    /**
     * Set the search complete keyword for filtering available items.
     */
    setSearchCompleteKeyword(keyword: string) {
      const searchKeyword = keyword
        ? keyword.replace(/\s/g, "").toLowerCase()
        : "";

      this.availableList.forEach((item) => {
        const itemTitle = item.title.replace(/\s/g, "").toLowerCase();
        item.display = !searchKeyword || itemTitle.includes(searchKeyword);
      });
    },
    /**
     * Select an item and add it to the selected list.
     */
    selectItem(clickedItem: ItemList) {
      if (this.selectedList.length === MAX_NUMBER_COUNT) return;

      this.selectedList.push({ ...clickedItem, selected: true });

      const itemToUpdate = this.availableList.find(
        (item) => item.id === clickedItem.id
      );
      if (itemToUpdate) {
        itemToUpdate.selected = true;
      }
    },
    /**
     * Unselect an item and remove it from the selected list.
     */
    unselectItem(clickedItem: ItemList) {
      this.selectedList = this.selectedList.filter(
        (item) => item.id !== clickedItem.id
      );
      const itemToUpdate = this.availableList.find(
        (item) => item.id === clickedItem.id
      );
      if (itemToUpdate) {
        itemToUpdate.selected = false;
      }
    },
    /**
     * Check if an item is draggable.
     */
    isDraggable(context: DraggedContext<HTMLElement>) {
      const { index, futureIndex } = context;
      const selectedItem = this.selectedList[index];
      const futureSelectedItem = this.selectedList[futureIndex];

      return !(selectedItem?.fixed || futureSelectedItem?.fixed);
    },
    /**
     * Check if an item can be moved during dragging.
     */
    checkMove(event: MoveEvent<HTMLElement>) {
      return this.isDraggable(event.draggedContext);
    },
  },
});
</script>

<template>
  <div
    :class="$style.custom_list_container"
    :style="styleProps"
  >
    <div :class="$style.available_side">
      <div :class="$style.available_side_header">
        <p>Available Columns</p>
      </div>
      <search-bar
        :set-search-complete-keyword="setSearchCompleteKeyword"
        placeholder-text="Search Available Columns"
      ></search-bar>
      <div :class="$style.available_side_contents">
        <div
          v-for="item in availableList"
          :key="item.id"
        >
          <div
            v-if="item.display"
            :class="$style.available_content"
          >
            <div :selected="item.selected">{{ item.title }}</div>
            <span
              :style="{
                visibility: item.selected ? 'hidden' : 'visible',
              }"
              :class="$style.list_plus_icon"
              @click="() => selectItem(item)"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.selected_side">
      <div :class="$style.selected_side_header">
        <p>Selected Columns</p>
        <cta-button
          :click-handler="setInitialData"
          button-type="text"
          style-props="font-size: 14px; padding: 0;"
        >
          Reset To Default
        </cta-button>
      </div>
      <draggable
        v-model="selectedList"
        :move="checkMove"
      >
        <transition-group>
          <div
            v-for="(item, index) in selectedList"
            :key="item.id"
            :class="$style.selected_content"
          >
            <span>{{ index + 1 }}</span>
            <div
              :selected="item.selected"
              :fixed="item.fixed"
            >
              {{ item.title }}
            </div>
            <span
              :style="{
                visibility: !item.selected || item.fixed ? 'hidden' : 'visible',
              }"
              :class="$style.list_minus_icon"
              @click="() => unselectItem(item)"
            ></span>
          </div>
        </transition-group>
      </draggable>

      <div
        v-for="index in selectedListComputed"
        :key="index"
        style="cursor: default"
        :class="$style.selected_content"
      >
        <span>{{ index + selectedList.length }}</span>
        <div :class="$style.empty_content"></div>
        <span :class="$style.empty_content_icon_area"></span>
      </div>
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module>
@import "./custom-list.module";
</style>
