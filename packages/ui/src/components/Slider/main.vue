<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import ImageViewer from "~/components/Slider/imageViewer.vue";
import Slider from "~/components/Slider/slider.vue";

export default defineComponent({
  name: "Main",
  components: {
    ImageViewer,
    Slider,
  },
  props: {
    /**
     * set the image components src
     */
    src: {
      type: String,
      default: "",
    },
    /**
     * contain the list of slides
     */
    allSlides: {
      type: Array,
    },
    /**
     * to show and hide an image viewing component
     */
    showImageViewer: {
      type: Boolean,
    },
    /**
     * to show and hide a slider component
     */
    showSlider: {
      type: Boolean,
    },
    /**
     * to set the number of slides in a slider component
     */
    numberOfSlides: {
      type: Number,
      default: 4,
    },
    /**
     * to set styles in image viewing component {e.g {width: 100px; height 100px}}
     */
    styleProps: {
      styleProps: [String, Object] as PropType<StyleValue>,
      default: "width: 331px; height: 230px",
    },
  },

  data() {
    return {
      selectedImage: "",
    };
  },
  computed: {},

  methods: {
    handleImage(value: string) {
      this.selectedImage = value;
    },
  },
});
</script>

<template>
  <div>
    <ImageViewer
      v-if="showImageViewer"
      :preview="true"
      :style-data="styleProps"
      :src="src ? src : selectedImage"
    ></ImageViewer>
    <Slider
      v-if="showSlider"
      :style="{ width: showImageViewer ? '' : '331px' }"
      :number-of-slides="numberOfSlides"
      :preview="false"
      :slides="allSlides"
      :selected-image="handleImage"
    ></Slider>
  </div>
</template>
