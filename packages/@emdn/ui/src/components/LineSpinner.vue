<script setup lang="ts">
import { twMerge } from "tailwind-merge";
</script>
<template>
  <div
    :class="
      twMerge(
        'h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black/60',
        $attrs.class as any
      )
    "
  ></div>
</template>
