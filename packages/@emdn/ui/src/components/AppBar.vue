<script setup lang="ts">
import { computed, toValue } from "vue";

defineSlots<{
  default(): unknown;
  actions(): unknown;
}>();

const props = defineProps<{
  logo: string;
  type?: string | null;
}>();

const color = computed(() => {
  const type = toValue(() => props.type);
  if (type === "OEM") return "bg-blue-500";
  if (type === "SUPPLIER") return "bg-brown-500";
  if (type === "TOOLMAKER") return "bg-purple-500";
  return null;
});
</script>
<template>
  <div
    class="flex h-[var(--app-bar-height,3.75rem)] w-full shrink-0 items-center bg-brand-900 px-5"
  >
    <div class="flex w-full min-w-[88px] max-w-[246px]">
      <div class="flex shrink-0">
        <img
          :src="logo"
          alt="company logo"
        />
        <div class="w-2"></div>
        <div
          v-if="!!color"
          :class="color"
          class="flex h-4 items-center py-2 pl-1 pr-2 text-xs text-white [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)]"
        >
          {{ type }}
        </div>
      </div>
      <div class="grow"></div>
    </div>
    <div class="min-w-[1rem]"></div>
    <div class="flex h-full shrink-0 grow items-end">
      <div class="flex gap-2">
        <slot></slot>
      </div>
    </div>
    <div class="grow"></div>
    <div class="flex h-full items-center gap-4">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
