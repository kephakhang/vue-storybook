import type { Meta, StoryObj } from "@storybook/vue";
import Tooltip, {
  type TooltipColor,
  type TooltipPosition,
} from "./tool-tip.vue";
import CtaButton from "~/components/Button/cta-button.vue";

type TooltipInstance = InstanceType<typeof Tooltip>;
const meta: Meta<TooltipInstance> = {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    position: {
      options: ["top", "bottom", "left", "right"],
    },
    color: {
      options: ["black", "white"],
    },
  },
};

export default meta;
type Story = StoryObj<TooltipInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Tooltip, CtaButton },
      props: Object.keys(argTypes),
      template: String.raw`
        <tooltip v-bind="$props">
          <template #context>
            <CtaButton color-type="blue">Hover me</CtaButton>
          </template>
          <template #body>
            <div>Hello</div>
          </template>
        </tooltip>
      `,
    };
  },
  args: {
    position: "top",
    color: "black",
  },
};

export const Multiple: Story = {
  render() {
    return {
      components: { Tooltip, CtaButton },
      data(): {
        positions: TooltipPosition[];
        colors: TooltipColor[];
      } {
        return {
          positions: ["top", "bottom", "left", "right"],
          colors: ["black", "white"],
        };
      },
      template: String.raw`
        <div style="display: flex; flex-direction: column; margin: 10px; gap: 20px">
          <div
            v-for="color in colors"
            style="display: inline-flex; margin: 10px; gap: 50px"
          >
            <tooltip
              v-for="position in positions"
              :key="position"
              :position="position"
              :color="color"
            >
              <template #context>
                <CtaButton color-type="blue">
                  {{ position.charAt(0).toUpperCase() + position.slice(1) }}
                </CtaButton>
              </template>
              <template #body>
                <div>{{ position.charAt(0).toUpperCase() + position.slice(1) }}</div>
              </template>
            </tooltip>
          </div>
        </div>
      `,
    };
  },
};
