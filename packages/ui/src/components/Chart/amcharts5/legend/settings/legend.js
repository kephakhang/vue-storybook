import * as am5 from "@amcharts/amcharts5";

export const legendSettings = {
  /**
   * x & y & centerX & centerY : root.container.layout 에 따라 조정되도록 처리
   */
  x: am5.percent(50),
  y: am5.percent(50),
  centerX: am5.percent(50),
  centerY: am5.percent(50),
  calculateAggregates: false,
  templateField: "legendSettings",
  fillField: "legendFill",
  strokeField: "legendStroke",
  clickTarget: "itemContainer",
  idField: "legendId",
  nameField: "legendName",
  valueField: "legendValue",
  legendLabelText: undefined,
  legendValueText: undefined,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  position: "relative",
  useDefaultMarker: false,
};

export const legendLabelSettings = {
  fontSize: 12,
  fill: am5.color("#4b4b4b"),
};

export const legendMarkerRectangleSettings = {
  cornerRadiusTL: 2,
  cornerRadiusTR: 2,
  cornerRadiusBL: 2,
  cornerRadiusBR: 2,
  templateField: "legendMarkerRectangles",
};

export const legendMarkerSettings = {
  width: 12,
  height: 12,
};
