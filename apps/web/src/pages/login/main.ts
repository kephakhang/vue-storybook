import "./style.css";

import { initializeApp } from "~/utils/common";
import App from "./App.vue";

initializeApp(App, {
  pinia: false,
  setAttribute: false,
}).catch((error) => console.error("Failed to initialize app", error));
