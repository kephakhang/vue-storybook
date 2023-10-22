// basic description
export const heatmapDescription = `
The story lists the minimum conditions for setting up a heatmap chart. 

First, to set up the heatmap chart, you need to pass the data as props. 

data is in the form of [ { xAxisKeyName: "string", yAxisKeyName: "string", valueKeyName: number, }, ...]. 

xAxisKeyName, yAxisKeyName, valueKeyName are not fixed names and pass the desired key. 
It is also associated with the heatmapDataBinder described later. 

Also, you need to set xAxisKey, yAxisKey, valueKey, xAxisList, yAxisList in heatmapDataBinder and pass it as props. 

xAxisKey is the item set as the key of the x axis among the items passed as data. 

yAxisKey is the item set as the key of the y axis among the items passed as data. 

valueKey is the item set as the key of value among the items passed as data. 

xAxisList lists the items you want to show on the chart in order among the items passed as the key of the x axis of data. 

yAxisList lists the items you want to show on the chart in order among the items passed as the key of the y axis of data.

---

---

해당 스토리는 heatmap chart 를 설정하기 위한 최소 조건을 나열합니다. 

첫번째로 heatmap 차트를 설정하기 위해서는 props 로 데이터를 넘겨주어야 합니다. 

data는 [ { xAxisKeyName: "string", yAxisKeyName: "string", valueKeyName: number, }, ...] 형태입니다. 

xAxisKeyName, yAxisKeyName, valueKeyName 는 고정 이름이 아니며 원하는 key 를 넘겨줍니다.

또한 뒤에 설명하는 heatmapDataBinder와 연결됩니다. 

또한 heatmapDataBinder 에 xAxisKey, yAxisKey, valueKey, xAxisList, yAxisList 를 설정하고 props 로 넘겨줘야 합니다. 

xAxisKey 는 data 로 넘긴 항목 중 x axis 의 key로 설정한 항목입니다.

yAxisKey는 data 로 넘긴 항목 중 y axis 의 key로 설정한 항목입니다.

valueKey는 data 로 넘긴 항목 중 value 의 key로 설정한 항목입니다.

xAxisList 는 data 의 x axis 의 key로 넘긴 항목 중에서 차트에 보여주고 싶은 항목을 순서대로 나열합니다.

yAxisList 는 data 의 y axis 의 key로 넘긴 항목 중에서 차트에 보여주고 싶은
항목을 순서대로 나열합니다.
`;
export const variousOptionDescription = `
As you can see, you can implement heatmaps of various shapes and functions by
combining settings, events, and adapters. 

For more details, check out the stories inside the adapters, events, and
settings categories. 

---

---


보시는 것 처럼 settings 와 event 그리고 adapter 를 조합하여 다양한 모양과 기능의 heatmap 을 구현할 수 있습니다.

자세한 내용은 adapters, events, settings 카테고리 내부의 스토리를 확인해주세요.
`;

// event description
export const columnSeriesDatavalidatedEventDescription = `
As columnSeriesDatavalidatedEvent props, an event to be operated after data validation of the heatmap column is completed.

As an example, the minimum and maximum values of the data passed in are displayed as alerts.

---

---


columnSeriesDatavalidatedEvent props로 heatmap column 의 data 유효성 검증이 끝난 후 동작할 event를 전달합니다.

예시로 넘겨받은 데이터의 최소값과 최대값을 alert로 띄워줍니다.
`;
export const columnTemplatePointeroverEventDescription = `
When hovering on heatmap column with columnSeriesDatavalidatedEvent props Define the event to act on.

As an example, the hovered column is painted black.

---

---


columnSeriesDatavalidatedEvent props로 heatmap column 에 hover 할 경우 동작할 event 를 정의합니다.

예시로 hover 된 column 을 검게 칠합니다.
`;

// adapter description
export const columnTemplateFillAdapterDescription = `
Define how to set column color according to data with columnTemplateAdatper.fill props.

For example, if the value of data does not exceed 5000, it is displayed in green, if it does not exceed 9000, it is displayed in yellow, and if it exceeds 9000, it is displayed in red.

---

---


columnTemplateAdatper.fill props로 data 에 따라서 column 색을 설정하는 방법을 정의합니다.

예시로 data 의 value 가 5000 을 넘기지 않으면 초록색, 9000을 넘기지 않으면 노란색, 9000을 넘기면 빨간색으로 보여줍니다.
`;

