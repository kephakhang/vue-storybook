import type { Meta, StoryObj } from "@storybook/vue3";
import ColorPallete from "../components/ColorPallete.vue";

const meta: Meta<typeof ColorPallete> = {
  component: ColorPallete,
};

export default meta;

type Story = StoryObj<typeof ColorPallete>;

export const Default: Story = {
  render: (args) => ({
    components: { ColorPallete },
    setup: () => ({ args }),
    template: String.raw`
      <ColorPallete />
    `,
  }),
};
