/// <reference types="cypress" />

describe('empty spec', () => {
  it('renders the app with title', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('span').contains('Kahoot! POINTS');
  });

  it('displays empty text on the score panel', () => {

  })
})