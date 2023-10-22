import type { Meta, StoryObj } from "@storybook/vue";
import { Portal, CtaButton } from "~/index";

type PortalInstance = InstanceType<typeof Portal>;

const meta: Meta<PortalInstance> = {
  title: "Components/Portal",
  component: Portal,
};

export default meta;
type Story = StoryObj<PortalInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: {
        Portal,
        CtaButton,
      },
      props: Object.keys(argTypes),
      data() {
        return {
          isShown: false,
        };
      },
      methods: {
        toggleShow() {
          this.isShown = !this.isShown;
        },
      },
      template: String.raw`
        <div>
          <cta-button :click-handler="toggleShow">click to show portal</cta-button>
          <portal :open="isShown">
            <div
              style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #ccc;
                padding: 20px;
              "
            >
              contents
            </div>
          </portal>
        </div>
      `,
    };
  },
};
