<script>
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { merge } from "~/utils/merge";

import {
  nextTick,
  defineComponent,
  watch,
  toRef,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from "@vue/composition-api";

/**
 * 미리 정의한 legend 설정입니다.
 */
import {
  legendSettings,
  legendLabelSettings,
  legendMarkerSettings,
  legendMarkerRectangleSettings,
} from "~/components/Chart/amcharts5/legend/settings/legend";

export default defineComponent({
  name: "legendContainer",
  components: {},
  props: {
    legendSet: Object,
    legendLabelSet: Object,
    legendMarkerSet: Object,
    legendMarkerRectangleSet: Object,
    logTest: {
      type: Boolean,
      default: false,
    },
    legendMarkerRectanglesStrokeDashArrayAdapter: Function,
    chartSet: Object,
    setCustom: Function,
    setCustomLegend: Function,
    styleProps: {
      type: String,
      default: "width: 500px; height: 100px;",
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      root: "",
      legend: "",
      chartSetData: {
        root: {
          container: {
            layout: "verticalLayout",
          },
        },
      },
    };
  },
  setup(props) {
    /**
     * html element 관련 항목입니다.
     */
    const legendDiv = ref(null);

    /**
     * data 관련 항목입니다.
     */
    const root = ref("");
    const legend = ref("");
    const chartSetData = ref("");

    /**
     * props 관련 항목입니다.
     */
    const legendSet = toRef(props, "legendSet");
    const legendLabelSet = toRef(props, "legendLabelSet");
    const legendMarkerSet = toRef(props, "legendMarkerSet");
    const legendMarkerRectangleSet = toRef(props, "legendMarkerRectangleSet");
    const logTest = toRef(props, "logTest");
    const legendMarkerRectanglesStrokeDashArrayAdapter = toRef(
      props,
      "legendMarkerRectanglesStrokeDashArrayAdapter"
    );
    const chartSet = toRef(props, "chartSet");
    const setCustom = toRef(props, "setCustom");
    const setCustomLegend = toRef(props, "setCustomLegend");
    const styleProps = toRef(props, "styleProps");
    const data = toRef(props, "data");

    /**
     * 차트를 생성합니다.
     */
    const createChart = () => {
      logTest.value && console.log("createChart");

      nextTick(() => {
        if (legendDiv.value) {
          setRoot();
          setTheme();
          createLegend();

          if (setCustom.value) {
            setCustom.value(am5, this);
          }
        }
      });
    };

    /**
     * root 를 설정합니다.
     */
    const setRoot = () => {
      if (!root.value) {
        root.value = am5.Root.new(legendDiv.value);
      }

      setRootNumberFormatter();
    };

    /**
     * theme 를 설정합니다.
     */
    const setTheme = () => {
      const myTheme = am5.Theme.new(root.value);
      root.value.setThemes([am5themes_Animated.new(root.value), myTheme]);
    };

    /**
     * 전역적인 numberformat 을 설정합니다.
     */
    const setRootNumberFormatter = () => {
      root.value.numberFormatter.setAll({
        numberFormat: "#.#",
        numericFields: ["valueY"],
      });
    };

    /**
     * legend 를 설정하는 함수들입니다.
     */
    const createLegend = () => {
      logTest.value && console.log("createLegend");

      setLegend();
      setLegendLabel();
      setLegendMarker();
      setLegendMarkerRectangle();
      setLegendValueLabel();
      setLegendMarkerRectangleAdapter();

      if (setCustomLegend.value) {
        setCustomLegend.value(am5, this);
      }

      legend.value.data.setAll(data.value);
    };

    /**
     * legend 를 설정합니다.
     */
    const setLegend = () => {
      if (!legend.value) {
        legend.value = root.value.container.children.push(
          am5.Legend.new(root.value, { ...legendSetComputed.value })
        );
      } else {
        legend.value.setAll({ ...legendSetComputed.value });
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
    const setLegendMarkerRectangle = () => {
      legend.value.markerRectangles.template.setAll({
        ...legendMarkerRectangleSetComputed.value,
      });
    };

    /**
     * legend value label 을 설정합니다.
     *
     * legend 의 valueLables 공간을 없애서 불필요 공간이 사라지도록 처리합니다.
     */
    const setLegendValueLabel = () => {
      legend.value.valueLabels.template.set("forceHidden", true);
    };

    /**
     * legend 의 marker rectangle adapter 를 설정합니다.
     */
    const setLegendMarkerRectangleAdapter = () => {
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
     * data 의 변경이 감지되면 legend 를 새로 그립니다.
     */
    watch(
      [data],
      () => {
        createChart();
      },
      { deep: true }
    );

    /**
     * legend 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 legendSettings 와 props 로 전달받은 legendSet 을 합칩니다.
     */
    const legendSetComputed = computed(() => {
      let layout = { layout: root.value.gridLayout };
      return Object.assign({}, legendSettings, legendSet.value, layout);
    });

    /**
     * legend label 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 legendLabelSettings 와 props로 전달받은 legendLabelSet을 합칩니다.
     */
    const legendLabelSetComputed = computed(() => {
      return Object.assign({}, legendLabelSettings, legendLabelSet.value);
    });

    /**
     * legend marker 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 legendMarkerSettings 와 props 로 전달받은 legendMarkerSet을 합칩니다.
     */
    const legendMarkerSetComputed = computed(() => {
      return Object.assign({}, legendMarkerSettings, legendMarkerSet.value);
    });

    /**
     * legend marker rectangle 에 정의할 속성을 계산합니다.
     *
     * 미리 정의한 legendMarkerRectangleSettings 와 props 로 전달받은 legendMarkerSet 을 합칩니다.
     */
    const legendMarkerRectangleSetComputed = computed(() => {
      return Object.assign(
        {},
        legendMarkerRectangleSettings,
        legendMarkerRectangleSet.value
      );
    });

    /**
     * 차티에 정의할 기본 속성을 계산합니다.
     *
     * 미리 정의한 chartSettings 와 props 로 전달받은 chartSet 을 합칩니다.
     */
    const chartSetComputed = computed(() => {
      let mergeItem = merge(chartSetData.value, chartSet.value);
      return Object.assign({}, mergeItem);
    });

    /**
     * mount 가 완료되면 라이센스를 등록하고 차트를 그립니다.
     */
    onMounted(() => {
      am5.addLicense("AM5C392708372");
      am5.ready(() => {
        createChart();
      });
    });

    /**
     * unmount 가 시작될때 root 를 폐기합니다.
     */
    onBeforeUnmount(() => {
      logTest.value && console.log("xy-chart beforeDestroy");

      if (root.value) {
        logTest.value && console.log("root dispose");
        root.value.dispose();
      }
    });

    return {
      legendDiv,
      root,
      legend,
      chartSetData,
      createChart,
      createLegend,
    };
  },
});
</script>

<template>
  <div
    :ref="'legendDiv'"
    :style="styleProps"
  ></div>
</template>

<style scoped></style>
