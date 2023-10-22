import PieChart from "~/components/Chart/amcharts5/pie/index.vue";

export default {
  title: "Components/Chart/pie/events",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "This is how to set the event of the pie chart. (pie chart 의 이벤트 설정 방법입니다.)",
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

const html = String.raw;

function customEvent(event, pieChartComponent) {
  console.log("event: ", event);
  console.log("pieChartComponent: ", pieChartComponent);
}

export const InnerContentClickEvent = {
  args: {
    chartSet: {
      innerContent: {
        html: html`<div
          onclick="console.log('onclick event !');"
          style="display: flex; flex-direction: column; align-items: center;"
        >
          <span style="font-weight: 700; font-size: 50px; color: #3491ff;">
            Donut
          </span>
          <span style="font-size: 16px;">Inner Label</span>
        </div>`,
      },
    },
    innerContentClickEvent: customEvent,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This is a handler that clicks on the content inside the circle. (원형 내부의 컨텐츠를 클릭하는 핸들러 입니다.)",
      },
    },
  },
};

export const SliceClickEvent = {
  args: {
    sliceClickEvent: customEvent,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A handler that clicks on a piece of pie. (pie 의 조각을 클릭하는 핸들러입니다.)",
      },
    },
  },
};

export const SliceHoverEvent = {
  args: {
    sliceHoverEvent: customEvent,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This is a handler to be operated when hovering over a piece of pie. (pie 의 조각에 hover 했을 때 동작할 handler 입니다.)",
      },
    },
  },
};

export const SliceUnhoverEvent = {
  args: {
    sliceUnhoverEvent: customEvent,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A handler to be triggered when unhovering on a pie piece. (pie 조각에서 unhover 할 때 동작할 핸들러입니다.)",
      },
    },
  },
};