// settings description

// Docs: https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
// Reference: https://www.amcharts.com/docs/v5/reference/Iheatrule/
export const columnSeriesHeatRulesDescription = `
  Docs: https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/

  Reference: https://www.amcharts.com/docs/v5/reference/Iheatrule/ 

  ---

  ---
  
  min (The setting value to use if it is the lowest):

  default Value: 0xfffb77

  Values used in examples: "#fff"

  ---

  ---

  max (The setting value to use if it is the highest):

  default Value: 0xfe131a

  Value used in examples: "#000"

  ---

  ---

  Through 'columnSeriesHeatRulesSet', high and low data values can be expressed in color and size. 
  
  Set the property to be subject to the heat rule to 'key'.

  In this example, 'fill'.

  Defines how to display the properties set as keys in min and max.

  This time we've decided to adjust the 'fill', the new fill parameter, so we'll define a color.

  min is the color to display when the value is the lowest. max is the color to show at the highest value.

  Information on available properties can be found in the Reference above.

  ---

  ---

  columnSeriesHeatRulesSet 을 통해 data value 의 높고 낮음을 색상과 크기 등으로 표현할 수 있습니다.
  
  heat rule 의 대상이 될 속성을 'key'로 설정합니다.

  이 예시에서는 'fill' 입니다.
  
  min 과 max 에 key 로 설정한 속성을 어떤식으로 표시할 것 인지 정의합니다.

  이번에는 채우기 새상인 'fill'을 조정하기로 정했으므로 색상을 정의합니다.

  min은 제일 낮은 값일 때 보여줄 색상. max는 가장 높은 값일 때 보여줄 색상입니다.

  사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const columnSeriesSettingsDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/columnseries/

---

---

stroke (Border color of heatmap cells):

default Value: "#fff"

Values used in examples: "#000"

---

---

You can define overall heatmap columns through columnSeriesSet props.

Information on available properties can be found in the Reference above.

---

---

columnSeriesSet props 를 통해 heatmap 칸들에 대한 전반적인 정의를 할 수
있습니다.

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const columnTemplateSettingsDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/roundedrectangle/

---

---

tooltipText (Tooltip text to be displayed when hovering over the cell):

default Value: ""

Values used in examples: "{value}"

---

---

stroke (cell border color):

default Value: "#fff"

Values used in examples: "#ddd"

---

---

strokeWidth (Cell border width (px)):

default Value: 1

Values used in examples: 2

---

---

width(the width of the column):

default Value: 100%

Values used in examples: 70%

---

---

height (the height of the column):

default Value: 100%

Values used in examples: 70%

---

---

You can define settings for each column by passing the columnTemplateSet as props.

In this example, we set the tooltip(tooltipText), border(stroke, strokeWidth), width, and height.

Information on available properties can be found in the Reference above.

---

---

columnTemplateSet 을 props 로 전달하여 각 column 에 대한 설정을 정의할
수 있습니다.

이번 예시에서는 tooltip 과 테두리, 넓이, 높이 등을 설정했습니다.

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const HeatLegendDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/heatlegend/#Private_settings

---

---

startColor ():

default Value: 0xfffb77

Values used in examples: same

---

---

endColor ():

default Value: 0xfe131a

Values used in examples: same

---

---

stepCount ():

default Value: 1

Values used in examples: 10

---

---

forceHidden ():

default Value: true

Values used in examples: false

---

---

You can set heatLegend by passing heatLegendSet as props.

Since the default value of forceHidden is set to true, you must set it to false to display heatLegend.

In this example, the heatLegend is set horizontally, the start color is set to "0xfffb77" and the end color is set to "0xfe131a".

And set the start letter to "Lowest" and the end letter to "Highest".

And you can use stepCount to show the color change step by step.

If you want to show as a gradient, you can leave this setting unset or set it to 1.

Information on available properties can be found in the Reference above.

---

---

heatLegendSet 을 props 로 전달하여 heatLegend 를 설정할 수 있습니다.

forceHidden 의 기본값이 true 로 설정되어 있으므로 false 로 설정해주셔야 heatLegend 가 표시됩니다.

이 예시에서는 heatLegend 를 수평으로 설정하고, 시작 컬러는 "0xfffb77", 끝 컬러는 "0xfe131a"으로 설정했습니다.

그리고 시작 글자는 "Lowest", 끝 글자는 "Highest" 로 설정했습니다.

그리고 stepCount 를 색깔 변화를 단계별로 보여줄 수 있습니다.

그라데이션으로 보여주고 싶을 경우 이 설정을 설정하지 않거나 1로 설정하면 됩니다.

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const xAxisRendererGridTemplateDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/grid/

---

---

visible: (Whether or not to show a grid related to the x-axis):

default Value: false

Values used in examples: true

---

---

I set the default to visible false. 

If you want to show the grid, set visible to true.

Information on available properties can be found in the Reference above.

---

---

기본을 visible false 로 해놓았습니다. 

grid 를 보여주고 싶을 경우 visible을 true 로 설정해주세요.

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const xAxisRendererSettingsDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/axisrendererx/

---

---

minGridDistance: (The minimum distance between grid lines in pixels.):

default Value: 50

Values used in examples: 100

---

---

opposite: (If set to true the axis will be drawn on the opposite side of the plot area.):

default Value: false

Values used in examples: true

---

---

cellStartLocation: (Indicates relative position where "usable" space of the cell starts. 0 - beginning, 1 - end, or anything in-between.):

default Value: 0

Values used in examples: 0.2

---

---

cellEndLocation: (Indicates relative position where "usable" space of the cell ends. 0 - beginning, 1 - end, or anything in-between.):

default Value: 1

Values used in examples: 0.8

---

---

You can set the minimum spacing of the x-axis grid via the minGridDistance property.

The opposite property allows the x-axis to appear above or below the xy chart.

cellStartLocation and cellEndLocation allow you to specify where the cell starts and ends.

Information on available properties can be found in the Reference above.

---

---

minGridDistance 속성을 통해 x축 grid 의 최소 간격을 설정할 수 있습니다.

opposite 속성을 통해 x축을 xy 차트의 위 또는 아래에 표시할 수 있습니다.

cellStartLocation, cellEndLocation 을 통해 cell 이 시작되는 위치와 끝나는 위치를 지정할 수 있습니다.

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const xAxisSettingsDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/categoryaxis/

---

---

Information on available properties can be found in the Reference above.

---

---

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const xyChartSettingsDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/xychart/

Information on available properties can be found in the Reference above.

---

---

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const yAxisRendererGridTemplateDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/grid/

---

---

visible: (Whether or not to show a grid related to the x-axis):

default Value: false

Values used in examples: true

---

---

I set the default to visible false.

If you want to show the grid, set visible to true.

Information on available properties can be found in the Reference above.

---

---

기본을 visible false 로 해놓았습니다. 

grid 를 보여주고 싶을 경우 visible을 true 로 설정해주세요.

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const yAxisRendererSettingsDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/axisrenderery/

---

---

minGridDistance: (The minimum distance between grid lines in pixels.):

default Value: 50

Values used in examples: 100

---

---

opposite: (If set to true the axis will be drawn on the opposite side of the plot area.):

default Value: false

Values used in examples: true

---

---

cellStartLocation: (Indicates relative position where "usable" space of the cell starts. 0 - beginning, 1 - end, or anything in-between.):

default Value: 0

Values used in examples: 0.2

---

---

cellEndLocation: (Indicates relative position where "usable" space of the cell ends. 0 - beginning, 1 - end, or anything in-between.):

default Value: 1

Values used in examples: 0.8

---

---

You can set the minimum spacing of the y-axis grid via the minGridDistance property.

opposite property allows the y-axis to appear on the left or right side of the xy chart.

cellStartLocation and cellEndLocation allow you to specify where the cell starts and ends.

Information on available properties can be found in the Reference above.

---

---

minGridDistance 속성을 통해 y축 grid 의 최소 간격을 설정할 수 있습니다.

opposite 속성을 통해 y축을 xy 차트의 왼쪽 또는 오른쪽에 표시할 수 있습니다.

cellStartLocation, cellEndLocation 을 통해 cell 이 시작되는 위치와 끝나는 위치를 지정할 수 있습니다.

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const yAxisSettingsDescription = `
Reference: https://www.amcharts.com/docs/v5/reference/categoryaxis/

---

---

Information on available properties can be found in the Reference above.

---

---

사용가능한 속성에 대한 정보는 위의 Reference 에서 확인하실 수 있습니다.
`;
export const partQualityRiskDescription = `
This is an example of the heatmap format used on the part quality risk page.

---

---

part quality risk 페이지에 사용되는 heatmap 형태에 관한 예시입니다.
`;
