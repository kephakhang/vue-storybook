<!--
Summary. 
Slider body isolated component contains the scroll feature next/previous. 
  
Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
@since      0.3.22-dev-1
@access     module
 
@alias    Slider
@memberof emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states


@return {component}.
-->

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ImageViewer from "~/components/Slider/imageViewer.vue";

const NEXT_SLIDE = "slide_next";
const PREV_SLIDE = "slide_prev";

export default defineComponent({
  name: "Slider",
  components: {
    ImageViewer,
  },
  props: {
    slides: Array,
    SelectedImage: Function,
    preview: Boolean,
    numberOfSlides: Number,
  },
  data() {
    return {
      current: 0,
      direction: 1,
      transitionName: "fade",
      show: false,
      chunkSize: this.numberOfSlides as number,
      data: this.slides as Array<unknown>,
    };
  },
  watch: {
    slides(value) {
      let chunks: Array<unknown> = [];
      for (let i = 0; i < value.length; i += this.chunkSize) {
        const chunk = value.slice(i, i + this.chunkSize);
        chunks = [...chunks, chunk];
      }
      this.data = chunks;
    },
  },
  beforeMount() {
    this.handleChunk();
  },

  mounted() {
    this.show = true;
  },
  methods: {
    slide(dir: number) {
      this.direction = dir;
      dir === 1
        ? (this.transitionName = NEXT_SLIDE)
        : (this.transitionName = PREV_SLIDE);
      const len = this.data.length;
      this.current = (this.current + (dir % len) + len) % len;
    },

    handleChunk() {
      let chunks: Array<unknown> = [];
      for (let i = 0; i < this.data.length; i += this.chunkSize) {
        const chunk = this.data.slice(i, i + this.chunkSize);
        chunks = [...chunks, chunk];
      }
      this.data = chunks;
    },
  },
});
</script>

<template>
  <div>
    <div :id="$style.slider">
      <transition-group
        tag="div"
        :name="transitionName"
        :class="$style.slides_group"
        :enter-class="$style[`${transitionName}_enter`]"
        :enter-active-class="$style[`${transitionName}_enter_active`]"
        :leave-active-class="$style[`${transitionName}_leave_active`]"
        :leave-to-class="$style[`${transitionName}_leave_to`]"
      >
        <div
          v-if="show"
          :key="current"
          :class="$style.slide"
        >
          <div
            v-for="(slideData, index) in data[current]"
            id="slide1"
            :key="index"
            :class="$style.slider_body"
          >
            <div @click="() => SelectedImage(slideData)">
              <ImageViewer
                :preview="preview"
                :class="$style.slider_content"
                :src="slideData"
              ></ImageViewer>
            </div>
          </div>
        </div>
      </transition-group>
      <div
        :class="[$style.btn, $style.btn_prev]"
        aria-label="Previous slide"
        @click="slide(-1)"
      >
        <div :class="$style.button_left"></div>
      </div>
      <div
        :class="[$style.btn, $style.btn_next]"
        aria-label="Next slide"
        @click="slide(1)"
      >
        <div :class="$style.button_right"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "./slider.module";
</style>
