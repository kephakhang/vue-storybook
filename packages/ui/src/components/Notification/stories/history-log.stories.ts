import type { Meta, StoryObj } from "@storybook/vue";

import { getMockNotifications, sleep } from "./__test__/create_mocks";
import HistoryLog from "../components/notification-history-log.vue";

type HistoryLogInstance = InstanceType<typeof HistoryLog>;
const meta: Meta<HistoryLogInstance> = {
  title: "Components/Notification/History Log",
  component: HistoryLog,
};

export default meta;
type Story = StoryObj<HistoryLogInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { HistoryLog },
      props: Object.keys(argTypes),
      template: String.raw`
        <div style="height: 100vh; width: 100vw;">
          <HistoryLog v-bind="$props" />
        </div>
      `,
    };
  },
  args: {
    async getNotifications(args) {
      await sleep();
      return getMockNotifications(args);
    },
    async readNotificationById() {
      await sleep(200);
    },
  },
};
