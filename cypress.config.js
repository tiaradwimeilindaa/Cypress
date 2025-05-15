const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

// const { defineConfig } = require('cypress')

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'https://opensource-demo.orangehrmlive.com',
//     supportFile: 'cypress/support/e2e.js',
//     setupNodeEvents(on, config) {
//       // Add event hooks if needed
//     },
//   },
// })
