import type { Meta, StoryObj } from "@storybook/vue";
import WidgetGroup from "./widget-group.vue";
import WidgetArea from "./widget-area.vue";
import type { WidgetGroupSize } from "../../types/WidgetGroup";

type WidgetGroupInstance = InstanceType<typeof WidgetGroup>;

const meta: Meta<WidgetGroupInstance> = {
  title: "Components/Widget Group",
  component: WidgetGroup,
};
export default meta;

export const Default: StoryObj<WidgetGroupInstance> = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { WidgetGroup, WidgetArea },
      data() {
        return { col: 4 };
      },
      methods: {
        onSizeChanged(size: WidgetGroupSize) {
          if (size === "large") {
            this.col = 4;
          } else if (size === "medium") {
            this.col = 3;
          } else {
            this.col = 2;
          }
        },
      },
      template: String.raw`
        <div style="width: 100vw; height: 90vh">
          <WidgetGroup v-bind="$props" :columns="col" :on-size-change="onSizeChanged">
            <WidgetArea id="1" :size="2">
              <div style="height: 100%; width: 100%; background: blue"></div>
            </WidgetArea>
            <WidgetArea id="2" :size="1">
              <div style="height: 100%; width: 100%; background: red"></div>
            </WidgetArea>
            <WidgetArea id="3" :size="1">
              <div style="height: 100%; width: 100%; background: green"></div>
            </WidgetArea>
            <WidgetArea id="4" :size="2">
              <div style="height: 100%; width: 100%; background: green"></div>
            </WidgetArea>
            <WidgetArea id="5" :size="2">
              <div style="height: 100%; width: 100%; background: green"></div>
            </WidgetArea>
            <WidgetArea id="6" :size="3">
              <div style="height: 100%; width: 100%; background: green"></div>
            </WidgetArea>
            <WidgetArea id="7" :size="3">
              <div style="height: 100%; width: 100%; background: green"></div>
            </WidgetArea>
          </WidgetGroup>
        </div>
      `,
    };
  },
  args: {
    styleProps: {
      background: "gray",
      gap: "20px",
    },
  },
};
