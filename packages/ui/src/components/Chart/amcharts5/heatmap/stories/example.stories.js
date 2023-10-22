import HeatMapChart from "~/components/Chart/amcharts5/heatmap/index.vue";
import LegendContainer from "~/components/Chart/amcharts5/legend/index.vue";

import * as am5 from "@amcharts/amcharts5";

import { partQualityRiskDescription } from "./utils/descriptions.js";
import { heatmapDataBinder, data } from "./utils/arguments.js";
import { changeColumnFill, setPqrTooltip } from "./utils/functions.js";

const meta = {
  title: "Components/Chart/heatmap/examples",
  component: HeatMapChart,
  args: {
    heatmapDataBinder,
    data,
  },
};

export default meta;

const html = String.raw;

export const PartQualityRisk = {
  render: (args, { argTypes }) => ({
    components: { heatmap: HeatMapChart, "legend-container": LegendContainer },
    props: { ...Object.keys(argTypes) },
    data() {
      return {
        args,
        legendData: [
          {
            legendName: "High Risk",
            legendFill: am5.color("#E34537"),
            legendStroke: am5.color("#E34537"),
          },
          {
            legendName: "Medium Risk",
            legendFill: am5.color("#F7CC57"),
            legendStroke: am5.color("#F7CC57"),
          },
          {
            legendName: "Row Risk",
            legendFill: am5.color("#41CE77"),
            legendStroke: am5.color("#41CE77"),
          },
          {
            legendName: "No Production",
            legendFill: am5.color("#D3D1D9"),
            legendStroke: am5.color("#D3D1D9"),
          },
        ],
      };
    },
    template: html`
      <div>
        <heatmap v-bind="args"></heatmap>
        <legend-container
          style="width: 100%; height: 20px;"
          :data="legendData"
        ></legend-container>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: partQualityRiskDescription,
      },
    },
  },
  args: {
    xAxisExtraLabelSet: {
      text: "Time Elapsed (hours)",
    },
    columnTemplateAdatper: {
      fill: changeColumnFill,
      tooltipHTML: setPqrTooltip,
    },
  },
};
