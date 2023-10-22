const config = {
  ...require("../../prettier.config.js"),
  plugins: ["prettier-plugin-tailwindcss"],
  pluginSearchDirs: false,
};

module.exports = config;
