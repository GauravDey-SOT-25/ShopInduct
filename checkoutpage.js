import { state, showToast, openSuccessModal, clearCart } from './app.js';
import { updateUserInfo } from './users.js';
import { currentUser } from './auth.js';

export function renderCheckoutPage() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  if (state.cart.length === 0) {
    appContainer.innerHTML = `
      <section class="max-w-[1280px] mx-auto px-4 py-20 text-center view fade-in">
        <div class="text-text-muted bg-background-secondary p-6 rounded-full inline-block mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
        </div>
        <h2 class="text-2xl font-bold text-text-primary mb-2">Your shopping cart is empty</h2>
        <p class="text-xs text-text-secondary mb-6">Fill your cart with premium gadgets before checking out.</p>
        <a href="#shop" class="btn-premium px-6 py-3 text-xs uppercase tracking-wider">Start Shopping</a>
      </section>
    `;
    return;
  }

  // Prefill details from active session if logged in
  const nameVal = currentUser ? `${currentUser.firstName || currentUser.name || ''} ${currentUser.lastName || ''}`.trim() : '';
  const emailVal = currentUser ? currentUser.email : '';
  const phoneVal = currentUser ? (currentUser.phone || '') : '';
  const addressVal = currentUser ? (currentUser.address || '') : '';
  const pincodeVal = currentUser ? (currentUser.pincode || '') : '';

  appContainer.innerHTML = `
    <!-- ================= CHECKOUT VIEW ================= -->
    <section id="checkout-view" class="max-w-[1280px] mx-auto px-4 py-10 pb-16 view fade-in">
      <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <!-- Left: Verified Billing and Shipping Form Details -->
        <div class="flex flex-col gap-6">
          <div class="bg-surface border border-border-80 rounded-2xl p-8 shadow-premium-sm transition-colors">
            <h2 class="text-xl font-extrabold text-text-primary mb-6 border-b border-border-80 pb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.12-1.243l1.119-10.643a1.125 1.125 0 0 1 1.12-1.243h10.643a1.125 1.125 0 0 1 1.12 1.243l1.119 10.643a1.125 1.125 0 0 1-1.12 1.243H14.25m-1.5 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.5m-9 0h-1.5" /></svg>
              Shipping Details
            </h2>
            <form class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="checkout-shipping-form" novalidate>
              <!-- Full Name -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="fullname">Full Name</label>
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="fullname" placeholder="John Doe" required value="${nameVal}">
                <span class="text-xs text-danger mt-1 hidden" id="fullname-error">Full name is required (min 3 characters).</span>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="email">Email Address</label>
                <input type="email" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="email" placeholder="john.doe@example.com" required value="${emailVal}">
                <span class="text-xs text-danger mt-1 hidden" id="email-error">Invalid email address format.</span>
              </div>

              <!-- Phone Number -->
              <div>
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="phone">Phone Number</label>
                <input type="tel" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="phone" placeholder="9876543210" required value="${phoneVal}">
                <span class="text-xs text-danger mt-1 hidden" id="phone-error">Please enter a valid 10-digit mobile number.</span>
              </div>

              <!-- Detailed Address -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="address">Street Address</label>
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="address" placeholder="Flat No., Street Name, Landmark" required value="${addressVal}">
                <span class="text-xs text-danger mt-1 hidden" id="address-error">Address is required (min 5 characters).</span>
              </div>

              <!-- Pin Code -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="pincode">Pincode / Zip Code</label>
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="pincode" placeholder="400001" required value="${pincodeVal}">
                <span class="text-xs text-danger mt-1 hidden" id="pincode-error">Pincode must be a 5 or 6-digit number.</span>
              </div>
            </form>
          </div>

          <!-- Advanced Stripe-like Payment Selection -->
          <div class="bg-surface border border-border-80 rounded-2xl p-8 shadow-premium-sm transition-colors">
            <h2 class="text-xl font-extrabold text-text-primary mb-6 border-b border-border-80 pb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M2.5 8.25h19M2.5 12h19m-19 4h19" /></svg>
              Payment Method
            </h2>
            
            <!-- Selector Tabs -->
            <div class="flex gap-3 mb-6 border-b border-border-80 pb-2">
              <button type="button" class="payment-tab flex-1 btn-premium active py-3 text-xs uppercase tracking-wider gap-2" id="tab-payment-card" aria-label="Select Credit or Debit Card payment method">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-19.5 5.25h19.5m-19.5 0h19.5" /></svg>
                Credit / Debit Card
              </button>
              <button type="button" class="payment-tab flex-1 btn-premium py-3 text-xs uppercase tracking-wider gap-2" id="tab-payment-upi" aria-label="Select UPI payment method">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18h9" /></svg>
                UPI Payment
              </button>
            </div>

            <!-- Card Payment Container -->
            <div class="payment-content transition-opacity duration-300 active" id="content-payment-card">
              <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label class="block text-xs font-semibold text-text-secondary mb-2" for="card-number">Card Number</label>
                  <div class="relative w-full">
                    <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all card-input" id="card-number" placeholder="4242 4242 4242 4242" maxlength="19" autocomplete="cc-number">
                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none" id="card-brand-icon">💳</span>
                  </div>
                  <span class="text-xs text-danger mt-1 hidden" id="card-number-error">Card number must be exactly 16 digits.</span>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-text-secondary mb-2" for="card-expiry">Expiry Date</label>
                  <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all card-input" id="card-expiry" placeholder="MM/YY" maxlength="5" autocomplete="cc-exp">
                  <span class="text-xs text-danger mt-1 hidden" id="card-expiry-error">Expiry date must be in MM/YY format.</span>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-text-secondary mb-2" for="card-cvv">CVV</label>
                  <input type="password" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all card-input" id="card-cvv" placeholder="•••" maxlength="3" autocomplete="cc-csc">
                  <span class="text-xs text-danger mt-1 hidden" id="card-cvv-error">CVV must be 3 digits.</span>
                </div>
              </div>
            </div>

            <!-- UPI Payment Container -->
            <div class="payment-content hidden transition-opacity duration-300" id="content-payment-upi">
              <div class="flex flex-col gap-4">
                <div class="w-full">
                  <label class="block text-xs font-semibold text-text-secondary mb-2" for="upi-vpa">UPI Virtual Payment Address (VPA)</label>
                  <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all upi-input" id="upi-vpa" placeholder="john.doe@okaxis" autocomplete="off">
                  <span class="text-xs text-danger mt-1 hidden" id="upi-vpa-error">Please enter a valid UPI ID (e.g. user@bank).</span>
                  <p class="text-[11px] text-text-secondary mt-1">Enter your UPI ID (e.g. username@upi or mobile@okhdfcbank)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Fixed Order cost summary cards panel -->
        <div class="bg-surface border border-border-80 rounded-2xl p-8 shadow-premium-sm lg:sticky lg:top-[90px] transition-colors">
          <h2 class="text-xl font-extrabold text-text-primary mb-6 border-b border-border-80 pb-3">Order Summary</h2>
          
          <div class="flex flex-col gap-4 mb-6 border-b border-border-80 pb-5 max-h-[250px] overflow-y-auto" id="checkout-items-summary-list">
            <!-- Dynamic elements loaded in real time -->
          </div>

          <div class="flex flex-col gap-3 mb-6">
            <!-- Promo Coupon Panel for Checkout -->
            <div class="border-b border-border-80 pb-3 mb-3">
              <div class="flex gap-2">
                <input type="text" class="input-field w-full px-4 py-2 bg-background-secondary border border-border-80 rounded-xl text-xs text-text-primary uppercase outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="checkout-promo-input" placeholder="Promo Code" aria-label="Checkout promo code input field">
                <button class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl text-text-inverse bg-primary hover:bg-primary-hover transition duration-150 cursor-pointer" id="checkout-promo-apply-btn">Apply</button>
              </div>
              <div id="checkout-promo-status" class="text-[11px] font-semibold mt-1 hidden"></div>
            </div>

            <div class="flex justify-between text-sm text-text-secondary">
              <span>Items Subtotal</span>
              <span id="checkout-subtotal-val">₹0</span>
            </div>
            <div class="flex justify-between text-sm text-success font-semibold hidden" id="checkout-discount-row">
              <span>Discount (Promo)</span>
              <span id="checkout-discount-val">-₹0</span>
            </div>
            <div class="flex justify-between text-sm text-text-secondary">
              <span>Standard Shipping</span>
              <span id="checkout-shipping-val">₹0</span>
            </div>
            <div class="flex justify-between text-sm text-text-secondary">
              <span>Taxes (18% GST standard)</span>
              <span id="checkout-tax-val">₹0</span>
            </div>
            <div class="flex justify-between text-base font-extrabold text-text-primary border-t border-border-80 pt-3">
              <span>Grand Total</span>
              <span id="checkout-total-val" class="text-primary">₹0</span>
            </div>
          </div>

          <!-- Checkout submission action -->
          <button class="w-full btn-premium px-6 py-4 text-sm" id="checkout-submit-btn">
            Place Order & Pay
          </button>
        </div>
      </div>
    </section>
  `;

  initCheckoutEvents();
  renderCheckoutSummary();
}

