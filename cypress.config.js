const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'nm34us',

  e2e: {
    baseUrl: 'https://telnyx.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',

    viewportWidth: 1280,
    viewportHeight: 800,

    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,

    retries: {
      runMode: 2,
      openMode: 0,
    },

    screenshotOnRunFailure: true,
    video: false,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});