let savedCart =
  JSON.parse(
    localStorage.getItem("carts")
  );

export let carts =
  savedCart || {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  };

export function saveCart() {

  localStorage.setItem(
    "carts",
    JSON.stringify(carts)
  );

}