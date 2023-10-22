import { addons } from "@storybook/addons";
import theme from "./theme";

addons.setConfig({
  theme,
  isFullscreen: false,
  showPanel: true,
  showNav: true,
  panelPosition: "right",
});
