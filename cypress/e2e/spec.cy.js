describe('Login form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/messenger/login')
  })

  it('should fill the email input field', () => {
    cy.get('#email')
      .type('sidjp05@gmail.com')
      .should('have.value', 'sidjp05@gmail.com')
  })
  it('should fill the password input field', () => {
    cy.get('#password')
      .type('123123')
      .should('have.value', '123123')

  })

  it('should submit the form with valid email and password', () => {
    cy.get('#email').type('sidjp05@gmail.com')
    cy.get('#password').type('123123')
    cy.get('input[type="submit"]').click()
    // Add assertions to verify that the user is logged in or redirected to the next page
  })
})
