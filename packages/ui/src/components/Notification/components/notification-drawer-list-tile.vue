<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import { formatTimeAgo } from "~/utils/format-time-ago";
import CtaButton from "~/components/Button/cta-button.vue";

export default defineComponent({
  components: {
    CtaButton,
  },
  props: {
    avartarBackgroundColor: String,
    createdAt: {
      type: Date,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
      required: true,
    },
    buttonText: String,
    hasRead: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatTimeAgo,
  },
});
</script>
<template>
  <button
    :class="$style['list-item']"
    :style="{
      display: 'flex',
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box',
      alignItems: 'center',
      minHeight: buttonText ? '68px' : '56px',
      borderBottom: '1px solid #D6DADE',
      cursor: 'pointer',
    }"
    @click.prevent="onClick"
  >
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: avartarBackgroundColor ?? '#DAEEFF',
      }"
    >
      <div
        v-if="!hasRead"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#E10065',
        }"
      ></div>
      <slot name="avartarImage"></slot>
    </div>
    <div style="width: 12px"></div>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }"
    >
      <div style="font-size: 14px; text-align: left">
        <slot name="title"></slot>
      </div>
      <div style="height: 4px"></div>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }"
      >
        <span
          :style="{
            fontSize: '12px',
            color: '#808080',
          }"
        >
          {{ formatTimeAgo(createdAt) }}
        </span>
        <cta-button
          v-if="buttonText"
          :click-handler="onClick"
          :style-props="{
            height: '24px',
            fontSize: '12px',
          }"
          color-type="blue-fill"
        >
          {{ buttonText }}
        </cta-button>
      </div>
    </div>
  </button>
</template>

<style scoped module>
.list-item:hover {
  background-color: #e6f7ff;
}
</style>
