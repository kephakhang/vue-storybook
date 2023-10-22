import type { Meta, StoryObj } from "@storybook/vue";
import TabOverview from "./tab-overview.vue";

type TabOverviewInstance = InstanceType<typeof TabOverview>;
const meta: Meta<TabOverviewInstance> = {
  title: "Components/tab-overview",
  component: TabOverview,
};

export default meta;
type Story = StoryObj<TabOverviewInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { TabOverview },
      props: Object.keys(argTypes),
      template: String.raw`
    <TabOverview
        :is-active="isActive"
        :label="label"
        :position="position"
        :label-align="labelAlign"
        :value="value"
        :trend="trend"
        :value-formatter="appendThousandSeperator"
        :trend-formatter="appendThousandSeperator"
        :size="size"
        >

    </TabOverview>`,
    };
  },
  args: {
    tabContent: "",
    isActive: false,
    label: "End of Life Cycle",
    field: "endOfLifeCycle",
    trend: 0,
    value: 0,
    position: "top",
    labelAlign: "bottom",
    valueFormatter() {
      return "";
    },
    trendFormatter() {
      return "";
    },
    size: "large",
    appendThousandSeperator(val: string, separator = ",") {
      return val?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, separator) || "";
    },
  },
};
