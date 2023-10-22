<!--
Summary.
Timepicker input isolated component chunk of calender for time picker.

Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.

@since      0.3.22-dev-1
@access     module

@alias    TimePicker
@memberof emoldino

@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states


@return {component}.
-->
<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { SelectedTime } from "../../types/TimePicker";
const TOTAL_HOURS = 24;

export default defineComponent({
  name: "TimePicker",
  props: {
    /**
     * Function to handle time change
     */

    changeTime: Function as PropType<
      (selectedTime: SelectedTime, type: string) => void
    >,
    /**
     * ID of the time picker component
     */
    id: {
      type: String,
      default: "",
    },
    /**
     * Minimum selectable time
     */
    minTime: {
      type: String,
      default: "00",
    },
    /**
     * Maximum selectable time
     */
    maxTime: {
      type: String,
      default: "24",
    },
    /**
     * Selected time object
     */
    selectedTime: {
      type: Object as () => SelectedTime,
      default: () => ({
        hour: 0,
        minute: 0,
        isAddDay: false,
      }),
    },
    /**
     * Flag indicating if the time picker is disabled
     */
    disabled: Boolean,
    /**
     * Flag indicating if minute selection is enabled
     */
    enableMinute: {
      type: Boolean,
      default: false,
    },
    /**
     * Flag indicating if the time picker is used for range selection
     */
    isRange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      dayStart: "",
    };
  },
  computed: {
    /**
     * Get the title of the selected time
     */
    getTitle() {
      const hour = this.selectedTime?.hour?.toString().padStart(2, "0");
      const minute = this.selectedTime?.minute?.toString().padStart(2, "0");
      return `${hour}:${minute}`;
    },
    /**
     * Get the time range object
     */
    getTimeRange() {
      return {
        min: this.extractTime(this.minTime),
        max: this.extractTime(this.maxTime),
      };
    },
    /**
     * Get the range of selectable hours
     */
    getHourRange() {
      const minHour = parseInt(this.getTimeRange.min.hour);
      const maxHour = parseInt(this.getTimeRange.max.hour);
      const timeDifference = maxHour - minHour;
      const hourRange =
        minHour > maxHour ? TOTAL_HOURS + timeDifference : timeDifference;
      return minHour === maxHour ? TOTAL_HOURS : hourRange;
    },
    getMinuteRange() {
      return this.enableMinute && !this.isRange ? 60 : 1;
    },
  },
  watch: {
    visible(newVal: boolean) {
      if (newVal) {
        window.addEventListener("click", this.handleClickOutside);
      } else {
        window.removeEventListener("click", this.handleClickOutside);
      }
    },

    disabled() {
      if (this.disabled) {
        this.visible = false;
      }
    },
  },
  mounted() {
    window.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    /**
     * Extract hour and minute from a time string
     * @param time - The time string
     * @returns Object containing hour and minute
     */
    extractTime(time: string) {
      return {
        hour: time.slice(0, 2),
        minute: time.slice(2, 4),
      };
    },
    /**
     * Check if a day needs to be added based on the hour index and type
     * @param index - The hour index
     * @param type - The type of time (hour/minute)
     * @returns rue if a day needs to be added, false otherwise
     */
    addDay(index: number, type: string) {
      const { hour: minHour } = this.getTimeRange.min;
      const result = this.getTimeTitle(index, type);
      return parseInt(result) < parseInt(minHour);
    },
    /**
     * Handle click outside the time picker component
     * @param event - The click event
     */
    handleClickOutside(event: Event) {
      const el = this.$refs.timePicker as HTMLElement;
      if (!el?.contains(event.target as Node)) {
        this.visible = false;
      }
    },

    /**
     * Check if an hour is selected
     * @param index - The hour index
     * @returns True if the hour is selected, false otherwise
     */
    checkSelectedHour(index: number) {
      const { hour, isAddDay } = this.selectedTime;
      const { min } = this.getTimeRange;
      return isAddDay
        ? index === +hour + 1 - +min.hour + 24
        : index === +hour + 1 - +min.hour;
    },
    /**
     * Get the time title based on the index and type
     * @param index - The index of the time
     * @param type - The type of time (hour/minute)
     * @returns The formatted time title
     */
    getTimeTitle(index: number, type: string) {
      const { min } = this.getTimeRange;
      if (type === "hour") {
        const hour = (parseInt(min.hour) + index) % 24;
        return hour.toString().padStart(2, "0");
      }

      return (index - 1).toString().padStart(2, "0");
    },
    /**
     * Check if a minute is enabled for selection
     * @param index - The minute index
     * @returns True if the minute is enabled, false otherwise
     */
    checkEnableMinute(index: number) {
      const { max } = this.getTimeRange;
      const { isAddDay, hour: selectedHour } = this.selectedTime;
      return !(
        isAddDay &&
        selectedHour === parseInt(max.hour) &&
        index > parseInt(max.minute)
      );
    },
    /**
     * Handle the change of selected time
     * @param time - The selected time value
     * @param type - The type of time (hour/minute)
     */
    handleChangeTime(time: number, type: string) {
      if (type === "hour") {
        const { min } = this.getTimeRange;
        this.selectedTime.hour = time + parseInt(min.hour);
        this.selectedTime.isAddDay = this.selectedTime.hour >= 24;
        this.selectedTime.hour = (time + parseInt(min.hour)) % 24;
      } else {
        this.selectedTime.minute = time;
      }

      if (this.changeTime) this.changeTime(this.selectedTime, type);
    },
  },
});
</script>

<template>
  <div
    :id="id"
    :class="$style.dropdown_container"
  >
    <a
      href="javascript:void(0)"
      :class="[
        $style.time_dropdown,
        $style.time_dropdown_btn,
        disabled ? $style.time_dropdown_disabled : '',
      ]"
      :active="visible"
      :style="{ pointerEvents: disabled ? 'none' : 'auto' }"
      @click.stop="visible = true"
    >
      <span :class="$style.span_height">{{ getTitle }}</span>
      <span
        v-show="selectedTime.isAddDay"
        :class="$style.bonus_time"
      >
        {{ "+1" }}
      </span>
    </a>
    <div
      v-show="visible"
      :class="[visible ? $style.show : '', $style.dropdown_menu]"
    >
      <div>
        <div :class="$style.hour_dropdown_col">
          <ul :class="$style.hour_dropdown">
            <li
              v-for="index in getHourRange"
              :key="index"
              :class="[checkSelectedHour(index) ? $style.selected_item : '']"
            >
              <span
                :class="$style.dropdown_item"
                @click="handleChangeTime(index - 1, 'hour')"
              >
                {{ getTimeTitle(index - 1, "hour") }}
                <span
                  v-show="isRange && addDay(index - 1, 'hour')"
                  :class="$style.day_plus"
                >
                  {{ "+1" }}
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div :class="$style.hour_dropdown_col">
          <ul :class="$style.hour_dropdown">
            <li
              v-for="index in getMinuteRange"
              :key="index"
              :class="[
                index === +selectedTime.minute + 1 ? $style.selected_item : '',
              ]"
            >
              <span
                :class="[
                  !checkEnableMinute(index - 1) ? $style.disable_item : '',
                  $style.dropdown_item,
                ]"
                @click="handleChangeTime(index - 1, 'minute')"
              >
                {{ getTimeTitle(index, "minute") }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" module>
@import "./timepicker.module";
</style>
