import './commands'
import 'cypress-mochawesome-reporter/register';

afterEach(function () {
  if (this.currentTest && this.currentTest.state === 'passed') {
    const name = this.currentTest.fullTitle().replace(/[^\w-]+/g, '_');
    cy.screenshot(name, { capture: 'viewport' });
  }
});


Cypress.on('uncaught:exception', (err, runnable) => {
  console.warn('Uncaught exception ignored:', err.message)
  return false
})