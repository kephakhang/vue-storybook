const config = require("tailwind-config-custom");

module.exports = {
  extends: ["custom/vue", "plugin:tailwindcss/recommended"],
  rules: {
    "vue/require-default-prop": "error",
    "tailwindcss/no-custom-classname": ["warn", { config }],
    "tailwindcss/classnames-order": ["warn", { config }],
  },
  overrides: [
    {
      files: ["*.html"],
      rules: {
        "vue/comment-directive": "off",
      },
    },
  ],
};
