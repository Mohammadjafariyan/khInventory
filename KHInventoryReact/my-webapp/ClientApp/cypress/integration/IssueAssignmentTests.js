/// <reference types="cypress" />

describe("خرید نهاده (ورود به انبار )", () => {
    it("Displays the message in the list", () => {
      cy.visit("http://localhost:3000/");
  
      cy.get('[data-testid="IssueAssignment"]').click();
  


      cy.get('[data-testid="food-سبوس"]').click();
  
      cy.get('[data-testid="search-personnel"]').type("11");
  

      
      cy.get('[data-testid="person-1"]').click();
      cy.get('[data-testid="AnimalFoodId"]').should("have.value", "1");
      
      
      
      cy.get('[data-testid="PersonId"]').should("have.value", "2");
  
      cy.get('[data-testid="Description"]').type(
        "DescriptionDescriptionDescriptionDescriptionDescription"
      );
  
      cy.get('[data-testid="PerUnitPrice"]').should("have.value", "15000");
  
      cy.get('[data-testid="PerUnitPrice"]').should("be.disabled");
      cy.get('[data-testid="TotalPrice"]').should("be.disabled");
  
      // cy.get('[data-testid="Person"]').select('محمد سلامی'); // Select the 'user-1' option
  
      cy.get('[data-testid="Quan"]').type("15");

  
      cy.get('[data-testid="TotalPrice"]').should("have.value", "225000");
      cy.get('[data-testid="TotalPriceMoney"]').should("have.text", "225,000");
  
      cy.get('[data-testid="PerUnitPriceMoney"]').should("have.text",'15,000');
      
  
      cy.get('[data-testid="QuanValidation"]').should("have.class", "valid-feedback");
  
  
      cy.get('[data-testid="submitIssueAssignment"]').click();
  
      cy.location("href").should("eq", "http://localhost:3000/InventoryStatus");
  
  
      cy.get('[data-testid="InventoryStatus"]').should("have.text", "InventoryStatus");
  
    });
  });
  