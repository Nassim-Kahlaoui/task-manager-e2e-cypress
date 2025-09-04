// cypress/support/commands.js
import { sel } from './selectors'

// ---- Auth ----
Cypress.Commands.add('registerUser', ({ username, email, password }) => {
  cy.visit('/auth/register')
  sel.register.username().clear().type(username)
  sel.register.email().clear().type(email)
  sel.register.password().clear().type(password)
  sel.register.submit().click()
})

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/auth/login')
  sel.login.email().clear().type(email)
  sel.login.password().clear().type(password)
  sel.login.submit().click()
})

Cypress.Commands.add('loginNegative', ({ email, password }) => {
  cy.intercept('POST', '**/auth/login').as('loginFail')
  cy.visit('/auth/login')
  sel.login.email().clear().type(email)
  sel.login.password().clear().type(password)
  sel.login.submit().click()
  cy.wait('@loginFail').its('response.statusCode').should('be.oneOf', [400, 401])
  cy.location('pathname').should('include', '/auth/login')
})

Cypress.Commands.add('logout', () => {
  cy.intercept('POST', '**/auth/logout').as('logoutReq')
  sel.navbar.panel().then($p => { if ($p.is(':hidden')) sel.navbar.toggle().click({ force: true }) })
  sel.navbar.logout().click({ force: true })
  cy.wait('@logoutReq').its('response.statusCode').should('be.oneOf', [200, 204])
  cy.location('pathname', { timeout: 10000 }).should(p => expect(/login|auth|signin/i.test(p) || Cypress.$('[name="email"], input[type="email"]').length > 0).to.be.true)

})

// ---- Tasks ----

Cypress.Commands.add('createTask', ({ title, description, dueDate, priority }) => {
  sel.tasks.newBtn().click()
  if (title !== undefined)     sel.tasks.title().clear().type(title)
  if (description !== undefined) sel.tasks.desc().clear().type(description)
  if (dueDate !== undefined)   sel.tasks.due().clear().type(dueDate, { force: true })
  if (priority !== undefined)  sel.tasks.priority().select(priority, { force: true })
  sel.tasks.save().click()
  if (title) sel.tasks.item(title).should('exist')
})


Cypress.Commands.add('openTask', (title) => {
  sel.tasks.item(title).should('exist').click()
})

Cypress.Commands.add('editTask', (oldTitle, updates = {}) => {
  sel.tasks.item(oldTitle).should('exist').click()
  if (updates.title)       sel.tasks.title().clear().type(updates.title)
  if (updates.description) sel.tasks.desc().clear().type(updates.description)
  if (updates.dueDate)     sel.tasks.due().clear().type(updates.dueDate, { force: true })
  if (updates.priority)    sel.tasks.priority().select(updates.priority, { force: true })
  sel.tasks.save().click()

  if (updates.title) {
    sel.tasks.item(updates.title).should('exist')
    cy.contains(
      '[data-testid="task-item"], [data-test="task-item"], [role="listitem"], li, article, .card, .task-item, .list-item',
      oldTitle
    ).should('not.exist')
  }
})

Cypress.Commands.add('toggleTask', (title) => {
  
  sel.tasks.item(title).should('exist').then($item => {
    const cb = $item.find('input[type="checkbox"], [role="checkbox"], [role="switch"]').filter(':visible').get(0)
    cb ? cy.wrap(cb).click({ force: true }) : cy.wrap($item).click('left', { force: true })
  })
})

Cypress.Commands.add('deleteTask', (title) => {
  sel.tasks.item(title).should('exist').click()
  sel.tasks.deleteBtn().click({ force: true })
  cy.contains(
    '[data-testid="task-item"], [data-test="task-item"], [role="listitem"], li, article, .card, .task-item, .list-item',
    title
  ).should('not.exist')
})
