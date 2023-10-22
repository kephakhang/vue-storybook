import config from "tailwind-config-custom";

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [...config.content, "../../packages/@emdn/ui/src/**/*.{js,ts,vue}"],
};
