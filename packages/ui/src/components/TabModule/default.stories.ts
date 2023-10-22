import type { Meta, StoryObj } from "@storybook/vue";
import TabModule from "./tab-module.vue";

import partIcon from "~assets/images/icon/part-icon-hover.svg";

type TabModuleInstance = InstanceType<typeof TabModule>;
const meta: Meta<TabModuleInstance> = {
  title: "Components/Tab Module",
  component: TabModule,
};
export default meta;
type Story = StoryObj<TabModuleInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { TabModule },
      props: Object.keys(argTypes),
      template: String.raw`
    <TabModule
            :style-props="styleProps"
            :tab-type="tabType"
            :tab-style="tabStyle"
            :tab-buttons="tabButtons"
            :size="size"
            :click-handler="clickHandler"></TabModule>`,
    };
  },
  args: {
    styleProps: "",
    tabType: "primary-tab",
    tabStyle: "horizontal",
    tabButtons: [
      {
        title: "Asset Management",
        active: true,
        icon: partIcon,
      },
      {
        title: "Asset Management",
        icon: partIcon,
      },
      {
        title: "Asset Management",
        icon: partIcon,
      },
      {
        title: "Asset Management",
        icon: partIcon,
      },
    ],
    clickHandler(item) {
      this.result = item;
    },
  },
};

export const PrimaryModule: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    tabType: "primary-tab",
  },
};

export const SecondaryModule: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    tabType: "secondary-tab",
  },
};
