import type { Meta, StoryObj } from "@storybook/vue";
import PartQualityRiskContent from "./PartQualityRiskContent.vue";
import {
  getMockPartQualityRisk,
  getMockHeatmapItems,
  getMockMoldItems,
} from "./__test__/createMocks";
import { computed, ref } from "@vue/composition-api";

type PartQualityRiskContentInstance = InstanceType<
  typeof PartQualityRiskContent
>;

const meta: Meta<PartQualityRiskContentInstance> = {
  title: "Pages/Part Quality Risk",
  component: PartQualityRiskContent,
};
export default meta;

export const Default: StoryObj<PartQualityRiskContentInstance> = {
  render(_, { argTypes }) {
    return {
      components: { PartQualityRiskContent },
      props: Object.keys(argTypes),
      setup() {
        const count = ref(1);
        const week = ref(10);

        const date = computed(() => {
          return `Week ${week.value}, 2023`;
        });

        return { count, date, week };
      },
      template: String.raw`
        <div>
          <div style="width: 100%; position: absolute; top: 0; display: flex; justify-content: space-between">
            <div @click="() => count++" style="width: fit-content; padding: 0.5rem; background: #ccc">count: {{ count }}</div>
            <div @click="() => week++" style="width: fit-content; padding: 0.5rem; background: #ccc">displayDate: {{ date }}</div>
          </div>
          <div style="height: 100vh; width: 100vw">
            <PartQualityRiskContent
              v-bind="$props"
              :refetch-trigger=count
              :display-date="date"
            />
          </div>
        </div>
      `,
    };
  },
  args: {
    getPartQualityRisk: getMockPartQualityRisk,
    getHeatmapItems: getMockHeatmapItems,
    getMoldItems: getMockMoldItems,
  },
};
