import * as am5 from "@amcharts/amcharts5";

const html = String.raw;

/**
 * Part Quality Risk column tooltipHTML adapter 설정 예시입니다.
 * @param {*} tooltipText
 * @param {*} target
 */
export const setPqrTooltip = (tooltipText, target) => {
  const data = target.dataItem.dataContext;

  let riskColor = "";
  let riskText = "";
  let riskProductionText = "";

  // 조건 임의 설정.
  if (data.value < 30) {
    riskColor = "#E34537";
    riskText = "High Risk";
    riskProductionText = "Production during warm-up time";
  } else if (data.value >= 30 && data.value < 70) {
    riskColor = "#F7CC57";
    riskText = "Medium Risk";
    riskProductionText = "Poduction with unstable cycle time";
  } else if (data.value > 70) {
    riskColor = "#41CE77";
    riskText = "Low Risk";
    riskProductionText = "Stable Production";
  }

  return html`
    <div
      style="min-width: 252px; padding: 10px; font-size: 15px; line-height: 25px;"
    >
      <div
        style="display: flex; justify-content: space-between; align-items: center; border-bottom: solid 1px #ddd; padding-bottom: 10px; margin-bottom: 10px;"
      >
        <div style="font-weight: bold;">year-${data.yKey}</div>
        <div>${data.xKey}</div>
      </div>

      <div
        style="display: flex; justify-content: space-between; align-items: center;"
      >
        <div>Parts Produced</div>
        <div>${data.value} parts</div>
      </div>

      <div style="display: flex; align-items: center;">
        <div
          style="width: 13px; height: 13px; background-color: ${riskColor}; border-radius: 3px;"
        ></div>
        <div style="margin-left: 5px;">${riskText}</div>
      </div>

      <div>${riskProductionText}</div>
    </div>
  `;
};

/**
 * heatmap column 의 data 유효성 검증이 끝난 후 동작할 event를 정의합니다.
 * @param {*} fill
 * @param {*} target
 */
export const changeColumnFill = (fill, target) => {
  if (target.dataItem.dataContext.value < 5000) {
    return am5.color("#41CE77");
  } else if (target.dataItem.dataContext.value < 9000) {
    return am5.color("#F7CC57");
  } else {
    return am5.color("#E34537");
  }
};

/**
 * heatmap column 의 data 유효성 검증이 끝난 후 동작할 event를 정의합니다.
 * @param {*} columnSeries
 * @param {*} heatLegend
 */
export const columnSeriesDatavalidatedEvent = ({
  columnSeries,
  heatLegend,
}) => {
  heatLegend.set("startValue", columnSeries.getPrivate("valueLow"));
  heatLegend.set("endValue", columnSeries.getPrivate("valueHigh"));
};

/**
 * heatmap column 에 hover 할 경우 동작할 event 를 정의합니다.
 * @param {*} event
 * @param {*} heatLegend
 */
export const columnTemplatePointeroverEvent = ({ event, heatLegend }) => {
  let dataItem = event.target.dataItem;
  if (dataItem) {
    heatLegend.showValue(dataItem.get("value", 0));
  }
};

/**
 * column Series 의 최소 값과 최대값을 반환합니다.
 * @param {*} columnSeries
 */
export const getMinMax = ({ columnSeries }) => {
  const min = columnSeries.getPrivate("valueLow");
  const max = columnSeries.getPrivate("valueHigh");
  console.log("min: ", min);
  console.log("max: ", max);
  // return { min, max };
};

/**
 * hover target 을 검게 칠합니다.
 * @param {*} event
 */
export const paintColumnBlack = ({ event }) => {
  event.target.set("fill", am5.color("#000"));
};
