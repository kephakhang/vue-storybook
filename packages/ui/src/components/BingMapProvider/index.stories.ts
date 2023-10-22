import type { Meta, StoryObj } from "@storybook/vue";
import BingMapProvider from "./index.vue";
import BingMap from "../BingMap/index.vue";

type BingMapProviderInstance = InstanceType<typeof BingMapProvider>;
const meta: Meta<BingMapProviderInstance> = {
  title: "Components/BingMapProvder",
  component: BingMapProvider,
  decorators: [
    () => ({
      template: "<div style='width: 600px; height: 300px;'><story /></div>",
    }),
  ],
};

export default meta;

type Story = StoryObj<BingMapProviderInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { BingMapProvider, BingMap },
      props: Object.keys(argTypes),
      template: String.raw`
        <BingMapProvider v-bind="$props"><BingMap /><BingMap /></BingMapProvider>
      `,
    };
  },
};
