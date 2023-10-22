import ProgressBar from "./progress-bar.vue";
import type { Meta, StoryObj } from "@storybook/vue";

type ProgressBarInstance = InstanceType<typeof ProgressBar>;
type Story = StoryObj<ProgressBarInstance>;

const meta: Meta<ProgressBarInstance> = {
  title: "Components/Progress Bar",
  component: ProgressBar,
  argTypes: {
    value: {
      control: { type: "number" },
    },
    bgColor: {
      control: { type: "color" },
    },
    borderColor: {
      control: { type: "color" },
    },
  },
};

export default meta;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { ProgressBar },
      props: Object.keys(argTypes),
      template: String.raw`
        <div style="width:200px; height: 18px;">
          <progressBar v-bind="$props">
            <template #value>{{ value }}</template>
          </progressBar>
        </div>
      `,
    };
  },
  args: {
    borderColor: undefined,
    styleProps: undefined,
    value: 50,
    bufferValue: 100,
    bgColor: "blue",
  },
};
