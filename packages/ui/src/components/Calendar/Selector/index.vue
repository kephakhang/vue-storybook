<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <CtaButton
      v-for="(dateType, index) in selectorOptions"
      :key="index"
      :color-type="dateType === timeScale ? 'blue-fill' : 'white'"
      :click-handler="() => executor(dateType)"
      style-props="width : 171px; height: 25px;"
    >
      {{ capitalize(dateType) }}
    </CtaButton>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import CtaButton from "~/components/Button/cta-button.vue";

export default defineComponent({
  name: "SelectorCalendar",
  components: {
    CtaButton,
  },
  props: {
    timeScale: String,
    selectorOptions: Array,
  },
  methods: {
    executor(timeScale) {
      this.$emit("getTimeScale", timeScale);
    },
    capitalize(str) {
      return str
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
    },
  },
});
</script>
