<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type {
  FilterMode,
  GetFilterItemsFn,
  GetFilterResourceTypesFn,
  GetSavedFilterListFn,
  SavedFilterItem,
  SaveFilterItemsArgs,
} from "./types";
import type { StyleValue } from "~/types/common";

import CtaButton from "~/components/Button/cta-button.vue";
import Tooltip from "~/components/Tooltip/tool-tip.vue";
import Dropdown from "~/components/Dropdown/single-dropdown/dropdown.vue";
import Icon from "~/components/Icon/icon.vue";

import MasterDropdown from "./dropdown.vue";
import type { ResourceInfo } from "./types";

interface MasterFilterData {
  currentMode: FilterMode;
  currentResourceType: string;
  searchQuery: string;
  pageNumber: number;
  placeholder: string;
  resourceTypeList: ResourceInfo[];
  savedFilterList: SavedFilterItem[];
  filterListVisbleNumber?: number | null;
  isResourceTypesDropdownVisible: boolean;
  isResourceTypesContentsDropdownVisible: boolean;
}

export default defineComponent({
  components: {
    CtaButton,
    Tooltip,
    Dropdown,
    MasterDropdown,
    // TODO(sun.lee): It looks really weird. Icon acts like a IconButton.
    Icon,
  },
  props: {
    getSavedFilterList: {
      type: Function as PropType<GetSavedFilterListFn>,
      required: true,
    },
    getFilterResourceTypes: {
      type: Function as PropType<GetFilterResourceTypesFn>,
      required: true,
    },
    getFilterItems: {
      type: Function as PropType<GetFilterItemsFn>,
      required: true,
    },
    saveFilterItems: {
      type: Function as PropType<(args: SaveFilterItemsArgs) => Promise<void>>,
      required: true,
    },
    clearAllFilterItems: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
    clearFilterItems: {
      type: Function as PropType<(resourceType: string) => Promise<void>>,
      required: true,
    },
    notifyFilterUpdated: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  data(): MasterFilterData {
    return {
      currentMode: "SELECTED",
      searchQuery: "",
      pageNumber: 1,
      currentResourceType: "",
      placeholder: "Search Filter",
      resourceTypeList: [],
      savedFilterList: [],
      isResourceTypesDropdownVisible: false,
      isResourceTypesContentsDropdownVisible: false,
      filterListVisbleNumber: null,
    };
  },
  computed: {
    computedPlaceholder() {
      return `Search ${this.capitalizeFirstLetter(
        this.currentResourceType.toLowerCase()
      )}`;
    },
  },
  mounted() {
    this.fetchSavedFilterItems();
  },
  methods: {
    getTooltipStyles(): StyleValue {
      return "width: 100px;";
    },
    getDropdownStyleProps(): StyleValue {
      return "top: 100%; left: 0px; min-width: 205px; margin-top: 2px;";
    },
    // button click handler ===========================================================================================================
    resourceTypeContentsDropdownCloseHandler() {
      console.log("resourceTypeContentsDropdownCloseHandler");
      this.isResourceTypesContentsDropdownVisible = false;
    },
    resourceTypesDropdownCloseHandler() {
      console.log("resourceTypeListCloseHandler");
      this.isResourceTypesDropdownVisible = false;
    },
    selectedDropdownCloseHandler() {
      console.log("selectedDropdownCloseHandler()");
      this.filterListVisbleNumber = null;
    },
    /**
     * filter button 을 클릭했을 때 resourceType 을 전달하여 dropdown에 들어갈 데이터를 불러옵니다.
     */
    onResourceTypeButtonClicked(resourceType: string, index: number) {
      this.isResourceTypesContentsDropdownVisible = false;
      this.isResourceTypesDropdownVisible = false;

      if (this.filterListVisbleNumber === index) {
        this.filterListVisbleNumber = null;
      } else {
        this.filterListVisbleNumber = index;
        this.currentResourceType = resourceType;
      }
    },
    /**
     * add filter 를 클릭했을 때 나오는 resourceType List를 클릭했을 때 진행할 동작입니다.
     */
    onResourceTypeDropdownItemClicked(info: Record<string, unknown>) {
      if (!("resourceType" in info) || typeof info.resourceType !== "string") {
        return;
      }

      this.isResourceTypesContentsDropdownVisible = true;
      this.filterListVisbleNumber = null;
      this.isResourceTypesDropdownVisible = false;
      this.currentResourceType = info.resourceType;
    },
    async onAddFilterButtonClicked() {
      console.log("addFilterClickHandler");
      await this.fetchFilterResourceType();
      this.filterListVisbleNumber = null;
      this.isResourceTypesContentsDropdownVisible = false;
      this.isResourceTypesDropdownVisible =
        !this.isResourceTypesDropdownVisible;
    },

    capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // APi ============================================================================================================================
    /**
     * 맨 처음 페이지 진입 시 저장해놓은 필터리스트를 확인하고 가져오기 위해 사용 (mount 시에 사용)
     */
    async fetchSavedFilterItems() {
      try {
        const { content } = await this.getSavedFilterList();
        console.log(content);
        this.savedFilterList = content;
        this.isResourceTypesContentsDropdownVisible = false;
        this.isResourceTypesDropdownVisible = false;
        this.filterListVisbleNumber = null;
      } catch (error) {
        // TODO(emoldino.jun): handle error
      }
    },
    // TODO(sun.lee): Remove sleep after BackEnd resolve unmatched data problem.
    sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    /**
     * 저장된 개별 필터 내역을 삭제한다.
     */
    async deleteSavedFilterItems(resourceType: string) {
      try {
        await this.clearFilterItems(resourceType);
        // TODO(sun.lee): Remove sleep after BackEnd resolve unmatched data problem.
        await this.sleep(200);
        await this.fetchSavedFilterItems();
        this.notifyFilterUpdated();
      } catch (error) {
        // TODO: handle error
      }
    },
    /**
     * 저장된 모든 필터 리스트를 삭제한다.
     */
    async deleteAllSavedFilterItems() {
      try {
        await this.clearAllFilterItems();
        // TODO(sun.lee): Remove sleep after BackEnd resolve unmatched data problem.
        await this.sleep(200);
        await this.fetchSavedFilterItems();
        this.notifyFilterUpdated();
      } catch (error) {
        // TODO: handle error
      }
    },

    async requestSaveFilterItems(
      args: Omit<SaveFilterItemsArgs, "resourceType">
    ) {
      try {
        await this.saveFilterItems({
          ...args,
          resourceType: this.currentResourceType,
        });
        await this.fetchSavedFilterItems();
        this.notifyFilterUpdated();
      } catch (error) {
        // TODO(emoldino.jun): handle error
      }
    },

    async fetchFilterResourceType() {
      try {
        const { content } = await this.getFilterResourceTypes();
        this.resourceTypeList = content;
      } catch (error) {
        // TODO(emoldino.jun): handle error
      }
    },
    getSelectedIds(savedItem: SavedFilterItem) {
      if ("selectedIds" in savedItem) return savedItem.selectedIds;
    },
    getUnselectedIds(savedItem: SavedFilterItem) {
      if ("unselectedIds" in savedItem) return savedItem.unselectedIds;
    },
  },
});
</script>

<template>
  <div
    class="filter_container"
    :style="{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
    }"
  >
    <!-- Selected Items -->
    <div
      v-for="(filterItem, index) in savedFilterList"
      :key="index"
      class="filter_element"
    >
      <!-- selected button -->
      <cta-button
        v-if="filterItem.selectedCount > 0"
        :style-props="{ color: '#4b4b4b' }"
        :click-handler="
          () => onResourceTypeButtonClicked(filterItem.resourceType, index)
        "
      >
        <div
          class="filter_wrapper"
          :style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }"
        >
          <span>
            {{
              `${filterItem.selectedCount} ${capitalizeFirstLetter(
                `${filterItem.resourceType}s`.toLowerCase()
              )}`
            }}
          </span>
          <div style="margin-left: 8px">
            <tooltip
              color="white"
              style-props="width: 72px"
            >
              <template #context>
                <icon
                  :style-props="{
                    padding: 0,
                    width: '12px',
                    height: '12px',
                  }"
                  :click-handler="
                    () => deleteSavedFilterItems(filterItem.resourceType)
                  "
                />
              </template>
              <template #body>
                <div>Clear Filter</div>
              </template>
            </tooltip>
          </div>
        </div>
      </cta-button>
      <master-dropdown
        v-if="filterListVisbleNumber === index"
        :fetch-handler="
          (args) =>
            getFilterItems({
              ...args,
              resourceType: currentResourceType,
            })
        "
        :initial-mode="filterItem.mode"
        :selected-ids-in-server="getSelectedIds(filterItem)"
        :unselected-ids-in-server="getUnselectedIds(filterItem)"
        :on-apply-button-clicked="requestSaveFilterItems"
        :on-close="selectedDropdownCloseHandler"
        :visible="filterListVisbleNumber === index"
        :ref-name="`selectedDropdown-${index}`"
        :style-props="getDropdownStyleProps()"
        :title-name="'name'"
        :selected="true"
        :resource-type="filterItem.resourceType"
        :mode="filterItem.mode"
        :is-mode-changable="false"
      ></master-dropdown>
    </div>

    <!-- Add filter -->
    <div class="filter_element">
      <cta-button
        color-type="blue"
        :click-handler="onAddFilterButtonClicked"
      >
        <span>Add Filter</span>
        <div style="width: 8px"></div>
        <img
          width="16px"
          src="~assets/images/icon/filter-blue.svg"
          alt="filter icon"
        />
      </cta-button>
      <dropdown
        ref-name="resourceTypesDropdown"
        :click-handler="onResourceTypeDropdownItemClicked"
        :on-close="resourceTypesDropdownCloseHandler"
        :visible="isResourceTypesDropdownVisible"
        :items="
          resourceTypeList.length === 0
            ? [{ name: 'All available filters are in use' }]
            : resourceTypeList.map((resourceType) => ({
                ...resourceType,
                name: capitalizeFirstLetter(resourceType.name.toLowerCase()),
              }))
        "
        title-name="name"
        :style-props="getDropdownStyleProps()"
        :checkbox="false"
        placeholder="Search Filter"
      />

      <!-- filter list -->
      <master-dropdown
        v-if="
          isResourceTypesContentsDropdownVisible &&
          filterListVisbleNumber === null
        "
        ref-name="resourceTypeContentsDropdown"
        :on-apply-button-clicked="requestSaveFilterItems"
        :on-close="resourceTypeContentsDropdownCloseHandler"
        :visible="
          isResourceTypesContentsDropdownVisible &&
          filterListVisbleNumber === null
        "
        :style-props="getDropdownStyleProps()"
        :placeholder="computedPlaceholder"
        :fetch-handler="
          (args) =>
            getFilterItems({
              ...args,
              resourceType: currentResourceType,
            })
        "
      />
    </div>
    <!-- clear Filter -->
    <tooltip
      color="white"
      style-props="width: 92px"
    >
      <template #context>
        <icon
          v-if="savedFilterList.length > 0"
          :style-props="{
            width: '12px',
            height: '12px',
            padding: '8px',
            boxSizing: 'content-box',
          }"
          :click-handler="deleteAllSavedFilterItems"
        />
      </template>
      <template #body>
        <div>Clear All Filters</div>
      </template>
    </tooltip>
  </div>
</template>

<!-- styles -->
<style>
.filter_element {
  position: relative;
}
</style>
