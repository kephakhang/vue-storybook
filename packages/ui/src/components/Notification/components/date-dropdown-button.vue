<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import CtaButton from "~/components/Button/cta-button.vue";
import Modal from "~/components/Modal/modal.vue";
import Calendar from "~/components/Calendar/index.vue";

export default defineComponent({
  components: {
    Calendar,
    CtaButton,
    Modal,
  },
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    toggleDropdownVisibility() {
      this.isOpened = !this.isOpened;
    },
    clickHandler(
      range: {
        start: Date;
        end: Date;
      },
      result: string
    ) {
      console.log(range.start.toString());
      console.log(result);
    },
  },
});
</script>
<template>
  <div>
    <cta-button
      variant="date-picker"
      style-props="height: 28px"
      :click-handler="toggleDropdownVisibility"
    >
      All Time
    </cta-button>
    <modal
      :style-props="{
        width: '580px',
        height: '480px',
      }"
      :is-opened="isOpened"
      heading-text="Choose a Date"
      :modal-handler="toggleDropdownVisibility"
    >
      <template #body>
        <calendar
          :show-selector="true"
          time-scale="date"
          :click-handler="clickHandler"
        />
      </template>
      <template #footer>
        <cta-button>Cancel</cta-button>
        <cta-button color-type="blue-fill">Save</cta-button>
      </template>
    </modal>
  </div>
</template>
