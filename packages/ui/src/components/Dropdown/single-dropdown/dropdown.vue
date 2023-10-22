<!--
Summary.
Single Dropdown isolated component.

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    Dropdown
@memberof emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states

@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import SearchBar from "~/components/SearchBar/search-bar.vue";
import CommonPopover from "~/components/Popover/popover.vue";
import type { StyleValue } from "~/types/common";

import styles from "./dropdown.module.scss";
import type { ItemType } from "~/types/Dropdown";

const textWhenEmpty = "No Matching Filter";

export default defineComponent({
  name: "Dropdown",

  // alice component
  components: {
    SearchBar,
    CommonPopover,
  },
  props: {
    titleName: {
      type: String,
      default: "title",
    },
    /**
     * props for popover
     */
    visible: Boolean,
    /**
     * option list (title: name to be displayed in an option list, image: option image) (ex: {title: 'option1', [image: imageUrl, ...]})
     */
    items: {
      type: Array as PropType<ItemType[]>,
      default: [] as ItemType[],
    },
    /**
     * On close dropdown when you click outside
     */
    onClose: Function,
    /**
     * Save the final result. (When using checkboxes)
     */
    setResult: Function as PropType<(items: ItemType[]) => void>,
    /**
     * Click handler (if using list click without using checkbox)
     */
    clickHandler: Function as PropType<(item: ItemType) => void>,
    /**
     * Set whether checkbox or no
     */
    checkbox: Boolean,
    /**
     * Set whether dropdown-list wrap-style or not (ex: {top: '10px', left: '10px', width: '10px'})
     */
    styleProps: [String, Object] as PropType<StyleValue>,
    /**
     * Set whether placeholder or not
     */
    placeholder: String,
    infoText: {
      Type: String,
      default: "",
    },
    /**
     * Set whether checkbox-id or not
     */
    id: String,
    refName: String,
  },

  data() {
    return {
      filteredDependency: 1,
      logTest: false,
      /**
       * The input value. Shows the input list searched through filtered.
       */
      searchText: "",
      isHover: false,
      requestParam: {
        query: "",
      },
      // TODO: need to update it by checking change by really value-change
      /** simple check if user has interacted with component or not */
      isInteracted: false,
    };
  },
  computed: {
    /**
     * Filters the items based on the search text.
     * If no items match the search, a special item indicating empty results is returned.
     * The filtered items are sorted alphabetically based on the specified title name.
     * @returns The filtered and sorted items.
     */

    filtered() {
      // Trim the search text
      const searchText = this.searchText.trim();

      // Check if the search conditions are empty
      const isEmptySearch =
        this.items.length === 0 ||
        this.filteredDependency === 0 ||
        searchText.length === 0;

      // Return original items if the search conditions are empty
      if (isEmptySearch) {
        return this.items;
      }

      // Filter items based on a search text
      const filteredItems = this.items.filter(
        (item) =>
          item[this.titleName]?.toUpperCase().includes(searchText.toUpperCase())
      );

      // If no items match the search, return an array with a special item indicating empty results
      return filteredItems.length === 0
        ? [{ [this.titleName]: textWhenEmpty }]
        : filteredItems.sort((a, b) =>
            a[this.titleName].toUpperCase() > b[this.titleName].toUpperCase()
              ? 1
              : -1
          );
    },
    checkedArray() {
      const newArray = this.filtered.filter((item) => item?.checked);
      return newArray;
    },

    /**
     * Determines the dropdown item style based on the checkbox and filtered items.
     * If the checkbox is truthy or any item in 'this.filtered' has 'this.titleName' equal to 'textWhenEmpty',
     * the function returns undefined.Otherwise, it returns 'styles.list_hover_dropdown'.
     * @returns The dropdown item style or undefined.
     */

    dropdownItemStyle() {
      // Check if the checkbox is truthy or if any item in 'this.filtered' has 'this.titleName' equal to 'textWhenEmpty'
      if (
        this.checkbox ||
        this.filtered.some((item) => item[this.titleName] === textWhenEmpty)
      )
        return;

      // Return the 'styles.list_hover_dropdown' value if the condition is false
      return styles.list_hover_dropdown;
    },
  },
  methods: {
    getComputedStyle(item: ItemType) {
      if (item.icon) return;
      return `${item.icon}-icon`;
    },

    search(value: string) {
      this.searchText = value;
    },

    /**
     * Truncates a given text if its length exceeds a specified limit.
     * @param text - The text to truncate.
     * @param length - The maximum length of the truncated text.
     * @returns - The truncated text or the original text if it is within the length limit.
     */
    truncateText(text: string, length: number) {
      return text && text.length > length
        ? text.substring(0, length) + "..."
        : text;
    },

    /**
     * Event handler for handling changes to a checkbox.
     * @param event - The change event.
     * @param index - The index of the checkbox in the filtered array.
     */
    changeHandler(event: Event, index: number) {
      this.isInteracted = true;
      if (!this.filtered[index] || !event.target) return;

      // Safely access the checked property of the event target
      const target = event.target as HTMLInputElement;
      this.filtered[index].checked = target.checked;
      this.$set(this.filtered, index, this.filtered[index]);
      this.filteredDependency += 1;
    },

    onClickOption(item: ItemType) {
      if (!this.checkbox) {
        this.clickHandler?.(item);
        this.handleClose();
      }
    },

    /**
     * Selects all items in the filtered array by setting their 'checked' property to true,
     * if they are not disabled. Updates the filteredDependency counter.
     */
    selectAll() {
      this.isInteracted = true;
      // Create a shallow copy of the 'filtered' array
      const tempArray = [...this.filtered];

      // Clear the 'filtered' array
      this.filtered.length = 0;

      // Iterate over the temporary array
      tempArray.forEach((item) => {
        // Check if the item is not disabled
        if (!item.disabled) {
          // Set the 'checked' property to true
          item.checked = true;
        }

        // Add the item back to the 'filtered' array
        this.filtered.push(item);
      });

      // Increase the filteredDependency counter
      this.filteredDependency += 1;
    },

    /**
     * Deselects all items in the filtered array by setting their 'checked' property to false,
     * if they are not marked as default. Updates the filteredDependency counter.
     */
    unselectAll() {
      this.isInteracted = true;
      // Create a shallow copy of the 'filtered' array
      let tempArray = this.filtered.slice();

      // Clear the 'filtered' array
      this.filtered.splice(0);

      // Iterate over the temporary array
      tempArray?.map((item) => {
        // Check if the item is not marked as default
        if (item.default !== true) {
          // Set the 'checked' property to false
          item.checked = false;
        }

        // Add the item back to the 'filtered' array
        this.filtered.push(item);
      });

      // Increase the filteredDependency counter
      this.filteredDependency += 1;
    },

    // handler for popover
    handleClose() {
      if (this.isInteracted && this.checkbox) {
        this?.setResult?.(this.filtered.filter((i) => i.checked));
        this.isInteracted = false;
      }
      this.searchText = "";
      this.onClose?.();
    },
  },
});
</script>

