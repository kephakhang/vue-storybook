import type { Meta, StoryObj } from "@storybook/vue";
import TabIcon from "~/components/TabIcon/tab-icon.vue";

// import assets to prevent break url in prod;
import partIcon from "~assets/images/icon/part-icon-hover.svg";

type TabIconInstance = InstanceType<typeof TabIcon>;
const meta: Meta<TabIconInstance> = {
  title: "Components/Tab Icon",
  component: TabIcon,
  parameters: {
    componentSubtitle: "tab button component",
  },
  argTypes: {
    tabStyle: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "select" },
      options: ["large", "small"],
    },
  },
};

export default meta;
type Story = StoryObj<TabIconInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TabIcon },
      template: String.raw`
    <TabIcon
             :tab-style="tabStyle"
             :tab-buttons="tabButtons"
             :size="size"
             :click="clickHandler"
             ></TabIcon>`,
    };
  },
  args: {
    tabButtons: [
      {
        title: "Reject Rate",
        active: true,
        icon: partIcon,
        iconStyle: "",
      },
      {
        title: "Reject Rate",
        icon: partIcon,
        iconStyle: "",
      },
      {
        title: "Reject Rate",
        icon: partIcon,
        iconStyle: "",
      },
      {
        title: "Reject Rate",
        icon: partIcon,
        iconStyle: "",
      },
    ],
    clickHandler(item) {
      this.result = item;
    },
  },
};

export const HorizontalType: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TabIcon },
      template: String.raw`
      <TabIcon
      :tab-style="tabStyle"
      :tab-buttons="tabButtons"
      :size="size"
      :click-handler="clickHandler"
      ></TabIcon>`,
    };
  },
  args: {
    ...Default.args,
  },
};

export const VerticalType: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TabIcon },
      template: String.raw`
      <TabIcon
      tab-style="vertical"
      :tab-buttons="tabButtons"
      :size="size"
      :click-handler="clickHandler"
      ></TabIcon>`,
    };
  },
  args: {
    ...Default.args,
  },
};

export const LargeSizeType: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TabIcon },
      template: String.raw`
      <TabIcon
      :tab-style="tabStyle"
      :tab-buttons="tabButtons"
      size="large"
      :click-handler="clickHandler"
      ></TabIcon>`,
    };
  },
  args: {
    ...Default.args,
  },
};

export const SmallSizeType: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TabIcon },
      template: String.raw`
      <TabIcon
      :tab-style="tabStyle"
      :tab-buttons="tabButtons"
      size="small"
      :click-handler="clickHandler"
      ></TabIcon>`,
    };
  },
  args: {
    ...Default.args,
  },
};
