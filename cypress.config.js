const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://telnyx.com',
    allowCypressEnv: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});