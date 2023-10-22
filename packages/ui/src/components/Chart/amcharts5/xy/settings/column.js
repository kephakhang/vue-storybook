/**
 * column 설정
 *
 * Type: IBaseColumnSeriesSettings
 *
 * docs:
 * https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/
 *
 * reference:
 * https://www.amcharts.com/docs/v5/reference/ibasecolumnseriessettings/
 **/
export const columnSettings = {
  stacked: false,
  clustered: false,
};

/**
 * column template 설정
 *
 * Type: IRoundedRectangleSettings
 *
 * Reference: https://www.amcharts.com/docs/v5/reference/iroundedrectanglesettings/
 */
export const columnTemplateSettings = {
  width: 15,
  height: 15,
  strokeWidth: 1,
  fillOpacity: 0.3,
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  tooltipY: 0,
  templateField: "columnSettings",
};
