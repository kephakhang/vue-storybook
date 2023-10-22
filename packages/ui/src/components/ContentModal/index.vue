<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { CSSProperties } from "~/types/common";

export default defineComponent({
  name: "ContentModal",
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    onClose: Function as PropType<() => void>,
    buttonText: {
      type: String,
      default: "Close",
    },
    width: {
      type: String as PropType<CSSProperties["width"]>,
      default: "100%",
    },
    height: {
      type: String as PropType<CSSProperties["height"]>,
      default: "100%",
    },
  },
});
</script>

<template>
  <div
    :style="{
      position: 'absolute',
      display: isOpened ? 'flex' : 'none',
      flexDirection: 'column',
      backgroundColor: 'white',
      bottom: 0,
      right: 0,
      zIndex: 9999,
      width,
      height,
    }"
  >
    <div
      :style="{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        padding: '16px 20px',
        justifyContent: 'space-between',
        backgroundColor: '#F5F8FF',
        boxSizing: 'border-box',
      }"
    >
      <span
        :style="{
          fontWeight: 700,
        }"
      >
        {{ title }}
      </span>
      <button
        :style="{
          all: 'unset',
          cursor: 'pointer',
        }"
        @click="onClose"
      >
        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            color: '#3491FF',
          }"
        >
          <img
            src="~assets/images/icon/close-icon-blue.svg"
            alt="close"
          />
          <div style="width: 4px"></div>
          {{ buttonText }}
        </div>
      </button>
    </div>
    <div style="flex-grow: 1">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
