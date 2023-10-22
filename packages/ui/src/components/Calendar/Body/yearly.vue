<template>
  <div class="date-picker-body yearly">
    <div
      v-for="index in 12"
      :key="index"
      :class="[
        'date-picker-item',
        getIsDisabled(diplayDateValue + index - 1) ? 'disabled' : '',
      ]"
      @click="yearClickHandler(diplayDateValue + index - 1)"
    >
      <span
        :class="[
          'date-picker-number',
          getIsToday(diplayDateValue + index - 1) ? 'today' : '',
          getIsSelected(diplayDateValue + index - 1) ? 'selected' : '',
          getIsDisabled(diplayDateValue + index - 1) ? 'disabled' : '',
        ]"
      >
        {{ diplayDateValue + index - 1 }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import moment from "moment";

export default defineComponent({
  props: {
    minDate: [Object, Date],
    maxDate: [Object, Date],
    displayDate: Object,
    selectedRange: Object,
    disabledList: Array,
  },
  computed: {
    diplayDateValue() {
      return Number(this.displayDate.format("YYYY"));
    },
  },
  methods: {
    yearClickHandler(year) {
      let displayDate = this.displayDate.clone().set("year", year);
      this.$emit("getSelectedRange", {
        start: displayDate.clone().startOf("year"),
        end: displayDate.clone().endOf("year"),
      });
    },
    getIsToday(year) {
      let displayDate = this.displayDate.clone().set("year", year);
      return displayDate.format("YYYY") === moment().format("YYYY");
    },
    getIsSelected(year) {
      let displayDate = this.displayDate.clone().set("year", year);
      return (
        displayDate.format("YYYY") ===
        moment(this.selectedRange.start).format("YYYY")
      );
    },
    getIsDisabled(year) {
      let displayDate = this.displayDate.clone().set("year", year);
      let result = this.disabledList.filter((disabled) => {
        return disabled.format("YYYY") === displayDate.format("YYYY");
      });
      return (
        displayDate > this.maxDate ||
        displayDate < this.minDate ||
        result.length
      );
    },
  },
});
</script>
