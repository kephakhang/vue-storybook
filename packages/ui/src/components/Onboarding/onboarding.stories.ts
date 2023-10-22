import type { Meta, StoryObj } from "@storybook/vue";
import Onboarding from "./onboarding.vue";
import IconButton from "../IconButton/icon-button.vue";

type OnboardingInstance = InstanceType<typeof Onboarding>;
const meta: Meta<OnboardingInstance> = {
  title: "Components/Onboarding",
  component: Onboarding,
};

export default meta;
type Story = StoryObj<OnboardingInstance>;
export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Onboarding, IconButton },
      props: Object.keys(argTypes),
      template: String.raw`
      <div>
        <icon-button 
          :class="{'spotlight':step<=1 | !multipleSteps}" 
          buttonType="kebab-menu" 
          style="
          position: fixed;
          top: 2%;
          left: 5%;"
        />
        <icon-button
          :class="{'spotlight': step==2}"
          buttonType="kebab-menu"
          style=" position: fixed; left: 5%; top: 30%"
        />
        <icon-button
        :class="{'spotlight': step==3}"
        buttonType="kebab-menu"
        style=" position: fixed; left: 25%; top: 50%"
    />
    <icon-button
        :class="{'spotlight':step==4}"
        buttonType="kebab-menu"
        style="
        position: fixed;
        bottom: 18%;
        left: 5%;"
    />
    <icon-button
        :class="{'spotlight':step>4}"
        buttonType="kebab-menu"
        style="
        position: fixed;
        top: 2%;
        left: 5%;"
    />      
    <Onboarding 
      :active="active"
      :head="head" 
      :body="body"
      :multipleSteps="multipleSteps" 
      :step="step" 
      :range="range" 
      :click-handler="clickHandler" 
      :style-props="styleProps"
      :handle-close="handleClose">
    <template #body><div><p>You can only configure what additional data you would like to add to existing graph.</p>
      <p>You can only configure what additional data you would like to add to existing graph.</p></div></template>
    </Onboarding>
    </div>
      `,
    };
  },
  args: {
    styleProps: { top: "2%", left: "9%" },
    head: "Graph Setting",
    multipleSteps: true,
    step: 1,
    range: 4,
    active: true,
    clickHandler() {
      /**
    const parent = this.$parent;
    if (parent.step != parent.range) {
      parent.step = parent.step + 1;
    }
    if (parent.step == 2) {
      parent.styleProps = { top: "21%", left: "11%" };
    } else if (parent.step == 3) {
      parent.styleProps = { left: "3%", top: "55%" };
    } else if (parent.step == 4) {
      parent.styleProps = { bottom: "2%", left: "9%" };
    } else if (parent.step >= 4) {
      parent.styleProps = { top: "2%", left: "9%" };
    }
     */
    },
    handleClose() {
      //this.$parent?.active = false;
    },
  },
};