<!-- template -->
<template>
  <!-- popover -->
  <common-popover
    :visible="visible"
    :ref-name="refName"
    @close="handleClose"
  >
    <!-- dropdown -->
    <div
      :class="$style.dropdown_wrap"
      :style="styleProps"
    >
      <div v-if="items.length >= 5">
        <!-- searchbar -->
        <search-bar
          :placeholder-text="placeholder || 'Search'"
          :request-param="requestParam"
          :set-search-complete-keyword="search"
        ></search-bar>

        <div :class="$style.focus_border"></div>
      </div>

      <!-- elements for the list -->
      <ul :class="$style.dropdown_list">
        <li
          v-if="checkbox && filtered?.length >= 5"
          :class="$style.all_select_list"
        >
          <div
            :disabled="checkedArray?.length === filtered?.length"
            @click="selectAll()"
          >
            Select All
          </div>
          <div
            :disabled="checkedArray?.length === 0"
            @click="unselectAll()"
          >
            Unselect All
          </div>
        </li>
        <li :class="$style.info_text">{{ infoText }}</li>
        <li
          v-for="(item, index) in filtered"
          :key="index"
        >
          <label
            :for="`dropdown-input-${index}-${id}`"
            :disabled="item?.disabled"
            :class="dropdownItemStyle"
            @click.stop="onClickOption(item)"
          >
            <template v-if="checkbox">
              <!-- TODO(sun.lee): Fix type error -->
              <input
                :id="`dropdown-input-${index}-${id}`"
                type="checkbox"
                :value="JSON.stringify(item)"
                :checked="item.checked"
                @input.stop="(event) => changeHandler(event, index)"
              />
              <div :class="$style.checkbox_custom"></div>
            </template>
            <div
              v-if="item?.icon"
              :class="[getComputedStyle(item), $style.defualt_style]"
            >
              <img
                :src="item.icon"
                alt="dropdown-icon"
              />
            </div>
            {{ truncateText(item[titleName], 40) }}
          </label>
        </li>
      </ul>
    </div>
    <!-- ./ dropdown -->
  </common-popover>
  <!-- ./ popover -->
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./dropdown.module";
</style>
