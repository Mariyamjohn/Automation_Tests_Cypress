/// <reference types ="cypress"/>
describe("Login Tests for Sauce Demo", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  //No username and no password
  it("It should not login with no username and password", () => {
    cy.get('[data-test="login-button"]').click();
    cy.get(".error-message-container").should(
      "have.text",
      "Epic sadface: Username is required"
    );
    cy.url().should(
      "not.include",
      "/inventory.html",
      "URL should not redirect to the inventory page"
    );
  });
  //No username but correct password
  it("It should not login with no username but with password", () => {
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get(".error-message-container").should(
      "have.text",
      "Epic sadface: Username is required"
    );
    cy.url().should(
      "not.include",
      "/inventory.html",
      "URL should not redirect to the inventory page"
    );
  });
  //Correct username but no password
  it("It should not login with username but no password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="login-button"]').click();
    cy.get(".error-message-container").should(
      "have.text",
      "Epic sadface: Password is required"
    );
    cy.url().should(
      "not.include",
      "/inventory.html",
      "URL should not redirect to the inventory page"
    );
  });
  //Wrong username but correct password
  it("It should not login with wrong username and correct password", () => {
    cy.get('[data-test="username"]').type("standarduser");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
    cy.url().should(
      "not.include",
      "/inventory.html",
      "URL should not redirect to the inventory page"
    );
  });
  //correct username but wrong password
  it("It should not login with correct username but wrong password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret123");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
    cy.url().should(
      "not.include",
      "/inventory.html",
      "URL should not redirect to the inventory page"
    );
  });
  //correct username and password
  it("it should login successfully", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="shopping-cart-link"]').should(
      "be.visible",
      "Shopping cart link should be visible after login"
    );
    cy.url().should(
      "include",
      "/inventory.html",
      "URL should redirect to the inventory page after login"
    );
  });
});