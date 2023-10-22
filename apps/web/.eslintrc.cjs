module.exports = {
  root: true,
  extends: ["custom/vue3", "plugin:@tanstack/eslint-plugin-query/recommended"],
  rules: {
    "@tanstack/query/exhaustive-deps": "warn",
  },
};
