import baseConfig from "../../eslint.config.js";

const ignoresConfig = {
  ignores: ["build", 'src/database/**'],
};

const config = [...baseConfig, ignoresConfig];

export default config;
