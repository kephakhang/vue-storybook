import type { Meta, StoryObj } from "@storybook/vue";
import SearchBar from "./search-bar.vue";

type SearchBarInstance = InstanceType<typeof SearchBar>;
const meta: Meta<SearchBarInstance> = {
  title: "Components/Search Bar",
  component: SearchBar,
};

export default meta;
type Story = StoryObj<SearchBarInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { SearchBar },
      template: String.raw`<SearchBar v-bind="$props"></SearchBar>`,
    };
  },
  args: {
    styleProps: "width: 201px",
    placeholderText: "placeholder-text",
  },
};

export const SearchBarList: Story = {
  render(_, { argTypes }) {
    return {
      components: { SearchBar },
      props: Object.keys(argTypes),
      template: String.raw`
            <div style="display: flex; gap: 10px;">
  <SearchBar
    :placeholder-text="placeholderText"
    :search-list="searchList"
    ></SearchBar>
  <SearchBar
             :placeholder-text="placeholderText"
             :focus-position="1"
             :search-list="searchList"></SearchBar>
</div>`,
    };
  },
  args: {
    placeholderText: "placeholder-text",
    searchList: [
      { name: "aaa", key: "aaa" },
      { name: "aaa", key: "aaa" },
    ],
  },
};
