/* eslint-disable @typescript-eslint/no-empty-function */
//  *TODO : Disabled Eslint as it will be removed after functionality is added

import CtaButton from "~/components/Button/cta-button.vue";
import CommonDropdown from "~/components/Dropdown/single-dropdown/dropdown.vue";

export default {
  id: "SingleDrowdownWithButton",
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

const dropdownWithButtonTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CtaButton, CommonDropdown },
  template: `
      <div>
      <cta-button
          colorType="blue"
          buttonType="dropdown"
          :active="visible"
          :click-handler="buttonToggle"
      >Dropdown
      </cta-button>


      <common-dropdown
          :checkbox="checkbox"
          :visible="visible"
          :items="items"
          :click-handler="clickHandler"
          :set-result="setResult"
          :on-close="onClose">
      </common-dropdown>

      </div> `,
});

export const DropdownWithButton = dropdownWithButtonTemplate.bind({});
DropdownWithButton.args = {
  checkbox: false,
  visible: false,
  items: [
    { title: "option1", id: "1" },
    { title: "option2", id: "2" },
    { title: "option3", id: "3" },
    { title: "option4", id: "4" },
    { title: "option5", id: "5" },
  ],
  buttonToggle() {
    this.$parent.visible = !this.$parent.visible;
    this.visible = !this.visible;
  },
  clickHandler() {},
  setResult() {},
  onClose() {
    this.$parent.visible = false;
    this.visible = false;
  },
};
