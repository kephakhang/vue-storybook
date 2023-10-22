<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";

export default defineComponent({
  props: {
    onClick: {
      required: true,
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
});
</script>
<template>
  <button
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '0.25rem',
      padding: 0,
      height: '1.5rem',
      width: '1.5rem',
      cursor: 'pointer',
      backgroundColor: '#D8E2F8',
    }"
    @click="onClick"
  >
    <img
      :src="imageUrl"
      alt="appbar icon"
      :style="{
        width: '1rem',
        height: '1rem',
      }"
    />
  </button>
</template>
