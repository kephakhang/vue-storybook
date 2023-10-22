import PieChart from "~/components/Chart/amcharts5/pie/index.vue";

export default {
  title: "Components/Chart/pie/settings/tooltip",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "This is a guide to configure tooltip related settings. Access and use tooltipSet. \n\n" +
          "tooltip 관련 설정을 하는 가이드 입니다. tooltipSet 으로 접근하여 사용합니다. \n\n" +
          "Reference: https://www.amcharts.com/docs/v5/reference/tooltip/",
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
          "This is the current default tooltip setting for pie charts. (pie Chart 의 현재 기본 tooltip 설정입니다.)",
      },
    },
  },
};

export const ForceHidden = {
  args: {
    tooltipSet: {
      forceHidden: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: true, emoldino: false \n\n" +
          "Defines whether to show tooltips. (tooltip을 보여줄 것인지 여부를 정의합니다.)",
      },
    },
  },
};

export const Padding = {
  args: {
    tooltipSet: {
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 \n\n" +
          "emoldino: paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 \n\n" +
          "Set the padding area of ​​the tooltip. (tooltip 의 padding 영역을 설정합니다.)",
      },
    },
  },
};

export const GetFillFromSprite = {
  args: {
    tooltipSet: {
      getFillFromSprite: true, // 채우기 색상을 상속 받음
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: true, emoldino: false \n\n" +
          "Defines whether to inherit the color when expressing the tooltip's fill. \n\n" +
          "tooltip 의 채우기를 표현할 때 색상을 상속 받을 것인지 여부를 정의합니다.",
      },
    },
  },
};

export const GetStrokeFromSprite = {
  args: {
    tooltipSet: {
      getStrokeFromSprite: true, // out line 색상을 상속 받음
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: true, emoldino: false \n\n" +
          "Defines whether to inherit the color when expressing the border of tooltip. \n\n" +
          "tooltip 의 테두리를 표현할 때 색상을 상속받을 것인지 여부를 정의합니다.",
      },
    },
  },
};
