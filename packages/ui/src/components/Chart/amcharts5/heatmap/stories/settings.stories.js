import HeatMapChart from "~/components/Chart/amcharts5/heatmap/index.vue";
import * as am5 from "@amcharts/amcharts5";

import {
  columnSeriesHeatRulesDescription,
  columnSeriesSettingsDescription,
  columnTemplateSettingsDescription,
  HeatLegendDescription,
  xAxisRendererGridTemplateDescription,
  xAxisRendererSettingsDescription,
  xAxisSettingsDescription,
  xyChartSettingsDescription,
  yAxisRendererGridTemplateDescription,
  yAxisRendererSettingsDescription,
  yAxisSettingsDescription,
} from "./utils/descriptions.js";

import { heatmapDataBinder, data } from "./utils/arguments.js";

const meta = {
  title: "Components/Chart/heatmap/settings",
  component: HeatMapChart,
  args: {
    heatmapDataBinder,
    data,
  },
};

export default meta;

// Docs: https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
// Reference: https://www.amcharts.com/docs/v5/reference/Iheatrule/
export const ColumnSeriesHeatRulesSettings = {
  parameters: {
    docs: {
      description: {
        story: columnSeriesHeatRulesDescription,
      },
    },
  },
  args: {
    columnSeriesHeatRulesSet: {
      key: "fill", // undefined | string => 설정할 설정 키.
      min: am5.color("#fff"), // any => 가장 낮은 값인 경우 사용할 설정 값..
      max: am5.color("#000"), // any => 가장 높은 값인 경우 사용할 설정 값.
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/columnseries/
export const ColumnSeriesSettings = {
  parameters: {
    docs: {
      description: {
        story: columnSeriesSettingsDescription,
      },
    },
  },
  args: {
    columnSeriesSet: {
      stroke: am5.color("#000"),
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/roundedrectangle/
export const ColumnTemplateSettings = {
  parameters: {
    docs: {
      description: {
        story: columnTemplateSettingsDescription,
      },
    },
  },
  args: {
    columnTemplateSet: {
      tooltipText: "{value}",
      stroke: am5.color("#ddd"),
      strokeWidth: 2,
      width: am5.percent(70),
      height: am5.percent(70),
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/heatlegend/#Private_settings
export const HeatLegendSettings = {
  parameters: {
    docs: {
      description: {
        story: HeatLegendDescription,
      },
    },
  },
  args: {
    heatLegendSet: {
      forceHidden: false,
      orientation: "horizontal", // "horizontal" | "vertical"
      startText: "Lowest",
      endText: "Highest",
      stepCount: 10,
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/grid/
export const XAxisRendererGridTemplateSettings = {
  parameters: {
    docs: {
      description: {
        story: xAxisRendererGridTemplateDescription,
      },
    },
  },
  args: {
    xAxisRendererGridTemplateSet: {
      visible: true,
    },
    columnTemplateSet: {
      width: am5.percent(70),
      height: am5.percent(70),
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/axisrendererx/
export const XAxisRendererSettings = {
  parameters: {
    docs: {
      description: {
        story: xAxisRendererSettingsDescription,
      },
    },
  },
  args: {
    xAxisRendererSet: {
      minGridDistance: 100,
      opposite: true,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8,
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/categoryaxis/
export const XAxisSettings = {
  parameters: {
    docs: {
      description: {
        story: xAxisSettingsDescription,
      },
    },
  },
  args: {
    xAxisSet: {},
  },
};

// https://www.amcharts.com/docs/v5/reference/xychart/
export const XyChartSettings = {
  parameters: {
    docs: {
      description: {
        story: xyChartSettingsDescription,
      },
    },
  },
  args: {
    xyChartSet: {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/grid/
export const YAxisRendererGridTemplateSettings = {
  parameters: {
    docs: {
      description: {
        story: yAxisRendererGridTemplateDescription,
      },
    },
  },
  args: {
    yAxisRendererGridTemplateSet: {
      visible: true,
    },
    columnTemplateSet: {
      width: am5.percent(70),
      height: am5.percent(70),
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/axisrenderery/
export const YAxisRendererSettings = {
  parameters: {
    docs: {
      description: {
        story: yAxisRendererSettingsDescription,
      },
    },
  },
  args: {
    yAxisRendererSet: {
      minGridDistance: 100,
      opposite: true,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8,
    },
  },
};

// https://www.amcharts.com/docs/v5/reference/categoryaxis/
export const YAxisSettings = {
  parameters: {
    docs: {
      description: {
        story: yAxisSettingsDescription,
      },
    },
  },
  args: {
    yAxisSet: {
      maxDeviation: 0,
    },
  },
};
