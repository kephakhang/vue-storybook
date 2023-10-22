import type { Meta, StoryObj } from "@storybook/vue";
import TableInput from "./table-input.vue";

type TableInputInstance = InstanceType<typeof TableInput>;

const meta: Meta<TableInputInstance> = {
  title: "Components/Table Input",
  component: TableInput,
  parameters: {
    componentSubtitle: "TableInput",
  },
  argTypes: {
    textPosition: {
      control: { type: "radio" },
      options: ["left", "center", "right"],
    },
    numberFormatting: {
      control: { type: "boolean" },
      type: "boolean",
      description: `If ***true***, only **number** can be put as the input value,
        and commas are printed in thousand units.
      `,
    },
    changeHandler: {
      action: "changeHandler",
      description: `This is a callback function that is called when the input value is changed.
        The input value is passed as a parameter.  
        If \`numberFormatting\` is ***true***, the parameter \`value\` is **number** type.  
      `,
    },
  },
};

export default meta;

type Story = StoryObj<TableInputInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { TableInput },
      props: Object.keys(argTypes),
      template: String.raw`
        <table style="width: 200px; border: 1px solid #cccccc; border-collapse: collapse">
          <thead>
            <tr>
              <th style="padding: 8px; border: 1px solid #cccccc;">
                Table Input Component
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid #cccccc;">
                <table-input v-bind="$props" />
              </td>
            </tr>
          </tbody>
        </table>
      `,
    };
  },
  args: {
    id: "table-input-id",
    styleProps: "",
    textPosition: "left",
    value: "value",
    numberFormatting: false,
    changeHandler(value, id, isChanged) {
      console.log("value: ", value);
      console.log("id: ", id);
      console.log("isChanged: ", isChanged);
    },
  },
};
