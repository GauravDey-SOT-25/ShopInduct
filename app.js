import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';
import { renderHomepage } from './homepage.js';
import { renderCategoryPage, renderCatalog } from './categorypage.js';
import { renderCheckoutPage } from './checkoutpage.js';
import { getAllProducts } from './productservice.js';
import { currentUser, login as apiLogin, register as apiRegister, logout as apiLogout } from './auth.js';
import { updateUserInfo } from './users.js';
import { carts, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateQuantity as apiUpdateQuantity, clearCart as apiClearCart } from './cart.js';

// Central shared state object
export const state = {
  theme: 'dark',
  products: [],
  cart: [],
  orders: [],
  user: null,
  filters: {
    searchQuery: '',
    categories: [],
    maxPrice: 6000,
    minRating: 0,
    sortBy: 'featured'
  },
  promoApplied: null
};

// Initialize Application
async function init() {
  injectGlobalContainers();

  // Load remote products
  try {
    state.products = await getAllProducts();
  } catch (err) {
    console.error("Failed to load products:", err);
  }

  // Load theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  state.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Sync session
  syncSession();

  // Render layout shells
  renderHeader();
  renderFooter();

  // Setup Dynamic events
  initGlobalModalClosers();
  initBackToTop();
  initAuthEvents();
  initCartDrawerActions();
  initDragAndDrop();

  // SPA hash listener
  window.addEventListener('hashchange', handleRouting);
  
  // Initial page trigger
  handleRouting();

  // Initial render of cart drawer to sync UI with localStorage
  renderCartDrawer();

  showToast("Welcome to ShopInduct!", "info");
}

export function syncStateCart() {
  const userId = currentUser ? currentUser.id : 'guest';
  const rawCart = carts[userId] || [];
  state.cart = rawCart.map(item => {
    const p = state.products.find(prod => prod.id === item.productId);
    if (p) {
      return { ...p, quantity: item.quantity };
    }
    return null;
  }).filter(Boolean);
}

export function syncSession() {
  state.user = currentUser;
  state.orders = currentUser ? (currentUser.orders || []) : [];
  syncStateCart();
}

