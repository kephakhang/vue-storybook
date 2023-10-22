import type { Meta, StoryObj } from "@storybook/vue";
import Modal from "./modal.vue";

type ModalInstance = InstanceType<typeof Modal>;
const meta: Meta<ModalInstance> = {
  title: "Components/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<ModalInstance>;
export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Modal },
      props: Object.keys(argTypes),
      template: String.raw`
      <div>
      <modal
        :modal-type="modalType"
        :is-opened="isOpened"
        :style-props="styleProps"
        :heading-text="headingText"
        :sub-heading-text="subHeadingText"
        :modal-handler="modalHandler"
        >
        <template #switch-tab>
          <p>#switch-tab</p>
        </template>
        <template #body>#body</template>
        <template #footer>#footer</template>
      </modal>
      </div>
      `,
    };
  },
  args: {
    modalType: "popup",
    headingText: "Modal",
    isOpened: true,
    subHeadingText: "Sub Heading(optional)",
    styleProps: "",
  },
};
export const SlideInModal: Story = {
  render(_, { argTypes }) {
    return {
      components: { Modal },
      props: Object.keys(argTypes),
      template: String.raw`
      <div>
      <modal
        :modal-type="modalType"
        :is-opened="isOpened"
        :style-props="styleProps"
        :heading-text="headingText"
        :sub-heading-text="subHeadingText"
        :modal-handler="modalHandler"
        >
        <template #switch-tab>
          <p>#switch-tab</p>
        </template>
        <template #body>#body</template>
        <template #footer>#footer</template>
      </modal>
      </div>
      `,
    };
  },
  args: {
    ...Default.args,
    modalType: "slide-in",
  },
};
