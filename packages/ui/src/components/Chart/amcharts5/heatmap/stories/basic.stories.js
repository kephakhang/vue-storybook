import HeatMapChart from "~/components/Chart/amcharts5/heatmap/index.vue";
import * as am5 from "@amcharts/amcharts5";

import {
  heatmapDescription,
  variousOptionDescription,
} from "./utils/descriptions.js";
import { heatmapDataBinder, data } from "./utils/arguments.js";
import {
  columnSeriesDatavalidatedEvent,
  columnTemplatePointeroverEvent,
} from "./utils/functions.js";

// TODO(emoldino-woojin): typescript 적용
// import type { Meta, StoryObj } from "@storybook/vue";
// type GoogleMapInstance = InstanceType<typeof GoogleMap>;
// const meta: Meta<GoogleMapInstance> = {
const meta = {
  title: "Components/Chart/heatmap",
  component: HeatMapChart,
  parameters: {
    docs: {
      description: {
        component: heatmapDescription,
      },
    },
  },
  argTypes: {},
  args: {
    heatmapDataBinder,
    data,
  },
};

export default meta;

// TODO(emoldino-woojin): typescript 적용
// type Story = StoryObj<GoogleMapInstance>;
// export const CurrentSettings: Story = {
export const CurrentSettings = {};

export const VariousOptions = {
  parameters: {
    docs: {
      description: {
        story: variousOptionDescription,
      },
    },
  },
  args: {
    columnSeriesEvent: {
      datavalidated: columnSeriesDatavalidatedEvent,
    },
    columnTemplateEvent: {
      pointerover: columnTemplatePointeroverEvent,
    },
    xAxisRendererGridTemplateSet: {
      visible: true,
    },
    yAxisRendererGridTemplateSet: {
      visible: true,
    },
    columnTemplateSet: {
      tooltipText: "{categoryY} {categoryX}: {value}",
      stroke: am5.color("#ddd"),
      strokeWidth: 2,
      width: am5.percent(70),
      height: am5.percent(70),
    },
    heatLegendSet: {
      forceHidden: false,
    },
  },
};
