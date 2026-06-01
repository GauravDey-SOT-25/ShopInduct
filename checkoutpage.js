import { state, showToast
  // openSuccessModal 
} from './app.js';

export function renderCheckoutPage() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

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
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="fullname" placeholder="John Doe" required autocomplete="name">
                <span class="text-xs text-danger mt-1 hidden" id="fullname-error"></span>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="email">Email Address</label>
                <input type="email" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="email" placeholder="john.doe@example.com" required autocomplete="email">
                <span class="text-xs text-danger mt-1 hidden" id="email-error"></span>
              </div>

              <!-- Phone Number -->
              <div>
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="phone">Phone Number</label>
                <input type="tel" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="phone" placeholder="9876543210" required autocomplete="tel">
                <span class="text-xs text-danger mt-1 hidden" id="phone-error"></span>
              </div>

              <!-- Detailed Address -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="address">Street Address</label>
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="address" placeholder="Flat No., Street Name, Landmark" required autocomplete="street-address">
                <span class="text-xs text-danger mt-1 hidden" id="address-error"></span>
              </div>

              <!-- Pin Code -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="pincode">Pincode / Zip Code</label>
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="pincode" placeholder="400001" required autocomplete="postal-code">
                <span class="text-xs text-danger mt-1 hidden" id="pincode-error"></span>
              </div>

              <!-- Hidden dummy trigger -->
              <button type="submit" class="hidden" id="dummy-form-submit-trigger"></button>
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
                  <span class="text-xs text-danger mt-1 hidden" id="card-number-error"></span>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-text-secondary mb-2" for="card-expiry">Expiry Date</label>
                  <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all card-input" id="card-expiry" placeholder="MM/YY" maxlength="5" autocomplete="cc-exp">
                  <span class="text-xs text-danger mt-1 hidden" id="card-expiry-error"></span>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-text-secondary mb-2" for="card-cvv">CVV</label>
                  <input type="password" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all card-input" id="card-cvv" placeholder="•••" maxlength="3" autocomplete="cc-csc">
                  <span class="text-xs text-danger mt-1 hidden" id="card-cvv-error"></span>
                </div>
              </div>
            </div>

            <!-- UPI Payment Container -->
            <div class="payment-content hidden transition-opacity duration-300" id="content-payment-upi">
              <div class="flex flex-col gap-4">
                <div class="w-full">
                  <label class="block text-xs font-semibold text-text-secondary mb-2" for="upi-vpa">UPI Virtual Payment Address (VPA)</label>
                  <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all upi-input" id="upi-vpa" placeholder="john.doe@okaxis" autocomplete="off">
                  <span class="text-xs text-danger mt-1 hidden" id="upi-vpa-error"></span>
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

  // Bind interactions
  initCheckoutEvents();
}

let activePaymentMethod = 'card'; // Card vs UPI selection

function initCheckoutEvents() {

  // A: Payment Method Tabs switching logic
  const tabCard = document.getElementById('tab-payment-card');
  const tabUpi = document.getElementById('tab-payment-upi');
  const contentCard = document.getElementById('content-payment-card');
  const contentUpi = document.getElementById('content-payment-upi');

  if (tabCard && tabUpi && contentCard && contentUpi) {
    tabCard.addEventListener('click', () => {
      tabCard.className = "payment-tab flex-1 btn-premium active py-3 text-xs uppercase tracking-wider gap-2";
      tabUpi.className = "payment-tab flex-1 btn-premium py-3 text-xs uppercase tracking-wider gap-2";
      contentCard.classList.add('active');
      contentUpi.classList.remove('active');
      contentCard.classList.remove('hidden');
      contentUpi.classList.add('hidden');
      activePaymentMethod = 'card';
    });

    tabUpi.addEventListener('click', () => {
      tabUpi.className = "payment-tab flex-1 btn-premium active py-3 text-xs uppercase tracking-wider gap-2";
      tabCard.className = "payment-tab flex-1 btn-premium py-3 text-xs uppercase tracking-wider gap-2";
      contentUpi.classList.add('active');
      contentCard.classList.remove('active');
      contentUpi.classList.remove('hidden');
      contentCard.classList.add('hidden');
      activePaymentMethod = 'upi';
    });
  }

  // B: Card Number groups-of-4 formatter & brand identification
//   const cardNumInput = document.getElementById('card-number');
//   const cardBrandIcon = document.getElementById('card-brand-icon');
//   const cardExpiryInput = document.getElementById('card-expiry');
//   const cardCvvInput = document.getElementById('card-cvv');

//   if (cardNumInput) {
//     cardNumInput.addEventListener('input', (e) => {
//       let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      
//       if (cardBrandIcon) {
//         if (val.startsWith('4')) {
//           cardBrandIcon.textContent = '🔵 Visa';
//         } else if (val.startsWith('5')) {
//           cardBrandIcon.textContent = '🟠 Mastercard';
//         } else if (val.startsWith('3')) {
//           cardBrandIcon.textContent = '🟢 Amex';
//         } else {
//           cardBrandIcon.textContent = '💳';
//         }
//       }

//       const parts = [];
//       for (let i = 0; i < val.length; i += 4) {
//         parts.push(val.substring(i, i + 4));
//       }
//       e.target.value = parts.join(' ');
//     });
//   }

  // Expiry Month/Year formatter (MM/YY)
//   if (cardExpiryInput) {
//     cardExpiryInput.addEventListener('input', (e) => {
//       let val = e.target.value.replace(/\D/g, '').substring(0, 4);
//       if (val.length >= 3) {
//         e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
//       } else {
//         e.target.value = val;
//       }
//     });
//   }

  // CVV limit numeric characters
//   if (cardCvvInput) {
//     cardCvvInput.addEventListener('input', (e) => {
//       e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
//     });
  }
