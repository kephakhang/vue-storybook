import type { Meta, StoryObj } from "@storybook/vue";
import TabNumber from "./tab-number.vue";

// import assets to prevent break url in prod;
import partIcon from "~assets/images/icon/part-icon-hover.svg";
type TabNumberInstance = InstanceType<typeof TabNumber>;
const meta: Meta<TabNumberInstance> = {
  title: "Components/Tab Number",
  component: TabNumber,
  parameters: {
    componentSubtitle: "tab button component",
  },
};
export default meta;
type Story = StoryObj<TabNumberInstance>;

export const HorizontalTab: Story = {
  render(_, { argTypes }) {
    return {
      components: { TabNumber },
      props: Object.keys(argTypes),
      template: String.raw`
    <TabNumber
        :style-props="styleProps"
        :tab-style="tabStyle"
        :tab-buttons="tabButtons"
        :size="size"
        :click-handler="clickHandler"></TabNumber>`,
    };
  },
  args: {
    styleProps: "",
    tabStyle: "horizontal",
    tabButtons: [
      {
        title: "Date",
        active: true,
        icon: partIcon,
        itemRate: 30,
        iconStyle: "",
      },
      {
        title: "Week",
        icon: partIcon,
        itemRate: 40,
        iconStyle: "",
      },
      {
        title: "Month",
        icon: partIcon,
        itemRate: 60,
        iconStyle: "",
      },
      {
        title: "Year",
        icon: partIcon,
        itemRate: 30,
        iconStyle: "",
      },
    ],
    clickHandler(item) {
      this.result = item;
    },
  },
};

export const VerticalTab: Story = {
  render: HorizontalTab.render,
  args: {
    ...HorizontalTab.args,
    tabStyle: "vertical",
  },
};
