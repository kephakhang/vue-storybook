<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { TooltipFloatingVue } from "~/index";

export default defineComponent({
  components: { TooltipFloatingVue },
  props: {
    content: {
      type: [String, Number],
      required: true,
    },
  },
  setup() {
    const isTooltipOpened = ref(false);
    /**
     * If don't want to show the tooltip,
     * send trigger list with empty string -> [""]
     */
    const tooltipTriggerList = ref<["hover", "focus"] | [""]>();

    const setTooltip = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.clientWidth < target.scrollWidth) {
        isTooltipOpened.value = true;
        tooltipTriggerList.value = ["hover", "focus"];
      } else {
        isTooltipOpened.value = false;
        tooltipTriggerList.value = [""];
      }
    };

    return {
      isTooltipOpened,
      tooltipTriggerList,
      setTooltip,
    };
  },
});
</script>

<template>
  <TooltipFloatingVue
    theme="dark"
    :triggers="tooltipTriggerList"
    :shown="isTooltipOpened"
  >
    <template #tooltip-target>
      <div
        :class="$style['truncate-text']"
        @mouseover="setTooltip"
        @mouseleave="isTooltipOpened = false"
      >
        {{ content }}
      </div>
    </template>
    <template #tooltip-content>
      <span>{{ content }}</span>
    </template>
  </TooltipFloatingVue>
</template>

<style lang="scss" module>
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>
