import { products } from './data.js';

export const state = {
  products: products,
  cart: JSON.parse(localStorage.getItem('ecommerce_cart')) || [],
  filters: {
    query: '',
    category: 'all',
    maxPrice: 25000,
    minRating: 0
  },
  // Dynamic Authentication state
  users: JSON.parse(localStorage.getItem('shopinduct_registered_users')) || [],
  activeUser: JSON.parse(localStorage.getItem('shopinduct_active_user')) || null
};

export function saveCart() {
  localStorage.setItem('ecommerce_cart', JSON.stringify(state.cart));
}

export function saveUsers() {
  localStorage.setItem('shopinduct_registered_users', JSON.stringify(state.users));
}

export function saveActiveUser() {
  localStorage.setItem('shopinduct_active_user', JSON.stringify(state.activeUser));
  
  // Synchronize back into users array
  if (state.activeUser) {
    const idx = state.users.findIndex(u => u.email.toLowerCase() === state.activeUser.email.toLowerCase());
    if (idx !== -1) {
      state.users[idx] = { ...state.users[idx], ...state.activeUser };
    } else {
      state.users.push(state.activeUser);
    }
    saveUsers();
  }
}

// REGISTER CUSTOMER
export function registerCustomer(firstName, lastName, email, phone, gender, password) {
  // Check if email already registered
  const exists = state.users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error("This email is already registered with another customer account.");
  }

  const newUser = {
    id: 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    firstName,
    lastName,
    email,
    phone,
    gender,
    password, // Storing password for lookup/comparison in this client sandbox
    addresses: [],
    orders: [],
    joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  state.users.push(newUser);
  saveUsers();

  // Log in immediately
  state.activeUser = newUser;
  saveActiveUser();

  return newUser;
}

// SIGN IN CUSTOMER
export function authenticateCustomer(email, password) {
  const user = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw new Error("No premium account found with this email direction.");
  }
  if (user.password !== password) {
    throw new Error("Incorrect secret credentials. Please verify your entries.");
  }

  state.activeUser = user;
  saveActiveUser();
  return user;
}

// LOG OUT
export function logoutCustomer() {
  state.activeUser = null;
  localStorage.removeItem('shopinduct_active_user');
}

// UPDATE ACTIVE CUSTOMER DETAILS
export function updateActiveCustomerInfo(firstName, lastName, email, phone, gender, password = null) {
  if (!state.activeUser) return;

  state.activeUser.firstName = firstName;
  state.activeUser.lastName = lastName;
  state.activeUser.email = email;
  state.activeUser.phone = phone;
  state.activeUser.gender = gender;
  if (password) {
    state.activeUser.password = password;
  }

  saveActiveUser();
}

// SAVE ADDRESS (ADD or EDIT)
export function saveActiveCustomerAddress(addressData) {
  if (!state.activeUser) return;
  if (!state.activeUser.addresses) state.activeUser.addresses = [];

  const isDefaultSelected = addressData.isDefault;

  if (isDefaultSelected) {
    // Unset all active defaults
    state.activeUser.addresses.forEach(add => add.isDefault = false);
  }

  if (addressData.id) {
    // Edit existing address
    const idx = state.activeUser.addresses.findIndex(add => add.id === addressData.id);
    if (idx !== -1) {
      state.activeUser.addresses[idx] = { ...state.activeUser.addresses[idx], ...addressData };
    }
  } else {
    // Add new address
    const newAddress = {
      ...addressData,
      id: 'add_' + Date.now() + '_' + Math.floor(Math.random() * 100),
    };

    // If it's the first address, make it default regardless of choice
    if (state.activeUser.addresses.length === 0) {
      newAddress.isDefault = true;
    }

    state.activeUser.addresses.push(newAddress);
  }

  saveActiveUser();
}

// DELETE ADDRESS
export function deleteActiveCustomerAddress(addressId) {
  if (!state.activeUser || !state.activeUser.addresses) return;

  const wasDefault = state.activeUser.addresses.find(add => add.id === addressId)?.isDefault;

  state.activeUser.addresses = state.activeUser.addresses.filter(add => add.id !== addressId);

  // If we deleted the default address, promote the first remaining address to default
  if (wasDefault && state.activeUser.addresses.length > 0) {
    state.activeUser.addresses[0].isDefault = true;
  }

  saveActiveUser();
}

// APPEND PLACED ORDER
export function addActiveCustomerOrder(orderData) {
  if (!state.activeUser) return;
  if (!state.activeUser.orders) state.activeUser.orders = [];

  state.activeUser.orders.unshift(orderData);
  saveActiveUser();
}

export function addToCart(productId) {
  const item = state.cart.find(i => i.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    const product = state.products.find(p => p.id === productId);
    if (product) {
       state.cart.unshift({ ...product, quantity: 1 });
     }
  }
  saveCart();
}

export function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
}

export function updateQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }
}

export function clearCart() {
  state.cart = [];
  saveCart();
}
