// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl: process.env.APP_URL || 'https://significant-darcey-kwikicity-3dda52ea.koyeb.app',
    setupNodeEvents(on, config) {
     
      if (config.reporter === 'cypress-mochawesome-reporter') {
        require('cypress-mochawesome-reporter/plugin')(on)
      }
      return config
    },
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'index',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true  
  }
})
