import type { Meta, StoryObj } from "@storybook/vue";
import DataTable from "~/components/DataTableV2/data-table.vue";

type DataTableInstance = InstanceType<typeof DataTable>;
const meta: Meta<DataTableInstance> = {
  title: "Components/DataTable v2",
  component: DataTable,
};

export default meta;
type Story = StoryObj<DataTableInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { DataTable },
      props: Object.keys(argTypes),
      template: String.raw`
      <data-table
        :column-width-array="columnWidthArray"
        :rows="rows"
        :selected-rows="selectedRows"
        :checkboxes="checkboxes"
      >
      </data-table>
      `,
    };
  },
  args: {
    columnWidthArray: ["150px", "150px", "150px", "200px"],
    rows: [
      {
        Category: ["Armani", "Brand"],
        Division: "Chandler Bing",
        NumberOfParts: "305-917-1301",
        ProductionCapacity: "IT Manager",
      },
      {
        Category: "No Category",
        Division: "Ross Geller",
        NumberOfParts: "-",
        ProductionCapacity: "Paleontologist",
      },
      {
        Category: "No Category",
        Division: "Rachel Green",
        NumberOfParts: "765-338-0312",
        ProductionCapacity: "Waitress",
      },
      {
        Category: ["Valentino", "Brand"],
        Division: "Monica Geller",
        NumberOfParts: "-",
        ProductionCapacity: "Head Chef",
      },
      {
        Category: ["Replica", "Product"],
        Division: "Joey Tribbiani",
        NumberOfParts: "-",
        ProductionCapacity: "Actor",
      },
      {
        Category: ["Haircare", "Category"],
        Division: "Phoebe Buffay",
        NumberOfParts: "-",
        ProductionCapacity: "Masseuse",
      },
    ],
    selectedRows: [],
    checkboxes: true,
  },
};
