/** Imports  */
import type { Meta, StoryObj } from "@storybook/vue";
import TimelineStepper from "~/components/TimelineStepper/TimelineStepper.vue";

type TimelineStepperInstance = InstanceType<typeof TimelineStepper>;

const meta: Meta<TimelineStepperInstance> = {
  title: "Components/Timeline Stepper/Default",
  component: TimelineStepper,
};

export default meta;
type Story = StoryObj<TimelineStepperInstance>;

/** Story  */
export const Default: Story = {
  render(_, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      components: { "history-timeline": TimelineStepper },
      template: String.raw`
    <history-timeline
    :style-props="styleProps"
    :step="step"
    :opposite="opposite"
    :last="last">
      <template #content>
        {{ content }}
      </template>
    </history-timeline>
    
    </tooltip>
    </div>
  `,
    };
  },
  args: {
    styleProps: "height: 40px;",
    step: "start",
    opposite: true,
    last: false,
    content: "content",
  },
};
