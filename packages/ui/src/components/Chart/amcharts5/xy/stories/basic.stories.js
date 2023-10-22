import XyChart from "~/components/Chart/amcharts5/xy/index.vue";
import * as am5 from "@amcharts/amcharts5";

import {
  xyChartDescription,
  lineChartDescription,
  barChartDescription,
  bubbleChartDescription,
  lineAreaChartDescription,
  stepLineChartDescription,
  xScrollbarDescription,
  horizontalBarChartDescription,
  noDataDescription,
} from "./utils/descriptions.js";

import { category, data, dataBinder } from "./utils/arguments.js";

const meta = {
  title: "Components/Chart/xy/basic",
  component: XyChart,
  parameters: {
    docs: { description: { component: xyChartDescription } },
  },
  args: { category, data },
};

export default meta;

export const LineChart = {
  parameters: {
    docs: { description: { story: lineChartDescription } },
  },
  args: {
    lineDataBinder: [
      { key: "part1", displayName: "Part 1", strokeDasharray: [10, 5] },
      { key: "part2", displayName: "Part 2" },
      { key: "part3", displayName: "Part 3" },
    ],
    lineSet: {
      isConnected: true,
      isLineVisible: false,
      isFillVisible: false,
      strokeWidth: 1,
      fillOpacity: 0.1,
      bullet: {
        strokeWidth: 2,
        radius: 3,
        isVisible: true,
        isFilled: false,
        forceHidden: false,
      },
      colorList: ["#f00", "#0f0", "#00f"],
    },
  },
};

export const BarChart = {
  parameters: {
    docs: { description: { story: barChartDescription } },
  },
  args: {
    barDataBinder: dataBinder,
    chartSet: {
      valueAxis: { isPercent: true },
      root: { container: { layout: "horizontalLayout" } },
    },
    columnSet: { stacked: true, clustered: true },
    columnTemplateSet: {
      strokeWidth: 3,
      width: am5.percent(30),
      fillOpacity: 0.1,
    },
  },
};

export const BubbleChart = {
  parameters: {
    docs: { description: { story: bubbleChartDescription } },
  },
  args: {
    bubbleDataBinder: dataBinder,
    bubbleSet: {
      bullet: { strokeWidth: 5, radius: 5, isVisible: true, isFilled: false },
      colorList: ["#f00", "#0f0", "#00f"],
    },
  },
};

export const LineAreaChart = {
  parameters: {
    docs: { description: { story: lineAreaChartDescription } },
  },
  args: {
    lineDataBinder: [
      {
        key: "part1",
        openKey: "part1open",
        displayName: "part 1",
        isFillVisible: true,
        isLineVisible: false,
        bullet: {
          forceHidden: true,
        },
      },
      {
        key: "part2",
        openKey: "part2open",
        displayName: "part 2",
        color: am5.color("#EB709A"),
        isFillVisible: true,
        isLineVisible: false,
        bullet: {
          forceHidden: true,
        },
      },
      {
        key: "part3",
        openKey: "part3Open",
        displayName: "part 3",
        color: am5.color("#C0ADF2"),
        isFillVisible: true,
        isLineVisible: false,
        bullet: {
          forceHidden: true,
        },
      },
    ],
  },
};

export const StepLineChart = {
  parameters: {
    docs: {
      description: { story: stepLineChartDescription },
    },
  },
  args: {
    stepLineDataBinder: [
      {
        displayName: "part 1",
        key: "part1",
        openKey: "part1open",
        color: "#ff0000",
      },
      {
        displayName: "part 2",
        key: "part2",
        openKey: "part2open",
        color: "#00ff00",
      },
      {
        displayName: "part 3",
        key: "part3",
        openKey: "part3Open",
        color: "#0000ff",
      },
    ],
    stepLineSet: {
      isLineVisible: false,
      strokeWidth: 1,
      colorList: ["#f00", "#0f0", "#00f"],
      isFillVisible: true,
      fillOpacity: 0.5,
      bullet: { strokeWidth: 2, radius: 3, forceHidden: true },
    },
  },
};