let activePayment = 'card';

function initCheckoutEvents() {
  const tabCard = document.getElementById('tab-payment-card');
  const tabUpi = document.getElementById('tab-payment-upi');
  const contentCard = document.getElementById('content-payment-card');
  const contentUpi = document.getElementById('content-payment-upi');

  if (tabCard && tabUpi && contentCard && contentUpi) {
    tabCard.addEventListener('click', () => {
      tabCard.className = "payment-tab flex-1 btn-premium active py-3 text-xs uppercase tracking-wider gap-2";
      tabUpi.className = "payment-tab flex-1 btn-premium py-3 text-xs uppercase tracking-wider gap-2";
      contentCard.classList.remove('hidden');
      contentUpi.classList.add('hidden');
      activePayment = 'card';
    });

    tabUpi.addEventListener('click', () => {
      tabUpi.className = "payment-tab flex-1 btn-premium active py-3 text-xs uppercase tracking-wider gap-2";
      tabCard.className = "payment-tab flex-1 btn-premium py-3 text-xs uppercase tracking-wider gap-2";
      contentUpi.classList.remove('hidden');
      contentCard.classList.add('hidden');
      activePayment = 'upi';
    });
  }

  // Promo Code handling in Checkout
  const promoInput = document.getElementById('checkout-promo-input');
  const promoBtn = document.getElementById('checkout-promo-apply-btn');
  const promoStatus = document.getElementById('checkout-promo-status');

  if (state.promoApplied) {
    if (promoInput) promoInput.value = state.promoApplied;
    if (promoStatus) {
      promoStatus.textContent = `Promo code ${state.promoApplied} applied!`;
      promoStatus.className = 'text-[11px] font-semibold mt-1 text-success';
      promoStatus.classList.remove('hidden');
    }
  }

  if (promoBtn && promoInput && promoStatus) {
    promoBtn.onclick = (e) => {
      e.preventDefault();
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'INDUCT10') {
        state.promoApplied = 'INDUCT10';
        promoStatus.textContent = 'Promo code INDUCT10 applied (10% Off!)';
        promoStatus.className = 'text-[11px] font-semibold mt-1 text-success';
        promoStatus.classList.remove('hidden');
        renderCheckoutSummary();
      } else {
        promoStatus.textContent = 'Invalid promo code';
        promoStatus.className = 'text-[11px] font-semibold mt-1 text-danger';
        promoStatus.classList.remove('hidden');
      }
    };
  }

  // Form submission / validation
  const submitBtn = document.getElementById('checkout-submit-btn');
  if (submitBtn) {
    submitBtn.onclick = (e) => {
      e.preventDefault();
      if (validateForm()) {
        processOrder();
      }
    };
  }
}

