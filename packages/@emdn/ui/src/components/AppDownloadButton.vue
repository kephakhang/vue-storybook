<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useElementHover } from "@vueuse/core";
import { type ButtonHTMLAttributes, ref } from "vue";

interface Props extends /** @vue-ignore */ ButtonHTMLAttributes {}

defineProps<Props>();

const button = ref<HTMLElement>();
const isHovered = useElementHover(button);
</script>
<template>
  <button ref="button">
    <Icon
      :icon="
        isHovered
          ? 'emdn:mobile-download-link-hover'
          : 'emdn:mobile-download-link'
      "
      class="h-8 w-full"
    />
  </button>
</template>
