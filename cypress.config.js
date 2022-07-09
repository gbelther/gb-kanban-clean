const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'tests/cypress/e2e',
    fileServerFolder: 'tests/cypress',
    fixturesFolder: 'tests/cypress/fixtures',
    supportFolder: 'tests/cypress/support',
    specPattern: 'tests/cypress/e2e/**/*.cy.{ts,tsx}',
  },
});
