import * as am5 from "@amcharts/amcharts5";

// Docs: https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
// Reference: https://www.amcharts.com/docs/v5/reference/Iheatrule/
export const columnSeriesHeatRulesSettings = {
  dataField: "", // 항목의 값을 결정할 때 사용할 데이터 필드. (string)
  key: "fill", // 설정할 설정 키. (undefined | string)
  min: am5.color(0xfffb77), // 가장 낮은 값인 경우 사용할 설정 값. (any)
  max: am5.color(0xfe131a), // 가장 높은 값인 경우 사용할 설정 값. (any)
  logarithmic: false, // 중간 설정 값을 계산할 때 대수 눈금 사용. (undefined | false (default) | true)
  maxValue: undefined, // 사용자 정의 최대 값. (undefined | number)
  minValue: undefined, // 사용자 정의 최소 값. (undefined | number)
};

// https://www.amcharts.com/docs/v5/reference/columnseries/
export const columnSeriesSettings = {
  /**
   * If set to true, series will calculate aggregate values, e.g. change percent, high, low, etc.

Do not enable unless you are using such aggregate values in tooltips, display data fields, heat rules, or similar
   */
  calculateAggregates: true,
  stroke: am5.color("#fff"),
  clustered: false,
  categoryXField: "",
  categoryYField: "",
  valueField: "",
};

// https://www.amcharts.com/docs/v5/reference/roundedrectangle/
export const columnTemplateSettings = {
  tooltipText: "",
  strokeWidth: 1,
  stroke: am5.color("#9d9d9d"),
  width: am5.percent(90),
  height: am5.percent(80),
};
