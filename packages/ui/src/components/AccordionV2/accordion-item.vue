<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  provide,
  type Ref,
} from "@vue/composition-api";
import {
  SelectedValuesKey,
  TypeKey,
  type AccordionType,
} from "./accordion-root.vue";

export const IsSelectedKey = Symbol();
export const ToggleValueKey = Symbol();

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const selectedValues = inject<Ref<string[]>>(SelectedValuesKey)!;
    const type = inject<AccordionType>(TypeKey)!;

    const isSelected = computed(() =>
      selectedValues.value.includes(props.value)
    );

    const toggleValue = () => {
      const value = props.value;

      if (selectedValues.value.includes(value)) {
        selectedValues.value = selectedValues.value.filter((v) => v !== value);
        return;
      }

      if (type === "single") {
        selectedValues.value = [value];
        return;
      }

      selectedValues.value = [...selectedValues.value, value];
    };

    provide(IsSelectedKey, isSelected);
    provide(ToggleValueKey, toggleValue);
  },
});
</script>
<template>
  <div>
    <slot></slot>
  </div>
</template>
