import "./style.css";

import App from "./App.vue";
import { frameIcons, initializeApp } from "~/utils/common";

initializeApp(App, {
  emdnIcons: frameIcons,
}).catch((error) => console.error("Failed to initialize app", error));
