import { defineStore } from "pinia";

export type SalesonContext = {
  ssoLogin: boolean;
  menuTree: MenuTree;
  currentCategoryMenu: Menu;
  currentFunctionMenu: Menu;
  menu?: Menu;
  oveview?: Menu;
  firstAdminMenu?: Menu;
  firstSupportMenu?: Menu;
  firstInsightMenu?: Menu;
  firstReportMenu?: Menu;
  alertMenu?: Menu;
  oeeMenu?: Menu;
};

export type Menu = {
  id?: string;
  path?: string;
  name: string;
  type: "CATEGORY" | "FUNCTION" | "UTILITY" | "SUBFUNCTION";
  url?: string;
  icon?: string;
  active: boolean;
  enabled: boolean;
  children?: Menu[];
};

type MenuTree = {
  content: Menu[];
  totalElements: number;
};

type ServerConfigState = {
  customerName: string | null;
  samlIdp: string | null;
  salesonContext: SalesonContext | null;
};

export const useServerConfigStore = defineStore("serverConfig", {
  state: (): ServerConfigState => ({
    customerName: null,
    samlIdp: null,
    salesonContext: null,
  }),
  actions: {
    setServerConfig({
      customerName,
      samlIdp,
      salesonContext,
    }: {
      customerName?: string | null;
      samlIdp?: string | null;
      salesonContext?: SalesonContext | null;
    }) {
      if (customerName !== undefined) this.customerName = customerName;
      if (samlIdp !== undefined) this.samlIdp = samlIdp;
      if (salesonContext !== undefined) this.salesonContext = salesonContext;
    },
  },
});
