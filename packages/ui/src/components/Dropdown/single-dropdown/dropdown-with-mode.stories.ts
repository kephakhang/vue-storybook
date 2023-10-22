import type { Meta, StoryObj } from "@storybook/vue";
import CommonDropdown from "~/components/Dropdown/single-dropdown/dropdown.vue";
import CtaButton from "~/components/Button/cta-button.vue";

type DropdownInstance = InstanceType<typeof CommonDropdown>;
const meta: Meta<DropdownInstance> = {
  title: "Components/Dropdown",
  component: CommonDropdown,
  argTypes: {
    checkbox: {
      control: { type: "boolean" },
    },
    visible: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<DropdownInstance>;

export const DropdownWithMode: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { CommonDropdown, CtaButton },
      template: String.raw`
        <common-dropdown
          :visible="true"
          :checkbox="checkbox"
          :items="items"
          :set-result="setResult"
          :has-apply-button="hasApplyButton"
          :fetch-handler="fetchHandler"
          :has-mode="hasMode"
          :has-search-bar="hasSearchBar"
          :has-all-selectors="hasAllSelectors"
          :mode="mode"
          :id-list="idList"
          :apply-handler="applyHandler"
        ></common-dropdown>
      `,
    };
  },
  args: {
    mode: "SELECTED",
    checkbox: true,
    visible: true,
    hasApplyButton: true,
    hasMode: true,
    hasSearchBar: true,
    hasAllSelectors: true,
    items: [
      { title: "option1", id: 1561 },
      { title: "option2", id: 2455 },
      { title: "option3", id: 3897 },
      { title: "option4", id: 4121 },
      { title: "option5", id: 5535 },
    ],
    idList: [2455, 5535],
    applyHandler(ids, mode) {
      console.log(ids, mode, ":applyHandler");
    },
    setResult(items) {
      console.log(items, ":setResult");
    },
    async fetchHandler(page, size, query) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${size}&search=${query}`
      );
      return {
        content: await res.json(),
        last: false,
      };
    },
  },
};
