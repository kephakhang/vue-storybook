<!--
 Summary. 
 Image viewer body isolated component contains the scroll feature next/previous. 
  
 Description.
 This component is a common component, so if you modify it, it can affect everywhere you use this component.
 Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
 @since      0.3.22-dev-1
 @access     module
 
 @alias    ImageViewer
 @member of emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 
 
 @return {component}.
-->
<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ImageViewer",
  props: {
    src: {
      type: String,
      default: "",
    },
    styleData: {
      type: String,
      default: "",
    },
    preview: Boolean,
  },
});
</script>

<template>
  <div :style="styleData">
    <div
      tabindex="0"
      :class="preview ? $style.main_image : $style.slider_image"
      :style="{ 'background-image': `url(${src})` }"
    >
      <span
        v-if="!src"
        :class="$style.placeholder"
      >
        <div :class="$style.imagesSpacing">
          <img
            src="~assets/images/common-component/images-placeholder.svg"
            alt=""
          />
        </div>
      </span>
    </div>
  </div>
</template>

<style lang="scss" module>
@import "./imagesViewer.module";
</style>
