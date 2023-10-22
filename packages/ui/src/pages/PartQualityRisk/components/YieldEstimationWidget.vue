<script lang="ts">
import {
  defineComponent,
  ref,
  toRef,
  reactive,
  type PropType,
} from "@vue/composition-api";
import { Widget, XYChart, Icon, TooltipFloatingVue } from "../../..";
import * as am5 from "@amcharts/amcharts5";
import { type PartQualityRiskChartItem } from "../types";

export default defineComponent({
  components: {
    Widget,
    XYChart,
    Icon,
    TooltipFloatingVue,
  },
  props: {
    chartData: {
      type: Array as PropType<PartQualityRiskChartItem[]>,
      default: () => [],
    },
    displayDate: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const chartItems = toRef(props, "chartData");
    const category = ref("title");
    const chartSet = ref({
      yAxisList: [
        {
          extraLabelText: "Estimated Yield Rate",
          opposite: false,
          numberFormat: "#'%'",
          min: 0,
          max: 100,
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
        key: "estimYieldRate",
        displayName: "Estimated Yield Rate",
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
      text: "Elapsed Time (Days)",
      paddingTop: 4,
      paddingBottom: 10,
    });
    const xAxisRendererSet = {
      minGridDistance: 40,
    };

    const seriesTooltipHTMLAdapter = (_, target: am5.Sprite) => {
      if (!target.dataItem) return;
      const context = target.dataItem.dataContext as Record<
        keyof PartQualityRiskChartItem,
        string | number
      >;

      return String.raw`
        <div class="pqr-eyr-chart-tooltip">
          <div class="pqr-eyr-chart-tooltip-title">
            <span>${props.displayDate}</span>
            <span>${context.estimYieldRate}%</span>
          </div>
          <div class="pqr-eyr-chart-tooltip-dividing-line"></div>
          <div class="pqr-eyr-chart-tooltip-contents-wrapper">
            <div class="pqr-eyr-chart-tooltip-contents">
              <span style="font-weight: 700">Total Parts Produced</span>
              <span>${context.prodQty.toLocaleString()}</span>
            </div>
            <div class="pqr-eyr-chart-tooltip-contents">
              <span>Good Parts</span>
              <span>${context.goodProdQty.toLocaleString()}</span>
            </div>
            <div class="pqr-eyr-chart-tooltip-contents">
              <span>Bad Parts</span>
              <span>${context.badProdQty.toLocaleString()}</span>
            </div>
          </div>
      </div>
      `;
    };

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
      seriesTooltipHTMLAdapter,
    };
  },
});
</script>
<template>
  <Widget
    header-text="Yield Estimation"
    :style-props="{
      height: '100%',
      width: '100%',
    }"
  >
    <template #tooltip>
      <TooltipFloatingVue theme="dark">
        <template #tooltip-target>
          <div>
            <Icon button-type="information-icon"></Icon>
          </div>
        </template>
        <template #tooltip-content>
          <div style="width: 18.75rem">
            <p>
              Yield Estimation is a summarized graph of actual part production
              against a yield estimation for the chosen week.
            </p>
            <br />
            <p>*The master filter directly affects this summary of data.</p>
          </div>
        </template>
      </TooltipFloatingVue>
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
          :series-tooltip-h-t-m-l-adapter="seriesTooltipHTMLAdapter"
        />
      </div>
    </template>
  </Widget>
</template>

<style lang="scss">
.pqr-eyr-chart-tooltip {
  background-color: #ffffff;
  padding: 0.625rem;
  box-shadow: 0 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.188rem;
  color: #4b4b4b;
  position: fixed;
  z-index: 9999;
}

.pqr-eyr-chart-tooltip-title {
  font-size: 0.938rem;
  display: flex;
  justify-content: space-between;
}

.pqr-eyr-chart-tooltip-title span:first-child {
  font-weight: 700;
}

.pqr-eyr-chart-tooltip-dividing-line {
  width: 100%;
  height: 0.063rem;
  background-color: #000000;
  margin: 0.625rem 0;
}

.pqr-eyr-chart-tooltip-contents-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.pqr-eyr-chart-tooltip-contents {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  font-weight: 400;
  font-size: 0.938rem;
}
</style>
