<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

export default defineComponent({
  props: {
    height: {
      type: String,
      default: "20px",
    },
    width: {
      type: String,
      default: "20px",
    },
    text: String,
    textStyle: [String, Object] as PropType<StyleValue>,
  },
});
</script>

<template>
  <div :class="$style.loading">
    <div
      :style="{ width, height }"
      :class="$style.spinner"
    ></div>
    <div
      v-if="text"
      :style="
        textStyle ?? {
          marginTop: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'rgba(0, 0, 0, 0.6)',
        }
      "
    >
      {{ text }}
    </div>
  </div>
</template>

<style module>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border-top-color: rgba(0, 0, 0, 0.6);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
