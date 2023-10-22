<!--
  Summary.
   Search Bar isolated component.

   Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

  @since      0.3.22-dev-1
  @access     module

  @alias    Search bar
  @memberof emoldino

  @see  Function/class relied on https://www.figma.com/file/J7P8GFHiJ4zwL0gFsAkN8z/Platform-2.0-layout--?node-id=296%3A19831&t=KZ0AzhqeDVU0ma5y-0
  @link URL https://emoldino.github.io/emoldino-ui-components/


  @return component.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import type { SetTimeType } from "~/types/SearchBar";

export default defineComponent({
  props: {
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
    /**
     * search bar place holder
     */
    placeholderText: {
      type: String,
      default: "placeholder-text",
    },
    /** 검색어와 일치한 list */
    searchList: {
      type: Array,
      default: () => [],
    },
    /** searchList 중에 현재 어디에 focus 되어 있는 지 표시. */
    focusPosition: {
      type: Number,
      default: 0,
    },
    /** 검색을 시작할 때 사용될 keyword */
    searchCompleteKeyword: {
      type: String,
      default: "",
    },
    /** 검색을 시작하기 전 검색할 검색어를 저장시켜준다. */
    setSearchCompleteKeyword: {
      type: Function as PropType<(keyword: string) => void>,
      default: () => true,
    },
    /** 포커스의 위치를 정한다. */
    setFocusPosition: {
      type: Function as PropType<(position: number) => void>,
      default: () => true,
    },
  },
  data() {
    return {
      keyword: "",
      timeout: null as SetTimeType | null,
      focusOnSearchbar: 0,
    };
  },
  watch: {
    focusOnSearchbar() {
      if (this.$refs.searchInputRef) {
        (this.$refs.searchInputRef as HTMLInputElement).focus();
      }
    },
  },
  methods: {
    /**
     * 검색된 keyword 를 complete keyword 로 저장한다.
     * 이미 키워드가 입력된 상태에서 함수를 실행했다면 next search handler 실행
     */
    searchHandler() {
      if (this.searchCompleteKeyword === this.keyword) {
        this.nextSearchHandler();
      }
      this.setSearchCompleteKeyword(this.keyword);
      this.focusOnSearchbar += 1;
    },

    /** 다음 search list 로 focus를 이동. */
    nextSearchHandler() {
      if (this.focusPosition < this.searchList.length) {
        this.setFocusPosition(this.focusPosition + 1);
      }
      if (this.focusPosition === this.searchList.length) {
        this.setFocusPosition(1);
      }
      this.focusOnSearchbar += 1;
    },

    /** 이전 search list 로 focus 를 이동. */
    previousSearchHandler() {
      if (this.focusPosition > 1) {
        this.setFocusPosition(this.focusPosition - 1);
      }
      this.focusOnSearchbar += 1;
    },

    searchDebounce() {
      clearTimeout(this.timeout as SetTimeType);

      this.timeout = setTimeout(() => {
        this.searchHandler();
      }, 300);
    },
  },
});
</script>

<template>
  <div
    :style="styleProps"
    class="search_bar_container"
  >
    <div
      class="search_icon"
      @click="searchHandler"
    >
      <img
        alt="search Icon"
        class="search_icon_svg"
      />
    </div>
    <input
      ref="searchInputRef"
      v-model="keyword"
      class="search_input"
      :placeholder="placeholderText"
      type="text"
      @input="searchDebounce"
    />
    <div
      v-if="searchList.length && focusPosition"
      class="search_list_wrap"
    >
      <div class="display_searchlist">
        {{ focusPosition }} of {{ searchList.length }}
      </div>
      <div class="search_btn">
        <button @click="previousSearchHandler">
          <img alt="" />
        </button>
        <button @click="nextSearchHandler">
          <img alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./search-bar.module";
</style>
