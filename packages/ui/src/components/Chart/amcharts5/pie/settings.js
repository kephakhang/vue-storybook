import * as am5 from "@amcharts/amcharts5";

// Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
// Reference: https://www.amcharts.com/docs/v5/reference/piechart/
export const pieChartSettings = {
  name: "pieChart",
  fillField: "pieFillSettings",
  templateField: "pieSettings",
  radius: am5.percent(100),
  innerRadius: am5.percent(80),
  width: am5.percent(100),
  height: am5.percent(100),
};

// Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/labels/
// Reference: https://www.amcharts.com/docs/v5/reference/iradiallabelsettings/#baseRadius_property
export const pieLabelSettings = {
  templateField: "labelSettings",
  baselineRatio: 0.19,
  inside: true,
  lineHeight: 0,
  oversizedBehavior: "truncate",
  breakWords: true,
  ellipsis: "...",
  baseRadius: am5.percent(50),
  radius: 0,
  fill: am5.color("#4b4b4b"),
  fontSize: "15px",
};

// Reference: https://www.amcharts.com/docs/v5/reference/ipercentseriessettings/
export const pieSeriesSettings = {
  templateField: "pieSeriesSettings",
  fillField: "pieSeriesFillSettings",
  name: "pieSeries",
  alignLabels: true,
};

export const pieSliceSettings = {
  templateField: "sliceSettings",
  cursorOverStyle: "pointer",
  stroke: am5.color("#4b4b4b"),
  strokeOpacity: 0,
  tooltipHTML: "",
  tooltipPosition: "pointer",
};

// https://www.amcharts.com/docs/v5/reference/tick/
export const pieTickSettings = {
  templateField: "tickSettings",
  strokeOpacity: 1,
  stroke: am5.color("#ddd"),
};
