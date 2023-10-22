import type { Meta, StoryObj } from "@storybook/vue";
import TabButton from "./tab-button.vue";

type TabButtonInstance = InstanceType<typeof TabButton>;
const meta: Meta<TabButtonInstance> = {
  title: "Components/Tab Button",
  component: TabButton,
  parameters: {
    componentSubtitle: "tab button component",
  },
  argTypes: {
    tabStyle: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    tabType: {
      control: { type: "select" },
      options: ["primary-tab", "secondary-tab"],
    },
  },
};

export default meta;
type Story = StoryObj<TabButtonInstance>;

export const Primary: Story = {
  render(_, { argTypes }) {
    return {
      components: { TabButton },
      props: Object.keys(argTypes),
      template: String.raw`
        <tab-button v-bind="$props" />
      `,
    };
  },
  args: {
    tabType: "primary-tab",
    tabStyle: "horizontal",
    tabButtons: [
      {
        title: "Date",
        active: true,
      },
      { title: "Week" },
      { title: "Month" },
      { title: "Year" },
    ],
    clickHandler(item) {
      this.result = item;
    },
  },
};

export const PrimaryVertical: Story = {
  render: Primary.render,
  args: {
    ...Primary.args,
    tabStyle: "vertical",
  },
};

export const Secondary: Story = {
  render: Primary.render,
  args: {
    ...Primary.args,
    tabType: "secondary-tab",
  },
};

export const SecondaryVertical: Story = {
  render: Primary.render,
  args: {
    ...Secondary.args,
    tabStyle: "vertical",
  },
};
