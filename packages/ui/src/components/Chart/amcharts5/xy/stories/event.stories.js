import XyChart from "~/components/Chart/amcharts5/xy/index.vue";

import {
  xyChartEventDescription,
  columnHoverDescription,
} from "./utils/descriptions.js";
import { category, data, dataBinder } from "./utils/arguments.js";
import { columnHoverEvent } from "./utils/functions.js";

const meta = {
  title: "Components/Chart/xy/events",
  component: XyChart,
  parameters: {
    docs: { description: { component: xyChartEventDescription } },
  },
  args: { category, data },
};

export default meta;

export const ColumnHoverEvent = {
  parameters: {
    docs: { description: { story: columnHoverDescription } },
  },
  args: {
    columnHoverEvent,
    barDataBinder: dataBinder,
  },
};
