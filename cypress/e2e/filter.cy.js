import { itemslisting } from "../support/utils";
describe("Sorting Tests for Sauce Demo", () => {
  beforeEach(() => {
    cy.login();
  });

  it("It should assert the filter options", () => {
    const selectOptions = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];
    cy.get(".product_sort_container option").each(($option, index) => {
      expect($option.text()).to.equal(selectOptions[index]);
    });
  });

  it("It should check filtering of the name in ascending order", () => {
    cy.get(".product_sort_container").select("az");

    itemslisting().then((items) => {
      const sortedItems = [...items].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      itemslisting().then((to_check_sorting) => {
        expect(to_check_sorting).to.deep.equal(sortedItems);
      });
    });
  });
  it("It should check filtering of the name in descending order", () => {
    cy.get(".product_sort_container").select("za");

    itemslisting().then((items) => {
      const sortedItems = [...items].sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      itemslisting().then((to_check_sorting) => {
        expect(to_check_sorting).to.deep.equal(sortedItems);
      });
    });
  });
  it("It should check filtering of the price from low to high", () => {
    cy.get(".product_sort_container").select("lohi");

    itemslisting().then((items) => {
      const sortedItems = [...items].sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceA - priceB;
      });

      expect(items).to.deep.equal(sortedItems);
    });
  });
  it("It should check filtering of the price from high to low", () => {
    cy.get(".product_sort_container").select("hilo");

    itemslisting().then((items) => {
      const sortedItems = [...items].sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceB - priceA;
      });
      cy.log(sortedItems);

      expect(items).to.deep.equal(sortedItems);
    });
  });
});
