<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  type PropType,
} from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

export default defineComponent({
  props: {
    id: {
      type: String,
    },
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
    placeholder: {
      type: String,
      default: "",
    },
    initialValue: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
    },
    /**
     * Get input value and id of the element
     * @function
     * @param {string} value - input value
     * @param {string} id - element id (only if id props is passed)
     */
    getValue: {
      type: Function as PropType<(value: string, id?: string) => void>,
    },
  },

  setup(props) {
    const text = ref<string>();

    const updateText = (e: Event) => {
      const { value } = e.target as HTMLTextAreaElement;

      text.value = value;
      props.getValue?.(value, props.id);
    };

    onMounted(() => {
      if (props.initialValue) text.value = props.initialValue;
    });

    return {
      text,
      updateText,
    };
  },
});
</script>

<template>
  <div>
    <textarea
      :id="id ?? undefined"
      :class="$style['textarea-element']"
      :style="styleProps"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="text"
      :error="error"
      @input="updateText"
    ></textarea>
    <p
      v-if="error && errorMessage"
      :class="$style['error-message']"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style module lang="scss">
.textarea-element {
  resize: none;
  width: 26.25rem;
  height: 5.375rem;
  padding: 0.375rem 0.5rem;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  border: 0.0313rem solid #909090;
  border-radius: 0.1875rem;

  &:focus {
    outline: 0.125rem solid #daeeff;
    border-color: #daeeff;
  }

  &::placeholder {
    color: #c9c9c9;
    font-size: 0.9375rem;
  }

  &[disabled] {
    background: #e8e8e8;
    border: 0.0313rem solid transparent;
    color: #4b4b4b;

    &::placeholder {
      color: #4b4b4b;
    }
  }

  &[error] {
    border: 0.0313rem solid #ef4444;
    color: #ef4444;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #ef4444;
    }
  }

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.313rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #d6dade;
    border-radius: 0.063rem;
  }
}

.error-message {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.7031rem;
  font-weight: 400;
  color: #e34537;
}
</style>
