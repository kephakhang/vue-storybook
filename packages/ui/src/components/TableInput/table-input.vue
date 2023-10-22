<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

type TextPosition = "left" | "center" | "right";

export default defineComponent({
  name: "TableInput",
  props: {
    id: {
      type: String,
      default: "table-input",
    },
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
    textPosition: {
      type: String as PropType<TextPosition>,
      default: "left",
    },
    value: {
      type: [String, Number],
    },
    numberFormatting: {
      type: Boolean,
      default: false,
    },
    changeHandler: {
      type: Function as PropType<
        (value: string | number, id: string, isChanged: boolean) => void
      >,
    },
  },
  data() {
    return {
      newValue: "" as string | number,
      isChanged: false,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.newValue = this.numberFormatting
          ? Number(newVal).toLocaleString()
          : newVal;
      },
      immediate: true,
      deep: true,
    },
    newValue: {
      handler(newVal, oldVal) {
        if (oldVal) this.isChanged = true;
        this.changeHandler?.(
          this.numberFormatting ? this.removeCommas(newVal) : newVal,
          this.id,
          this.isChanged
        );
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    removeCommas(value: string) {
      return Number(value.replace(/,/g, ""));
    },
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      const numberValue = target.value.replace(/[^0-9]/g, "");

      if (this.numberFormatting) {
        this.newValue = Number(numberValue).toLocaleString();
      } else {
        this.newValue = target.value;
      }
    },
  },
});
</script>

<template>
  <div
    :id="id"
    :class="$style.table_input_main"
    :style="styleProps"
  >
    <input
      v-model="newValue"
      :style="{
        textAlign: textPosition,
      }"
      @input="handleInput"
    />
  </div>
</template>

<style lang="scss" module>
@import "./table-input.module";
</style>
