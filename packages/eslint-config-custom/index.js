module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
      ],
      files: ["./**/*.{ts,tsx,vue}"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
          "../../apps/web/tsconfig.json",
          "../../packages/*/tsconfig.json",
          "../../packages/@emdn/ui/tsconfig.json",
        ],
      },
      rules: {
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-misused-promises": [
          "error",
          { checksVoidReturn: false },
        ],
      },
    },
  ],
};
