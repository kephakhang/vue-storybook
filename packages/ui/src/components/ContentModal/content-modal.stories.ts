import type { Meta, StoryObj } from "@storybook/vue";
import ContentModal from "./index.vue";
import Wrapper from "./wrapper.vue";

type ContentModalInstance = InstanceType<typeof ContentModal>;
const meta: Meta<ContentModalInstance> = {
  title: "Components/Content Modal",
  component: ContentModal,
};

export default meta;
type Story = StoryObj<ContentModalInstance>;

export const Default: Story = {
  render() {
    return {
      components: { Wrapper },
      template: String.raw`
        <div>
          <wrapper />
        </div>
      `,
    };
  },
};
