import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import { VueQueryPlugin } from "@tanstack/vue-query";

import theme from "./theme";
import "./index.scss";

import FloatingVue from "floating-vue";
Vue.use(FloatingVue);
FloatingVue.options.themes = {
  ...FloatingVue.options.themes,
  light: { $extend: "dropdown" },
  dark: { $extend: "dropdown" },
};

Vue.use(VueCompositionAPI);
Vue.use(VueQueryPlugin);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme,
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Introduction", "Common"],
      locales: "en-US",
    },
  },
};

export const decorators = [
  (story) => ({
    components: { story },
    template: `
      <div style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif">
        <story />
      </div>
    `,
  }),
];