function validateForm() {
  let isValid = true;

  // 1. Shipping Details fields validation
  const name = document.getElementById('fullname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const address = document.getElementById('address');
  const pincode = document.getElementById('pincode');

  const setError = (el, show) => {
    const errorEl = document.getElementById(el.id + '-error');
    if (errorEl) {
      if (show) {
        errorEl.classList.remove('hidden');
        el.classList.add('error');
      } else {
        errorEl.classList.add('hidden');
        el.classList.remove('error');
      }
    }
  };

  if (name.value.trim().length < 3) {
    setError(name, true);
    isValid = false;
  } else setError(name, false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    setError(email, true);
    isValid = false;
  } else setError(email, false);

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.value.trim())) {
    setError(phone, true);
    isValid = false;
  } else setError(phone, false);

  if (address.value.trim().length < 5) {
    setError(address, true);
    isValid = false;
  } else setError(address, false);

  const pinRegex = /^[0-9]{5,6}$/;
  if (!pinRegex.test(pincode.value.trim())) {
    setError(pincode, true);
    isValid = false;
  } else setError(pincode, false);

  // 2. Payment details fields validation
  if (activePayment === 'card') {
    const cardNum = document.getElementById('card-number');
    const cardExp = document.getElementById('card-expiry');
    const cardCvv = document.getElementById('card-cvv');

    const cardNumClean = cardNum.value.replace(/\s+/g, '');
    if (!/^[0-9]{16}$/.test(cardNumClean)) {
      setError(cardNum, true);
      isValid = false;
    } else setError(cardNum, false);

    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(cardExp.value.trim())) {
      setError(cardExp, true);
      isValid = false;
    } else setError(cardExp, false);

    if (!/^[0-9]{3}$/.test(cardCvv.value.trim())) {
      setError(cardCvv, true);
      isValid = false;
    } else setError(cardCvv, false);
  } else {
    const upi = document.getElementById('upi-vpa');
    if (!/^\w+@[a-zA-Z]+$/.test(upi.value.trim())) {
      setError(upi, true);
      isValid = false;
    } else setError(upi, false);
  }

  return isValid;
}

