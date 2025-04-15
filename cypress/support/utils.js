export function itemslisting() {
  cy.get(".inventory_item_name").then(($item_name) => {
    let itemsCount = $item_name.length;
  });
  let items = [];
  cy.get(".inventory_item_name").each(($el) => {
    const itemName = $el.text();

    let description;
    let name;
    let price;
    let image;

    cy.contains(".inventory_item_name", itemName)
      .parents(".inventory_item")
      .within(() => {
        cy.get(".inventory_item_desc").then(($desc) => {
          description = $desc.text();
        });
        cy.get("img.inventory_item_img")
          .invoke("attr", "src")
          .then((imageSrc) => {
            image = imageSrc;
          });

        cy.get(".inventory_item_price").then(($price) => {
          price = $price.text();
          items.push({
            name: itemName,
            desc: description,
            price: price,
            image: image,
          });
        });
      });
  });
  return cy.wrap(items);
}
