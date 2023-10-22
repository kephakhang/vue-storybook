<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    click: (_?: MouseEvent) => true,
  },
});
</script>

<template>
  <button
    :class="$style.parent"
    @click.prevent="() => $emit('click')"
  >
    <div
      :class="$style.child"
      :style="{
        backgroundColor: selected ? '#DAEEFF' : undefined,
      }"
    >
      <slot name="icon"></slot>
    </div>
    <div style="height: 4px"></div>
    <slot></slot>
  </button>
</template>

<style scoped module>
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  flex-direction: column;
  width: 100%;
  height: 60px;
  background-color: white;
  font-size: 12px;
  cursor: pointer;
}

.child {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.parent:focus {
  outline: 0;
}

.parent:hover {
  text-decoration: underline;
}

.parent:hover > .child {
  background-color: #007aff4d;
}
</style>
