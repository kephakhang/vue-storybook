// Packages or modules
import { VueQueryPlugin } from "@tanstack/vue-query";
import Vue from "vue";

Vue.use(VueQueryPlugin);

import FloatingVue from "floating-vue";
Vue.use(FloatingVue);
FloatingVue.options.themes = {
  ...FloatingVue.options.themes,
  light: { $extend: "dropdown" },
  dark: { $extend: "dropdown" },
};

export * as VueCompositionAPI from "@vue/composition-api";
export { default as SearchJS } from "../assets/js/search.js";

// *************
// * Components
// *************

export { default as Accordion } from "./components/Accordion/accordion.vue";
export { default as AlertBox } from "./components/Alertbox/alert-box.vue";
export { default as GoogleMapProvider } from "./components/GoogleMapProvider/index.vue";
export { default as GoogleMap } from "./components/GoogleMap/index.vue";
export { default as BingMapProvider } from "./components/BingMapProvider/index.vue";
export { default as BingMap } from "./components/BingMap/index.vue";
export { default as Calendar } from "./components/Calendar/index.vue";
export { default as ContentModal } from "./components/ContentModal/index.vue";
export { default as CtaButton } from "./components/Button/cta-button.vue";
export { default as DotSpinner } from "./components/Spinner/dot-spinner.vue";
export { default as LineSpinner } from "./components/Spinner/line-spinner.vue";
export { default as MasterFilter } from "./components/MasterFilter/index.vue";
export { default as ProgressBar } from "./components/ProgressBar/progress-bar.vue";
export { default as TableActionbarButton } from "./components/ActionBar/table-actionbar-button.vue";
export { default as TimelineStepper } from "./components/TimelineStepper/TimelineStepper.vue";
export { default as Widget } from "./components/Widget/widget.vue";
export { default as WidgetArea } from "./components/WidgetGroup/widget-area.vue";
export { default as WidgetGroup } from "./components/WidgetGroup/widget-group.vue";
export { default as Portal } from "./components/Portal/portal.vue";
export { default as UserToken } from "./components/UserToken/user-token.vue";

// charts
export { default as CheckboxButton } from "./components/Checkbox/checkbox-button.vue";
export { default as CheckList } from "./components/Checkbox/check-list.vue";
export { default as Chips } from "./components/Chips/chips.vue";
export { default as CustomList } from "./components/CustomList/custom-list.vue";
export { default as DataTable } from "./components/Datatable/data-table.vue";
export { default as DataTablev2 } from "./components/DataTableV2/data-table.vue";
export { default as DataTableV3 } from "./components/DataTableV3/data-table.vue";
export { default as DoubleDropdown } from "./components/Dropdown/double-dropdown/double-dropdown.vue";
export { default as Dropdown } from "./components/Dropdown/single-dropdown/dropdown.vue";
export { default as OverallXYChart } from "./components/Chart/amcharts5/overall-xy/index.vue";
export { default as PieChart } from "./components/Chart/amcharts5/pie/index.vue";
export { default as XYChart } from "./components/Chart/amcharts5/xy/index.vue";
export { default as ChartLegend } from "./components/Chart/amcharts5/legend/index.vue";
export { default as HeatmapChart } from "./components/Chart/amcharts5/heatmap/index.vue";

// form
export { default as InputIpAddress } from "./components/Form/input-ip-address.vue";
export { default as InputNumber } from "./components/Form/input-number.vue";
export { default as InputText } from "./components/Form/input-text.vue";
export { default as TableInput } from "./components/TableInput/table-input.vue";
export { default as Textarea } from "./components/Form/text-area.vue";

// icon button
export { default as Icon } from "./components/Icon/icon.vue";
export { default as IconButton } from "./components/IconButton/icon-button.vue";
export { default as ListGroup } from "./components/ListGroup/list-group.vue";
export { default as ListItem } from "./components/ListItem/list-item.vue";
export { default as Modal } from "./components/Modal/modal.vue";
export {
  NotificationRoot,
  NotificationIconButton,
  NotificationDrawer,
  NotificationHistoryLog,
} from "./components/Notification";
export { default as Onboarding } from "./components/Onboarding/onboarding.vue";
export { default as Popover } from "./components/Popover/popover.vue";
export { default as SearchBar } from "./components/SearchBar/search-bar.vue";
export { default as Slider } from "./components/Slider/main.vue";
export { default as Snackbar } from "./components/SnackBar/snackbar.vue";
export { default as TableStatus } from "./components/TableStatus/table-status.vue";
export { default as TableStatusChip } from "./components/TableStatusChip/table-status-chip.vue";

// tabs
export { default as ListSearchBar } from "./components/ListSearchBar/list-search-bar.vue";
export { default as Pagination } from "./components/Pagination/pagination.vue";
export { default as TabButton } from "./components/TabButton/tab-button.vue";
export { default as TabIcon } from "./components/TabIcon/tab-icon.vue";
export { default as TabModule } from "./components/TabModule/tab-module.vue";
export { default as TabNumber } from "./components/TabNumber/tab-number.vue";
export { default as TabOverview } from "./components/TabOverview/tab-overview.vue";
export { default as TimePicker } from "./components/TimePicker/time-picker.vue";
export { default as ToggleButton } from "./components/ToggleButton/toggle-button.vue";
export { default as Tooltip } from "./components/Tooltip/tool-tip.vue";
export { default as TooltipV2 } from "./components/TooltipV2/tooltip.vue";
export { default as TooltipFloatingVue } from "./components/TooltipFloatingVue/index.vue";

// new dropdown
export { default as DropdownRoot } from "./components/DropdownV2/components/dropdown-root.vue";
export { default as DropdownContent } from "./components/DropdownV2/components/dropdown-content.vue";
export { default as DropdownTrigger } from "./components/DropdownV2/components/dropdown-trigger.vue";
export { default as DropdownPortal } from "./components/DropdownV2/components/dropdown-portal.vue";
export { default as DropdownItem } from "./components/DropdownV2/components/dropdown-item.vue";

// pages
export { default as ProcessChangeContent } from "./pages/ProcessChange/ProcessChangeContent.vue";
export { default as PartQualityRiskContent } from "./pages/PartQualityRisk/PartQualityRiskContent.vue";
