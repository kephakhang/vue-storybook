import type { Meta, StoryObj } from "@storybook/vue";
import TextBox from "./input-text.vue";

type TextBoxInstance = InstanceType<typeof TextBox>;
const meta: Meta<TextBoxInstance> = {
  title: "Components/Form/Input Text",
  component: TextBox,
};

export default meta;
type Story = StoryObj<TextBoxInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { TextBox },
      props: Object.keys(argTypes),
      template: String.raw`
      <div style="padding: 20px;">
        <TextBox v-bind="$props">
        </TextBox>
      </div>
      `,
    };
  },
  args: {
    id: "InputText",
    getValue(value, id) {
      console.log(value, id);
    },
  },
};
