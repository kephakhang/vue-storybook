require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    "custom",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: {
      ts: "@typescript-eslint/parser",
    },
  },
  rules: {
    "@typescript-eslint/no-empty-function": "off",
    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    "vue/require-default-prop": "off",
  },
};
