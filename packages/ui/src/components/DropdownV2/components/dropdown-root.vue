<script lang="ts">
import {
  type PropType,
  defineComponent,
  provide,
  ref,
  watch,
  toRef,
  onUnmounted,
} from "@vue/composition-api";
import { DropdownContextKey } from "~/components/DropdownV2/keys";
import type { DropdownPosition } from "~/components/DropdownV2/types";
import type { CSSProperties } from "~/types/common";

export default defineComponent({
  props: {
    defaultOpen: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String as PropType<DropdownPosition>,
      default: "bottom",
    },
    distance: {
      type: Number,
      default: 2,
    },
    maxWidth: {
      type: String as PropType<CSSProperties["maxWidth"]>,
    },
    onDropdownClose: {
      type: Function,
    },
  },
  setup(props) {
    const initialValue = ref(props.defaultOpen);
    const isOpened = ref(initialValue);
    const dropdownPosition = toRef(props, "position");
    const triggerElement = ref<HTMLElement | null>(null);

    provide(DropdownContextKey, {
      open: isOpened,
      position: dropdownPosition,
      distance: props.distance,
      maxWidth: props.maxWidth,
      triggerElement: triggerElement,
      onOpenToggle: () => {
        isOpened.value = !isOpened.value;
        if (!isOpened.value) props.onDropdownClose?.();
      },
      onClose: () => {
        isOpened.value = false;
        props.onDropdownClose?.();
      },
    });

    watch(
      () => props.defaultOpen,
      () => {
        initialValue.value = props.defaultOpen;
      }
    );

    onUnmounted(() => {
      isOpened.value = false;
    });
  },
});
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
