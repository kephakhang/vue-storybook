<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import IconButton from "~/components/IconButton/icon-button.vue";
import noChartData from "~/components/Chart/amcharts5/no-data/index.vue";
import { merge } from "~/utils/merge";

import {
  defineComponent,
  watch,
  toRef,
  nextTick,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  computed,
  ref,
} from "@vue/composition-api";

import { hexToRgb, rgbToHex, getRandomHex } from "~/components/Chart/utils";

/**
 * 미리 정의해둔 차트 관련 설정입니다.
 */
import {
  chartSettings,
  lineSettings,
  stepLineSettings,
  bubbleSettings,
  candlestickSettings,
} from "~/components/Chart/amcharts5/xy/settings/custom";
import {
  xyChartSettings,
  xyChartContainerSettings,
} from "~/components/Chart/amcharts5/xy/settings/xy-chart";
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
import {
  xAxisLabelSettings,
  xAxisExtraLabelSettings,
  yAxisLabelSettings,
  yAxisExtraLabelSettings,
  yAxisHeaderLabelSettings,
} from "~/components/Chart/amcharts5/xy/settings/label";
import {
  xAxisGridSettings,
  yAxisGridSettings,
  xAxisRendererSettings,
  yAxisRendererSettings,
  yAxisHeaderBackgroundSettings,
  yAxisSettings,
} from "~/components/Chart/amcharts5/xy/settings/axis";
import {
  xScrollbarSettings,
  xScrollbarBackgroundSettings,
  xScrollbarThumbSettings,
  xScrollbarStartGripSettings,
  xScrollbarEndGripSettings,
} from "~/components/Chart/amcharts5/xy/settings/x-scrollbar";
import {
  columnSettings,
  columnTemplateSettings,
} from "~/components/Chart/amcharts5/xy/settings/column";
import { rootNumberFormatterSettings } from "~/components/Chart/amcharts5/xy/settings/root-number-formatter";