export const XScrollbar = {
  parameters: {
    docs: { description: { story: xScrollbarDescription } },
  },
  args: {
    xyChartSet: {
      wheelY: "zoomXY",
    },
    xScrollbarSet: {
      forceHidden: false,
      isDown: false,
      height: 50,
    },
    lineDataBinder: dataBinder,
  },
};

export const HorizontalBarChart = {
  parameters: {
    docs: { description: { story: horizontalBarChartDescription } },
  },
  args: {
    chartSet: {
      xAxis: { type: "ValueAxis" },
      yAxis: { type: "CategoryAxis" },
      valueAxis: { isPercent: true },
    },
    barSet: { isStacked: true },
    barDataBinder: dataBinder,
  },
};

export const NoData = {
  parameters: {
    docs: { description: { story: noDataDescription } },
  },
  args: { data: [] },
};

export const AxisRenderer = {
  parameters: {
    docs: {
      description: {
        story: `axis renderer 를 설정하는 방법입니다.`,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    xAxisRendererSet: { minGridDistance: 15 },
    yAxisRendererSet: { minGridDistance: 30, inside: false },
  },
};

export const AxisGrid = {
  parameters: {
    docs: {
      description: {
        story: `axis grid 를 설정하는 방법입니다.`,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    xAxisGridSet: {
      strokeWidth: 1,
      strokeOpacity: 0.1,
      location: 0,
    },
    yAxisGridSet: {
      strokeWidth: 1,
      strokeOpacity: 0.1,
      location: 0,
    },
  },
};

export const AxisLabel = {
  parameters: {
    docs: {
      description: {
        story: `axis label 를 설정하는 방법입니다.`,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    xAxisLabelSet: { fill: am5.color("#00f") },
    xAxisExtraLabelSet: {
      text: "x Axis ExtraLabel text",
      fill: am5.color("#00f"),
    },
    yAxisLabelSet: { fill: am5.color("#f00") },
    yAxisExtraLabelSet: {
      text: "y Axis ExtraLabel text",
      fill: am5.color("#f00"),
    },
  },
};

let tooltipDescription = `
tooltip 을 설정하는 방법입니다.


`;

export const Tooltip = {
  parameters: {
    docs: {
      description: {
        story: tooltipDescription,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    tooltipHTML:
      "<div style='padding: 10px;'>{name} in {categoryX}: {valueY}</div>",
  },
};

export const ChartSet = {
  parameters: {
    docs: {
      description: {
        story: `axis label 를 설정하는 방법입니다.`,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    chartSet: {
      refProps: "defaultXYChart",
      id: "defaultXYChart",
      key: "defaultXYChart",
      chartType: "default",
      isZoomOutButton: false,
      isYAxesPlotContainerVisible: true,
      isBottomAxesContainerVisible: true,

      root: {
        container: {
          layout: "verticalLayout", // horizontalLayout, verticalLayout
        },
        numberFormat: "#.#",
      },
      xAxis: {
        type: "CategoryAxis",
      },
      yAxis: {
        type: "ValueAxis",
        isLeft: true,
        minGridDistance: 30,
        inside: false,
        marginTop: 15,
        axisHeader: {
          minHeight: 0,
        },
      },
      valueAxis: {
        isPercent: false,
        strictMinMaxSelection: false,
        min: null,
        extraMax: 0.1,
        baseValue: 0,
      },
      cursor: {
        isAvailable: false,
        xAxis: {
          isFocused: false,
        },
        yAxis: {
          isFocused: false,
        },
      },
    },
  },
};

export const Legend = {
  parameters: {
    docs: {
      description: {
        story: `legend 를 설정하는 방법입니다.`,
      },
    },
  },
  args: {
    lineDataBinder: dataBinder,
    legendSet: {
      forceHidden: false,
      clickTarget: "itemContainer",
      useDefaultMarker: false,
    },
  },
};
