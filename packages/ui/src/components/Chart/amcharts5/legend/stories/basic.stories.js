import chartLegend from "~/components/Chart/amcharts5/legend/index.vue";

import {
  chartLegendDesciption,
  BasicDescription,
} from "./utils/descriptions.js";
import { data } from "./utils/arguments.js";

const meta = {
  title: "Components/Chart/legendContainer/basic",
  component: chartLegend,
  parameters: {
    docs: { description: { component: chartLegendDesciption } },
  },
  args: { data },
};

export default meta;

export const ChartLegend = {
  parameters: {
    docs: { description: { story: BasicDescription } },
  },
};
