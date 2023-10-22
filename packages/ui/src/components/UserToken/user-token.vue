<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import TooltipFloatingVue from "../TooltipFloatingVue/index.vue";

// TODO: Relpace color set for new desing system
const colorList = [
  "#FFC68D",
  "#AFACFF",
  "#FFACE5",
  "#64D0C3",
  "#FFACAC",
  "#74AEFC",
  "#E0CD7E",
  "#FFA167",
  "#86B0FF",
  "#FF8699",
  "#FF8489",
  "#90E5AA",
  "#C69E9E",
  "#FFACF2",
  "#E58383",
  "#F8D2D2",
  "#FFB371",
  "#86C7FF",
  "#62B0D9",
  "#ACBFFF",
  "#FF7171",
  "#CCACFF",
  "#D2F8E2",
  "#707070",
  "#DB91FC",
];

export default defineComponent({
  components: { TooltipFloatingVue },
  props: {
    userId: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const userInitial = computed(() => {
      let initials = "";
      const words = props.userName.split(" ");

      initials += words[0].charAt(0).toUpperCase();

      if (words.length > 1) {
        initials += words[words.length - 1].charAt(0).toUpperCase();
      }

      return initials;
    });

    const tokenColor = computed(() => {
      let colorIndex = 0;

      [...userInitial.value].forEach(
        (char) => (colorIndex += char.charCodeAt(0))
      );

      if (props.userId) colorIndex += props.userId;

      // TODO(emoldino.jun): Change length if colorList is changed
      return colorList[colorIndex % 25];
    });

    return {
      userInitial,
      tokenColor,
    };
  },
});
</script>

<template>
  <div>
    <TooltipFloatingVue theme="dark">
      <template #tooltip-target>
        <div
          :class="$style['token-container']"
          :style="{ backgroundColor: tokenColor }"
        >
          {{ userInitial }}
        </div>
      </template>
      <template #tooltip-content>
        <div :class="$style['tooltip-container']">
          <div>
            <p :style="{ fontWeight: 700 }">{{ userName }}</p>
            <p>Company: {{ companyName }}</p>
            <p>Department: {{ department }}</p>
            <p>Position: {{ position }}</p>
          </div>

          <div>
            <p>Email: {{ email }}</p>
            <p>Phone: {{ phoneNumber }}</p>
          </div>
        </div>
      </template>
    </TooltipFloatingVue>
  </div>
</template>

<style module lang="scss">
.token-container {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 0.625rem;
  font-weight: 400;
  color: #4b4b4b;

  &:hover {
    cursor: context-menu;
  }
}

.tooltip-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 12.75rem;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 0.75rem;
  font-weight: 400;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
