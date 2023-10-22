import CommonDropdown from "~/components/Dropdown/single-dropdown/dropdown.vue";

export default {
  title: "Components/dropdown",
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

const dropownStatesTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CommonDropdown },
  template: `
      <common-dropdown
          :visible="true"
          :checkbox="checkbox"
          :items="items"
          :click-handler="clickHandler"
          :set-result="setResult"
      ></common-dropdown>`,
});

export const DropdownStates = dropownStatesTemplate.bind({});
DropdownStates.args = {
  checkbox: false,
  visible: true,
  items: [
    { title: "option1", id: "1" },
    { title: "option2", id: "2" },
    { title: "option3", id: "3" },
    { title: "option4", id: "4" },
    { title: "option5", id: "5" },
  ],
  clickHandler(item) {
    console.log(item, ":clickHandler");
  },
  setResult(items) {
    console.log(items, ":setResult");
  },
};
