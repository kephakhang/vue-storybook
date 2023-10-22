<!--
 * Summary. 
 *  Single Dropdown isolated component. 
 * 
 * Description.
 *  This component is a common component, so if you modify it, it can affect everywhere you use this component.
 *  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 *
 * @since      0.3.22-dev-1
 * @access     module
 *
 * @alias    Dropdown
 * @memberof emoldino
 *
 * @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
 * @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 *
 *
 * @return {component}.
-->
<script lang="ts">
//extentions
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

// components
import SearchBar from "~/components/SearchBar/search-bar.vue";
import CommonPopover from "~/components/Popover/popover.vue";
import CtaButton from "~/components/Button/cta-button.vue";
import DotSpinner from "~/components/Spinner/dot-spinner.vue";
import { throttle } from "~/utils/throttle";

import type {
  FilterMode,
  FilterItem,
  GetFilterItemsRes,
  PageableArgs,
  SaveFilterItemsArgs,
} from "./types";

// @vue/component
export default defineComponent({
  name: "Dropdown",

  // alice component
  components: {
    SearchBar,
    CommonPopover,
    CtaButton,
    DotSpinner,
  },
  props: {
    initialMode: {
      type: String as PropType<FilterMode>,
      default: "SELECTED",
    },
    /**
     * props for popover
     */
    visible: Boolean,
    /**
     * option list (title: name to be displayed in option list, image: option image) (ex: {title: 'option1', [image: imageUrl, ...]})
     */
    items: {
      type: Array as PropType<FilterItem[]>,
      default: () => [] as FilterItem[],
    },
    /**
     * On close dropdown when you click outside
     */
    onClose: Function as PropType<() => void>,
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
    position: {
      type: Object,
      default: () => ({ top: "", left: "", right: "", bottom: "" }),
    },
    onApplyButtonClicked: {
      type: Function as PropType<
        (args: Omit<SaveFilterItemsArgs, "resourceType">) => void
      >,
      required: true,
    },
    fetchHandler: Function as PropType<
      ({ page, size, query }: PageableArgs) => Promise<GetFilterItemsRes>
    >,
    hasSearchBar: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    selectedIdsInServer: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    unselectedIdsInServer: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    isModeChangable: {
      type: Boolean,
      default: true,
    },
    refName: String,
  },

  data() {
    return {
      mode: "SELECTED" as FilterMode,
      /** The input value. Shows the input list searched through filtered. */
      searchText: "",
      isLoading: false,
      itemList: [] as FilterItem[],
      hasReachedMax: false,
      page: 1,
      size: this.pageSize,
      selectedIds: [] as number[],
      unselectedIds: [] as number[],
    };
  },
  computed: {
    // Filter your search terms
    filteredItems() {
      const searchText = this.searchText.trim();

      if (this.itemList.length === 0 || this.searchText.length === 0) {
        return this.itemList;
      }

      const filteredItem = this.itemList.filter(({ name }) => {
        return name.toUpperCase().includes(searchText.toUpperCase());
      });

      return filteredItem.sort((current, next) => {
        const currentName = current.name;
        const nextName = next.name;
        return currentName.toUpperCase() > nextName.toUpperCase() ? 1 : -1;
      });
    },
    isButtonEnabled() {
      if (this.mode === "SELECTED") {
        return this.selectedIds.length > 0;
      }

      if (!this.hasReachedMax) return true;
      const allUnselected = this.filteredItems.every(({ id }) => {
        return this.unselectedIds.includes(id);
      });
      return !allUnselected;
    },
    throttledFetchFilterItems() {
      return throttle(this.fetchFilterItems, 200);
    },
  },
  watch: {
    initialMode: {
      handler() {
        this.mode = this.initialMode;
      },
      immediate: true,
    },
    selectedIdsInServer: {
      handler() {
        this.selectedIds = this.selectedIdsInServer;
      },
      immediate: true,
    },
    unselectedIdsInServer: {
      handler() {
        this.unselectedIds = this.unselectedIdsInServer;
      },
      immediate: true,
    },
    items: {
      handler() {
        this.itemList = this.items;
      },
      immediate: true,
    },
    searchText() {
      this.clearData({
        itemList: false,
        searchText: false,
      });
      this.throttledFetchFilterItems();
    },
  },
  mounted() {
    if (this.itemList.length === 0 && this.fetchHandler) {
      this.fetchFilterItems();
    }
  },
  methods: {
    clearData({
      searchText = true,
      itemList = true,
      page = true,
      hasReachedMax = true,
    }) {
      if (searchText) this.searchText = "";
      if (itemList) this.itemList = [];
      if (page) this.page = 1;
      if (hasReachedMax) this.hasReachedMax = false;
    },
    isChecked(id: number) {
      if (this.mode === "SELECTED") return this.selectedIds.includes(id);
      return !this.unselectedIds.includes(id);
    },
    updateSearchText(value: string) {
      this.searchText = value;
    },
    truncateText(text: string, length: number) {
      if (text && text.length > length) {
        return text.substring(0, length) + "...";
      } else {
        return text;
      }
    },
    onCheckboxChanged(event: Event, item: FilterItem) {
      const isChecked = (event.target as HTMLInputElement).checked;

      if (this.mode === "SELECTED") {
        if (isChecked) {
          this.selectedIds.push(item.id);
          return;
        }
        this.selectedIds = this.selectedIds.filter((id) => id !== item.id);
        return;
      }

      // unselected mode
      if (isChecked) {
        this.unselectedIds = this.unselectedIds.filter((id) => id !== item.id);
        return;
      }

      this.unselectedIds.push(item.id);
    },
    changeMode(mode: FilterMode) {
      this.mode = mode;
      this.selectedIds = [];
      this.unselectedIds = [];
    },
    // handler for popover
    handleClose() {
      this.clearData({});
      this.onClose?.();
    },
    /**
     * get scroll position in percentage
     */
    getScrollPosition(element: HTMLUListElement) {
      const scrollContainerRef = element;

      const offsetHeight = scrollContainerRef.offsetHeight;
      const scrollTop = scrollContainerRef.scrollTop;
      const scrollHeight = scrollContainerRef.scrollHeight;

      return ((offsetHeight + scrollTop) / scrollHeight) * 100;
    },
    async scrollHandler() {
      if (this.hasReachedMax || !this.fetchHandler || this.isLoading) return;

      const scrollContainerRef = this.$refs.scrollContainer as HTMLUListElement;
      if (this.getScrollPosition(scrollContainerRef) > 80) {
        this.isLoading = true;
        await this.fetchFilterItems();
        this.isLoading = false;
      }
    },
    async fetchFilterItems() {
      if (this.hasReachedMax || !this.fetchHandler) return;

      const data = await this.fetchHandler({
        page: this.page,
        size: this.size,
        query: this.searchText,
      });

      this.hasReachedMax = data.last;
      this.page++;

      this.itemList = [
        ...this.itemList,
        ...data.content.filter((item) => {
          return this.itemList.every(
            (existingItem) => existingItem.id !== item.id
          );
        }),
      ].sort((current, next) => {
        const currentName = current.name;
        const nextName = next.name;
        return currentName.toUpperCase() > nextName.toUpperCase() ? 1 : -1;
      });
    },
  },
});
</script>