// --- DYNAMIC CONTAINERS INJECTION ---
function injectGlobalContainers() {
  if (document.getElementById('cart-drawer')) return;

  const html = `
    <!-- Sliding Sticky Cart Drawer -->
    <div class="cart-drawer-backdrop" id="cart-drawer-backdrop"></div>
    <aside class="cart-drawer flex flex-col bg-surface border-l border-border-80 transition-all duration-300" id="cart-drawer">
      <div class="cart-drawer-header px-6 py-4 border-b border-border-80 flex items-center justify-between gap-3">
        <h3 class="cart-drawer-title text-base font-bold text-text-primary whitespace-nowrap">Shopping Cart</h3>
        
        <!-- Drag & Drop Zone placed horizontally next to title -->
        <div class="cart-dropzone flex items-center gap-2 px-3 py-1.5 border border-dashed border-border-80 rounded-lg bg-background-secondary text-text-secondary cursor-default flex-1 max-w-[190px] justify-center transition-all duration-150" id="cart-dropzone-indicator">
          <svg class="text-text-muted w-3.5 h-3.5 animate-pulse shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18" /></svg>
          <span class="cart-dropzone-text text-[10px] font-semibold whitespace-nowrap">Drag here!</span>
        </div>
 
        <button class="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg cursor-pointer transition duration-150 shrink-0" id="cart-drawer-close-btn" title="Close Shopping Cart" aria-label="Close shopping cart drawer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
      </div>
 
      <!-- Cart Scrollable List -->
      <div class="cart-items-container flex-1 overflow-y-auto p-6 flex flex-col gap-4" id="cart-items-container">
        <!-- Dynamic list rows -->
      </div>
 
      <!-- Empty state inside drawer -->
      <div class="empty-state border-none shadow-none p-10 px-6 m-auto flex flex-col items-center justify-center text-center gap-4 hidden" id="cart-empty-state">
        <div class="text-text-muted bg-background-secondary p-4 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
        </div>
        <h3 class="text-base font-bold text-text-primary">Your Cart is empty</h3>
        <p class="text-xs text-text-secondary leading-relaxed">Drag items or click the '+' button in catalog to add some premium gadgets!</p>
        <button class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl text-text-inverse bg-primary hover:bg-primary-hover transition duration-150 cursor-pointer" id="cart-drawer-shop-btn">Start Shopping</button>
      </div>
 
      <!-- Sticky footer checkout details inside drawer -->
      <div class="cart-drawer-footer p-6 border-t border-border-80 bg-background-secondary flex flex-col gap-4 transition-colors duration-250" id="cart-drawer-footer">
        <!-- Promo Coupon Panel -->
        <div class="border-b border-border-80 pb-3 mb-3">
          <div class="flex gap-2">
            <input type="text" class="input-field w-full px-4 py-2 bg-surface border border-border-80 rounded-xl text-xs text-text-primary uppercase outline-none focus:bg-surface-elevated focus:border-primary focus-ring-primary-15 transition-all" id="cart-promo-input" placeholder="Promo Code" aria-label="Promo code input field">
            <button class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl text-text-inverse bg-primary hover:bg-primary-hover transition duration-150 cursor-pointer" id="cart-promo-apply-btn">Apply</button>
          </div>
          <div id="cart-promo-status" class="text-[11px] font-semibold mt-1 hidden"></div>
        </div>
 
        <div class="flex justify-between text-sm text-text-secondary">
          <span>Subtotal</span>
          <span id="cart-subtotal-val">₹0</span>
        </div>
        <div class="flex justify-between text-sm text-success font-semibold hidden" id="cart-discount-row">
          <span>Discount (Promo)</span>
          <span id="cart-discount-val">-₹0</span>
        </div>
        <div class="flex justify-between text-sm text-text-secondary">
          <span>Shipping Fees</span>
          <span id="cart-shipping-val">₹0</span>
        </div>
        <div class="flex justify-between text-sm text-text-secondary">
          <span>Estimated GST Tax (18%)</span>
          <span id="cart-tax-val">₹0</span>
        </div>
        <div class="flex justify-between text-base font-extrabold text-text-primary border-t border-border-80 pt-3">
          <span>Estimated Total</span>
          <span id="cart-total-val" class="text-primary">₹0</span>
        </div>
        <button class="w-full btn-premium px-6 py-3 text-sm mt-2 cursor-pointer" id="cart-drawer-checkout-btn">
          Proceed To Checkout
        </button>
      </div>
    </aside>

    <!-- Product Specs Detailed Modal overlay -->
    <div class="modal-backdrop flex items-center justify-center p-4 bg-background-overlay/70 backdrop-blur-sm" id="product-modal-backdrop">
      <div class="modal-content relative bg-surface border border-border rounded-2xl max-w-[650px] w-full shadow-premium-xl overflow-hidden transform scale-95 transition-all duration-300">
        <button class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-text-primary-10 text-text-primary hover:bg-text-primary-10 hover-bg-text-primary-20 rounded-full cursor-pointer transition duration-150 modal-close-btn" title="Close detailed specs modal" aria-label="Close detailed specs modal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
        
        <div class="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] modal-product-layout">
          <!-- Left photo showcase -->
          <div class="aspect-square bg-background-secondary overflow-hidden modal-product-img-wrapper">
            <img class="w-full h-full object-cover" src="" alt="Product detailed display photo">
          </div>
          <!-- Right tech specs and add action -->
          <div class="p-8 sm:p-6 flex flex-col gap-4 justify-center modal-product-info">
            <span class="text-xs font-bold text-text-muted uppercase tracking-widest modal-product-cat">CATEGORY</span>
            <h2 class="text-xl font-extrabold text-text-primary leading-snug modal-product-title">Wireless Headphones</h2>
            <div class="stars-row inline-flex items-center text-rating gap-[2px] text-sm modal-product-stars">
              <!-- Stars dynamic render -->
            </div>
            <p class="text-sm text-text-secondary leading-relaxed modal-product-desc">
              Premium studio grade sound outputs, ergonomic memory foams, long active noise cancellation controls.
            </p>

            <!-- Interactive Variant Configurator -->
            <div class="flex flex-col gap-4 py-4 my-3 modal-configurator">
              <!-- Stock status -->
              <div class="inline-flex items-center gap-2 text-xs font-semibold text-success config-stock-badge" id="modal-stock-badge">
                <span class="w-2.5 h-2.5 rounded-full bg-success inline-block pulse-dot-anim"></span>
                <span id="modal-stock-text">In Stock — Limited quantities available</span>
              </div>
            </div>

            <div class="flex items-center justify-between mt-4 modal-product-footer">
              <span class="text-xl font-extrabold text-text-primary modal-product-price">₹2999</span>
              <button class="btn-premium px-6 py-3 text-sm modal-add-to-cart-btn cursor-pointer">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal overlay -->
    <div class="modal-backdrop flex items-center justify-center p-4 bg-background-overlay/70 backdrop-blur-sm" id="success-modal-backdrop">
      <div class="modal-content relative bg-surface border border-border rounded-2xl max-w-[500px] w-full shadow-premium-xl overflow-hidden transform scale-95 transition-all duration-300">
        <!-- Hidden close btn to allow Escape and click out only -->
        <button class="modal-close-btn hidden" title="Close success invoice modal" aria-label="Close success invoice modal"></button>
        
        <div class="p-8 flex flex-col items-center text-center gap-5 modal-success-layout">
          <div class="bg-success-10 text-success w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl shadow-success-glow success-check-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
          </div>
          <h2 class="text-2xl font-extrabold text-text-primary success-title">Order Confirmed!</h2>
          <p class="text-sm text-text-secondary leading-relaxed max-w-[400px] success-message">
            Thank you for choosing ShopInduct. We have received your payment. Your premium items will be dispatched within 24 hours.
          </p>

          <!-- Mock invoice slip receipt -->
          <div class="w-full bg-background-secondary border border-border rounded-xl p-4 flex flex-col gap-2 text-left receipt-summary">
            <div class="flex justify-between text-xs text-text-secondary receipt-row">
              <span>Order Reference</span>
              <span class="font-bold text-text-primary success-order-id">ORD-189382</span>
            </div>
            <div class="flex justify-between text-xs text-text-secondary receipt-row">
              <span>Invoice Date</span>
              <span class="success-date">27 May 2026</span>
            </div>
            <div class="flex justify-between text-xs text-text-secondary receipt-row">
              <span>Delivering To</span>
              <span class="font-medium text-text-primary success-name">John Doe</span>
            </div>
            <div class="flex justify-between text-xs text-text-secondary receipt-row">
              <span>Shipping Address</span>
              <span class="success-address text-right max-w-[60%] break-all">Flat 204, Royal Palms, Mumbai - 400001</span>
            </div>
            <div class="flex justify-between text-sm font-bold text-text-primary mt-2 border-t border-border pt-2 receipt-row-bold">
              <span>Amount Paid</span>
              <span class="text-success success-total-val">₹0</span>
            </div>
          </div>

          <button class="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl text-text-inverse bg-primary hover:bg-primary-hover cursor-pointer transition duration-150" id="success-continue-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>

    <!-- User Profile & Orders Modal Overlay -->
    <div class="modal-backdrop flex items-center justify-center p-4 bg-background-overlay/70 backdrop-blur-sm" id="profile-modal-backdrop">
      <div class="modal-content relative bg-surface border border-border rounded-2xl max-w-[500px] w-full shadow-premium-xl overflow-hidden transform scale-95 transition-all duration-300">
        <button class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-text-primary-10 text-text-primary hover:bg-text-primary-10 hover-bg-text-primary-20 rounded-full cursor-pointer transition duration-150 modal-close-btn" id="profile-modal-close-btn" title="Close profile modal" aria-label="Close profile modal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
        
        <div class="p-8 flex flex-col gap-6">
          <!-- Profile Header -->
          <div class="flex items-center gap-4 border-b border-border pb-4">
            <div class="w-14 h-14 rounded-full bg-primary-10 text-primary flex items-center justify-center text-xl font-bold border border-primary/20" id="profile-avatar">
              JD
            </div>
            <div>
              <h2 class="text-lg font-extrabold text-text-primary" id="profile-name-display">John Doe</h2>
              <p class="text-xs text-text-secondary" id="profile-email-display">john.doe@example.com</p>
            </div>
          </div>

          <!-- Account Info Section -->
          <div class="flex flex-col gap-3">
            <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider">Account Details</h3>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="bg-background-secondary p-2.5 rounded-lg border border-border">
                <span class="text-text-muted block mb-0.5">Phone</span>
                <span class="font-medium text-text-primary" id="profile-phone-display">+91 9876543210</span>
              </div>
              <div class="bg-background-secondary p-2.5 rounded-lg border border-border">
                <span class="text-text-muted block mb-0.5">Default PIN</span>
                <span class="font-medium text-text-primary" id="profile-pincode-display">400001</span>
              </div>
              <div class="bg-background-secondary p-2.5 rounded-lg border border-border col-span-2">
                <span class="text-text-muted block mb-0.5">Shipping Address</span>
                <span class="font-medium text-text-primary" id="profile-address-display">Flat 204, Royal Palms, Mumbai - 400001</span>
              </div>
            </div>
          </div>

          <!-- Previous Orders Section -->
          <div class="flex flex-col gap-3">
            <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider">Previous Orders</h3>
            <div class="flex flex-col gap-3 max-h-[160px] overflow-y-auto pr-1" id="profile-orders-list">
              <!-- Dynamically populated -->
            </div>
          </div>

          <button class="w-full btn-premium py-2.5 text-xs mt-2" id="profile-logout-btn">
            Log Out
          </button>
        </div>
      </div>
    </div>

    <!-- Authentication Modal Overlay -->
    <div class="modal-backdrop flex items-center justify-center p-4 bg-background-overlay/70 backdrop-blur-sm" id="auth-modal-backdrop">
      <div class="modal-content relative bg-surface border border-border rounded-2xl max-w-[400px] w-full shadow-premium-xl overflow-hidden transform scale-95 transition-all duration-300">
        <!-- Header with Toggle Tabs -->
        <div class="flex border-b border-border-80">
          <button id="tabSignIn" class="flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-primary text-text-primary transition-all cursor-pointer">
            Sign In
          </button>
          <button id="tabSignUp" class="flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-all cursor-pointer">
            Create Account
          </button>
        </div>

        <!-- Content Area -->
        <div class="p-8">
          <!-- SIGN IN FORM -->
          <form id="signInForm" class="space-y-6">
            <div class="text-center mb-6">
              <h3 class="text-xl font-extrabold text-text-primary tracking-tight">Welcome Back</h3>
              <p class="text-text-secondary text-xs mt-1 font-medium">Access your personalized elite shopping dashboard</p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Email Address *</label>
                <input type="email" id="loginEmail" required class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" placeholder="customer@gmail.com">
              </div>

              <div>
                <label class="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Password *</label>
                <input type="password" id="loginPassword" required class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" placeholder="••••••••">
              </div>
            </div>

            <div id="loginErrorMsg" class="text-danger text-xs font-bold text-center hidden mb-2"></div>

            <button type="submit" class="w-full btn-premium py-3.5 text-xs">
              Sign In
            </button>
          </form>

          <!-- SIGN UP FORM -->
          <form id="signUpForm" class="space-y-4 hidden">
            <div class="text-center mb-4">
              <h3 class="text-xl font-extrabold text-text-primary tracking-tight">Create Elite Profile</h3>
              <p class="text-text-secondary text-xs mt-1 font-medium">Join us for premium privileges and deliveries</p>
            </div>

            <div class="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">First Name *</label>
                  <input type="text" id="regFirstName" required class="input-field w-full px-3 py-2 bg-background-secondary border border-border-80 rounded-xl text-xs text-text-primary outline-none focus:bg-surface focus:border-primary transition-all" placeholder="John">
                </div>
                <div>
                  <label class="block text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Last Name *</label>
                  <input type="text" id="regLastName" required class="input-field w-full px-3 py-2 bg-background-secondary border border-border-80 rounded-xl text-xs text-text-primary outline-none focus:bg-surface focus:border-primary transition-all" placeholder="Doe">
                </div>
              </div>

              <div>
                <label class="block text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Email Address *</label>
                <input type="email" id="regEmail" required class="input-field w-full px-3 py-2 bg-background-secondary border border-border-80 rounded-xl text-xs text-text-primary outline-none focus:bg-surface focus:border-primary transition-all" placeholder="user@gmail.com">
              </div>

              <div>
                <label class="block text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Mobile Number (10 Digits) *</label>
                <input type="tel" id="regPhone" required pattern="^[0-9]{10}$" class="input-field w-full px-3 py-2 bg-background-secondary border border-border-80 rounded-xl text-xs text-text-primary outline-none focus:bg-surface focus:border-primary transition-all" placeholder="9876543210">
              </div>

              <div>
                <label class="block text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Gender *</label>
                <div class="flex gap-4 p-1">
                  <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-text-secondary">
                    <input type="radio" name="regGender" value="Male" checked>
                    Male
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-text-secondary">
                    <input type="radio" name="regGender" value="Female">
                    Female
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Secret Password *</label>
                <input type="password" id="regPassword" required minlength="6" class="input-field w-full px-3 py-2 bg-background-secondary border border-border-80 rounded-xl text-xs text-text-primary outline-none focus:bg-surface focus:border-primary transition-all" placeholder="Min 6 characters">
              </div>
            </div>

            <div id="signUpErrorMsg" class="text-danger text-xs font-bold text-center hidden mb-2"></div>

            <button type="submit" class="w-full btn-premium py-3.5 text-xs">
              Create Account
            </button>
          </form>

          <!-- Dismiss -->
          <div class="mt-6 pt-4 border-t border-border-80 text-center">
            <button id="btnCancelAuth" class="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Utilities (Back to Top) -->
    <button class="back-to-top fixed bottom-6 left-6 z-[90] bg-surface border border-border shadow-premium-md rounded-full w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary transition duration-150 cursor-pointer" id="back-to-top-btn" title="Back to top of page" aria-label="Scroll back to top of the page">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
    </button>

    <!-- Toast Notification Containers -->
    <div class="fixed bottom-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none max-w-[380px] w-full px-4 sm:px-0" id="toast-container"></div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  while (container.firstChild) {
    document.body.appendChild(container.firstChild);
  }
}

export function toggleCartDrawer(show) {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-drawer-backdrop');
  if (!drawer || !backdrop) return;

  if (show) {
    drawer.classList.add('active');
    backdrop.classList.add('active');
  } else {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
  }
}

// --- MODALS CLOSERS ---
function initGlobalModalClosers() {
  const productModal = document.getElementById('product-modal-backdrop');
  const successModal = document.getElementById('success-modal-backdrop');
  const profileModal = document.getElementById('profile-modal-backdrop');
  const authModal = document.getElementById('auth-modal-backdrop');

  const setupClosers = (modal) => {
    if (!modal) return;
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  };

  setupClosers(productModal);
  setupClosers(successModal);
  setupClosers(profileModal);
  setupClosers(authModal);

  const successContinueBtn = document.getElementById('success-continue-btn');
  if (successContinueBtn && successModal) {
    successContinueBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      window.location.hash = '#home';
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (productModal) productModal.classList.remove('active');
      if (successModal) successModal.classList.remove('active');
      if (profileModal) profileModal.classList.remove('active');
      if (authModal) authModal.classList.remove('active');
    }
  });
}

export function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal-backdrop');
  if (!modal) return;

  modal.querySelector('.modal-product-img-wrapper img').src = product.image;
  modal.querySelector('.modal-product-img-wrapper img').alt = product.title;
  modal.querySelector('.modal-product-cat').textContent = product.category;
  modal.querySelector('.modal-product-title').textContent = product.title;
  modal.querySelector('.modal-product-desc').textContent = product.description || "No description available.";
  modal.querySelector('.modal-product-price').textContent = `₹${product.price}`;

  const ratingRow = modal.querySelector('.modal-product-stars');
  if (ratingRow) {
    ratingRow.innerHTML = getStarsHtml(product.rating);
  }

  const dot = modal.querySelector('.pulse-dot-anim');
  const stockText = modal.querySelector('#modal-stock-text');
  if (dot && stockText) {
    if (product.id % 3 === 0) {
      dot.style.backgroundColor = 'var(--accent-color)';
      stockText.textContent = 'Low Stock — Only 2 units left in store!';
      stockText.style.color = 'var(--accent-color)';
    } else {
      dot.style.backgroundColor = 'var(--success-color)';
      stockText.textContent = 'In Stock — Available for immediate dispatch';
      stockText.style.color = 'var(--success-color)';
    }
  }

  const cta = modal.querySelector('.modal-add-to-cart-btn');
  if (cta) {
    const newCta = cta.cloneNode(true);
    cta.parentNode.replaceChild(newCta, cta);
    newCta.addEventListener('click', () => {
      addToCart(product.id);
      modal.classList.remove('active');
    });
  }

  modal.classList.add('active');
}

export function openSuccessModal(orderData) {
  const modal = document.getElementById('success-modal-backdrop');
  if (!modal) return;

  modal.querySelector('.success-order-id').textContent = orderData.orderId;
  modal.querySelector('.success-date').textContent = orderData.date;
  modal.querySelector('.success-name').textContent = orderData.name;
  modal.querySelector('.success-address').textContent = orderData.address;
  modal.querySelector('.success-total-val').textContent = `₹${orderData.total}`;

  modal.classList.add('active');
  showToast("Order Placed Successfully!", "success");
}

export function openProfileModal() {
  if (!currentUser) {
    openAuthModal('profile');
    return;
  }

  const modal = document.getElementById('profile-modal-backdrop');
  if (!modal) return;

  const avatar = modal.querySelector('#profile-avatar');
  if (avatar) {
    const name = currentUser.firstName || currentUser.name || 'User';
    avatar.textContent = name.charAt(0).toUpperCase();
  }

  modal.querySelector('#profile-name-display').textContent = `${currentUser.firstName || currentUser.name || ''} ${currentUser.lastName || ''}`;
  modal.querySelector('#profile-email-display').textContent = currentUser.email;
  modal.querySelector('#profile-phone-display').textContent = currentUser.phone || 'N/A';
  modal.querySelector('#profile-pincode-display').textContent = currentUser.pincode || 'N/A';
  
  const address = currentUser.house ? `${currentUser.house}, ${currentUser.address}` : (currentUser.address || 'N/A');
  modal.querySelector('#profile-address-display').textContent = address;

  // Populates orders list dynamically
  const list = modal.querySelector('#profile-orders-list');
  if (list) {
    const orders = currentUser.orders || [];
    if (orders.length === 0) {
      list.innerHTML = `
        <div class="text-center py-6 text-text-muted text-xs bg-background-secondary rounded-xl border border-border border-dashed">
          No orders placed yet.
        </div>`;
    } else {
      list.innerHTML = orders.map(order => `
        <div class="bg-background-secondary border border-border rounded-xl p-3 flex justify-between items-center text-xs">
          <div>
            <div class="font-bold text-text-primary">${order.orderId}</div>
            <div class="text-[10px] text-text-muted mt-0.5">${order.orderDate || order.date} • ${order.items ? order.items.length : 0} items</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-success">${order.grandTotal || ('₹' + order.total)}</div>
            <div class="text-[9px] bg-success-10 text-success font-semibold px-2 py-0.5 rounded-full inline-block mt-1">Confirmed</div>
          </div>
        </div>
      `).join('');
    }
  }

  const logoutBtn = modal.querySelector('#profile-logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      modal.classList.remove('active');
      apiLogout();
      syncSession();
      renderCartDrawer();
      renderHeader();
      window.location.hash = '#home';
      showToast("Logged out successfully", "info");
    };
  }

  modal.classList.add('active');
}

export function openAuthModal(redirect = null) {
  authRedirectTarget = redirect;
  const modal = document.getElementById('auth-modal-backdrop');
  if (modal) {
    modal.classList.add('active');
  }
}

export function closeAuthModal() {
  const modal = document.getElementById('auth-modal-backdrop');
  if (modal) {
    modal.classList.remove('active');
  }
  authRedirectTarget = null;
}

let authRedirectTarget = null;

function initAuthEvents() {
  const backdrop = document.getElementById('auth-modal-backdrop');
  const tabSignIn = document.getElementById('tabSignIn');
  const tabSignUp = document.getElementById('tabSignUp');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const btnCancelAuth = document.getElementById('btnCancelAuth');

  if (tabSignIn && tabSignUp && signInForm && signUpForm) {
    tabSignIn.addEventListener('click', () => {
      tabSignIn.className = "flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-primary text-text-primary transition-all cursor-pointer";
      tabSignUp.className = "flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-all cursor-pointer";
      signInForm.classList.remove('hidden');
      signUpForm.classList.add('hidden');
    });

    tabSignUp.addEventListener('click', () => {
      tabSignUp.className = "flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-primary text-text-primary transition-all cursor-pointer";
      tabSignIn.className = "flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-all cursor-pointer";
      signUpForm.classList.remove('hidden');
      signInForm.classList.add('hidden');
    });
  }

  if (btnCancelAuth && backdrop) {
    btnCancelAuth.addEventListener('click', () => {
      backdrop.classList.remove('active');
    });
  }

  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value;
      const errorMsg = document.getElementById('loginErrorMsg');

      const res = apiLogin(email, pass);
      if (res.success) {
        syncSession();
        renderHeader();
        renderCartDrawer();
        backdrop.classList.remove('active');
        showToast("Welcome back!", "success");
        if (authRedirectTarget === 'profile') {
          openProfileModal();
        } else if (authRedirectTarget === 'checkout') {
          window.location.hash = '#checkout';
        }
      } else {
        errorMsg.textContent = res.message;
        errorMsg.classList.remove('hidden');
      }
    });
  }

  if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('regFirstName').value.trim();
      const lastName = document.getElementById('regLastName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const gender = document.querySelector('input[name="regGender"]:checked')?.value || 'Male';
      const password = document.getElementById('regPassword').value;
      const errorMsg = document.getElementById('signUpErrorMsg');

      const res = apiRegister(email, password, { firstName, lastName, phone, gender });
      if (res.success) {
        syncSession();
        renderHeader();
        renderCartDrawer();
        backdrop.classList.remove('active');
        showToast("Account created successfully!", "success");
        if (authRedirectTarget === 'profile') {
          openProfileModal();
        } else if (authRedirectTarget === 'checkout') {
          window.location.hash = '#checkout';
        }
      } else {
        errorMsg.textContent = res.message;
        errorMsg.classList.remove('hidden');
      }
    });
  }
}

export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? `<svg class="toast-icon-success text-success" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`
    : type === 'error'
    ? `<svg class="toast-icon-error text-danger" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px; color: var(--accent-color);"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 1.063 1.06l-.041.02a.75.75 0 0 1-1.063-1.06Zm-9.62 1.62c-.22-.387-.218-.868.004-1.253a8.966 8.966 0 0 1 2.3-2.61c.427-.34.98-.52(1.547-.506A8.96 8.96 0 0 1 12 10.25a8.96 8.96 0 0 1 6.53-2.987c.567-.014 1.12.166 1.547.506a8.966 8.966 0 0 1 2.3 2.61c.222.385.224.866.004 1.253a8.966 8.966 0 0 1-2.3 2.61c-.427.34-.98.52-1.547.506A8.96 8.96 0 0 1 12 13.75a8.96 8.96 0 0 1-6.53 2.987c-.567.014-1.12-.166-1.547-.506a8.966 8.966 0 0 1-2.3-2.61Z" /></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <p class="toast-message text-text-primary text-xs font-semibold leading-relaxed">${message}</p>
    </div>
    <div class="toast-progress ${type === 'success' ? 'toast-success-progress' : type === 'error' ? 'toast-error-progress' : ''}"></div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2500);
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- PRODUCT CARDS GENERATION ---
export function createProductCardHtml(product, isSlider = false) {
  const cardHtml = `
    <div class="product-card group bg-surface border border-border rounded-2xl p-4 flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-premium-lg h-full cursor-grab active:cursor-grabbing w-full" data-product-id="${product.id}" draggable="true">
      <!-- Image Container -->
      <div class="aspect-square bg-background-secondary rounded-xl relative overflow-hidden cursor-pointer mb-3" data-action="view-details">
        <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" src="${product.image}" alt="${product.title}" loading="lazy" draggable="false">
        <!-- Price Badge on top-right of image -->
        <span class="absolute top-3 right-3 bg-constant-dark/60 text-constant-white text-xs font-bold px-2 py-1 rounded-lg shadow-premium-sm">₹${product.price}</span>
      </div>
      
      <!-- Card Body Content -->
      <div class="flex flex-col flex-1 gap-1">
        <!-- Category name in uppercase -->
        <span class="text-[10px] uppercase font-bold text-text-muted tracking-widest">${product.category}</span>
        
        <!-- Product Title -->
        <h3 class="text-sm font-bold text-text-primary leading-snug cursor-pointer line-clamp-2 h-10 hover:text-primary transition-colors mb-1" data-action="view-details">${product.title}</h3>
        
        <!-- Rating Row -->
        <div class="flex items-center gap-1 text-xs text-text-secondary mb-3">
          <span class="inline-flex items-center gap-[2px] text-rating">
            ${getStarsHtml(product.rating)}
          </span>
          <span class="font-extrabold text-text-primary ml-1">${product.rating}</span>
          <span class="text-text-muted">(${100 + product.id * 7})</span>
        </div>
        
        <!-- Full width Add to Cart button -->
        <button class="w-full mt-auto btn-premium py-2.5 text-xs gap-2 add-to-cart-btn cursor-pointer" data-product-id="${product.id}" title="Add to Cart" aria-label="Add ${product.title} to cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          Add to Cart
        </button>
      </div>
    </div>
  `;

  if (isSlider) {
    return `
      <div class="product-card-container w-[280px] shrink-0 snap-start">
        ${cardHtml}
      </div>
    `;
  }
  return cardHtml;
}

