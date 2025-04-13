/// <reference types ="cypress"/>
describe("Cart Test for Sauce Demo", () => {
  const items = [
    "Sauce Labs Bike Light",
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Bolt T-Shirt",
  ];
  const itemCount = items.length;
  
  function addItems(items)
  {
    items.forEach((itemName) => {
      cy.contains(".inventory_item_name", itemName)
        .parents(".inventory_item")
        .within(() => {
          cy.get("button").click();
        });
    });

  }

  beforeEach(() => {
      cy.login(); 
  });
  
  //Remove an item from cart
  it("it should remove item from cart", () => {
    addItems(items);
    const itemIndex = Math.floor(Math.random() * itemCount);
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.contains(".inventory_item_name", items[itemIndex])
      .parents(".cart_item_label")
      .within(() => {
        cy.contains("button", "Remove").click();
      });
    //Assert the item was removed
    cy.contains(".inventory_item_name", items[itemIndex]).should("not.exist");
    //Assert add to cart button on the item
    cy.get("#continue-shopping").click();
    cy.contains(".inventory_item_name", items[itemIndex])
      .parents(".inventory_item")
      .within(() => {
        cy.contains("button", "Add to cart").should("exist");
      });
    //Assert cart badge shows 2
    cy.get('[data-test="shopping-cart-badge"]')
      .should("have.text", "2")
      .click();
  });
  //Remove an item from the inventory page
  it("It should remove an item from the inventory page", () => {
    addItems(items);
    const itemIndex = Math.floor(Math.random() * itemCount);
    cy.contains(".inventory_item_name", items[itemIndex])
      .parents(".inventory_item")
      .within(() => {
        cy.contains("button", "Remove").click();
        //Assert remove button for that item
        cy.contains("button", "Add to cart").should("exist");
      });
    //Assert cart badge shows 2
    cy.get('[data-test="shopping-cart-badge"]')
      .should("have.text", "2")
      .click();
    //Assert removed item not in cart
    cy.contains(".inventory_item_name", items[itemIndex]).should("not.exist");
  });
});
