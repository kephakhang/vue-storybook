import * as am5 from "@amcharts/amcharts5";

/**
 * label 관련 설정
 *
 * Type: ILabelSettings
 *
 * Reference: https://www.amcharts.com/docs/v5/reference/ilabelsettings/
 */

export const xAxisLabelSettings = {
  fill: am5.color("#4b4b4b"),
  fontSize: 12,
  textAlign: "center",
  oversizedBehavior: "none",
  maxWidth: 150, // with (oversizedBehavior: 'truncate')
  ellipsis: "...", // with (oversizedBehavior: 'truncate')
};

export const yAxisLabelSettings = {
  fill: am5.color("#4b4b4b"),
  fontSize: 12,
  textAlign: "center",
  visible: true,
  minPosition: 0,
  maxPosition: 0.9,
};

export const xAxisExtraLabelSettings = {
  width: am5.percent(100),
  x: am5.percent(50),
  centerX: am5.percent(50),
  fontSize: 12,
  paddingTop: 10,
  paddingBottom: 0,
  textAlign: "center",
  fill: am5.color("#4b4b4b"),
};

export const yAxisExtraLabelSettings = {
  fill: am5.color("#4b4b4b"),
  fontSize: 12,
  rotation: -90,
  textAlign: "center",
  paddingTop: 0,
  paddingBottom: 5,
  position: "relative",
  x: am5.percent(50),
  centerX: am5.percent(50),
  y: am5.percent(50),
  centerY: am5.percent(50),
};

export const yAxisHeaderLabelSettings = {
  fill: am5.color("#4b4b4b"),
  fontSize: 12,
  textAlign: "left",
  x: 0,
  centerX: 0,
  paddingTop: 20,
  paddingBottom: 20,
};
