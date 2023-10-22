import logoEmoldino from "../assets/main_logo_black.png";
import { create } from "@storybook/theming/create";

export default create({
  base: "light",
  brandTitle: "Emoldino Components Guide",
  brandUrl: "https://dev.emoldino.com",
  brandImage: logoEmoldino,
  brandTarget: "_blank",

  // Toolbar default and active colors
  barTextColor: "#ffffff",
  barSelectedColor: "#3491FF",
  barBg: "#081222",

  // Typography
  fontBase: '"Helvetica Neue", sans-serif',
  fontCode: "monospace",
});
