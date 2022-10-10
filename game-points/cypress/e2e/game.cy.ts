/// <reference types="cypress" />

describe('empty spec', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5173/');
  })

  it('renders the app with title', () => {
    cy.get('[data-test=game-app]').contains('Kahoot! POINTS');
    cy.get('[data-test=game-app]').contains('PLAYER ITEMS');
    cy.get('[data-test=game-item]').should('have.length', 5);
    cy.get('[data-test=score-panel]').contains('Start the game by clicking on the tiles!');
  });

  it('clicking on game items shall start displaying score', () => {
    cy.get('[data-test=game-item]').first().click();
    cy.get('[data-test=score-panel]').should('not.contain', 'Start the game by clicking on the tiles!')
    cy.get('[data-test=game-score').should('contain', '50')
  })

  it('clicking on game items shall start displaying score', () => {
    cy.get('button').contains('New game').click();
    cy.get('[data-test=game-item]').first().click();
    cy.get('[data-test=game-item]').first().click();
    cy.get('[data-test=game-item]').first().click();
    cy.get('[data-test=game-score').should('contain', '200')
    cy.get('[data-test=game-bonus').should('contain', '50')
  })

  it('clicking new game shall reset the score', () => {
    cy.get('button').contains('New game').click();
    cy.get('[data-test=game-score').should('contain', '0')
    cy.get('[data-test=game-bonus').should('contain', '0')
  })
})