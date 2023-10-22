<script>
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import { merge } from "~/utils/merge";

import {
  defineComponent,
  getCurrentInstance,
  watch,
  toRef,
  ref,
  computed,
  onMounted,
} from "@vue/composition-api";

/**
 * component 를 import 합니다.
 */
import noChartData from "~/components/Chart/amcharts5/no-data/index.vue";

/**
 * 미리 정의해둔 차트 관련 설정입니다.
 */
import {
  pieChartSettings,
  pieLabelSettings,
  pieSeriesSettings,
  pieSliceSettings,
  pieTickSettings,
} from "~/components/Chart/amcharts5/pie/settings";
import {
  legendSettings,
  legendLabelSettings,
  legendMarkerSettings,
  legendMarkerRectangleSettings,
} from "~/components/Chart/amcharts5/legend/settings/legend";
import {
  tooltipSettings,
  tooltipBackgroundSettings,
} from "~/components/Chart/amcharts5/settings/tooltip";

export default defineComponent({
  name: "PieChart",
  components: {
    "no-chart-data": noChartData,
  },
  props: {
    pieChartSet: Object,
    pieLabelSet: Object,
    pieSeriesSet: Object,
    pieSliceSet: Object,
    pieTickSet: Object,
    tooltipSet: Object,
    tooltipBackgroundSet: Object,
    legendSet: Object,
    legendLabelSet: Object,
    legendMarkerSet: Object,
    legendMarkerRectangleSet: Object,
    legendData: Array,
    legendMarkerRectanglesStrokeDashArrayAdapter: Function,
    seriesTooltipHTMLAdapter: Function,
    sliceEvent: Object,
    sliceClickEvent: Function, // Deprecated
    sliceHoverEvent: Function, // Deprecated
    sliceUnhoverEvent: Function, // Deprecated
    innerContentClickEvent: Function, // Deprecated
    logTest: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "displayName",
    },
    valueName: {
      type: String,
      default: "value",
    },
    chartSet: Object,
    styleProps: {
      type: String,
      default: "width: 300px; height: 300px",
    },
    data: {
      type: Array,
      default: () => [],
    },
    pieDataBinder: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const pieVueInstance = getCurrentInstance();
    const pieChartDiv = ref(null);
    /**
     * data 관련 설정입니다.
     */
    const pieContainer = ref("");
    const tooltip = ref("");
    const innerContent = ref("");
    const root = ref("");
    const legend = ref("");
    const legendContainer = ref("");
    const chart = ref("");
    const pieSeries = ref("");
    const chartSetData = ref({
      useTheme: true,
      numberFormat: "#,###",
      colors: ["#BCE2C7", "#4EBCD5", "#1A2281", "#86a873", "#bb9f06"],
      root: {
        container: {
          layout: "verticalLayout",
        },
      },
      innerContent: {
        x: 50,
        y: 50,
        centerX: 50,
        centerY: 50,
        html: "",
      },
    });
    /**
     * props 관련 내용입니다.
     */
    const setCustomLegend = toRef(props, "setCustomLegend");
    const pieChartSet = toRef(props, "pieChartSet");
    const pieLabelSet = toRef(props, "pieLabelSet");
    const pieSeriesSet = toRef(props, "pieSeriesSet");
    const pieSliceSet = toRef(props, "pieSliceSet");
    const pieTickSet = toRef(props, "pieTickSet");
    const tooltipSet = toRef(props, "tooltipSet");
    const tooltipBackgroundSet = toRef(props, "tooltipBackgroundSet");
    const legendSet = toRef(props, "legendSet");
    const legendLabelSet = toRef(props, "legendLabelSet");
    const legendMarkerSet = toRef(props, "legendMarkerSet");
    const legendMarkerRectangleSet = toRef(props, "legendMarkerRectangleSet");
    const legendData = toRef(props, "legendData");
    const legendMarkerRectanglesStrokeDashArrayAdapter = toRef(
      props,
      "legendMarkerRectanglesStrokeDashArrayAdapter"
    );
    const seriesTooltipHTMLAdapter = toRef(props, "seriesTooltipHTMLAdapter");
    const sliceEvent = toRef(props, "sliceEvent");
    const sliceClickEvent = toRef(props, "sliceClickEvent"); // Deprecated
    const sliceHoverEvent = toRef(props, "sliceHoverEvent"); // Deprecated
    const sliceUnhoverEvent = toRef(props, "sliceUnhoverEvent"); // Deprecated
    const innerContentClickEvent = toRef(props, "innerContentClickEvent"); // Deprecated
    const logTest = toRef(props, "logTest");
    const category = toRef(props, "category");
    const valueName = toRef(props, "valueName");
    const chartSet = toRef(props, "chartSet");
    const styleProps = toRef(props, "styleProps");
    const data = toRef(props, "data");
    const pieDataBinder = toRef(props, "pieDataBinder");

    /**
     * chart 를 생성합니다.
     *
     */
    const createChart = () => {
      logTest.value && console.log("createChart");

      if (data.value.length > 0) {
        setRoot();
        setTheme();
        setTooltip();
        setRootContainer();
        setPieContainer();
        setInnerContent();
        setPieChart();
        setPieSeries();
        createLegend();
        setNumberFormatter();
        pieSeries.value.appear(1000, 100); // appear chart
      }
    };

    /**
     * root 를 설정합니다.
     */
    const setRoot = () => {
      if (!root.value || (root.value && root.value.isDisposed())) {
        root.value = am5.Root.new(pieChartDiv.value, {});
      }
    };

    /**
     * theme 를 설정합니다.
     */
    const setTheme = () => {
      if (chartSetComputed.value.useTheme) {
        root.value.setThemes([am5themes_Animated.new(root.value)]);
      }
    };

    /**
     * tooltip을 설정합니다.
     */
    const setTooltip = () => {
      if (!tooltip.value || (tooltip.value && tooltip.value.isDisposed())) {
        tooltip.value = am5.Tooltip.new(root.value, {
          ...tooltipSetComputed.value,
        });
      } else {
        tooltip.value.setAll({ ...tooltipSetComputed.value });
      }
      tooltip.value
        .get("background")
        .setAll({ ...tooltipBackgroundSetComputed.value });
    };

    /**
     * root container를 설정합니다.
     */
    const setRootContainer = () => {
      logTest.value && console.log("setRootContainer");

      root.value.container.set(
        "layout",
        root.value[chartSetComputed.value.root.container.layout]
      );
    };

    /**
     * 원형모양을 담을 pie container 를 설정합니다.
     */
    const setPieContainer = () => {
      logTest.value && console.log("setPieContainer");

      if (!pieContainer.value) {
        pieContainer.value = root.value.container.children.push(
          am5.Container.new(root.value, {
            width: am5.percent(100),
            height: am5.percent(100),
          })
        );
      } else {
        pieContainer.value.setAll({
          width: am5.percent(100),
          height: am5.percent(100),
        });
      }
    };

    /**
     * pie chart 안에 보여줄 inner content를 설정합니다.
     */
    const setInnerContent = () => {
      if (!innerContent.value) {
        innerContent.value = pieContainer.value.children.unshift(
          am5.Label.new(root.value, {})
        );
      }
      innerContent.value.setAll({
        x: am5.percent(chartSetComputed.value.innerContent.x),
        y: am5.percent(chartSetComputed.value.innerContent.y),
        centerX: am5.percent(chartSetComputed.value.innerContent.centerX),
        centerY: am5.percent(chartSetComputed.value.innerContent.centerY),
        html: chartSetComputed.value.innerContent.html,
      });

      // remove click event
      if (innerContent.value.events.has("click")) {
        innerContent.value.events.removeType("click");
      }

      // add click event
      if (innerContentClickEvent.value) {
        innerContent.value.events.on("click", (event) =>
          innerContentClickEvent.value(event, pieVueInstance)
        );
      } else {
        innerContent.value.events.on("click", () => {
          console.log("innerContent event none");
        });
      }

      innerContent.value.toFront();
    };

    /**
     * pie chart의 기본 형태를 설정합니다.
     */
    const setPieChart = () => {
      if (!chart.value) {
        chart.value = pieContainer.value.children.push(
          am5percent.PieChart.new(root.value, { ...pieChartSetComputed.value })
        );
      } else {
        chart.value.setAll({ ...pieChartSetComputed.value });
      }
    };

    /**
     * pie series 를 설정하는 함수입니다.
     */
    const setPieSeries = () => {
      setSeries();
      setSeriesColors();
      setSeriesSlices();
      setSeriesLabels();
      setSeriesTicks();
      pieSeries.value.data.setAll(computedPieData.value);
    };

    /**
     * pie series 를 설정합니다.
     */
    const setSeries = () => {
      logTest.value && console.log("setSeries");

      // tooltipHTML 이나 adapter 가 없을 경우 tooltip을 보여주지 않는 것을 기본으로 합니다.
      if (
        !pieSliceSetComputed.value.tooltipHTML &&
        !seriesTooltipHTMLAdapter.value
      ) {
        tooltip.value.set("forceHidden", true);
      } else {
        tooltip.value.set("forceHidden", false);
      }

      const pieSeriesSettings = {
        ...pieSeriesSetComputed.value,
        name: "pieSeries",
        categoryField: category.value,
        valueField: valueName.value,
        tooltip: tooltip.value,
      };

      if (!pieSeries.value) {
        pieSeries.value = chart.value.series.push(
          am5percent.PieSeries.new(root.value, { ...pieSeriesSettings })
        );
      } else {
        pieSeries.value.setAll({ ...pieSeriesSettings });
      }
    };

    /**
     * pie series 의 color theme 를 설정합니다.
     */
    const setSeriesColors = () => {
      const colors = chartSetComputed.value.colors.map((item) => {
        return am5.color(item);
      });
      pieSeries.value.get("colors").set("colors", colors);
    };

    /**
     * pie series 의 slice 를 정의합니다.
     */
    const setSeriesSlices = () => {
      pieSeries.value.slices.template.setAll({
        ...pieSliceSetComputed.value,
      });

      setSliceStateStyle();
      setSliceAdapter();
      setSliceEvent();
      pieSeries.value.toFront();
    };

    /**
     * pie slice를 클릭했을 때 pull out 되거나 확대되지 않도록 style 을 수정합니다.
     */
    const setSliceStateStyle = () => {
      // hover 시 확대되지 않도록 처리.
      pieSeries.value.slices.template.states.create("hover", {
        scale: 1,
      });
      pieSeries.value.slices.template.states.create("hoverActive", {
        scale: 1,
      });
      // slice 클릭했을 경우 pull out 하지 않도록 처리
      pieSeries.value.slices.template.states.create("active", {
        shiftRadius: 0,
      });
    };

    /**
     * pie slice 의 adapter 를 설정합니다.
     */
    // series tooltip html adapter
    const setSliceAdapter = () => {
      if (seriesTooltipHTMLAdapter.value) {
        pieSeries.value.slices.template.adapters.add(
          "tooltipHTML",
          (tooltipHTML, target) => {
            return seriesTooltipHTMLAdapter.value(tooltipHTML, target);
          }
        );
      }
    };

    /**
     * pie slice 의 이벤트를 설정합니다.
     */
    const setSliceEvent = () => {
      // set pie slice event
      if (sliceEvent.value) {
        Object.keys(sliceEvent.value).map((key) => {
          const eventName = key;
          const sliceEventHandler = sliceEvent.value[eventName];
          // remove slice event
          if (pieSeries.value.slices.template.events.has(eventName)) {
            pieSeries.value.slices.template.events.removeType(eventName);
          }
          // add slice event
          pieSeries.value.slices.template.events.on(eventName, (event) => {
            sliceEventHandler(event, pieVueInstance);
          });
        });
      }

      /**
       * @deprecated
       * event parameter 형식을 {eventName: eventFunction} 형태로 바꿈.
       * before: :slice-hover-event="sliceHoverEvent"
       * after: :slice-events="{pointerover: sliceHoverEvent}"
       */

      /**
       * @deprecated
       */
      if (pieSeries.value.slices.template.events.has("click")) {
        pieSeries.value.slices.template.events.removeType("click");
      }
      /**
       * @deprecated
       */
      if (sliceClickEvent.value) {
        pieSeries.value.slices.template.events.on("click", (event) => {
          sliceClickEvent.value(event, pieVueInstance);
        });
      }
      /**
       * @deprecated
       */
      if (sliceHoverEvent.value) {
        pieSeries.value.slices.template.events.on("pointerover", (event) => {
          sliceHoverEvent.value(event, pieVueInstance);
        });
      }
      /**
       * @deprecated
       */
      if (sliceUnhoverEvent.value) {
        pieSeries.value.slices.template.events.on("pointerout", (event) => {
          sliceUnhoverEvent.value(event, pieVueInstance);
        });
      }
    };

    /**
     * pie series 의 label 을 설정합니다.
     */
    const setSeriesLabels = () => {
      logTest.value && console.log("setSeriesLabels");
      pieSeries.value.labels.template.setAll({
        ...pieLabelSetComputed.value,
      });
    };

    /**
     * pie series 의 눈금을 설정합니다.
     */
    const setSeriesTicks = () => {
      logTest.value && console.log("setSeriesTicks");
      pieSeries.value.ticks.template.setAll({
        ...pieTickSetComputed.value,
      });
    };

    /**
     * legend 를 설정하는 함수들입니다.
     */
    const createLegend = () => {
      logTest.value && console.log("createLegend");

      setLegendContainer();
      setLegend();

      legend.value.data.setAll(
        legendData.value ? legendData.value : pieSeries.value.dataItems
      );
    };

    /**
     * legend 의 기본 형태를 설정합니다.
     */
    const setLegend = () => {
      if (!legend.value || (legend.value && legend.value.isDisposed())) {
        legend.value = legendContainer.value.children.push(
          am5.Legend.new(root.value, { ...legendSetComputed.value })
        );
      } else {
        legend.value.setAll({ ...legendSetComputed.value });
      }

      setLegendLabel();
      setLegendMarker();
      setLegendMarkerRectangles();
      setLegendValueLabel();
      setLegendItemContainer();

      if (setCustomLegend.value) {
        setCustomLegend.value(am5, pieVueInstance);
      }
    };

    /**
     * legend label 을 설정합니다.
     */
    const setLegendLabel = () => {
      legend.value.labels.template.setAll({ ...legendLabelSetComputed.value });
    };

    /**
     * legend marker 를 설정합니다.
     */
    const setLegendMarker = () => {
      legend.value.markers.template.setAll({
        ...legendMarkerSetComputed.value,
      });
    };

    /**
     * legend marker rectangle 을 설정합니다.
     */
    const setLegendMarkerRectangles = () => {
      legend.value.markerRectangles.template.setAll({
        ...legendMarkerRectangleSetComputed.value,
      });
      setLegendMarkerRectanglesAdapter();
    };

    /**
     * legend marker rectangle adapter 를 설정합니다.
     */
    // TODO(emldino-woojin): strokeDasharray 고정값이 아닌 동적인 eventName을 받아서 처리할 수 있도록 수정
    const setLegendMarkerRectanglesAdapter = () => {
      if (legendMarkerRectanglesStrokeDashArrayAdapter.value) {
        legend.value.markerRectangles.template.adapters.add(
          "strokeDasharray",
          (strokeDasharray, target) => {
            return legendMarkerRectanglesStrokeDashArrayAdapter.value(
              strokeDasharray,
              target
            );
          }
        );
      }
    };

    /**
     * 기본적으로 차지하는 legend value label 공간을 없애서 불필요 공간이 사라지도록 처리)
     */
    const setLegendValueLabel = () => {
      legend.value.valueLabels.template.set("forceHidden", true);
    };

    /**
     * legend item container 를 설정합니다.
     */
    const setLegendItemContainer = () => {
      // legend hover event disabled
      legend.value.itemContainers.template.setup = (item) => {
        item.events.disableType("pointerover");
      };
    };

    /**
     * legend 를 담는 container 를 설정합니다.
     */
    const setLegendContainer = () => {
      if (
        !legendContainer.value ||
        (legendContainer.value && legendContainer.value?.isDisposed())
      ) {
        legendContainer.value = root.value.container.children.push(
          am5.Container.new(root.value, {})
        );
      }
      setLegendContainerLayout();
    };

    /**
     * legend container 의 layout 을 설정합니다.
     * root container 의 layout 설정에 따라서 legend 를 아래에 보여줄지 오른쪽에 보여줄 지 정의합니다.
     */
    const setLegendContainerLayout = () => {
      const layout = chartSetComputed.value.root.container.layout;
      legendContainer.value.set(
        "width",
        layout === "verticalLayout" ? am5.percent(100) : null
      );
      legendContainer.value.set(
        "height",
        layout === "verticalLayout" ? null : am5.percent(100)
      );
    };

    /**
     * chart 에 전역적으로 적용할 numberFormatter 를 설정합니다.
     */
    const setNumberFormatter = () => {
      root.value.numberFormatter.setAll({
        numberFormat: chartSetComputed.value.numberFormat,
      });
    };

    /**
     * pieDataBinder 로 넘겨받은 값과 data 를 조합해서 pie chart 에 적용할 데이터 형식으로 변환합니다.
     * example format: [{displayName: 'Processing Time', key: 'key1', value: 10}, ...]
     */
    const computedPieData = computed(() => {
      const result = [];
      pieDataBinder.value.map((item) => {
        result.push({ ...item, value: data.value[0][item.key] });
      });
      console.log("result: ", result);
      return result;
    });

    /**
     * pie chart에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 pieChartSettings 와 props 로 전달받은 pieChartSet 을 합칩니다.
     */
    const pieChartSetComputed = computed(() => {
      return Object.assign({}, pieChartSettings, pieChartSet.value);
    });

    /**
     * pie chart 의 label 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 pieLabelSettings 와 props로 전달받은 pieLabelSet 을 합칩니다.
     */
    const pieLabelSetComputed = computed(() => {
      return Object.assign({}, pieLabelSettings, pieLabelSet.value);
    });

    /**
     * pie series 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 pieSeriesSettings 와 props로 전달받은 pieSeriesSet을 합칩니다.
     */
    const pieSeriesSetComputed = computed(() => {
      return Object.assign({}, pieSeriesSettings, pieSeriesSet.value);
    });

    /**
     * pie chart 의 slice 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 pieSliceSettings 와 props로 전달받은 pieSliceSet 을 합칩니다.
     */
    const pieSliceSetComputed = computed(() => {
      return Object.assign({}, pieSliceSettings, pieSliceSet.value);
    });

    /**
     * pie chart 의 tick 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 pieTickSettings 와 props로 전달받은 pieTickSet 을 합칩니다.
     */
    const pieTickSetComputed = computed(() => {
      return Object.assign({}, pieTickSettings, pieTickSet.value);
    });

    /**
     * tooltip 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 tooltipSettings 와 props로 전달받은 tooltipSet 을 합칩니다.
     */
    const tooltipSetComputed = computed(() => {
      return Object.assign({}, tooltipSettings, tooltipSet.value);
    });

    /**
     * tooltip 배경에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 tooltipBackgroundSettings와 pros로 전달받은 tooltipBackgroundSet 을 합칩니다.
     */
    const tooltipBackgroundSetComputed = computed(() => {
      return Object.assign(
        {},
        tooltipBackgroundSettings,
        tooltipBackgroundSet.value
      );
    });

    /**
     * legend 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 legendSettings 와 props로 전달받은 legendSet 을 합칩니다.
     */
    const legendSetComputed = computed(() => {
      const layout = { layout: root.value.gridLayout };
      return Object.assign({}, legendSettings, legendSet.value, layout);
    });

    /**
     * legend 의 label 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 legendLabelSettings 와 props로 전달받은 legendLabelSet을 합칩니다.
     */
    const legendLabelSetComputed = computed(() => {
      return Object.assign({}, legendLabelSettings, legendLabelSet.value);
    });

    /**
     * legend marker 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 legendMarkerSettings 와 props로 전달받은 legendMarkerSet 을 합칩니다.
     */
    const legendMarkerSetComputed = computed(() => {
      return Object.assign({}, legendMarkerSettings, legendMarkerSet.value);
    });

    /**
     * legend marker 의 rectangle 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 legendMarkerRectangleSettings 와 props로 전달받은 legendMarkerRectangleSet을 합칩니다.
     */
    const legendMarkerRectangleSetComputed = computed(() => {
      return Object.assign(
        {},
        legendMarkerRectangleSettings,
        legendMarkerRectangleSet.value
      );
    });

    /**
     * 차트에 정의할 기본적인 설정을 계산합니다.
     *
     * 미리 정의한 chartSetData 와 props로 전달받은 chartSet 을 합칩니다.
     */
    const chartSetComputed = computed(() => {
      const mergeItem = merge(chartSetData.value, chartSet.value);
      if (chartSet.value?.colors) {
        mergeItem.colors = chartSet.value.colors;
      }
      return Object.assign({}, mergeItem);
    });

    /**
     * data의 값들이 전부 존재하지 않는지 여부를 확인합니다.
     */
    const allNoValue = computed(() => {
      const dataValues = Object.values(data.value[0]);
      return dataValues.every((element) => !element);
    });

    /**
     * chart 의 설정값이 변경되면 차트를 새로 그립니다.
     */
    watch(
      [
        tooltipSet,
        tooltipBackgroundSet,
        legendSet,
        legendLabelSet,
        legendMarkerSet,
        legendMarkerRectangleSet,
        chartSet,
        pieChartSet,
        pieLabelSet,
        pieSeriesSet,
        pieSliceSet,
        pieTickSet,
        styleProps,
        pieDataBinder,
        data,
      ],
      () => {
        createChart();
      }
    );

    /**
     * mount 시 license 를 추가하고 차트를 생성합니다.
     */
    onMounted(() => {
      am5.addLicense("AM5C392708372");
      createChart();
    });

    return {
      /**
       * html element 관련 내용입니다.
       */
      pieChartDiv,
      /**
       * data 관련 내용입니다.
       */
      tooltip,
      innerContent,
      root,
      legend,
      legendContainer,
      chart,
      pieSeries,
      chartSetData,
      /**
       * methods 관련 내용입니다.
       */
      setTooltip,
      setRootContainer,
      setPieContainer,
      setInnerContent,
      setPieChart,
      setPieSeries,
      setSeries,
      setSeriesColors,
      setSeriesSlices,
      setSeriesLabels,
      setSeriesTicks,
      createLegend,
      setLegendContainer,
      setLegendContainerLayout,
      setLegendMarkerRectanglesAdapter,
      setNumberFormatter,
      /**
       * computed 관련 내용입니다.
       */
      computedPieData,
      pieChartSetComputed,
      pieLabelSetComputed,
      pieSeriesSetComputed,
      pieSliceSetComputed,
      pieTickSetComputed,
      tooltipSetComputed,
      tooltipBackgroundSetComputed,
      legendSetComputed,
      legendLabelSetComputed,
      legendMarkerSetComputed,
      legendMarkerRectangleSetComputed,
      chartSetComputed,
      allNoValue,
    };
  },
});
</script>

<template>
  <div>
    <!-- data 가 없거나 사용가능한 데이터가 없을 경우 보여줄 컴포넌트 입니다. -->
    <no-chart-data
      v-show="data.length === 0 || allNoValue"
      :style="styleProps"
    ></no-chart-data>
    <!-- pie chart -->
    <div
      v-show="data.length > 0 && !allNoValue"
      ref="pieChartDiv"
      :style="styleProps"
    ></div>
  </div>
</template>
