import * as am5 from "@amcharts/amcharts5";

/**
 * xy chart 관련 설정
 */

export const xyChartSettings = {
  focusable: false,
  maxTooltipDistance: -1,
  maxTooltipDistanceBy: "xy",
  panX: false,
  panY: false,
  wheelX: "none",
  wheelY: "none",
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
};

export const xyChartContainerSettings = {
  width: am5.percent(100),
  height: am5.percent(100),
  centerX: 0,
  centerY: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
};
