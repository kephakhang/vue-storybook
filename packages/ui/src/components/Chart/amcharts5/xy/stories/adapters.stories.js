import XyChart from "~/components/Chart/amcharts5/xy/index.vue";

import {
  xyChartAdapterDescription,
  markerRectanglesStrokeDashArrayAdapterDescription,
  seriesTooltipHtmlAdapterDescription,
} from "./utils/descriptions.js";
import { category, data, dataBinder } from "./utils/arguments.js";
import {
  legendMarkerRectanglesStrokeDashArrayAdapter,
  seriesTooltipHTMLAdapter,
} from "./utils/functions.js";

const meta = {
  title: "Components/Chart/xy/adapters",
  component: XyChart,
  parameters: {
    docs: {
      description: { component: xyChartAdapterDescription },
    },
  },
  args: { category, data },
};

export default meta;

export const MarkerRectanglesStrokeDashArrayAdapter = {
  parameters: {
    docs: {
      description: {
        story: markerRectanglesStrokeDashArrayAdapterDescription,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    legendSet: { useDefaultMarker: true },
    legendMarkerRectangleSet: { fillOpacity: 0 },
    legendMarkerRectanglesStrokeDashArrayAdapter,
  },
};

export const SeriesTooltipHtmlAdapter = {
  parameters: {
    docs: {
      description: { story: seriesTooltipHtmlAdapterDescription },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    seriesTooltipHTMLAdapter,
  },
};
