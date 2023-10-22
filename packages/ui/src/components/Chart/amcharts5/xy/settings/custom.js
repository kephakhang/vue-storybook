/**
 * Breaking Change: since version 0.4.0
 * axisDataBinder.yAxis => chartSet.valueAxis
 * axisDataBinder.xAxis => chartSet.categoryAxis
 * 예전에는 x축은 categoryAxis, y축은 valueAxis 로 고정이었으나,
 * horizontal xy chart의 적용으로 인해, 두 가지의 축을 서로 바꿀 수 있도록 설정.
 */
export const chartSettings = {
  useTheme: true,
  refProps: "defaultXYChart",
  id: "defaultXYChart",
  key: "defaultXYChart",
  chartType: "default",
  isZoomOutButton: false,
  isYAxesPlotContainerVisible: true,
  isBottomAxesContainerVisible: true,
  column: {
    colorList: [
      "#f08080",
      "#fa8072",
      "#e9967a",
      "#ff7f50",
      "#ff6347",
      "#f4a460",
      "#ffa07a",
    ],
  },
  root: {
    numberFormat: "#,###.#",
    container: {
      layout: "verticalLayout", // verticalLayout || horizontalLayout || gridLayout
    },
    tooltipContainerBounds: {
      top: 400,
      bottom: 400,
      left: 0,
      right: 0,
    },
  },
  xAxis: {
    type: "CategoryAxis",
    grid: {
      strokeWidth: 1,
      strokeOpacity: 0.1,
      location: 0,
    },
  },
  yAxis: {
    type: "ValueAxis",
    isStacked: false,
    grid: {
      strokeWidth: 1,
      strokeOpacity: 0.1,
      location: 0,
    },
    marginTop: 15,
    axisHeader: {
      minHeight: 0,
    },
  },
  valueAxis: {
    isPercent: false,
    strictMinMaxSelection: false,
    min: null,
    max: null,
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
};
export const candlestickSettings = {
  riseColor: "#f00",
  dropColor: "#00f",
};
export const lineSettings = {
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
  colorList: [
    "#f08080",
    "#fa8072",
    "#e9967a",
    "#ff7f50",
    "#ff6347",
    "#f4a460",
    "#ffa07a",
  ],
};
export const stepLineSettings = {
  isLineVisible: false,
  strokeWidth: 1,
  colorList: [
    "#f08080",
    "#fa8072",
    "#e9967a",
    "#ff7f50",
    "#ff6347",
    "#f4a460",
    "#ffa07a",
  ],
  isFillVisible: true,
  fillOpacity: 0.5,
  bullet: { strokeWidth: 2, radius: 3, forceHidden: true },
};
export const bubbleSettings = {
  strokeWidth: 2,
  bullet: { strokeWidth: 2, radius: 3, isVisible: true, isFilled: false },
  colorList: [
    "#f08080",
    "#fa8072",
    "#e9967a",
    "#ff7f50",
    "#ff6347",
    "#f4a460",
    "#ffa07a",
  ],
};
