<template>
  <div class="date-picker-body quarterly">
    <div
      v-for="(quarter, index) in 4"
      :key="index + quarterlyCalendarKey"
      class="date-picker-item"
      @click="quarterClickHandler(quarter)"
    >
      <span
        :class="`date-picker-number
        ${getIsToday(quarter) ? 'today' : ''}
        ${getIsSelected(quarter) ? 'selected' : ''}
        ${getIsDisabled(quarter) ? 'disabled' : ''}`"
      >
        {{ quarter }} Quarter
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
    };
  },
  methods: {
    getIsToday(quarter) {
      let displayDate = this.displayDate.clone().set("quarter", quarter);

      return moment().format("YYYYQ") === displayDate.format("YYYYQ");
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
