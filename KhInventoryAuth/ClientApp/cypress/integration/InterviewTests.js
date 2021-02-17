/// <reference types="cypress" />

const { assert } = require("chai");

describe("egglist ", () => {
    it("Displays the message in the list", () => {
      cy.visit("http://localhost:3000/");
    
      cy.get('[data-testid="EggList"]').click();
      cy.get('[data-testid="EggList"]').should('not.be.empty') ;
      
      
      assert.isTrue(cy.get('[data-testid="EggUlList"]').children().length==10);
     
     
     
     
     
      cy.get('[data-testid="table"]').should('not.be.empty') ;
  
      cy.get('[data-testid="rows"]').children().should('have.length','3');

      
      cy.get('[data-testid="Name"]').type('نهاده جدید') ;
      cy.get('[data-testid="Remain"]').type('50') ;
      cy.get('[data-testid="PerUnitPrice"]').type('25000') ;


      cy.get('[data-testid="Save"]').click();

      cy.get('[data-testid="rows"]').children().should('have.length','4');

  
  
    });
  });
  