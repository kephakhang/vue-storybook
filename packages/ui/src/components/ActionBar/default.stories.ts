import type { Meta, StoryObj } from "@storybook/vue";
import TableActionbarButton from "./table-actionbar-button.vue";

type ActionBarInstance = InstanceType<typeof TableActionbarButton>;

/** import assets to prevent break url in prod */
import CustomIcon from "~assets/images/icon/customization-icon.svg";

const meta: Meta<ActionBarInstance> = {
  title: "Components/Actionbar Button",
  component: TableActionbarButton,
};

export default meta;
type Story = StoryObj<ActionBarInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TableActionbarButton },
      template: String.raw`
   <table-actionbar-button
         :label="label"
         :icon-type="iconType"
         :active="active"
         :disabled="disabled"
         :size="size"
         :img-src="imgSrc"
    ></table-actionbar-button>
  `,
    };
  },
  args: {
    label: "",
    iconType: "change-state",
  },
};

/**  Button Types. */
export const ButtonTypes: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TableActionbarButton },
      template: String.raw`
   <div style="display: grid; gap: 10px;">
        <table-actionbar-button icon-type="change-state"></table-actionbar-button>
        <table-actionbar-button icon-type="disable"></table-actionbar-button>
        <table-actionbar-button icon-type="note"></table-actionbar-button>
        <table-actionbar-button icon-type="edit"></table-actionbar-button>
        <table-actionbar-button icon-type="enable"></table-actionbar-button>
        <table-actionbar-button icon-type="export"></table-actionbar-button>
        <table-actionbar-button icon-type="view"></table-actionbar-button>
        <table-actionbar-button icon-type="reset"></table-actionbar-button>
        <table-actionbar-button icon-type="register"></table-actionbar-button>
        <table-actionbar-button icon-type="view-edit-history"></table-actionbar-button>
        <table-actionbar-button icon-type="shift-config"></table-actionbar-button>
        <table-actionbar-button icon-type="role-user-config"></table-actionbar-button>
        <table-actionbar-button icon-type="role-permission-config"></table-actionbar-button>
        <table-actionbar-button icon-type="remove-from-product"></table-actionbar-button>
</div>
  `,
    };
  },
  args: {
    ...Default.args,
  },
};

/**  Button Size */
export const ButtonSize: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { TableActionbarButton },
      template: String.raw`
        <div style="display: flex; gap: 10px;">
             <table-actionbar-button icon-type="change-state"></table-actionbar-button>
             <table-actionbar-button size="small" icon-type="change-state"></table-actionbar-button>
        </div>
  `,
    };
  },
  args: {
    ...Default.args,
  },
};

/**   Custom Button  */
export const CustomButton: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    label: "Custom Icon",
    /**  Types of button   */
    iconType: "custom-icon",

    /**  Custom Button Icon  */
    imgSrc: CustomIcon,
  },
};
