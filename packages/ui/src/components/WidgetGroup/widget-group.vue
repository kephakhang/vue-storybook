<script lang="ts">
import {
  defineComponent,
  provide,
  type PropType,
  ref,
  computed,
  watch,
} from "@vue/composition-api";
import type { CSSProperties, StyleValue } from "~/types/common";
import type { WidgetGroupSize } from "../../types/WidgetGroup";
import { useElementSize } from "@vueuse/core";
import {
  addIdSymbol as updateChildInfoSymbol,
  removeIdSymbol as removeChildInfoSymbol,
} from "./utils/keys";

const DEFAULT_COLUMN_WIDTH = "280px";

export default defineComponent({
  props: {
    columns: {
      type: Number,
      default: 4,
    },
    minColumnWidth: {
      type: String as PropType<CSSProperties["width"]>,
      default: DEFAULT_COLUMN_WIDTH,
    },
    minRowHeight: {
      type: String as PropType<CSSProperties["height"]>,
      default: DEFAULT_COLUMN_WIDTH,
    },
    onSizeChange: {
      type: Function as PropType<(size: WidgetGroupSize) => void>,
    },
    styleProps: [String, Object] as PropType<StyleValue>,
  },
  setup(props) {
    const gridContainer = ref<HTMLElement | null>(null);

    const { width: gridContainerWidth } = useElementSize(gridContainer);

    const childrenInfo = ref<{ id: string; size: number }[]>([]);

    const gridStyle = computed<StyleValue>(() => {
      const minWidth = props.minColumnWidth ?? 0;
      const styles = {
        "grid-template-columns": `repeat(${props.columns}, minmax(${minWidth}, 1fr))`,
        "grid-auto-rows": `minmax(${props.minRowHeight}, 50%)`,
      };

      if (!props.styleProps) return styles;
      if (Array.isArray(props.styleProps)) {
        return [styles, ...props.styleProps];
      }
      return [styles, props.styleProps];
    });

    const size = computed(() => {
      const width = gridContainerWidth.value;
      if (width > 1024) return "large";
      if (width > 768) return "medium";
      return "small";
    });

    watch(size, () => {
      props.onSizeChange?.(size.value);
    });

    provide(updateChildInfoSymbol, (id: string, size: number) => {
      const childInfo = childrenInfo.value.find((child) => child.id === id);
      if (!childInfo) {
        childrenInfo.value.push({ id, size });
        return;
      }

      childrenInfo.value = childrenInfo.value.map((child) => {
        if (child.id === id) return { id, size };
        return child;
      });
    });

    provide(removeChildInfoSymbol, (id: string) => {
      childrenInfo.value = childrenInfo.value.filter(
        (child) => child.id !== id
      );
    });

    return { gridStyle, gridContainer };
  },
});
</script>
<template>
  <div style="width: 100%; height: 100%">
    <div
      ref="gridContainer"
      class="grid-container"
      :style="gridStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.grid-container {
  height: 100%;
  width: 100%;
  display: grid;
}
</style>
