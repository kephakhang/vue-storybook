import type { Meta, StoryObj } from "@storybook/vue";
import ListGroup from "~/components/ListGroup/list-group.vue";

type ListGroupInstance = InstanceType<typeof ListGroup>;

const DemoItems = [
  {
    id: "1",
    name: "item 1",
    enable: false,
  },
  {
    name: "item 2",
    id: "2",
    enable: false,
  },
  {
    name: "item 3",
    id: "3",
    enable: false,
  },
];

const meta: Meta<ListGroupInstance> = {
  title: "Components/List Group",
  component: ListGroup,
};

export default meta;

type Story = StoryObj<ListGroupInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { ListGroup },
      template: String.raw`
    <list-group
        :style-props="styleProps"
        :list="list"
        :item-id="itemId"
        :set-result="setResult"
        :is-selected="isSelected"
        ></list-group>`,
    };
  },
  args: {
    styleProps: "width:500px;",
    list: DemoItems,
    itemId: false,
    isSelected: false,
    setResult() {
      // console.log("Item : "+item);
    },
  },
};

export const AvailableList: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { ListGroup },
      template: String.raw`
      <list-group
      :style-props="styleProps"
      :list="list"
      :item-id="itemId"
      :set-result="setResult"
      :is-selected="isSelected"
      ></list-group>`,
    };
  },
  args: {
    styleProps: "width:500px;",
    list: DemoItems,
    itemId: false,
    isSelected: false,
    setResult() {
      // console.log("Item : "+item);
    },
  },
};

export const SelectedList: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { ListGroup },
      template: String.raw`
      <list-group
        :style-props="styleProps"
        :list="list"
        :item-id="itemId"
        :set-result="setResult"
        :is-selected="isSelected"
        ></list-group>`,
    };
  },
  args: {
    styleProps: "width:500px;",
    list: DemoItems,
    itemId: false,
    isSelected: true,
    setResult() {
      // console.log("Item : "+item);
    },
  },
};
