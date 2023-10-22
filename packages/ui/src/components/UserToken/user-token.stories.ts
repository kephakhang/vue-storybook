import type { Meta, StoryObj } from "@storybook/vue";
import UserToken from "./user-token.vue";

type UserTokenInstance = InstanceType<typeof UserToken>;

const meta: Meta<UserTokenInstance> = {
  title: "Components/User Token",
  component: UserToken,
};
export default meta;

export const Default: StoryObj<UserTokenInstance> = {
  render(_, { argTypes }) {
    return {
      components: { UserToken },
      props: Object.keys(argTypes),
      setup() {},
      template: String.raw`
        <UserToken v-bind="$props"></UserToken>
      `,
    };
  },
  args: {
    userId: 1,
    userName: "User Name",
    companyName: "eMoldino",
    department: "Solution Team",
    position: "Frond-End Developer",
    email: "user@emoldino.com",
    phoneNumber: "010-1111-1111",
  },
};
