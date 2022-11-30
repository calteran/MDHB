// Test that [path] page loads and displays modules correctly

const paths = [
    { path: '/appliances', name: 'Appliances', modules: 14 },
    { path: '/utilities', name: 'Utilities', modules: 17 },
    { path: '/wifi', name: 'Wifi & Technology', modules: 16 },
    { path: '/security', name: 'Access & Security', modules: 15 },
    { path: '/contact', name: 'Emergency Contacts', modules: 17 },
    { path: '/hello', name: 'Arrival & Departure', modules: 13 },
    { path: '/neighborhood', name: 'The Neighborhood', modules: 15 },
];

describe('[path] pages', () => {
    it('loads for each valid path', () => {
        paths.forEach(path => {
            cy.visit(path.path);
            cy.get('h1').should('have.text', path.name);
        });
    });

    it('responds with a 404 for an invalid path', () => {
        cy.request({url: '/invalid-path', failOnStatusCode: false}).its('status').should('eq', 404);
        cy.visit('/invalid-path', {failOnStatusCode: false});
        cy.get('h1').should('have.text', '404');
    });

    it('shows the correct modules for each path', () => {
        let pageCount = 0;
        paths.forEach(path => {
            pageCount++;
            cy.visit(path.path);
            cy.get('h3').should('have.text', `This is on page ${pageCount}`);
            cy.get('div.mdhb-module').should('have.length', path.modules);
        });
    });
});
