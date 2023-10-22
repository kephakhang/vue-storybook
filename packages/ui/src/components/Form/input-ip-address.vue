<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

import styles from "./input-ip-address.module.scss";

export default defineComponent({
  props: {
    /* declares custom style props for component */
    styleProps: [String, Object] as PropType<StyleValue>,

    /* declares error message to show */
    errorMessage: {
      type: String,
      default: "Enter a valid IP Address (ex. 0.0.0.0)",
    },

    /* declares id for input element */
    id: {
      type: String,
      default: "input-id",
    },

    /* declares disable as true or false */
    disabled: {
      type: Boolean,
      default: false,
    },

    /* declares initial value */
    initialValue: String,

    /**
     * declares function that sets a result
     * and includes a description of its parameters
     * and return type
     */
    setResult: Function as PropType<
      (id: string, value: string, error: boolean) => void
    >,
  },
  data() {
    return {
      octets: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      isFocused: false,
      ipAddress: "",
      error: false,
    };
  },
  computed: {
    /**
     * Compute property to return input wrapper class
     * based on focus, disable, and error states.
     */
    inputWrapperClass() {
      return `${styles["input-wrapper"]} ${
        this.isFocused ? styles["-focus"] : ""
      } ${this.disabled ? styles["-disabled"] : ""} ${
        this.error ? styles["-error"] : ""
      }`;
    },
  },

  /**
   * Watch the octets for changes and update ipAddress and
   * perform validation, then run setIpAddress function to update
   * the parent component with the new IP address.
   */
  watch: {
    octets: {
      handler(newVal) {
        this.ipAddress = newVal
          .map((octet: { value: string }) => octet.value)
          .join(".");
        this.validateIpAddress();
        this.setIpAddress();
      },
      deep: true,
      immediate: true,
    },
  },

  /* sets the octets of the IP address to the initial value provided */
  mounted() {
    if (this.initialValue) {
      this.octets = this.initialValue.split(".").map((octet) => {
        return {
          value: octet,
        };
      });
    }
  },
  methods: {
    /* validate ip address */
    validateIpAddress() {
      const octetRegex = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

      if (this.ipAddress.length < 4) return;

      this.error = this.octets.some((octet) => !octetRegex.test(octet.value));
    },

    /**
     * ensures that the length of the input octets
     * in the IP address field does not exceed 3
     */
    inputHandler(index: number) {
      for (let i = index; i < this.octets.length; i++) {
        const octet = this.octets[i];

        if (octet.value && octet.value.toString().length >= 3) {
          octet.value = octet.value.toString().substring(0, 3);

          if (this.$refs[`octet-${index + 2}`]) {
            const nextInput = (
              this.$refs[`octet-${index + 2}`] as Array<HTMLInputElement>
            )[0];

            nextInput.focus();
          }
        } else {
          return;
        }
      }
    },

    /* set ip address */
    setIpAddress() {
      this.setResult?.(this.id, this.ipAddress, this.error);
    },
  },
});
</script>

<template>
  <div
    :id="id"
    :class="$style['container']"
  >
    <div
      :class="inputWrapperClass"
      :style="styleProps"
    >
      <div
        v-for="(octet, index) in octets"
        :class="$style['inputs']"
      >
        <input
          :id="`octet-${index + 1}`"
          :key="index"
          :ref="`octet-${index + 1}`"
          v-model.number="octet.value"
          autocomplete="off"
          type="number"
          :disabled="disabled"
          :style="
            octet.value.length === 0 ? 'border-bottom: 1px solid #c9c9c9' : ''
          "
          @input="inputHandler(index)"
          @focusin="isFocused = true"
          @focusout="isFocused = false"
        />
        <span v-if="index < 3">.</span>
      </div>
    </div>
    <p
      v-if="error"
      :class="$style['error-message']"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss" module scoped>
@import "./input-ip-address.module.scss";
</style>
