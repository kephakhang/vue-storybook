/** Imports */
import type { Meta, StoryObj } from "@storybook/vue";
import TimelineStepper from "~/components/TimelineStepper/TimelineStepper.vue";
type TimelineStepperInstance = InstanceType<typeof TimelineStepper>;

const meta: Meta<TimelineStepperInstance> = {
  title: "Components/Timeline Stepper/Advanced",
  component: TimelineStepper,
};

export default meta;
type Story = StoryObj<TimelineStepperInstance>;

export const ListStepper: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { "history-timeline": TimelineStepper },
      template: String.raw`
  <div>
    <history-timeline
    v-for="(item, index) in oppositeList" 
    :step="item.step"
    :opposite="true">
      <template #content>
        <div>{{ item.content }}</div>
        <div>============</div>
        <div>============</div>
      </template>
    </history-timeline>
  </div>`,
    };
  },
  args: {
    oppositeList: [
      { step: "unconfirmed", content: "unconfirmed content" },
      { step: "current", content: "current content" },
      { step: "confirmed", content: "confirmed content" },
      { step: "start", content: "start content" },
    ],
  },
};
