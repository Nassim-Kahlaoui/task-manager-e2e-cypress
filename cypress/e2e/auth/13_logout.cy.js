/// <reference types="cypress" />
import creds from '../../fixtures/data.json'

describe('Auth - Logout', () => {
  it('User can logout', () => {
    cy.login(creds.user.email, creds.user.password)
    cy.logout()
  })
})
