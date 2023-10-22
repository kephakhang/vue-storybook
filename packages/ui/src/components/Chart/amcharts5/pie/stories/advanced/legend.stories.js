import PieChart from "~/components/Chart/amcharts5/pie/index.vue";

export default {
  title: "Components/Chart/pie/advanced",
  component: PieChart,
};

const html = String.raw;

const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "pie-chart": PieChart },
  template: html` <div style="width: 100%;">
    <pie-chart v-bind="$props"></pie-chart>
    ${description}
  </div>`,
});

let description = `
<div class="story-description-box">
  <div>
    <p>You can show/hide the legend by modifying the <b>forceHidden</b> property in the <b>legendSet</b> props.</p>
    <p>legendSet props 에 forceHidden 속성을 수정하여 legend 를 보이거나 숨길 수 있습니다. </p>
  </div>
  <div>
    <p>You can change where the legend is placed by selecting <b>chartSet.root.container.layout</b> as <b>'verticalLayout' or 'horizontalLayout'</b> .</p>
    <p>chartSet.root.container.layout 을 'verticalLayout' 또는 'horizontalLayout' 으로 선택하여 legend가 배치되는 위치를 변경할 수 있습니다.</p>
  </div>
  <div>
    <p>You can set the width of the legend using <b>legendSet.width</b>.(px)</p>
    <p>legendSet.width 를 사용하여 legend 의 넓이를 설정할 수 있습니다.(px)</p>
  </div>
</div>`;

export const Legend = Default.bind({});

Legend.args = {
  chartSet: {
    root: {
      container: {
        layout: "horizontalLayout", // 'verticalLayout' || 'horizontalLayout'
      },
    },
  },
  legendSet: {
    forceHidden: false,
    paddingTop: 10,
    paddingLeft: 10,
  },
  // legendData 를 사용할 경우
  // legendData: [
  //   {
  //     legendName: "Shot Data",
  //     legendFill: am5.color("#1A2281"),
  //     legendStroke: am5.color("#1A2281"),
  //   },
  //   {
  //     legendName: "Abnormal Data Detected",
  //     legendFill: am5.Color.lighten(am5.color("#DB3B21"), 0.8),
  //     legendStroke: am5.Color.lighten(am5.color("#DB3B21"), 0.8),
  //   },
  // ],
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
    },
    {
      key: "warmupTime",
      displayName: "Warmup Time",
    },
    {
      key: "cooldownTime",
      displayName: "Cooldown Time",
    },
  ],
  category: "displayName",
};
