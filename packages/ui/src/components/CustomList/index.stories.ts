import type { Meta, StoryObj } from "@storybook/vue";
import CustomList from "~/components/CustomList/custom-list.vue";

type CustomListInstance = InstanceType<typeof CustomList>;

const meta: Meta<CustomListInstance> = {
  title: "Components/Custom List",
  component: CustomList,
};

export default meta;
type Story = StoryObj<CustomListInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { CustomList },
      template: String.raw`
        <custom-list  v-bind="$props" ></custom-list>
  `,
    };
  },
  args: {
    styleProps: "width: 700px",
    itemList: [
      {
        id: 1,
        title: "Item1 (Fixed)",
        selected: true,
        fixed: true,
        default: true,
      },
      {
        id: 2,
        title: "Item2",
        selected: false,
        default: false,
      },
      {
        id: 3,
        title: "Item3",
        selected: false,
        default: false,
      },
      {
        id: 4,
        title: "Item4",
        selected: true,
        default: true,
      },
      {
        id: 5,
        title: "Item5",
        selected: true,
        default: true,
      },
      {
        id: 6,
        title: "Item6",
        selected: true,
        default: true,
      },
      {
        id: 7,
        title: "Item7",
        selected: true,
        default: true,
      },
      {
        id: 8,
        title: "Item8",
        selected: false,
        default: false,
      },
      {
        id: 9,
        title: "Item9",
        selected: false,
        default: false,
      },
      {
        id: 10,
        title: "Item10",
        selected: false,
        default: false,
      },
      {
        id: 11,
        title: "Item11",
        selected: false,
        default: false,
      },
      {
        id: 12,
        title: "Item12",
        selected: false,
        default: false,
      },
    ],
    setResult(itemList) {
      console.log(itemList);
    },
  },
};
