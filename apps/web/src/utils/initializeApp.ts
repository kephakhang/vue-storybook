import type { EmdnIconKey } from "icons";
import { type Component, type App, createApp } from "vue";
import type { VueHotjarUseOptions } from "vue-hotjar";

import { type SalesonContext, useServerConfigStore } from "../common/hooks";

export const frameIcons: EmdnIconKey[] = [
  "emdn:cycle-time-alert",
  "emdn:data-request",
  "emdn:detachment-alert",
  "emdn:disconnection-alert",
  "emdn:emoldino-logo-color",
  "emdn:history-log",
  "emdn:machine-downtime-alert",
  "emdn:maintenance-alert",
  "emdn:note",
  "emdn:refurbishment-alert",
  "emdn:relocation-alert",
  "emdn:unread",
  "emdn:user-access",
  "emdn:work-order",
  "emdn:mobile-download-link",
  "emdn:mobile-download-link-hover",
];

export async function initializeApp(
  rootComponent: Component,
  options?: {
    pinia?: boolean;
    vueQuery?: boolean;
    hotjar?: boolean;
    setAttribute?: boolean;
    virtualScroller?: boolean;
    emdnIcons?: EmdnIconKey[];
  }
) {
  const { pinia, vueQuery, hotjar, setAttribute, virtualScroller, emdnIcons } =
    {
      pinia: options?.pinia ?? true,
      vueQuery: options?.vueQuery ?? true,
      hotjar: options?.hotjar ?? true,
      setAttribute: options?.setAttribute ?? true,
      virtualScroller: options?.virtualScroller ?? true,
      emdnIcons: options?.emdnIcons ?? [],
    };

  const app = createApp(rootComponent);
  if (pinia) {
    const { createPinia } = await import("pinia");
    const pinia = createPinia();
    app.use(pinia);
  }

  if (virtualScroller) {
    const { default: VueVirtualScroller } = await import(
      "vue-virtual-scroller"
    );
    app.use(VueVirtualScroller, {});
  }

  if (vueQuery) {
    const { VueQueryPlugin } = await import("@tanstack/vue-query");
    app.use(VueQueryPlugin);
  }

  if (hotjar && import.meta.env.PROD) void initHotjar(app);

  if (setAttribute && pinia) await initServerConfigStore();

  if (emdnIcons.length > 0) {
    void registerIconComponent(app);
    try {
      const { addEmdnIcons } = await import("icons");
      await addEmdnIcons(emdnIcons);
    } catch (error) {
      console.error("Failed to add icons", emdnIcons, error);
      throw error;
    }
  }

  app.mount("#app");
}

async function initHotjar(app: App<Element>) {
  const hotjarOption: VueHotjarUseOptions = {
    id: "2784473",
    snippetVersion: 6,
  };
  const module = await import("vue-hotjar");
  app.use(module.default, hotjarOption);
}

async function registerIconComponent(app: App<Element>) {
  try {
    const { Icon } = await import("@iconify/vue");
    app.component("IconifyIcon", Icon);
  } catch (error) {
    console.warn(
      "Failed to register Icon component from `@vue/iconify`.",
      error
    );
  }
}

async function initServerConfigStore() {
  const appElement = document.getElementById("app");
  if (import.meta.env.DEV) {
    try {
      const module = await import("~/common/api/__mock__/salesonContext.json");
      appElement?.setAttribute("customerName", "production");
      appElement?.setAttribute(
        "saleson-context",
        JSON.stringify(module.default)
      );
    } catch (error) {
      console.error('Failed to load "salesonContext.json"');
    }
  }

  const salesonContextJson = appElement?.getAttribute("saleson-context");
  const salesonContext = salesonContextJson
    ? (JSON.parse(salesonContextJson) as SalesonContext)
    : null;
  const customerName = appElement?.getAttribute("customer-name");
  const samlIdp = appElement?.getAttribute("saml-idp");

  const store = useServerConfigStore();
  store.setServerConfig({
    salesonContext,
    customerName,
    samlIdp,
  });
}
