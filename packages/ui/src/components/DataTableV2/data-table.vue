<!--
 * Summary. 
 *  Data Table v2 isolated component. 
 * 
 * Description.
 *  This component is a common component, so if you modify it, it can affect everywhere you use this component.
 *  Therefore, modification of this component is prohibited, and if you need to modify it, please ask @deepchain-team.
 *
 * @since      0.3.22-dev-1
 * @access     module
 *
 * @alias    DataTablev2
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
  <div>
    <table id="fifthTable">
      <colgroup>
        <col
          v-if="checkboxes"
          style="width: 10px"
        />
        <col
          v-for="(col, index) in columnWidthArray"
          :key="index"
          :style="{ width: col }"
        />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="(col, index) in columns"
            :key="index"
            @click="sortTable(col)"
          >
            <div v-if="col == 'checkbox' && checkboxes">
              <CheckboxButton
                button-type="checkbox"
                :click-handler="(e) => handleAllCheckboxes(e)"
              />
            </div>
            <div
              v-else-if="col !== 'checkbox'"
              class="heading"
            >
              <span>{{ handleHeading(col) }}</span>
              <div
                v-if="col == sortColumn"
                class="arrow"
                :class="ascending ? 'arrow_up' : 'arrow_down'"
              ></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
        >
          <td
            v-for="(col, index) in columns"
            :key="index"
          >
            <div v-if="col == 'checkbox' && checkboxes">
              <CheckboxButton
                button-type="checkbox"
                :active="row.checkbox"
                :click-handler="(e) => handleEachSelection(e, row)"
              ></CheckboxButton>
            </div>
            <div v-else-if="col !== 'checkbox'">
              <div
                v-if="Array.isArray(row[col])"
                class="arrayDiv"
              >
                <span>{{ row[col][0] }}</span>
                <span>{{ row[col][1] }}</span>
              </div>
              <div v-else>
                <span class="singleDiv">{{ row[col] }}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
// extentions
import { defineComponent, type PropType } from "@vue/composition-api";
import CheckboxButton from "../Checkbox/checkbox-button.vue";
type RowsType = {
  Category: string | string[];
  Division: string;
  NumberOfParts: string;
  ProductionCapacity: string;
};
// @vue/component
export default defineComponent({
  /** Adding checkbox button component */
  components: {
    CheckboxButton,
  },
  props: {
    /** set column width */
    columnWidthArray: Array as PropType<string[]>,

    /** set array of rows */
    rows: Array as PropType<RowsType[]>,

    /** set array for selected rows */
    selectedRows: Array,
    /** set checkbox */
    checkboxes: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      /** set sorting attributes */
      ascending: false,
      sortColumn: "",
    };
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    },
  },
  watch: {
    /** when checkboxes value changes trigger AddCheckBoxes */
    checkboxes(value: boolean) {
      this.AddCheckboxes(value);
    },
  },
  created() {
    /** call AddCheckBoxes when component is created */
    this.AddCheckboxes(this.checkboxes);
  },
  methods: {
    /** if value is true, set all checkbox property of row false */
    AddCheckboxes(value: boolean) {
      if (value) {
        this.rows = this.rows.map((obj) => {
          return { ...{ checkbox: false }, ...obj };
        });
      }
    },

    /** convert a camelCase or PascalCase formatted string
     *  into separate readable format
     */
    handleHeading(word: string) {
      const result = word.replace(/([A-Z])/g, " $1");
      const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
      return finalResult;
    },

    /** if value is true, it will set checkbox property
     *  of all rows in the table to true
     * and updates the this.selectedRows
     * if value is false then set checkbox false
     */
    handleAllCheckboxes(value: boolean) {
      this.rows.map((e) => (e["checkbox"] = value));
      value ? (this.selectedRows = this.rows) : (this.selectedRows = []);
    },

    /** set checkbox of row according to checked and unchecked */
    handleEachSelection(e: boolean, data: RowsType) {
      data.checkbox = !data.checkbox;
      var newSelectedRow = this.rows.filter((data) => data.checkbox == true);
      this.selectedRows = newSelectedRow;
    },

    /** perform sorting of table */
    sortTable: function sortTable(col: string) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.rows.sort(function (a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
    },
  },
});
</script>

<!-- styles -->
<style lang="scss" scoped>
// todo: module
@import "./data-table.module";
</style>
