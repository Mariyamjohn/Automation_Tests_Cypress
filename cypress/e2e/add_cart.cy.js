/// <reference types ="cypress"/>
describe("Add to cart Test for Sauce Demo", () => {
  beforeEach(() => {
    cy.login();
  });
  // Adding single item to cart

  it("it should add one item to cart and verify", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //Assert button text is Remove
    cy.get('[data-test="remove-sauce-labs-backpack"]').should(
      "have.text",
      "Remove"
    );
    cy.get(
      '[data-test="item-4-title-link"] > [data-test="inventory-item-name"]'
    ).then(($item) => {
      const addedItem = $item.text();
      //Assert cart badge shows 1
      cy.get('[data-test="shopping-cart-badge"]')
        .should("have.text", "1")
        .click();
      //Assert cart item same as added item
      cy.get('[data-test="inventory-item-name"]').should(
        "have.text",
        addedItem
      );
    });
  });
  // Adding multiple items to the cart and verifying
  it("It should add multiple items to the cart and verify", () => {
    const items = [
      "Sauce Labs Bike Light",
      "Test.allTheThings() T-Shirt (Red)",
      "Sauce Labs Bolt T-Shirt",
    ];
    const checkItem = [];

    items.forEach((itemName) => {
      cy.contains(".inventory_item_name", itemName)
        .parents(".inventory_item")
        .within(() => {
          let description;
          let name;
          let price;
          cy.get(".inventory_item_desc").then(($desc) => {
            description = $desc.text();
          });

          cy.get(".inventory_item_price").then(($price) => {
            price = $price.text();
            checkItem.push({ name: itemName, desc: description, price: price });
            cy.log(`Item added to checkItem: ${JSON.stringify(checkItem)}`);
          });
          // Add the item
          cy.contains("button", "Add to cart").click();
          // Assert remove  button
          cy.get(".btn.btn_secondary.btn_small.btn_inventory").should(
            "have.text",
            "Remove"
          );
        });
    });

    //Assert cart badge and go to cart
    cy.get(".shopping_cart_badge").should("have.text", items.length).click();
    cy.then(() => {
      checkItem.forEach((x) => {
        cy.get(".inventory_item_name")
          .contains(x.name)
          .parents(".cart_item_label")
          .within(() => {
            cy.get(".inventory_item_desc").should("have.text", x.desc);

            cy.get(".inventory_item_price").should("have.text", x.price);
            cy.get(".btn.btn_secondary.btn_small.cart_button").should(
              "have.text",
              "Remove"
            );
          });
      });
    });
  });
  //Continue shopping
  it("it should continue shopping in the inventory", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').click();
    cy.get("#continue-shopping").click();
    //Assert the continue shopping
    cy.url().should("include", "/inventory.html");
  });
});
