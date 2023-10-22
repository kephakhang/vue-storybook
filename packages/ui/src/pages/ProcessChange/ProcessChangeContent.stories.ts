import type { Meta, StoryObj } from "@storybook/vue";
import ProcessChangeContent from "./ProcessChangeContent.vue";
import {
  getMockProcessChangeDetails,
  getMockProcessChanges,
} from "./__test__/createMocks";
import moment from "moment";

type ProcessChangeContentInstance = InstanceType<typeof ProcessChangeContent>;

const meta: Meta<ProcessChangeContentInstance> = {
  title: "Pages/Process Change",
  component: ProcessChangeContent,
};
export default meta;

export const Default: StoryObj<ProcessChangeContentInstance> = {
  render(_, { argTypes }) {
    return {
      components: { ProcessChangeContent },
      props: Object.keys(argTypes),
      data: () => ({
        notiCount: 0,
        resetTriggerCount: 0,
      }),
      template: String.raw`
        <div style="height: 100vh; width: 100vw">
          <button
            style="
              position: absolute;
              top: 1rem;
              right: 1rem;
              background: skyblue;
              color: white;
              padding: 0.75rem;
              border-radius: 0.75rem;
            "
            @click="() => notiCount++"
          >
            Increase count: {{ notiCount }}
          </button>
          <button
            style="
              position: absolute;
              top: 1rem;
              right: 11rem;
              background: skyblue;
              color: white;
              padding: 0.75rem;
              border-radius: 0.75rem;
            "
            @click="() => resetTriggerCount++"
          >
            Reset Trigger: {{ resetTriggerCount }}
          </button>
  
          <ProcessChangeContent
            v-bind="$props"
            :count="notiCount"
            :reset-trigger="resetTriggerCount"
          />
        </div>
      `,
    };
  },
  args: {
    getProcessChanges: getMockProcessChanges,
    getProcessChangeDetails: getMockProcessChangeDetails,
    selectedYear: moment().year(),
    timeScale: "WEEK",
  },
};
