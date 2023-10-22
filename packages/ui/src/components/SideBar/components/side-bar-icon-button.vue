<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
export default defineComponent({
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    iconUrl: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function as PropType<() => void>,
    },
  },
});
</script>
<template>
  <button
    id="sidebar-button"
    @click="onClick"
  >
    <div
      :style="{
        display: 'grid',
        placeItems: 'center',
        padding: '0.25rem 0',
      }"
    >
      <img
        :style="{
          width: '2.5rem',
          height: '2.5rem',
          padding: '0.375rem',
        }"
        :src="iconUrl"
        alt="sidebar icon"
      />
      <slot></slot>
    </div>
  </button>
</template>

<style scoped>
.selected {
  background-color: rgba(255, 255, 255, 0.1);
}

#sidebar-button {
  width: 100%;
  color: white;
  font-size: 10px;
  border-bottom: 1px solid transparent;
}

#sidebar-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid #3491ff;
}
</style>
