import type { Meta, StoryObj } from "@storybook/vue";
import DoubleDropdown from "~/components/Dropdown/double-dropdown/double-dropdown.vue";

type DoubleDropdownInstance = InstanceType<typeof DoubleDropdown>;
const meta: Meta<DoubleDropdownInstance> = {
  title: "Components/Dropdown Double",
  component: DoubleDropdown,
};

export default meta;
type Story = StoryObj<DoubleDropdownInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { DoubleDropdown },
      template: String.raw`
        <double-dropdown
          v-bind="$props"
        ></double-dropdown>
      `,
    };
  },
  args: {
    visible: true,
    position: {},
    items: [
      {
        id: "OP",
        title: "By OP",
        childrens: [
          { title: "All", code: "ALL" },
          { title: "Active", code: "WORKING" },
          { title: "Idle", code: "IDLE" },
          { title: "Inactive", code: "NOT_WORKING" },
          { title: "Disconnected", code: "DISCONNECTED" },
        ],
      },
      {
        id: "status",
        title: "By Status",
        childrens: [
          { title: "All", code: "ALL" },
          { code: "DISCARDED", title: "Discarded" },
          { code: "INSTALLED", title: "Installed" },
          { code: "FAILURE", title: "Failure" },
          { code: "AVAILABLE", title: "Available" },
          { code: "DETACHED", title: "Detached" },
          { code: "FAILURE", title: "Failure" },
          { code: "AVAILABLE", title: "Available" },
          { code: "DETACHED", title: "Detached" },
        ],
      },
    ],
    styleProps: "position: static; width: 442px;",
    resetHandler(item) {
      console.log(item);
    },
    applyHandler(items) {
      console.log(items);
    },
    onClose() {
      console.log("🚀 ~ file: double-dropdown.stories.ts:70 ~ onClose");
    },
  },
};
