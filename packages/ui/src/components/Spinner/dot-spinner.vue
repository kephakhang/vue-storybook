<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 16,
    },
    width: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      angle: 45,
      timeout: undefined as ReturnType<typeof setTimeout> | undefined,
    };
  },
  mounted() {
    this.timeout = setInterval(() => {
      this.angle = (this.angle + 45) % 360;
    }, 150);
  },
  unmounted() {
    clearTimeout(this.timeout);
  },
});
</script>

<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `rotate(${angle}deg)`,
    }"
  >
    <img
      :height="height + 'px'"
      :width="width + 'px'"
      src="~assets/images/icon/dropdown-spinner.svg"
      alt="spinner"
    />
  </div>
</template>
