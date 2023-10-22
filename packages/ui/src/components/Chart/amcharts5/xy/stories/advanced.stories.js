import XyChart from "~/components/Chart/amcharts5/xy/index.vue";

import {
  xyChartAdvancedDescription,
  customLegendDescription,
  multipleYAxisDescription,
  numberFormatterDescription,
  responsiveDescription,
  xyChartSetDescription,
  columnSettingsDescription,
  disconnectedLineDescription,
} from "./utils/descriptions.js";
import { category, data, dataBinder } from "./utils/arguments.js";
import { setCustom, setCustomLegend } from "./utils/functions.js";

const meta = {
  title: "Components/Chart/xy/advanced",
  component: XyChart,
  parameters: {
    docs: { description: { component: xyChartAdvancedDescription } },
  },
  args: { category, data },
};

export default meta;

export const CustomLegend = {
  parameters: {
    docs: { description: { story: customLegendDescription } },
  },
  args: {
    lineDataBinder: dataBinder,
    setCustom,
    setCustomLegend,
  },
};

export const ColumnSettings = {
  parameters: {
    docs: {
      description: {
        story: columnSettingsDescription,
      },
    },
  },
  args: {
    barDataBinder: dataBinder,
    data: [
      {
        time: "09-05",
        part1: 10000,
        part2: 11000,
        part3: 12000,
        columnSettings: {
          strokeWidth: 1,
          strokeDasharray: [5],
          fillOpacity: 0.2,
        },
      },
      {
        time: "09-06",
        part1: 11000,
        part2: 12000,
        part3: 13000,
      },
      {
        time: "09-07",
        part1: 12000,
        part2: 13000,
        part3: 14000,
      },
    ],
  },
};

export const DisconnectedLine = {
  parameters: {
    docs: {
      description: {
        story: disconnectedLineDescription,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    lineSet: { isConnected: false },
    data: [
      ...data,
      {
        time: "09-08",
        part1: null,
        part2: null,
        part3: null,
      },
      {
        time: "09-09",
        part1: 12000,
        part2: 13000,
        part3: 14000,
      },
      {
        time: "09-10",
        part1: 12000,
        part2: 13000,
        part3: 14000,
      },
    ],
  },
};

export const MultipleYAxis = {
  parameters: {
    docs: {
      description: {
        story: multipleYAxisDescription,
      },
    },
  },
  args: {
    data: [
      {
        time: "09-05",
        part1: 90,
        part2: 12000,
      },
      {
        time: "09-06",
        part1: 15,
        part2: 8000,
      },
    ],
    chartSet: {
      valueAxis: {
        maxPrecision: 0,
      },
      yAxis: { isStacked: true },
      yAxisList: [
        {
          axisHeaderText: "yAxis Header Name 1",
          extraLabelText: "yAxis Label Name 1",
          opposite: false,
          min: 10,
          max: 100,
          numberFormat: "#'%'",
        },
        {
          axisHeaderText: "",
          extraLabelText: "",
          opposite: false,
        },
        {
          axisHeaderText: "",
          extraLabelText: "",
          opposite: true,
        },
        {
          axisHeaderText: "yAxis Header Name 3",
          extraLabelText: "yAxis Label Name 3",
          opposite: true,
          syncIndex: 0,
        },
      ],
    },
    barDataBinder: [
      {
        key: "part1",
        displayName: "Part 1",
        color: "#F7CC57",
        yAxisListIndex: 0,
      },
      {
        key: "part2",
        displayName: "Part 2",
        color: "#41CE77",
        yAxisListIndex: 3,
      },
    ],
  },
};

let nextPreviousBtnDescription = `좌우 화살표 버튼이 추가된 차트를 설정하는 방법입니다.`;

export const NextPreviousBtn = {
  parameters: {
    docs: {
      description: {
        story: nextPreviousBtnDescription,
      },
    },
  },
  args: {
    barDataBinder: dataBinder,
    nextButton: {
      visible: true,
      disabled: true,
      handler: function () {
        console.log("next Btn active !!");
      },
    },
    previousButton: {
      visible: true,
      disabled: false,
      handler: function () {
        console.log("previous Btn active !!");
      },
    },
  },
};

export const NumberFormatter = {
  parameters: {
    docs: {
      description: {
        story: numberFormatterDescription,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    rootNumberFormatterSet: { numberFormat: "#,###.0000'%'" },
    tooltipHTML: "<div style='padding: 10px;'>{categoryX}: {valueY}</div>",
  },
};

export const Responsive = {
  parameters: {
    docs: { description: { story: responsiveDescription } },
  },
  args: {
    barDataBinder: dataBinder,
    styleProps: "width: 70vw; height: 50vw;",
  },
};

export const XyChartSet = {
  parameters: {
    docs: { description: { story: xyChartSetDescription } },
  },
  args: {
    lineDataBinder: dataBinder,
    xyChartSet: {
      focusable: false,
      maxTooltipDistance: -1,
      maxTooltipDistanceBy: "xy",
      panX: true,
      panY: true,
      wheelX: "none",
      wheelY: "zoomX",
    },
  },
};

export const YAxisRange = {
  parameters: {
    docs: { description: { story: `yAxis range description` } },
  },
  args: {
    barDataBinder: dataBinder,
    chartSet: { valueAxis: { min: 0 } },
    yAxisRange: [
      { value: 4000, color: 0x297373 },
      { value: 6000, endValue: 7000, color: 0xff621f, text: "10-30" },
      { value: 8000, endValue: 10000, location: 1, strokeDasharray: 2 },
    ],
  },
};

export const ColumnDisabled = {
  parameters: {
    docs: { description: { story: `column disabled description` } },
  },
  args: {
    barDataBinder: [
      { key: "part1", displayName: "part 1", color: "#579ffb", disabled: true },
    ],
  },
};
