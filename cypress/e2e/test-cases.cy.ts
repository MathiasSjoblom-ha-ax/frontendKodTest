describe("Test cases for API application",  () => {
  beforeEach('Visit the only page avalible', () => {
      cy.visit('http://localhost:4200')
  })

  //Test to see the first fund from API shows up on the table to the right
  it('Contains first and last fund name from API', () => {
      cy.contains('BlackRock GF Euro Bond Fund A2 EUR')
      cy.contains('Ålandsbanken Sverige Aktie B')
  })

  //Test to see correct searched item are displayed
  it('Site contains the searched word', () => {
      //String to change the text entered into the search input
      const testString = "BlackRock"

      cy.get('.searchInput')
        .type(testString)
        .should('have.value', testString);
      cy.contains("BlackRock GF Euro Bond Fund A2 EUR");
      cy.contains("BlackRock Global Funds - World Gold A2 USD");

      //Checks that non searched funds doesnt show up if not in searchbox
      cy.contains(testString).click();
      cy.get('body').should('not.contain', 'Lannebo Småbolag');
      cy.get('body').should('not.contain', 'Ålandsbanken Kina Aktie SEK');
      cy.get('body').should('not.contain', 'Ålandsbanken Sverige Aktie B');
  });

  //Test to see the right bar displays correct info about clicked fund
  it('Displays correct information about selected fund', () => {
    cy.contains('Lannebo Småbolag').click();
  
    cy.get('.moreInfoBar').should('be.visible');
    cy.contains('Fund type: Aktiefond');
    cy.contains('Start date: 01/07/2019');
  });
})