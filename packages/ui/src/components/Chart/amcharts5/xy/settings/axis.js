import * as am5 from "@amcharts/amcharts5";

/**
 * axis grid 관련 설정
 *
 * - x axis grid
 * - y axis grid
 */
export const xAxisGridSettings = {
  strokeWidth: 1,
  strokeOpacity: 0.1,
  location: 0,
};

export const yAxisGridSettings = {
  strokeWidth: 1,
  strokeOpacity: 0.1,
  location: 0,
};

/**
 * axis renderer 관련 설정
 *
 * - x axis renderer
 * - y axis renderer
 */
export const xAxisRendererSettings = {
  minGridDistance: 15,
};

export const yAxisRendererSettings = {
  minGridDistance: 30,
  inside: false,
};

/**
 * axis header 관련 설정
 *
 * - y axis header background
 */
export const yAxisHeaderBackgroundSettings = {
  fill: am5.color("#fff"),
  fillOpacity: 1,
  stroke: am5.color("#4b4b4b"),
  strokeWidth: 1,
  strokeOpacity: 0,
};

/**
 * axis 관련 설정
 *
 * y axis
 */
export const yAxisSettings = {
  marginTop: 15,
};
