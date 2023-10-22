<template>
  <div>
    <div :id="id">
      <div
        ref="targetRef"
        :class="$style['target-container']"
        @mouseenter.stop.prevent="showTooltip = true"
        @mouseleave.stop.prevent="showTooltip = false"
      >
        <!-- @slot The element that the tooltip will be attached to -->
        <slot name="target"></slot>
      </div>
    </div>
    <div
      v-if="showTooltip"
      ref="tooltipRef"
      :class="[
        $style['tooltip-container'],
        $style[position],
        $style[colorType],
      ]"
      :style="tooltipPositionStyles"
    >
      <!-- @slot The content of the tooltip -->
      <slot name="tooltip"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "tooltip-id",
    },
    position: {
      type: String as PropType<
        | "top"
        | "bottom"
        | "left"
        | "left-top"
        | "left-bottom"
        | "right"
        | "right-top"
        | "right-bottom"
      >,
      default: "top",
    },
    colorType: {
      type: String as PropType<"black" | "white">,
      default: "black",
    },
  },
  data() {
    return {
      showTooltip: false,
      tooltipPositionStyles: {},
    };
  },
  watch: {
    showTooltip() {
      if (this.showTooltip) {
        this.calculateTooltipPosition();
      }
    },
  },
  methods: {
    calculateTooltipPosition() {
      this.$nextTick(() => {
        const target = this.$refs.targetRef as HTMLElement;
        const tooltip = this.$refs.tooltipRef as HTMLElement;

        if (!target || !tooltip) {
          return;
        }

        const targetRect = target.getBoundingClientRect() as DOMRect;
        const tooltipRect = tooltip.getBoundingClientRect() as DOMRect;

        let coordinateX;
        let coordinateY;

        switch (this.position) {
          case "top":
            coordinateX =
              targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
            coordinateY = targetRect.top - tooltipRect.height - 12;
            break;
          case "bottom":
            coordinateX =
              targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
            coordinateY = targetRect.top + targetRect.height + 12;
            break;
          case "left":
            coordinateX = targetRect.left - tooltipRect.width - 16;
            coordinateY =
              targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
            break;
          case "left-top":
            coordinateX = targetRect.left - targetRect.width - 20;
            coordinateY = targetRect.top - tooltipRect.height - 12;
            break;
          case "left-bottom":
            coordinateX = targetRect.left - targetRect.width - 20;
            coordinateY = targetRect.top + targetRect.height + 12;
            break;
          case "right":
            coordinateX = targetRect.left + targetRect.width + 16;
            coordinateY =
              targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
            break;
          case "right-top":
            coordinateX = targetRect.left + targetRect.width - 20;
            coordinateY = targetRect.top - tooltipRect.height - 12;
            break;
          case "right-bottom":
            coordinateX = targetRect.left + targetRect.width - 20;
            coordinateY = targetRect.top + targetRect.height + 12;
            break;
          default:
            break;
        }

        this.tooltipPositionStyles = {
          left: `${coordinateX}px`,
          top: `${coordinateY}px`,
        };
      });
    },
  },
});
</script>

<style lang="scss" module>
@import "./tooltip.module";
</style>
