import type { Meta, StoryObj } from "@storybook/vue";
import CheckboxButton from "./checkbox-button.vue";

type CheckBoxInstance = InstanceType<typeof CheckboxButton>;
const meta: Meta<CheckBoxInstance> = {
  title: "Components/Checkbox",
  component: CheckboxButton,
};

export default meta;

type Story = StoryObj<CheckBoxInstance>;

export const Checkbox: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { CheckboxButton },
      template: String.raw`
    <CheckboxButton
        v-bind="$props"
    ></CheckboxButton>`,
    };
  },
  args: {
    buttonType: "checkbox",
    size: "large",
    clickHandler() {
      console.log("clicked.");
    },
  },
};

export const RadioButton: Story = {
  render: Checkbox.render,
  args: {
    ...Checkbox.args,
    buttonType: "radio_button",
  },
};

export const Checklist: Story = {
  render: Checkbox.render,
  args: {
    ...Checkbox.args,
    buttonType: "check_list",
  },
};
