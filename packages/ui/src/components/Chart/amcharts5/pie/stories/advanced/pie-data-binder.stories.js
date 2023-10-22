import PieChart from "~/components/Chart/amcharts5/pie/index.vue";
import * as am5 from "@amcharts/amcharts5";

export default {
  title: "Components/Chart/pie/advanced",
  component: PieChart,
};

const html = String.raw;

const Default = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "pie-chart": PieChart },
  template: html`
    <div>
      <pie-chart v-bind="$props"></pie-chart>
      ${description}
    </div>
  `,
});

let description = `
<div class="story-description-box">
  <div>
    <p>You can change label settings by accessing <b>labelSettings</b> in each dataBinder of <b>pieDataBinder</b>.</p>
    <p>pieDataBinder 의 각 dataBinder 에서 labelSettings 에 접근하여 label 의 설정을 변경할 수 있습니다.</p>
  </div>

  <div>
    <p>You can change slice settings by accessing <b>sliceSettings</b> in each dataBinder of <b>pieDataBinder</b>.</p>
    <p>pieDataBinder 의 각 dataBinder 에서 sliceSettings 에 접근하여 slice 의 설정을 변경할 수 있습니다.</p>
  </div>
</div>`;

export const PieDataBinder = Default.bind({});

PieDataBinder.args = {
  styleProps: "width: 100%; height: 300px",
  legendSet: {
    forceHidden: true,
  },
  data: [
    {
      processingTime: 10,
      warmupTime: 9,
      cooldownTime: 6,
    },
  ],
  pieDataBinder: [
    {
      key: "processingTime",
      displayName: "Processing Time",
      labelSettings: {
        fill: am5.color("#f00"),
      },
      sliceSettings: {
        fill: am5.color("#f00"),
      },
      // TODO(emoldino-woojin)
      // pieLabelBackground: { fill: am5.color("#00f"), fillOpacity: 1 },
    },
    {
      key: "warmupTime",
      displayName: "Warmup Time",
      labelSettings: {
        fill: am5.color("#00f"),
      },
    },
    {
      key: "cooldownTime",
      displayName: "Cooldown Time",
    },
  ],
  category: "displayName",
};
