import type { Meta, StoryObj } from "@storybook/vue";
import Snackbar from "./snackbar.vue";

type SnackbarInstance = InstanceType<typeof Snackbar>;
const meta: Meta<SnackbarInstance> = {
  title: "Components/Snackbar",
  component: Snackbar,
};

export default meta;
type Story = StoryObj<SnackbarInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Snackbar },
      props: Object.keys(argTypes),
      template: String.raw`
        <Snackbar 
        :snack-bar-title="snackBarTitle" 
        :snack-bar-message="snackBarMessage">
        </Snackbar>
      `,
    };
  },
  args: {
    snackBarTitle: "Success!",
    snackBarMessage: "Your data has been saved succesfully.",
  },
};
