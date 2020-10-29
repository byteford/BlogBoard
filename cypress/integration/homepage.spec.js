/* eslint-disable no-undef */
/* globals Cypress cy */
describe('CI test for homepage', () => {
  // refactor with a beforeEach for cy.visit command
  it('should open the homepage and display the navbar', () => {
    cy.visit(Cypress.env('HOST'));
    cy.get('.navbar').should('be.visible');
  });

  it('should open the homepage and blog links should be displayed', () => {
    cy.visit(Cypress.env('HOST'));
    cy.get('[href="/blog/milestones"] > h2').should('have.text', 'milestones');
  });
});
