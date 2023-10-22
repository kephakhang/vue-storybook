import { resolve } from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import tsconfigPaths from "vite-tsconfig-paths";

import { version } from "./package.json";

const processArgs = process.argv;
const index = processArgs.indexOf("--mode");
const isStaticMode = processArgs[index + 1] === "static";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    tsconfigPaths({
      root: __dirname,
      loose: true,
    }),
  ],
  define: {
    "process.env": {},
  },
  // TODO(sun.lee): Remove alias after the vite-tsconfig-paths/issues/30 fixed. https://github.com/emoldino/emoldino-ui-components/issues/328
  resolve: {
    alias: [
      {
        find: "~",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "~assets",
        replacement: resolve(__dirname, "assets"),
      },
    ],
  },
  build: {
    outDir: isStaticMode ? `dist/${version}` : "dist",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "EmoldinoComponents",
      fileName: "@emoldino/components",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
