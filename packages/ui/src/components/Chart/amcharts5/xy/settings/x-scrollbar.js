import * as am5 from "@amcharts/amcharts5";

/**
 * scrollbar 관련 설정
 */

export const xScrollbarSettings = {
  forceHidden: true,
  orientation: "horizontal",
  start: 0,
  end: 1,
  height: 50,
};

export const xScrollbarBackgroundSettings = {
  fill: am5.color("#000"),
  fillOpacity: 0.05,
  cornerRadiusTL: 10,
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusBR: 10,
};

export const xScrollbarStartGripSettings = {
  visible: false,
  scale: 0.9,
};

export const xScrollbarEndGripSettings = {
  visible: false,
  scale: 0.9,
};

export const xScrollbarThumbSettings = {
  fill: am5.color("#000"),
  fillOpacity: 0.05,
};
