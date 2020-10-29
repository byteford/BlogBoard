/* eslint-disable no-undef */
/* globals Cypress cy */
describe('CI test', () => {
  // refactor with a beforeEach for cy.visit command
  it('should run a test', () => {
    cy.visit(Cypress.env('HOST'));
  });
});
