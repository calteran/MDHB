describe('home page', () => {
    it('has the title provided in the .env file', () => {
        cy.visit('/')
        cy.title().should('equal', '123 Test Lane')
    });

    it('has the correct description', () => {
        cy.visit('/')
        cy.get('meta[name="description"]').should('have.attr', 'content', 'Digital House Binder for 123 Test Lane')
    });

    it('has the correct favicon', () => {
        cy.visit('/')
        cy.get('link[rel="icon"]').should('have.attr', 'href', '/favicon.ico')
    });

    it('has the correct header', () => {
        cy.visit('/')
        cy.get('h1').should('have.text', 'Welcome to 123 Test Lane')
    });

    it('has the correct footer', () => {
        cy.visit('/')
        cy.get('footer').should('have.text', 'Powered by My Digital Home Binder.')
    });

    it('has the correct links', () => {
        cy.visit('/')
        cy.get('ul').should('have.text', 'AppliancesUtilitiesWifi & TechnologyAccess & SecurityEmergency ContactsArrival & DepartureThe Neighborhood')
    });
});
