<!--
 * Summary. 
 *  Checklist isolated component shows checklist. 
 * 
 * Description.
 *  This component is a common component, so if you modify it, it can affect everywhere you use this component.
 *  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 *
 * @since      0.3.22-dev-1
 * @access     module
 *
 * @alias    CheckList
 * @memberof emoldino
 *
 * @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
 * @link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 *
 *
 * @return {component}.
-->

<!-- template -->
<template>
  <ul
    :class="checkListClassComputed"
    :style="styleProps"
  >
    <li
      v-for="(item, index) in itemList"
      :key="index"
    >
      <label
        :for="`${category ? category : 'checkbox'}-${item[idName]}-${index}`"
        :disabled="enabledName ? !item[enabledName] : !!item[disabledName]"
      >
        <input
          :id="`${category ? category : 'checkbox'}-${item[idName]}-${index}`"
          type="checkbox"
          :value="item[checkedName]"
          :checked="item[checkedName] ? true : false"
          @input="changeHandler($event, ...changeHandlerParam)"
        />
        <div
          :class="[
            `${$style.checkbox_custom} ${
              item[labelTextName] ? $style['with_label'] : ''
            }`,
          ]"
        ></div>
        <slot></slot>
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
/** imports */
import { defineComponent, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";

type SizeType = "" | "small";
type ItemListType = {
  [key: string]: string | boolean;
};
type FlexDirectionType = "column" | "row";

/** @vue/component */
export default defineComponent({
  props: {
    changeHandlerParam: {
      type: Array,
      default: () => [],
    },
    /** changeHandler for checklist returns checked items */
    changeHandler: {
      type: Function as PropType<(ev: Event, ...any: []) => void>,
      default: () => true,
    },
    /** field name of ID in item object i.e. (resourceId...)*/
    idName: {
      type: String,
      default: "",
    },
    /** field name of value in item object i.e (permitted..)*/
    valueName: {
      type: String,
      default: "",
    },

    /** field name of checked in item object i.e. (permitted...)*/
    checkedName: {
      type: String,
      default: "checked",
    },
    /** field name of disabled in item object i.e. (enabled/disabled/editable..)*/
    disabledName: {
      type: String,
      default: "disabled",
    },
    enabledName: {
      type: String,
      default: "",
    },
    /** field name of enabled in item object i.e. (name/title...) */
    labelTextName: {
      type: String,
      default: "name",
    },
    /** Style Prop */
    styleProps: {
      type: String as PropType<StyleValue>,
      default: "",
    },
    /** size prop (small or "") */
    size: {
      type: String as PropType<SizeType>,
      default: "",
    },
    /** flex direction prop (row or column) */
    flexDirection: {
      type: String as PropType<FlexDirectionType>,
      default: "column",
    },
    /** list of items */
    itemList: {
      type: Array as PropType<ItemListType[]>,
      default: () => [],
    },
    /** category */
    category: {
      type: String,
      default: "",
    },
  },
  computed: {
    checkListClassComputed() {
      return `${this.$style["check_list"]} ${this.$style[this.size]} ${
        this.$style[this.flexDirection]
      }`;
    },
  },
});
</script>

<!-- styles -->
<style lang="scss" module>
@import "./check-list.module";
</style>
