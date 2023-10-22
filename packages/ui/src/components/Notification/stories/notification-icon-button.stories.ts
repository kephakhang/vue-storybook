import type { Meta, StoryObj } from "@storybook/vue";
import {
  getMockNotifications,
  readMockNotificationById,
  readMockNotifications,
  sleep,
} from "./__test__/create_mocks";
import {
  NotificationRoot,
  NotificationDrawer,
  NotificationIconButton,
} from "..";
import type { NotificationContent } from "~/types/Notification";

type NotificationInstance = InstanceType<typeof NotificationRoot>;

const meta: Meta<NotificationInstance> = {
  title: "Components/Notification/Icon Button",
  component: NotificationRoot,
};

export default meta;
type Story = StoryObj<NotificationInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: {
        NotificationRoot,
        NotificationIconButton,
        NotificationDrawer,
      },
      props: Object.keys(argTypes),
      data() {
        return {
          count: 20000,
          newNotification: undefined as NotificationContent | undefined,
        };
      },
      methods: {
        addNotification() {
          this.newNotification = {
            id: this.count++,
            content: "This is a new notification",
            notiCode: "",
            notiCategory: "ALERT",
            notiStatus: "UNREAD",
            sentDateTime: new Date().toISOString(),
            senderId: 1,
            senderName: "System",
          } as NotificationContent;
        },
      },
      template: String.raw`
        <div>
          <button 
            style="
              background-color: #62B0D9;
              color: white; 
              padding: 8px;
              border-radius: 5px;
              border: none;
            " 
            @click="addNotification"
          >
            Add a new notification
          </button>
          <div style="height: 12px"></div>
          <div style="width: fit-content">
            <NotificationRoot
              v-bind="$props"
              :added-notification="newNotification"
            >
              <template #trigger>
                <NotificationIconButton />
              </template>
              <NotificationDrawer />
            </NotificationRoot>
          </div>
        </div>
      `,
    };
  },
  args: {
    isAdminUser: true,
    async setNotification() {
      await sleep();
    },
    async getNotifications(args) {
      await sleep();
      return getMockNotifications(args);
    },
    async readNotificationById(id) {
      await sleep(200);
      return readMockNotificationById(id);
    },
    async readNotifications(category) {
      await sleep(200);
      return readMockNotifications(category);
    },
  },
};
