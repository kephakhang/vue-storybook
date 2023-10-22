<script setup lang="ts">
const colors = {
  brand: [
    "bg-brand-900",
    "bg-brand-800",
    "bg-brand-700",
    "bg-brand-600",
    "bg-brand-500",
    "bg-brand-400",
    "bg-brand-300",
    "bg-brand-200",
    "bg-brand-100",
    "bg-brand-50",
  ],
  slate: [
    "bg-slate-900",
    "bg-slate-800",
    "bg-slate-700",
    "bg-slate-600",
    "bg-slate-500",
    "bg-slate-400",
    "bg-slate-300",
    "bg-slate-200",
    "bg-slate-100",
    "bg-slate-50",
  ],
  stone: [
    "bg-stone-900",
    "bg-stone-800",
    "bg-stone-700",
    "bg-stone-600",
    "bg-stone-500",
    "bg-stone-400",
    "bg-stone-300",
    "bg-stone-200",
    "bg-stone-100",
    "bg-stone-50",
  ],
  gray: [
    "bg-gray-900",
    "bg-gray-800",
    "bg-gray-700",
    "bg-gray-600",
    "bg-gray-500",
    "bg-gray-400",
    "bg-gray-300",
    "bg-gray-200",
    "bg-gray-100",
    "bg-gray-50",
  ],
  sky: [
    "bg-sky-900",
    "bg-sky-800",
    "bg-sky-700",
    "bg-sky-600",
    "bg-sky-500",
    "bg-sky-400",
    "bg-sky-300",
    "bg-sky-200",
    "bg-sky-100",
    "bg-sky-50",
  ],
  blue: [
    "bg-blue-900",
    "bg-blue-800",
    "bg-blue-700",
    "bg-blue-600",
    "bg-blue-500",
    "bg-blue-400",
    "bg-blue-300",
    "bg-blue-200",
    "bg-blue-100",
    "bg-blue-50",
  ],
  green: [
    "bg-green-900",
    "bg-green-800",
    "bg-green-700",
    "bg-green-600",
    "bg-green-500",
    "bg-green-400",
    "bg-green-300",
    "bg-green-200",
    "bg-green-100",
    "bg-green-50",
  ],
  yellow: [
    "bg-yellow-900",
    "bg-yellow-800",
    "bg-yellow-700",
    "bg-yellow-600",
    "bg-yellow-500",
    "bg-yellow-400",
    "bg-yellow-300",
    "bg-yellow-200",
    "bg-yellow-100",
    "bg-yellow-50",
  ],
  red: [
    "bg-red-900",
    "bg-red-800",
    "bg-red-700",
    "bg-red-600",
    "bg-red-500",
    "bg-red-400",
    "bg-red-300",
    "bg-red-200",
    "bg-red-100",
    "bg-red-50",
  ],
  purple: [
    "bg-purple-900",
    "bg-purple-800",
    "bg-purple-700",
    "bg-purple-600",
    "bg-purple-500",
    "bg-purple-400",
    "bg-purple-300",
    "bg-purple-200",
    "bg-purple-100",
    "bg-purple-50",
  ],
  brown: [
    "bg-brown-900",
    "bg-brown-800",
    "bg-brown-700",
    "bg-brown-600",
    "bg-brown-500",
    "bg-brown-400",
    "bg-brown-300",
    "bg-brown-200",
    "bg-brown-100",
    "bg-brown-50",
  ],
} as const;

function typedKeys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
</script>
<template>
  <div class="flex flex-col">
    <div
      v-for="colorName in typedKeys(colors)"
      :key="colorName"
      class="flex items-center"
    >
      <p class="w-16">{{ colorName }}</p>
      <div
        v-for="color in colors[colorName]"
        :key="color"
        class="h-12 w-24 p-1 text-xs"
        :class="color"
      >
        {{ color }}
      </div>
    </div>
  </div>
</template>
