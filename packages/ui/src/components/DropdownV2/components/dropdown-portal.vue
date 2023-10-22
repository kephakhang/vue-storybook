<script lang="ts">
import { defineComponent, inject } from "@vue/composition-api";
import Portal from "~/components/Portal/portal.vue";
import { DropdownContextKey } from "~/components/DropdownV2/keys";

export default defineComponent({
  components: { Portal },
  setup() {
    const { open } = inject(DropdownContextKey)!;

    return {
      open,
    };
  },
});
</script>

<template>
  <Portal :open="open">
    <div class="portal-container">
      <slot></slot>
    </div>
  </Portal>
</template>

<style lang="scss" scoped>
.portal-container {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 99998;
}
</style>
