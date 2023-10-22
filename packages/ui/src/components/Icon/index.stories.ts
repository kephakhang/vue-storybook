import type { Meta, StoryObj } from "@storybook/vue";
import Icon from "./icon.vue";
import Tooltip from "../Tooltip/tool-tip.vue";

type IconInstance = InstanceType<typeof Icon>;

const meta: Meta<IconInstance> = {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    buttonType: {
      control: { type: "select" },
      options: [
        "cross-icon",
        "sort-asce",
        "sort-desc",
        "restore-icon",
        "kebab-menu",
        "information-icon",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<IconInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Tooltip, Icon },
      template: String.raw`
        <div>
          <tooltip>
            <template #context>
              <icon v-bind="$props"></icon>
            </template>
            <template #body>
              {{ title(buttonType) }}
            </template>
          </tooltip>
        </div>
      `,
      methods: {
        title(buttonType: string): string {
          switch (buttonType) {
            case "cross-icon":
              return "Clear All Filters";
            case "sort-asce":
              return "sort-up";
            case "sort-desc":
              return "sort-down";
            case "restore-icon":
              return "undo";
            case "kebab-menu":
              return "More";
            case "information-icon":
              return "Information Icon";
            default:
              return "";
          }
        },
      },
    };
  },
  args: {
    buttonType: "cross-icon",
    styleProps: "width:24px;height:24px",
    clickHandler() {
      console.log("clicked");
    },
  },
};
