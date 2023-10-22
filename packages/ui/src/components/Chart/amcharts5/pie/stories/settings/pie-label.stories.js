import PieChart from "~/components/Chart/amcharts5/pie/index.vue";
import * as am5 from "@amcharts/amcharts5";

export default {
  title: "Components/Chart/pie/settings/pieLabelSet",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "This is a guide to setting up pie label. It is accessed and used as pieLabelSet. \n\n" +
          "pie label 관련 설정을 하는 가이드 입니다. pieLabelSet 으로 접근하여 사용합니다. \n\n" +
          "Reference: https://www.amcharts.com/docs/v5/reference/iradiallabelsettings/#baseRadius_property \n\n" +
          "Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/labels/",
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

export const Fill = {
  args: {
    pieLabelSet: { fill: am5.color("#f00") },
  },
  parameters: {
    docs: {
      description: {
        story:
          "emoldino: am5.color('#4b4b4b'), example: am5.color('#f00') \n\n" +
          "The color of label. (label 의 색상입니다.)",
      },
    },
  },
};

export const FontSize = {
  args: {
    pieLabelSet: { fontSize: "40px" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "emoldino: '15px', example: '40px' \n\n" +
          "The font size of the label. (label 의 font size 입니다.)",
      },
    },
  },
};

export const BaseRadius = {
  args: {
    pieLabelSet: { baseRadius: am5.percent(100) },
  },
  parameters: {
    docs: {
      description: {
        story:
          "emoldino: am5.percent(50), example: am5.percent(100) \n\n" +
          "The radius of the label location. (레이블 위치의 반경입니다.)",
      },
    },
  },
};

export const TextType = {
  args: {
    pieLabelSet: { textType: "circular" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "emoldino: 'regular': example: 'circular' \n\n" +
          "The textType of label. (label 의 textType 입니다.) \n\n" +
          "Types include regular, circular, radial, aligned, and adjusted.",
      },
    },
  },
};
