/// <reference types="cypress" />

describe("وضعیت انبار", () => {
    it("Displays the message in the list", () => {
      cy.visit("http://localhost:3000/");
  
      cy.get('[data-testid="InventoryStatus"]').click();
  

      cy.get('[data-testid="animalfood-list"]').children().should('have.length', 3);


  
    });
  });
  