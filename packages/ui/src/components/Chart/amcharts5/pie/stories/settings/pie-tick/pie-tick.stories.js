// https://www.amcharts.com/docs/v5/reference/tick/
import PieChart from "~/components/Chart/amcharts5/pie/index.vue";
import * as am5 from "@amcharts/amcharts5";

export default {
  title: "Components/Chart/pie/settings/pieTick",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A pie tick is a line connecting the label and the chart. (pie tick 은 label 과 chart 를 이어주는 선입니다.) \n\n" +
          "Reference: https://www.amcharts.com/docs/v5/reference/tick/",
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

export const CurrentSetting = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Currently, pie ticks are invisible by default. (현재 pie tick 은 보이지 않는 것이 기본입니다.)",
      },
    },
  },
};

// 외부 tick
export const ForceHidden = {
  args: {
    pieTickSet: {
      forceHidden: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "When forceHidden is set to false, ticks are shown. (forceHidden 을 false 로 하면 tick이 보여집니다.)",
      },
    },
  },
};

export const Location = {
  args: {
    pieTickSet: {
      forceHidden: false,
      location: 0,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can define where on the circle the label connects by setting the location property. 0: center of circle, 1: outside of circle \n\n" +
          "location 속성을 설정하여 원의 어느 부분부터 label 을 연결할지 정의할 수 있습니다. 0: 원의 중심, 1: 원의 외곽",
      },
    },
  },
};

export const Stroke = {
  args: {
    pieTickSet: {
      forceHidden: false,
      location: 0,
      stroke: am5.color("#f00"),
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can set the color of the grid with the stroke property. (stroke 속성으로 눈금의 색상을 설정할 수 있습니다.) \n\n" +
          "Currently, the default stroke color is set to #ddd. (현재 stroke 의 기본 색상은 #ddd 로 설정했습니다.)",
      },
    },
  },
};

export const WithSeriesSet = {
  args: {
    pieTickSet: {
      forceHidden: false,
    },
    pieSeriesSet: {
      alignLabels: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can align the labels by setting alignLabels of the pieSeriesSet to true . \n\n" +
          "pieSeriesSet 의 alignLabels 를 true 로 설정하여 레이블을 정렬할 수 있습니다.",
      },
    },
  },
};
