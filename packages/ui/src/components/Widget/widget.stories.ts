import type { Meta, StoryObj } from "@storybook/vue";
import Widget from "~/components/Widget/widget.vue";
import SearchBar from "~/components/SearchBar/search-bar.vue";
import Tooltip from "~/components/Tooltip/tool-tip.vue";

type WidgetInstance = InstanceType<typeof Widget>;
type Story = StoryObj<WidgetInstance>;

const meta: Meta<WidgetInstance> = {
  title: "Components/Widget",
  component: Widget,
};

export default meta;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Widget, SearchBar, Tooltip },
      props: Object.keys(argTypes),
      template: String.raw`
        <widget v-bind="$props">
          <template #tooltip>
            icon
          </template>
          <template #header>
            <span>header</span>
          </template>
          <template #body>
            <div style="width: 100%; height: 100%; padding: 8px">body</div>
          </template>
          <template #footer>
            <div style="width: 100%; height: 100%; padding: 8px">footer</div>
          </template>
        </widget>
      `,
    };
  },
  args: {
    styleProps: "width: 276px; height: 229px;",
    headerText: "Widget",
  },
};
