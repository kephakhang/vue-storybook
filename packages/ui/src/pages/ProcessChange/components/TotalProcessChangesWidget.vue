<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { Widget, Tooltip, Icon } from "../../..";

export default defineComponent({
  components: { Widget, Tooltip, Icon },
  props: {
    totalChanges: Number,
  },
});
</script>
<template>
  <Widget
    header-text="Total Process Change"
    :style-props="{
      height: '100%',
      width: '100%',
    }"
  >
    <template #tooltip>
      <Tooltip position="bottom">
        <template #context>
          <Icon button-type="information-icon"></Icon>
        </template>
        <template #body
          ><span style="width: 18.625rem; text-align: left"
            >Shows the total process change number in relation to the current
            filter configuration</span
          ></template
        >
      </Tooltip>
    </template>
    <template #body>
      <div
        :style="{
          display: 'flex',
          height: '100%',
          color: '#4b4b4b',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          'padding-bottom': '3.125rem',
        }"
      >
        <span
          :style="{
            'font-size': '3.125rem',
            'font-weight': 700,
          }"
          >{{ totalChanges ?? "-" }}</span
        >
        <span
          :style="{
            'font-size': '1rem',
            'font-weight': 400,
          }"
          >Process Changes</span
        >
      </div>
    </template>
  </Widget>
</template>
