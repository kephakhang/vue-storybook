<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  onUnmounted,
} from "@vue/composition-api";
import { addIdSymbol, removeIdSymbol } from "./utils/keys";
import type { StyleValue } from "~/types/common";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const addId = inject<(id: string, size: number) => void>(addIdSymbol)!;
    const removeId = inject<(id: string) => void>(removeIdSymbol)!;
    const gridItemStyle = computed<StyleValue>(() => {
      return {
        "grid-column-end": `span ${props.size}`,
        "grid-row": "span 1",
      };
    });

    onBeforeMount(() => {
      addId(props.id, props.size);
    });

    onUnmounted(() => {
      removeId(props.id);
    });

    return { gridItemStyle };
  },
});
</script>
<template>
  <div :style="gridItemStyle">
    <slot></slot>
  </div>
</template>
