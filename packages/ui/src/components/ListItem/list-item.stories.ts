import type { Meta, StoryObj } from "@storybook/vue";
import ListItem from "./list-item.vue";
type ListItemInstance = InstanceType<typeof ListItem>;
const meta: Meta<ListItemInstance> = {
  title: "Components/List Item",
  component: ListItem,
};

export default meta;
type Story = StoryObj<ListItemInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { ListItem },
      props: Object.keys(argTypes),
      template: String.raw`
      <ListItem 
          :list="detailList" 
          :remove-list-item="removeField" 
          :add-list-item="addField">
      </ListItem>`,
    };
  },
  args: {
    detailList: [
      {
        position: 0,
        description: "",
      },
    ],
    removeField(index, list) {
      list.splice(index, 1);
    },
    addField(list) {
      list.push({ description: "", position: 0 });
    },
  },
};
