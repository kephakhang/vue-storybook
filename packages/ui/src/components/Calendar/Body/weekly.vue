<template>
  <div class="date-picker-body weekly">
    <div
      v-for="(week, index) in numberOfWeek"
      :key="index + weekCalendarKey"
      :class="`date-picker-item
      ${getIsDisabled(week) ? 'disabled' : ''}`"
      @click="weekClickHandler(week)"
    >
      <span
        :class="`date-picker-number
        ${getIsToday(week) ? 'today' : ''}
        ${getIsSelected(week) ? 'selected' : ''}`"
      >
        {{ week }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import moment from "moment";

export default defineComponent({
  props: {
    selectedRange: Object,
    displayDate: Object,
    minDate: [Object, Date],
    maxDate: [Object, Date],
    disabledList: Array,
  },
  data() {
    return {
      weekCalendarKey: 0,
      numberOfWeek: 0,
    };
  },
  watch: {
    displayDate() {
      this.getNumberOfWeek();
    },
  },
  mounted() {
    this.getNumberOfWeek();
  },
  methods: {
    weekClickHandler(week) {
      let displayDate = this.displayDate.clone().set("isoWeek", week);

      this.$emit("getSelectedRange", {
        start: displayDate.clone().startOf("isoWeek"),
        end: displayDate.clone().endOf("isoWeek"),
      });

      this.$emit("getDisplayDate", displayDate.clone().startOf("isoWeek"));
    },
    getIsSelected(week) {
      let displayDate = this.displayDate.clone().set("isoWeek", week);
      let middleValue =
        (this.selectedRange.start.unix() + this.selectedRange.end.unix()) / 2;

      let isMiddleDateMatched =
        moment.unix(middleValue).format("YYYYWW") ===
        moment(displayDate).format("YYYYWW");

      return isMiddleDateMatched;
    },
    getIsDisabled(week) {
      let displayDate = this.displayDate.clone().set("isoWeek", week);

      let minDateCondition = this.minDate ? displayDate < this.minDate : false;
      let maxDateCondition = this.maxDate ? displayDate > this.maxDate : false;

      let result = this.disabledList.filter((disabled) => {
        return disabled.format("YYYYWW") === displayDate.format("YYYYWW");
      });

      return maxDateCondition || minDateCondition || result.length;
    },
    getIsToday(week) {
      let displayDate = this.displayDate.clone().set("isoWeek", week);
      return moment().format("YYYYWW") === displayDate.format("YYYYWW");
    },
    /**
     * 현재 년도에 몇주까지 있는지 구하기
     */
    getNumberOfWeek() {
      if (this.displayDate.clone().endOf("year").isoWeeks() === 1) {
        this.numberOfWeek = Number(
          this.displayDate
            .clone()
            .endOf("year")
            .subtract(6, "days")
            .format("WW")
        );
      } else {
        this.numberOfWeek = Number(
          this.displayDate.clone().endOf("year").format("WW")
        );
      }
    },
  },
});
</script>
