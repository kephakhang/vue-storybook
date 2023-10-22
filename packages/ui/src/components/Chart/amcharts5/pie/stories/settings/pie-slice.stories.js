import PieChart from "~/components/Chart/amcharts5/pie/index.vue";
import * as am5 from "@amcharts/amcharts5";

export default {
  title: "Components/Chart/pie/settings/pieSliceSet",
  component: PieChart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "This is a guide to setting up pie slice. It is accessed and used as pieSliceSet. \n\n" +
          "pie slice 관련 설정을 하는 가이드 입니다. pieSliceSet 으로 접근하여 사용합니다. \n\n" +
          "Reference: https://www.amcharts.com/docs/v5/reference/islicesettings/",
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

let style = `flex: 1; 
padding: 10px; 
background: #fff; 
z-index: 1000; 
position: fixed; 
box-shadow: 0 0 3px rgba(0,0,0,.3); 
border-radius: 0.25rem;`;
export const TooltipHTML = {
  args: {
    pieSliceSet: {
      tooltipHTML: `<div style='${style}'>{category}: {value} example</div>`,
      // "<div style='padding: 10px'>{category}: {value} example</div>",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: <div style='padding: 10px'>{category}: {value} example</div>}' \n\n" +
          "emoldino: '<div style='padding: 10px'>{category}: {value}</div>' \n\n" +
          "You can define a tooltip by accessing the tooltipHTML property (tooltipHTML 속성에 접근하여 tooltip 을 정의할 수 있습니다.). \n\n" +
          "Currently available keys are category and value. (현재 사용할 수 있는 key는 category 와 value가 있습니다.)",
      },
    },
  },
};

export const TooltipPosition = {
  args: {
    pieSliceSet: {
      tooltipPosition: "fixed",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: 'fixed', emoldino: 'pointer' \n\n" +
          "tooltip 의 위치를 어떻게 표현할 것인지 정의합니다. 'fixed' 는 slice의 가운데에 위치되며,  \n\n",
      },
    },
  },
};

export const CursorOverStyle = {
  args: {
    pieSliceSet: {
      cursorOverStyle: "not-allowed",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: 'not-allowed', emoldino: 'pointer' \n\n" +
          "https://developer.mozilla.org/ko/docs/Web/CSS/cursor",
      },
    },
  },
};

export const StrokeOpacity = {
  args: {
    pieSliceSet: {
      strokeOpacity: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: 1, emoldino: 0 \n\n" +
          "The line transparency of the slice border. (slice 테두리의 선 투명도 입니다.)",
      },
    },
  },
};

export const Stroke = {
  args: {
    pieSliceSet: {
      stroke: am5.color("#f00"),
      strokeOpacity: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: am5.color('#f00'), emoldino: am5.color('#4b4b4b') \n\n" +
          "The line color of the slice border. (slice 테두리의 선 색상입니다.)",
      },
    },
  },
};

export const StrokeWidth = {
  args: {
    pieSliceSet: {
      stroke: am5.color("#f00"),
      strokeOpacity: 1,
      strokeWidth: 5,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: 5, emoldino: 1 \n\n" +
          "slice 테두리의 선 굵기 입니다. (Line thickness of the slice border.)",
      },
    },
  },
};

export const FillOpacity = {
  args: {
    pieSliceSet: {
      stroke: am5.color("#f00"),
      strokeOpacity: 1,
      strokeWidth: 5,
      fillOpacity: 0.5,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "example: 0.5, emoldino: 1 \n\n" +
          "The background transparency of the slice. (slice 의 배경 투명도 입니다.)",
      },
    },
  },
};
