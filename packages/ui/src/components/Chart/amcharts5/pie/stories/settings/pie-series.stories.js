import PieChart from "~/components/Chart/amcharts5/pie/index.vue";
import * as am5 from "@amcharts/amcharts5";

export default {
  title: "Components/Chart/pie/settings/pieSeriesSet",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "This is a guide to setting up pie series. It is accessed and used as pieSeriesSet. \n\n" +
          "pie series 관련 설정을 하는 가이드 입니다. pieSeriesSet 으로 접근하여 사용합니다. \n\n" +
          "Reference: https://www.amcharts.com/docs/v5/reference/ipercentseriessettings/",
      },
    },
  },
  args: {
    styleProps: "width: 100%; height: 300px",
    data: [{ key1: 10, key2: 10, key3: 2 }],
    pieDataBinder: [
      {
        key: "key1",
        displayName: "Processing Time",
      },
      {
        key: "key2",
        displayName: "Warmup Time",
      },
      {
        key: "key3",
        displayName: "Cooldown Time",
      },
    ],
    category: "displayName",
  },
};

export const CurrentSettings = {};

export const LegendLabelText = {
  args: {
    pieSeriesSet: {
      legendLabelText: "{category}: {value}",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "emoldino: {category}, example: {category}: {value}\n\n" +
          "Set the text to be displayed in the pie series legend using the legendLabelText property. \n\n" +
          "legendLabelText 속성을 이용해서 pie series 범례에 보여줄 text 를 설정합니다.",
      },
    },
  },
};

export const AlignLabels = {
  args: {
    pieSeriesSet: {
      alignLabels: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "emoldino: true, example: false \n\n" +
          "Align slice labels to columns/rows. (슬라이스 레이블을 열/행에 정렬합니다.)",
      },
    },
  },
};
