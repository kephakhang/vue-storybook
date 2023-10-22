import type { Meta, StoryObj } from "@storybook/vue";
import Tooltip from "./index.vue";

type TooltipInstance = InstanceType<typeof Tooltip>;

const meta: Meta<TooltipInstance> = {
  title: "Components/Tooltip Floating Vue",
  component: Tooltip,
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
          <template #tooltip-content><div>tooltip content</div></template>
          <template #tooltip-target><div>tooltip target</div></template>
        </tooltip>
      `,
    };
  },
  args: {
    theme: "light",
    shown: false,
    triggers: [],
  },
};
