<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

export default defineComponent({
  props: {
    showBadge: {
      type: Boolean,
      default: true,
    },
    text: String,
    styleProps: [String, Object] as PropType<StyleValue>,
  },
  methods: {
    isNumber(value: unknown) {
      return !isNaN(Number(value));
    },
  },
});
</script>
<template>
  <div style="position: relative">
    <div
      v-if="showBadge"
      :style="{
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.75rem',
        position: 'absolute',
        minWidth: '0.75rem',
        height: '0.75rem',
        top: '-0.375rem',
        right: '-0.375rem',
        backgroundColor: '#BD0060',
        color: 'white',
        fontSize: '0.5rem',
        padding: text && !isNumber(text) ? '0 0.125rem' : 0,
      }"
    >
      {{ text }}
    </div>
    <slot></slot>
  </div>
</template>
