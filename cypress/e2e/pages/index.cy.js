describe('empty spec', () => {
    it('displays the title provided in the .env file', () => {
        cy.visit('/')
        cy.title().should('equal', '123 Test Lane')
    });
});
