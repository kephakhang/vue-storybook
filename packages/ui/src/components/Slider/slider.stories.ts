import type { Meta, StoryObj } from "@storybook/vue";
import Images from "~/components/Slider/main.vue";

type ImagesInstance = InstanceType<typeof Images>;

const meta: Meta<ImagesInstance> = {
  title: "Components/Slider",
  component: Images,
  parameters: {
    componentSubtitle: "Image slider component",
  },
  argTypes: {
    src: { type: "string" },
    allSlides: { type: "Array" },
    numberOfSlides: { type: "number" },
    showSlider: { type: "boolean" },
    showImageViewer: { type: "boolean" },
  },
};

export default meta;
type Story = StoryObj<ImagesInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Images },
      template: String.raw`<Images :src="src" :numberOfSlides="numberOfSlides"  :style-props="styleProps" :show-slider="showSlider" :show-image-viewer="showImageViewer" :all-slides="allSlides" :click-handler="clickHandler"></Images>`,
    };
  },
  args: {
    src: "",
    allSlides: [
      "Slide 1",
      "Slide 2",
      "Slide 3",
      "Slide 4",
      "Slide 6",
      "",
      "",
      "",
    ],
    numberOfSlides: 4,
    styleProps: "width: 331px; height: 230px",
    showSlider: true,
    showImageViewer: true,
    clickHandler: Function,
  },
};

export const Image: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Images },
      template: String.raw`<Images :src="src" :numberOfSlides="numberOfSlides"  :style-props="styleProps" :show-slider="showSlider" :show-image-viewer="showImageViewer" :all-slides="allSlides" :click-handler="clickHandler"></Images>`,
    };
  },
  args: {
    src: "",
    allSlides: [
      "Slide 1",
      "Slide 2",
      "Slide 3",
      "Slide 4",
      "Slide 6",
      "",
      "",
      "",
    ],
    numberOfSlides: 4,
    styleProps: "width: 331px; height: 230px",
    showSlider: false,
    showImageViewer: true,
    clickHandler: Function,
  },
};

export const Slider: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Images },
      template: `<Images :src="src" :numberOfSlides="numberOfSlides"  :style-props="styleProps" :show-slider="showSlider" :show-image-viewer="showImageViewer" :all-slides="allSlides" :click-handler="clickHandler"></Images>`,
    };
  },
  args: {
    src: "",
    allSlides: ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 6"],
    numberOfSlides: 4,
    styleProps: "width: 331px; height: 230px",
    showSlider: true,
    showImageViewer: false,
    clickHandler: Function,
  },
};
