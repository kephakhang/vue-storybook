<template>
  <div>
    <!-- overall xy chart -->
    <!-- TODO(emoldino-woojin): Annotation due to overall xy chart error. Will be uncommented in future rework  -->
    <!-- :style-props="`width: 100%; height: ${Number(xScrollbarSetComputed.height) + 40}px`" -->
    <!-- <xy-chart
      ref="defaultXYChart"
      :data-start-point="dataStartPoint"
      :data-end-point="dataEndPoint"
      :set-data-start-point="setDataStartPoint"
      :set-data-end-point="setDataEndPoint"
      :time-scale="timeScale"
      :style-props="`width: 100%; height: 110px`"
      :key="1000"
      :chart-set="overallChartSetComputed"
      :bar-set="barSetComputed"
      :bubble-set="bubbleSetComputed"
      :line-set="lineSetComputed"
      :candlestick-set="candlestickSetComputed"
      :legend-set="overallLegendSetComputed"
      :x-scrollbar-set="xScrollbarSetComputed"
      :set-selection-min="setSelectionMin"
      :set-selection-max="setSelectionMax"
      :selection-min="selectionMin"
      :selection-max="selectionMax"
      :pan-handler="overallPanHandler"
      :chart-item-click-handler="chartItemClickHandler"
      :data="overallData"
      :category="category"
      :bubble-data-binder="bubbleDataBinder"
      :line-data-binder="lineDataBinder"
      :bar-data-binder="barDataBinder"
      :candlestick-data-binder="candlestickDataBinder"
      :axis-data-binder="axisDataBinder"
      :x-scrollbar-x-axis-label-text-adapter="xScrollbarXAxisLabelTextAdapter"
    ></xy-chart> -->
    <!-- default xy chart -->
    <!-- <xy-chart
      ref="overallXYChart"
      :data-start-point="dataStartPoint"
      :data-end-point="dataEndPoint"
      :set-data-start-point="setDataStartPoint"
      :set-data-end-point="setDataEndPoint"
      :time-scale="timeScale"
      :key="2000"
      :chart-set="defaultChartSetComputed"
      :get-wheel-cursor-position-x="getWheelCursorPositionX"
      :zoom-handler="defaultZoomHandler"
      :pan-handler="defaultPanHandler"
      :bar-set="barSetComputed"
      :bubble-set="bubbleSetComputed"
      :line-set="lineSetComputed"
      :candlestick-set="candlestickSetComputed"
      :legend-set="legendSetComputed"
      :style-props="styleProps"
      :set-selection-min="setSelectionMin"
      :set-selection-max="setSelectionMax"
      :selection-min="selectionMin"
      :selection-max="selectionMax"
      :chart-item-click-handler="chartItemClickHandler"
      :data="defaultData"
      :category="category"
      :bubble-data-binder="bubbleDataBinder"
      :line-data-binder="lineDataBinder"
      :bar-data-binder="barDataBinder"
      :candlestick-data-binder="candlestickDataBinder"
      :axis-data-binder="axisDataBinder"
      :x-axis-grid-stroke-opacity-adapter="xAxisGridStrokeOpacityAdapter"
      :x-axis-label-text-adapter="xAxisLabelTextAdapter"
      :x-axis-tooltip-label-text-adapter="xAxisTooltipLabelTextAdapter"
      :series-tooltip-label-html-adapter="seriesTooltipLabelHtmlAdapter"
      :series-tooltip-force-hidden-adapter="seriesTooltipForceHiddenAdapter"
    ></xy-chart> -->
  </div>
</template>

<script>
import XYChart from "~/components/Chart/amcharts5/xy/index.vue";
import { merge } from "~/utils/merge";

