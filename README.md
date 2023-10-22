# eMoldino Frontend

This is an monorepo for eMoldino using Turborepo.

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `web`: Multiple page app using [vite](https://vitejs.dev)
- `ui`: a stub component & utility library shared by applications
- `eslint-config-custom`: shared `eslint` configurations
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Migration Guide

If you're using old version (emlodino-ui-components), check this [Migration Guide](https://docs.google.com/presentation/d/1wGHsS03W1hZt5AKlC6Zac_6kP_pkYP5aYqZZYVAbM7A/edit#slide=id.p).

## Project setup

You should use `pnpm` and `turbo` for this project.

Install these packages using this command.

```sh
npm i -g pnpm turbo
pnpm install
```

## Build UI component

To build library like old version, build like this.

```sh
turbo build:ui
```

## Run storybook in development mode

```sh
turbo storybook
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [VS Code Lint setting](https://eslint.vuejs.org/user-guide/#visual-studio-cod) Guide lint enable on vscode

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
