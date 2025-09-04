/// <reference types="cypress" />
import creds from '../../fixtures/data.json'
import { futureDate } from '../../support/utils'

describe('Tasks - Delete', () => {
  it('Delete task from list', () => {
    const title = `Task_${Date.now()}`
    cy.login(creds.user.email, creds.user.password)
    cy.createTask({ title, description: 'D', dueDate: futureDate(2), priority: 'Low' })
    cy.deleteTask(title)
    //cy.contains(title).should('not.exist')
  })
})