export default {
  name: "OverallXYChart",
  components: {
    "xy-chart": XYChart,
  },
  props: {
    // new
    dataStartPoint: String,
    dataEndPoint: String,
    setDataStartPoint: Function,
    setDataEndPoint: Function,

    getWheelCursorPositionX: Function,
    xAxisGridStrokeOpacityAdapter: Function,
    xAxisLabelTextAdapter: Function,
    xAxisTooltipLabelTextAdapter: Function,
    seriesTooltipLabelHtmlAdapter: Function,
    xScrollbarXAxisLabelTextAdapter: Function,
    seriesTooltipForceHiddenAdapter: Function,
    // data binder
    axisDataBinder: Object,
    styleProps: {
      type: String,
      default: "height: 400px; width: 100%; min-width: 800px;",
    },

    // chart ui common settings
    candlestickSet: Object,
    lineSet: Object,
    bubbleSet: Object,
    barSet: Object,

    // common
    setSelectionMin: Function,
    setSelectionMax: Function,
    selectionMin: [String, Number],
    selectionMax: [String, Number],
    timeScale: String,
    xScrollbarSet: Object,

    // default
    defaultChartSet: Object,
    defaultLegendSet: Object,
    defaultZoomHandler: Function,
    defaultPanHandler: Function,

    // overall
    overallChartSet: Object,
    overallLegendSet: Object,
    overallZoomHandler: Function,
    overallPanHandler: Function,

    // data settings
    defaultData: Array,
    overallData: Array,
    category: String,
    bubbleDataBinder: Array,
    lineDataBinder: Array,
    barDataBinder: Array,
    candlestickDataBinder: Array,
    chartItemClickHandler: Function,
  },
  data() {
    return {
      logTest: false,
      candlestickSetData: {
        riseColor: "#ff0000",
        dropColor: "#0000ff",
      },

      lineSetData: {
        isLineVisible: false,
        strokeWidth: 2,
        fillOpacity: 0.1,
        bullet: {
          strokeWidth: 2,
          radius: 3,
        },
        colorList: [
          "#f08080",
          "#fa8072",
          "#e9967a",
          "#ff7f50",
          "#ff6347",
          "#f4a460",
          "#ffa07a",
        ],
      },

      bubbleSetData: {
        strokeWidth: 2,
        bullet: {
          strokeWidth: 2,
          radius: 3,
        },
        colorList: [
          "#f08080",
          "#fa8072",
          "#e9967a",
          "#ff7f50",
          "#ff6347",
          "#f4a460",
          "#ffa07a",
        ],
      },

      barSetData: {
        isStacked: false,
        isClustered: false,
        width: 15,
        strokeWidth: 1.5,
        fillOpacity: 0.3,
        cornerRadius: {
          topLeft: 0,
          topRight: 0,
        },
        colorList: [
          "#BCE2C7",
          "#4EBCD5",
          "#1A2281",
          "#4169e1",
          "#1e90ff",
          "#0000cd",
          "#000080",
        ],
      },

      overallLegendSetData: {
        isVisible: false,
        layout: "GridLayout",
        x: 50,
        centerX: 50,
        y: 100,
        centerY: 100,
      },

      overallChartSetData: {
        refProps: "overallXYChart",
        id: "overallXYChart",
        chartType: "overall",
        titleLabel: {
          text: "",
          fontSize: 12,
          fontWeight: "normal",
          textAlign: "center",
          x: 5,
          centerX: 0,
          paddingTop: 0,
          paddingBottom: 0,
          color: "#555",
        },
        isZoomOutButton: false,
        isYAxesPlotContainerVisible: false,
        isBottomAxesContainerVisible: false,
        chartLayout: "verticalLayout",
        panX: true,
        panY: false,
        wheelX: "",
        wheelY: "zoomX",
      },

      xScrollbarSetData: {
        isVisible: true,
        isDown: false,
        gripScale: 0.9,
        isStartGrip: false,
        isEndGrip: false,
        // startPosition: 0.2,
        // endPosition: 0.8,
        startPosition: 0,
        endPosition: 1,
        thumb: { fill: "#550000", fillOpacity: 0.05 },
        isDetailed: true,
        detail: {
          isVisible: true,
          height: 50,
          mainValue: { key: "", displayName: "" },
          line: { color: "#fb9f57", strokeWidth: 2, fillOpacity: 0.2 },
          background: {
            fill: "#000000",
            fillOpacity: 0.05,
            cornerRadius: {
              topLeft: 0,
              topRight: 10,
              bottomLeft: 10,
              bottomRight: 10,
            },
          },
        },
      },

      defaultLegendSetData: {
        isVisible: true,
        layout: "GridLayout",
        x: 50,
        centerX: 50,
        y: 100,
        centerY: 100,
      },

      defaultChartSetData: {
        refProps: "defaultXYChart",
        id: "defaultXYChart",
        chartType: "default",
        titleLabel: {
          text: "",
          fontSize: 12,
          fontWeight: "normal",
          textAlign: "center",
          x: 5,
          centerX: 0,
          paddingTop: 0,
          paddingBottom: 0,
          color: "#555",
        },
        isZoomOutButton: false,
        isYAxesPlotContainerVisible: true,
        isBottomAxesContainerVisible: true,
        chartLayout: "verticalLayout",
        panX: true,
        panY: false,
        wheelX: "",
        wheelY: "zoomX",
      },
    };
  },

  computed: {
    defaultChartSetComputed() {
      return merge(this.defaultChartSetData, this.defaultChartSet);
    },
    overallChartSetComputed() {
      return merge(this.overallChartSetData, this.overallChartSet);
    },
    barSetComputed() {
      return merge(this.barSetData, this.barSet);
    },
    bubbleSetComputed() {
      return merge(this.bubbleSetData, this.bubbleSet);
    },
    lineSetComputed() {
      return merge(this.lineSetData, this.lineSet);
    },
    candlestickSetComputed() {
      return merge(this.candlestickSetData, this.candlestickSet);
    },
    legendSetComputed() {
      return merge(this.defaultLegendSetData, this.defaultLegendSet);
    },
    overallLegendSetComputed() {
      return merge(this.overallLegendSetData, this.overallLegendSet);
    },
    xScrollbarSetComputed() {
      return merge(this.xScrollbarSetData, this.xScrollbarSet);
    },
  },
  watch: {
    dataStartPoint: {
      handler(newVal) {
        console.log("watch dataStartPoint 22: ", newVal);
      },
    },
    dataEndPoint: {
      handler(newVal) {
        console.log("watch dataEndPoint 22: ", newVal);
      },
    },
    xScrollbarSetComputed: {
      handler(oldVal, newVal) {
        this.logTest &&
          console.log("watch overall-xy-chart xScrollbarSetComputed");
        this.logTest && console.log(oldVal);
        this.logTest && console.log(newVal);
      },
      deep: true,
    },
    "xScrollbarSetComputed.detail.mainValue.displayName": {
      handler(oldVal, newVal) {
        this.logTest &&
          console.log(
            "watch overall-xy-chart xScrollbarSetComputed.detail.mainValue.displayName"
          );
        this.logTest && console.log(oldVal);
        this.logTest && console.log(newVal);
        // this.setChartTitle();
        // this.setXAxisExtraLabel();
      },
    },
    defaultData: {
      handler() {
        this.logTest && console.log("watch defaultData: ", this.defaultData);
      },
      immediate: true,
      deep: true,
    },
    overallData: {
      handler() {
        this.logTest && console.log("watch overallData: ", this.overallData);
      },
      immediate: true,
      deep: true,
    },
  },
  // methods: {
  //   setDataStartPoint(result) {
  //     console.log("setDataStartPoint: ", result);
  //     this.dataStartPoint = result;
  //   },
  //   setDataEndPoint(result) {
  //     console.log("setDataEndPoint: ", result);
  //     this.dataEndPoint = result;
  //   },
  // },
  mounted() {
    this.logTest && console.log("overall-xy-chart mounted");
    this.logTest && console.log("defaultData: ", this.defaultData);
    this.logTest && console.log("overallData: ", this.overallData);
  },
};
</script>

<style></style>
