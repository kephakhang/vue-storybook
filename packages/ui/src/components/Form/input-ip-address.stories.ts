import type { Meta, StoryObj } from "@storybook/vue";
import InputIpAddress from "./input-ip-address.vue";

type InputIpAddressInstance = InstanceType<typeof InputIpAddress>;
const meta: Meta<InputIpAddressInstance> = {
  title: "Components/Form/Input IP Address",
  component: InputIpAddress,
};

export default meta;
type Story = StoryObj<InputIpAddressInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { InputIpAddress },
      props: Object.keys(argTypes),
      template: String.raw`
      <input-ip-address
      :id="id"
      :set-result="setResult"
      :disabled="disabled"
      :initial-value="initialValue"
    ></input-ip-address>
      `,
    };
  },
  args: {
    styleProps: "",
    id: "input-id",
    disabled: false,
    initialValue: "",
    setResult: (id, value, error) => {
      console.log("setResult:", id, value, error);
    },
  },
};
