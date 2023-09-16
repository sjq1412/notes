describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('the login form can be opened', function () {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()

    cy.get('#username').type('sarah')
    cy.get('#password').type('mypassword')

    cy.get('#login-button').click()
    cy.contains('Sarah Jane logged in')
  })
})