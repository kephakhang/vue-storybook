<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

import {
  defineComponent,
  getCurrentInstance,
  watch,
  toRef,
  ref,
  computed,
  onMounted,
} from "@vue/composition-api";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

/**
 * component 를 import 합니다.
 */
import noChartData from "~/components/Chart/amcharts5/no-data/index.vue";

/**
 * 미리 정의해둔 차트 관련 설정입니다.
 */
import { heatLegendSettings } from "./settings/heat-legend";
import {
  columnSeriesHeatRulesSettings,
  columnSeriesSettings,
  columnTemplateSettings,
} from "./settings/column";
import {
  xAxisRendererGridTemplateSettings,
  xAxisRendererSettings,
  xAxisSettings,
  yAxisRendererGridTemplateSettings,
  yAxisRendererSettings,
  yAxisSettings,
} from "./settings/axis";
import { xAxisExtraLabelSettings } from "~/components/Chart/amcharts5/xy/settings/label";
import { xyChartSettings } from "./settings/xy-chart";
import {
  tooltipSettings,
  tooltipBackgroundSettings,
} from "~/components/Chart/amcharts5/settings/tooltip";

export default defineComponent({
  name: "HeatMapChart",
  components: {
    "no-chart-data": noChartData,
  },
  props: {
    heatmapDataBinder: Object,
    data: {
      type: Array,
      default: () => [],
    },
    styleProps: {
      type: String,
      default: "width: 800px; height: 300px",
    },
    /**
     * 미리 정의해 둔 차트 관련 설정입니다.
     */
    tooltipSet: Object,
    tooltipBackgroundSet: Object,
    heatLegendSet: Object,
    columnSeriesSet: Object,
    columnSeriesHeatRulesSet: Object,
    columnSeriesEvent: Object,
    columnTemplateSet: Object,
    columnTemplateEvent: Object,
    columnTemplateAdatper: Object,
    xAxisRendererGridTemplateSet: Object,
    xAxisRendererSet: Object,
    xAxisSet: Object,
    xAxisExtraLabelSet: Object,
    xyChartSet: Object,
    yAxisRendererGridTemplateSet: Object,
    yAxisRendererSet: Object,
    yAxisSet: Object,
  },
  setup(props) {
    /**
     * html element 관련 항목입니다.
     */
    const heatmapChartDiv = ref(null);
    /**
     * data 관련 항목입니다.
     */
    const columnSeries = ref("");
    const root = ref("");
    const chart = ref("");
    const xAxis = ref("");
    const xRenderer = ref("");
    const yAxis = ref("");
    const yRenderer = ref("");
    const heatLegend = ref("");
    const xAxisExtraLabel = ref("");
    /**
     * props 관련 항목입니다.
     */
    const tooltipSet = toRef(props, "tooltipSet");
    const tooltipBackgroundSet = toRef(props, "tooltipBackgroundSet");
    const heatmapDataBinder = toRef(props, "heatmapDataBinder");
    const heatLegendSet = toRef(props, "heatLegendSet");
    const columnSeriesSet = toRef(props, "columnSeriesSet");
    const columnSeriesHeatRulesSet = toRef(props, "columnSeriesHeatRulesSet");
    const columnSeriesEvent = toRef(props, "columnSeriesEvent");
    const columnTemplateSet = toRef(props, "columnTemplateSet");
    const columnTemplateEvent = toRef(props, "columnTemplateEvent");
    const columnTemplateAdatper = toRef(props, "columnTemplateAdatper");
    const xAxisRendererGridTemplateSet = toRef(
      props,
      "xAxisRendererGridTemplateSet"
    );
    const xAxisRendererSet = toRef(props, "xAxisRendererSet");
    const xAxisSet = toRef(props, "xAxisSet");
    const xAxisExtraLabelSet = toRef(props, "xAxisExtraLabelSet");
    const xyChartSet = toRef(props, "xyChartSet");
    const yAxisRendererGridTemplateSet = toRef(
      props,
      "yAxisRendererGridTemplateSet"
    );
    const yAxisRendererSet = toRef(props, "yAxisRendererSet");
    const yAxisSet = toRef(props, "yAxisSet");
    const data = toRef(props, "data");
    const styleProps = toRef(props, "styleProps");

    /**
     * tooltip 의 기본 모형을 설정합니다.
     *
     * tooltipSetComputed: tooltip 설정.
     * tooltipBackgroundSetComputed: tooltip 의 배경 설정.
     */
    const makeTooltip = () => {
      let tooltip = am5.Tooltip.new(root.value, {
        ...tooltipSetComputed.value,
      });

      tooltip
        .get("background")
        .setAll({ ...tooltipBackgroundSetComputed.value });

      return tooltip;
    };

    /**
     * 차트를 생성합니다.
     * mount 또는 기타 설정값이 변경될 경우 실행합니다.
     */
    const createChart = () => {
      if (data.value.length > 0) {
        setRoot();
        setTheme();
        createXyChart();
        createXAxis();
        createYAxis();
        createSeries();
        createHeatLegend();
        setData();

        chart.value.appear(1000, 100);
      }
    };

    /**
     * root 를 설정합니다.
     */
    const setRoot = () => {
      if (!root.value) {
        root.value = am5.Root.new(heatmapChartDiv.value, {});
      }
    };

    /**
     * theme 를 설정합니다.
     */
    const setTheme = () => {
      root.value.setThemes([am5themes_Animated.new(root.value)]);
    };

    /**
     * heatmap의 data 형태를 설정합니다.
     *
     * xy 축 데이터를 설정해줍니다.
     * column 시리즈 데이터를 설정해줍니다.
     */
    const setData = () => {
      setXYAxisData();
      columnSeries.value.data.setAll(data.value); // set column data
    };

    /**
     * xy 축에 알맞은 데이터 형태를 생성한 뒤, 각 축에 설정해줍니다.
     *
     * x axis data example: [{xKey: '00', xKey: '01', ...}]
     * y axis data example: [{yKey: '03-10', xKey: '03-11', ...}]
     */
    const setXYAxisData = () => {
      let xAxisData = heatmapDataBinder.value.xAxisList.map((item) => {
        return { [heatmapDataBinder.value.xAxisKey]: item };
      });
      let yAxisData = heatmapDataBinder.value.yAxisList.map((item) => {
        return { [heatmapDataBinder.value.yAxisKey]: item };
      });
      xAxis.value.data.setAll(xAxisData);
      yAxis.value.data.setAll(yAxisData);
    };

    /**
     * column series 관련된 모든 함수를 정의합니다.
     */
    const createSeries = () => {
      setColumnSeries();
      setColumnTemplate();
    };

    /**
     * column series 를 생성합니다.
     */
    const setColumnSeries = () => {
      const columnSeriesOptions = {
        ...columnSeriesSetComputed.value,
        xAxis: xAxis.value,
        yAxis: yAxis.value,
        categoryXField: heatmapDataBinder.value.xAxisKey,
        categoryYField: heatmapDataBinder.value.yAxisKey,
        valueField: heatmapDataBinder.value.valueKey,
        tooltip: makeTooltip(),
      };

      if (!columnSeries.value) {
        columnSeries.value = chart.value.series.push(
          am5xy.ColumnSeries.new(root.value, columnSeriesOptions)
        );
      } else {
        columnSeries.value.setAll(columnSeriesOptions);
      }

      setColumnSeriesHeatRules();
      setColumnSeriesEvent();
    };

    /**
     * column series 의 heat rule 을 설정합니다.
     */
    const setColumnSeriesHeatRules = () => {
      columnSeries.value.set("heatRules", [
        {
          ...columnSeriesHeatRulesSetComputed.value,
          target: columnSeries.value.columns.template,
          dataField: heatmapDataBinder.value.valueKey,
        },
      ]);
    };

    /**
     * columnSeries의 event 를 설정합니다.
     */
    const setColumnSeriesEvent = () => {
      if (columnSeriesEvent.value) {
        Object.keys(columnSeriesEvent.value).map((key) => {
          const eventName = key;
          const eventHandler = columnSeriesEvent.value[key];
          columnSeries.value.events.on(eventName, (event) => {
            eventHandler({
              event,
              columnSeries: columnSeries.value,
              heatLegend: heatLegend.value,
            });
          });
        });
      }
    };

    /**
     * column template 을 설정합니다.
     *
     * column template: 히트맵 한칸의 개별 설정
     */
    const setColumnTemplate = () => {
      columnSeries.value.columns.template.setAll({
        ...columnTemplateSetComputed.value,
      });
      setColumnTemplateEvent();
      setColumnTemplateAdapter();
    };

    /**
     * column template adapter 가 있을 경우 adpater 를 설정합니다.
     */
    const setColumnTemplateAdapter = () => {
      if (columnTemplateAdatper.value) {
        Object.keys(columnTemplateAdatper.value).map((key) => {
          const eventName = key;
          const eventHandler = columnTemplateAdatper.value[key];

          columnSeries.value.columns.template.adapters.add(
            eventName,
            (settingKey, target) => {
              return eventHandler(settingKey, target);
            }
          );
        });
      }
    };

    /**
     * column template event 가 있을 경우 event 를 설정합니다.
     */
    const setColumnTemplateEvent = () => {
      if (columnTemplateEvent.value) {
        Object.keys(columnTemplateEvent.value).map((key) => {
          const eventName = key;
          const eventHandler = columnTemplateEvent.value[eventName];
          columnSeries.value.columns.template.events.on(eventName, (event) => {
            eventHandler({
              event,
              columnSeries: columnSeries.value,
              heatLegend: heatLegend.value,
            });
          });
        });
      }
    };

    /**
     * xy chart의 기본 형태를 정의합니다.
     */
    const createXyChart = () => {
      const chartOptions = {
        ...xyChartSetComputed.value,
        layout: root.value.verticalLayout,
      };

      if (!chart.value) {
        chart.value = root.value.container.children.push(
          am5xy.XYChart.new(root.value, chartOptions)
        );
      } else {
        chart.value.setAll(chartOptions);
      }
    };

    /**
     * y 축을 설정하는 함수들 입니다.
     */
    const createYAxis = () => {
      setYAxisRenderer();
      setYAxis();
    };

    /**
     * y축 renderer 를 설정합니다.
     */
    const setYAxisRenderer = () => {
      if (!yRenderer.value) {
        yRenderer.value = am5xy.AxisRendererY.new(root.value, {
          ...yAxisRendererSetComputed.value,
        });
      } else {
        yRenderer.value.setAll({ ...yAxisRendererSetComputed.value });
      }

      setYAxisRendererGridTemplate();
    };

    /**
     * y축 renderer 의 grid template 을 설정합니다.
     */
    const setYAxisRendererGridTemplate = () => {
      yRenderer.value.grid.template.setAll({
        ...yAxisRendererGridTemplateSetComputed.value,
      });
    };

    /**
     * y축을 설정합니다.
     */
    const setYAxis = () => {
      const yAxisOptions = {
        ...yAxisSetComputed.value,
        renderer: yRenderer.value,
        categoryField: heatmapDataBinder.value.yAxisKey,
      };

      if (!yAxis.value) {
        yAxis.value = chart.value.yAxes.push(
          am5xy.CategoryAxis.new(root.value, yAxisOptions)
        );
      } else {
        yAxis.value.setAll(yAxisOptions);
      }

      setYAxisLabel();
    };

    /**
     * y축 renderer 의 label 을 설정합니다.
     */
    const setYAxisLabel = () => {
      yAxis.value.get("renderer").labels.template.setAll({
        fontSize: 10,
        textAlign: "center",
        fill: "#4b4b4b",
      });
    };

    /**
     * x 축을 설정하는 모든 함수입니다.
     */
    const createXAxis = () => {
      setXAxisRenderer();
      setXAxis();
    };

    /**
     * x 축 renderer 를 설정합니다.
     */
    const setXAxisRenderer = () => {
      if (!xRenderer.value) {
        xRenderer.value = am5xy.AxisRendererX.new(root.value, {
          ...xAxisRendererSetComputed.value,
        });
      } else {
        xRenderer.value.setAll({ ...xAxisRendererSetComputed.value });
      }
      setXAxisRendererGridTemplate();
    };

    /**
     * x축 renderer 의 grid template을 설정합니다.
     */
    const setXAxisRendererGridTemplate = () => {
      xRenderer.value.grid.template.setAll({
        ...xAxisRendererGridTemplateSetComputed.value,
      });
    };

    /**
     * x 축을 설정합니다.
     */
    const setXAxis = () => {
      const xAxisOptions = {
        ...xAxisSetComputed.value,
        renderer: xRenderer.value,
        categoryField: heatmapDataBinder.value.xAxisKey,
      };

      if (!xAxis.value) {
        xAxis.value = chart.value.xAxes.push(
          am5xy.CategoryAxis.new(root.value, { ...xAxisOptions })
        );
      } else {
        xAxis.value.setAll({ ...xAxisOptions });
      }

      setXAxisLabel();
      setXAxisExtraLabel();
    };

    /**
     * x 축 renderer 의 label 을 설정합니다.
     */
    const setXAxisLabel = () => {
      xAxis.value.get("renderer").labels.template.setAll({
        fontSize: 10,
        textAlign: "center",
        fill: "#4b4b4b",
      });
    };

    /**
     * x 축의 추가 label 을 설정합니다.
     */
    const setXAxisExtraLabel = () => {
      if (
        xAxisExtraLabelSetComputed.value.html ||
        xAxisExtraLabelSetComputed.value.text
      ) {
        if (!xAxisExtraLabel.value) {
          xAxisExtraLabel.value = xAxis.value.children.push(
            am5.Label.new(root.value, { ...xAxisExtraLabelSetComputed.value })
          );
        } else {
          xAxisExtraLabel.value.setAll({ ...xAxisExtraLabelSetComputed.value });
        }
      }
    };

    /**
     * heat legend 를 설정합니다 (optional)
     */
    const createHeatLegend = () => {
      if (!heatLegend.value) {
        heatLegend.value = chart.value.bottomAxesContainer.children.push(
          am5.HeatLegend.new(root.value, {
            ...heatLegendSetComputed.value,
          })
        );
      } else {
        heatLegend.value.setAll({ ...heatLegendSetComputed.value });
      }
    };

    /**
     * tooltip 에 정의할 속성을 계산합니다.
     *
     * 미리 정의된 tooltipSettings 와 props 로 전달받은 tooltipSet 을 합칩니다.
     */
    const tooltipSetComputed = computed(() => {
      return Object.assign({}, tooltipSettings, tooltipSet.value);
    });

    /**
     * tooltip 배경에 정의할 속성을 계산합니다.
     *
     * 미리 정의된 tooltipBackgroundSettings와 props로 전달받은 tooltipBackgroundSet을 합칩니다.
     */
    const tooltipBackgroundSetComputed = computed(() => {
      return Object.assign(
        {},
        tooltipBackgroundSettings,
        tooltipBackgroundSet.value
      );
    });

    /**
     * heatlegend에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 heatLegendSettings 와 props로 전달받은 heatLegendSet을 합칩니다.
     */
    const heatLegendSetComputed = computed(() => {
      return Object.assign({}, heatLegendSettings, heatLegendSet.value);
    });

    /**
     * columnSeries 의 heatRules 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 columnSeriesHeatRulesSettings 와 props 로 전달받은 columnSeriesHeatRulesSet을 합칩니다.
     */
    const columnSeriesHeatRulesSetComputed = computed(() => {
      return Object.assign(
        {},
        columnSeriesHeatRulesSettings,
        columnSeriesHeatRulesSet.value
      );
    });

    /**
     * column series 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 columnSeriesSettings 와 props로 전달받은 columnSeriesSet 을 합칩니다.
     */
    const columnSeriesSetComputed = computed(() => {
      return Object.assign({}, columnSeriesSettings, columnSeriesSet.value);
    });

    /**
     * column template 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 columnTemplateSettings 와 props로 전달받은 columnTemplateSet 을 합칩니다.
     */
    const columnTemplateSetComputed = computed(() => {
      return Object.assign({}, columnTemplateSettings, columnTemplateSet.value);
    });

    /**
     * x axis renderer 의 grid template 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 xAxisRendererGridTemplateSettings 와 props로 전달받은 xAxisRendererGridTemplateSet을 합칩니다.
     */
    const xAxisRendererGridTemplateSetComputed = computed(() => {
      return Object.assign(
        {},
        xAxisRendererGridTemplateSettings,
        xAxisRendererGridTemplateSet.value
      );
    });

    /**
     * x axis renderer 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 xAxisRendererSettings 와 props로 전달받은 xAxisRendererSet을 합칩니다.
     */
    const xAxisRendererSetComputed = computed(() => {
      return Object.assign({}, xAxisRendererSettings, xAxisRendererSet.value);
    });

    /**
     * x axis 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 xAxisSettings와 props로 전달받은 xAxisSet 을 합칩니다.
     */
    const xAxisSetComputed = computed(() => {
      return Object.assign({}, xAxisSettings, xAxisSet.value);
    });

    /**
     *
     * x axis 의 추가 label 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 xAxisExtraLabelSettings 와 props로 전달받은 xAxisExtraLabelSet을 합칩니다.
     */
    const xAxisExtraLabelSetComputed = computed(() => {
      return Object.assign(
        {},
        xAxisExtraLabelSettings,
        xAxisExtraLabelSet.value
      );
    });

    /**
     * xy chart에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 xyChartSettings 와 props로 전달받은 xyChartSet을 합칩니다.
     */
    const xyChartSetComputed = computed(() => {
      return Object.assign({}, xyChartSettings, xyChartSet.value);
    });

    /**
     * y axis renderer 의 grid template 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 yAxisRendererGridTemplateSettings 와 props 로 전달받은 yAxisRendererGridTemplateSet을 합칩니다.
     */
    const yAxisRendererGridTemplateSetComputed = computed(() => {
      return Object.assign(
        {},
        yAxisRendererGridTemplateSettings,
        yAxisRendererGridTemplateSet.value
      );
    });

    /**
     * y axis renderer 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 yAxisRendererSettings 와 props 로 전달받은 yAxisRendererSet을 합칩니다.
     */
    const yAxisRendererSetComputed = computed(() => {
      return Object.assign({}, yAxisRendererSettings, yAxisRendererSet.value);
    });

    /**
     * y axis 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 yAxisSettings 와 props 로 전달받은 yAxisSet을 합칩니다.
     */
    const yAxisSetComputed = computed(() => {
      return Object.assign({}, yAxisSettings, yAxisSet.value);
    });

    /**
     * 설정 값이 변경된 경우 차트를 새로 설정합니다.
     */
    watch(
      [
        heatmapDataBinder,
        heatLegendSet,
        columnSeriesHeatRulesSet,
        columnSeriesSet,
        columnTemplateSet,
        columnTemplateEvent,
        columnSeriesEvent,
        xAxisRendererGridTemplateSet,
        xAxisRendererSet,
        xAxisSet,
        xyChartSet,
        yAxisRendererGridTemplateSet,
        yAxisRendererSet,
        yAxisSet,
        data,
        styleProps,
      ],
      () => {
        createChart();
      },
      { deep: true }
    );

    /**
     * mount 시에 license 를 등록하고 차트를 생성합니다.
     */
    onMounted(() => {
      am5.addLicense("AM5C392708372");
      am5.ready(() => {
        createChart();
      });
    });

    return {
      /**
       * html element 관련 항목입니다.
       */
      heatmapChartDiv,
      /**
       * data 관련 항목입니다.
       */
      columnSeries,
      root,
      chart,
      xAxis,
      xRenderer,
      yAxis,
      yRenderer,
      heatLegend,
      xAxisExtraLabel,
      /**
       * methods 관련 항목입니다.
       */
      makeTooltip,
      createChart,
      setData,
      createSeries,
      setColumnSeries,
      setColumnSeriesHeatRules,
      setColumnTemplate,
      setColumnTemplateEvent,
      setColumnSeriesEvent,
      createXyChart,
      createYAxis,
      setYAxisRenderer,
      setYAxisRendererGridTemplate,
      setYAxis,
      createXAxis,
      setXAxisRenderer,
      setXAxisRendererGridTemplate,
      setXAxis,
      setXAxisLabel,
      setXAxisExtraLabel,
      createHeatLegend,
      /**
       * computed 관련 항목입니다.
       */
      tooltipSetComputed,
      tooltipBackgroundSetComputed,
      heatLegendSetComputed,
      columnSeriesHeatRulesSetComputed,
      columnSeriesSetComputed,
      columnTemplateSetComputed,
      xAxisRendererGridTemplateSetComputed,
      xAxisRendererSetComputed,
      xAxisSetComputed,
      xAxisExtraLabelSetComputed,
      xyChartSetComputed,
      yAxisRendererGridTemplateSetComputed,
      yAxisRendererSetComputed,
      yAxisSetComputed,
    };
  },
});
</script>

<template>
  <div :style="styleProps">
    <!-- data가 없을 경우 보여질 컴포넌트 입니다. (no data available 을 표시합니다.) -->
    <no-chart-data
      v-show="data.length === 0"
      style="width: 100%; height: 100%"
    ></no-chart-data>
    <!-- heatmap chart -->
    <div
      v-show="data.length > 0"
      ref="heatmapChartDiv"
      style="width: 100%; height: 100%"
    ></div>
  </div>
</template>
