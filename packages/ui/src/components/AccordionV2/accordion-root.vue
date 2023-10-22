<script lang="ts">
import {
  defineComponent,
  provide,
  ref,
  type PropType,
} from "@vue/composition-api";

export type AccordionType = "single" | "multiple";

export const SelectedValuesKey = Symbol();
export const TypeKey = Symbol();

export default defineComponent({
  props: {
    type: {
      type: String as PropType<AccordionType>,
      required: true,
    },
    defaultValue: {
      type: [String, Array] as PropType<string | string[]>,
    },
  },
  setup(props) {
    const selectedValues = ref(
      typeof props.defaultValue === "string"
        ? [props.defaultValue]
        : props.defaultValue
    );

    provide(TypeKey, props.type);
    provide(SelectedValuesKey, selectedValues);
  },
});
</script>
<template>
  <div>
    <slot></slot>
  </div>
</template>
