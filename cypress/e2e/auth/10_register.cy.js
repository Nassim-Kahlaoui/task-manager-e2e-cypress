/// <reference types="cypress" />
import { futureDate } from '../../support/utils'
import tasks from '../../fixtures/tasks.json'

describe('Auth - Register', () => {
  it('Create account -> Login -> Save creds (+create task)', () => {
    const ts = Date.now()
    const username = `nassim_${ts}`
    const email    = `nassim.qa+${ts}@mail.test`
    const password = 'Nassim!12345'
    const dataPath = `${Cypress.config('projectRoot')}/cypress/fixtures/data.json`

    const base = tasks.sample
    const title = `${base.title}_${ts}`
    const description = base.description
    const dueDate = futureDate(5)
    const priority = base.priority

    cy.intercept('POST', '**/api/auth/register').as('register')
    cy.intercept('POST', '**/api/auth/login').as('login')

    cy.registerUser({ username, email, password })
    cy.wait('@register').its('response.statusCode').should('be.oneOf', [200, 201])

    cy.login(email, password)
    cy.wait('@login').its('response.statusCode').should('be.oneOf', [200, 201])

    cy.createTask({ title, description, dueDate, priority })
    cy.contains(title).should('be.visible')

    cy.writeFile(dataPath, { user: { username, email, password } })
  })
})
