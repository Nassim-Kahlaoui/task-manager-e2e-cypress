/// <reference types="cypress" />
import creds from '../../fixtures/data.json'
import { futureDate } from '../../support/utils'

describe('Tasks - Edit & Toggle', () => {
  it('Edit title then toggle', () => {
    const t1 = `Task_${Date.now()}`
    const t2 = `${t1}_edited`
    cy.login(creds.user.email, creds.user.password)
    cy.createTask({ title: t1, description: 'D', dueDate: futureDate(4), priority: 'Low' })
    cy.editTask(t1, { title: t2, priority: 'High' })
    cy.contains(t2).should('be.visible')
    cy.toggleTask(t2)
    cy.contains(t2).should('be.visible')
  })
})
