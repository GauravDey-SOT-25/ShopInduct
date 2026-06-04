import {
  carts,
  saveCart
} from "./cartData.js";

export function addToCart(
  userId,
  productId
) {

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const userCart =
    carts[userId];

  const existingProduct =
    userCart.find(
      item =>
        item.productId === productId
    );

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    userCart.push({
      productId,
      quantity: 1
    });
  }

  saveCart();

  return userCart;
}