<script lang="ts">
import {
  defineComponent,
  ref,
  type PropType,
  computed,
} from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import { useElementSize } from "@vueuse/core";

export default defineComponent({
  props: {
    /** If **true**, the table body will be scrollable. */
    scrollable: {
      type: Boolean,
      default: true,
    },
    styleProps: [String, Object] as PropType<StyleValue>,
  },
  setup() {
    const tableWrapper = ref<HTMLDivElement | null>(null);
    const dataTable = ref<HTMLDivElement | null>(null);
    const { width: dataTableWidth, height: dataTableHeight } =
      useElementSize(dataTable);
    const { height: tableWrapperHeight } = useElementSize(tableWrapper);

    const hasScrollbar = computed(() => {
      if (!tableWrapper.value) return false;
      return dataTableHeight.value > tableWrapper.value.clientHeight;
    });

    const borderContainerSize = computed<StyleValue | undefined>(() => {
      if (!tableWrapper.value || !dataTableWidth.value) return;
      return {
        height: `${tableWrapperHeight.value}px`,
        width: `${dataTableWidth.value}px`,
      };
    });

    return {
      dataTable,
      tableWrapper,
      dataTableWidth,
      borderContainerSize,
      hasScrollbar,
    };
  },
});
</script>

<template>
  <div
    :style="[
      {
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      },
      styleProps,
    ]"
  >
    <div
      ref="tableWrapper"
      class="table-wrapper"
      :style="{
        'overflow-y': scrollable ? 'auto' : 'hidden',
        'padding-right': scrollable && hasScrollbar ? '0.25rem' : 0,
      }"
    >
      <table ref="dataTable">
        <colgroup>
          <slot name="colgroup"></slot>
        </colgroup>
        <thead>
          <slot name="thead"></slot>
        </thead>
        <tbody>
          <slot name="tbody"></slot>
        </tbody>
      </table>
    </div>
    <div
      :style="[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          border: '1px solid #d6dade',
          'pointer-events': 'none',
          'z-index': 30,
        },
        borderContainerSize,
      ]"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  height: 100%;
  width: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d6dade;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    border: 1px solid #d6dade;
  }
}

table {
  height: auto;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: #ffffff;
}

thead {
  z-index: 20;
}

th,
td {
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 15px;
  font-style: normal;
  line-height: 1rem;
  color: #4b4b4b;
}

th {
  font-weight: 700;
  line-height: 1rem;
}

tr:nth-child(odd) > td {
  background: #f2f2f2;
}

thead {
  background: #ffffff;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #f2f2f2;
  border-collapse: collapse;
}
</style>
