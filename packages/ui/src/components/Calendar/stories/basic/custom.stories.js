import Calendar from "~/components/Calendar/index.vue";
import moment from "moment";

export default {
  title: "Components/Calendar/Basic",
  component: Calendar,
  argTypes: {
    timeScale: {
      options: ["DATE", "WEEK", "MONTH", "YEAR", "CUSTOM"],
      control: { type: "radio" },
    },
    maxDate: {
      control: false,
    },
    minDate: {
      control: false,
    },
    dateRange: {
      control: false,
    },
  },
};

export const BasicCalendar = {
  render: (args, { argTypes }) => ({
    components: { calendar: Calendar },
    props: { ...Object.keys(argTypes) },
    data() {
      return {
        args,
        timeScale: "CUSTOM",
        dateRange: { start: moment(), end: moment() },
      };
    },
    methods: {
      getDateRange(dateRange) {
        this.dateRange = dateRange;
      },
    },
    template: `
    <div>
      <calendar v-bind="args" @getDateRange="getDateRange"></calendar>
      ${description}
    </div>`,
  }),
  args: {
    maxDate: moment(new Date()),
    minDate: moment("20160101", "YYYYMMDD"),
    timeScale: "DATE",
    dateRange: { start: moment(), end: moment() },
  },
};

let description = String.raw`
<div class="story-description-box">
  <div><b>dateRange</b>: {{ dateRange }}</div>
  <div>
    <p>emoldino calendar shows the appropriate calendar according to the timeScale.</p>
    <p>emoldino calendar는 timeScale에 따라 알맞는 캘린더를 보여줍니다.</p>
  </div>
  <div>
    <p>timeScale includes "DATE", "WEEK", "MONTH", "YEAR", and "CUSTOM".</p>
    <p>timeScale은 "DATE", "WEEK", "MONTH", "YEAR", "CUSTOM" 이 있습니다.</p>
  </div>
  <div>
    <p>In "CUSTOM", you can set the range by clicking two dates.</p>
    <p>"CUSTOM"에서는 두 가지 날짜를 클릭하여 범위설정을 할 수 있습니다.</p>
  </div>
  <div>
    <p>Set the timeScale in the controls of the storybook and click the 'Remount Component' button to check the calendar.</p>
    <p>스토리북의 controls 에서 <b>timeScale</b>을 설정하고 <b>Remount Component</b> 버튼을 클릭하여 달력을 확인해보세요.</p>
  </div>
  <div>
    <p>The calendar can receive the selected date through <b>getDateRange</b> emit when selecting a date.</p>
    <p>캘린더는 날짜를 선택할 때 getDateRange emit을 통해 선택된 날짜를 전달받을 수 있습니다. </p>
  </div>
  <div>
    <p><b>When you receive the date, update dateRange with the date you received.</b></p>
    <p>날짜를 전달받으면 전달받은 날짜로 dateRange를 업데이트 해주세요.</p>
  </div>
</div>`;
