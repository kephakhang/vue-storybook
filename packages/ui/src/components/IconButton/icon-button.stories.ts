import type { Meta, StoryObj } from "@storybook/vue";
import IconButton from "~/components/IconButton/icon-button.vue";
import Tooltip from "~/components/Tooltip/tool-tip.vue";
// import assets to prevent break url in prod;
import CustomIcon from "~assets/images/icon/customization-icon.svg";

type IconButtonInstance = InstanceType<typeof IconButton>;

const meta: Meta<IconButtonInstance> = {
  title: "Components/Icon Button",
  component: IconButton,
  argTypes: {
    active: { control: "boolean" },
    disabled: { control: "boolean" },
    buttonType: {
      control: { type: "select" },
      options: [
        "filter",
        "kebab-menu",
        "edit",
        "trash",
        "check",
        "clone",
        "add",
        "download",
        "remove",
        "previous",
        "next",
        "arrow-backward-skinny",
        "arrow-forward-skinny",
        "arrow-backward",
        "arrow-forward",
        "bar-filter",
        "expand",
        "custom-button",
        "custom-colum",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<IconButtonInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Tooltip, IconButton },
      template: String.raw`
    <div style="display: flex; gap: 10px; padding: 30px">
    <tooltip>
    <template #context>
        <div>
            <icon-button
                :icon-url="iconUrl"
                :button-type="buttonType"
                :style-props="styleProps"
                :active="active"
                :disabled="disabled"
                :click-handler="clickHandler"></icon-button></div></template>
    <template #body><div><span >{{ title(buttonType) }}</span></div></template>
    
    </tooltip>
    </div>
  `,
      methods: {
        title() {
          switch (this.buttonType) {
            case "filter":
              return "Filter";
            case "kebab-menu":
              return "More";
            case "custom-colum":
              return "Custom Column";
            case "edit":
              return "Edit";
            case "trash":
              return "Delete";
            case "check":
              return "Confirm";
            case "clone":
              return "Duplicate";
            case "add":
              return "Add";
            case "download":
              return "Download Image";
            case "expand":
              return "Expand View";
            default:
              return "Tooltip Text ";
          }
        },
      },
    };
  },
  args: {
    iconUrl: "",
    buttonType: "filter",
    clickHandler: Function,
  },
};

export const Custom: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Tooltip, IconButton },
      template: String.raw`
      <div style="display: flex; gap: 10px; padding: 30px">
      <tooltip>
        <template #context><div>
            <icon-button
                buttonType="custom-button"
                :icon-url="iconUrl"
                :style-props="styleProps"
                :active="active"
                :disabled="disabled"
                 :click-handler="clickHandler"
                 :custom-type="customTypes">
                 </icon-button></div></template>
        <template #body><div><span>Custom Button</span></div></template>
      </tooltip>
      </div>`,
    };
  },
  args: {
    customTypes: true,
    iconUrl: CustomIcon,
    clickHandler: Function,
  },
};

export const IconButtonType: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Tooltip, IconButton },
      template: String.raw`
      <div style="display: flex; gap: 10px; padding: 15px">

      <tooltip>
        <template #context><div><icon-button buttonType="filter">filter</icon-button></div></template>
        <template #body><div><span>Filter</span></div></template>
      </tooltip>
      
      <tooltip>
        <template #context><div> <icon-button buttonType="kebab-menu">kebab-menu</icon-button></div></template>
        <template #body><div><span>More</span></div></template>
      </tooltip>
      
      <tooltip >
        <template #context><div>   <icon-button buttonType="download">download</icon-button></div></template>
        <template #body><div><span>Download Image</span></div></template>
      </tooltip>
      
      <tooltip>
        <template #context><div><icon-button buttonType="custom-colum">custom-colum</icon-button></div></template>
        <template #body><div><span>Customize Columns</span></div></template>
      </tooltip>

      <tooltip>
        <template #context><div> <icon-button buttonType="expand">expand</icon-button></div></template>
        <template #body><div><span>Expand View</span></div></template>
      </tooltip>
      
      <tooltip>
        <template #context><div>   <icon-button buttonType="edit">edit</icon-button></div></template>
        <template #body><div><span>Edit</span></div></template>
      </tooltip>
      
      <tooltip>
        <template #context><div><icon-button buttonType="trash">trash</icon-button></div></template>
        <template #body><div><span>Delete</span></div></template>
      
      </tooltip>
      
      <tooltip>
        <template #context><div>  <icon-button buttonType="check">check</icon-button></div></template>
        <template #body><div><span>Confirm</span></div></template>
      </tooltip>
      
      <tooltip>
        <template #context><div><icon-button buttonType="clone">clone</icon-button></div></template>
        <template #body><div><span>Duplicate</span></div></template>
      </tooltip>
      
      <icon-button buttonType="add">add</icon-button>
      <icon-button buttonType="remove">remove</icon-button>
      <icon-button buttonType="previous">previous</icon-button>
      <icon-button buttonType="next">next</icon-button>
      <icon-button buttonType="arrow-backward-skinny">arrow-backward-skinny</icon-button>
      <icon-button buttonType="arrow-forward-skinny">arrow-forward-skinny</icon-button>
      <icon-button buttonType="arrow-backward">arrow-backward</icon-button>
      <icon-button buttonType="arrow-forward"> arrow-forward</icon-button>
      <icon-button buttonType="bar-filter">bar-filter</icon-button>
      </div>`,
    };
  },
  args: {
    customTypes: true,
    iconUrl: CustomIcon,
    clickHandler: Function,
  },
};
