<!--
  Summary.
   ProgressBar isolated component.

  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

  @since      0.3.22-dev-1
  @access     module

  @alias    ProgressBar
  @memberof emoldino

  @see  Function/class relied on https://www.figma.com/file/J7P8GFHiJ4zwL0gFsAkN8z/Platform-2.0-layout--?node-id=19%3A17795&t=KZ0AzhqeDVU0ma5y-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story

-->

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  type PropType,
  ref,
  watchEffect,
} from "@vue/composition-api";
import type { CSSProperties, StyleValue } from "~/types/common";
import type { RGBType, RegExpExecArray } from "~/types/ProgressBar";

const WHITE_COLOR = "#ffffff";
const GRAY_COLOR = "#4b4b4b";

export default defineComponent({
  props: {
    /**
     * value to fill progressbar
     */
    value: {
      type: Number,
      required: true,
    },
    /**
     * The progress percentage<br>
     * = (`value` * 100) / `bufferValue`
     */
    bufferValue: {
      type: Number,
      default: 100,
    },
    /**
     * background color for progress-bar
     */
    bgColor: {
      type: String as PropType<CSSProperties["background-color"]>,
      default: "green",
    },
    /**
     * If `borderColor` is not defined,
     * the border color is the same with `bgColor.`
     */
    borderColor: String as PropType<CSSProperties["border-color"]>,
    styleProps: [String, Object] as PropType<StyleValue>,
  },
  setup(props) {
    const textRef = ref<HTMLElement | null>(null);
    const progressValueRef = ref<HTMLElement | null>(null);
    const progressValueWidth = ref<number>(0);

    const computedStyle = computed(() => {
      return `width:${progressValueWidth.value}%; background:${
        props.bgColor
      }; border-color:${props.borderColor ?? props.bgColor};`;
    });

    const calculateRelativeLuminance = ({ r, g, b }: RGBType) => {
      const RsRGB = r / 255;
      const GsRGB = g / 255;
      const BsRGB = b / 255;

      const R =
        RsRGB <= 0.03928
          ? RsRGB / 12.92
          : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      const G =
        GsRGB <= 0.03928
          ? GsRGB / 12.92
          : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      const B =
        BsRGB <= 0.03928
          ? BsRGB / 12.92
          : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };

    const getRGBValues = (color: string) => {
      let rgbValues = {} as RGBType;

      if (color.startsWith("#")) {
        rgbValues.r = parseInt(color.substring(1, 3), 16);
        rgbValues.g = parseInt(color.substring(3, 5), 16);
        rgbValues.b = parseInt(color.substring(5, 7), 16);
      } else if (color.startsWith("rgb")) {
        const regexResult = /(\d+),\s*(\d+),\s*(\d+)/.exec(
          color
        ) as RegExpExecArray;
        rgbValues.r = parseInt(regexResult[1], 10);
        rgbValues.g = parseInt(regexResult[2], 10);
        rgbValues.b = parseInt(regexResult[3], 10);
      } else {
        rgbValues.r = 255;
        rgbValues.g = 255;
        rgbValues.b = 255;
      }

      return rgbValues;
    };

    const updateFontColor = () => {
      if (!progressValueRef.value || !textRef.value) return;

      const bgColor = window
        .getComputedStyle(progressValueRef.value)
        .getPropertyValue("background-color");
      const rgbValues = getRGBValues(bgColor);
      const luminance = calculateRelativeLuminance(rgbValues);
      textRef.value.style.color = luminance > 0.5 ? GRAY_COLOR : WHITE_COLOR;
    };

    onMounted(() => {
      watchEffect(() => {
        const percentage = (props.value * 100) / props.bufferValue;
        progressValueWidth.value = percentage > 100 ? 100 : percentage;

        if (progressValueWidth.value >= 48) {
          updateFontColor();
        } else {
          if (textRef.value) textRef.value.style.color = GRAY_COLOR;
        }
      });
    });

    return {
      textRef,
      progressValueRef,
      computedStyle,
    };
  },
});
</script>

<template>
  <div
    :class="$style.container"
    :style="styleProps"
  >
    <div :class="$style.progressbar">
      <div
        ref="progressValueRef"
        :class="$style.progressbar_value"
        :style="computedStyle"
      ></div>
    </div>
    <div
      ref="textRef"
      :class="$style.progress_text"
    >
      <slot name="value"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "./progressbar.module";
</style>
