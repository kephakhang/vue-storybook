import type { Meta, StoryObj } from "@storybook/vue";
import InputNumber from "./input-number.vue";

type InputNumberInstance = InstanceType<typeof InputNumber>;
const meta: Meta<InputNumberInstance> = {
  title: "Components/Form/Input Number",
  component: InputNumber,
};

export default meta;
type Story = StoryObj<InputNumberInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { InputNumber },
      props: Object.keys(argTypes),
      template: String.raw`
      <div style="padding: 20px;">
        <InputNumber
          :style-props="styleProps"
          :placeholder-text="placeholderText"
          :active="active"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :error="error"
          :min="min"
          :max="max"
          :step="step"
          :id="id"
          :checkmark="checkmark"
          :error-message="errorMessage"
          :icon-url="iconUrl">
        </InputNumber>
      </div>
      `,
    };
  },
  args: {
    id: "InputNumber",
    checkmark: "outside",
    placeholderText: "Enter number",
  },
};
