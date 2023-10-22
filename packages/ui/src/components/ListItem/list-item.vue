<!--
  Summary. 
   List Item isolated component. 
  
   Description.
   This component is a common component, so if you modify it, it can affect everywhere you use this component.
   Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
  @since      0.3.22-dev-1
  @access     module
 
  @alias    ListItem
  @memberof emoldino
 
  @see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
  @link URL https://emoldino.github.io/emoldino-ui-components
 
 
  @return component.
-->

<!-- script -->
<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type { ListType } from "~/types/ListItem";
export default defineComponent({
  name: "ListItem",
  props: {
    /** set list to handle add/remove item records */
    list: {
      type: Array as PropType<ListType[]>,
      required: true,
    },

    /** responsible for remove one item */
    removeListItem: {
      type: Function as PropType<
        (index: number, list: ListType[]) => Promise<void>
      >,
      required: true,
    },

    /** responsible for add item */
    addListItem: {
      type: Function as PropType<(list: ListType[]) => Promise<void>>,
      required: true,
    },
  },
});
</script>

<!-- Template -->
<template>
  <div :class="$style['main']">
    <div
      v-for="(input, index) in list"
      :key="`detailInput-${index}`"
      :class="$style['form-inline']"
    >
      <input
        :id="`item-${index}`"
        v-model="input.description"
        :class="$style['custom-input']"
        type="text"
      />
      <span
        v-if="list.length > 1"
        :class="$style['remove-item']"
        @click="removeListItem(index, list)"
      >
        <img
          src="~assets/images/common-component/trash.svg"
          alt="closeIcon"
          :class="$style['trash-custom-icon']"
        />
      </span>
    </div>
    <div :class="$style['add-items']">
      <span
        :class="$style['add-more-item']"
        @click="addListItem(list)"
      >
        + Add more
      </span>
    </div>
  </div>
</template>

<!-- styles -->
<style lang="scss" module scoped>
@import "./list-item.module";
</style>
