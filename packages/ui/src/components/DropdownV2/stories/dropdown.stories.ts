import type { Meta, StoryObj } from "@storybook/vue";
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  DropdownItem,
} from "..";
import { SearchBar, CtaButton } from "~/index";

type DropdownInstance = InstanceType<typeof DropdownRoot>;

const meta: Meta<DropdownInstance> = {
  title: "Components/Dropdown V2",
  component: DropdownRoot,
  argTypes: {
    position: {
      control: { type: "radio" },
      options: [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "left",
        "left-top",
        "left-bottom",
        "right",
        "right-top",
        "right-bottom",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<DropdownInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: {
        DropdownRoot,
        DropdownTrigger,
        DropdownPortal,
        DropdownContent,
        DropdownItem,
        SearchBar,
        CtaButton,
      },
      props: Object.keys(argTypes),
      setup() {
        const onClickItem = (e: MouseEvent, data: Record<string, unknown>) => {
          console.log(e, data, "@click called");
        };
        const onClose = () => {
          console.log("onCloseDropdown called");
        };

        const data = [
          {
            id: 1,
            title: "item 1",
            code: "item-1",
          },
          {
            id: 2,
            title: "item 2 - long named item",
            code: "item-2",
          },
          {
            id: 3,
            title: "item 3",
            code: "item-3",
          },
          {
            id: 4,
            title: "item 4",
            code: "item-4",
          },
          {
            id: 5,
            title: "item 5",
            code: "item-5",
          },
          {
            id: 6,
            title: "item 6",
            code: "item-6",
          },
        ];

        return { data, onClickItem, onClose };
      },
      template: String.raw`
        <div>
          <DropdownRoot :on-dropdown-close="onClose">
            <DropdownTrigger>
              <CtaButton>Trigger</CtaButton>
            </DropdownTrigger>
            <DropdownPortal>
              <DropdownContent>
                <template #header>
                  <div>
                    <span>#header</span>
                  </div>
                </template>
                <DropdownItem
                  v-for="(item, index) in data"
                  :key="index"
                  :text="item.title"
                  @click="(e) => onClickItem(e, item)"
                ></DropdownItem>        
                <template #footer>
                  <div>
                    <span>#footer</span>
                  </div>
                </template>
              </DropdownContent>
            </DropdownPortal>
          </DropdownRoot>
        </div>
      `,
    };
  },
};
