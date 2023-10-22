import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/vue-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    {
      name: getAbsolutePath("@storybook/addon-essentials"),
      options: {
        backgrounds: false,
      },
    },
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: getAbsolutePath("@storybook/vue-vite"),
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
