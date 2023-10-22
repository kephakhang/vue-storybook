// https://www.amcharts.com/docs/v5/reference/tick/
import PieChart from "~/components/Chart/amcharts5/pie/index.vue";

export default {
  title: "Components/Chart/pie/advanced/NumberFormmater",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "숫자와 관련된 부분을 어떻게 처리할 것인가에 대한 설정입니다. ChartSet 의 numberFormat 에 형식을 정의할 수 있습니다.  \n\n" +
          "Reference: https://www.amcharts.com/docs/v5/reference/tick/",
      },
    },
  },
  args: {
    styleProps: "width: 100%; height: 300px",
    data: [{ key1: 100000.1234, key2: 23231.22222 }],
    pieDataBinder: [
      {
        key: "key1",
        displayName: "Processing Time",
      },
      {
        key: "key2",
        displayName: "Warmup Time",
      },
    ],
    category: "displayName",
  },
};

export const CurrentSetting = {
  args: {
    pieLabelSet: {
      text: "{value} ",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "'#,###' \n\n" +
          "현재는 세자리마다 (,)를 표시하고 긴 숫자를 그대로 보여주는 것이 기본설정입니다. \n\n" +
          "Currently, the default setting is to display (,) every three digits and show long numbers as they are.",
      },
    },
  },
};

// 접미사/접두사 적용
export const SuffixPrefix = {
  args: {
    chartSet: {
      numberFormat: "#a",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "'#a' \n\n" +
          "3자리는 K, 6자리는 M, 9자리는 G 등으로 표시합니다. \n\n" +
          "3 digits are represented by K, 6 digits by M, 9 digits by G, and so on.",
      },
    },
  },
};

// 소숫점 이하 제거
export const DemicalPoint = {
  args: {
    chartSet: {
      numberFormat: "#.##a",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "'#.##a' \n\n" +
          "소숫점을 몇자리까지 보여줄 것인지 정의합니다. #을 사용하면 값이 없을경우에 표시하지 않으며, 0을 사용할 경우 값이 없으면 0을 보여줍니다. \n\n" +
          "Defines how many decimal places to display. If # is used, it is not displayed if there is no value, and if 0 is used, 0 is displayed if there is no value.",
      },
    },
  },
};
