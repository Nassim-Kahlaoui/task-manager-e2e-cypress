import creds from '../../fixtures/data.json'

describe('Auth - Login Negative', () => {
  it('Refuse invalid password', () => {
    cy.loginNegative({
      email: creds.user.email,       
      password: 'Wro!12345'        
    })
  })

  it('Refuse invalid email', () => {
    cy.loginNegative({
      email: 'n' + creds.user.email, 
      password: creds.user.password      
    })
  })
})