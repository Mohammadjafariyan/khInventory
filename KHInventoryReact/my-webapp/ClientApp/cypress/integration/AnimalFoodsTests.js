/// <reference types="cypress" />

describe("مدیریت نهاده ها", () => {
    it("Displays the message in the list", () => {
      cy.visit("http://localhost:3000/");
  
      cy.get('[data-testid="animalFoods"]').click();
  
      cy.get('[data-testid="addForm"]').should('not.be.empty') ;
      cy.get('[data-testid="table"]').should('not.be.empty') ;
  
      cy.get('[data-testid="rows"]').children().should('have.length','3');

      
      cy.get('[data-testid="Name"]').type('نهاده جدید') ;
      cy.get('[data-testid="Remain"]').type('50') ;
      cy.get('[data-testid="PerUnitPrice"]').type('25000') ;


      cy.get('[data-testid="Save"]').click();

      cy.get('[data-testid="rows"]').children().should('have.length','4');

  
  
    });
  });
  