/**
 * basic story description
 */
export const xyChartDescription = `xy chart 의 여러 종류에 대한 description 입니다.`;

export const lineChartDescription =
  "line chart 를 설정하고 싶을 경우 lineDataBinder 를 넘겨줍니다.";

export const barChartDescription = `
For bar, you can use stacked of the columnSet props to stack the bars, and
set clustered to true to separate series of one category.

If you want to show value as percentage, set isPercent of valueAxis of
chartSet props to true and set stacked to true.

---

---

bar 에서는 columnSet props 의 stacked 를 사용하여 bar를 누적시킬 수 있고,
clustered 를 true로 하여 한 카테고리의 시리즈를 분리시킬 수 있습니다.

value를 percentage 로 보여주고 싶다면 chartSet props의 valueAxis의
isPercent를 true로 설정하고 stacked도 true로 설정하세요.
`;

export const bubbleChartDescription = `bubble chart 를 설정하고 싶을 경우 bubbleDataBinder 를 넘겨줍니다.`;

export const lineAreaChartDescription = `line area chart 를 설정하려면 lineDataBinder 에 openKey를 추가해주세요`;

export const stepLineChartDescription = `step line chart 를 설정하려면 stepLineDataBinder 를 설정해주세요.`;

export const xScrollbarDescription = `xScrollbar 를 보여주고 싶을 경우 xScrollbarSet 의 folceHidden을 force 로 설정합니다.`;

export const horizontalBarChartDescription = `
Emoldino's xy chart basically sets the x-axis as "CategoryAxis" to set Category and the y-axis as "ValueAxis" to set value.

If you want to display the chart horizontally, set the type of each axis
in reverse using chartSet Props to display it horizontally.

---

---

emoldino의 xy chart는 기본적으로 x축은 Category를 설정하는 "CategoryAxis", y축은 value를 설정하는 "ValueAxis"로 설정했습니다.

차트를 수평적으로 보여주고 싶을 경우에는 chartSet Props를 사용하여 각 축의 타입을 반대로 설정하게 되면 수평적으로 보여집니다.
`;

export const noDataDescription = `data 가 없거나 data 의 모든 value 가 0 인 경우 "No Data Available" 이 표시됩니다.`;

/**
 * event 관련 story description
 */
export const xyChartEventDescription = `xy chart 의 여러 종류에 대한 description 입니다.`;

export const columnHoverDescription = `
By passing ColumnHoverEvent props, you can create an event that occurs when a column is hovered.

Event is passed as a parameter.

---

---

ColumnHoverEvent props 를 전달하여 column 에 hover 했을 때 발생할 이벤트를 생성할 수 있습니다.

parameter 로 event 를 전달받습니다.
`;

/**
 * adapter 관련 story description
 */
export const xyChartAdapterDescription = `
xy chart 에 적용되는 adapter 에 관한 설명입니다.

adapter는 데이터에 따라서 일부항목을 처리하고 싶을때 사용합니다.
`;

export const markerRectanglesStrokeDashArrayAdapterDescription = `
데이터에 따라서 legend marker 의 테두리를 점선으로 표시하는 방법입니다.
`;

export const seriesTooltipHtmlAdapterDescription = `
---

---

props 로 seriesTooltipHTMLAdapter를 설정하면 첫번째 parameter로 target을 받아오고, 두번째 parameter로 tooltipHTML을 받아옵니다.

여기서 return을 해주는 값으로 tooltip 이 설정되게 됩니다.

여기서 tooltipHTML을 그대로 리턴하면 설정한 tooltipHTML이 전시됩니다.

target.dataItem.dataContext를 통해 개별 data에 접근하여 tooltip 을 custom 할 수 있습니다.

target.dataItem.get('valueY')로 호버한 아이템의 Y축 값 {valueY}을 얻고 커스터마이징 할 수 있습니다.
`;

/**
 * 고급사용법 story descrption
 */
export const xyChartAdvancedDescription = `xy chart를 상세하게 설정하는 방법입니다.`;

export const customLegendDescription = `
Set additional chart legends and add a story that controls the chart with additionally set legends.

Additional settings for charts with logic that operates only on that page are handled by passing props to a function called setCustom.
The additional setting of the legend of the chart containing the logic that operates only on the page is handled by passing a function called setCustomLegend as props


implementation function

- If you do a pointerover on the x-axis, it is shown in light blue.
- If you do a pointerout on the x-axis, it returns to its original state.
- If the data satisfies the condition, the x-axis is colored pink.
- Add 'abnormal detect' to legend.
- Toggles the area set to pink when clicking 'abnormal detact'.
`;

