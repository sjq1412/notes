describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Sarah Jane',
      username: 'sarah',
      password: 'mypassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
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

  describe('when a user is logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')

      cy.contains('log in').click()

      cy.get('#username').type('sarah')
      cy.get('#password').type('mypassword')

      cy.get('#login-button').click()
      cy.contains('Sarah Jane logged in')
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()

      cy.get('#note-textbox').type('A Note Created by Cypress')
      cy.contains('save').click()

      cy.contains('A Note Created by Cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('#note-textbox').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress').contains('make not important').click()
        cy.contains('another note cypress').contains('make important')
      })
    })
  })
})

