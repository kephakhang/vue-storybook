import HeatMapChart from "~/components/Chart/amcharts5/heatmap/index.vue";

import {
  columnSeriesDatavalidatedEventDescription,
  columnTemplatePointeroverEventDescription,
} from "./utils/descriptions.js";
import { heatmapDataBinder, data } from "./utils/arguments.js";
import { getMinMax, paintColumnBlack } from "./utils/functions.js";

const meta = {
  title: "Components/Chart/heatmap/events",
  component: HeatMapChart,
  args: {
    heatmapDataBinder,
    data,
  },
};

export default meta;

export const ColumnSeriesDatavalidatedEvent = {
  parameters: {
    docs: {
      description: {
        story: columnSeriesDatavalidatedEventDescription,
      },
    },
  },
  args: {
    columnSeriesEvent: {
      datavalidated: getMinMax,
    },
  },
};

export const ColumnTemplatePointeroverEvent = {
  parameters: {
    docs: {
      description: {
        story: columnTemplatePointeroverEventDescription,
      },
    },
  },
  args: {
    columnTemplateEvent: { pointerover: paintColumnBlack },
  },
};
