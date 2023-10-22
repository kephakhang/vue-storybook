<!--
 * Summary. 
 *  Modal isolated component. 
 * 
 * Description.
 *  This component is a common component, so if you modify it, it can affect everywhere you use this component.
 *  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 *
 * @since      0.3.22-dev-1
 * @access     module
 *
 * @alias    Modal
 * @memberof emoldino
 *
 * @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
 * @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 *
 *
 * @return {component}.
-->

<!-- template -->
<template>
  <transition name="bg">
    <div
      v-if="isOpened"
      class="emdn-modal-wrapper"
    >
      <div
        class="modal-background"
        :class="modalPositionComputed"
        @click="handleModal"
      >
        <transition :name="modalTransitionComputed">
          <div
            v-if="isOpened"
            :class="modalClassComputed"
            :style="styleProps"
            @click.stop
          >
            <section>
              <div class="modal-header-line"></div>
              <div class="modal-header-contents">
                <div class="modal-header-contents-left">
                  <h1>{{ headingText }}</h1>
                  <slot name="switch-tab"></slot>
                </div>
                <button
                  type="button"
                  @click="handleModal"
                >
                  <img src="~assets/images/common-component/close.svg" />
                </button>
              </div>
              <div
                v-if="subHeadingText"
                class="modal-sub-header"
              >
                <h2>{{ subHeadingText }}</h2>
              </div>
            </section>
            <section class="modal-body-area">
              <div>
                <slot name="body"></slot>
              </div>
            </section>
            <section class="modal-footer-area">
              <slot name="footer"></slot>
            </section>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// extentions
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

type ModalType = "slide-in" | "popup";

// @vue/component
export default defineComponent({
  props: {
    /** set Modal container style properties like width, hight etc} */
    styleProps: [String, Object] as PropType<StyleValue>,

    /** set the type of modal component */
    modalType: {
      type: String as PropType<ModalType>,
      default: "popup",
    },

    /** set modal header like title */
    headingText: {
      type: String,
      default: "Header",
    },

    /** set modal sub heading */
    subHeadingText: String,

    /** set modal click handler */
    modalHandler: Function,

    /** set modal isOpened */
    isOpened: Boolean,
  },
  data() {
    return {
      hide: !this.isOpened,
    };
  },

  computed: {
    /** set position of Modal */
    modalPositionComputed() {
      return this.modalType === "slide-in" ? "right" : "center";
    },

    /** compute subheadings */
    modalSubHeaderComputed() {
      return this.subHeadingText ?? "";
    },

    /** computing base modal class  */
    modalClassComputed() {
      let base = `modal-default ${this.modalSubHeaderComputed} `;
      if (this.modalType === "slide-in") base += this.modalType;
      return base;
    },

    /** set transition of modal */
    modalTransitionComputed() {
      return this.modalType === "slide-in" ? "slide-fade" : "fade";
    },
  },
  /**
   * set document body height and overflow style
   * will be mounted when component is added to the DOM
   */
  mounted() {
    document.body.style.cssText = `height: 100vh; overflow: hidden;`;
  },
  /**
   * remove document body styles
   * will be unmounted when component is removed from DOM
   */
  unmounted() {
    document.body.style.cssText = ``;
  },
  methods: {
    /** set handle modal to open and close the modal */
    handleModal() {
      this.hide = !this.hide;
      this.modalHandler?.();
    },
  },
});
</script>

<!-- styles -->
<style lang="scss" scoped>
@import "./modal.module.scss";
</style>