<!-- template -->
<template>
  <!-- popover -->
  <common-popover
    :visible="visible"
    :position="position"
    :ref-name="refName"
    @close="handleClose"
  >
    <!-- dropdown -->
    <div
      :class="$style.dropdown_wrap"
      :style="styleProps"
    >
      <div v-if="itemList.length >= 5 && hasSearchBar">
        <!-- searchbar -->
        <search-bar
          :placeholder-text="placeholder || 'Search'"
          :set-search-complete-keyword="updateSearchText"
        ></search-bar>

        <div :class="$style.focus_border"></div>
      </div>

      <!-- elements for the list -->
      <ul
        ref="scrollContainer"
        :class="$style.dropdown_list"
        @scroll="scrollHandler"
      >
        <li
          v-if="isModeChangable && filteredItems.length >= 5"
          :class="$style.all_select_list"
        >
          <div
            :disabled="mode === 'UNSELECTED' && unselectedIds.length === 0"
            @click="() => changeMode('UNSELECTED')"
          >
            Select All
          </div>
          <div
            :disabled="mode === 'SELECTED' && selectedIds.length === 0"
            @click="() => changeMode('SELECTED')"
          >
            Unselect All
          </div>
        </li>
        <li>
          <label v-if="filteredItems.length == 0">No Matching Filter</label>
        </li>
        <li :class="$style.info_text">{{ infoText }}</li>
        <li
          v-for="(item, index) in filteredItems"
          :key="index"
        >
          <label
            :for="`dropdown-input-${index}-${id}`"
            :class="[$style.list_hover_dropdown]"
          >
            <input
              :id="`dropdown-input-${index}-${id}`"
              type="checkbox"
              :checked="isChecked(item.id)"
              @input="(event) => onCheckboxChanged(event, item)"
            />
            <div :class="$style.checkbox_custom"></div>
            {{ truncateText(item.name, 40) }}
          </label>
        </li>
        <div
          v-if="isLoading"
          :class="$style.spinner_wrapper"
        >
          <dot-spinner />
        </div>
      </ul>
      <div
        v-if="filteredItems.length > 0"
        :class="$style.dropdown_footer"
      >
        <cta-button
          color-type="blue-fill"
          :disabled="!isButtonEnabled"
          :click-handler="
            () =>
              onApplyButtonClicked({
                mode,
                selectedIds,
                unselectedIds,
              })
          "
        >
          Apply Filter
        </cta-button>
      </div>
    </div>
    <!-- ./ dropdown -->
  </common-popover>
  <!-- ./ popover -->
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "../Dropdown/single-dropdown/dropdown.module.scss";
</style>
