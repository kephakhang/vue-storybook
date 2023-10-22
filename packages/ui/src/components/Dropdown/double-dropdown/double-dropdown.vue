<!--
Summary. 
Double Dropdown isolated component contains the search and checkbox feature. 
  
Description.
This component is a common component, so if you modify it, it can affect everywhere you use this component.
Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 
@since      0.3.22-dev-1
@access     module
 
@alias    DoubleDropdown
@member of emoldino
 
@see  Function/class relied on https://www.figma.com/file/UftykJ37WoqcvLUgmEOWYX/eMoldino-Design-System-(Desktop)?node-id=0%3A1&t=xLgLncotqKwVMwtM-0
@link URL https://emoldino.github.io/emoldino-ui-components/?path=/story/components-alertbox--caution-alert-box-1-states
 
 
@return {component}.
-->

<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import CtaButton from "~/components/Button/cta-button.vue";
import CommonPopover from "~/components/Popover/popover.vue";
import type { StyleValue } from "~/types/common";
import type { ChildrenItemType, ItemType } from "~/types/DoubleDropdown";

export default defineComponent({
  name: "DoubleDropdown",

  components: {
    CtaButton,
    CommonPopover,
  },

  props: {
    /** visible prop handle popover display and hide */
    visible: {
      default: false,
      Type: Boolean,
    },

    /** items {id,title,code, childrens[]} */
    items: {
      type: Array as PropType<ItemType[]>,
      default: [] as ItemType[],
    },

    /** Set whether dropdown-list wrap-style or not (ex: {top: '10px', left: '10px', width: '10px'}) */
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
    placeholder: String,
    id: String,

    /** Apply Handler that will return selected items [{id,title,code, childrens[]},...] */
    applyHandler: Function as PropType<(item: ItemType[]) => void>,

    /** reset handler that will return selected items [{id,title,code, childrens[]},...] */
    resetHandler: Function as PropType<(item: ItemType[]) => void>,

    /** onClose popover handler */
    onClose: Function,
    position: {
      type: Object,
      default: () => ({ top: "", left: "", right: "", bottom: "" }),
    },
  },
  data() {
    return {
      colorType: "blue-fill",

      /** The input value. Shows the input list searched through filtered. */
      inputContent: "",
      checkedArray: [] as ItemType[],
    };
  },
  computed: {
    /**  Filter your search terms */
    filtered() {
      if (this.items) {
        const str = this.inputContent.trim();
        if (!str || str === "") {
          return this.items;
        }
        if (this.items != null) {
          let filter = this.items.filter((item) => {
            return (
              item.title != null &&
              item.title.toUpperCase().includes(str.toUpperCase())
            );
          });

          return filter;
        }
        return this.items;
      } else {
        return this.items;
      }
    },
  },
  mounted() {
    /** initially all items are checked */
    setTimeout(() => {
      this.filtered.forEach((item) => {
        if (item.title) this.selectAll(item, item, item.title);
      });
    }, 1000);
  },
  methods: {
    /** toggle check button state */
    toggleCheckValue(
      parentItem: ItemType,
      subItem: ChildrenItemType,
      index: number
    ) {
      subItem.checked = !subItem.checked;
      if (subItem.title === "All" && subItem.checked) {
        this.selectAllCheckBox(parentItem, index, true);
      } else if (subItem.title === "All") {
        this.selectAllCheckBox(parentItem, index, false);
      }
      this.SyncCheckedArray();
      let checked = this.checkedArray.find(
        (item: ItemType) => item.title === parentItem.title
      );

      if (
        typeof checked !== "undefined" &&
        checked?.childrens.length === this.filtered[index].childrens.length - 1
      ) {
        this.selectOrDeselectAllBox(parentItem);
      }

      this.SyncCheckedArray();
    },
    /** select all items and unselect all handler */
    selectOrDeselectAllBox(parentItem: ItemType) {
      let parentTitle = parentItem.title;
      let temp = structuredClone(this.filtered);
      this.filtered.splice(0);
      this.$nextTick(() => {
        temp.map((item) => {
          let obj: ItemType = {
            id: item.id,
            title: item.title,
            childrens: [] as ChildrenItemType[],
          };
          if (item.childrens) {
            item.childrens.map((subItem) => {
              if (obj.childrens) {
                obj.childrens.push({
                  title: subItem.title,
                  code: subItem.code,
                });
              }
            });
          }
          this.filtered.push(obj);
        });
        this.filtered.map((item, index) => {
          this.selectAllBox(item, temp[index], parentTitle);
        });
      });
    },

    /** select all box */
    selectAllBox(parentItem: ItemType, value: ItemType, parentTitle: string) {
      parentItem.childrens.forEach((subItem, index) => {
        if (parentItem.title === parentTitle && subItem.title === "All") {
          subItem.checked = !value.childrens[index].checked;
        } else {
          subItem.checked = value.childrens[index].checked;
        }
      });
      this.$forceUpdate();
    },

    /**
     * Click on option. If there is a click handler,
     * the click handler is executed, and if there is no click handler, the checklist is saved.
     */
    applyHandlerMethod() {
      this.$nextTick(() => {
        if (this.applyHandler) {
          this.SyncCheckedArray();
          this.applyHandler(this.checkedArray);
        }
      });
      this.$forceUpdate();
    },

    /** eslint-disable  no-unused-vars */
    selectAllCheckBox(
      parentItem: ItemType,
      parentIndex: number,
      isSelect: boolean
    ) {
      let parentTitle = parentItem.title;
      let temp = structuredClone(this.filtered); //_.cloneDeep(this.filtered)
      this.filtered.splice(0);
      this.$nextTick(() => {
        temp.map((item: ItemType) => {
          let obj: ItemType = {
            id: item.id,
            title: item.title,
            childrens: [],
          };
          let arr: ChildrenItemType[] = [];
          item?.childrens.map((subItem: ChildrenItemType) => {
            arr.push({
              title: subItem.title,
              code: subItem.code,
            });
          });
          obj.childrens = arr;
          this.filtered.push(obj);
        });
        this.filtered.map((item, index) => {
          if (isSelect) {
            this.selectAll(item, temp[index], parentTitle);
          } else {
            this.unselectAll(item, temp[index], parentTitle);
          }
        });
      });
      this.$forceUpdate();
    },

    /** select all */
    selectAll(parentItem: ItemType, value: ItemType, parentTitle: string) {
      if (parentTitle === parentItem.title) {
        parentItem?.childrens.forEach((subItem) => {
          subItem.checked = true;
        });
      } else {
        parentItem?.childrens.forEach((subItem, index) => {
          subItem.checked = value.childrens[index].checked;
        });
      }
      this.$forceUpdate();
    },

    /** Deselect all. */
    unselectAll(parentItem: ItemType, value: ItemType, parentTitle: string) {
      if (parentTitle === parentItem.title) {
        parentItem?.childrens.forEach((subItem) => {
          subItem.checked = false;
        });
      } else {
        parentItem?.childrens.forEach((subItem, index) => {
          subItem.checked = value.childrens[index].checked;
        });
      }
      this.$forceUpdate();
    },

    /** Reset All checkboxes  */
    resetAllCheckBox() {
      let temp = structuredClone(this.filtered); //_.cloneDeep(this.filtered)
      this.filtered.splice(0);
      this.$nextTick(() => {
        temp.map((item: ItemType) => {
          let obj: ItemType = {
            id: item.id,
            title: item.title,
            childrens: [],
          };
          let arr: ChildrenItemType[] = [];
          item?.childrens.map((subItem: ChildrenItemType) => {
            arr.push({
              title: subItem.title,
              code: subItem.code,
            });
          });
          obj.childrens = arr;
          this.filtered.push(obj);
        });
        this.filtered.map((item, index) => {
          this.selectAll(item, temp[index], item.title);
        });
      });
      this.$forceUpdate();
    },

    /** reset Handler that will reset checkboxes and return all selected items */
    resetDataHandler() {
      this.resetAllCheckBox();
      this.$nextTick(() => {
        if (this.resetHandler) {
          this.resetHandler(this.checkedArray);
        }
      });
      this.$forceUpdate();
    },

    /** Save checked array */
    SyncCheckedArray() {
      const filteredClone = structuredClone(this.filtered); //_.cloneDeep(this.filtered);
      const temp: ItemType[] = [];
      filteredClone.forEach((item: ItemType) => {
        item.childrens = item.childrens.filter(
          (child) => child.checked === true
        );
        temp.push(item);
      });
      this.checkedArray = temp;
    },

    /** Close handler for popover */
    handleClose() {
      this.$nextTick(() => {
        this.onClose?.();
      });
    },
  },
});
</script>

