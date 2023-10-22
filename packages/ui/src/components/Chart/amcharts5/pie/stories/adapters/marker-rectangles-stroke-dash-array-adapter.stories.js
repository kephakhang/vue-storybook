import PieChart from "~/components/Chart/amcharts5/pie/index.vue";

export default {
  title: "Components/Chart/pie/adapters",
  component: PieChart,
};

const html = String.raw;

const Default = (args, { argTypes }) => ({
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
    <p>TODO: pie chart 에서는 legend marker rectangles adapter 동작 안함. 추후 해결</p>
  </div>
</div>`;

export const MarkerRectanglesStrokeDashArrayAdapter = Default.bind({});

function legendMarkerRectanglesStrokeDashArrayAdapter(strokeDasharray, target) {
  // console.log("legendMarkerRectanglesStrokeDashArrayAdapter");

  // Example 1. legendData 를 넘겨서 처리할 경우

  if (target.dataItem.dataContext?.legendName) {
    console.log(target.dataItem.dataContext?.legendName);
    if (target.dataItem.dataContext.legendName === "Processing Time") {
      return [2, 3];
    } else {
      return strokeDasharray;
    }
  }

  // Example 2. chart.series.value 를 넘겨서 처리할 경우 (기본)
  console.log(target.dataItem.dataContext.dataContext.displayName);
  if (
    target.dataItem.dataContext.dataContext.displayName === "Processing Time"
  ) {
    return [2, 3];
  } else {
    return strokeDasharray;
  }
}

MarkerRectanglesStrokeDashArrayAdapter.args = {
  legendMarkerRectanglesStrokeDashArrayAdapter,
  data: [{ processingTime: 10, warmupTime: 10, cooldownTime: 2 }],
  category: "displayName",
  legendSet: {
    useDefaultMarker: true,
  },
  // legendMarkerSet: {
  //   height: 3,
  // },
  legendMarkerRectangleSet: {
    fillOpacity: 0,
  },

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
  // legendData: [
  //   {
  //     legendName: "Processing Time",
  //     legendFill: am5.color("#1A2281"),
  //     legendStroke: am5.color("#1A2281"),
  //   },
  //   {
  //     legendName: "Warmup Time",
  //     legendFill: am5.color("#efefef"),
  //     legendStroke: am5.color("#000"),
  //   },
  // ],
};
