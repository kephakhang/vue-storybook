<template>
  <div class="date-picker-input-container">
    <div class="input-box">
      <label>From</label>
      <input
        placeholder="yyyy-mm-dd"
        readonly
        :value="selectedRange.start.format('YYYY-MM-DD')"
        type="text"
      />
    </div>
    <div class="input-box">
      <label>To</label>
      <input
        placeholder="yyyy-mm-dd"
        readonly
        :value="selectedRange.end.format('YYYY-MM-DD')"
        type="text"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "DatePickerInput",
  props: {
    selectedRange: Object,
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>