<template>
  <CommonPopover
    :visible="visible"
    :position="position"
    @close="handleClose"
  >
    <div
      :style="styleProps"
      :class="$style.dropdown_wrap"
    >
      <ul :class="[$style.parent_item, $style.row]">
        <li
          v-for="(item, index) in filtered"
          :key="index"
          :class="[$style.col_md, $style.custom_padding]"
        >
          <label :class="$style.label_height">
            <h5 :class="$style.font_setting">{{ item.title }}</h5>
          </label>
          <ul :class="$style.child_item">
            <li
              v-for="(subItem, index2) in item.childrens"
              :key="`${index2}-${index}`"
            >
              <label
                :for="`dropdown-input-${index}-${index2}-${id}`"
                @mouseup="toggleCheckValue(item, subItem, index)"
              >
                <input
                  :id="`dropdown-input-${index}-${index2}-${id}`"
                  v-model="subItem.checked"
                  type="checkbox"
                  :value="JSON.stringify(subItem)"
                  :checked="subItem.checked"
                />
                <div :class="$style.checkbox_custom"></div>
                <div v-if="subItem.image">
                  <img
                    :src="subItem.image"
                    alt=""
                  />
                </div>
                {{ subItem.title }}
              </label>
            </li>
          </ul>
          <span
            v-show="index != items.length - 1"
            :class="$style.vertical_line"
          ></span>
        </li>
      </ul>
      <div
        :class="[
          $style.buttons_custom,
          $style.w_100,
          $style.align_items_center,
          $style.d_flex,
          $style.justify_content_between,
        ]"
      >
        <div :class="[$style.all_select_list, $style.reset_styles]">
          <div
            :class="$style.reset_btn_styles"
            @click="resetDataHandler()"
          >
            Reset to Default
          </div>
        </div>
        <div>
          <CtaButton
            :click-handler="applyHandlerMethod"
            color-type="blue-fill"
          >
            <span>Apply</span>
          </CtaButton>
        </div>
      </div>
    </div>
  </CommonPopover>
</template>

<style lang="scss" module scoped>
@import "./double-dropdown.module";
</style>
