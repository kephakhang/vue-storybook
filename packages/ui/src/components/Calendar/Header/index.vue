<template>
  <div
    :class="$style['calender-header-container']"
    :style="styleProps"
  >
    <!-- previous button -->
    <span
      :class="[$style['arrow-icon'], $style['-left']]"
      :disabled="prevBtn.disabled"
      @click="prevBtnHandler"
    ></span>
    <!-- display date -->
    <div
      ref="calendarModalOpenBtn"
      :class="$style['display-date']"
      @click="toggleModal"
    >
      <slot></slot>
    </div>
    <!-- next button -->
    <span
      :class="[$style['arrow-icon'], $style['-right']]"
      :disabled="nextBtn.disabled"
      @click="nextBtnHandler"
    ></span>
    <yearSelectModal
      :is-modal="isModal"
      :next-btn="nextBtn"
      :prev-btn="prevBtn"
      :max-date="maxDate"
      :min-date="minDate"
      :disabled-list="disabledList"
      :display-date="displayDate"
      :selected-range="selectedRange"
      @getDisplayDate="getDisplayDate"
      @getIsModal="getIsModal"
    ></yearSelectModal>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import yearSelectModal from "./YearSelectModal/index.vue";

export default defineComponent({
  components: {
    yearSelectModal,
  },
  props: {
    styleProps: String,
    timeScale: String,
    nextBtn: {
      type: Object,
      default: () => {
        return {
          disabled: false,
          handler() {
            console.log("nextButton handler");
          },
        };
      },
    },
    prevBtn: {
      type: Object,
      default: () => {
        return {
          disabled: false,
          handler() {
            console.log("previousButton handler");
          },
        };
      },
    },
    maxDate: Object,
    minDate: Object,
    disabledList: Array,
    displayDate: Object,
    selectedRange: Object,
  },
  data() {
    return {
      isModal: false,
    };
  },
  methods: {
    toggleModal() {
      if (this.timeScale !== "YEAR") this.isModal = !this.isModal;
    },
    prevBtnHandler() {
      this.prevBtn.handler();
      this.isModal = false;
    },
    nextBtnHandler() {
      this.nextBtn.handler();
      this.isModal = false;
    },
    getDisplayDate(displayDate) {
      this.$emit("getDisplayDate", displayDate);
    },
    getIsModal(isModal) {
      this.isModal = isModal;
    },
  },
});
</script>

<style lang="scss" module>
@import "./index.module.scss";
</style>
