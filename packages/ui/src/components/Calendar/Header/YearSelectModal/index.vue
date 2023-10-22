<template>
  <!--  Inner Year Select Modal  -->
  <transition name="fade-transition">
    <div
      v-if="isModal"
      ref="calendarModalRef"
      :class="$style['inner-modal-container']"
    >
      <!-- header calendar modal previous button -->
      <!-- TODO: disabled 아이콘만 있음. icon button component로 교체 필요. -->
      <!-- TODO: disabled 기능 추가하기 (minDate 보다 낮을 경우) -->
      <div>
        <span
          :class="[
            $style['modal-arrow-icon'],
            $style['-left'],
            $style[getIsPrevBtnDisabled() ? 'disabled' : ''],
          ]"
          @click="prevBtnHandler"
        ></span>
      </div>
      <!-- 연도 리스트 -->
      <div :class="$style['btn-group']">
        <div
          v-for="year in yearList"
          :key="year"
          :class="[
            $style[getIsSelected(year) ? 'selected' : ''],
            $style[getIsDisabled(year) ? 'disabled' : ''],
          ]"
          @click="yearClickHandler(year)"
        >
          {{ year }}
        </div>
      </div>
      <!-- header calendar modal next button -->
      <!-- TODO: disabled 아이콘만 있음. icon button component로 교체 필요. -->
      <!-- TODO: disabled 기능 추가하기 (maxDate 보다 클 경우) -->
      <div>
        <span
          :class="[
            $style['modal-arrow-icon'],
            $style['-right'],
            $style[getIsNextBtnDisabled() ? 'disabled' : ''],
          ]"
          @click="nextBtnHandler"
        ></span>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import moment from "moment";

export default defineComponent({
  name: "HeaderCalendarYearSelectModal",
  props: {
    isModal: Boolean,
    displayDate: Object,
    selectedRange: Object,
    maxDate: Object,
    minDate: Object,
    disabledList: Array,
  },
  data() {
    return {
      choosingDate: null,
    };
  },
  computed: {
    yearList() {
      console.log("yearList");
      let currentDisplayYear = Number(this.choosingDate.format("YYYY"));
      let yearList = [];
      for (let i = 0; i < 9; i++) {
        yearList.unshift(currentDisplayYear - i);
      }
      return yearList;
    },
  },
  mounted() {
    this.choosingDate = this.displayDate.clone();
  },
  methods: {
    getIsPrevBtnDisabled() {
      console.log("yearList: ", this.yearList[0]);
      let date = moment().set("year", this.yearList[0]);
      return this.minDate >= date;
    },
    getIsNextBtnDisabled() {
      console.log("yearList: ", this.yearList[this.yearList.length - 1]);
      let date = moment().set("year", this.yearList[this.yearList.length - 1]);
      return this.maxDate <= date;
    },
    getIsSelected(year) {
      return year === Number(this.displayDate.format("YYYY"));
    },
    getIsDisabled(year) {
      let minDateCondition = this.minDate
        ? year <= Number(this.minDate.format("YYYY"))
        : false;
      let maxDateCondition = this.maxDate
        ? year >= Number(this.maxDate.format("YYYY"))
        : false;
      let result = this.disabledList.filter((disabled) => {
        return Number(disabled.format("YYYY")) === year;
      });
      return minDateCondition || maxDateCondition || result.length;
    },
    yearClickHandler(year) {
      let displayDate = this.displayDate.clone().set("year", year);
      this.$emit("getDisplayDate", displayDate);
      this.$emit("getIsModal", false);
    },
    prevBtnHandler() {
      this.cloneDate = this.choosingDate.clone().subtract("years", 9);
      this.choosingDate = null;
      this.choosingDate = this.cloneDate;
    },
    nextBtnHandler() {
      this.cloneDate = this.choosingDate.clone().add("years", 9);
      this.choosingDate = null;
      this.choosingDate = this.cloneDate;
    },
  },
});
</script>

<style lang="scss" module>
@import "./index.module.scss";
</style>

<style scoped>
.fade-transition-enter-active {
  animation: fade-in-out 0.2s ease-in-out;
}
.fade-transition-leave-active {
  animation: fade-in-out 0.2s ease-in-out reverse;
}
@keyframes fade-in-out {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
