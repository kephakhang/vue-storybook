import PieChart from "~/components/Chart/amcharts5/pie/index.vue";

export default {
  title: "Components/Chart/pie/settings/chartSet",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Make overall settings for Chart. (Chart의 전반적인 설정을 합니다.)",
      },
    },
  },
  args: {
    styleProps: "width: 100%; height: 300px",
    data: [{ key1: 10000, key2: 10000, key3: 3000 }],
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

export const UseTheme = {
  args: {
    chartSet: {
      useTheme: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: true, emoldino: false \n\n" +
          "Access useTheme to define whether to use a theme such as animation. \n\n" +
          "useTheme 에 접근하여 애니메이션과 같은 테마를 사용할 것인지 정의합니다. \n\n" +
          "",
      },
    },
  },
};

const html = String.raw;
export const InnerContentHtml = {
  args: {
    chartSet: {
      innerContent: {
        x: 50,
        y: 50,
        centerX: 50,
        centerY: 50,
        html: html`
          <div
            @click="printLog"
            style="display: flex; flex-direction: column; align-items: center;"
          >
            <span style="font-weight: 700; font-size: 50px; color: #3491ff;">
              Donut
            </span>
            <span style="font-size: 16px;">Inner Label</span>
          </div>
        `,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can set the html to be displayed inside the pie chart by accessing innerContent.html . \n\n" +
          "innerContent.html 에 접근하여 원형 차트 내부에 보여줄 html 을 설정할 수 있습니다. \n\n" +
          " \n\n",
      },
    },
  },
};

export const RootContainerLayout = {
  args: {
    chartSet: {
      root: { container: { layout: "horizontalLayout" } }, // 'verticalLayout', 'horizontalLayout'
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: 'horizontalLayout', emoldino: 'verticalLayout'" +
          "You can access the root.container.layout to set the layout of how to display the legend. \n\n" +
          "root.container.layout 에 접근하여 범례를 어떻게 보여줄 것인지에 대한 layout 을 설정할 수 있습니다. \n\n" +
          "",
      },
    },
  },
};

export const Colors = {
  args: {
    chartSet: {
      colors: ["#f00", "#0f0", "#00f"],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: ['#f00', '#0f0', '#00f'], emoldino: ['#BCE2C7', '#4EBCD5', '#1A2281', '#86a873', '#bb9f06']" +
          "You can access colors to set a list of colors to display in the slice. \n\n" +
          "colors에 접근하여 slice 에 보여줄 색상 리스트를 설정할 수 있습니다. \n\n" +
          "",
      },
    },
  },
};

export const NumberFormat = {
  args: {
    chartSet: {
      numberFormat: "#a",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: '#,###', emoldino: #a \n\n" +
          "You can access numberFormat to define the number display format. \n\n" +
          "numberFormat 에 접근하여 숫자 보여주기 형식을 정의할 수 있습니다. \n\n" +
          "",
      },
    },
  },
};
