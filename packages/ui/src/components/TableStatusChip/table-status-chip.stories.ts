import type { Meta, StoryObj } from "@storybook/vue";
import TableStatusChip from "~/components/TableStatusChip/table-status-chip.vue";

type TableStatusChipInstance = InstanceType<typeof TableStatusChip>;

const meta: Meta<TableStatusChipInstance> = {
  title: "Components/Table Status Chip",
  component: TableStatusChip,
  argTypes: {
    tooltipText: {
      control: { type: "text" },
    },
    statusType: {
      control: { type: "select" },
      options: ["Active", "Inactive", "Pending", "Disapproved", "Approved"],
    },
  },
};

export default meta;
type Story = StoryObj<TableStatusChipInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { TableStatusChip },
      props: Object.keys(argTypes),
      template: String.raw`<TableStatusChip
                :tooltip-style-props="tooltipStyleProps"
                :status-type="statusType"
                :tooltip-text="tooltipText"
                >Option</TableStatusChip>`,
    };
  },
  args: {
    statusType: "Active",
    tooltipText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant pulvique mauris erat. ",
  },
};
