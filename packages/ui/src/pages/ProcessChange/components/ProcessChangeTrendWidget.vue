<script lang="ts">
import {
  defineComponent,
  ref,
  toRef,
  watch,
  reactive,
  type PropType,
} from "@vue/composition-api";
import { Widget, XYChart, Tooltip, Icon } from "../../..";
import type { ProcessChangeChartItem } from "~/pages/ProcessChange/types";
import * as am5 from "@amcharts/amcharts5";
import moment from "moment";

export default defineComponent({
  components: {
    Widget,
    XYChart,
    Tooltip,
    Icon,
  },
  props: {
    chartData: {
      type: Array as PropType<ProcessChangeChartItem[]>,
      default: () => [],
    },
    selectedYear: {
      type: [String, Number],
    },
    timeScale: {
      type: String,
    },
    selectedDateFromChart: {
      type: String,
    },
    setSelectedDateFromChartItem: {
      type: Function as PropType<(date: string) => true>,
    },
  },
  setup(props) {
    const initialChartItems = toRef(props, "chartData");
    const timeScale = toRef(props, "timeScale");
    const chartItems = ref<ProcessChangeChartItem[]>([]);
    const category = ref("title");
    const chartSet = ref({
      yAxisList: [
        {
          extraLabelText: "Process Changes",
          opposite: false,
        },
        {
          extraLabelText: "Parts Produced",
          opposite: true,
          syncIndex: 0,
        },
      ],
      valueAxis: {
        min: 0,
        maxPrecision: 0,
      },
      useTheme: false,
    });
    const legendSet = ref({ useDefaultMarker: true });
    const columnTemplateSet = ref({
      width: am5.percent(50),
      fillOpacity: 1,
    });
    const lineSet = ref({
      strokeWidth: 2,
      bullet: {
        forceHidden: true,
      },
    });
    const barDataBinder = ref([
      {
        key: "procChgCount",
        displayName: "Process Changes",
        color: "#1A2281",
        yAxisListIndex: 0,
      },
    ]);
    const lineDataBinder = ref([
      {
        key: "prodQty",
        displayName: "Parts Produced",
        color: "#EB709A",
        yAxisListIndex: 1,
      },
    ]);
    const xAxisGridSet = {
      strokeWidth: 1,
      strokeOpacity: 0,
      location: 0,
    };
    const xAxisExtraLabelSet = reactive({
      text: "",
      paddingTop: 4,
      paddingBottom: 10,
    });
    const xAxisRendererSet = {
      minGridDistance: 40,
    };

    const seriesTooltipHTMLAdapter = (_, target) => {
      const dataContext = target.dataItem.dataContext;
      const fullTitle = dataContext.title.includes("/")
        ? `${props.selectedYear}-${dataContext.title.replace("/", "-")}`
        : `${moment(dataContext.title, "MM").format("MMM")}-${
            props.selectedYear
          }`;

      return String.raw`
        <div class="pc-chart-tooltip">
          <div class="pc-chart-tooltip-title">
            <span>${fullTitle}</span>
          </div>
          <div class="pc-chart-tooltip-dividing-line"></div>
          <div class="pc-chart-tooltip-contents-wrapper">
            <div class="pc-chart-tooltip-contents">
              <span>Process Changes</span>
              <span>${dataContext.procChgCount.toLocaleString()}</span>
            </div>
            <div class="pc-chart-tooltip-contents">
              <span>Parts Produced</span>
              <span>${dataContext.prodQty.toLocaleString()}</span>
            </div>
          </div>
      </div>
      `;
    };

    const chartItemClickHandler = (e) => {
      const targetItem = e.target.dataItem.dataContext;

      props.setSelectedDateFromChartItem?.(targetItem.title);
    };

    watch([initialChartItems, () => props.selectedDateFromChart], () => {
      chartItems.value = initialChartItems.value;

      if (props.selectedDateFromChart) {
        chartItems.value = chartItems.value.map((data) => {
          if (data.title === props.selectedDateFromChart)
            return { ...data, columnSettings: {} };
          return {
            ...data,
            columnSettings: {
              fill: "#D6DADE",
              strokeOpacity: 0,
            },
          };
        });
      }
    });

    watch(
      timeScale,
      () => {
        if (timeScale.value)
          xAxisExtraLabelSet.text = `Elapsed Time (${
            timeScale.value === "QUARTER" ? "Months" : "Days"
          })`;
      },
      {
        immediate: true,
      }
    );

    return {
      category,
      chartSet,
      legendSet,
      columnTemplateSet,
      lineSet,
      barDataBinder,
      lineDataBinder,
      xAxisExtraLabelSet,
      xAxisGridSet,
      xAxisRendererSet,
      chartItems,
      chartItemClickHandler,
      seriesTooltipHTMLAdapter,
    };
  },
});
</script>
<template>
  <Widget
    header-text="Process Change Trend"
    :style-props="{
      height: '100%',
      width: '100%',
    }"
  >
    <template #tooltip>
      <Tooltip position="bottom">
        <template #context>
          <Icon button-type="information-icon"></Icon>
        </template>
        <template #body>
          <span style="width: 18.625rem; text-align: left">
            Process Change Trend displays the total number of changes detected
            (represented as bars), against the total number of parts produced
            (represented as a line).
          </span>
        </template>
      </Tooltip>
    </template>
    <template #body>
      <div style="width: 100%; height: 100%; padding: 1.25rem">
        <XYChart
          style-props="width: 100%; height: 100%;"
          :category="category"
          :data="chartItems"
          :chart-set="chartSet"
          :legend-set="legendSet"
          :bar-data-binder="barDataBinder"
          :column-template-set="columnTemplateSet"
          :line-data-binder="lineDataBinder"
          :line-set="lineSet"
          :x-axis-extra-label-set="xAxisExtraLabelSet"
          :x-axis-grid-set="xAxisGridSet"
          :x-axis-renderer-set="xAxisRendererSet"
          :chart-item-click-handler="chartItemClickHandler"
          :series-tooltip-h-t-m-l-adapter="seriesTooltipHTMLAdapter"
        />
      </div>
    </template>
  </Widget>
</template>

<style lang="scss">
.pc-chart-tooltip {
  background-color: #ffffff;
  padding: 0.625rem;
  box-shadow: 0 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.188rem;
  color: #4b4b4b;
  position: fixed;
  z-index: 9999;
}

.pc-chart-tooltip-title {
  font-size: 0.938rem;
  font-weight: 700;
}

.pc-chart-tooltip-dividing-line {
  width: 100%;
  height: 0.063rem;
  background-color: #000000;
  margin: 0.625rem 0;
}

.pc-chart-tooltip-contents-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.pc-chart-tooltip-contents {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  font-weight: 400;
  font-size: 0.938rem;
}
</style>
