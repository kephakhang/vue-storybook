import "./style.css";

import App from "./App.vue";
import { initializeApp } from "~/utils/common";

initializeApp(App).catch((error) =>
  console.error("Failed to initialize app", error)
);
