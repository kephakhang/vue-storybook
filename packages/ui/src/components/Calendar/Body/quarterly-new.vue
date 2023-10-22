<template>
  <div class="date-picker-body quarterly-new">
    <div
      v-for="(quarter, index) in quarterLabelArr"
      :key="index + quarterlyCalendarKey"
      :class="[
        'quarter-row',
        getIsSelected(index + 1) ? 'selected' : '',
        getIsDisabled(index + 1) ? 'disabled' : '',
      ]"
      @click="quarterClickHandler(index + 1)"
    >
      <span>
        <b>{{ quarter.header }}</b>
      </span>
      <span
        v-for="(month, index) in quarter.months"
        :class="[
          getIsToday(month) ? 'today' : '',
          getIsDisabled(index + 1) ? 'disabled' : '',
        ]"
      >
        {{ displayMonth(month) }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import moment from "moment";

export default defineComponent({
  name: "QuarterlyCalendar",
  props: {
    selectedRange: Object,
    displayDate: Object,
    minDate: [Object, Date],
    maxDate: [Object, Date],
    disabledList: Array,
  },
  data() {
    return {
      quarterlyCalendarKey: 0,
      // quarterLabelArr: [
      //   { header: "Q1", months: ["Jan", "Feb", "Mar"] },
      //   { header: "Q2", months: ["Apr", "May", "Jun"] },
      //   { header: "Q3", months: ["Jul", "Aug", "Sep"] },
      //   { header: "Q4", months: ["Oct", "Nov", "Dec"] },
      // ],
      quarterLabelArr: [
        { header: "Q1", months: [1, 2, 3] },
        { header: "Q2", months: [4, 5, 6] },
        { header: "Q3", months: [7, 8, 9] },
        { header: "Q4", months: [10, 11, 12] },
      ],
    };
  },

  methods: {
    displayMonth(month) {
      let date = this.displayDate.clone().set("month", month - 1);
      return moment(date).format("MMM");
    },
    getIsToday(month) {
      let displayDate = this.displayDate.clone().set("month", month - 1);
      return moment().format("YYYYMMM") === displayDate.format("YYYYMMM");
    },
    getIsSelected(quarter) {
      let displayDate = this.displayDate.clone().set("quarter", quarter);

      return (
        displayDate.format("YYYYQ") === this.selectedRange.start.format("YYYYQ")
      );
    },
    getIsDisabled(quarter) {
      let displayDate = this.displayDate.clone().set("quarter", quarter);

      let result = this.disabledList.filter((disabled) => {
        return disabled.format("YYYYQ") === displayDate.format("YYYYQ");
      });

      return (
        displayDate > this.maxDate ||
        displayDate < this.minDate ||
        result.length
      );
    },
    quarterClickHandler(quarter) {
      let displayDate = this.displayDate.set("quarter", quarter);

      this.$emit("getSelectedRange", {
        start: displayDate.clone().startOf("quarter"),
        end: displayDate.clone().endOf("quarter"),
      });

      this.$emit("getDislayDate", displayDate);
      this.quarterlyCalendarKey += 1;
    },
  },
});
</script>

<style></style>
