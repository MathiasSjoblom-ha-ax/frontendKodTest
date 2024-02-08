describe("Test cases for API application",  () => {
    beforeEach('Visit the only page avalible', () => {
        cy.visit('http://localhost:4200')
    })

    it('Contains first and last fund name from API', () => {
        cy.contains('BlackRock GF Euro Bond Fund A2 EUR')
        cy.contains('Ålandsbanken Sverige Aktie B')
    })

    it('Site contains the searched word', () => {
        //String to change the text entered into the search input
        const testString = "BlackRock"
    
        cy.get('.searchInput')
          .type(testString)
          .should('have.value', testString);
        cy.contains("BlackRock GF Euro Bond Fund A2 EUR");
        cy.contains("BlackRock Global Funds - World Gold A2 USD");
    });
})