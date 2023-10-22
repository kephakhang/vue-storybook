<template>
  <div
    :class="[$style['calendar-container']]"
    :style="styleProps"
  >
    <!-- TODO: showSelector 를 기준으로 calender-single 이 되는게 맞을까? -->
    <div
      :class="[
        $style['calendar-single'],
        $style[!showSelector ? 'box-shadow' : ''],
      ]"
    >
      <CalendarHeader
        :time-scale="timeScale"
        :next-btn="nextBtn"
        :prev-btn="prevBtn"
        :max-date="maxDate"
        :min-date="minDate"
        :disabled-list="disabledList"
        :display-date="displayDate"
        :selected-range="selectedRange"
        @getDisplayDate="getDisplayDate"
      >
        <!-- DATE || CUSTOM -->
        <div
          v-if="timeScale === 'DATE' || timeScale === 'CUSTOM' || !timeScale"
        >
          <span style="margin-right: 5px">
            {{ displayDate.format("MMMM") }}
          </span>
          <span style="color: #3491ff">{{ displayDate.format("YYYY") }}</span>
        </div>
        <!-- WEEK || MONTH || QUATER -->
        <span
          v-if="
            timeScale === 'WEEK' ||
            timeScale === 'MONTH' ||
            timeScale === 'QUARTER'
          "
          style="color: #3491ff"
        >
          {{ displayDate.format("YYYY") }}
        </span>
        <!-- YEAR -->
        <span v-if="timeScale === 'YEAR'">
          {{ Number(displayDate.format("YYYY")) }} -
          {{ Number(displayDate.format("YYYY")) + 11 }}
        </span>
      </CalendarHeader>
      <CalendarBody
        :time-scale="timeScale"
        :selected-range="selectedRange"
        :display-date="displayDate"
        :max-date="maxDate"
        :min-date="minDate"
        :disabled-list="disabledList"
        @getDisplayDate="getDisplayDate"
        @getSelectedRange="getSelectedRange"
      ></CalendarBody>
      <CalendarInput
        v-if="showSelector"
        :selected-range="selectedRange"
      />
    </div>
    <Selector
      v-if="showSelector"
      :selector-options="selectorOptions"
      :time-scale="timeScale"
      @getTimeScale="getTimeScale"
    />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

import CalendarHeader from "~/components/Calendar/Header/index.vue";
import CalendarBody from "~/components/Calendar/Body/index.vue";
import CalendarInput from "~/components/Calendar/Input/index.vue";
import Selector from "~/components/Calendar/Selector/index.vue";
import moment from "moment";

export default defineComponent({
  name: "EmdnCalendar",
  components: {
    CalendarHeader,
    CalendarBody,
    CalendarInput,
    Selector,
  },
  props: {
    styleProps: String,
    maxDate: Object,
    minDate: Object,
    timeScale: String,
    showSelector: {
      type: Boolean,
      default: false,
    },
    selectorOptions: {
      type: Array,
      default: () => ["DATE", "WEEK", "MONTH", "QUARTER", "YEAR", "CUSTOM"],
    },
    dateRange: {
      type: Object,
      default: () => {
        return { start: moment(new Date()), end: moment(new Date()) };
      },
    },
    disabledList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      displayDate: moment(),
      selectedRange: { start: moment(), end: moment() },
      prevBtn: {
        disabled: false,
        handler: function () {
          console.log("prevBtn hanlder is not defined.");
        },
      },
      nextBtn: {
        disabled: false,
        handler: function () {
          console.log("nextBtn hanlder is not defined.");
        },
      },
    };
  },
  watch: {
    timeScale() {
      switch (this.timeScale) {
        case "WEEK":
          this.setSelectedRangeByUnitOfTimeFromToday("isoWeek");
          break;
        case "MONTH":
          this.setSelectedRangeByUnitOfTimeFromToday("month");
          break;
        case "QUARTER":
          this.setSelectedRangeByUnitOfTimeFromToday("quarter");
          break;
        case "YEAR":
          this.setSelectedRangeByUnitOfTimeFromToday("year");
          break;
        default:
          this.setSelectedRangeByUnitOfTimeFromToday("day");
      }
    },
  },
  mounted() {
    // calendaer header 의 날짜를 dateRange의 start를 기준으로 한다 (변경될 수 있음)
    this.displayDate = this.dateRange.start.clone();

    this.selectedRange.start = this.dateRange.start.clone();
    this.selectedRange.end = this.dateRange.end.clone();

    this.nextBtn.handler = this.nextBtnHandler;
    this.prevBtn.handler = this.prevBtnHandler;
  },
  methods: {
    prevBtnHandler() {
      if (
        this.timeScale === "DATE" ||
        this.timeScale === "CUSTOM" ||
        !this.timeScale
      ) {
        this.displayDate = moment(this.displayDate).subtract(1, "months");
      }
      if (
        this.timeScale === "WEEK" ||
        this.timeScale === "MONTH" ||
        this.timeScale === "QUARTER"
      ) {
        this.displayDate = this.displayDate.clone().subtract(1, "years");
      }
      if (this.timeScale === "YEAR") {
        this.displayDate = this.displayDate.clone().subtract(12, "years");
      }
    },
    nextBtnHandler() {
      if (
        this.timeScale === "DATE" ||
        this.timeScale === "CUSTOM" ||
        !this.timeScale
      ) {
        this.displayDate = moment(this.displayDate).add(1, "months");
      }
      if (
        this.timeScale === "WEEK" ||
        this.timeScale === "MONTH" ||
        this.timeScale === "QUARTER"
      ) {
        this.displayDate = this.displayDate.clone().add(1, "years");
      }
      if (this.timeScale === "YEAR") {
        this.displayDate = this.displayDate.clone().add(12, "years");
      }
    },
    getDisplayDate(displayDate) {
      this.displayDate = displayDate;
    },
    getSelectedRange(dateRange) {
      this.selectedRange = dateRange;
      this.$emit("get-date-range", dateRange);
    },
    getTimeScale(timeScale) {
      this.$emit("get-time-scale", timeScale);
    },
    // Selector가 있을 경우 timeScale을 변경할 때마다 현재 날짜를 기준으로 timeScale에 맞추어 날짜를 초기화
    setSelectedRangeByUnitOfTimeFromToday(unitOfTime) {
      const today = moment();
      const startDate = today.clone().startOf(unitOfTime);
      const endDate = today.clone().endOf(unitOfTime);

      this.displayDate = today;
      this.selectedRange.start = startDate;
      this.selectedRange.end = endDate;
      this.getSelectedRange({
        start: startDate,
        end: endDate,
      });
    },
  },
});
</script>

<style lang="scss" module>
@import "index.module";
</style>

<style>
* {
  box-sizing: border-box;
}
</style>
