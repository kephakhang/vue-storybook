import type { Meta, StoryObj } from "@storybook/vue";
import TableStatus from "./table-status.vue";

type TableStatusInstance = InstanceType<typeof TableStatus>;

const meta: Meta<TableStatusInstance> = {
  title: "Components/Table Status",
  component: TableStatus,
};

export default meta;
type Story = StoryObj<TableStatusInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TableStatus },
      template: String.raw`
          <table-status v-bind="$props" />
        `,
    };
  },
  args: {
    category: "DOWNTIME",
  },
  argTypes: {
    category: {
      control: { type: "select" },
      options: [
        "DOWNTIME",
        "REGISTERED",
        "UNCONFIRMED",
        "CONFIRMED",
        "HIGH_RISK",
        "MEDIUM_RISK",
        "LOW_RISK",
        "HIGH",
        "MEDIUM",
        "LOW",
        "OVERDUE",
        "UPCOMING",
        "REQUESTED",
        "DECLINED",
        "CANCELLED",
        "INACTIVE",
        "PENDING",
        "PENDING_APPROVAL",
        "IN_PROGRESS",
        "COMPLETED",
        "IN_PRODUCTION",
        "IDLE",
        "SENSOR_OFFLINE",
        "SENSOR_DETACHED",
        "NO_SENSOR",
        "ON_STANDBY",
        "CHANGED",
        "DISPOSED",
        "DISABLED",
        "IN_USE",
        "NOT_IN_USE",
        "FAILURE",
        "DISCARDED",
      ],
    },
  },
};
