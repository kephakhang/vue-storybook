<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";

export default defineComponent({
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    handleClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
      required: true,
    },
  },
});
</script>
<template>
  <button
    :style="{
      boxSizing: 'border-box',
      display: 'grid',
      placeItems: 'center',
      background: selected ? 'rgba(255, 255, 255, 0.2)' : 'none',
      borderBottom: selected ? '0.25rem solid #3491FF' : 'none',
      paddingTop: '0.5rem',
      paddingBottom: selected ? '0.5rem' : '0.625rem',
      width: '9.5rem',
      color: 'white',
      fontWeight: selected ? 'bold' : 'normal',
      fontSize: '0.875rem',
    }"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
