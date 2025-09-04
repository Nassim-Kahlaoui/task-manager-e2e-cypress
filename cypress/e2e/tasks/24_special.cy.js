/// <reference types="cypress" />
import data from '../../fixtures/data.json'
import { futureDate } from '../../support/utils'

describe('Tasks - Special Characters', () => {
  it('stores & displays special chars', () => {
    const title = `Spec_€_✓_${Date.now()}`
    cy.login(data.user.email, data.user.password)
    cy.createTask({ title, description: '£_@_#_*_()', dueDate: futureDate(5), priority: 'High' })
    cy.contains(title, { includeShadowDom: true, timeout: 10000 }).should('be.visible')
  })
})
