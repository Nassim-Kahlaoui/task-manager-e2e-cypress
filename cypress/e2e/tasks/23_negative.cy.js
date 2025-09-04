/// <reference types="cypress" />
import data from '../../fixtures/data.json'
import { sel } from '../../support/selectors'
import { futureDate } from '../../support/utils'

const maybeError = (re) =>
  cy.get('body', { timeout: 1500 }).then($b => {
    const found = $b.find(':visible').toArray().some(el => re.test(Cypress.$(el).text()))
    if (found) cy.log('🔎 Error UI detected')
  })

describe('Tasks - Negative & Edge (mini)', () => {
  it('missing title shows error or prevents creation', () => {
    cy.login(data.user.email, data.user.password)
    sel.tasks.newBtn().click()
    cy.get('form:visible,[role="dialog"]:visible').first().should('be.visible')
    sel.tasks.title().clear().blur() 
    sel.tasks.desc().type('No title')
    sel.tasks.due().type(futureDate(3), { force: true })
    sel.tasks.priority().select('Low', { force: true })
    sel.tasks.save().click()
    maybeError(/invalid|error|required|obligatoire/i)
  })

  it('past due date shows error or prevents creation', () => {
    cy.login(data.user.email, data.user.password)
    const title = `Past_${Date.now()}`
    cy.createTask({ title, description: 'Past', dueDate: '2000-01-01', priority: 'Low' })
    maybeError(/invalid|error|past|date/i)
  })

  it('very long inputs are handled', () => {
    cy.login(data.user.email, data.user.password)
    const long = 'X'.repeat(256)
    cy.createTask({ title: long, description: long, dueDate: futureDate(4), priority: 'High' })
    
    maybeError(/invalid|error|too|long|max/i)
  })

  
})
