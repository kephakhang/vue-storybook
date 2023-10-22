import type { Meta, StoryObj } from "@storybook/vue";
import GoogleMapProvider from "./index.vue";
import GoogleMap from "../GoogleMap/index.vue";

type GoogleMapProviderInstance = InstanceType<typeof GoogleMapProvider>;
const meta: Meta<GoogleMapProviderInstance> = {
  title: "Components/GoogleMapProvder",
  component: GoogleMapProvider,
  decorators: [
    () => ({
      template: "<div style='width: 600px; height: 300px;'><story /></div>",
    }),
  ],
};

export default meta;

type Story = StoryObj<GoogleMapProviderInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { GoogleMapProvider, GoogleMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <GoogleMapProvider v-bind="$props"><GoogleMap /><GoogleMap /></GoogleMapProvider>
      `,
    };
  },
};
