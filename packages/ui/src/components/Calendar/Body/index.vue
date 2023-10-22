<template>
  <div>
    <Daily
      v-if="timeScale === 'DATE' || timeScale === 'CUSTOM' || !timeScale"
      key="DATE"
      :mode="timeScale === 'CUSTOM' ? 'range' : 'single'"
      :selected-range="selectedRange"
      :display-date="displayDate"
      :max-date="maxDate"
      :min-date="minDate"
      :disabled-list="disabledList"
      @getDisplayDate="getDisplayDate"
      @getSelectedRange="getSelectedRange"
    />
    <Monthly
      v-if="timeScale === 'MONTH'"
      :selected-range="selectedRange"
      :display-date="displayDate"
      :max-date="maxDate"
      :min-date="minDate"
      :disabled-list="disabledList"
      @getDisplayDate="getDisplayDate"
      @getSelectedRange="getSelectedRange"
    />
    <Weekly
      v-if="timeScale === 'WEEK'"
      :selected-range="selectedRange"
      :display-date="displayDate"
      :max-date="maxDate"
      :min-date="minDate"
      :disabled-list="disabledList"
      @getDisplayDate="getDisplayDate"
      @getSelectedRange="getSelectedRange"
    />
    <Quarterly
      v-if="timeScale === 'QUARTER'"
      :selected-range="selectedRange"
      :display-date="displayDate"
      :max-date="maxDate"
      :min-date="minDate"
      :disabled-list="disabledList"
      @getDisplayDate="getDisplayDate"
      @getSelectedRange="getSelectedRange"
    />
    <yearly
      v-if="timeScale === 'YEAR'"
      :selected-range="selectedRange"
      :display-date="displayDate"
      :max-date="maxDate"
      :min-date="minDate"
      :disabled-list="disabledList"
      @getDisplayDate="getDisplayDate"
      @getSelectedRange="getSelectedRange"
    />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Daily from "~/components/Calendar/Body/daily.vue";
import Weekly from "~/components/Calendar/Body/weekly.vue";
import Monthly from "~/components/Calendar/Body/monthly.vue";
// import Quarterly from "~/components/Calendar/Body/quarterly.vue";
import Quarterly from "~/components/Calendar/Body/quarterly-new.vue";
import Yearly from "~/components/Calendar/Body/yearly.vue";

export default defineComponent({
  name: "CalendarBody",
  components: {
    Daily,
    Weekly,
    Monthly,
    Quarterly,
    Yearly,
  },
  props: {
    timeScale: String,
    displayDate: Object,
    selectedRange: Object,
    dateRange: Object,
    mode: String,
    minDate: [Date, Object],
    maxDate: [Date, Object],
    disabledList: Array,
  },
  methods: {
    getSelectedRange(dateRange) {
      this.$emit("getSelectedRange", dateRange);
    },
    getDisplayDate(displayDate) {
      this.$emit("getDisplayDate", displayDate);
    },
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>
