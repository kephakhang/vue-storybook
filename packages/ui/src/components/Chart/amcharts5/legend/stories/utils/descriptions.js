// basic
export const chartLegendDesciption = `chart 에서 legend 를 설정하는 기본 방법입니다.`;

export const BasicDescription = `
This component was created to be used when you want to separately show the chart legend on the screen.

---

---

화면에서 chart legend 를 별도로 보여주고 싶을 때 사용하기 위해 만든 컴포넌트 입니다.
`;
// adapters
export const legendMarkerRectanglesStrokeDashArrayAdapterDescription = `
This is a guide on the adapter that can be used when you want to use a dotted line for the border of the legend according to the data.

데이터에 따라서 범례의 테두리에 점선을 사용하고 싶을 경우 사용할 수 있는 adapter 에 대한 가이드 입니다.

Use a function called legendMarkerRectanglesStrokeDashArrayAdapter by passing it as props.

legendMarkerRectanglesStrokeDashArrayAdapter 라는 함수를 props로 넘겨 사용합니다.

The first parameter is the definition of the previously set dotted line, and the second parameter is the information about the corresponding target.

첫번째 parameter 에는 기존에 설정된 점선에 대한 정의, 두번째 parameter에는 해당하는 target에 대한 정보가 넘어옵니다.

Based on the target information, the desired target is identified and the dotted line information is returned.

target에 대한 정보를 바탕으로 원하는 target 을 구분한 후 점선 정보를 return 합니다.

Information about the dotted line is defined as an array, and in the case of [10,10], a 10px line and a 10px empty line are drawn alternately.

점선에 대한 정보는 array 로 정의하며 [10,10] 일 경우 10px 선과 10px 빈선이 교차적으로 그려집니다.
`;
