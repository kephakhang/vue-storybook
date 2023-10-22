<!--
 * Summary. 
 *  table status isolated component.
 * 
 * Description.
 *  This component is a common component, so if you modify it, it can affect everywhere you use this component.
 *  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 *
 * @since      0.3.33-dev-1
 * @access     module
 *
 * @alias    TableStatus
 * @memberof emoldino
 *
 * @see  Function/class relied on https://www.figma.com/file/QFmqErciXntGWbbJIw2tAZ/%5BNOT-USED%5D-2023_Design-System-Responsive-Web-2.0?node-id=367-6912&t=Tr4ZzshttjZEjDza-0
 * @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-table-status--table-status-story
 *
 *
 * @return {component}.
-->

<script lang="ts">
/**
 * extentions
 */

import { defineComponent, type PropType } from "@vue/composition-api";
import styles from "./table-status.module.scss";
import type {
  CategoryTypes,
  CategoryToStyleMapType,
} from "../../types/TableStatus";
/**
 * const categories and their circle color style
 */
const categoryToStyleMap: CategoryToStyleMapType = {
  OVERDUE: "red",
  HIGH_RISK: "red",
  DOWNTIME: "red",
  CHANGED: "red",
  SENSOR_OFFLINE: "red",
  UPCOMING: "yellow",
  IN_PROGRESS: "yellow",
  MEDIUM_RISK: "yellow",
  IDLE: "yellow",
  CONFIRMED: "green",
  LOW_RISK: "green",
  COMPLETED: "green",
  IN_PRODUCTION: "green",
  CANCELLED: "dark_gray",
  INACTIVE: "purple_gray",
  DECLINED: "gray",
  NO_SENSOR: "black_bordered_white",
  REQUESTED: "purple",
  REGISTERED: "purple",
  PENDING: "light_blue",
  PENDING_APPROVAL: "blue",
  UNCONFIRMED: "orange",
  ON_STANDBY: "black_bordered_gray",
  SENSOR_DETACHED: "red_dashed_white",
  DISPOSED: "black",
  DISABLED: "dark_gray",
  IN_USE: "green",
  NOT_IN_USE: "light_orange",
  FAILURE: "light_gray",
  DISCARDED: "black",
  HIGH: "red",
  MEDIUM: "yellow",
  LOW: "green",
  PROLONGED: "brown",
};

/**
 * @vue/component
 */
export default defineComponent({
  name: "TableStatus",
  props: {
    /**
     * Category type (i.e. OVERDUE, ON_STANDBY etc...)
     */
    category: {
      type: String as PropType<CategoryTypes>,
      required: true,
    },
  },
  computed: {
    /**
     *  color style computed according to category
     */
    colorComputed() {
      return `${styles.default} ${styles[categoryToStyleMap[this.category]]} `;
    },

    /**
     *  converting label from camel case to Snake case
     */
    labelText() {
      return this.snakeToTitle(this.category);
    },
  },
  methods: {
    /**
     * converting snake case to title case
     */
    snakeToTitle(str: string) {
      if (!str) return "";
      const words = str.split("_").map((word) => {
        const lowerCaseWord = word.toLowerCase();
        return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
      });
      return words.join(" ");
    },
  },
});
</script>

<!-- template -->
<template>
  <div
    v-if="category"
    :class="$style.center_align"
  >
    <div :class="colorComputed"></div>
    <span :class="$style.label_styles">
      {{ labelText }}
    </span>
  </div>
</template>

<!-- styles -->
<style lang="scss" module>
@import "./table-status.module";
</style>