export default defineComponent({
  name: "XyChart",
  components: {
    "icon-button": IconButton,
    "no-chart-data": noChartData,
  },
  props: {
    /**
     * requirement props
     */
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    category: String,
    /**
     * requirement props (one of these)
     */
    lineDataBinder: Array,
    stepLineDataBinder: Array,
    bubbleDataBinder: Array,
    barDataBinder: Array,
    candlestickDataBinder: Array,
    /**
     * optional props
     */
    chartSet: Object,
    candlestickSet: Object,
    lineSet: Object,
    stepLineSet: Object,
    bubbleSet: Object,
    yAxisRange: Array,
    logTest: {
      type: Boolean,
      default: false,
    },
    tooltipHTML: {
      type: String,
      default: "",
    },
    styleProps: {
      type: [String, Object],
      default: "height: 400px; width: 100%; min-width: 800px;",
    },
    previousButton: {
      type: Object,
      default: () => {
        return { visible: false, disabled: false };
      },
    },
    nextButton: {
      type: Object,
      default: () => {
        return { visible: false, disabled: false };
      },
    },
    setCustom: Function,
    setCustomLegend: Function,
    setBubbleSeriesAdapter: Function,
    setXAxisFillRule: Function,
    seriesTooltipLabelHtmlAdapter: Function, // deprecated
    getWheelCursorPositionX: Function,
    chartItemClickHandler: Function,
    rootNumberFormatterSet: Object,
    columnSet: Object,
    columnTemplateSet: Object,
    xScrollbarSet: Object,
    xScrollbarBackgroundSet: Object,
    xScrollbarThumbSet: Object,
    xScrollbarStartGripSet: Object,
    xScrollbarEndGripSet: Object,
    xyChartSet: Object,
    xyChartContainerSet: Object,
    yAxisSet: Object,
    yAxisRendererSet: Object,
    yAxisGridSet: Object,
    yAxisLabelSet: Object,
    yAxisExtraLabelSet: Object,
    yAxisHeaderBackgroundSet: Object,
    yAxisHeaderLabelSet: Object,
    xAxisRendererSet: Object,
    xAxisGridSet: Object,
    xAxisLabelSet: Object,
    xAxisExtraLabelSet: Object,
    tooltipSet: Object,
    tooltipBackgroundSet: Object,
    legendSet: Object,
    legendLabelSet: Object,
    legendMarkerSet: Object,
    legendMarkerRectangleSet: Object,
    legendData: Array,
    seriesTooltipHTMLAdapter: Function,
    legendMarkerRectanglesStrokeDashArrayAdapter: Function, // deprecated
    columnHoverEvent: Function, // deprecated
    xAxisGridStrokeOpacityAdapter: Function, // deprecated
    xAxisLabelTextAdapter: Function, // deprecated
    xAxisTooltipLabelTextAdapter: Function, // deprecated
    xScrollbarXAxisLabelTextAdapter: Function, // deprecated
    seriesTooltipForceHiddenAdapter: Function, // deprecated
  },
  setup(props, context) {
    const xyVueInstance = getCurrentInstance();
    /**
     * html element
     */
    const amChartRef = ref(null);
    /**
     * data
     */
    const xyContainer = ref("");
    const stepLineSeriesSettings = ref({});
    const stepLineStrokeTemplateSettings = ref({});
    const stepLineFillsTemplateSettings = ref({});
    const bubbleSeriesSettings = ref({});
    const bubbleBulletSettings = ref({});
    const bubbleStrokeTemplateSettings = ref({});
    const bubbleFillsTemplateSettings = ref({});
    const candlestickSettings = ref({});
    const lineSeriesSettings = ref({});
    const lineBulletSettings = ref({});
    const lineFillsTemplateSettings = ref({});
    const lineStrokeTemplateSettings = ref({});
    const xySeries = ref("");
    const xScrollbarOverallSeriesItem = ref("");
    const chartTitle = ref("");
    const xAxisExtraLabel = ref("");
    const range = ref("");
    const rangeDataItem = ref("");
    const root = ref("");
    const chart = ref("");
    const xAxis = ref("");
    const yAxisList = ref([]);
    const lineSeriesList = ref([]);
    const lineSeries = ref("");
    const stepLineSeriesList = ref([]);
    const stepLineSeries = ref("");
    const columnSeriesList = ref([]);
    const columnSeries = ref("");
    const bubbleSeriesList = ref([]);
    const bubbleSeries = ref("");
    const candlestickSeriesList = ref([]);
    const candlestickSeries = ref("");
    const xScrollbarSeriesList = ref([]);
    const xScrollbarSeries = ref("");
    const xScrollbarColumnSeriesList = ref([]);
    const xScrollbarColumnSeries = ref("");
    const xScrollbarLineSeriesList = ref([]);
    const xScrollbarLineSeries = ref("");
    const xScrollbarStepLineSeriesList = ref([]);
    const xScrollbarStepLineSeries = ref("");
    const xScrollbarBubbleSeriesList = ref([]);
    const xScrollbarBubbleSeries = ref("");
    const xScrollbarCandlestickSeriesList = ref([]);
    const xScrollbarCandlestickSeries = ref("");
    const legend = ref("");
    const legendContainer = ref("");
    const xScrollbar = ref("");
    const xScrollbarXAxis = ref("");
    const xScrollbarYAxis = ref("");
    /**
     * props
     */
    const rootNumberFormatterSet = toRef(props, "rootNumberFormatterSet");
    const columnSet = toRef(props, "columnSet");
    const columnTemplateSet = toRef(props, "columnTemplateSet");
    const xScrollbarSet = toRef(props, "xScrollbarSet");
    const xScrollbarBackgroundSet = toRef(props, "xScrollbarBackgroundSet");
    const xScrollbarThumbSet = toRef(props, "xScrollbarThumbSet");
    const xScrollbarStartGripSet = toRef(props, "xScrollbarStartGripSet");
    const xScrollbarEndGripSet = toRef(props, "xScrollbarEndGripSet");
    const xyChartSet = toRef(props, "xyChartSet");
    const xyChartContainerSet = toRef(props, "xyChartContainerSet");
    const yAxisSet = toRef(props, "yAxisSet");
    const yAxisRendererSet = toRef(props, "yAxisRendererSet");
    const yAxisGridSet = toRef(props, "yAxisGridSet");
    const yAxisLabelSet = toRef(props, "yAxisLabelSet");
    const yAxisExtraLabelSet = toRef(props, "yAxisExtraLabelSet");
    const yAxisHeaderBackgroundSet = toRef(props, "yAxisHeaderBackgroundSet");
    const yAxisHeaderLabelSet = toRef(props, "yAxisHeaderLabelSet");
    const xAxisRendererSet = toRef(props, "xAxisRendererSet");
    const xAxisGridSet = toRef(props, "xAxisGridSet");
    const xAxisLabelSet = toRef(props, "xAxisLabelSet");
    const xAxisExtraLabelSet = toRef(props, "xAxisExtraLabelSet");
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
    const columnHoverEvent = toRef(props, "columnHoverEvent");
    const data = toRef(props, "data");
    const category = toRef(props, "category");
    const lineDataBinder = toRef(props, "lineDataBinder");
    const stepLineDataBinder = toRef(props, "stepLineDataBinder");
    const bubbleDataBinder = toRef(props, "bubbleDataBinder");
    const barDataBinder = toRef(props, "barDataBinder");
    const candlestickDataBinder = toRef(props, "candlestickDataBinder");
    const chartSet = toRef(props, "chartSet");
    const candlestickSet = toRef(props, "candlestickSet");
    const lineSet = toRef(props, "lineSet");
    const stepLineSet = toRef(props, "stepLineSet");
    const bubbleSet = toRef(props, "bubbleSet");
    const yAxisRange = toRef(props, "yAxisRange");
    const logTest = toRef(props, "logTest");
    const tooltipHTML = toRef(props, "tooltipHTML");
    const setCustom = toRef(props, "setCustom");
    const setCustomLegend = toRef(props, "setCustomLegend");
    const setBubbleSeriesAdapter = toRef(props, "setBubbleSeriesAdapter");
    const setXAxisFillRule = toRef(props, "setXAxisFillRule");
    const xAxisGridStrokeOpacityAdapter = toRef(
      props,
      "xAxisGridStrokeOpacityAdapter"
    );
    const xAxisLabelTextAdapter = toRef(props, "xAxisLabelTextAdapter");
    const xAxisTooltipLabelTextAdapter = toRef(
      props,
      "xAxisTooltipLabelTextAdapter"
    );
    const seriesTooltipLabelHtmlAdapter = toRef(
      props,
      "seriesTooltipLabelHtmlAdapter"
    );

    const xScrollbarXAxisLabelTextAdapter = toRef(
      props,
      "xScrollbarXAxisLabelTextAdapter"
    );
    const seriesTooltipForceHiddenAdapter = toRef(
      props,
      "seriesTooltipForceHiddenAdapter"
    );
    const getWheelCursorPositionX = toRef(props, "getWheelCursorPositionX");
    const chartItemClickHandler = toRef(props, "chartItemClickHandler");

    /**
     * column, line, bubble 등에 어떤 색상을 설정할지 정의합니다.
     *
     * 아래와 같은 우선순위로 적용됩니다.
     *
     * 1. specific color 가 있는 경우 specific color 로 설정해줍니다.
     * 2. colorList 와 index 값이 있는 경우 colorList[index] 값이 반영됩니다.
     * 3. 위의 두 개에 해당 되지 않을 경우 랜덤한 hex 값을 넣어줍니다.
     *
     * @param {*} colorList
     * @param {*} index
     * @param {*} specificColor
     * @return color
     */
    const getColor = (colorList, index, specificColor) => {
      logTest.value && console.log("getColor");

      if (specificColor) {
        return specificColor;
      } else if (colorList && index >= 0 && colorList[index]) {
        return colorList[index];
      } else {
        return getRandomHex(6);
      }
    };

    /**
     * series 를 설정하는 함수 모음입니다.
     *
     * @return axisField
     */
    const createSeries = () => {
      logTest.value && console.log("createSeries");
      createStepLineSeries();
      createColumnSeries();
      createCandlestickSeries();
      createBubbleSeries();
      createLineSeries();
    };

    /**
     * axis field 를 어떻게 설정할지 정의합니다.
     *
     * https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
     */
    const getAxisField = ({ value, openValue, dataBinder }) => {
      let axisField = {};

      let isYAxisPercent = getIsYAxisListPercent(dataBinder);

      /**
       * valueYShow 를 설정합니다.
       */
      let isYAxisPercentCombined =
        isYAxisPercent !== undefined
          ? isYAxisPercent
          : chartSetComputed.value.valueAxis.isPercent;
      let valueYShow = isYAxisPercentCombined
        ? "valueYTotalPercent"
        : "valueYWorking";

      /**
       * valueXShow 를 설정합니다.
       */
      let valueXShow = chartSetComputed.value.valueAxis.isPercent
        ? "valueXTotalPercent"
        : "valueXWorking";

      /**
       * x 축이 categoryAxis고 y축이 ValueAxis 일 경우의 axisField 를 설정합니다.
       */
      if (
        chartSetComputed.value.xAxis.type === "CategoryAxis" &&
        chartSetComputed.value.yAxis.type === "ValueAxis"
      ) {
        axisField = {
          categoryXField: category.value,
          valueYField: value,
          openValueYField: openValue,
          valueYShow,
        };
      }

      /**
       * x 축이 ValueAxis y축이 categoryAxis고 일 경우의 axisField 를 설정합니다.
       */
      if (
        chartSetComputed.value.xAxis.type === "ValueAxis" &&
        chartSetComputed.value.yAxis.type === "CategoryAxis"
      ) {
        axisField = {
          categoryYField: category.value,
          valueXField: value,
          openValueXField: openValue,
          valueXShow,
        };
      }

      return axisField;
    };

    /**
     * line series 를 설정하는 함수입니다.
     */
    const createLineSeries = () => {
      logTest.value && console.log("createLineSeries");

      resetLineSeries();
      resetXScrollbarLineSeries();

      /**
       * line data binder 가 있을 경우 line series 를 설정합니다.
       */
      if (lineDataBinder.value && lineDataBinder.value.length > 0) {
        lineDataBinder.value.map((dataBinder, index) => {
          /**
           * set databinder stroke
           * xscrollbar 의 line series databinder stroke width 를 설정합니다.
           */
          if (dataBinder?.strokeWidth === undefined) {
            dataBinder.strokeWidth = lineSetComputed.value.strokeWidth;
          }

          /**
           * line series 의 databinder color 를 설정합니다.
           */
          dataBinder.color = getColor(
            lineSetComputed.value.colorList,
            index,
            dataBinder?.color
          );

          /**
           * line series 의 axis field 를 설정합니다.
           */
          let axisField = getAxisField({
            value: dataBinder?.key,
            openValue: dataBinder?.openKey,
            dataBinder,
          });

          /**
           * yAxisListIndex 가 없을 경우에는 0 으로 한다.
           */
          if (dataBinder.yAxisListIndex === undefined) {
            dataBinder.yAxisListIndex = 0;
          }

          /**
           * line series 의 fill visbile 을 설정합니다.
           */
          if (dataBinder?.isFillVisible === undefined) {
            dataBinder.isFillVisible = lineSetComputed.value.isFillVisible;
          }

          /**
           * line series 의 line visible 을 설정합니다.
           *
           * xscrollbar 의 line series databinder isLineVisible 을 설정합니다.
           */
          let isLineVisible =
            dataBinder?.isLineVisible !== undefined
              ? dataBinder.isLineVisible
              : true;

          setLineStrokeTemplateSettings(dataBinder, isLineVisible);
          setLineFillsTemplateSettings(dataBinder);
          setLineSeriesSettings(dataBinder, axisField);
          setLineSeries();
          addLineSeries();
          setLineSeriesBullet(dataBinder, index);
          createXscrollbarLineSeries();
        });
      }
    };

    /**
     * line series list 를 초기화 합니다.
     */
    const resetLineSeries = () => {
      lineSeriesList.value.map((lineSeries) => {
        lineSeries.dispose();
      });
      lineSeriesList.value.splice(0);
    };

    /**
     * x scrollbar 의 line series list 를 초기화합니다.
     */
    const resetXScrollbarLineSeries = () => {
      xScrollbarLineSeriesList.value.map((lineSeries) => {
        lineSeries.dispose();
      });
      xScrollbarLineSeriesList.value.splice(0);
    };

    /**
     * lineStrokeTemplateSettings 을 설정합니다.
     */
    const setLineStrokeTemplateSettings = (dataBinder, isLineVisible) => {
      lineStrokeTemplateSettings.value = {
        strokeWidth: Number(dataBinder?.strokeWidth),
        visible: isLineVisible,
      };
    };

    /**
     * lineFillsTemplateSettings 를 설정합니다.
     */
    const setLineFillsTemplateSettings = (dataBinder) => {
      lineFillsTemplateSettings.value = {
        fillOpacity: Number(lineSetComputed.value.fillOpacity),
        visible: dataBinder.isFillVisible,
      };
    };

    /**
     * lineSeriesSettings 를 설정합니다.
     */
    const setLineSeriesSettings = (dataBinder, axisField) => {
      lineSeriesSettings.value = {
        connect: lineSetComputed.value.isConnected,
        stroke: am5.color(dataBinder.color),
        fill: am5.color(dataBinder.color),
        name: dataBinder?.displayName,
        ...axisField,
        xAxis: xAxis.value,
        yAxis: yAxisList.value[dataBinder.yAxisListIndex],
      };
    };

    /**
     * line series 를 설정합니다.
     */
    const setLineSeries = () => {
      lineSeries.value = am5xy.LineSeries.new(
        root.value,
        lineSeriesSettings.value
      );
    };

    /**
     *
     * 설정한 line series 를 xy chart data 에 추가한다.
     */
    const addLineSeries = () => {
      xySeries.value = chart.value.series.push(lineSeries.value);
      lineSeriesList.value.push(lineSeries.value); // 추적용
    };

    /**
     * y axis 에서 percent 를 사용할지 여부를 반환합니다.
     *
     * @param {*} dataBinder
     * @return y axis percent 사용 여부
     */
    const getIsYAxisListPercent = (dataBinder) => {
      let isYAxisPercent = false;

      if (
        typeof dataBinder?.yAxisListIndex === "number" &&
        chartSetComputed.value?.yAxisList
      ) {
        isYAxisPercent =
          chartSetComputed.value?.yAxisList[dataBinder?.yAxisListIndex]
            ?.isPercent;
      }

      return isYAxisPercent;
    };

    /**
     * tooltip 및 tooltip 배경 및 기본모양을 생성한 후 반환합니다.
     *
     * @returns tooltip
     */
    const makeTooltip = () => {
      let tooltip = am5.Tooltip.new(root.value, tooltipSetComputed.value);
      tooltip.get("background").setAll(tooltipBackgroundSetComputed.value);
      return tooltip;
    };

    /**
     * tooltipHTML 에 설정될 값을 반환합니다.
     *
     * @param {Object} dataBinder dataBinder
     * @param {number} index data index
     *
     * tooltipHTML 우선순위
     * 1. adapter를 사용하여 설정된 tooltipHTML
     * 2. dataBinder를 통해 전달된 tooltipHTML
     * 3. tooltipHTML props를 통해 설정된 tooltipHTML
     *
     * @return tooltipHTML 에 설정될 값
     */
    const getTooltipHTML = (dataBinder, index) => {
      let tooltipHtml = dataBinder?.tooltipHTML
        ? dataBinder.tooltipHTML
        : tooltipHTML.value;

      if (seriesTooltipLabelHtmlAdapter.value) {
        tooltipHtml = seriesTooltipLabelHtmlAdapter.value(
          data.value[index],
          dataBinder
        );
      }

      return tooltipHtml;
    };

    /**
     * line series 에 설정될 bullet 을 정의합니다.
     *
     * @param {*} dataBinder
     * @param {*} index
     */
    const setLineSeriesBullet = (dataBinder, index) => {
      let lineBulletTemplate = am5.Template.new(root.value, {});

      // setLineSeriesBulletClickHandler(lineBulletTemplate);
      setLineSeriesBulletSettings();
      setLineSeriesBullets(dataBinder, lineBulletTemplate, index);
      // setLineSeriesBulletTooltipHTMLAdapter(lineBulletTemplate);
      setLineSeriesStroke(dataBinder);
      setLineSeriesFill();
      setLineSeriesData();
    };

    /**
     * line bullet 을 눌렀을 경우 동작할 handler 입니다.
     *
     * @deprecated lineBulletEvent 로 대체됩니다.
     */
    const setLineSeriesBulletClickHandler = () => {
      if (chartItemClickHandler.value) {
        lineBulletTemplate.events.on("click", (ev) => {
          if (ev.target.dataItem.component.className === "LineSeries") {
            chartItemClickHandler.value(ev);
          }
        });
      }
    };

    /**
     * lineBulletSettings 를 설정합니다.
     */
    const setLineSeriesBulletSettings = (lineBulletTemplate) => {
      lineBulletSettings.value = {
        showTooltipOn: "hover",
        strokeWidth: lineSetComputed.value.bullet.strokeWidth,
        radius: Number(lineSetComputed.value.bullet.radius),
        fillOpacity: lineSetComputed.value.bullet.isVisible ? 1 : 0,
        strokeOpacity: lineSetComputed.value.bullet.isVisible ? 1 : 0,
        tooltip: makeTooltip(),
      };
    };

    /**
     * line series 의 bullets 를 설정합니다.
     */
    const setLineSeriesBullets = (dataBinder, lineBulletTemplate, index) => {
      /**
       * line bullet 의 forcehidden 여부를 설정합니다.
       */
      let forceHidden =
        dataBinder.bullet && dataBinder.bullet.forceHidden !== undefined
          ? dataBinder.bullet.forceHidden
          : lineSetComputed.value.bullet.forceHidden;

      /**
       * line bullet 의 fill 여부를 설정합니다.
       */
      let fill = lineSetComputed.value.bullet.isFilled
        ? am5.color(dataBinder.color)
        : root.value.interfaceColors.get("background");

      /**
       * line series 의 bullets 를 설정합니다.
       */
      lineSeries.value.bullets.push(() => {
        return am5.Bullet.new(root.value, {
          sprite: am5.Circle.new(
            root.value,
            {
              ...lineBulletSettings.value,
              forceHidden,
              fill,
              stroke: am5.color(dataBinder.color),
              tooltipHTML: getTooltipHTML(dataBinder, index),
            },
            lineBulletTemplate
          ),
        });
      });
    };

    /**
     * line series bullet 에 tooltip html adapter 를 설정합니다.
     *
     * @deprecated lineBulletAdapter 로 대체됩니다.
     */
    const setLineSeriesBulletTooltipHTMLAdapter = (lineBulletTemplate) => {
      if (seriesTooltipHTMLAdapter.value) {
        lineBulletTemplate.adapters.add(
          "tooltipHTML",
          (tooltipHTML, target) => {
            return seriesTooltipHTMLAdapter.value(tooltipHTML, target);
          }
        );
      }
    };

    /**
     * line series stroke 를 설정합니다.
     */
    const setLineSeriesStroke = (dataBinder) => {
      lineSeries.value.strokes.template.setAll({
        ...lineStrokeTemplateSettings.value,
        strokeDasharray: dataBinder.strokeDasharray,
      });
    };

    /**
     * line series fill 을 설정합니다.
     */
    const setLineSeriesFill = () => {
      lineSeries.value.fills.template.setAll(lineFillsTemplateSettings.value);
    };

    /**
     * line series 에 data 를 설정합니다.
     */
    const setLineSeriesData = () => {
      lineSeries.value.data.setAll(data.value);
    };

    /**
     * x scrollbar 에 line series 를 추가합니다.
     */
    const createXscrollbarLineSeries = () => {
      logTest.value && console.log("createXscrollbarLineSeries");

      if (xScrollbar.value) {
        /**
         * x scrollbar 의 x axis 를 설정합니다.
         */
        if (!xScrollbarXAxis.value) {
          createXScrollbarXAxis();
        }

        /**
         * x scrollbar 의 y axis 를 설정합니다.
         */
        if (!xScrollbarYAxis.value) {
          setXScrollbarYAxis();
        }

        setXScrollbarLineSeries();
        addXScrollbarLineSeries();
        setXScrollbarLineSeriesBullets();
        setXScrollbarLineSeriesStroke();
        setXScrollbarLineSeriesData();
      }
    };

    /**
     * x scrollbar line series 를 설정합니다.
     */
    const setXScrollbarLineSeries = () => {
      xScrollbarLineSeries.value = am5xy.LineSeries.new(root.value, {
        ...lineSeriesSettings.value,
        xAxis: xScrollbarXAxis.value,
        yAxis: xScrollbarYAxis.value,
      });
    };

    /**
     * x scrollbar 에 line series 를 추가합니다.
     */
    const addXScrollbarLineSeries = () => {
      xScrollbar.value.chart.series.push(xScrollbarLineSeries.value);
      xScrollbarLineSeriesList.value.push(xScrollbarLineSeries.value); // 추적용
    };

    /**
     * x scrollbar line series 의 bullet 을 만듭니다.
     */
    const setXScrollbarLineSeriesBullets = () => {
      xScrollbarLineSeries.value.bullets.push(() => {
        return am5.Bullet.new(root.value, {
          sprite: am5.Circle.new(root.value, lineBulletSettings.value),
        });
      });
    };

    /**
     * x scrollbar line series 의 stroke 설정합니다.
     */
    const setXScrollbarLineSeriesStroke = () => {
      xScrollbarLineSeries.value.strokes.template.setAll(
        lineStrokeTemplateSettings.value
      );
    };

    /**
     * x scrollbar line series 의 data 를 설정합니다.
     */
    const setXScrollbarLineSeriesData = () => {
      xScrollbarLineSeries.value.data.setAll(data.value);
    };

    /**
     * step line series 를 설정합니다.
     */
    const createStepLineSeries = () => {
      logTest.value && console.log("createStepLineSeries");

      resetStepLineSeries();

      /**
       * stepLineDataBinder 가 있을 경우 step line series 를 설정합니다.
       */
      if (stepLineDataBinder.value && stepLineDataBinder.value.length > 0) {
        stepLineDataBinder.value.map((dataBinder, index) => {
          /**
           * stepline series 의 strokeWidth 를 설정합니다.
           */
          let strokeWidth =
            dataBinder?.strokeWidth === undefined
              ? stepLineSetComputed.value.strokeWidth
              : dataBinder.strokeWidth;

          /**
           * stepLine series 의 line 을 보여줄지 여부를 정의합니다.
           */
          let isLineVisible =
            dataBinder?.isLineVisible !== undefined
              ? dataBinder.isLineVisible
              : true;

          /**
           * stepLine series 의 color 를 정의합니다.
           */
          let color = getColor(
            lineSetComputed.value.colorList,
            index,
            dataBinder?.color
          );

          /**
           * stepline series 의 채우기 여부를 정의합니다.
           */
          let isFillVisible =
            dataBinder?.isFillVisible === undefined
              ? stepLineSetComputed.value.isFillVisible
              : dataBinder.isFillVisible;

          setStepLineStrokeTemplateSettings(strokeWidth, isLineVisible);
          setStepLineSeriesSettings(dataBinder);
          setStepLineFillTemplateSettings(isFillVisible);
          setStepLineSeries(color);
          addStepLineSeries();
          createStepLineSeriesBullets(dataBinder, index, color);
          setStepLineSeriesXScrollbar();
        });
      }
    };

    /**
     * step line series 를 초기화합니다.
     */
    const resetStepLineSeries = () => {
      stepLineSeriesList.value.map((stepLineSeries) => {
        stepLineSeries.dispose();
      });
      stepLineSeriesList.value.splice(0);
    };

    /**
     * stepLineStrokeTemplateSettings 를 설정합니다.
     */
    const setStepLineStrokeTemplateSettings = (strokeWidth, isLineVisible) => {
      stepLineStrokeTemplateSettings.value = {
        strokeWidth: Number(strokeWidth),
        visible: isLineVisible,
      };
    };

    /**
     * stepLineSeriesSettings 를 설정합니다.
     */
    const setStepLineSeriesSettings = (dataBinder) => {
      /**
       * stepLine series 의 axis field 를 정의합니다.
       */
      let axisField = getAxisField({
        value: dataBinder?.key,
        openValue: dataBinder?.openKey,
        dataBinder,
      });

      /**
       * yAxisListIndex 가 없을 경우 0 으로 한다.
       */
      let yAxisListIndex =
        dataBinder?.yAxisListIndex === undefined
          ? 0
          : dataBinder.yAxisListIndex;

      stepLineSeriesSettings.value = {
        name: dataBinder?.displayName,
        xAxis: xAxis.value,
        yAxis: yAxisList.value[yAxisListIndex],
        ...axisField,
      };
    };

    /**
     * stepLineFillsTemplateSettings 을 설정합니다.
     */
    const setStepLineFillTemplateSettings = (isFillVisible) => {
      stepLineFillsTemplateSettings.value = {
        fillOpacity: Number(stepLineSetComputed.value.fillOpacity),
        visible: isFillVisible,
      };
    };

    /**
     * step line series 를 설정합니다.
     */
    const setStepLineSeries = (color) => {
      stepLineSeries.value = am5xy.StepLineSeries.new(root.value, {
        ...stepLineSeriesSettings.value,
        stroke: am5.color(color),
        fill: am5.color(color),
      });
    };

    /**
     * xy chart 에 step line series 를 추가합니다.
     */
    const addStepLineSeries = () => {
      xySeries.value = chart.value.series.push(stepLineSeries.value);
      stepLineSeriesList.value.push(stepLineSeries.value); // 추적용
    };

    /**
     * step line series 의 bullet 을 생성합니다.
     *
     * @param {*} dataBinder
     * @param {*} index
     */
    const createStepLineSeriesBullets = (dataBinder, index, color) => {
      let stepLineBulletTemplate = am5.Template.new(root.value, {});

      setStepLineSeriesBullets(
        dataBinder,
        index,
        color,
        stepLineBulletTemplate
      );
      setStepLineSeriesTooltipHTMLAdapter();
      setStepLineSeriesStroke();
      setStepLineSeriesFill();
      setStepLineSeriesData();
    };

    /**
     * step line series 의 bullet 을 설정합니다.
     */
    const setStepLineSeriesBullets = (
      dataBinder,
      index,
      color,
      stepLineBulletTemplate
    ) => {
      stepLineSeries.value.bullets.push(() => {
        return am5.Bullet.new(root.value, {
          sprite: am5.Circle.new(
            root.value,
            {
              strokeWidth: stepLineSetComputed.value.bullet.strokeWidth,
              radius: Number(stepLineSetComputed.value.bullet.radius),
              forceHidden: stepLineSetComputed.value.bullet.forceHidden,
              fill: root.value.interfaceColors.get("background"),
              tooltip: makeTooltip(),
              tooltipHTML: getTooltipHTML(dataBinder, index),
              stroke: am5.color(color),
            },
            stepLineBulletTemplate
          ),
        });
      });
    };

    /**
     * step line series 의 tooltip html adapter 를 설정합니다.
     *
     * @deprecated stepLineBulletAdapter 로 대체합니다.
     */
    const setStepLineSeriesTooltipHTMLAdapter = () => {
      if (seriesTooltipHTMLAdapter.value) {
        stepLineBulletTemplate.adapters.add(
          "tooltipHTML",
          (tooltipHTML, target) => {
            return seriesTooltipHTMLAdapter.value(tooltipHTML, target);
          }
        );
      }
    };

    /**
     * step line series stroke 를 설정합니다.
     */
    const setStepLineSeriesStroke = () => {
      stepLineSeries.value.strokes.template.setAll(
        stepLineStrokeTemplateSettings.value
      );
    };

    /**
     * step line series fill 설정합니다.
     */
    const setStepLineSeriesFill = () => {
      stepLineSeries.value.fills.template.setAll(
        stepLineFillsTemplateSettings.value
      );
    };

    /**
     * step line series 의 data 를 설정합니다.
     */
    const setStepLineSeriesData = () => {
      stepLineSeries.value.data.setAll(data.value);
    };

    /**
     * x scrollbar 에 step line series 를 추가합니다.
     */
    const setStepLineSeriesXScrollbar = () => {
      logTest.value && console.log("setStepLineSeriesXScrollbar");

      if (xScrollbar.value) {
        setXScrollbarStepLineSeries();
        addXScrollbarSteplineSeries();
        setXScrollbarStepLineSeriesBullet();
        setXScrollbarStepLineSeriesStroke();
        setXScrollbarStepLineSeriesData();
      }
    };

    /**
     * x scrollbar 의 stepLine series 를 설정합니다.
     */
    const setXScrollbarStepLineSeries = () => {
      xScrollbarStepLineSeries.value = am5xy.StepLineSeries.new(root.value, {
        ...stepLineSeriesSettings.value,
        xAxis: xScrollbarXAxis.value,
        yAxis: xScrollbarYAxis.value,
      });
    };

    /**
     * x scrollbar 에 x scrollbar 용 step line series 를 추가합니다.
     */
    const addXScrollbarSteplineSeries = () => {
      xScrollbar.value.chart.series.push(xScrollbarStepLineSeries.value);
    };

    /**
     * x scrollbar step line series 의 bullet 을 설정합니다.
     */
    const setXScrollbarStepLineSeriesBullet = () => {
      xScrollbarStepLineSeries.value.bullets.push(() => {
        return am5.Bullet.new(root.value, {
          sprite: am5.Circle.new(root.value, {}),
        });
      });
    };

    /**
     * x scrollbar step line series 의 stroke 를 설정합니다.
     */
    const setXScrollbarStepLineSeriesStroke = () => {
      xScrollbarStepLineSeries.value.strokes.template.setAll(
        stepLineStrokeTemplateSettings.value
      );
    };

    /**
     * x scrollbar step line series 의 data 를 설정합니다.
     */
    const setXScrollbarStepLineSeriesData = () => {
      xScrollbarStepLineSeries.value.data.setAll(data.value);
    };

    /**
     * bubble series 를 설정합니다.
     */
    const createBubbleSeries = () => {
      logTest.value && console.log("createBubbleSeries");

      resetBubbleSeries();
      resetXScrollbarBubbleSeries();

      /**
       * bubbleDataBinder 가 있을 경우 bubble series 를 설정합니다.
       */
      if (bubbleDataBinder.value && bubbleDataBinder.value.length > 0) {
        bubbleDataBinder.value.map((dataBinder, index) => {
          /**
           * databinder color 를 설정합니다.
           */
          dataBinder.color = getColor(
            bubbleSetComputed.value.colorList,
            index,
            dataBinder?.color
          );

          /**
           * databinder yAxisListIndex 를 설정합니다.
           */
          if (dataBinder.yAxisListIndex === undefined) {
            dataBinder.yAxisListIndex = 0;
          }

          setBubbleStrokeSettings();
          setBubbleSeriesSettings(dataBinder);
          setBubbleFillTemplateSettings();
          setBubbleSeries(dataBinder);
          addBubbleSeries();
          setBubbleSeriesBullet(dataBinder, index);
          createBubbleSeriesXScrollbar();
        });
      }
    };

    /**
     * bubble series list 를 초기화합니다.
     */
    const resetBubbleSeries = () => {
      bubbleSeriesList.value.map((bubbleSeries) => {
        bubbleSeries.dispose();
      });
      bubbleSeriesList.value.splice(0);
    };

    /**
     * x scrollbar 에 추가한 bubble series list 를 초기화 합니다.
     */
    const resetXScrollbarBubbleSeries = () => {
      xScrollbarBubbleSeriesList.value.map((xSrollbarBubbleSeries) => {
        xSrollbarBubbleSeries.dispose();
      });
      xScrollbarBubbleSeriesList.value.splice(0);
    };

    /**
     * bubbleStrokeTemplateSettings 를 설정합니다.
     */
    const setBubbleStrokeSettings = () => {
      bubbleStrokeTemplateSettings.value = {
        strokeWidth: Number(bubbleSetComputed.value.strokeWidth),
        visible: false,
      };
    };

    /**
     * bubbleSeriesSettings 를 설정합니다.
     */
    const setBubbleSeriesSettings = (dataBinder) => {
      /**
       * bubble series 의 axis field 를 설정을 가져옵니다.
       */
      let axisField = getAxisField({ value: dataBinder?.key, dataBinder });

      bubbleSeriesSettings.value = {
        name: dataBinder?.displayName,
        xAxis: xAxis.value,
        yAxis: yAxisList.value[dataBinder.yAxisListIndex],
        ...axisField,
      };
    };

    /**
     * bubbleFillsTemplateSettings 를 설정합니다.
     */
    const setBubbleFillTemplateSettings = () => {
      bubbleFillsTemplateSettings.value = {
        fillOpacity: Number(bubbleSetComputed.value.fillOpacity),
        visible: bubbleSetComputed.value.isFillVisible,
      };
    };

    /**
     * bubble series 를 설정합니다.
     */
    const setBubbleSeries = (dataBinder) => {
      bubbleSeries.value = am5xy.LineSeries.new(root.value, {
        ...bubbleSeriesSettings.value,
        stroke: am5.color(dataBinder.color),
        fill: am5.color(dataBinder.color),
      });
    };

    /**
     * xy chart 에 bubble series 를 추가합니다.
     */
    const addBubbleSeries = () => {
      xySeries.value = chart.value.series.push(bubbleSeries.value);
      bubbleSeriesList.value.push(bubbleSeries.value);
    };

    const setBubbleSeriesBullet = (dataBinder, index) => {
      let bubbleBulletTemplate = am5.Template.new(root.value, {});

      setBubbleBulletClickHandler(bubbleBulletTemplate);
      setBubbleBulletAdapter(dataBinder, bubbleBulletTemplate);
      setBubbleBulletSettings();
      setBubbleSeriesBullets(dataBinder, index, bubbleBulletTemplate);
      setBulletSeriesTooltipHTMLAdapter(bubbleBulletTemplate);
      setBubbleSeriesStroke();
      setBubbleSeriesFill();
      setBubbleSeriesData();
    };

    /**
     * bubble series bullet 의 클릭 핸들러입니다.
     *
     * @deprecated
     * bubbleBulletEvent 로 대체합니다.
     */
    const setBubbleBulletClickHandler = (bubbleBulletTemplate) => {
      if (chartItemClickHandler.value) {
        bubbleBulletTemplate.events.on("click", (ev) => {
          if (ev.target.dataItem.component.className === "LineSeries") {
            chartItemClickHandler.value(ev);
          }
        });
      }
    };

    /**
     * @deprecated bubbleBulletAdapter 로 대체됩니다.
     */
    const setBubbleBulletAdapter = (dataBinder, bubbleBulletTemplate) => {
      if (setBubbleSeriesAdapter.value) {
        setBubbleSeriesAdapter.value(
          bubbleBulletTemplate.adapters,
          am5,
          xyVueInstance,
          dataBinder
        );
      }
    };

    /**
     * bubble bullet settings 을 설정합니다.
     */
    const setBubbleBulletSettings = () => {
      bubbleBulletSettings.value = {
        showTooltipOn: "hover",
        strokeWidth: bubbleSetComputed.value.bullet.strokeWidth,
        radius: Number(bubbleSetComputed.value.bullet.radius),
        fillOpacity: bubbleSetComputed.value.bullet.isVisible ? 1 : 0,
        strokeOpacity: bubbleSetComputed.value.bullet.isVisible ? 1 : 0,
        tooltip: makeTooltip(),
      };
    };

    /**
     * bubble series 의 bullet 을 설정합니다.
     */
    const setBubbleSeriesBullets = (
      dataBinder,
      index,
      bubbleBulletTemplate
    ) => {
      bubbleSeries.value.bullets.push(() => {
        return am5.Bullet.new(root.value, {
          sprite: am5.Circle.new(
            root.value,
            {
              ...bubbleBulletSettings.value,
              tooltipHTML: getTooltipHTML(dataBinder, index),
              stroke: am5.color(dataBinder.color),
              fill: bubbleSetComputed.value.bullet.isFilled
                ? am5.color(dataBinder.color)
                : root.value.interfaceColors.get("background"),
            },
            bubbleBulletTemplate
          ),
        });
      });
    };

    /**
     * bubble series 의 bullet 에 tooltip html adapter 를 설정합니다.
     *
     * @deprecated bulletBubbleAdapter 로 대체합니다.
     */
    const setBulletSeriesTooltipHTMLAdapter = (bubbleBulletTemplate) => {
      if (seriesTooltipHTMLAdapter.value) {
        bubbleBulletTemplate.adapters.add(
          "tooltipHTML",
          (tooltipHTML, target) => {
            return seriesTooltipHTMLAdapter.value(tooltipHTML, target);
          }
        );
      }
    };

    /**
     * bubble series 의 stroke 를 설정합니다.
     */
    const setBubbleSeriesStroke = () => {
      bubbleSeries.value.strokes.template.setAll(
        bubbleStrokeTemplateSettings.value
      );
    };

    /**
     * bubble series 의 fill 을 설정합니다.
     */
    const setBubbleSeriesFill = () => {
      bubbleSeries.value.fills.template.setAll(
        bubbleFillsTemplateSettings.value
      );
    };

    /**
     * bubble series 의 data 를 설정합니다.
     */
    const setBubbleSeriesData = () => {
      bubbleSeries.value.data.setAll(data.value);
    };

    /**
     * x scrollbar 에 bubble series 를 추가합니다.
     */
    const createBubbleSeriesXScrollbar = () => {
      logTest.value && console.log("createBubbleSeriesXScrollbar");

      if (xScrollbar.value) {
        setXScrollbarBubbleSeries();
        setXScrollbarBubbleSeriesBullets();
        setXScrollbarBubbleSeriesStroke();
        setXScrollbarBubbleSeriesFill();
        setXScrollbarBubbleSeriesData();
      }
    };

    /**
     * x scrollbar 의 bubble series 를 설정합니다.
     */
    const setXScrollbarBubbleSeries = () => {
      xScrollbarBubbleSeries.value = xScrollbar.value.chart.series.push(
        am5xy.LineSeries.new(root.value, {
          ...bubbleSeriesSettings.value,
          xAxis: xScrollbarXAxis.value,
          yAxis: xScrollbarYAxis.value,
        })
      );
      xScrollbarBubbleSeriesList.value.push(xScrollbarBubbleSeries.value);
    };

    /**
     * x scrollbar 의 bubble series bullets 를 설정합니다.
     */
    const setXScrollbarBubbleSeriesBullets = () => {
      xScrollbarBubbleSeries.value.bullets.push(() => {
        return am5.Bullet.new(root.value, {
          sprite: am5.Circle.new(root.value, bubbleBulletSettings.value),
        });
      });
    };

    /**
     * x scrollbar 의 bubble series stroke 를 설정합니다.
     */
    const setXScrollbarBubbleSeriesStroke = () => {
      xScrollbarBubbleSeries.value.strokes.template.setAll(
        bubbleStrokeTemplateSettings.value
      );
    };

    /**
     * x scrollbar 의 bubble series fill 를 설정합니다.
     */
    const setXScrollbarBubbleSeriesFill = () => {
      xScrollbarBubbleSeries.value.fills.template.setAll(
        bubbleFillsTemplateSettings.value
      );
    };

    /**
     * x scrollbar 의 bubble series data 를 설정합니다.
     */
    const setXScrollbarBubbleSeriesData = () => {
      xScrollbarBubbleSeries.value.data.setAll(data.value);
    };

    /**
     * column series 를 생성합니다.
     */
    const createColumnSeries = () => {
      logTest.value && console.log("createColumnSeries");
      desposeColumnSeries();
      setColumnSeriesLoop();
    };

    /**
     * barDataBinder 가 있을 경우 databinder 항목 만큼 column series 를 설정합니다.
     */
    const setColumnSeriesLoop = () => {
      if (barDataBinder.value && barDataBinder.value.length > 0) {
        barDataBinder.value.map((dataBinder, index) => {
          setColumnSeries(dataBinder, index);
        });
      }
    };

    /**
     * column series 를 설정합니다.
     */
    const setColumnSeries = (dataBinder, index) => {
      let name = dataBinder?.displayName;
      let value = dataBinder?.key;

      /**
       * databinder.disabled 가 true 일 경우 column series color 값을 무채색으로 변경합니다.
       */
      let disabled = dataBinder?.disabled;
      if (disabled) {
        let rgb = hexToRgb(dataBinder?.color);
        let average = Math.floor((rgb[0] + rgb[1] + rgb[2]) / 3);
        let hex = rgbToHex(average, average, average);
        if (dataBinder?.color) {
          dataBinder.color = hex;
        }
      }

      /**
       * column series 의 color 를 설정합니다.
       */
      let columnColor = getColor(
        chartSetComputed.value.column.colorList,
        index,
        dataBinder?.color
      );

      /**
       * column series 의 axis field 설정합니다.
       */
      let axisField = getAxisField({ value, dataBinder });

      if (dataBinder.yAxisListIndex === undefined) {
        dataBinder.yAxisListIndex = 0;
      }

      /**
       * column series 를 설정합니다.
       */
      let columnSeries = chart.value.series.push(
        am5xy.ColumnSeries.new(root.value, {
          ...columnSetComputed.value,
          ...axisField,
          name,
          xAxis: xAxis.value,
          yAxis: yAxisList.value[dataBinder.yAxisListIndex],
        })
      );

      /**
       * column template 의 width 를 설정합니다.
       */
      let columnTemplateWidth =
        chartSetComputed.value.xAxis.type === "CategoryAxis"
          ? columnTemplateSetComputed.value.width
          : undefined;

      /**
       * column template 의 height 을 설정합니다.
       */
      let columnTemplateHeight =
        chartSetComputed.value.xAxis.type !== "CategoryAxis"
          ? columnTemplateSetComputed.value.height
          : undefined;

      setColumnSeriesTooltip(columnSeries);

      setColumnSeriesColumnTemplate(
        columnSeries,
        columnTemplateWidth,
        columnTemplateHeight,
        dataBinder,
        index,
        columnColor
      );

      if (xScrollbar.value) {
        setXScrollbarColumnSeries(name, axisField);
        setXScrollbarColumnSeriesColumnTemplate(
          columnTemplateWidth,
          columnTemplateHeight,
          dataBinder,
          index,
          columnColor
        );
        setXScrollbarColumnSeriesData();
      }

      setColumnSeriesClickEvent(columnSeries);
      setColumnSeriesHoverEvent(columnSeries);
      setColumnSeriesAdapater(columnSeries);
      setColumnSeriesData(columnSeries);
    };

    /**
     * column series list 를 초기화합니다.
     */
    const desposeColumnSeries = () => {
      columnSeriesList.value.map((columnSeries) => {
        columnSeries.dispose();
      });
      columnSeriesList.value.splice(0);
    };

    /**
     * column series 의 tooltip 을 설정합니다.
     */
    const setColumnSeriesTooltip = (columnSeries) => {
      columnSeries.set("tooltip", makeTooltip());
    };

    /**
     * column series 의 column template 을 설정합니다.
     *
     * y축이 카테고리고 x축이 value일 경우에는 width 는 am5.p100 이여야 함. (undefined 이면 100 percent 로 설정됨).
     * x축이 category일 경우에만 width 적용.
     */
    const setColumnSeriesColumnTemplate = (
      columnSeries,
      columnTemplateWidth,
      columnTemplateHeight,
      dataBinder,
      index,
      columnColor
    ) => {
      columnSeries.columns.template.setAll({
        ...columnTemplateSetComputed.value,
        width: columnTemplateWidth,
        height: columnTemplateHeight,
        tooltipHTML: getTooltipHTML(dataBinder, index),
        stroke: am5.color(columnColor),
        fill: am5.color(columnColor),
      });
    };

    /**
     * x scrollbar 의 column series 를 설정합니다.
     */
    const setXScrollbarColumnSeries = (name, axisField) => {
      xScrollbarColumnSeries.value = xScrollbar.value.chart.series.push(
        am5xy.ColumnSeries.new(root.value, {
          ...columnSetComputed.value,
          name: name,
          ...axisField,
          xAxis: xScrollbarXAxis.value,
          yAxis: xScrollbarYAxis.value,
        })
      );
    };

    /**
     * x scrolbar 의 column series column template 을 설정합니다.
     *
     * y축이 카테고리고 x축이 value일 경우에는 width 는 am5.p100 이여야 함. (undefined 이면 100 percent 로 설정됨).
     * x축이 category일 경우에만 width 적용.
     */
    const setXScrollbarColumnSeriesColumnTemplate = (
      columnTemplateWidth,
      columnTemplateHeight,
      dataBinder,
      index,
      columnColor
    ) => {
      xScrollbarColumnSeries.value.columns.template.setAll({
        ...columnTemplateSetComputed.value,
        width: columnTemplateWidth,
        height: columnTemplateHeight,
        tooltipHTML: getTooltipHTML(dataBinder, index),
        stroke: am5.color(columnColor),
        fill: am5.color(columnColor),
      });
    };

    /**
     * x scrollbar column series data 를 설정합니다.
     */
    const setXScrollbarColumnSeriesData = () => {
      xScrollbarColumnSeries.value.data.setAll(data.value);
    };

    /**
     * column click event 를 정의합니다.
     *
     * @deprecated chartItemClickHandler 를 columnEvent 로 대체합니다.
     */
    const setColumnSeriesClickEvent = (columnSeries) => {
      if (chartItemClickHandler.value) {
        columnSeries.columns.template.events.on(
          "click",
          chartItemClickHandler.value
        );
      }
    };

    /**
     * column hover event 를 정의합니다.
     *
     * @deprecated columnHoverEvent 를 columnEvent 로 대체합니다.
     */
    const setColumnSeriesHoverEvent = (columnSeries) => {
      if (columnHoverEvent.value) {
        columnSeries.columns.template.events.on(
          "pointerover",
          columnHoverEvent.value
        );
      }
    };

    /**
     * column series adapter
     *
     * @deprecated seriesTooltipHTMLAdapter 를 columnSeriesAdapter 로 대체합니다.
     */
    const setColumnSeriesAdapater = (columnSeries) => {
      if (seriesTooltipHTMLAdapter.value) {
        columnSeries.columns.template.adapters.add(
          "tooltipHTML",
          (tooltipHTML, target) => {
            return seriesTooltipHTMLAdapter.value(tooltipHTML, target);
          }
        );
      }
    };

    /**
     * column series 의 data 를 설정합니다.
     */
    const setColumnSeriesData = (columnSeries) => {
      columnSeries.data.setAll(data.value);
      columnSeriesList.value.push(columnSeries);
    };

    /**
     * y axis header 를 설정합니다.
     *
     * @param {*} yAxisListDataBinder
     * @param {*} index
     */
    const createYAxisHeader = (yAxisListDataBinder, index = 0) => {
      yAxisList.value[index].axisHeader.children.clear();

      if (
        yAxisListDataBinder?.axisHeaderText ||
        yAxisHeaderLabelSetComputed.value.text ||
        yAxisHeaderLabelSetComputed.value.html
      ) {
        setYaxisHeaderMinHeight(index);
        setYAxisHeaderBackground(index);
        setYAxisHeader(yAxisListDataBinder, index);
      }
    };

    /**
     * y axis header 의 minHeight 를 설정합니다.
     */
    const setYaxisHeaderMinHeight = (index) => {
      yAxisList.value[index].axisHeader.set(
        "minHeight",
        chartSetComputed.value.yAxis.axisHeader.minHeight
      );
    };

    /**
     * y axis header 의 background 를 설정합니다.
     */
    const setYAxisHeaderBackground = (index) => {
      yAxisList.value[index].axisHeader
        .get("background")
        .setAll(yAxisHeaderBackgroundSetComputed.value);
    };

    /**
     * y axis header 를 설정합니다.
     */
    const setYAxisHeader = (yAxisListDataBinder, index) => {
      yAxisList.value[index].axisHeader.children.push(
        am5.Label.new(root.value, {
          ...yAxisHeaderLabelSetComputed.value,
          text: yAxisListDataBinder?.axisHeaderText
            ? yAxisListDataBinder.axisHeaderText
            : yAxisHeaderLabelSetComputed.value.text,
        })
      );
    };

    /**
     * y axis 에 추가 label 을 설정합니다.
     *
     * @param {*} yAxisListDataBinder
     * @param {*} index
     */
    const setYAxisExtraLabel = (yAxisListDataBinder, index) => {
      logTest.value && console.log("setYAxisExtraLabel");

      /**
       * 기존에 Label 을 넣었던 container 가 있으면 dispose
       */
      am5.array.each(yAxisList.value[index].children.values, (listItem) => {
        if (listItem?.children?.values[0]?.className === "Label") {
          listItem.dispose();
        }
      });

      if (
        yAxisExtraLabelSetComputed.value.text ||
        yAxisExtraLabelSetComputed.value.html ||
        yAxisListDataBinder?.extraLabelText
      ) {
        /**
         * y axis 의 extra label container 를 설정합니다.
         */
        let extraLabelContainer = yAxisList.value[index].children[
          yAxisListDataBinder?.opposite ? "push" : "unshift"
        ](
          am5.Container.new(root.value, {
            height: am5.percent(100),
          })
        );
        /**
         * extra label container 에 yAxisExtraLabel 을 추가합니다.
         */
        extraLabelContainer.children.push(
          am5.Label.new(root.value, {
            ...yAxisExtraLabelSetComputed.value,
            rotation: yAxisListDataBinder?.opposite ? 90 : -90,
            centerY: yAxisListDataBinder?.opposite
              ? am5.percent(100)
              : am5.percent(0),
            text: yAxisListDataBinder?.extraLabelText
              ? yAxisListDataBinder.extraLabelText
              : yAxisExtraLabelSetComputed.value.text,
          })
        );
      }
    };

    /**
     * x axis grid 의 strokeOpacity 와 관련한 adapter 를 설정합니다.
     *
     * @deprecated xAxisGridAdapter 로 대체합니다.
     */
    const setXAxisGridStrokeOpacityAdapter = () => {
      if (xAxisGridStrokeOpacityAdapter.value) {
        xAxis.value
          .get("renderer")
          .grid.template.adapters.add(
            "strokeOpacity",
            (strokeOpacity, target) => {
              return xAxisGridStrokeOpacityAdapter.value(target);
            }
          );
      }
    };

    /**
     * 차트를 생성합니다.
     */
    const createChart = () => {
      logTest.value && console.log("createChart");

      nextTick(() => {
        if (amChartRef.value) {
          setRoot();
          setTheme();
          setRootContainer();
          setXyContainer();
          setAxes();
          createXScrollbar();
          createSeries();
          setCursor();
          setZoomOutButton();
          createLegend();
          setNumberFormatter();
          setContainerLayout();

          if (setCustom.value) {
            setCustom.value({ am5, xyVueInstance });
          }

          chart.value.appear(1000, 100);
        }
      });
    };

    /**
     * root 를 설정합니다.
     */
    const setRoot = () => {
      if (root?.value && !root.value.isDisposed()) {
        root.value.dispose();
      }
      // if (!root.value) {
      root.value = am5.Root.new(amChartRef.value, {
        tooltipContainerBounds: {
          top: chartSetComputed.value.root.tooltipContainerBounds.top,
          bottom: chartSetComputed.value.root.tooltipContainerBounds.bottom,
          left: chartSetComputed.value.root.tooltipContainerBounds.left,
          right: chartSetComputed.value.root.tooltipContainerBounds.right,
        },
      });
      // }
    };

    /**
     * theme 설정합니다.
     */
    const setTheme = () => {
      const myTheme = am5.Theme.new(root.value);
      if (chartSetComputed.value.useTheme) {
        root.value.setThemes([am5themes_Animated.new(root.value), myTheme]);
      }
    };

    /**
     * rightAxesContainer 와 leftAxesContainer 의 layout 을 설정합니다.
     */
    const setContainerLayout = () => {
      let yAxisContainerLayout = chartSetComputed.value.yAxis.isStacked
        ? root.value.verticalLayout
        : root.value.horizontalLayout;

      setRightAxesContainerLayout(yAxisContainerLayout);
      setLeftAxesContainerLayout(yAxisContainerLayout);
    };

    /**
     * rightAxesContainer layout 을 설정합니다.
     */
    const setRightAxesContainerLayout = (yAxisContainerLayout) => {
      chart.value.rightAxesContainer.setAll({
        layout: yAxisContainerLayout,
      });
    };

    /**
     * leftAxesContainer layout 을 설정합니다.
     */
    const setLeftAxesContainerLayout = (yAxisContainerLayout) => {
      chart.value.leftAxesContainer.setAll({
        layout: yAxisContainerLayout,
      });
    };

    /**
     * root container 를 설정합니다.
     */
    const setRootContainer = () => {
      logTest.value && console.log("setRootContainer");
      root.value.container.set(
        "layout",
        root.value[chartSetComputed.value.root.container.layout]
      );
    };

    /**
     * xy container 를 설정합니다.
     */
    const setXyContainer = () => {
      if (!xyContainer.value) {
        xyContainer.value = root.value.container.children.push(
          am5.Container.new(root.value, xyChartContainerSetComputed.value)
        );
      } else {
        xyContainer.value.setAll(xyChartContainerSetComputed.value);
      }

      setChartContainer();
    };

    /**
     * 전역적으로 설정될 numberformat 을 설정합니다.
     */
    const setNumberFormatter = () => {
      root.value.numberFormatter.setAll(rootNumberFormatterSetComputed.value);
    };

    /**
     * category axis 를 설정합니다.
     */
    const setCategoryAxis = () => {
      return {
        categoryField: category.value,
        maxDeviation: 0,
        fillRule: (dataItem) => {
          var axisFill = dataItem.get("axisFill");
          axisFill.setPrivate("visible", true);
          if (setXAxisFillRule.value) {
            setXAxisFillRule.value(dataItem, axisFill);
          }
        },
      };
    };

    /**
     * value axis 를 설정합니다.
     *
     * @param {} param0
     */
    const setValueAxis = ({ yAxisListDataBinder, isPercent }) => {
      let percentAvailable = {};
      if (isPercent || chartSetComputed.value.valueAxis.isPercent) {
        percentAvailable = {
          min: 0,
          max: 100,
          extraMax: 0,
          numberFormat: "#'%'",
          calculateTotals: true,
        };
      }

      let yAxisListDataBinderConfig = {};

      if (yAxisListDataBinder) {
        if (
          yAxisListDataBinder.min !== null &&
          typeof yAxisListDataBinder.min !== "undefined" &&
          yAxisListDataBinder.min >= 0
        ) {
          yAxisListDataBinderConfig.min = yAxisListDataBinder.min;
        }

        if (
          yAxisListDataBinder.max !== null &&
          typeof yAxisListDataBinder.max !== "undefined" &&
          yAxisListDataBinder.max >= 0
        ) {
          yAxisListDataBinderConfig.max = yAxisListDataBinder.max;
        }

        if (yAxisListDataBinder.numberFormat) {
          yAxisListDataBinderConfig.numberFormat =
            yAxisListDataBinder.numberFormat;
        }
      }

      return {
        strictMinMaxSelection:
          chartSetComputed.value.valueAxis.strictMinMaxSelection,
        min: chartSetComputed.value.valueAxis.min,
        max: chartSetComputed.value.valueAxis.max,
        extraMax: chartSetComputed.value.valueAxis.extraMax,
        baseValue: chartSetComputed.value.valueAxis.baseValue,
        maxPrecision: chartSetComputed.value.valueAxis.maxPrecision,
        ...percentAvailable,
        ...yAxisListDataBinderConfig,
      };
    };

    /**
     * x scrollbar 를 설정하는 함수 모음입니다.
     */
    const createXScrollbar = () => {
      logTest.value && console.log("createXScrollbar");

      setXScrollbar();
      setXScrollbarPosition();
      setXScrollbarAxis();
      setXScrollbarThumb();
      setXScrollbarStartGrip();
      setXScrollbarEndGrip();
      setXScrollbarBackground();
    };

    /**
     * x scrollbar 를 설정합니다.
     */
    const setXScrollbar = () => {
      if (!xScrollbar.value) {
        xScrollbar.value = chart.value.set(
          "scrollbarX",
          am5xy.XYChartScrollbar.new(root.value, xScrollbarSetComputed.value)
        );
      } else {
        xScrollbar.value.setAll(xScrollbarSetComputed.value);
      }
    };

    /**
     * x scrollbar 의 position 을 설정합니다.
     */
    const setXScrollbarPosition = () => {
      if (xScrollbarSetComputed.value.isDown) {
        chart.value.bottomAxesContainer.children.push(xScrollbar.value);
      }
    };

    /**
     *  x scrollbar 의 thumb 를 설정합니다.
     */
    const setXScrollbarThumb = () => {
      xScrollbar.value.thumb.setAll(xScrollbarThumbSetComputed.value);
    };

    /**
     * x scrollbar 의 start grip 를 설정합니다.
     */
    const setXScrollbarStartGrip = () => {
      xScrollbar.value.startGrip.setAll(xScrollbarStartGripSetComputed.value);
    };

    /**
     * x scrollbar 의 end grip 을 설정합니다.
     */
    const setXScrollbarEndGrip = () => {
      xScrollbar.value.endGrip.setAll(xScrollbarEndGripSetComputed.value);
    };

    /**
     * x scrollbar 의 background 설정합니다.
     */
    const setXScrollbarBackground = () => {
      xScrollbar.value
        .get("background")
        .setAll(xScrollbarBackgroundSetComputed.value);
    };

    /**
     * x scrollbar 의 axis 를 설정하는 함수들입니다.
     */
    const setXScrollbarAxis = () => {
      logTest.value && console.log("setXScrollbarAxis");
      createXScrollbarXAxis();
      setXScrollbarYAxis();
    };

    /**
     * x scrollbar 의 x axis 를 설정합니다.
     */
    const createXScrollbarXAxis = () => {
      logTest.value && console.log("createXScrollbarXAxis");

      if (xScrollbar.value) {
        setXScrollbarXAxis();

        /**
         * x scrollbar 의 x axis label text adapter 을 설정합니다.
         *
         * @deprecated xScrollbarXAxisAdapter 로 대체합니다.
         */
        if (xScrollbarXAxisLabelTextAdapter.value) {
          xScrollbarXAxis.value
            .get("renderer")
            .labels.template.adapters.add("text", (text, target) => {
              return xScrollbarXAxisLabelTextAdapter.value(
                text,
                target,
                data.value
              );
            });
        }

        setXScrollbarXAxisLabel();
        setXScrollbarXAxisGrid();
        setXScrollbarXAxisData();
      }
    };

    /**
     * x scrollbar x axis 설정합니다.
     */
    const setXScrollbarXAxis = () => {
      if (!xScrollbarXAxis.value) {
        xScrollbarXAxis.value = xScrollbar.value.chart.xAxes.push(
          am5xy[chartSetComputed.value.xAxis.type].new(root.value, {
            categoryField: category.value,
            renderer: am5xy.AxisRendererX.new(
              root.value,
              xAxisRendererSetComputed.value
            ),
          })
        );
      } else {
        xScrollbarXAxis.value.setAll({ categoryField: category.value });
        xScrollbarXAxis.value
          .get("renderer")
          .setAll(xAxisRendererSetComputed.value);
      }
    };

    /**
     * x scrollbar 의 x axis label 을 설정합니다.
     */
    const setXScrollbarXAxisLabel = () => {
      xScrollbarXAxis.value.get("renderer").labels.template.setAll({
        fontSize: 10,
        textAlign: "center",
      });
    };

    /**
     * x scrollbar 의 x axis grid 를 설정합니다.
     */
    const setXScrollbarXAxisGrid = () => {
      xScrollbarXAxis.value
        .get("renderer")
        .grid.template.setAll(xAxisGridSetComputed.value);
    };

    /**
     * x scrollbar 의 x axis data 를 설정합니다.
     */
    const setXScrollbarXAxisData = () => {
      xScrollbarXAxis.value.data.setAll(data.value);
    };

    /**
     * x scrollbar 의 y axis 를 설정합니다.
     */
    const setXScrollbarYAxis = () => {
      logTest.value && console.log("setXScrollbarYAxis");

      /**
       * get y axis settings
       */
      let axisType = chartSetComputed.value.yAxis.type;
      let yAxisSettings = getAxisSettings({ axisType });

      if (xScrollbar.value) {
        if (!xScrollbarYAxis.value) {
          xScrollbarYAxis.value = xScrollbar.value.chart.yAxes.push(
            am5xy[chartSetComputed.value.yAxis.type].new(root.value, {
              ...yAxisSettings.value,
              ...yAxisSettings,
              renderer: am5xy.AxisRendererY.new(root.value, {}),
            })
          );
        } else {
          xScrollbarYAxis.value.setAll(yAxisSettings);
        }
        xScrollbarYAxis.value.data.setAll(data.value);
      }
    };

    /**
     * zoom out 버튼을 설정합니다.
     *
     * - zoom out 버튼이 보이지 않는 것을 기본으로 합니다.
     */
    const setZoomOutButton = () => {
      if (!chartSetComputed.value.isZoomOutButton) {
        chart.value.zoomOutButton.set("forceHidden", true);
      }
    };

    /**
     * x axis 를 생성합니다.
     */
    const createXAxis = () => {
      logTest.value && console.log("createXAxis");

      setXAxis();
    };

    const setXAxisData = () => {
      xAxis.value.data.setAll(data.value);
    };

    /**
     * x axis 를 생성합니다.
     */
    const setXAxis = () => {
      logTest.value && console.log("setXAxis");

      let axisType = chartSetComputed.value.xAxis.type;
      let xAxisSettings = getAxisSettings({ axisType });

      if (!xAxis.value) {
        xAxis.value = chart.value.xAxes.push(
          am5xy[axisType].new(root.value, {
            ...xAxisSettings,
            renderer: am5xy.AxisRendererX.new(root.value, {
              ...xAxisRendererSetComputed.value,
            }),
          })
        );
      } else {
        xAxis.value.setAll(xAxisSettings);
        xAxis.value.get("renderer").setAll(xAxisRendererSetComputed.value);
      }

      setXAxisTooltip();
      setXAxisExtraLabel();
      setXAxisLabel();
      setXAxisGrid();
      setXAxisLabelTextAdapter();
      setXAxisTooltipLabelTextAdapter();
      setXAxisGridStrokeOpacityAdapter();
      setXAxisData();
    };

    /**
     * x axis tooltip 을 설정합니다.
     */
    const setXAxisTooltip = () => {
      let tooltipHTML = chartSetComputed.value.xAxis.tooltipHTML;
      xAxis.value.set("tooltip", getAxisTooltip(tooltipHTML));
    };

    /**
     * axis 에 설정할 tooltip 을 가져옵니다.
     *
     * @param {*} tooltipHTML
     *
     */
    const getAxisTooltip = (tooltipHTML) => {
      let labelHTML = tooltipHTML ? tooltipHTML : "";
      return am5.Tooltip.new(root.value, { labelHTML });
    };

    /**
     * x axis 에 추가 label 을 설정합니다.
     */
    const setXAxisExtraLabel = () => {
      logTest.value && console.log("setXAxisExtraLabel");

      if (
        xAxisExtraLabelSetComputed.value.html ||
        xAxisExtraLabelSetComputed.value.text
      ) {
        if (!xAxisExtraLabel.value) {
          xAxisExtraLabel.value = xAxis.value.children.push(
            am5.Label.new(root.value, xAxisExtraLabelSetComputed.value)
          );
        } else {
          xAxisExtraLabel.value.setAll(xAxisExtraLabelSetComputed.value);
        }
      }
    };

    /**
     * x axis label 을 설정합니다.
     */
    const setXAxisLabel = () => {
      xAxis.value
        .get("renderer")
        .labels.template.setAll(xAxisLabelSetComputed.value);
    };

    /**
     * x axis grid 를 설정합니다.
     */
    const setXAxisGrid = () => {
      xAxis.value
        .get("renderer")
        .grid.template.setAll(xAxisGridSetComputed.value);
    };

    /**
     * x axis label 의 text adapter 를 설정합니다.
     *
     * @deprecated xAxisLabelTextAdapter 를 xAxisLabelAdapter 로 대체합니다.
     */
    const setXAxisLabelTextAdapter = () => {
      if (xAxisLabelTextAdapter.value) {
        xAxis.value
          .get("renderer")
          .labels.template.adapters.add("text", (text, target) => {
            return xAxisLabelTextAdapter.value(text, target);
          });
      }
    };

    /**
     * x axis 의 tooltip 에 설정할 text adapter 입니다.
     *
     * @deprecated xAxisTooltipLabelTextAdapter 를 xAxisTooltipLabelAdapter 로 대체합니다.
     */
    const setXAxisTooltipLabelTextAdapter = () => {
      if (xAxisTooltipLabelTextAdapter.value) {
        xAxis.value
          .get("tooltip")
          .label.adapters.add("text", (text, target) => {
            return xAxisTooltipLabelTextAdapter.value(text, target);
          });
      }
    };

    /**
     * y axis 를 생성합니다.
     *
     * @param {*} yAxisListDataBinder
     * @param {*} index
     */
    const createYAxis = (yAxisListDataBinder, index = 0) => {
      logTest.value && console.log("createYAxis: ", index);

      setYAxis(yAxisListDataBinder, index);
      setYAxisOpposite(yAxisListDataBinder, index);
      setYAxisTooltip(index);
      setYAxisGrid(index);
      setYAxisLabel(yAxisListDataBinder, index);
      setYAxisExtraLabel(yAxisListDataBinder, index);
      setYAxisCreateRange(index);
      createYAxisHeader(yAxisListDataBinder, index);

      yAxisList.value[index].data.setAll(data.value);
    };

    /**
     * y axis grid template 을 설정합니다.
     *
     * @param {} index
     */
    const setYAxisGrid = (index = 0) => {
      yAxisList.value[index]
        .get("renderer")
        .grid.template.setAll(yAxisGridSetComputed.value);
    };

    /**
     * axis settings 를 가져옵니다.
     *
     */
    const getAxisSettings = ({ yAxisListDataBinder, axisType, isPercent }) => {
      logTest.value && console.log("getAxisSettings");

      if (axisType === "ValueAxis") {
        return setValueAxis({ yAxisListDataBinder, isPercent });
      }
      if (axisType === "CategoryAxis") {
        return setCategoryAxis();
      }
    };

    /**
     * y axis 를 생성합니다.
     *
     * @param {*} yAxisListDataBinder
     * @param {*} index
     */
    const setYAxis = (yAxisListDataBinder, index = 0) => {
      logTest.value && console.log("setYAxis");

      let axisType = chartSetComputed.value.yAxis.type;

      let yAxisSettings = getAxisSettings({
        yAxisListDataBinder,
        axisType,
        isPercent: yAxisListDataBinder?.isPercent,
      });

      /**
       * syncWithAxis 를 설정합니다.
       */
      let syncWithAxis =
        yAxisListDataBinder?.syncIndex !== undefined
          ? yAxisList.value[yAxisListDataBinder.syncIndex]
          : undefined;

      if (!yAxisList.value[index]) {
        yAxisList.value[index] = chart.value.yAxes.unshift(
          am5xy[axisType].new(root.value, {
            ...yAxisSetComputed.value,
            ...yAxisSettings,
            syncWithAxis,
            renderer: am5xy.AxisRendererY.new(root.value, {
              ...yAxisRendererSetComputed.value,
            }),
          })
        );
      } else {
        yAxisList.value[index].setAll({
          ...yAxisSetComputed.value,
          ...yAxisSettings,
          syncWithAxis,
        });
        yAxisList.value[index].get("renderer").setAll({
          ...yAxisRendererSetComputed.value,
        });
      }
    };

    /**
     * set y axis opposite 을 설정합니다.
     */
    const setYAxisOpposite = (yAxisListDataBinder, index) => {
      yAxisList.value[index]
        .get("renderer")
        .set("opposite", yAxisListDataBinder?.opposite);
    };

    /**
     * y axis tooltip 을 설정합니다.
     */
    const setYAxisTooltip = (index) => {
      let tooltipHTML = chartSetComputed.value.yAxis.tooltipHTML;
      yAxisList.value[index].set("tooltip", getAxisTooltip(tooltipHTML));
    };

    /**
     * y axis label 을 설정합니다.
     *
     * @param {*} yAxisListDataBinder
     * @param {*} index
     */
    const setYAxisLabel = (yAxisListDataBinder, index = 0) => {
      logTest.value && console.log("setYAxisLabel");

      yAxisList.value[index]
        .get("renderer")
        .labels.template.setAll(yAxisLabelSetComputed.value);
    };

    /**
     * y axis 에 range 를 설정합니다.
     *
     * @param {*} yAxisListIndex
     */
    const setYAxisCreateRange = (yAxisListIndex = 0) => {
      if (yAxisRange.value) {
        yAxisRange.value.map((dataBinder) => {
          let rangeDataItem = yAxisList.value[yAxisListIndex].makeDataItem({
            value: dataBinder.value,
            endValue: dataBinder.endValue,
            above: true,
          });

          /**
           * set y axis range
           */
          range.value =
            yAxisList.value[yAxisListIndex].createAxisRange(rangeDataItem);

          /**
           * location settings
           */
          let location =
            typeof dataBinder.location === "number"
              ? { location: dataBinder.location }
              : { location: chartSetComputed.value.yAxis.grid.location };

          /**
           * color settings
           */
          let color = dataBinder.color ? dataBinder.color : "#579ffb";

          /**
           * stroke dash array settings
           */
          let strokeDasharray = dataBinder?.strokeDasharray
            ? { strokeDasharray: dataBinder.strokeDasharray }
            : {};

          setRangeGrid(color, strokeDasharray, location);
          setRangeAxisFill(color);
          setRangeLabel(dataBinder.text, location, color);
        });
      }
    };

    /**
     * range grid 를 설정합니다.
     *
     * @param {*} color
     * @param {*} strokeDasharray
     * @param {*} location
     */
    const setRangeGrid = (color, strokeDasharray, location) => {
      range.value.get("grid").setAll({
        stroke: am5.color(color),
        strokeOpacity: 1,
        ...strokeDasharray,
        ...location,
      });
    };

    /**
     * range axis fill 을 설정합니다.
     *
     * @param {*} color
     */
    const setRangeAxisFill = (color) => {
      range.value.get("axisFill").setAll({
        fill: am5.color(color),
        fillOpacity: 0.1,
        visible: true,
      });
    };

    /**
     * range label 을 설정합니다.
     *
     * @param {*} text
     * @param {*} location
     * @param {*} color
     */
    const setRangeLabel = (text, location, color) => {
      if (text) {
        range.value.get("label").setAll({
          fill: am5.color(0xffffff),
          text: text,
          ...location,
          background: am5.RoundedRectangle.new(root.value, {
            fill: am5.color(color),
          }),
        });
      }
    };

    /**
     * xy chart 의 axis 를 생성하는 함수들입니다.
     */
    const setAxes = () => {
      logTest.value && console.log("setAxes");

      createXAxis();
      if (chartSetComputed.value.yAxisList) {
        chartSetComputed.value.yAxisList.map((yAxisListDataBinder, index) => {
          createYAxis(yAxisListDataBinder, index);
        });
      } else {
        createYAxis();
      }
    };

    /**
     * cursor 를 설정합니다.
     */
    const setCursor = () => {
      logTest.value && console.log("setCursor");
      if (chartSetComputed.value.cursor.isAvailable) {
        chart.value.set(
          "cursor",
          am5xy.XYCursor.new(root.value, {
            behavior: "none",
            xAxis: chartSetComputed.value.cursor.xAxis.isFocused
              ? xAxis.value
              : undefined,
            yAxis: chartSetComputed.value.cursor.yAxis.isFocused
              ? yAxisList.value[0]
              : undefined,
          })
        );

        let cursor = chart.value.get("cursor");

        if (getWheelCursorPositionX.value) {
          cursor.events.on("wheel", (ev) => {
            if (ev.target.getPrivate("positionX")) {
              getWheelCursorPositionX.value(ev.target.getPrivate("positionX"));
            }
          });
        }
      }
    };

    /**
     * chart container 를 설정합니다.
     *
     * xyContainer 에 xy chart 를 추가합니다.
     */
    const setChartContainer = () => {
      logTest.value && console.log("setChartContainer");

      if (!chart.value) {
        chart.value = xyContainer.value.children.push(
          am5xy.XYChart.new(root.value, xyChartSetComputed.value)
        );
      } else {
        chart.value.setAll(xyChartSetComputed.value);
      }

      setYAxesAndPlotContainer();
      setBottomAxesContainer();
    };

    /**
     * yAxesAndPlotContainer 를 보이지 않도록 합니다. (optional)
     */
    const setYAxesAndPlotContainer = () => {
      if (!chartSetComputed.value.isYAxesPlotContainerVisible) {
        chart.value.yAxesAndPlotContainer.set("forceHidden", true);
      }
    };

    /**
     * bottomAxesContainer 를 보이지 않도록 합니다. (optional)
     */
    const setBottomAxesContainer = () => {
      if (!chartSetComputed.value.isBottomAxesContainerVisible) {
        chart.value.bottomAxesContainer.set("forceHidden", true);
      }
    };

    /**
     * candlestick series 를 설정합니다.
     */
    const createCandlestickSeries = () => {
      if (
        candlestickDataBinder.value &&
        candlestickDataBinder.value.length > 0
      ) {
        candlestickSettings.value = {
          tooltip: makeTooltip(),
          name: candlestickDataBinder.value?.displayName,
          openValueYField: candlestickDataBinder.value?.openValue?.key,
          highValueYField: candlestickDataBinder.value?.highValue?.key,
          lowValueYField: candlestickDataBinder.value?.lowValue?.key,
          valueYField: candlestickDataBinder.value?.defaultValue?.key,
          categoryXField: category.value,
        };

        setCandlestickSeriesChart();
        createXScrollbarCandlestickSeries();
      }
    };

    /**
     * candlestick series 를 설정합니다.
     */
    const setCandlestickSeriesChart = (yAxisListIndex = 0) => {
      candlestickSeries.value = am5xy.CandlestickSeries.new(root.value, {
        xAxis: xAxis.value,
        yAxis: yAxisList.value[yAxisListIndex],
        ...candlestickSettings.value,
      });

      addCandlestickSeries();
      setCandlestickSeriesColumn();
      setCandlestickSeriesColumnRiseFromOpenState();
      setCandlestickSeriesColumnDropFromOpenState();
      setCandlestickSeriesTooltipLabel();
      setCandleStickSeriesColumnEvent();
      setCandlestickSeriesData();
    };

    /**
     * chart 에 candlestick series 를 추가합니다.
     */
    const addCandlestickSeries = () => {
      xySeries.value = chart.value.series.push(candlestickSeries.value);
    };

    /**
     * candlestick series 의 column template 을 정의합니다.
     */
    const setCandlestickSeriesColumn = () => {
      candlestickSeries.value.columns.template.setAll({
        width: 30,
      });
    };

    /**
     * candlestick series 의 riseFromOpen 상태를 정의합니다.
     */
    const setCandlestickSeriesColumnRiseFromOpenState = () => {
      candlestickSeries.value.columns.template.states.create("riseFromOpen", {
        fill: am5.color(candlestickSetComputed.value.riseColor),
        stroke: am5.color(candlestickSetComputed.value.riseColor),
      });
    };

    /**
     * candlestick series 의 dropFromOpen 상태를 정의합니다.
     */
    const setCandlestickSeriesColumnDropFromOpenState = () => {
      candlestickSeries.value.columns.template.states.create("dropFromOpen", {
        fill: am5.color(candlestickSetComputed.value.dropColor),
        stroke: am5.color(candlestickSetComputed.value.dropColor),
      });
    };

    /**
     * candlestick series 의 tooltip 형태를 정의합니다.
     */
    const setCandlestickSeriesTooltipLabel = () => {
      candlestickSeries.value
        .get("tooltip")
        .label.set(
          "text",
          `${candlestickDataBinder.value?.openValue?.displayName}: {openValueY}\n` +
            `${candlestickDataBinder.value?.highValue?.displayName}: {highValueY}\n` +
            `${candlestickDataBinder.value?.lowValue?.displayName}: {lowValueY}\n` +
            `${candlestickDataBinder.value?.defaultValue?.displayName}: {valueY}`
        );
    };

    /**
     * candle stick 의 column click event 입니다.
     *
     * @deprecated chartItemClickHandler 을 candlestickSeriesColumnEvent 로 대체합니다.
     */
    const setCandleStickSeriesColumnEvent = () => {
      candlestickSeries.value.columns.template.events.on(
        "click",
        chartItemClickHandler.value
      );
    };

    /**
     * set candlestick series data
     */
    const setCandlestickSeriesData = () => {
      candlestickSeries.value.data.setAll(data.value);
    };

    /**
     * scrollbar 에 candlestick series 를 추가합니다.
     */
    const createXScrollbarCandlestickSeries = () => {
      if (
        // xScrollbarSetComputed.value.detail.isVisible &&
        // !xScrollbarSetComputed.value.detail.mainValue.key
        xScrollbar.value
      ) {
        setXScrollbarCandlestickSeries();
        addXScrollbarCandlestickSeries();
        setXScrollbarCandlestickSeriesRiseFromOpenState();
        setXScrollbarCandleStickSeriesDropFromOpenState();
        setXScrollbarCandleStickSeriesData();
      }
    };

    /**
     * x scrollbar 용 candlestick series 를 정의합니다.
     */
    const setXScrollbarCandlestickSeries = () => {
      xScrollbarCandlestickSeries.value = am5xy.CandlestickSeries.new(
        root.value,
        {
          xAxis: xScrollbarXAxis.value,
          yAxis: xScrollbarYAxis.value,
          ...candlestickSettings.value,
        }
      );
    };

    /**
     * x scrollbar 에 candlestick series 를 추가합니다.
     */
    const addXScrollbarCandlestickSeries = () => {
      xScrollbar.value.chart.series.push(xScrollbarCandlestickSeries.value);
    };

    /**
     * x scrollbar candlestick series 의 riseFromOpen state를 정의합니다.
     */
    const setXScrollbarCandlestickSeriesRiseFromOpenState = () => {
      xScrollbarCandlestickSeries.value.columns.template.states.create(
        "riseFromOpen",
        {
          fill: am5.color(candlestickSetComputed.value.riseColor),
          stroke: am5.color(candlestickSetComputed.value.riseColor),
        }
      );
    };

    /**
     * x scrollbar candlestick series 의 dropFromOpen state 를 정의합니다.
     */
    const setXScrollbarCandleStickSeriesDropFromOpenState = () => {
      xScrollbarCandlestickSeries.value.columns.template.states.create(
        "dropFromOpen",
        {
          fill: am5.color(candlestickSetComputed.value.dropColor),
          stroke: am5.color(candlestickSetComputed.value.dropColor),
        }
      );
    };

    /**
     * x scrollbar candle stickseries 의 data 를 설정합니다.
     */
    const setXScrollbarCandleStickSeriesData = () => {
      xScrollbarCandlestickSeries.value.data.setAll(data.value);
    };

    /**
     * legend 를 생성합니다.
     */
    const createLegend = () => {
      logTest.value && console.log("createLegend");
      setLegendContainer();
    };

    /**
     * legend marker rectangles 의 stroke dash array adapter 를 설정합니다.
     *
     * @deprecated legendMarkerRectanglesStrokeDashArrayAdapter 를 legendMarkerRectangleAdapter 로 대체합니다.
     */
    const setLegendMarkerRectanglesStrokeDashArrayAdapter = () => {
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
     * set custom legend 가 있을 경우 setCustomLegend 함수를 작동하고 아닐 경우 legend data 를 setting 한다.
     */
    const setLegendData = () => {
      if (setCustomLegend.value) {
        setCustomLegend.value({ am5, xyVueInstance });
      } else {
        legend.value.data.setAll(
          legendData.value ? legendData.value : chart.value.series.values
        );
      }
    };

    /**
     * legend 를 담을 legend Contaienr 를 생성한다.
     *
     * root conatiner layout 에 따라 legendContainer 위치가 조정된다.
     */
    const setLegendContainer = () => {
      if (!legendContainer.value) {
        legendContainer.value = root.value.container.children.push(
          am5.Container.new(root.value, {
            width:
              chartSetComputed.value.root.container.layout === "verticalLayout"
                ? am5.percent(100)
                : null,
            height:
              chartSetComputed.value.root.container.layout === "verticalLayout"
                ? null
                : am5.percent(100),
          })
        );
      }

      setLegend();
    };

    /**
     * set legend
     */
    const setLegend = () => {
      if (!legend.value) {
        legend.value = legendContainer.value.children.push(
          am5.Legend.new(root.value, legendSetComputed.value)
        );
      } else {
        legend.value.setAll(legendSetComputed.value);
      }

      setLegendLabel();
      setLegendMarker();
      setLegendMarkerRectangle();
      setLegendValueLabel();
      setLegendData();
    };

    /**
     * legend label set
     */
    const setLegendLabel = () => {
      legend.value.labels.template.setAll(legendLabelSetComputed.value);
    };

    /**
     * legend marker set
     */
    const setLegendMarker = () => {
      legend.value.markers.template.setAll(legendMarkerSetComputed.value);
    };

    /**
     * legend markerRectangle set
     */
    const setLegendMarkerRectangle = () => {
      legend.value.markerRectangles.template.setAll(
        legendMarkerRectangleSetComputed.value
      );
      setLegendMarkerRectanglesStrokeDashArrayAdapter();
    };

    /**
     * legend value label forceHidden (value 공간 없애서 불필요 공간이 사라지도록 처리)
     */
    const setLegendValueLabel = () => {
      legend.value.valueLabels.template.set("forceHidden", true);
    };

    /**
     * 모든 값들이 없는지 여부를 확인합니다.
     */
    const allNoValue = computed(() => {
      let resultArray = data.value.map((dataItem) => {
        // category 항목을 0 으로 설정. (category 를 제외한 모든 항목이 0인지 확인하기 위해).
        let newDataItem = Object.assign({}, dataItem);
        newDataItem[category.value] = 0;

        const dataValues = Object.values(newDataItem);
        // data의 모든 값들이 실제값이 아닌지 확인.
        return dataValues.every((element) => !element);
      });

      // 모두 데이터가 0인 항목인지 여부를 return
      return resultArray.every((element) => element);
    });

    /**
     * chart 의 기본설정을 정의합니다.
     *
     * 미리 정의한 chartSettings 와 props로 전달받은 chartSet 을 합칩니다.
     */
    const chartSetComputed = computed(() => {
      return Object.assign({}, merge(chartSettings, chartSet.value));
    });

    /**
     * 전역적으로 적용될 numberformatter 설정을 정의합니다.
     *
     * 미리 정의한 rootNumberFormatterSettings 와 props 로 전달받은 rootNumberFormatterSet 을 합칩니다.
     */
    const rootNumberFormatterSetComputed = computed(() => {
      return Object.assign(
        {},
        rootNumberFormatterSettings,
        rootNumberFormatterSet.value
      );
    });

    /**
     * x scrollbar 설정을 정의합니다.
     *
     * 미리 정의한 xScrollbarSettings 와 props로 전달받은 xScrollbarSet을 합칩니다.
     */
    const xScrollbarSetComputed = computed(() => {
      return Object.assign({}, xScrollbarSettings, xScrollbarSet.value);
    });

    /**
     * x scrollbar 배경 설정을 정의합니다.
     *
     * 미리 정의한 xScrollbarBackgroundSettings 와 props로 전달받은 xScrollbarBackgroundSet 을 합칩니다.
     */
    const xScrollbarBackgroundSetComputed = computed(() => {
      return Object.assign(
        {},
        xScrollbarBackgroundSettings,
        xScrollbarBackgroundSet.value
      );
    });

    /**
     * x scrollbar 의 thumb 를 정의합니다.
     *
     * 미리 정의한 xScrollbarThumbSettings 와 props 로 전달받은 xScrollbarThumbSet 을 합칩니다.
     */
    const xScrollbarThumbSetComputed = computed(() => {
      return Object.assign(
        {},
        xScrollbarThumbSettings,
        xScrollbarThumbSet.value
      );
    });

    /**
     * x scrollbar 의 start grip 을 정의합니다.
     *
     * 미리 정의한 xScrollbarStartGripSettings 와 props 로 전달받은 xScrollbarStartGripSet 을 합칩니다.
     */
    const xScrollbarStartGripSetComputed = computed(() => {
      return Object.assign(
        {},
        xScrollbarStartGripSettings,
        xScrollbarStartGripSet.value
      );
    });

    /**
     * x scrollbar 의 endgrip 을 정의합니다.
     *
     * 미리 정의한 xScrollbarEndGripSettings 와 props 로 전달받은 xScrollbarEndGripSet 을 합칩니다.
     */
    const xScrollbarEndGripSetComputed = computed(() => {
      return Object.assign(
        {},
        xScrollbarEndGripSettings,
        xScrollbarEndGripSet.value
      );
    });

    /**
     * y axis 의 설정을 정의합니다.
     *
     * 미리 정의한 yAxisSettings와 props 로 전달받은 yAxisSet 을 합칩니다.
     */
    const yAxisSetComputed = computed(() => {
      return Object.assign({}, yAxisSettings, yAxisSet.value);
    });

    /**
     * y axis header 의 배경 설정을 정의합니다.
     *
     * 미리 정의한 yAxisHeaderBackgroundSettings 와 props로 전달받은 yAxisHeaderBackgroundSet 을 합칩니다.
     */
    const yAxisHeaderBackgroundSetComputed = computed(() => {
      return Object.assign(
        {},
        yAxisHeaderBackgroundSettings,
        yAxisHeaderBackgroundSet.value
      );
    });

    /**
     * y axis header 의 label 설정을 정의합니다.
     *
     * 미리 정의한 yAxisHeaderLabelSettings 와 props 로 전달받은 yAxisHeaderLabelSet 을 합칩니다.
     */
    const yAxisHeaderLabelSetComputed = computed(() => {
      return Object.assign(
        {},
        yAxisHeaderLabelSettings,
        yAxisHeaderLabelSet.value
      );
    });

    /**
     * y axis renderer 설정을 정의합니다.
     *
     * 미리 정의한 yAxisRendererSettings 와 props 로 전달받은 yAxisRendererSet 을 합칩니다.
     */
    const yAxisRendererSetComputed = computed(() => {
      return Object.assign({}, yAxisRendererSettings, yAxisRendererSet.value);
    });

    /**
     * y axis grid 설정을 정의합니다.
     *
     * 미리 정의한 yAxisGridSettings 와 props로 전달받은 yAxisGridSet 을 합칩니다.
     */
    const yAxisGridSetComputed = computed(() => {
      return Object.assign({}, yAxisGridSettings, yAxisGridSet.value);
    });

    /**
     * y axis 의 label 설정을 정의합니다.
     *
     * 미리 정의한 yAxisLabelSettings 와 props로 전달받은 yAxisLabelSet 을 합칩니다.
     */
    const yAxisLabelSetComputed = computed(() => {
      return Object.assign({}, yAxisLabelSettings, yAxisLabelSet.value);
    });

    /**
     * y axis 의 추가 label 설정을 정의합니다.
     *
     * 미리 정의한 yAxisExtraLabelSettings 와 props로 전달받은 yAxisExtraLabelSet 을 합칩니다.
     */
    const yAxisExtraLabelSetComputed = computed(() => {
      return Object.assign(
        {},
        yAxisExtraLabelSettings,
        yAxisExtraLabelSet.value
      );
    });

    /**
     * x axis renderer 설정을 정의합니다.
     *
     * 미리 정의한 xAxisRendererSettings 와 props로 전달받은 xAxisRendererSet 을 합칩니다.
     */
    const xAxisRendererSetComputed = computed(() => {
      return Object.assign({}, xAxisRendererSettings, xAxisRendererSet.value);
    });

    /**
     * x axis grid 설정을 정의합니다.
     *
     * 미리 정의한 xAxisGridSettings 와 props로 전달받은 xAxisGridSet 을 합칩니다.
     */
    const xAxisGridSetComputed = computed(() => {
      return Object.assign({}, xAxisGridSettings, xAxisGridSet.value);
    });

    /**
     * x axis 의 label 설정을 정의합니다.
     *
     * 미리 정의한 xAxisLabelSettings 와 props로 전달받은 xAxisLabelSet 을 합칩니다.
     */
    const xAxisLabelSetComputed = computed(() => {
      return Object.assign({}, xAxisLabelSettings, xAxisLabelSet.value);
    });

    /**
     * x axis 의 추가 label 설정을 정의합니다.
     *
     * 미리 정의한 xAxisExtraLabelSettings 와 props로 전달받은 xAxisExtraLabelSet 을 합칩니다.
     */
    const xAxisExtraLabelSetComputed = computed(() => {
      return Object.assign(
        {},
        xAxisExtraLabelSettings,
        xAxisExtraLabelSet.value
      );
    });

    /**
     * tooltip 설정을 정의합니다.
     *
     * 미리 정의한 tooltipSettings 와 props로 전달받은 tooltipSet 을 합칩니다.
     */ const tooltipSetComputed = computed(() => {
      return Object.assign({}, tooltipSettings, tooltipSet.value);
    });

    /**
     * tooltip 배경 설정을 정의합니다.
     *
     * 미리 정의한 tooltipBackgroundSettings 와 props로 전달받은 tooltipBackgroundSet 을 합칩니다.
     */
    const tooltipBackgroundSetComputed = computed(() => {
      return Object.assign(
        {},
        tooltipBackgroundSettings,
        tooltipBackgroundSet.value
      );
    });

    /**
     * legend 설정을 정의합니다.
     *
     * 미리 정의한 legendSettings 와 props로 전달받은 legendSet 을 합칩니다.
     */ const legendSetComputed = computed(() => {
      let layout = { layout: root.value.gridLayout };
      return Object.assign({}, legendSettings, legendSet.value, layout);
    });

    /**
     * legend 의 label 설정을 정의합니다.
     *
     * 미리 정의한 legendLabelSettings 와 props로 전달받은 legendLabelSet 을 합칩니다.
     */
    const legendLabelSetComputed = computed(() => {
      return Object.assign({}, legendLabelSettings, legendLabelSet.value);
    });

    /**
     * legend marker 설정을 정의합니다.
     *
     * 미리 정의한 legendMarkerSettings 와 props로 전달받은 legendMarkerSet 을 합칩니다.
     */
    const legendMarkerSetComputed = computed(() => {
      return Object.assign({}, legendMarkerSettings, legendMarkerSet.value);
    });

    /**
     * legend marker 의 rectangle 설정을 정의합니다.
     *
     * 미리 정의한 legendMarkerRectangleSettings 와 props로 전달받은 legendMarkerRectangleSet 을 합칩니다.
     */
    const legendMarkerRectangleSetComputed = computed(() => {
      return Object.assign(
        {},
        legendMarkerRectangleSettings,
        legendMarkerRectangleSet.value
      );
    });

    /**
     * xy chart 설정을 정의합니다.
     *
     * 미리 정의한 xyChartSettings 와 props로 전달받은 xyChartSet 을 합칩니다.
     */
    const xyChartSetComputed = computed(() => {
      return Object.assign({}, xyChartSettings, xyChartSet.value);
    });

    /**
     * xy chart 를 담고있는 container 설정을 정의합니다.
     *
     * 미리 정의한 xyChartContainerSettings 와 props로 전달받은 xyChartContainerSet 을 합칩니다.
     */
    const xyChartContainerSetComputed = computed(() => {
      return Object.assign(
        {},
        xyChartContainerSettings,
        xyChartContainerSet.value
      );
    });

    /**
     * column 설정을 정의합니다.
     *
     * 미리 정의한 columnSettings 와 props로 전달받은 columnSet 을 합칩니다.
     */
    const columnSetComputed = computed(() => {
      return Object.assign({}, columnSettings, columnSet.value);
    });

    /**
     * column template 설정을 정의합니다.
     *
     * 미리 정의한 columnTemplateSettings 와 props로 전달받은 columnTemplateSet 을 합칩니다.
     */
    const columnTemplateSetComputed = computed(() => {
      return Object.assign({}, columnTemplateSettings, columnTemplateSet.value);
    });

    /**
     * bubble chart 설정을 정의합니다.
     *
     * 미리 정의한 bubbleSettings 와 props로 전달받은 bubbleSet 을 합칩니다.
     */
    const bubbleSetComputed = computed(() => {
      let result = Object.assign({}, merge(bubbleSettings, bubbleSet.value));

      result.colorList = bubbleSet.value?.colorList
        ? bubbleSet.value.colorList
        : bubbleSettings.colorList;

      return result;
    });

    /**
     * line chart 설정을 정의합니다.
     *
     * 미리 정의한 lineSettings 와 props로 전달받은 lineSet 을 합칩니다.
     */
    const lineSetComputed = computed(() => {
      return Object.assign({}, merge(lineSettings, lineSet.value));
    });

    /**
     * stepLine chart 설정을 정의합니다.
     *
     * 미리 정의한 stepLineSettings 와 props로 전달받은 stepLineSet 을 합칩니다.
     */
    const stepLineSetComputed = computed(() => {
      return Object.assign({}, merge(stepLineSettings, stepLineSet.value));
    });

    /**
     * candlestick chart 설정을 정의합니다.
     *
     * 미리 정의한 candlestickSettings 와 props로 전달받은 candlestickSet 을 합칩니다.
     */
    const candlestickSetComputed = computed(() => {
      return Object.assign(
        {},
        merge(candlestickSettings, candlestickSet.value)
      );
    });

    /**
     * chart 관련 설정이 변경될 경우 차트를 새로 그립니다.
     */
    watch(
      [
        columnSet,
        columnTemplateSet,
        lineSet,
        yAxisLabelSet,
        yAxisExtraLabelSet,
        yAxisHeaderBackgroundSet,
        yAxisHeaderLabelSet,
        yAxisRendererSet,
        yAxisGridSet,
        xAxisLabelSet,
        xAxisExtraLabelSet,
        tooltipSet,
        tooltipBackgroundSet,
        tooltipHTML,
        legendSet,
        legendLabelSet,
        legendMarkerSet,
        legendMarkerRectangleSet,
        xyChartContainerSetComputed,
        chartSetComputed,
        xScrollbarSet,
        data,
      ],
      () => {
        createChart();
      },
      { deep: true }
    );

    /**
     * mount 시에 라이센스를 등록하고 차트를 생성합니다.
     */
    onMounted(() => {
      am5.addLicense("AM5C392708372");
      createChart();
    });

    /**
     * unmount 시에 root 를 폐기합니다.
     */
    onBeforeUnmount(() => {
      logTest.value && console.log("xy-chart beforeDestroy");
      if (root.value) {
        root.value.dispose();
      }
    });

    return {
      allNoValue,
      amChartRef,
      stepLineSeriesSettings,
      stepLineStrokeTemplateSettings,
      stepLineFillsTemplateSettings,
      bubbleSeriesSettings,
      bubbleBulletSettings,
      bubbleStrokeTemplateSettings,
      bubbleFillsTemplateSettings,
      candlestickSettings,
      lineSeriesSettings,
      lineBulletSettings,
      lineFillsTemplateSettings,
      lineStrokeTemplateSettings,
      xySeries,
      xScrollbarOverallSeriesItem,
      chartTitle,
      xAxisExtraLabel,
      range,
      rangeDataItem,
      root,
      chart,
      xAxis,
      yAxisList,
      // about series
      lineSeriesList,
      lineSeries,
      stepLineSeriesList,
      stepLineSeries,
      columnSeriesList,
      columnSeries,
      bubbleSeriesList,
      bubbleSeries,
      candlestickSeriesList,
      candlestickSeries,
      xScrollbarSeriesList,
      xScrollbarSeries,
      xScrollbarColumnSeriesList,
      xScrollbarColumnSeries,
      xScrollbarLineSeriesList,
      xScrollbarLineSeries,
      xScrollbarStepLineSeriesList,
      xScrollbarStepLineSeries,
      xScrollbarBubbleSeriesList,
      xScrollbarBubbleSeries,
      xScrollbarCandlestickSeriesList,
      xScrollbarCandlestickSeries,
      legend,
      xScrollbar,
      xScrollbarXAxis,
      xScrollbarYAxis,
    };
  },
});

/**
 * TODO: overall-xy-chart 관련 부분 분리
 */

/**
 * x scrollbar 의 x 축의 grid 를 매월 1일 일 경우에만 보이도록 합니다.
 */
// xScrollbarXAxis.value
//   .get("renderer")
//   .grid.template.adapters.add(
//     "strokeOpacity",
//     (strokeOpacity, target) => {
//       let title = target.dataItem.dataContext.title;
//       if (title === "1") {
//         return 0.1;
//       } else {
//         return 0.0;
//       }
//     }
//   );

/**
 * xy chart 의 zoom 시에 동작할 핸들러입니다.
 *
 * 아래 변수를 사용하여 zoomming 된 차트의 시작값과 끝값을 확인합니다.
 *
 * - xAxis.value.getPrivate("startIndex"): 시작값
 * - xAxis.value.getPrivate("endIndex"): 끝값
 */
// setZoomHandler() {
//   logTest.value && console.log("setZoomHandler");
//   if (xAxis.value) {
//     let startIndex = 0;
//     let endIndex = 0;
//     if (xAxis.value.getPrivate("startIndex")) {
//       startIndex = xAxis.value.getPrivate("startIndex");
//     }
//     if (xAxis.value.getPrivate("endIndex")) {
//       endIndex = xAxis.value.getPrivate("endIndex");
//     }
//     if (endIndex > 0) {
//       let zoomSelectionMin =
//         xAxis.value.dataItems[startIndex].dataContext[category.value];
//       let zoomSelectoinMax =
//         xAxis.value.dataItems[endIndex - 1].dataContext[category.value];
//       zoomHandler.value(zoomSelectionMin, zoomSelectoinMax);
//     }
//   }
// },

/**
 * plot container 위에서 드래그시에 동작할 handler 입니다.
 *
 * xAxis.value.getPrivate("startIndex")
 * xAxis.value.getPrivate("endIndex")
 * xAxis.value.dataItems[startIndex].dataContext[category.value]
 * xAxis.value.dataItems[endIndex - 1].dataContext[category.value]
 */
// setPlotContainerPanHandler() {
//   logTest.value && console.log("setPlotContainerPanHandler");
//   if (xAxis.value) {
//     let startIndex = 0;
//     let endIndex = 0;
//     // startIndex 설정
//     if (xAxis.value.getPrivate("startIndex")) {
//       startIndex = xAxis.value.getPrivate("startIndex");
//     }
//     // endIndex 설정
//     if (xAxis.value.getPrivate("endIndex")) {
//       endIndex = xAxis.value.getPrivate("endIndex");
//     }
//     if (endIndex > 0) {
//       if (setSelectionMin.value) {
//         setSelectionMin.value(
//           xAxis.value.dataItems[startIndex].dataContext[category.value]
//         );
//       }
//       if (setSelectionMax.value) {
//         setSelectionMax.value(
//           xAxis.value.dataItems[endIndex - 1].dataContext[category.value]
//         );
//       }
//       // previous handler
//       if (startIndex === 0) {
//         setTimeout(() => {
//           panHandler.value("previous");
//         }, 500);
//       }
//       // next handler
//       if (endIndex >= data.value.length - 1) {
//         panHandler.value("next");
//       }
//     }
//   }
// },

/**
 * zooming 혹은 panning 시에 동작할 핸들러입니다.
 */
// setZoomPanEvents() {
//   if (zoomHandler.value) {
//     chart.value.events.on("wheelended", (ev) => {
//       setZoomHandler.value(xScrollbar.value, ev);
//     });
//   }
//   if (panHandler.value) {
//     xScrollbar.value.events.on("rangechanged", (ev) => {
//       if (ev.target.chart.xAxes._values[0]) {
//         let startItem = ev.target.chart.xAxes._values[0].getSeriesItem(
//           xySeries.value,
//           ev.start
//         );
//         let endItem = ev.target.chart.xAxes._values[0].getSeriesItem(
//           xySeries.value,
//           ev.end
//         );
//         if (
//           chartSetComputed.value.chartType === "overall" &&
//           !(ev.start === 0 && ev.end === 1)
//         ) {
//           setDataStartPoint.value(startItem.dataContext[category.value]);
//           setDataEndPoint.value(endItem.dataContext[category.value]);
//         }
//       }
//     });
//     // x scrollbar thumb panning handler
//     xScrollbar.value.thumb.events.on("pointerup", (ev) => {
//       logTest.value && console.log("x scrollbar thumb panning handler");
//       // todo 다음 걸로 하도록 바꾸기
//       let startDataIndex = 0;
//       data.value.map((data, index) => {
//         if (data[category.value] === dataStartPoint.value) {
//           startDataIndex = index;
//         }
//       });
//       // setSelectionMin.value(dataStartPoint.value);
//       setSelectionMin.value(data.value[startDataIndex][category.value]);
//       panHandler.value();
//     });
//     // plot container panning handler
//     chart.value.plotContainer.events.on("pointerup", () => {
//       logTest.value && console.log("plot container panning handler");
//       setPlotContainerPanHandler.value();
//     });
//   }
// },

/**
 * mainValue key 가 있을 경우 xScrollbar 에 lineSeries 만 보여줍니다.
 */
// setXScrollbarMainLine() {
//   logTest.value && console.log("setXScrollbarMainLine");
//   if (
//     xScrollbar.value &&
//     xScrollbarXAxis.value &&
//     xScrollbarYAxis.value &&
//     xScrollbarSetComputed.value.detail.isVisible &&
//     xScrollbarSetComputed.value.detail.mainValue.key
//   ) {
//     if (xScrollbar.value.chart.series.values.length === 0) {
//       xScrollbarOverallSeries.value = am5xy.SmoothedXLineSeries.new(
//         root.value,
//         {
//           fill: am5.color(xScrollbarSetComputed.value.detail.line.color),
//           stroke: am5.color(xScrollbarSetComputed.value.detail.line.color),
//           valueYField: xScrollbarSetComputed.value.detail.mainValue.key,
//           categoryXField: category.value,
//           xAxis: xScrollbarXAxis.value,
//           yAxis: xScrollbarYAxis.value,
//         }
//       );
//       xScrollbar.value.chart.series.push(xScrollbarOverallSeries.value);
//     }
//     xScrollbarOverallSeries.value.set(
//       "valueYField",
//       xScrollbarSetComputed.value.detail.mainValue.key
//     );
//     xScrollbarOverallSeries.value.strokes.template.setAll({
//       strokeWidth: Number(
//         xScrollbarSetComputed.value.detail.line.strokeWidth
//       ),
//     });
//     xScrollbarOverallSeries.value.fills.template.setAll({
//       fillOpacity: Number(
//         xScrollbarSetComputed.value.detail.line.fillOpacity
//       ),
//       visible: true,
//     });
//     xScrollbarOverallSeries.value.data.setAll(data.value);
//   }
// },

/**
 * x 축에 zoomming 하도록 하는 handler 입니다.
 */
// setXAxisZoomToCategories() {
//   logTest.value && console.log("setXAxisZoomToCategories");
//   if (closeSelectionMin.value && closeSelectionMax.value) {
//     setTimeout(() => {
//       if (chartSetComputed.value.chartType === "overall") {
//         xAxis.value.zoomToCategories(
//           closeDataStartPoint.value,
//           closeDataEndPoint.value
//         );
//       }
//       if (chartSetComputed.value.chartType === "default") {
//         xAxis.value.zoomToCategories(
//           closeSelectionMin.value,
//           closeSelectionMax.value
//         );
//       }
//     }, 1000);
//   }
// },

/**
 * 선택된 영역(selectionMin & selectionMax)이 변경되면 x축 데이터를 새로 설정합니다.
 */
// selectionMin: {
//   handler() {
//     logTest.value && console.log("watch selectionMin: ");
//     if (xAxis.value && data.value) {
//       xAxis.value.data.setAll(data.value);
//     }
//   },
//   immediate: true,
// },
// selectionMax: {
//   handler() {
//     logTest.value && console.log("watch selectionMin: ");
//     if (xAxis.value && data.value) {
//       xAxis.value.data.setAll(data.value);
//     }
//   },
//   immediate: true,
// },

/**
 * mainValue 가 설정될 경우에 xScrollbar 를 새로 설정합니다.
 */
// "xScrollbarSetComputed.detail.mainValue.displayName": {
//   handler() {
//     setChartTitle();
//     setXScrollbar();
//   },
// },
// },

/**
 * data start point 와 가장 까까운 데이터를 구합니다.
 */
// closeDataStartPoint() {
//   if (dataStartPoint.value && data.value.length > 0) {
//     // selectionMin 의 Timestamp 반환
//     let dataStartPointTs = moment(
//       dataStartPoint.value,
//       "YYYYMMDDmmss"
//     ).unix();
//     let dataStartPoint = NaN;
//     let startDifference = dataStartPointTs;
//     for (let i = 0; i < data.value.length; i++) {
//       let targetTs = moment(
//         data.value[i][category.value],
//         "YYYYMMDDmmss"
//       ).unix();
//       if (startDifference > Math.abs(targetTs - dataStartPointTs)) {
//         startDifference = Math.abs(targetTs - dataStartPointTs);
//         dataStartPoint = data.value[i][category.value];
//       }
//     }
//     if (!isNaN(dataStartPoint)) {
//       return dataStartPoint;
//     }
//   }
// },

/**
 * data end point 와 가장 가까운 데이터를 구합니다.
 */
// closeDataEndPoint() {
//   if (dataEndPoint.value && data.value.length > 0) {
//     // selectionMin 의 Timestamp 반환
//     let dataEndPointTs = moment(dataEndPoint.value, "YYYYMMDDmmss").unix();
//     let dataEndPoint = NaN;
//     let startDifference = dataEndPointTs;
//     for (let i = 0; i < data.value.length; i++) {
//       let targetTs = moment(
//         data.value[i][category.value],
//         "YYYYMMDDmmss"
//       ).unix();
//       if (startDifference > Math.abs(targetTs - dataEndPointTs)) {
//         startDifference = Math.abs(targetTs - dataEndPointTs);
//         dataEndPoint = data.value[i][category.value];
//       }
//     }
//     if (!isNaN(dataEndPoint)) {
//       return dataEndPoint;
//     }
//   }
// },

/**
 * default 의 selectionMin 과 가장 가까운 overall 의 selectionMin
 */
// closeSelectionMin() {
//   logTest.value && console.log("closeSelectionMin");
//   if (selectionMin.value && selectionMax.value && data.value.length > 0) {
//     // selectionMin 의 Timestamp 반환
//     let selectionMinTs = moment(selectionMin.value, "YYYYMMDDmmss").unix();
//     let zoomStartPoint = NaN;
//     let startDifference = selectionMinTs;
//     for (let i = 0; i < data.value.length; i++) {
//       let targetTs = moment(
//         data.value[i][category.value],
//         "YYYYMMDDmmss"
//       ).unix();
//       if (startDifference > Math.abs(targetTs - selectionMinTs)) {
//         startDifference = Math.abs(targetTs - selectionMinTs);
//         zoomStartPoint = data.value[i][category.value];
//       }
//     }
//     if (!isNaN(zoomStartPoint)) {
//       return zoomStartPoint;
//     }
//   }
// },

/**
 * default 의 selectionMax 과 가장 가까운 overall 의 selectionMax
 */
// closeSelectionMax() {
//   if (selectionMin.value && selectionMax.value && data.value.length > 0) {
//     let selectionMaxTs = moment(selectionMax.value, "YYYYMMDDmmss").unix();
//     let zoomEndPoint = NaN;
//     let endDifference = selectionMaxTs;
//     for (let i = 0; i < data.value.length; i++) {
//       let targetTs = moment(
//         data.value[i][category.value],
//         "YYYYMMDDmmss"
//       ).unix();
//       if (endDifference > Math.abs(targetTs - selectionMaxTs)) {
//         endDifference = Math.abs(targetTs - selectionMaxTs);
//         zoomEndPoint = data.value[i][category.value];
//       }
//     }
//     if (!isNaN(zoomEndPoint)) {
//       return zoomEndPoint;
//     }
//   }
// },
// },
</script>

<template>
  <div style="width: 100%; height: 100%">
    <!-- no data -->
    <no-chart-data
      v-show="data.length === 0 || allNoValue"
      :style="styleProps"
    ></no-chart-data>
    <div
      v-show="data.length > 0 && !allNoValue"
      class="xy-chart-container"
    >
      <!-- previous button -->
      <icon-button
        v-show="previousButton.visible"
        button-type="arrow-backward-skinny"
        :click-handler="previousButton.handler"
        :disabled="previousButton.disabled"
      ></icon-button>
      <!-- chart -->
      <div
        ref="amChartRef"
        :style="styleProps"
      ></div>
      <!-- next button -->
      <icon-button
        v-show="nextButton.visible"
        button-type="arrow-forward-skinny"
        :click-handler="nextButton.handler"
        :disabled="nextButton.disabled"
      ></icon-button>
    </div>
  </div>
</template>

<style scoped>
.xy-chart-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
}
</style>
