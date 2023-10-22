import type { Meta, StoryObj } from "@storybook/vue";
import DataTable from "./data-table.vue";

type DataTableInstance = InstanceType<typeof DataTable>;
const meta: Meta<DataTableInstance> = {
  title: "Components/DataTable v1",
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
        :style-props="styleProps"
        :bg-color="bgColor"
        :body-height="bodyHeight"
        :column-width-array="columnWidthArray"
      >
        <template #header>
          <tr>
            <th v-for="(item) in 5">th</th>
          </tr>
        </template>
        <template #body>
          <tr v-for="(item) in 10">
            <td v-for="(item) in 5">td</td>
          </tr>
        </template>
        <template #footer>
          <div style="width: 100%; height: 40px; padding-right: 20px; display: flex; justify-content: flex-end; align-items: center">
            <div>footer</div>
          </div>
        </template>
      </data-table> `,
    };
  },
  args: {
    columnWidthArray: ["20%", "20%", "20%", "20%", "20%"],
  },
};
