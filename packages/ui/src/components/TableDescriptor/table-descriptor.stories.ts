import type { Meta, StoryObj } from "@storybook/vue";
import TableDescriptor from "./table-descriptor.vue";

type TableStatusInstance = InstanceType<typeof TableDescriptor>;

const meta: Meta<TableStatusInstance> = {
  title: "Components/Table Descriptor",
  component: TableDescriptor,
};

export default meta;
type Story = StoryObj<TableStatusInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TableDescriptor },
      template: String.raw`
          <div style="border: 1px solid #ccc; border-radius: 3px; padding: 6px 8px;">
            <tableDescriptor v-bind="$props" />
          </div>
        `,
    };
  },
  args: {
    title: "Title",
    total: 40,
    unit: ["tooling", "toolings"],
    colLabels: ["Col 1", "Col 2"],
    listItems: [
      {
        category: "DOWNTIME",
        value: 20,
      },
      {
        category: "REGISTERED",
        value: 20,
      },
    ],
    styleProps: "width: 300px;",
  },
};
