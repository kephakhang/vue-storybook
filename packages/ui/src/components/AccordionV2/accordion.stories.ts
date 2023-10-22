import type { Meta, StoryObj } from "@storybook/vue";

import AccordionContent from "./accordion-content.vue";
import AccordionItem from "./accordion-item.vue";
import AccordionRoot from "./accordion-root.vue";
import AccordionTrigger from "./accordion-trigger.vue";

type AccordionRootInstance = InstanceType<typeof AccordionRoot>;
const meta: Meta<AccordionRootInstance> = {
  title: "Components/AccordionV2",
  component: AccordionRoot,
};

export default meta;

const innerTemplate = String.raw`
  <AccordionItem value="item1">
    <AccordionTrigger v-slot="{ isSelected }">
      Trigger 1 {{ isSelected }}
    </AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item2">
    <AccordionTrigger>Trigger 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item3">
    <AccordionTrigger>Trigger 3</AccordionTrigger>
    <AccordionContent>Content 3</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item4">
    <AccordionTrigger>Trigger 4</AccordionTrigger>
    <AccordionContent>Content 4</AccordionContent>
  </AccordionItem>
`;

type Story = StoryObj<AccordionRootInstance>;

export const Single: Story = {
  render(_, { argTypes }) {
    return {
      components: {
        AccordionContent,
        AccordionItem,
        AccordionRoot,
        AccordionTrigger,
      },
      props: Object.keys(argTypes),
      template: String.raw`
        <AccordionRoot type="single" :default-value="defaultValue">
          ${innerTemplate}
        </AccordionRoot>
      `,
    };
  },
  args: {
    defaultValue: "item1",
  },
};

export const Multiple: Story = {
  render(_, { argTypes }) {
    return {
      components: {
        AccordionContent,
        AccordionItem,
        AccordionRoot,
        AccordionTrigger,
      },
      props: Object.keys(argTypes),
      template: String.raw`
        <AccordionRoot type="multiple" :default-value="defaultValue">
          ${innerTemplate}
        </AccordionRoot>
      `,
    };
  },
  args: {
    defaultValue: ["item1", "item2", "item3"],
  },
};
