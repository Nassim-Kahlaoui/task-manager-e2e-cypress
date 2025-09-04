/// <reference types="cypress" />
import creds from '../../fixtures/data.json'

describe('Auth - Login', () => {
  it('Login with saved creds', () => {
    cy.login(creds.user.email, creds.user.password)
    cy.location('pathname', { timeout: 10000 }).should('match', /dashboard|tasks|home/i)
  })
})
