<!--
  Summary. 
   list search bar isolated component.
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    listSearchBar
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/J7P8GFHiJ4zwL0gFsAkN8z/Platform-2.0-layout--?node-id=296%3A19831&t=KZ0AzhqeDVU0ma5y-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 
 
  @return component.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import SearchBar from "~/components/SearchBar/search-bar.vue";
import ToolTip from "~/components/Tooltip/tool-tip.vue";
import type { StyleValue } from "~/types/common";
import type { ListItemType } from "~/types/ListSearchBar";

export default defineComponent({
  name: "ListSearchBar",
  /**
   * components imported
   */
  components: {
    SearchBar,
    ToolTip,
  },
  props: {
    /**
     * search handler function
     */
    searchHandler: Function as PropType<(text: string) => void>,
    /**
     * title name {title/name/...}
     */
    titleName: {
      type: String,
      default: "title",
    },
    /**
     * list of items
     */
    items: Array as PropType<ListItemType[]>,
    /**
     * Click handler (click on tab)
     */
    clickHandler: Function as PropType<(item: ListItemType) => void>,
    /**
     * style props
     */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
    /**
     * search bar placeholder
     */
    placeholder: String,
    id: String,
  },

  data() {
    return {};
  },

  methods: {
    /**
     * search bar handler
     * @param value
     */
    search(value: string) {
      // Invoke the setResult callback with entered text
      this.searchHandler?.(value);
    },

    /**
     * truncate text method accepts a string and length. return a string
     * @param text
     * @param length
     * @return string
     */
    truncateText(text: string, length: number) {
      return text.length <= length ? text : text.substring(0, length) + "...";
    },
    /**
     * Click on option. If there is a click handler,
     * the click handler is executed, and if there is no click handler, it will  just select tab.
     * @param item
     */
    optionClick(item: ListItemType) {
      this.items?.forEach((value) => {
        value.active = false;
      });
      // Perform the operation after the next rendering cycle
      this.$nextTick(() => {
        item.active = true;
        // Invoke the setResult callback with the selected item
        this.clickHandler?.(item);
      });
    },
  },
});
</script>

<!-- template -->
<template>
  <div
    :class="$style.list_wrap"
    :style="styleProps"
  >
    <!--@component searchbar -->
    <search-bar
      :placeholder-text="placeholder || 'Search'"
      :set-search-complete-keyword="search"
      style-props="width:100%; margin-bottom: 16px;"
    ></search-bar>
    <div :class="$style.list_item_wrapper">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="$style.list_item_style"
      >
        <div
          :class="$style.list_item"
          :active="item.active"
          @click="optionClick(item)"
        >
          <tool-tip
            v-if="item.isLow ? item.title.length > 12 : item.title.length > 20"
            position="bottom"
            style-props="width: fit-content; max-width:160px; "
          >
            <template #context>
              <div :class="$style.list_item_title">
                {{
                  item.isLow
                    ? truncateText(item.title, 12)
                    : truncateText(item.title, 20)
                }}
              </div>
            </template>
            <template #body>
              <span>{{ item.title }}</span>
            </template>
          </tool-tip>
          <div
            v-else
            :class="$style.list_item_title"
          >
            {{ item.title }}
          </div>
          <div
            v-if="item.isLow"
            :class="$style.low_flag"
          >
            <span>Low Comp.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./list-search-bar.module.scss";
</style>
