import type { Meta, StoryObj } from "@storybook/vue3";
import CtaButton from "../components/CtaButton.vue";

const meta: Meta<typeof CtaButton> = {
  component: CtaButton,
};

export default meta;

type Story = StoryObj<typeof CtaButton>;

export const FillButton: Story = {
  render: (args) => ({
    components: { CtaButton },
    setup: () => ({ args }),
    template: String.raw`
      <CtaButton v-bind="args">
        Click me
      </CtaButton>
    `,
  }),
  args: {
    variant: "fill",
  },
};

export const OutlineButton: Story = {
  ...FillButton,
  args: {
    variant: "outline",
  },
};

export const TextButton: Story = {
  ...FillButton,
  args: {
    variant: "text",
  },
};
