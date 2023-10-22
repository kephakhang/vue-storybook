<!--
 Summary. 
 Table Status Chip isolated component shows the status and tooltip on hover. 
  
 Description.
 This component is a common component, so if you modify it, it can affect everywhere you use this component.
 Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
 @since      0.4.0
 @access     module
 
 @alias    Table Status Chip
 @member of emoldino
 
 @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/WEB-Design-System-(Desktop)?node-id=367-6912&t=02Afz8RzfLgdcNuQ-0
 @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-table-status-chip--default&args=statusType:Approved
 
 
 @return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

import Tooltip from "~/components/Tooltip/tool-tip.vue";

import type { StatusType } from "../../types/TableStatusChip";

const backgroundColors: { [key: string]: string } = {
  inactive: "#FF8489",
  pending: "#CCACFF",
  disapproved: "#D6DADE",
  active: "#D2F8E2",
  approved: "#D2F8E2",
};

export default defineComponent({
  name: "TableStatusChip",

  /**
   * import the tooltip to show on hover
   */
  components: {
    Tooltip,
  },
  props: {
    /**
     * set table status chip tooltip container style properties {ex {width: 100rem;}}
     */
    tooltipStyleProps: {
      type: [String, Object] as PropType<StyleValue>,
      default: "width : 18.75rem",
    },
    /**
     * set tooltip text
     */
    tooltipText: {
      type: String,
    },
    /**
     * set the table status chip color and change text
     */
    statusType: {
      type: String as PropType<StatusType>,
      default: "Active",
    },
  },
  /** to change the color of table status chip */
  computed: {
    /**
     * Retrieves the background color based on the current status type.
     * @returns The background color associated with the current status.
     */
    backgroundColor() {
      let currentStatus = this.statusType.toLocaleLowerCase();
      return backgroundColors[currentStatus];
    },
  },
});
</script>

<template>
  <div>
    <Tooltip
      position="bottom"
      :style-props="tooltipStyleProps"
    >
      <template #context>
        <div
          :class="$style['chips-container']"
          :style="{ background: backgroundColor }"
        >
          <span>{{ statusType }}</span>
        </div>
      </template>
      <template #body>
        {{ tooltipText }}
      </template>
    </Tooltip>
  </div>
</template>

<style lang="scss" module>
@import "./table-status-chip.module";
</style>
