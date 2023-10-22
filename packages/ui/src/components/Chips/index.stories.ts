import type { Meta, StoryObj } from "@storybook/vue";
import Chips from "~/components/Chips/chips.vue";

type ChipsInstance = InstanceType<typeof Chips>;

const meta: Meta<ChipsInstance> = {
  title: "Components/Chips",
  component: Chips,
  argTypes: {
    clickHandler: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<ChipsInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Chips },
      template: String.raw`
        <chips v-bind="$props">
          Option
        </chips>
      `,
    };
  },
  args: {
    inactive: false,
  },
};
