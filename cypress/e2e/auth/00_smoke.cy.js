/// <reference types="cypress" />

describe('Smoke', () => {
  beforeEach(() => {
    cy.visit('/')

    
    cy.get('#navbar-default').then($panel => {
      if ($panel.is(':hidden')) {
        cy.get('button[aria-controls="navbar-default"]').click({ force: true })
      }
    })
  })

  it('Home link visible', () => {
    cy.contains('a', /home/i).should('be.visible')
  })

  it('Login link visible', () => {
    cy.contains('a', /login|sign in/i).should('be.visible')
  })

  it('Register link visible', () => {
    cy.contains('a', /register|sign up|create account/i).should('be.visible')
  })
})
