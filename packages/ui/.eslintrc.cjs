module.exports = {
  root: true,
  extends: [
    "custom/vue",
    "plugin:storybook/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "warn",
  },
  globals: {
    Microsoft: false,
    google: false,
  },
};
