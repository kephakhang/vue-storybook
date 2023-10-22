import type { Meta, StoryObj } from "@storybook/vue";
import Pagination from "./pagination.vue";

type PaginationInstance = InstanceType<typeof Pagination>;
const meta: Meta<PaginationInstance> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<PaginationInstance>;

/**
 * returned object type of next and previous handlers
 */
type PaginationType = {
  currentPage: number;
  totalPage: number;
};

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { Pagination },
      template: String.raw`<pagination
                  :style-props="styleProps"
                  :current-page="currentPage"
                  :total-page="totalPage"
                  :disabled="disabled"
                  :next-click-handler="nextClickHandler"
                  :previous-click-handler="previousClickHandler"
                  ></pagination>`,
    };
  },

  args: {
    styleProps: "",
    disabled: false,
    currentPage: 1,
    totalPage: 4,
    nextClickHandler(pagination: PaginationType) {
      console.log(pagination);
    },
    previousClickHandler(pagination: PaginationType) {
      console.log(pagination);
    },
  },
};
