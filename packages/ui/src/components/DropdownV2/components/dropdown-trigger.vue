<script lang="ts">
import { defineComponent, inject, ref, watch } from "@vue/composition-api";
import { DropdownContextKey } from "~/components/DropdownV2/keys";

export default defineComponent({
  setup() {
    const { triggerElement, onOpenToggle } = inject(DropdownContextKey)!;
    const triggerRef = ref<HTMLElement | null>(null);
    const uuid = `trigger-${crypto.randomUUID()}`;

    watch(
      triggerRef,
      () => {
        triggerElement.value = triggerRef.value;
      },
      {
        flush: "sync",
      }
    );

    return { triggerRef, uuid, onOpenToggle };
  },
});
</script>

<template>
  <div
    :id="uuid"
    ref="triggerRef"
    @click.capture="onOpenToggle"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" module>
.trigger-container {
  width: fit-content;
  height: fit-content;
}
</style>
