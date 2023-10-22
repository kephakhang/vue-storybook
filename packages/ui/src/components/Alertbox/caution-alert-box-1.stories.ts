import type { Meta, StoryObj } from "@storybook/vue";
import alertBox from "./alert-box.vue";
import CtaButton from "../Button/cta-button.vue";
type AlertBoxInstance = InstanceType<typeof alertBox>;
const meta: Meta<AlertBoxInstance> = {
  title: "Components/AlertBox",
  component: alertBox,
};

export default meta;
type Story = StoryObj<AlertBoxInstance>;

export const CautionAlertBox1: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { alertBox, CtaButton },
      template: String.raw`
        <alert-box
          v-bind="$props"
          >
        <template #messagebody><span>Deleted items can still be accessed and restored within the 'Deleted' tab.</span></template>
        <template #successbutton><CtaButton color-type="red-fill">Yes, Move to Deleted</CtaButton></template>
        <template #rejectbutton><CtaButton color-type="white">No, Don't Delete</CtaButton></template>
        <template #body><div><span>Hello</span></div></template>
        </alert-box>`,
    };
  },
  args: {
    styleProps: "",
    checkbox: true,
    showCloseButton: false,
    titleIconUrl: "warning",
    title: "Delete 3 Items From Tooling?",
    showAlertBox: true,
    onClose() {
      /**
       * update showAlertBox to false
       */
    },
    checkBoxHandler() {
      /**
       * do something
       */
    },
  },
};

export const CautionAlertBox2: Story = {
  render: CautionAlertBox1.render,
  args: {
    ...CautionAlertBox1.args,
    titleIconUrl: "warning",
    title: "Change of Reject Rate Input Frequency",
  },
};

export const InformationAlertBox: Story = {
  render: CautionAlertBox1.render,
  args: {
    ...CautionAlertBox1.args,
    showCloseButton: true,
    titleIconUrl: "info",
    title: "Your data has been saved.",
  },
};
