import type { Meta, StoryObj } from "@storybook/vue";
import GoogleMapProvider from "../../GoogleMapProvider/index.vue";
import GoogleMap from "../index.vue";

type GoogleMapInstance = InstanceType<typeof GoogleMap>;
const meta: Meta<GoogleMapInstance> = {
  title: "Components/GoogleMap",
  component: GoogleMap,
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
          "(microsoft 의 bingmap 을 컴포넌트화 합니다. bingmap provider 컴포넌트로 감싸서 사용합니다.)",
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<GoogleMapInstance>;

export const CurrentSettings: Story = {
  render(_, { argTypes }) {
    return {
      components: { GoogleMapProvider, GoogleMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <GoogleMapProvider><GoogleMap v-bind="$props" /></GoogleMapProvider>
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
  args: {
    markerList: [
      {
        custom: {
          disabled: false,
        },
        markerOptions: {
          position: { lat: -25.363, lng: 131.044 },
          title: "title test",
        },
      },
      {
        custom: {
          disabled: true,
        },
        markerOptions: {
          position: { lat: -15.363, lng: 111.044 },
          title: "title test2",
        },
      },
    ],
  },
};

function markerEventFunction(config: {
  event: google.maps.MapMouseEvent;
  marker: google.maps.Marker;
  data?: unknown;
}) {
  const { event, marker, data } = config;
  console.log("event: ", event);
  console.log("marker: ", marker);
  console.log("data: ", data);
}

function mapEventFunction(event: google.maps.MapMouseEvent) {
  console.log("event: ", event);
}

export const MapEvent: Story = {
  render(_, { argTypes }) {
    return {
      components: { GoogleMapProvider, GoogleMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <GoogleMapProvider><GoogleMap v-bind="$props" /></GoogleMapProvider>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          "An object defining the map event. (map 이벤트를 정의하는 object 입니다.) \n\n" +
          "Enter the event name in key and define a function to be operated when an event occurs in value. \n\n" +
          "(key 에 event name 을 넣고, value에 이벤트 발생시 동작할 함수를 정의합니다.) \n\n" +
          "Receives the mouse event of google map. (google map의 mouse event를 전달받습니다.) \n\n" +
          "Check out the types of map events here. (map event 의 종류는 여기에서 확인하세요.) \n\n" +
          "https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events",
      },
    },
  },
  args: {
    mapEvent: {
      click: mapEventFunction,
    },
    markerList: [
      {
        custom: {
          disabled: false,
          data: "tempData",
        },
        markerOptions: {
          position: { lat: 37.668316, lng: 127.039173 },
        },
      },
      {
        custom: {
          disabled: true,
          data: "tempData2",
        },
        markerOptions: {
          position: { lat: -15.363, lng: 111.044 },
        },
      },
    ],
  },
};

export const MarkerEvent: Story = {
  render(_, { argTypes }) {
    return {
      components: { GoogleMapProvider, GoogleMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <GoogleMapProvider><GoogleMap v-bind="$props" /></GoogleMapProvider>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          "An object defining the marker event. (marker 이벤트를 정의하는 object 입니다.) \n\n" +
          "Enter the event name in key and define a function to be operated when an event occurs in value. \n\n" +
          "(key 에 event name 을 넣고, value에 이벤트 발생시 동작할 함수를 정의합니다.) \n\n" +
          "It receives {event, marker, data}. ({event, marker, data} 를 전달받습니다.)\n\n" +
          "event is the mouse event of google maps. (event 는 google map의 mouse event 입니다.) \n\n" +
          "marker is the marker of google maps. (marker 는 google map의 marker 입니다.) \n\n" +
          "data is the data passed to custom.data when setting the marker list. \n\n" +
          "(data 는 marker list 를 설정할 때 custom.data 로 넘겨주었던 데이터 입니다.) \n\n" +
          "Check out the types of marker events here. (marker event 의 종류는 여기에서 확인하세요.) \n\n" +
          "https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events",
      },
    },
  },
  args: {
    markerEvent: {
      click: markerEventFunction,
    },
    markerList: [
      {
        custom: {
          disabled: false,
          data: "tempData",
        },
        markerOptions: {
          position: { lat: -25.363, lng: 131.044 },
        },
      },
      {
        custom: {
          disabled: true,
          data: "tempData2",
        },
        markerOptions: {
          position: { lat: -15.363, lng: 111.044 },
        },
      },
    ],
  },
};
