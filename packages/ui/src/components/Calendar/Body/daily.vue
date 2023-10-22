<template>
  <div class="date-picker-body daily">
    <!-- 요일 -->
    <div
      v-for="(item, index) in dayOfWeeks"
      :key="index"
      class="date-picker-dow"
    >
      {{ item }}
    </div>
    <!-- 지난 달 날짜들 -->
    <div
      v-for="(day, index) in reverseKeys(firstDayOfWeek)"
      :key="'lastMonth' + index"
      class="date-picker-item disabled"
    >
      <span
        class="date-picker-number"
        style="display: none"
      >
        {{ lastDayOfLastMonth - day }}
      </span>
    </div>
    <!-- 이번달 날짜들 -->
    <div
      v-for="(day, index) in monthLength"
      :key="'currentMonth' + index"
      :class="`date-picker-item
      ${isDisabled(day) ? 'disabled' : ''}`"
      @click="dateClickHandler(day)"
      @mouseover="dateMouseOverHandler(day)"
    >
      <span
        :class="`date-picker-number
        ${getIsToday(day) ? 'today' : ''}
        ${getIsSelected(day) ? 'selected' : ''}
        ${getIsSelectedStart(day) ? 'selected-start' : ''}
        ${getIsSelectedEnd(day) ? 'selected-end' : ''}
        ${getIsSelectedRange(day) ? 'selected-range' : ''}
        ${getIsChoosing(day) ? 'choosing' : ''}
        ${getIsChoosingStart(day) ? 'choosing-start' : ''}
        ${getIsChoosingEnd(day) ? 'choosing-end' : ''}
        ${getIsChoosingRange(day) ? 'choosing-range' : ''}
        `"
      >
        {{ day }}
      </span>
      <div
        :class="`
        ${getIsSelectedStart(day) ? 'selected-start-range' : ''}
        ${getIsSelectedEnd(day) ? 'selected-end-range' : ''}
        ${getIsChoosingStart(day) ? 'choosing-start-range' : ''}
        ${getIsChoosingEnd(day) ? 'choosing-end-range' : ''}
      `"
      ></div>
    </div>
    <!-- 다음달 날짜들 -->
    <div
      v-for="(day, index) in nextMonthLength"
      :key="'nextMonth' + index"
      class="date-picker-item disabled"
    >
      <span
        class="date-picker-number"
        style="display: none"
      >
        {{ day }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import moment from "moment";

export default defineComponent({
  name: "EmdnCalendar",
  props: {
    displayDate: Object,
    selectedRange: Object,
    dateRange: Object,
    mode: String,
    minDate: [Date, Object],
    maxDate: [Date, Object],
    disabledList: Array,
  },
  data() {
    return {
      // 선택중 범위
      choosingRange: {
        start: undefined,
        end: undefined,
      },
      isChoosing: false, // 선택중
      firstDayOfWeek: 0, // 이번달 첫날의 요일
      monthLength: 0, // 이번달 길이
      lastDayOfLastMonth: 0, // 저번달 마지막날짜
      nextMonthLength: 0, // 달력에 표시해야 하는 다음달 길이
      dayOfWeeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  watch: {
    displayDate() {
      this.setCalendar();
    },
  },
  mounted() {
    this.setCalendar();
  },
  methods: {
    /**
     * 날짜에 마우스를 올렸을 때의 동작을 정의합니다.
     * hover 된 date를 choosingRange.end로 설정하여, choosing 및 choosing-end class 를 추가합니다.
     * @param {*} day
     */
    dateMouseOverHandler(day) {
      if (this.isChoosing) {
        this.choosingRange.end = null;
        this.choosingRange.end = this.displayDate
          .clone()
          .set("date", day)
          .endOf("day");
      }
    },
    /**
     * caledar의 내용을 설정한다.
     * displayDate (calendarHeader의 날짜: 연월) 이 변경될 경우 재설정한다.
     */
    setCalendar() {
      this.firstDayOfWeek = this.getFirstDayOfWeek();
      this.monthLength = this.getMonthLength();
      this.nextMonthLength = 42 - (this.firstDayOfWeek + this.monthLength);
      this.lastDayOfLastMonth = this.getLastDayOfLastMonth();
    },
    /**
     * 날짜를 클릭했을 때 동작할 핸들러
     * mode가 single 일 경우와 range일 경우로 구분된다.
     * @param {*} day
     */
    dateClickHandler(day) {
      // singleMode
      if (this.mode === "single") {
        this.$emit("getSelectedRange", {
          start: moment(this.displayDate).set("date", day).startOf("day"),
          end: moment(this.displayDate).set("date", day).endOf("day"),
        });
      }
      // rangeMode
      if (this.mode === "range") {
        if (!this.choosingRange.start) {
          this.choosingRange.start = moment(this.displayDate)
            .set("date", day)
            .startOf("day");
          this.choosingRange.end = moment(this.displayDate)
            .set("date", day)
            .endOf("day");
          this.isChoosing = true;
        } else {
          // start 에 end 보다 높은 날짜가 들어올 경우 바꿔 줌.
          if (this.choosingRange.end < this.choosingRange.start) {
            let startDate = this.choosingRange.start.clone();
            let endDate = this.choosingRange.end.clone();
            this.choosingRange.end = startDate;
            this.choosingRange.start = endDate;
          }

          this.$emit("getSelectedRange", {
            start: this.choosingRange.start.startOf("day"),
            end: this.choosingRange.end.endOf("day"),
          });

          this.choosingRange.start = undefined;
          this.choosingRange.end = undefined;
          this.isChoosing = false;
        }
      }
    },
    /**
     * v-for 작업시에 item 들을 뒤집어준다.
     * 저번달 날짜들을 표시하기 위해 사용.
     * @param {*} number
     */
    reverseKeys(number) {
      return [...Array(number).keys()].slice().reverse();
    },
    /**
     * 현재 보여지는 달의 1일의 요일 (0: 일요일, 6: 토요일)
     * 달력에 몇요일부터 이번달 날짜를 뿌려줄 것인지를 정의하기 위해 사용.
     */
    getFirstDayOfWeek() {
      let firstDay = moment(this.displayDate).format("YYYY-MM-01");
      return moment(firstDay, "YYYY-MM-DD").day();
    },
    /**
     * 현재 보여지는 달의 마지막 날 (이번달의 길이)
     * 이번달 날짜를 몇개를 뿌릴지 정의하기 위해 사용.
     */
    getMonthLength() {
      return Number(moment(this.displayDate).endOf("month").format("DD"));
    },
    /**
     * 저번달의 마지막 날
     * 저번달 날짜를 몇개 뿌러야 되는지는 위의 두 개의 함수로 유추가 가능함.
     * 42 - (이번달 날짜의 수 + 이번달 1일의 요일) => 42는 달력에 표시할 날짜의 수 (6주)
     * 마지막 날짜를 몇부터 표시해야되는지 알기 위해 사용
     */
    getLastDayOfLastMonth() {
      let lastMonth = moment(this.displayDate).subtract(1, "months");
      return Number(moment(lastMonth).endOf("month").format("DD"));
    },
    getMomentValue(date) {
      return Number(moment(date).format("YYYYMMDD"));
    },
    // 넘어온 날짜가 현재날짜 맞는지 확인
    getIsToday(day) {
      let displayDate = this.displayDate.clone().set("date", day);
      return this.getMomentValue(displayDate) === this.getMomentValue();
    },
    /**
     * 넘어온 날짜가 선택된 날짜가 맞는지 확인.
     * displayDate와 selectedRange 를 비교.
     * @param {*} day
     */
    getIsSelected(day) {
      let displayDate = this.displayDate.clone().set("date", day);

      let isStartMatch = false;
      let isEndMatch = false;

      if (this.selectedRange.start && this.selectedRange.end) {
        let startValue = this.getMomentValue(this.selectedRange.start);
        let endValue = this.getMomentValue(this.selectedRange.end);
        let displayValue = this.getMomentValue(displayDate);

        isStartMatch = startValue === displayValue;
        isEndMatch = endValue === displayValue;
      }

      return !this.isChoosing && this.mode === "range"
        ? isStartMatch || isEndMatch
        : isStartMatch;
    },

    /**
     * 넘어온 날짜가 선택된 영역 사이의 날짜인지 확인
     * displayDate와 dateRange를 비교.
     * mode가 range일 경우 dateRange 의 start와 end 사이를 표시하기 위해 사용.
     * @param {*} day
     */
    getIsSelectedRange(day) {
      let displayDate = this.displayDate.clone().set("date", day);

      let isRangeMatch = false;
      if (this.selectedRange.start && this.selectedRange.end) {
        let startValue = this.getMomentValue(this.selectedRange.start);
        let endValue = this.getMomentValue(this.selectedRange.end);
        let displayValue = this.getMomentValue(displayDate);

        isRangeMatch = startValue < displayValue && endValue > displayValue;
      }

      return !this.isChoosing && this.mode === "range" && isRangeMatch;
    },
    getIsSelectedStart(day) {
      let displayDate = this.displayDate.clone().set("date", day);

      let isStartMatch = false;
      let isSameMatch = false;

      if (this.selectedRange.start && this.selectedRange.end) {
        let startValue = this.getMomentValue(this.selectedRange.start);
        let endValue = this.getMomentValue(this.selectedRange.end);
        let displayValue = this.getMomentValue(displayDate);

        isStartMatch = startValue === displayValue;
        isSameMatch = startValue === endValue;
      }

      return (
        !this.isChoosing &&
        isStartMatch &&
        !isSameMatch &&
        this.mode === "range"
      );
    },
    getIsSelectedEnd(day) {
      let displayDate = this.displayDate.clone().set("date", day);

      let isEndMatch = false;
      let isStartMatch = false;

      if (this.selectedRange.start && this.selectedRange.end) {
        let startValue = this.getMomentValue(this.selectedRange.start);
        let endValue = this.getMomentValue(this.selectedRange.end);
        let displayValue = this.getMomentValue(displayDate);

        isEndMatch = endValue === displayValue;
        isStartMatch = startValue === displayValue;
      }

      return (
        !this.isChoosing && isEndMatch && !isStartMatch && this.mode === "range"
      );
    },
    /**
     * 넘어온 날짜가 선택중인 날짜가 맞는지 확인.
     * displayDate와 choosingRange.start를 비교.
     * @param {*} day
     */
    getIsChoosing(day) {
      let displayDate = this.displayDate.clone().set("date", day);

      let isStartMatch = false;
      let isEndMatch = false;

      if (this.choosingRange.start && this.choosingRange.end) {
        let startValue = this.getMomentValue(this.choosingRange.start);
        let endValue = this.getMomentValue(this.choosingRange.end);
        let displayValue = this.getMomentValue(displayDate);

        isStartMatch = startValue === displayValue;
        isEndMatch = endValue === displayValue;
      }

      return this.isChoosing && (isStartMatch || isEndMatch);
    },
    getIsChoosingStart(day) {
      if (this.isChoosing) {
        let displayDate = this.displayDate.clone().set("date", day);

        let isStartMatch = false;
        let isEndMatch = false;
        let isSameMatch = false;

        if (this.choosingRange.start && this.choosingRange.end) {
          let startValue = this.getMomentValue(this.choosingRange.start);
          let endValue = this.getMomentValue(this.choosingRange.end);
          let displayValue = this.getMomentValue(displayDate);

          isStartMatch = displayValue === startValue;
          isEndMatch = displayValue === endValue;
          isSameMatch = startValue === endValue;
        }

        let condition =
          this.choosingRange.start > this.choosingRange.end
            ? isEndMatch
            : isStartMatch;

        return this.isChoosing && condition && !isSameMatch;
      }
    },
    getIsChoosingEnd(day) {
      if (this.isChoosing) {
        let displayDate = this.displayDate.clone().set("date", day);

        let isStartMatch = false;
        let isEndMatch = false;
        let isSameMatch = false;

        if (this.choosingRange.start && this.choosingRange.end) {
          let startValue = this.getMomentValue(this.choosingRange.start);
          let endValue = this.getMomentValue(this.choosingRange.end);
          let displayValue = this.getMomentValue(displayDate);

          isStartMatch = displayValue === startValue;
          isEndMatch = displayValue === endValue;
          isSameMatch = startValue === endValue;
        }

        let condition =
          this.choosingRange.start > this.choosingRange.end
            ? isStartMatch
            : isEndMatch;

        return this.isChoosing && condition && !isSameMatch;
      }
    },

    getIsChoosingRange(day) {
      let displayDate = this.displayDate.clone().set("date", day);

      let isRangeMatch = false;
      let isReverseRangeMatch = false;

      if (this.choosingRange.start && this.choosingRange.end) {
        let startValue = this.getMomentValue(this.choosingRange.start);
        let endValue = this.getMomentValue(this.choosingRange.end);
        let displayValue = this.getMomentValue(displayDate);

        isRangeMatch = startValue < displayValue && endValue > displayValue;

        isReverseRangeMatch =
          endValue < displayValue && startValue > displayValue;
      }

      let isModeRange = this.mode === "range";
      return isModeRange && (isRangeMatch || isReverseRangeMatch);
    },
    /**
     * diabled 처리
     * minDate 보다 낮거나, maxDate 보다 크거나, disabledList에 포함된 항목일 경우 disabled
     * @param {*} day
     */
    isDisabled(day) {
      let displayDate = this.displayDate.clone().set("date", day);
      let result = this.disabledList.filter((disabled) => {
        return (
          this.getMomentValue(displayDate) === this.getMomentValue(disabled)
        );
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
