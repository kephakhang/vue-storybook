import * as am5 from "@amcharts/amcharts5";

// Reference: https://www.amcharts.com/docs/v5/reference/tooltip/
export const tooltipSettings = {
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  getFillFromSprite: false, // 채우기 색상을 상속 받음
  getStrokeFromSprite: false, // out line 색상을 상속 받음
  autoTextColor: false, // 글자색을 상속 받음.
  getLabelFillFromSprite: false, // 글자 배경색을 상속 받음
};

export const tooltipBackgroundSettings = {
  fill: am5.color("#fff"),
  fillOpacity: 1,
  shadowColor: am5.color("#000000"),
  shadowBlur: 4,
  shadowOffsetX: 0,
  shadowOffsetY: 1,
  shadowOpacity: 0.25,
};
