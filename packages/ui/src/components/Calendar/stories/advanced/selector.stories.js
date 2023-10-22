import Calendar from "~/components/Calendar/index.vue";
import moment from "moment";

export default {
  title: "Components/Calendar/Advanced",
  component: Calendar,
};

export const Selector = (args, { argTypes }) => ({
  components: { Calendar },
  props: { ...Object.keys(argTypes) },
  data() {
    return {
      timeScale: "WEEK",
      dateRange: { start: moment(), end: moment() },
      // minDate: moment("20210406", "YYYYMMDD"),
      // maxDate: moment("20300420", "YYYYMMDD"),
      // disabledList: [ moment('20230605', 'YYYYMMDD'), moment('20240710', 'YYYYMMDD')],
      minDate: undefined,
      maxDate: undefined,
      disabledList: [],
    };
  },
  methods: {
    getDateRange(dateRange) {
      this.dateRange = dateRange;
    },
    getTimeScale(timeScale) {
      this.timeScale = timeScale;
    },
  },
  template: `
    <div>
      <calendar 
       :show-selector="true"
       :time-scale="timeScale" 
       :date-range="dateRange" 
       :min-date="minDate"
       :max-date="maxDate"
       :disabled-list="disabledList"
       @get-date-range="getDateRange"
       @get-time-scale="getTimeScale"
      ></calendar>
      ${description}
    </div>`,
});

let description = String.raw`
<div style="font-size: 13px; margin-top: 50px">
  <p style="margin-bottom: 20px">dateRange: {{ dateRange }}</p>
  <p style="margin-bottom: 20px">timeScale: {{ timeScale }}</p>
</div>`;
