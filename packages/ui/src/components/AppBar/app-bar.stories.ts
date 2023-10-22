import type { Meta, StoryObj } from "@storybook/vue";
import AppBar from "./app-bar.vue";

type AppBarInstance = InstanceType<typeof AppBar>;
const meta: Meta<AppBarInstance> = {
  title: "Components/AppBar",
  component: AppBar,
};

export default meta;

type Story = StoryObj<AppBarInstance>;
export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { AppBar },
      props: Object.keys(argTypes),
      template: String.raw`
        <AppBar v-bind="$props" /> 
      `,
    };
  },
  args: {
    userType: "OEM",
    companyLogoUrl:
      "http://dev.emoldino.com/images/common/logo/emoldino-logo.svg",
    menuList: [
      {
        title: "General",
        url: "/general",
        active: true,
      },
      {
        title: "Asset",
        url: "/asset",
        active: false,
      },
      {
        title: "Supply Chain",
        url: "/supply-chain",
        active: false,
      },
    ],
    subMenuList: [
      {
        imageUrl: "http://dev.emoldino.com/images/icon/communications_icon.svg",
        url: "/",
      },
    ],
  },
};
