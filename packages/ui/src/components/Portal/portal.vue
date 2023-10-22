<script lang="ts">
import { defineComponent, watch } from "@vue/composition-api";
import { MountingPortal } from "portal-vue";

export default defineComponent({
  components: {
    MountingPortal,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    getPortalId: (_: string) => true,
  },
  setup(props) {
    const targetId = `portal-${crypto.randomUUID()}`;

    const createTargetEl = () => {
      const targetEl = document.createElement("aside");

      targetEl.id = targetId;
      document.body.appendChild(targetEl);
    };

    const removeTargetEl = () => {
      const targetEl = document.getElementById(targetId);

      if (targetEl) document.body.removeChild(targetEl);
    };

    watch(
      () => props.open,
      () => {
        if (props.open) {
          createTargetEl();
        } else {
          removeTargetEl();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      targetId,
    };
  },
});
</script>

<template>
  <div v-if="open">
    <MountingPortal
      :mount-to="`#${targetId}`"
      append
    >
      <slot></slot>
    </MountingPortal>
  </div>
</template>
