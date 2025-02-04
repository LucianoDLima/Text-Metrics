describe('Hero component', () => {
  it('should render the hero', () => {
    cy.visit('http://localhost:5173');

    cy.get('[data-testid="hero-title"]')
      .should('be.visible')
      .should('have.text', 'Analyze your text in real-time.');
  });
});
