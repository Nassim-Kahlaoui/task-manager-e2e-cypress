/// <reference types="cypress" />
import creds from '../../fixtures/data.json'
import { futureDate } from '../../support/utils'

describe('Tasks - Create', () => {
  it('Create task and see it', () => {
    const title = `Task_${Date.now()}`
    cy.login(creds.user.email, creds.user.password)
    cy.createTask({ title, description: 'Quick', dueDate: futureDate(3), priority: 'Low' })
    cy.contains(title).should('be.visible')
  })
})
