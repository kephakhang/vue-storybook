import type { Meta, StoryObj } from "@storybook/vue";
import Textarea from "./text-area.vue";

type TextareaInstance = InstanceType<typeof Textarea>;
const meta: Meta<TextareaInstance> = {
  title: "Components/Form/Textarea",
  component: Textarea,
};

export default meta;
type Story = StoryObj<TextareaInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Textarea },
      props: Object.keys(argTypes),
      template: String.raw`
        <Textarea v-bind="$props"></Textarea>
      `,
    };
  },
  args: {
    id: "textarea",
    placeholder: "Textarea",
    getValue: (value, id) => {
      console.log(value, id);
    },
  },
};

export const Disabled: Story = {
  render(_, { argTypes }) {
    return {
      components: { Textarea },
      props: Object.keys(argTypes),
      template: String.raw`
        <Textarea v-bind="$props"></Textarea>
      `,
    };
  },
  args: {
    initialValue: "Disabled Textarea",
    disabled: true,
  },
};

export const Error: Story = {
  render(_, { argTypes }) {
    return {
      components: { Textarea },
      props: Object.keys(argTypes),
      template: String.raw`
        <Textarea v-bind="$props"></Textarea>
      `,
    };
  },
  args: {
    initialValue: "Error State Textarea",
    error: true,
    errorMessage: "Error Message",
  },
};
