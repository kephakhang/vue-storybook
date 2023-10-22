<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import CtaButton from "~/components/Button/cta-button.vue";
import type { ReadNotificationsFn } from "~/types/Notification";

export default defineComponent({
  components: {
    CtaButton,
  },
  props: {
    isActivated: {
      required: false,
      type: Boolean,
    },
    onToggled: {
      required: true,
      type: Function as PropType<(isToggled: boolean) => Promise<void>>,
    },
    readAllMessages: {
      required: true,
      type: Function as PropType<ReadNotificationsFn>,
    },
  },
  data() {
    return {
      isLoading: false,
      isToggled: false,
    };
  },
  mounted() {
    this.isToggled = this.isActivated;
  },
  methods: {
    async toggle() {
      if (this.isLoading) return;

      this.isToggled = !this.isToggled;
      this.isLoading = true;

      try {
        await this.onToggled(this.isToggled);
        this.isLoading = false;
        // TODO(sun.lee): handle response
      } catch (error) {
        this.isToggled = !this.isToggled;
        // TODO(sun.lee): handle error
      }
    },
  },
});
</script>
<template>
  <div
    :style="{
      backgroundColor: '#F5F8FF',
      width: '100%',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #ACACAC',
    }"
  >
    <div style="width: 24px"></div>
    <p
      :style="{
        fontWeight: 700,
      }"
    >
      Notification
    </p>
    <!--
      TODO(sun.lee): Toggle button removed in #900. But the component could be reused in the future.
      <div style="width: 12px"></div>
      <ToggleButton :value="isToggled" :on-changed="toggle" />
    -->
    <div style="flex: 1"></div>
    <CtaButton
      variant="text"
      :style-props="{
        color: '#C4C4C4',
        marginRight: 0,
      }"
      :click-handler="readAllMessages"
    >
      Mark all as read
    </CtaButton>
    <div style="width: 24px"></div>
  </div>
</template>
