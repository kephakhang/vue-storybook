<script lang="ts">
import { useInfiniteQuery } from "@tanstack/vue-query";
import {
  defineComponent,
  toRef,
  ref,
  watch,
  type PropType,
} from "@vue/composition-api";
import {
  CtaButton,
  DotSpinner,
  DropdownContent,
  DropdownItem,
  DropdownPortal,
  DropdownRoot,
  DropdownTrigger,
  SearchBar,
} from "~/index";
import type { GetMoldItems, MoldInfo } from "../types";
import { useInfiniteScroll } from "@vueuse/core";

export default defineComponent({
  components: {
    CtaButton,
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
    DropdownItem,
    DotSpinner,
    SearchBar,
  },
  props: {
    getMoldItems: {
      type: Function as PropType<GetMoldItems>,
      required: true,
    },
    initialTitle: {
      type: String as PropType<string | null>,
      default: null,
    },
    setSelectedMold: {
      type: Function as PropType<(id: number, code: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const dropdownWrapperRef = ref<HTMLElement | null>(null);
    const displayedTitle = toRef(props, "initialTitle");
    const moldsData = ref<MoldInfo[]>([]);
    const searchKeyword = ref<string>();

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
      useInfiniteQuery({
        queryKey: ["moldList", displayedTitle, searchKeyword],
        queryFn: ({ pageParam = 1 }) => {
          return props.getMoldItems({
            page: pageParam as number,
            size: 20,
            query: searchKeyword.value,
          });
        },
        getNextPageParam: (lastPage) => {
          return lastPage.last ? undefined : lastPage.pageable.pageNumber + 2;
        },
        getPreviousPageParam: (firstPage) => {
          return firstPage.first ? undefined : firstPage.pageable.pageNumber;
        },
      });

    useInfiniteScroll(
      dropdownWrapperRef,
      async () => {
        if (!hasNextPage?.value) return;
        await fetchNextPage();
      },
      { distance: 10 }
    );

    const selectItem = (item: MoldInfo) => {
      props.setSelectedMold(item.moldId, item.moldCode);
    };

    const setSearchKeyword = (value: string) => {
      searchKeyword.value = value;
    };

    watch(data, () => {
      moldsData.value =
        data.value?.pages.map((item) => item.content).flat() ?? [];
    });

    return {
      dropdownWrapperRef,
      displayedTitle,
      hasNextPage,
      isLoading,
      isFetchingNextPage,
      moldsData,
      selectItem,
      setSearchKeyword,
    };
  },
});
</script>

<template>
  <DropdownRoot
    position="bottom-right"
    max-width="12.75rem"
  >
    <DropdownTrigger>
      <CtaButton
        variant="dropdown"
        style-props="white-space: nowrap"
        :disabled="!displayedTitle"
      >
        {{ displayedTitle ?? "No data available" }}
      </CtaButton>
    </DropdownTrigger>
    <DropdownPortal v-if="displayedTitle">
      <DropdownContent>
        <template #header>
          <SearchBar
            v-if="moldsData.length > 4"
            placeholder-text="Search tooling ID"
            :style-props="{ width: '100%' }"
            :set-search-complete-keyword="setSearchKeyword"
          ></SearchBar>
        </template>
        <div
          ref="dropdownWrapperRef"
          :class="$style['dropdown-wrapper']"
        >
          <DropdownItem
            v-for="(item, index) in moldsData"
            :key="index"
            :text="item.moldCode"
            @click="selectItem(item)"
          ></DropdownItem>
          <div
            v-if="isFetchingNextPage || isLoading"
            :class="$style['spinner-wrapper']"
            :style="{ height: isLoading ? '12.5rem' : '' }"
          >
            <DotSpinner></DotSpinner>
          </div>
        </div>
      </DropdownContent>
    </DropdownPortal>
  </DropdownRoot>
</template>

<style lang="scss" module>
.dropdown-wrapper {
  min-width: 12.5rem;
  max-height: 12.5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.313rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #d6dade;
    border-radius: 0.063rem;
  }
}

.spinner-wrapper {
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
