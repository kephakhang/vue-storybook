import HeatMapChart from "~/components/Chart/amcharts5/heatmap/index.vue";

import { columnTemplateFillAdapterDescription } from "./utils/descriptions.js";
import { heatmapDataBinder, data } from "./utils/arguments.js";
import { changeColumnFill } from "./utils/functions.js";

const meta = {
  title: "Components/Chart/heatmap/adapters",
  component: HeatMapChart,
  args: {
    heatmapDataBinder,
    data,
  },
};

export default meta;

export const ColumnSeriesHeatRulesSettings = {
  parameters: {
    docs: {
      description: {
        story: columnTemplateFillAdapterDescription,
      },
    },
  },
  args: {
    columnTemplateAdatper: {
      fill: changeColumnFill,
    },
  },
};
