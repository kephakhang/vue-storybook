import type { Meta, StoryObj } from "@storybook/vue";
import ToggleButton from "~/components/ToggleButton/toggle-button.vue";
import "~/components/ToggleButton/style.css";

type ToggleButtonInstance = InstanceType<typeof ToggleButton>;
const meta: Meta<ToggleButtonInstance> = {
  title: "Components/Toggle Button",
  component: ToggleButton,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "large"],
    },
    toggle: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<ToggleButtonInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { ToggleButton },
      template: String.raw`<toggle-button
                  :disabled="disabled"
                  :toggle="toggle"
                  :size="size"
                  :click-handler="clickHandler"></toggle-button>`,
    };
  },
  args: {
    size: "default",
    toggle: true,
    disabled: false,
    clickHandler: Function,
  },
};

export const Checked: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { ToggleButton },
      template: String.raw` <div class="mainDiv">
      <toggle-button :value="true"></toggle-button>
      <toggle-button :value="false"></toggle-button>
    </div>`,
    };
  },
};

export const Disabled: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { ToggleButton },
      template: String.raw` <div class="mainDiv">
      <toggle-button :disabled="true"></toggle-button>
      <toggle-button :disabled="false"></toggle-button>
    </div>`,
    };
  },
};

export const Size: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { ToggleButton },
      template: String.raw`  <div class="mainDiv">
      <toggle-button size="default" :click-handler="clickHandler" :toggle="true"></toggle-button>
      <toggle-button size="large" :click-handler="clickHandler" :toggle="true"></toggle-button>
    </div>`,
    };
  },
};
