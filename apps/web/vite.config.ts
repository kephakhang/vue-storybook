import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";

const root = resolve(__dirname, "src/pages");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: "condense",
        },
      },
    }),
    tsconfigPaths({
      loose: true,
      root: __dirname,
    }),
  ],
  root,
  base: "./",
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(root, "main/index.html"),
        login: resolve(root, "login/index.html"),
        demo: resolve(root, "demo/index.html"),
        "user/new": resolve(root, "user/new/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  server: {
    open: "./main/",
  },
});
