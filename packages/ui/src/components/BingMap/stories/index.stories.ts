import type { Meta, StoryObj } from "@storybook/vue";
import BingMapProvider from "../../BingMapProvider/index.vue";
import BingMap from "./../index.vue";

type BingMapInstance = InstanceType<typeof BingMap>;
const meta: Meta<BingMapInstance> = {
  title: "Components/BingMap",
  component: BingMap,
  decorators: [
    () => ({
      template: "<div style='width: 600px; height: 300px;'><story /></div>",
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Componentize Microsoft's bingmap. It is used by wrapping it with a bingmap provider component. \n\n" +
          "microsoft 의 bingmap 을 컴포넌트화 합니다. bingmap provider 컴포넌트로 감싸서 사용합니다.",
      },
    },
  },
  argTypes: {
    mapTypeId: {
      control: { type: "select" },
      options: [
        "aerial",
        "canvasDark",
        "canvasLight",
        "birdseye",
        "grayscale",
        "mercator",
        "ordnanceSurvey",
        "road",
        "streetside",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<BingMapInstance>;

export const CurrentSettings: Story = {
  render(_, { argTypes }) {
    return {
      components: { BingMapProvider, BingMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <BingMapProvider><BingMap v-bind="$props" /></BingMapProvider>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          "This is the current default setting for bingmap. (bingmap 의 현재 기본 설정입니다.) \n\n",
      },
    },
  },
  args: {},
};

export const Pushpin: Story = {
  render(_, { argTypes }) {
    return {
      components: { BingMapProvider, BingMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <BingMapProvider><BingMap v-bind="$props" /></BingMapProvider>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          "It is a pushpin of bingmap that functions like google's marker. (google의 marker 와 같은 기능을 하는 bingmap 의 pushpin 입니다.)\n\n" +
          "This is the current setting of pushpin. (pushpin 의 현재 설정입니다.) \n\n",
      },
    },
  },
  args: {
    pushpinList: [
      {
        location: {
          latitude: 37.668316,
          longitude: 127.039173,
        },
      },
    ],
  },
};

export const Text: Story = {
  render(_, { argTypes }) {
    return {
      components: { BingMapProvider, BingMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <BingMapProvider><BingMap v-bind="$props" /></BingMapProvider>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          "This explains how to set the letters of pushpin. (pushpin의 글자를 설정하는 방법을 설명합니다.) \n\n",
      },
    },
  },
  args: {
    pushpinList: [
      {
        location: {
          latitude: 45.77598720000001,
          longitude: -1.5119702000000057,
        },
        options: {
          title: "title",
          subTitle: "subTitle",
          text: "text",
        },
      },
    ],
  },
};

function pushpinFunction(args: {
  event:
    | Microsoft.Maps.IMouseEventArgs
    | Microsoft.Maps.IPrimitiveChangedEventArgs;
  pushpin: Microsoft.Maps.Pushpin;
  data?: unknown;
}) {
  const { event, pushpin, data } = args;
  console.log("event: ", event);
  console.log("pushpin: ", pushpin);
  console.log("data: ", data);
}

export const PushpinEvent: Story = {
  render(_, { argTypes }) {
    return {
      components: { BingMapProvider, BingMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <BingMapProvider><BingMap v-bind="$props" /></BingMapProvider>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          "This event is fired when pushpin is clicked. (pushpin을 클릭할 때 발생하는 이벤트 입니다.) \n\n",
      },
    },
  },
  args: {
    pushpinEvent: { click: pushpinFunction },
    pushpinList: [
      {
        location: {
          latitude: 45.77598720000001,
          longitude: -1.5119702000000057,
        },
      },
    ],
  },
};
