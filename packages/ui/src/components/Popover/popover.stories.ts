import type { Meta, StoryObj } from "@storybook/vue";
import Popover from "./popover.vue";

type PopoverInstance = InstanceType<typeof Popover>;
const meta: Meta<PopoverInstance> = {
  title: "Components/Popover",
  component: Popover,
};
export default meta;
type Story = StoryObj<PopoverInstance>;
export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Popover },
      props: Object.keys(argTypes),
      template: String.raw`
      <popover :visible="visible" @close="clickHandler" >
        <div>
          <h1>this is popover</h1>
        </div>
      </popover>
      `,
    };
  },
  args: {
    visible: true,
    clickHandler() {
      console.log("Popover ClickHanlder Called");
    },
  },
};
