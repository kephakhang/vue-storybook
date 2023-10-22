import type { Meta, StoryObj } from "@storybook/vue";
import MasterFilter from "./index.vue";
import type { GetFilterItemsRes } from "./types";

type MasterFilterInstance = InstanceType<typeof MasterFilter>;
const meta: Meta<MasterFilterInstance> = {
  title: "Components/Master Filter",
  component: MasterFilter,
};

export default meta;
type Story = StoryObj<MasterFilterInstance>;

function sleep(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mockNames = [
  "Default Supplier's Plant",
  "Internal Test",
  "J&D Tech 평택공장",
  "TAEHYUN 1Line",
  "부천연구소",
  "유한대학교",
];

const mockCodes = [
  "DEFAULT_PLANT",
  "INTERNAL_TEST",
  "JND-PT",
  "TAEHYUN-01",
  "RND-BC",
  "YUHAN-BC",
];

let id = 1;
let isItemSaved = false;

function createMocks(count: number): GetFilterItemsRes {
  const content = Array(count)
    .fill(0)
    .map(() => {
      const code = mockCodes[(Math.random() * mockNames.length) | 0];
      return {
        id: id++,
        name: mockNames[(Math.random() * mockNames.length) | 0],
        code,
      };
    });

  return {
    content,
    pageable: {
      sort: {
        unsorted: true,
        sorted: false,
        empty: true,
      },
      offset: 0,
      pageSize: count,
      pageNumber: 0,
      paged: true,
      unpaged: false,
    },
    last: false,
    totalElements: content.length,
    totalPages: 50,
    number: 0,
    numberOfElements: 6,
    empty: false,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    size: 20,
    first: true,
  };
}

let fecthCount = 0;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { MasterFilter },
      template: String.raw`
        <div style="height: 320px">
          <master-filter v-bind="$props" />
        </div>
      `,
    };
  },
  args: {
    filterCode: "A",
    async getSavedFilterList() {
      await sleep();

      if (isItemSaved) {
        return {
          content: [
            {
              mode: "SELECTED",
              resourceType: "SUPPLIER",
              selectedCount: 1,
              selectedIds: [1],
            },
          ],
        };
      }

      return {
        content: [],
      };
    },
    async getFilterResourceTypes() {
      await sleep();
      return {
        content: [
          {
            resourceType: "TOOLMAKER",
            resourceUrl: "/api/common/flt/toolmakers",
            name: "toolmaker",
          },
          {
            resourceType: "PLANT",
            resourceUrl: "/api/common/flt/plants",
            name: "plant",
          },
          {
            resourceType: "PRODUCT",
            resourceUrl: "/api/common/flt/products",
            name: "product",
          },
          {
            resourceType: "PART",
            resourceUrl: "/api/common/flt/parts",
            name: "part",
          },
          {
            resourceType: "SUPPLIER",
            resourceUrl: "/api/common/flt/suppliers",
            name: "supplier",
          },
        ],
      };
    },
    async getFilterItems() {
      await sleep();
      if (fecthCount === 2) {
        return {
          ...createMocks(5),
          last: true,
        };
      }

      fecthCount++;
      return createMocks(5);
    },
    async saveFilterItems() {
      isItemSaved = true;
      return;
    },
    async clearAllFilterItems() {
      isItemSaved = false;
      return;
    },
    async clearFilterItems(resourceType) {
      isItemSaved = false;
      console.log(resourceType);
      return;
    },
    async notifyFilterUpdated() {
      return;
    },
  },
};
