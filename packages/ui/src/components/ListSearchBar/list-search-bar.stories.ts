import type { Meta, StoryObj } from "@storybook/vue";
import ListSearchBar from "./list-search-bar.vue";
type ListSearchBarInstance = InstanceType<typeof ListSearchBar>;
type ListItemType = {
  title: string;
  id: string;
  active: boolean;
  isLow: boolean;
};
const meta: Meta<ListSearchBarInstance> = {
  title: "Components/List Search Bar",
  component: ListSearchBar,
};

export default meta;
type Story = StoryObj<ListSearchBarInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { ListSearchBar },
      template: String.raw`
    <list-search-bar
      :items="items"
      :click-handler="clickHandler"
      :search-handler="searchHandler"
    ></list-search-bar>
  `,
    };
  },
  args: {
    items: [
      {
        title: "option1",
        id: "1",
        active: true,
        isLow: true,
      },
      { title: "option2", id: "2", active: false, isLow: false },
      { title: "option3", id: "3", active: false, isLow: false },
      { title: "option4", id: "4", active: false, isLow: false },
      { title: "option5", id: "5", active: false, isLow: false },
    ],
    clickHandler(item: ListItemType) {
      console.log(item);
    },
    searchHandler(value: string) {
      console.log(value);
      return value;
    },
  },
};
