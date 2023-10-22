import type { Meta, StoryObj } from "@storybook/vue";
import Tooltip from "~/components/TooltipV2/tooltip.vue";

type TooltipInstance = InstanceType<typeof Tooltip>;

const meta: Meta<TooltipInstance> = {
  title: "Components/Tooltip v2",
  component: Tooltip,
  argTypes: {
    position: {
      control: {
        type: "radio",
      },
      options: [
        "top",
        "bottom",
        "left",
        "left-top",
        "left-bottom",
        "right",
        "right-top",
        "right-bottom",
      ],
    },
    colorType: {
      control: {
        type: "radio",
      },
      options: ["black", "white"],
    },
  },
};

export default meta;

type Story = StoryObj<TooltipInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Tooltip },
      props: Object.keys(argTypes),
      template: String.raw`
        <tooltip v-bind="$props">
          <template #target>
            <span>target</span>
          </template>
          <template #tooltip>
            <span>tooltip</span>
          </template>
        </tooltip>
      `,
    };
  },
  args: {
    id: "tooltip",
    position: "top",
    colorType: "black",
  },
};
