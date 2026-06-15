const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'e34bcf03-667a-4cac-9251-547f081c56f6',

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