export const multipleYAxisDescription = `
If there are multiple y-axes, they can be expressed on one chart or by
vertically stacking the charts.

If you want to use multiple y-axes in the chart, props called
yAxisList are passed as an array.

Items with key axisHeaderText, extraLabelText, opposite, syncIndex, min, max and numberFormat are listed in yAxisList props.

axisHeaderText is the text to be displayed in the yAxis Header.

extraLabelText is the text to be displayed separately from the label in YAxis.

If opposite is true then display the y-axis on the right. (The default is false.)

Set the yListIndex you want to match to the syncIndex, and the grid will
Synchronized with target axis grid.

If you set the y-axes on the same side, you can stack the charts or show
the y-axes on the same side of one chart.

Set chartSet.yAxis.isStacked to true if you want to display the chart frame stacked on the y-axis. (The default is false.)

After setting the y-axis, set the yAxisListIndex value that matches the index of the yAxisList props in the dataBinder of the desired chartType and connect it.

min and max set the minimum/max value of the yAxis label.

numberFormat sets the format of the yAxis label.

---

---

y축이 여러개인 경우 한 차트에 표현하거나 차트를 수직으로 쌓아서 표현할
수 있습니다.

chart 에서 여러개의 y축을 사용하고 싶을 경우 yAxisList 라는 props 를
배열로 전달합니다.

yAxisList props 에는 axisHeaderText, extraLabelText, opposite, syncIndex, min, max, numberFormat 라는 key 를 가진 항목들을 나열합니다.

axisHeaderText 는 yAxis Header 에 표현될 text 입니다.

extraLabelText 는 YAxis 에 label 과 별개로 표현될 text 입니다.

opposite 가 true 면 y 축을 오른쪽에 표시합니다. (기본은 false 입니다.)

syncIndex 에 일치시키고자 하는 yListIndex를 설정하면 grid 가 대상 축
grid 와 동기화 됩니다.

같은 쪽에 y축을 설정할 경우 차트를 누적시키거나 한 차트의 같은쪽에서
y축을 보여줄 수 있습니다.

차트틀 y축으로 쌓아서 보여주고 싶은 경우 chartSet.yAxis.isStacked 를
true로 설정합니다. (기본은 false 입니다.)

y축의 설정이 완료되었다면 원하는 chartType 의 dataBinder 에 yAxisList
props 의 index와 일치하는 yAxisListIndex 값을 설정하여 연결합니다.

min 과 max 는 yAxis label 의 최솟값 / 최댓값을 설정합니다.

numberFormat 은 yAxis label 의 format 을 설정합니다.
`;

export const numberFormatterDescription = `
Document: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/

Reference: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/

---

---

You can set numberFormat in rootNumberFormatterSet props.

When set to "#,###.#", "," is set every three digits, and the decimal place is up to one digit.

If set to "#", the received number is displayed as it is.

"#'%'" If you want to add any character around the number, set the desired
character inside '' as follows. 

---

---

rootNumberFormatterSet props 에 numberFormat 을 설정할 수 있습니다.

shows. "#,###.#" 으로 설정할 경우 세자리 마다 "," 를 설정하고, 소수 자리는
한자리 까지 보여줍니다.

"#" 로 설정할 경우 받은 숫자를 그대로 보여줍니다.

"#'%'" 숫자 주위에 원하는 문자를 추가하고 싶은 경우 다음과 같이 '' 안에 원하는 문자를 설정합니다.
`;
export const responsiveDescription = `
Set the width and hegiht relative to the width of the viewport.

amcharts5 is a canvas structure, and responsive settings are possible.

---

---

width 와 hegiht을 viewport의 넓이를 기준으로 설정합니다.

amcharts5는 canvas 구조이며, 반응형 설정이 가능합니다.
`;
export const xyChartSetDescription = `
You can control settings such as scroll zoom and drag zoom of xyChart through xyChartSet props.

---

---

xyChartSet props 를 통하여 xyChart의 스크롤 줌 및 드래그 줌 등의 설정을 컨트롤 할 수 있습니다.
`;
export const columnSettingsDescription = `data 의 columnSettings 를 추가해서 별도의 column 디자인을 적용시킬 수 있습니다.`;
export const disconnectedLineDescription = `lineSet 의 isConnected 를 false 로 설정할 경우 data 가 null 일 때 끊어지는 line chart를 보여줄 수 있습니다.`;
