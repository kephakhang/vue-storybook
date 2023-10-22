import chartLegend from "~/components/Chart/amcharts5/legend/index.vue";

import { legendMarkerRectanglesStrokeDashArrayAdapterDescription } from "./utils/descriptions.js";
import { data } from "./utils/arguments.js";
import { legendMarkerRectanglesStrokeDashArrayAdapter } from "./utils/functions.js";

const meta = {
  title: "Components/Chart/legendContainer/adapters",
  component: chartLegend,
  parameters: {
    docs: { description: { component: `heatmapDescription` } },
  },
  args: { data },
};

export default meta;

export const ChartLegend = {
  parameters: {
    docs: {
      description: {
        story: legendMarkerRectanglesStrokeDashArrayAdapterDescription,
      },
    },
  },
  args: {
    legendMarkerRectanglesStrokeDashArrayAdapter,
  },
};
