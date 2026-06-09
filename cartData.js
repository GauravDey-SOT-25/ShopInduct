let savedCart =
  JSON.parse(
    localStorage.getItem("carts")
  );

export let carts =
  savedCart || {};

export function saveCart() {

  localStorage.setItem(
    "carts",
    JSON.stringify(carts)
  );
}