<script setup lang="ts">
import { useAttrs } from "vue";
import type { InputHTMLAttributes } from "vue";
interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  modelValue?: string;
}
defineProps<Props>();
defineEmits<{
  "update:modelValue": [value: string];
}>();

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();
</script>

<template>
  <div
    :class="attrs['wrapper-class']"
    class="w-5/6 bg-white px-4"
  >
    <input
      v-bind="attrs"
      :value="modelValue"
      class="block w-full rounded border border-solid border-slate-300 bg-clip-padding px-3 py-1.5 text-base leading-normal text-stone-800 outline-0 transition-[border-color,shadow] delay-150 ease-in-out focus:border-blue-200"
      @input="
        $emit('update:modelValue', ($event?.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
