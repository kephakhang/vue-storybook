import PieChart from "~/components/Chart/amcharts5/pie/index.vue";
import * as am5 from "@amcharts/amcharts5";

export default {
  title: "Components/Chart/pie/settings/pieChartSet",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "This is a guide to setting up pie chart. It is accessed and used as pieChartSet. \n\n" +
          "pie Chart 관련 설정을 하는 가이드 입니다. pieChartSet 으로 접근하여 사용합니다. \n\n" +
          "Reference: https://www.amcharts.com/docs/v5/reference/piechart/",
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

export const CurrentSettings = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "This is the current default setting for pie Chart. (pie Chart 의 현재 기본 설정입니다.)",
      },
    },
  },
};

export const Radius = {
  args: {
    pieChartSet: {
      radius: am5.percent(50),
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: am5.percent(50), emoldino: am5.percent(100) \n\n" +
          "Specifies the radius area of ​​the pie chart. (pie chart 의 반지름영역을 지정합니다.)",
      },
    },
  },
};

export const InnerRadius = {
  args: {
    pieChartSet: {
      innerRadius: 0,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: 0, emoldino: am5.percent(80) \n\n" +
          "Specifies the radius area inside the pie chart. (pie chart 내부의 반지름영역을 지정합니다.)",
      },
    },
  },
};
