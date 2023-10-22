import type { Meta, StoryObj } from "@storybook/vue";
import CtaButton from "./cta-button.vue";
import "./styles.css";

type CtaButtonInstance = InstanceType<typeof CtaButton>;
const meta: Meta<CtaButtonInstance> = {
  title: "Components/Button",
  component: CtaButton,
  parameters: {
    componentSubtitle: "Cta(Call To Action) button component",
  },
  argTypes: {
    buttonType: {
      description: "**Deprecated**. Use `variant` instead.",
    },
    colorType: {
      control: "select",
      options: [
        "blue",
        "blue-fill",
        "red",
        "red-fill",
        "green",
        "green-fill",
        "white",
      ],
    },
    variant: {
      control: "select",
      options: [
        "custom",
        "dropdown",
        "date-picker",
        "upload",
        "export",
        "text",
        "text dropdown",
        "text hyperlink",
      ],
    },
    size: {
      control: "select",
      options: ["normal", "small", "large"],
    },
  },
  args: {
    active: false,
  },
};

export default meta;

type Story = StoryObj<CtaButtonInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { CtaButton },
      props: Object.keys(argTypes),
      template: String.raw`
        <cta-button v-bind="$props">default</cta-button>
      `,
    };
  },
};

export const Sizes: Story = {
  render() {
    return {
      components: { CtaButton },
      template: String.raw`
        <div class="button-size-row">
          <cta-button v-bind="$props" size="small">small</cta-button>
          <cta-button v-bind="$props">normal</cta-button>
          <cta-button v-bind="$props" size="large">large</cta-button>
        </div>
      `,
    };
  },
};

export const Variants: Story = {
  render() {
    return {
      components: { CtaButton },
      template: String.raw`
        <div class="button-size-row">
          <cta-button>default</cta-button>
          <cta-button variant="dropdown">dropdown</cta-button>
          <cta-button variant="date-picker">date-picker</cta-button>
          <cta-button variant="upload">upload</cta-button>
          <cta-button variant="export">export</cta-button>
          <cta-button variant="text">text</cta-button>
          <cta-button variant="text dropdown">text dropdown</cta-button>
          <cta-button variant="text hyperlink">text dropdown</cta-button>
        </div>
      `,
    };
  },
};

/**
 * @deprecated
 * Use to demonstarte the buttonType supportablitiy with lower version.
 */
export const ButtonType: Story = {
  render() {
    return {
      components: { CtaButton },
      template: String.raw`
        <div class="button-size-row">
          <cta-button>default</cta-button>
          <cta-button button-type="dropdown">dropdown</cta-button>
          <cta-button  button-type="date-picker">date-picker</cta-button>
          <cta-button  button-type="upload">upload</cta-button>
          <cta-button  button-type="export">export</cta-button>
          <cta-button  button-type="text">text</cta-button>
          <cta-button  button-type="text dropdown">text dropdown</cta-button>
          <cta-button  button-type="text hyperlink">text dropdown</cta-button>
        </div>
      `,
    };
  },
};

export const Colors: Story = {
  render() {
    return {
      components: { CtaButton },
      template: String.raw`
        <div class="button-size-row">
          <cta-button color-type="blue">blue</cta-button>
          <cta-button color-type="blue-fill">blue-fill</cta-button>
          <cta-button color-type="red">red</cta-button>
          <cta-button color-type="red-fill">red-fill</cta-button>
          <cta-button color-type="green">green</cta-button>
          <cta-button color-type="green-fill">green-fill</cta-button>
          <cta-button color-type="white">white</cta-button>
        </div>
      `,
    };
  },
};