function processOrder() {
  const submitBtn = document.getElementById('checkout-submit-btn');
  const originalHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="animate-pulse">Processing Payment...</span>`;

  setTimeout(() => {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (state.promoApplied === 'INDUCT10') {
      discount = Math.round(subtotal * 0.10);
    }
    const shipping = subtotal >= 1999 ? 0 : 150;
    const tax = Math.round((subtotal - discount) * 0.18);
    const total = subtotal - discount + shipping + tax;

    const ordId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const orderData = {
      orderId: ordId,
      date: dateStr,
      name: document.getElementById('fullname').value.trim(),
      address: document.getElementById('address').value.trim(),
      total: total,
      items: state.cart.map(i => ({ id: i.id, title: i.title, quantity: i.quantity, price: i.price }))
    };

    // Save order history inside user object
    if (currentUser) {
      if (!currentUser.orders) currentUser.orders = [];
      currentUser.orders.unshift(orderData);
      
      // Update phone, address, pincode if empty
      const updatedFields = {
        orders: currentUser.orders
      };
      if (!currentUser.phone) updatedFields.phone = document.getElementById('phone').value.trim();
      if (!currentUser.address) updatedFields.address = document.getElementById('address').value.trim();
      if (!currentUser.pincode) updatedFields.pincode = document.getElementById('pincode').value.trim();
      
      updateUserInfo(currentUser.id, updatedFields);
    }

    // Proactively clear cart
    clearCart();

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;

    // Trigger Success Modal
    openSuccessModal(orderData);
  }, 1200);
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-summary-list');
  if (!container) return;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  container.innerHTML = state.cart.map(item => `
    <div class="flex gap-4 p-2 bg-background-secondary border border-border-80 rounded-xl">
      <img src="${item.image}" alt="${item.title}" class="w-12 h-14 object-cover rounded bg-surface border border-border">
      <div class="flex-1 min-w-0">
        <h5 class="text-xs font-bold text-text-primary truncate">${item.title}</h5>
        <div class="flex items-center justify-between mt-1">
          <span class="text-xs text-text-secondary">Qty: ${item.quantity}</span>
          <span class="text-xs font-black text-text-primary">₹${item.price * item.quantity}</span>
        </div>
      </div>
    </div>
  `).join('');

  let discount = 0;
  if (state.promoApplied === 'INDUCT10') {
    discount = Math.round(subtotal * 0.10);
  }

  const shipping = subtotal >= 1999 ? 0 : 150;
  const tax = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + shipping + tax;

  document.getElementById('checkout-subtotal-val').textContent = `₹${subtotal}`;
  
  const discountRow = document.getElementById('checkout-discount-row');
  if (discount > 0) {
    discountRow.classList.remove('hidden');
    document.getElementById('checkout-discount-val').textContent = `-₹${discount}`;
  } else {
    discountRow.classList.add('hidden');
  }

  document.getElementById('checkout-shipping-val').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.getElementById('checkout-tax-val').textContent = `₹${tax}`;
  document.getElementById('checkout-total-val').textContent = `₹${total}`;
}
