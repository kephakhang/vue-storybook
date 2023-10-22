import "./style.css";

import { frameIcons, initializeApp } from "~/utils/common";
import App from "./App.vue";

void initializeApp(App, {
  emdnIcons: frameIcons,
});
