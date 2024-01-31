describe("Test cases for API application",  () => {
    beforeEach('Visit the only page avalible', () => {
        cy.visit('http://localhost:4200')
    })

    it('Contains first and last fund name from API', () => {
        cy.contains('BlackRock GF Euro Bond Fund A2 EUR')
        cy.contains('Ålandsbanken Sverige Aktie B')
    })
})