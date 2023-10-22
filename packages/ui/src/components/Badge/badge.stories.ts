import type { Meta, StoryObj } from "@storybook/vue";
import Badge from "./badge.vue";
import CtaButton from "~/components/Button/cta-button.vue";

type BadgeInstance = InstanceType<typeof Badge>;
const meta: Meta<BadgeInstance> = {
  title: "Components/Badge",
  component: Badge,
};
export default meta;

type Story = StoryObj<BadgeInstance>;
export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Badge, CtaButton },
      props: Object.keys(argTypes),
      template: String.raw`
        <Badge v-bind="$props"> 
          <CtaButton>Button</CtaButton>
        </Badge>
      `,
    };
  },
};

export const WithText: Story = {
  render: Default.render,
  args: {
    text: "99+",
  },
};
