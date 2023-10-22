import type { Meta, StoryObj } from "@storybook/vue";
import LineSpinner from "./line-spinner.vue";

type SpinnerInstance = InstanceType<typeof LineSpinner>;

const meta: Meta<SpinnerInstance> = {
  title: "Components/Spinner/Line Spinner",
  component: LineSpinner,
};

export default meta;

type Story = StoryObj<SpinnerInstance>;

export const Default: Story = {
  render() {
    return {
      components: { Spinner: LineSpinner },
      template: String.raw`
        <Spinner />
      `,
    };
  },
};

export const WithText: Story = {
  render(_, { argTypes }) {
    return {
      components: { Spinner: LineSpinner },
      props: Object.keys(argTypes),
      template: String.raw`
        <Spinner v-bind="$props" />
      `,
    };
  },
  args: {
    text: "Loading",
  },
};
