<script lang="ts">
import {
  defineComponent,
  ref,
  toRef,
  watch,
  computed,
  type PropType,
} from "@vue/composition-api";
import {
  Icon,
  TooltipFloatingVue,
  Widget,
  ChartLegend,
  HeatmapChart,
} from "~/index";
import type {
  GetMoldItems,
  PartQualityRiskHeatmapItem,
  RiskLevel,
} from "../types";
import * as am5 from "@amcharts/amcharts5";
import InfinityMoldDropdown from "./InfinityMoldDropdown.vue";

export default defineComponent({
  components: {
    Widget,
    TooltipFloatingVue,
    Icon,
    ChartLegend,
    HeatmapChart,
    InfinityMoldDropdown,
  },
  props: {
    heatmapData: {
      type: Array as PropType<PartQualityRiskHeatmapItem[]>,
      default: () => [],
    },
    displayDate: {
      type: String,
      required: true,
    },
    selectedMoldCode: {
      type: String,
      default: null,
    },
    setSelectedMold: {
      type: Function,
      required: true,
    },
    getMoldItems: {
      type: Function as PropType<GetMoldItems>,
      required: true,
    },
  },
  setup(props) {
    const heatmapItems = toRef(props, "heatmapData");
    const selectedMold = toRef(props, "selectedMoldCode");

    const xAxisList = computed(() => {
      const hourList = new Set(heatmapItems.value.map((_) => _.hour));
      return [...hourList];
    });

    const yAxisList = computed(() => {
      const dateList = new Set(heatmapItems.value.map((_) => _.date));
      return [...dateList];
    });

    const xAxisExtraLabelSet = ref({
      text: "Time Elapsed (hours)",
    });

    const heatmapDataBinder = ref({
      xAxisKey: "hour",
      yAxisKey: "date",
      valueKey: "riskLevel",
      xAxisList: xAxisList.value,
      yAxisList: yAxisList.value,
    });

    const legendData = ref([
      {
        legendName: "High Risk",
        legendFill: am5.color("#E34537"),
        legendStroke: am5.color("#E34537"),
      },
      {
        legendName: "Medium Risk",
        legendFill: am5.color("#F7CC57"),
        legendStroke: am5.color("#F7CC57"),
      },
      {
        legendName: "Low Risk",
        legendFill: am5.color("#41CE77"),
        legendStroke: am5.color("#41CE77"),
      },
      {
        legendName: "No Production",
        legendFill: am5.color("#D3D1D9"),
        legendStroke: am5.color("#D3D1D9"),
      },
    ]);

    const changeColumnFill = (
      _fill: am5.Color,
      target: am5.RoundedRectangle
    ) => {
      if (!target.dataItem) return;

      const riskLevel = (
        target.dataItem.dataContext as Record<
          keyof PartQualityRiskHeatmapItem,
          string
        >
      ).riskLevel as RiskLevel;

      switch (riskLevel) {
        case "HIGH":
          return am5.color("#E34537");
        case "MEDIUM":
          return am5.color("#F7CC57");
        case "LOW":
          return am5.color("#41CE77");
        case null:
          return am5.color("#D3D1D9");
      }
    };

    const setPqrTooltip = (_, target: am5.RoundedRectangle) => {
      if (!target.dataItem) return;

      const data = target.dataItem.dataContext as PartQualityRiskHeatmapItem;
      const year = props.displayDate.split(",")[1].trimStart();
      const html = String.raw;

      let riskColor = "";
      let riskText = "";
      let riskProductionText = "";

      switch (data.riskLevel) {
        case "HIGH":
          riskColor = "#E34537";
          riskText = "High Risk";
          riskProductionText = data.descr;
          break;
        case "MEDIUM":
          riskColor = "#F7CC57";
          riskText = "Medium Risk";
          riskProductionText = data.descr;
          break;
        case "LOW":
          riskColor = "#41CE77";
          riskText = "Low Risk";
          riskProductionText = data.descr;
          break;
        case null:
          return;
      }

      const getHourRange = (hour: string) => {
        if (Number(hour) < 9) return `${hour}:00 - 0${Number(hour) + 1}:00`;
        return `${hour}:00 - ${Number(hour) + 1}:00`;
      };

      return html`
        <div
          style="min-width: 252px; padding: 10px; font-size: 15px; line-height: 25px;"
        >
          <div
            style="display: flex; justify-content: space-between; align-items: center; border-bottom: solid 1px #ddd; padding-bottom: 10px; margin-bottom: 10px;"
          >
            <div style="font-weight: bold;">${year}-${data.date}</div>
            <div>${getHourRange(data.hour)}</div>
          </div>

          <div
            style="display: flex; justify-content: space-between; align-items: center; gap: 20px;"
          >
            <div>Parts Produced</div>
            <div>${data.prodQty} parts</div>
          </div>

          <div style="display: flex; align-items: center;">
            <div
              style="width: 13px; height: 13px; background-color: ${riskColor}; border-radius: 3px;"
            ></div>
            <div style="margin-left: 5px;">${riskText}</div>
          </div>

          <div>${riskProductionText}</div>
        </div>
      `;
    };

    const columnTemplateAdatper = ref({
      fill: changeColumnFill,
      tooltipHTML: setPqrTooltip,
    });

    watch(xAxisList, () => {
      heatmapDataBinder.value.xAxisList = xAxisList.value;
    });

    watch(yAxisList, () => {
      heatmapDataBinder.value.yAxisList = yAxisList.value;
    });

    return {
      selectedMold,
      heatmapItems,
      heatmapDataBinder,
      legendData,
      xAxisExtraLabelSet,
      columnTemplateAdatper,
    };
  },
});
</script>
<template>
  <Widget
    header-text="Part Quality Risk"
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
              Part Quality Risk provides a close look at a single tooling’s
              production pattern over the past week. The graph is broken down
              into hourly blocks and each block is represented as Low, Medium,
              and High risk for producing lesser quality parts.
            </p>
            <br />
            <p>
              *Toolings within the current master filter selection are viewable
              here.
            </p>
          </div>
        </template>
      </TooltipFloatingVue>
    </template>
    <template #header>
      <div>
        <InfinityMoldDropdown
          :get-mold-items="getMoldItems"
          :initial-title="selectedMold"
          :set-selected-mold="setSelectedMold"
          :display-date="displayDate"
        ></InfinityMoldDropdown>
      </div>
    </template>
    <template #body>
      <div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
        "
      >
        <div style="width: 100%; height: 100%">
          <HeatmapChart
            style="width: 100%; height: 100%"
            :data="heatmapItems"
            :heatmap-data-binder="heatmapDataBinder"
            :x-axis-extra-label-set="xAxisExtraLabelSet"
            :column-template-adatper="columnTemplateAdatper"
          ></HeatmapChart>
        </div>
        <ChartLegend
          style="width: 100%; height: 20px"
          :data="legendData"
        ></ChartLegend>
      </div>
    </template>
  </Widget>
</template>

<style lang="scss"></style>
