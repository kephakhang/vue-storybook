import type { Meta, StoryObj } from "@storybook/vue";
import DataTable from "~/components/DataTableV3/data-table.vue";

type DataTableInstance = InstanceType<typeof DataTable>;

const meta: Meta<DataTableInstance> = {
  title: "Components/DataTable v3",
  component: DataTable,
};

export default meta;

type Story = StoryObj<DataTableInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { DataTable },
      template: String.raw`
        <data-table v-bind="$props">
          <template #colgroup>
            <col v-for="width in ['33%', '33%', '33%']" :style="{ width: width }" />
          </template>
          <template #thead>
            <tr>
              <th v-for="index in 3">th</th>
            </tr>
          </template>
          <template #tbody>
            <tr v-for="index in 10">
              <td v-for="index in 3">td</td>
            </tr>
          </template>
        </data-table>
      `,
    };
  },
  args: {
    scrollable: false,
  },
};

export const Scrollable: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { DataTable },
      template: String.raw`
        <div style="width: 100%; height: 300px;">
          <data-table v-bind="$props">
            <template #colgroup>
              <col v-for="width in ['33%', '33%', '33%']" :style="{ width: width }" />
            </template>
            <template #thead>
              <tr>
                <th v-for="index in 3">th</th>
              </tr>
            </template>
            <template #tbody>
              <tr v-for="index in 10">
                <td v-for="index in 3">td</td>
              </tr>
            </template>
          </data-table>
        </div>
      `,
    };
  },
  args: {
    scrollable: true,
  },
};
