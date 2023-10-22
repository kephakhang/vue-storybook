<template>
  <div class="date-picker-body monthly">
    <div
      v-for="(month, index) in 12"
      :key="index + monthlyCalendarKey"
      :class="['date-picker-item', getIsDisabledMonth(month) ? 'disabled' : '']"
      @click="monthClickHandler(month)"
    >
      <span
        :class="[
          'date-picker-number',
          getIsToday(month) ? 'today' : '',
          getIsSelected(month) ? 'selected' : '',
          getIsDisabledMonth(month) ? 'disabled' : '',
        ]"
      >
        {{ displayMonthName(month) }}
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
      monthlyCalendarKey: 0,
    };
  },
  watch: {
    displayDate() {
      this.monthlyCalendarKey += 1;
    },
  },

  methods: {
    getIsToday(month) {
      let displayDate = this.displayDate.clone().set("month", month - 1);
      return moment().format("YYYYMM") === displayDate.format("YYYYMM");
    },
    getIsSelected(month) {
      let displayDate = this.displayDate.clone().set("month", month - 1);
      return (
        displayDate.format("YYYYMM") ===
        this.selectedRange.start.format("YYYYMM")
      );
    },
    getIsDisabledMonth(month) {
      let displayDate = this.displayDate.clone().set("month", month - 1);
      let result = this.disabledList.filter((disabled) => {
        return disabled.format("YYYYMM") === displayDate.format("YYYYMM");
      });
      return (
        displayDate > this.maxDate ||
        displayDate < this.minDate ||
        result.length
      );
    },
    displayMonthName(month) {
      return moment(month, "MM").format("MMM");
    },
    monthClickHandler(month) {
      let displayDate = this.displayDate.set("month", month - 1);
      this.$emit("getSelectedRange", {
        start: displayDate.clone().startOf("month"),
        end: displayDate.clone().endOf("month"),
      });
      this.monthlyCalendarKey += 1;
    },
  },
});
</script>
