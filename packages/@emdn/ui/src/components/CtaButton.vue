<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: "fill" | "outline" | "text";
}
defineProps<Props>();
const slots = defineSlots<{
  leading?: () => void;
  default?: () => void;
  trailing?: () => void;
}>();
const { leading, trailing } = slots;
</script>
<template>
  <button
    :class="
      twMerge(
        [
          'cursor-pointer rounded px-2 py-1.5',
          !variant || variant === 'fill'
            ? 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-700 disabled:bg-gray-400'
            : null,
          variant === 'outline'
            ? 'border border-blue-500 bg-white text-blue-500 hover:border-transparent hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-blue-200  active:ring-blue-500'
            : null,
          variant === 'text'
            ? 'text-blue-500 hover:underline focus:outline-none focus:ring focus:ring-blue-200'
            : null,
        ],
        $attrs.class as any
      )
    "
    v-bind="$attrs"
  >
    <div :class="[leading ? 'mr-1.5' : null, 'inline']">
      <slot name="leading"></slot>
    </div>
    <slot></slot>
    <div :class="[trailing ? 'ml-1.5' : null, 'inline']">
      <slot name="trailing"></slot>
    </div>
  </button>
</template>
