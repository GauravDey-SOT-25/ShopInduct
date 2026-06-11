import {
  carts,
  saveCart
} from "./cartData.js";

export { carts };

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

export function removeFromCart(userId, productId) {
  if (carts[userId]) {
    carts[userId] = carts[userId].filter(item => item.productId !== productId);
    saveCart();
  }
  return carts[userId] || [];
}

export function updateQuantity(userId, productId, delta) {
  if (!carts[userId]) return [];
  const item = carts[userId].find(item => item.productId === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      carts[userId] = carts[userId].filter(item => item.productId !== productId);
    }
    saveCart();
  }
  return carts[userId] || [];
}

export function clearCart(userId) {
  carts[userId] = [];
  saveCart();
  return [];
}