import type { Meta, StoryObj } from "@storybook/vue";
import CheckList from "./check-list.vue";

type CheckListInstance = InstanceType<typeof CheckList>;

const meta: Meta<CheckListInstance> = {
  title: "Components/Check List",
  component: CheckList,
};

export default meta;

type Story = StoryObj<CheckListInstance>;

export const Checklist: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { CheckList },
      template: String.raw`
    <ul style="list-style: none">
      <li v-for="(item, index) in dummyData" :key="index">
        <check-list
            v-bind="$props" :item-list="[item]"
            >
          <slot>{{ item.name }}</slot>
        </check-list>
      </li>
    </ul>
  `,
    };
  },
  args: {
    idName: "resourceId",
    valueName: "permitted",
    checkedName: "permitted",
    enabledName: "editable",
    labelTextName: "name",
    changeHandler: (event) => {
      console.log(event.target.checked);
    },
    changeHandlerParam: [],
    dummyData: [
      {
        resourceId: "resourceId-1",
        name: "Item-1",
        resourceFields: {
          enabled: true,
        },
        permitted: false,
        editable: false,
      },
      {
        resourceId: "resourceId-2",
        name: "Item-2",
        resourceFields: {
          enabled: true,
        },
        permitted: false,
        editable: true,
      },
      {
        resourceId: "resourceId-3",
        name: "Item-3",
        resourceFields: {
          enabled: true,
        },
        permitted: true,
        editable: true,
      },
    ],
  },
};