export function getStarsHtml(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5 text-rating"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>`;
    } else if (i === fullStars + 1 && hasHalf) {
      html += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5 text-rating"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>`;
    } else {
      html += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 text-text-muted"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.15-.352.65-.352.8 0l2.122 5.101 5.5 1.002c.408.075.57.579.28.87l-4 3.902 1.082 5.48c.081.408-.344.717-.7.5l-4.9-3.003-4.9 3.003c-.356.217-.781-.092-.7-.5l1.082-5.48-4-3.902c-.29-.29-.128-.795.28-.87l5.5-1.002 2.122-5.101Z" /></svg>`;
    }
  }
  return html;
}

export function bindCardInteractions(containerElement) {
  containerElement.querySelectorAll('[data-action="view-details"]').forEach(el => {
    el.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = parseInt(card.getAttribute('data-product-id'));
      openProductModal(id);
    });
  });

  // Bind Add to Cart directly on cards
  containerElement.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = e.target.closest('.product-card');
      const id = parseInt(card.getAttribute('data-product-id'));
      addToCart(id);
    });
  });
}

// --- DOCK DRAG & DROP FOR CART DRAWERS ---
function initDragAndDrop() {
  const zone = document.getElementById('cart-dropzone-indicator');
  const cartBtn = document.getElementById('nav-cart-btn');

  document.body.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.product-card');
    if (card) {
      const id = card.getAttribute('data-product-id');
      e.dataTransfer.setData('text/plain', id);
      e.dataTransfer.effectAllowed = 'copy';
      
      // Highlight targets
      if (zone) zone.classList.add('dragover');
      toggleCartDrawer(true);
    }
  });

  document.body.addEventListener('dragend', () => {
    if (zone) zone.classList.remove('dragover');
  });

  if (zone) {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      const id = parseInt(e.dataTransfer.getData('text/plain'));
      if (!isNaN(id)) {
        addToCart(id);
      }
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });

    cartBtn.addEventListener('drop', (e) => {
      e.preventDefault();
      const id = parseInt(e.dataTransfer.getData('text/plain'));
      if (!isNaN(id)) {
        addToCart(id);
        toggleCartDrawer(true);
      }
    });
  }
}

// --- CART DRAWER RENDERING ---
export function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const footer = document.getElementById('cart-drawer-footer');
  const badge = document.getElementById('nav-cart-badge-count');

  if (!container) return;

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  if (state.cart.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    footer.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  footer.classList.remove('hidden');

  container.innerHTML = state.cart.map(item => `
    <div class="flex gap-4 p-4 bg-background-secondary border border-border-80 rounded-xl relative hover:border-primary transition-all duration-300">
      <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-lg object-cover bg-surface border border-border">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="text-[9px] font-bold text-text-muted uppercase tracking-widest">${item.category}</span>
        <h5 class="text-xs font-bold text-text-primary mt-0.5 leading-tight line-clamp-1">${item.title}</h5>
        <div class="flex items-center justify-between mt-auto">
          <div class="flex items-center gap-2 bg-surface border border-border rounded-lg p-0.5">
            <button class="cart-qty-btn text-text-secondary hover:text-text-primary transition px-1.5 py-0.5 rounded cursor-pointer" data-product-id="${item.id}" data-delta="-1">-</button>
            <span class="text-xs font-bold text-text-primary w-4 text-center">${item.quantity}</span>
            <button class="cart-qty-btn text-text-secondary hover:text-text-primary transition px-1.5 py-0.5 rounded cursor-pointer" data-product-id="${item.id}" data-delta="1">+</button>
          </div>
          <span class="text-xs font-black text-text-primary">₹${item.price * item.quantity}</span>
        </div>
      </div>
      <button class="cart-remove-btn absolute top-3 right-3 text-text-muted hover:text-danger transition cursor-pointer" data-product-id="${item.id}" title="Remove item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
      </button>
    </div>
  `).join('');

  // Calculations
  let discount = 0;
  if (state.promoApplied === 'INDUCT10') {
    discount = Math.round(subtotal * 0.10);
  }

  const shipping = subtotal >= 1999 ? 0 : 150;
  const tax = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + shipping + tax;

  document.getElementById('cart-subtotal-val').textContent = `₹${subtotal}`;
  
  const discountRow = document.getElementById('cart-discount-row');
  if (discount > 0) {
    discountRow.classList.remove('hidden');
    document.getElementById('cart-discount-val').textContent = `-₹${discount}`;
  } else {
    discountRow.classList.add('hidden');
  }

  document.getElementById('cart-shipping-val').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.getElementById('cart-tax-val').textContent = `₹${tax}`;
  document.getElementById('cart-total-val').textContent = `₹${total}`;

  // Qty and Remove listeners
  container.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.getAttribute('data-product-id'));
      const delta = parseInt(btn.getAttribute('data-delta'));
      updateQuantity(id, delta);
    };
  });

  container.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.getAttribute('data-product-id'));
      removeFromCart(id);
    };
  });
}

function initCartDrawerActions() {
  // Promo code
  const promoBtn = document.getElementById('cart-promo-apply-btn');
  const promoInput = document.getElementById('cart-promo-input');
  const promoStatus = document.getElementById('cart-promo-status');

  if (promoBtn && promoInput) {
    promoBtn.onclick = () => {
      const val = promoInput.value.trim().toUpperCase();
      if (val === 'INDUCT10') {
        state.promoApplied = 'INDUCT10';
        promoStatus.textContent = 'Promo code INDUCT10 applied (10% Off!)';
        promoStatus.className = 'text-[11px] font-semibold mt-1 text-success';
        promoStatus.classList.remove('hidden');
        renderCartDrawer();
      } else {
        promoStatus.textContent = 'Invalid promo code';
        promoStatus.className = 'text-[11px] font-semibold mt-1 text-danger';
        promoStatus.classList.remove('hidden');
      }
    };
  }

  // Shop button inside empty drawer
  const shopBtn = document.getElementById('cart-drawer-shop-btn');
  if (shopBtn) {
    shopBtn.onclick = () => {
      toggleCartDrawer(false);
      window.location.hash = '#shop';
    };
  }

  // Checkout redirect button
  const chkBtn = document.getElementById('cart-drawer-checkout-btn');
  if (chkBtn) {
    chkBtn.onclick = () => {
      toggleCartDrawer(false);
      if (!currentUser) {
        openAuthModal('checkout');
      } else {
        window.location.hash = '#checkout';
      }
    };
  }
}

export function addToCart(productId) {
  const userId = currentUser ? currentUser.id : 'guest';
  apiAddToCart(userId, productId);
  syncStateCart();
  renderCartDrawer();
  showToast("Added to Cart", "success");
}

export function removeFromCart(productId) {
  const userId = currentUser ? currentUser.id : 'guest';
  apiRemoveFromCart(userId, productId);
  syncStateCart();
  renderCartDrawer();
  showToast("Removed from Cart", "info");
}

export function updateQuantity(productId, delta) {
  const userId = currentUser ? currentUser.id : 'guest';
  apiUpdateQuantity(userId, productId, delta);
  syncStateCart();
  renderCartDrawer();
}

export function clearCart() {
  const userId = currentUser ? currentUser.id : 'guest';
  apiClearCart(userId);
  syncStateCart();
  renderCartDrawer();
}

// --- SPA ROUTER ---
const routes = {
  '#home': () => renderHomepage(),
  '#shop': () => renderCategoryPage(),
  '#checkout': () => renderCheckoutPage()
};

export function clearAllFilters() {
  state.filters.searchQuery = '';
  state.filters.categories = [];
  state.filters.maxPrice = 6000;
  state.filters.minRating = 0;
  state.filters.sortBy = 'featured';
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  const mobileSearchInput = document.getElementById('mobile-search-input');
  if (mobileSearchInput) mobileSearchInput.value = '';
}

function handleRouting() {
  const hash = window.location.hash || '#home';

  // Dynamic Sub-Navbar Visibility Rules
  const subNavbar = document.querySelector('.sub-navbar');
  if (subNavbar) {
    if (hash === '#shop') {
      subNavbar.classList.remove('hidden');
      subNavbar.classList.remove('md:hidden');
      subNavbar.classList.add('md:block');
    } else {
      subNavbar.classList.remove('md:block');
      subNavbar.classList.add('md:hidden');
      subNavbar.classList.add('hidden');
    }
  }

  const desktopLinks = document.querySelectorAll('.nav-links a');
  desktopLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  const subNavbarLinks = document.querySelectorAll('.sub-nav-link');
  const activeCategory = state.filters.categories.length > 0 ? state.filters.categories[0] : 'all';
  subNavbarLinks.forEach(link => {
    const linkCat = link.getAttribute('data-category');
    if (linkCat === activeCategory) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  const footerLinks = [
    { id: 'footer-link-home', href: '#home' },
    { id: 'footer-link-shop', href: '#shop' }
  ];
  footerLinks.forEach(linkInfo => {
    const el = document.getElementById(linkInfo.id);
    if (el) {
      if (linkInfo.href === hash) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });

  const routeFn = routes[hash] || routes['#home'];
  routeFn();

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Fire app boot
document.addEventListener('DOMContentLoaded', init);
