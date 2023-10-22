<!--
  Summary. 
   Onboarding isolated component. 
  
  Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
  @alias    onboarding
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 
 
  @return {component}.
-->

<!--
      spotlight class is used to highlight the specific area/component.
      It's purpose is to add style at run time when onboarding component display
      This is spotlight class
        .spotlight{
            background: white;
            position: relative;
            z-index: 1000000;
        }
       Developer implement this component must add spotlight class to particular component to highlight it..
       I have used it in onboarding.story.js, anyone can follow that
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import CtaButton from "~/components/Button/cta-button.vue";

export default defineComponent({
  name: "OnBoarding",
  components: {
    /** CTA button used inside onboarding component */
    CtaButton: CtaButton,
  },
  props: {
    /** set styles of component */
    styleProps: [String, Object] as PropType<StyleValue>,

    /** Set heading text */
    head: String,

    /** set body data message */
    body: String,

    /** set range to more than one onboarding */
    range: {
      type: Number,
      default: 1,
    },

    /** step is starting and range defines how many times display component */
    step: {
      type: Number,
      default: 1,
    },
    /** set multi steps  */
    multipleSteps: Boolean,

    /** set click handler */
    clickHandler: Function as PropType<() => void>,

    /** set close handler to close component */
    handleClose: Function as PropType<() => void>,

    /** set active to show and hide component */
    active: Boolean,
  },
  methods: {
    /**
     * apply handler method that trigger callback function clickHandler
     * if step is equal to the range then trigger callback function close
     */
    applyHandlerMethod() {
      this.$nextTick(() => {
        this.clickHandler?.();
      });
      if (this.step == this.range) {
        this.close();
      }
    },
    /** close that will trigger callback closeHandler */
    close() {
      this.handleClose?.();
    },
  },
});
</script>

<!-- template -->
<template>
  <div
    v-if="active"
    :class="$style['tooltipMain']"
  >
    <div :class="$style['tooltip']">
      <span
        v-if="multipleSteps"
        :style="styleProps"
        :class="[
          step <= 1 ? $style['stepOne'] : '',
          step == 2 ? $style['stepTwo'] : '',
          step == 3 ? $style['stepThree'] : '',
          step == 4 ? $style['stepFour'] : '',
          step > 4 ? $style['stepOne'] : '',
        ]"
      >
        <div :class="$style['main']">
          <div :class="$style['customTitle']">
            <div :class="$style['head']">{{ head }}</div>
            <div
              :class="$style['crossImage']"
              @click="close"
            >
              <img
                :class="$style['crossIcon']"
                src="#"
                alt="icon"
              />
            </div>
          </div>
          <div :class="$style['body']">
            <!-- slot used for body -->
            <slot name="body"></slot>
          </div>
          <div
            v-if="range >= 2 && range >= step && step >= 1"
            :class="$style['footer']"
          >
            <div :class="$style['step']">Step {{ step }} of {{ range }}</div>
            <div :class="$style['button']">
              <CtaButton
                style-props="background: #ffffff"
                variant="text"
                color-type="blue"
                class="btn-custom btn-custom-primary animationPrimary"
                :click-handler="applyHandlerMethod"
              >
                <span v-if="step != range">Next</span>
                <span v-else>Done</span>
              </CtaButton>
            </div>
          </div>
        </div>
      </span>
      <span
        v-if="multipleSteps == false"
        :class="$style['stepOne']"
        :style="styleProps"
      >
        <div :class="$style['main']">
          <div :class="$style['customTitle']">
            <div :class="$style['head']">{{ head }}</div>
            <div
              :class="$style['crossImage']"
              @click="close"
            >
              <img
                :class="$style['crossIcon']"
                src="#"
                alt="icon"
              />
            </div>
          </div>
          <div :class="$style['body']">
            <!-- slot for body -->
            <slot name="body"></slot>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<!-- styles -->
<style scoped lang="scss" module>
@import "./onboarding.module";
</style>
