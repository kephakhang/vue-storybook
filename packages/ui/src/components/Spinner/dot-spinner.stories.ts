import type { Meta, StoryObj } from "@storybook/vue";
import Spinner from "./dot-spinner.vue";

type SpinnerInstance = InstanceType<typeof Spinner>;
const meta: Meta<SpinnerInstance> = {
  title: "Components/Spinner/Dot Spinner",
  component: Spinner,
};

export default meta;
export const Default: StoryObj<SpinnerInstance> = {
  render(_, { args }) {
    return {
      components: { Spinner },
      props: Object.keys(args),
      template: String.raw`
        <spinner v-bind="$props" />
      `,
    };
  },
  args: {
    width: 20,
    height: 20,
  },
};
