import type { Meta, StoryObj } from "@storybook/vue";
import TimePicker from "~/components/TimePicker/time-picker.vue";
import type { StartTime } from "../../types/TimePicker";

type TimePickerInstance = InstanceType<typeof TimePicker>;

const meta: Meta<TimePickerInstance> = {
  title: "Components/Time Picker ",
  component: TimePicker,
};

export default meta;
type Story = StoryObj<TimePickerInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { TimePicker },
      props: Object.keys(argTypes),
      template: String.raw`
      <div style="padding-bottom: 40px">
      <time-picker
            :disabled="disabled"
            :is-range="isRange"
            :enable-minute="enableMinute"
            :min-time="minTime"
            :max-time="maxTime"
            :selected-time="selectedTime"
            :id="id"
            :change-time="handleChangeStartDate"
            :submit-time="handleChange"></time-picker>
      </div>
    `,
    };
  },
  args: {
    disabled: false,
    isRange: false,
    enableMinute: true,
    handleChangeStartTime(time: StartTime, type: string) {
      if (time.hour < 10) {
        this.startTime = "0" + time.hour + "00";
      } else {
        this.startTime = time.hour + "00";
      }
      if (type == "hour") {
        this.hour = `${time.hour}`;
      } else {
        this.minute = `${time.minute}`;
      }
    },
    handleChange: Function,
    selectedTime: {
      hour: 12,
      minute: 38,
      isAddDay: false,
    },
    minTime: "05:00",
    maxTime: "03:00",
  },
};
