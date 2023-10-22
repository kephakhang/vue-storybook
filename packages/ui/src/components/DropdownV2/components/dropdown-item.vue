<script lang="ts">
import { defineComponent, inject, type PropType } from "@vue/composition-api";
import { DropdownContextKey } from "~/components/DropdownV2/keys";

export default defineComponent({
  components: {},
  props: {
    onClick: {
      type: Function as PropType<() => void>,
    },
    text: {
      type: String,
      default: "",
    },
  },
  emits: {
    click: (_?: unknown) => true,
  },
  setup(props, { emit }) {
    const { onClose } = inject(DropdownContextKey)!;

    const clickItem = (e: MouseEvent) => {
      emit("click", e);
      onClose?.();
    };

    return { clickItem };
  },
});
</script>

<template>
  <div
    class="item-container"
    @click="clickItem"
  >
    <div class="truncate-text">
      {{ text }}
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.item-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.469rem 0.375rem;
  cursor: pointer;
  gap: 0.625rem;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  color: #4b4b4b;

  &:hover {
    background: #e6f7ff;
  }

  .truncate-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
}
</style>
