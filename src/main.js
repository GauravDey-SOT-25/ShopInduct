import './index.css';
import { 
  state, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  registerCustomer,
  authenticateCustomer,
  logoutCustomer,
  updateActiveCustomerInfo,
  saveActiveCustomerAddress,
  deleteActiveCustomerAddress,
  addActiveCustomerOrder
} from './state.js';
import { PromoBanner } from './components/PromoBanner.js';
import { Header } from './components/Header.js';
import { HomeView } from './components/HomeView.js';
import { CatalogView } from './components/CatalogView.js';
import { ProductDetailView } from './components/ProductDetailView.js';
import { Footer } from './components/Footer.js';
import { CartSidebar } from './components/CartSidebar.js';
import { CheckoutModal } from './components/CheckoutModal.js';
import { SuccessModal } from './components/SuccessModal.js';
import { AuthModal } from './components/AuthModal.js';
import { ProfileView } from './components/ProfileView.js';

document.getElementById('app').innerHTML = `
  ${PromoBanner}
  ${Header}
  <div id="viewsWrapper" class="flex-1 w-full flex flex-col">
    ${HomeView}
    ${CatalogView}
    ${ProductDetailView}
    ${ProfileView}
  </div>
  ${Footer}
  ${CartSidebar}
  <div id="cartOverlay" class="fixed inset-0 bg-zinc-900/30 dark:bg-black/60 hidden z-40 backdrop-blur-sm transition-opacity"></div>
  ${CheckoutModal}
  ${SuccessModal}
  ${AuthModal}
  
  <!-- Toast notification system container -->
  <div id="toastContainer" class="fixed top-24 right-4 sm:right-6 z-[100] flex flex-col gap-3.5 pointer-events-none max-w-sm w-full font-sans"></div>

  <!-- Logout Confirmation Modal -->
  <div id="logoutConfirmModal" class="fixed inset-0 hidden items-center justify-center z-[150] p-4 text-left">
    <!-- Backdrop overlay -->
    <div class="absolute inset-0 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-sm"></div>
    <!-- Dialog box container -->
    <div class="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl animate-fade-in pointer-events-auto">
      <div class="text-center">
         <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 mb-4 animate-bounce">
           <svg class="h-6.5 w-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
           </svg>
         </div>
         <h4 class="text-base font-black text-zinc-950 dark:text-white uppercase tracking-wider mb-2">Sign-Out Confirmation</h4>
         <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">Are you sure you want to log out of your account? Your current session and any custom checkout progress values will be reset.</p>
         
         <div class="flex gap-3 justify-center">
           <button id="logoutCancelBtn" class="flex-1 px-5 py-3 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 hover:text-zinc-950 dark:hover:text-white rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-0">
             Cancel
           </button>
           <button id="logoutAcceptBtn" class="flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-0">
             Yes, Log Out
           </button>
         </div>
      </div>
    </div>
  </div>

  <!-- Slick drag and drop visual helper banner (Flipkart inspired overlay guidance) -->
  <div id="dragHelperBanner" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-950/95 dark:bg-white/95 text-white dark:text-zinc-950 px-6 py-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.3)] text-xs font-black tracking-widest flex items-center gap-3.5 border border-zinc-850/60 dark:border-zinc-100/60 pointer-events-none transition-all duration-300 translate-y-24 opacity-0 z-50 uppercase">
    <span class="flex h-2.5 w-2.5 relative">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 dark:bg-amber-500 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
    </span>
    <span class="text-[10px] md:text-xs">👋 DROP ON THE RIGHT AREA OR HEADER CART ICON TO QUICK BUY</span>
  </div>
`;

// Drag and drop tracking states
let isDraggingCard = false;
let draggedCardId = null;
let cartAutoOpened = false;
let dragCompletedSuccessful = false;
let lastDroppedId = null;
let pendingRemoveItemId = null;

// DOM Elements
const productGrid = document.getElementById('productGrid');
const productCount = document.getElementById('productCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartToggle = document.getElementById('cartToggle');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDropZone = document.getElementById('cartDropZone');

// Views
const homeView = document.getElementById('homeView');
const catalogView = document.getElementById('catalogView');
const productDetailView = document.getElementById('productDetailView');
const navLinks = document.querySelectorAll('.nav-link');

// Filter Elements
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const ratingRadios = document.querySelectorAll('.rating-radio');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
let sideCatPills = document.querySelectorAll('.side-cat-pill');
let topCatPills = document.querySelectorAll('.top-cat-pill');
let homeCatCards = document.querySelectorAll('.home-cat-card');
const sortSelect = document.getElementById('sortSelect');
const topCatPillsContainer = document.getElementById('topCatPills');
const sidebarCatPillsContainer = document.getElementById('sidebarCatPills');
const homeCatGrid = document.getElementById('homeCatGrid');

// Checkout Elements
const navCheckoutBtn = document.getElementById('navCheckoutBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const chkCancelBtn = document.getElementById('chkCancelBtn');
const chkCloseIconBtn = document.getElementById('chkCloseIconBtn');
const successModal = document.getElementById('successModal');
const successCloseBtn = document.getElementById('successCloseBtn');

// Navigation Handling
function switchView(targetId) {
  window.scrollTo(0, 0);
  
  homeView.classList.add('hidden');
  catalogView.classList.add('hidden');
  productDetailView.classList.add('hidden');
  
  const profileView = document.getElementById('profileView');
  if (profileView) {
    profileView.classList.add('hidden');
  }

  if (targetId === 'homeView') {
    homeView.classList.remove('hidden');
  } else if (targetId === 'catalogView') {
    catalogView.classList.remove('hidden');
    renderProducts();
  } else if (targetId === 'productDetailView') {
    productDetailView.classList.remove('hidden');
  } else if (targetId === 'profileView') {
    if (!state.activeUser) {
      openAuthModal('profileView');
      return;
    }
    if (profileView) {
      profileView.classList.remove('hidden');
      renderProfile();
    }
  }
  
  // Update nav highlights
  navLinks.forEach(link => {
    if (link.getAttribute('data-target') === targetId) {
      if(link.tagName === 'BUTTON' || link.tagName === 'A') {
        if(link.parentElement && link.parentElement.tagName === 'NAV') {
          link.classList.add('border-zinc-950', 'dark:border-white', 'text-zinc-950', 'dark:text-white');
          link.classList.remove('border-transparent', 'text-zinc-500', 'dark:text-zinc-400');
        }
      }
    } else {
      if(link.tagName === 'BUTTON' || link.tagName === 'A') {
        if(link.parentElement && link.parentElement.tagName === 'NAV') {
          link.classList.remove('border-zinc-950', 'dark:border-white', 'text-zinc-950', 'dark:text-white');
          link.classList.add('border-transparent', 'text-zinc-500', 'dark:text-zinc-400');
        }
      }
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('data-target');
    switchView(target);
  });
});

homeCatCards.forEach(card => {
  card.addEventListener('click', () => {
    state.filters.category = card.getAttribute('data-cat');
    syncCategoryUI();
    switchView('catalogView');
  });
});

function getStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  let html = '';
  for(let i=0; i<fullStars; i++) html += '<span class="text-[#f59e0b]">★</span>';
  if(halfStar) html += '<span class="text-[#f59e0b]">★</span>'; 
  for(let i=0; i<emptyStars; i++) html += '<span class="text-zinc-300 dark:text-zinc-700">★</span>';
  return html;
}

function updateCategory(cat) {
  state.filters.category = cat;
  syncCategoryUI();
  renderProducts();
}

function syncCategoryUI() {
  const cat = state.filters.category;
  
  // Side pills
  sideCatPills.forEach(pill => {
    if (pill.getAttribute('data-value') === cat || (cat.includes(pill.getAttribute('data-value')) && pill.getAttribute('data-value') !== 'all')) {
      pill.classList.remove('bg-zinc-50', 'dark:bg-zinc-900', 'text-zinc-500', 'dark:text-zinc-400', 'hover:bg-zinc-200', 'dark:hover:bg-zinc-800');
      pill.classList.add('bg-zinc-900', 'dark:bg-white', 'text-white', 'dark:text-zinc-950');
    } else if (cat === pill.getAttribute('data-value')) {
      pill.classList.remove('bg-zinc-50', 'dark:bg-zinc-900', 'text-zinc-500', 'dark:text-zinc-400', 'hover:bg-zinc-200', 'dark:hover:bg-zinc-800');
      pill.classList.add('bg-zinc-900', 'dark:bg-white', 'text-white', 'dark:text-zinc-950');
    } else {
      pill.classList.add('bg-zinc-50', 'dark:bg-zinc-900', 'text-zinc-500', 'dark:text-zinc-400', 'hover:bg-zinc-200', 'dark:hover:bg-zinc-800');
      pill.classList.remove('bg-zinc-900', 'dark:bg-white', 'text-white', 'dark:text-zinc-950');
    }
  });
  
  // Top pills
  topCatPills.forEach(pill => {
    if (pill.getAttribute('data-value') === cat) {
      pill.classList.remove('border-transparent', 'text-zinc-500', 'dark:text-zinc-400', 'hover:text-zinc-950', 'dark:text-white');
      pill.classList.add('border-zinc-950', 'dark:border-white', 'text-zinc-950', 'dark:text-white');
    } else {
      pill.classList.add('border-transparent', 'text-zinc-500', 'dark:text-zinc-400', 'hover:text-zinc-950', 'dark:text-white');
      pill.classList.remove('border-zinc-950', 'dark:border-white', 'text-zinc-950', 'dark:text-white');
    }
  });
}

sideCatPills.forEach(pill => pill.addEventListener('click', () => updateCategory(pill.getAttribute('data-value'))));
topCatPills.forEach(pill => pill.addEventListener('click', () => updateCategory(pill.getAttribute('data-value'))));

function renderProducts() {
  let filtered = state.products.filter(p => {
    const query = state.filters.query.toLowerCase().trim();
    const querySingular = query.endsWith('s') && query.length > 3 ? query.slice(0, -1) : query;
    const titleLower = p.title.toLowerCase();
    const productCatLower = p.category.toLowerCase();
    const catSingular = productCatLower.endsWith('s') && productCatLower.length > 3 ? productCatLower.slice(0, -1) : productCatLower;

    const matchesSearch = titleLower.includes(query) ||
                          productCatLower.includes(query) ||
                          productCatLower.includes(querySingular) ||
                          query.includes(productCatLower) ||
                          querySingular.includes(catSingular);
                          
    const filterCatLower = state.filters.category.toLowerCase();
    const productCatLowerCompare = p.category.toLowerCase();
    
    const matchesCat = state.filters.category === 'all' || productCatLowerCompare === filterCatLower || (filterCatLower !== 'all' && productCatLowerCompare.includes(filterCatLower.split(' ')[0]));
       
    const matchesPrice = p.price <= state.filters.maxPrice;
    const matchesRating = p.rating >= state.filters.minRating;
    return matchesSearch && matchesCat && matchesPrice && matchesRating;
  });

  const sortVal = sortSelect.value;
  if(sortVal === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  if(sortVal === 'price-desc') filtered.sort((a,b) => b.price - a.price);

  productCount.textContent = filtered.length;

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div class="col-span-full py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-xl">
        <svg class="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 class="text-lg font-bold text-zinc-950 dark:text-white mb-2">No products found</h3>
        <p class="text-zinc-500 dark:text-zinc-400 text-xs font-medium">Try adjusting your filters or search query.</p>
        <button class="mt-6 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold rounded-lg hover:scale-[1.02] transition-transform" id="emptyResetBtn">Clear All Filters</button>
      </div>`;
    const emptyResetBtn = document.getElementById('emptyResetBtn');
    if(emptyResetBtn) emptyResetBtn.addEventListener('click', () => document.getElementById('resetFiltersBtn').click());
    return;
  }

  productGrid.innerHTML = filtered.map(p => `
    <div class="group bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 transition-all flex flex-col cursor-pointer hover:border-zinc-950 dark:border-white shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]" draggable="true" data-id="${p.id}">
      <div class="relative aspect-[4/3] bg-zinc-50 dark:bg-zinc-900 overflow-hidden border-b border-zinc-200 dark:border-zinc-700">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" draggable="false">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span class="bg-white text-zinc-950 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            View Details
          </span>
        </div>
      </div>
      <div class="p-5 flex-1 flex flex-col pointer-events-none">
        <p class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1.5">${p.category}</p>
        <h4 class="text-sm font-bold text-zinc-950 dark:text-white mb-2 leading-tight">${p.title}</h4>
        
        <div class="flex items-center gap-1.5 mb-5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
          ${getStars(p.rating)}
          <span class="ml-1 text-zinc-950 dark:text-white">${p.rating}</span>
          <span>(${Math.floor(Math.random() * 200 + 50)})</span>
        </div>

        <div class="mt-auto pointer-events-auto">
          <div class="mb-4">
            <span class="text-xl font-black text-zinc-950 dark:text-white">₹${p.price.toFixed(2)}</span>
          </div>
          <button class="add-to-cart-btn z-10 relative w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-950 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-950 dark:focus:ring-white focus:ring-offset-white dark:focus:ring-offset-zinc-950" data-id="${p.id}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <span class="text-[11px] uppercase tracking-wider">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      performAddToCart(parseInt(e.currentTarget.getAttribute('data-id')));
      if (cartSidebar.classList.contains('translate-x-full')) {
         cartCount.classList.add('animate-spin');
         setTimeout(() => cartCount.classList.remove('animate-spin'), 300);
      }
    });
  });

  // Product Details Handlers
  document.getElementById('backToCatalogBtn')?.addEventListener('click', () => {
    switchView('catalogView');
  });

  document.querySelectorAll('.group[draggable]').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      const pidStr = card.getAttribute('data-id');
      draggedCardId = parseInt(pidStr);
      window.draggedProductId = pidStr;
      isDraggingCard = true;
      dragCompletedSuccessful = false;
      
      e.dataTransfer.setData('text/plain', pidStr);
      e.dataTransfer.effectAllowed = 'copy';
      
      // High end visual representation during cursor moves
      setTimeout(() => card.classList.add('dragged-item-ghost', 'border-amber-500'), 0);
      
      // Slide up the navigation guidance banner
      const helper = document.getElementById('dragHelperBanner');
      if (helper) {
        helper.classList.remove('translate-y-24', 'opacity-0');
      }
      
      // Auto open cart drawer to expose drop indicator
      cartAutoOpened = cartSidebar.classList.contains('translate-x-full');
      if (cartAutoOpened) {
        openCart();
      }
      
      // Engage responsive active target feedback
      if (cartDropZone) {
        cartDropZone.classList.add('cart-dropzone-active');
      }
      if (cartToggle) {
        cartToggle.classList.add('cart-btn-drag-over');
      }
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragged-item-ghost', 'border-amber-500');
      isDraggingCard = false;
      
      // Reset visual effects
      if (cartDropZone) {
        cartDropZone.classList.remove('cart-dropzone-active');
      }
      if (cartToggle) {
        cartToggle.classList.remove('cart-btn-drag-over');
      }
      
      // Dismiss visual instruction toast
      const helper = document.getElementById('dragHelperBanner');
      if (helper) {
        helper.classList.add('translate-y-24', 'opacity-0');
      }
      
      // Graceful cancellation rollback
      if (cartAutoOpened && !dragCompletedSuccessful) {
        closeCart();
      }
      
      // Delay resetting key tracking values to give drop handlers enough leeway to execute first
      setTimeout(() => {
        draggedCardId = null;
        window.draggedProductId = null;
        cartAutoOpened = false;
      }, 250);
    });

    card.addEventListener('click', () => {
      openProductDetail(parseInt(card.getAttribute('data-id')));
    });
  });
}

window.openProductDetail = function(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) return;

  document.getElementById('detailImage').src = product.image;
  document.getElementById('detailThumb1').src = product.image;
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailTitle').textContent = product.title;
  document.getElementById('detailStars').innerHTML = getStars(product.rating);
  document.getElementById('detailRatingText').textContent = `${product.rating} / 5`;
  document.getElementById('detailPrice').textContent = `₹${product.price.toFixed(2)}`;
  
  const msrp = product.price * 1.25; 
  document.getElementById('detailMSRP').textContent = `₹${msrp.toFixed(2)}`;
  document.getElementById('detailSavePercent').textContent = '20';
  document.getElementById('detailDescription').textContent = product.description || "Elevate your everyday with premium materials and unmatched functional design. This product is designed to meet your highest expectations.";
  
  const btnAdd = document.getElementById('detailAddToCartBtn');
  const btnBuy = document.getElementById('detailBuyNowBtn');
  
  const newBtnAdd = btnAdd.cloneNode(true);
  btnAdd.parentNode.replaceChild(newBtnAdd, btnAdd);
  newBtnAdd.addEventListener('click', () => {
    performAddToCart(product.id);
    openCart();
  });
  
  const newBtnBuy = btnBuy.cloneNode(true);
  btnBuy.parentNode.replaceChild(newBtnBuy, btnBuy);
  newBtnBuy.addEventListener('click', () => {
    performAddToCart(product.id);
    openCheckout();
  });

  switchView('productDetailView');
}

function showCartToast(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const container = document.getElementById('toastContainer');
  if (!container) return;

  // Create toast element
  const toast = document.createElement('div');
  toast.className = "pointer-events-auto flex items-center gap-3.5 bg-white/95 dark:bg-zinc-950/95 text-zinc-950 dark:text-white px-4 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-zinc-200 dark:border-zinc-850 transition-all duration-300 transform translate-x-24 opacity-0 max-w-xs sm:max-w-sm ml-auto";
  
  toast.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="w-10 h-10 rounded-lg object-contain bg-white dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800">
    <div class="flex-1 min-w-0">
      <p class="text-[10px] font-extrabold uppercase tracking-widest text-[#10b981] flex items-center gap-1 leading-none">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        Added to Cart
      </p>
      <p class="text-xs font-bold truncate mt-1 text-zinc-900 dark:text-zinc-105">${product.title}</p>
    </div>
    <button class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none focus:ring-0 p-1 cursor-pointer">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  // Close button functionality
  const btnClose = toast.querySelector('button');
  const dismissToast = () => {
    toast.classList.add('translate-x-24', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 350);
  };
  if (btnClose) {
    btnClose.addEventListener('click', dismissToast);
  }

  // Mount
  container.appendChild(toast);

  // Trigger entering animation
  setTimeout(() => {
    toast.classList.remove('translate-x-24', 'opacity-0');
  }, 10);

  // Auto-dismiss after 3.5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      dismissToast();
    }
  }, 3500);
}

function performAddToCart(productId) {
  addToCart(productId);
  renderCart();
  showCartToast(productId);
}

function renderCart() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cartCount.textContent = totalItems;
  cartSubtotal.textContent = totalPrice.toFixed(2);
  cartTotal.textContent = totalPrice.toFixed(2);

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-center pb-10">
         <div class="w-16 h-16 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full flex items-center justify-center mb-4 text-zinc-400 dark:text-zinc-500">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
         </div>
         <p class="font-bold text-sm text-zinc-950 dark:text-white">Your cart is empty</p>
         <p class="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-1 max-w-[200px]">Fill it with curated premium lifestyle products.</p>
         <button id="emptyShopBtn" class="mt-6 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-bold text-xs hover:scale-[1.02] transition-transform">Start Shopping</button>
      </div>`;
    const shopBtn = document.getElementById('emptyShopBtn');
    if (shopBtn) shopBtn.addEventListener('click', () => {
      closeCart();
      switchView('catalogView');
    });
    return;
  }

  cartItemsContainer.innerHTML = state.cart.map(item => {
    const isRecentlyDropped = lastDroppedId === item.id;
    const highlightClass = isRecentlyDropped 
      ? 'drop-success-flash ring-2 ring-emerald-500/30' 
      : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700';

    return `
    <div class="flex gap-4 p-4 ${highlightClass} border rounded-2xl relative group hover:border-zinc-950 dark:hover:border-white transition-all duration-300">
      <img src="${item.image}" alt="${item.title}" class="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700">
      <div class="flex-1 min-w-0 flex flex-col">
        <div class="pr-6">
          <p class="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">${item.category}</p>
          <h5 class="text-xs font-bold text-zinc-950 dark:text-white mt-0.5 leading-tight line-clamp-2">${item.title}</h5>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <div class="flex items-center gap-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg p-0.5">
            <button class="qty-btn text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:text-white transition p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded cursor-pointer" data-id="${item.id}" data-delta="-1">
               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
            </button>
            <span class="text-[11px] font-bold w-4 text-center text-zinc-950 dark:text-white">${item.quantity}</span>
            <button class="qty-btn text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:text-white transition p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded cursor-pointer" data-id="${item.id}" data-delta="1">
               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
          </div>
          <span class="text-sm font-black text-zinc-950 dark:text-white">₹${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <button class="remove-btn absolute top-3 right-3 text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-500 transition p-1.5 rounded-full hover:bg-[#ef4444]/10 cursor-pointer" data-id="${item.id}" title="Remove item">
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    </div>
    `;
  }).join('');

  // Clear single-render highlight so future quantity modifications or side changes don't re-flash
  lastDroppedId = null;

  document.querySelectorAll('.qty-btn').forEach(btn => btn.addEventListener('click', (e) => {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const delta = parseInt(e.currentTarget.getAttribute('data-delta'));
    const item = state.cart.find(i => i.id === id);
    if (item && delta === -1 && item.quantity === 1) {
      promptRemoveCartItem(id, item.title || item.name || 'Product');
    } else {
      updateQuantity(id, delta);
      renderCart();
    }
  }));
  document.querySelectorAll('.remove-btn').forEach(btn => btn.addEventListener('click', (e) => {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const item = state.cart.find(i => i.id === id);
    if (item) {
      promptRemoveCartItem(id, item.title || item.name || 'Product');
    } else {
      removeFromCart(id);
      renderCart();
    }
  }));
}

function promptRemoveCartItem(id, title) {
  pendingRemoveItemId = id;
  const titleEl = document.getElementById('removeConfirmItemTitle');
  if (titleEl) titleEl.textContent = title;
  
  const modal = document.getElementById('cartRemoveConfirmModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Global initialization of cart removal confirmation buttons once
if (document.getElementById('btnCancelRemove')) {
  document.getElementById('btnCancelRemove').addEventListener('click', () => {
    const modal = document.getElementById('cartRemoveConfirmModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    pendingRemoveItemId = null;
  });
}

if (document.getElementById('btnAcceptRemove')) {
  document.getElementById('btnAcceptRemove').addEventListener('click', () => {
    const modal = document.getElementById('cartRemoveConfirmModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    if (pendingRemoveItemId !== null) {
      removeFromCart(pendingRemoveItemId);
      renderCart();
    }
    pendingRemoveItemId = null;
  });
}

// Filters Handling
function syncSearchInput(value) {
  state.filters.query = value;
  searchInput.value = value;
  mobileSearchInput.value = value;
  if (value.trim().length > 0) switchView('catalogView');
  renderProducts();
}
searchInput.addEventListener('input', (e) => syncSearchInput(e.target.value));
mobileSearchInput.addEventListener('input', (e) => syncSearchInput(e.target.value));

priceFilter.addEventListener('input', (e) => {
  state.filters.maxPrice = parseFloat(e.target.value);
  priceValue.textContent = e.target.value;
  renderProducts();
});

ratingRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    state.filters.minRating = parseFloat(e.target.value) || 0;
    renderProducts();
  });
});

sortSelect.addEventListener('change', renderProducts);

resetFiltersBtn.addEventListener('click', () => {
  state.filters = { query: '', category: 'all', maxPrice: 25000, minRating: 0 };
  syncSearchInput('');
  priceFilter.value = 25000;
  priceValue.textContent = '25000';
  document.querySelector('.rating-radio[value="0"]').checked = true;
  sortSelect.value = 'featured';
  syncCategoryUI();
  renderProducts();
});

// Cart Drawer Handling
function openCart() {
  cartSidebar.classList.remove('translate-x-full');
  cartOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartSidebar.classList.add('translate-x-full');
  cartOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}
cartToggle.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Drag and Drop Core Logic with Rich Visual Feedback
const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  cartDropZone.classList.add('bg-zinc-900', 'dark:bg-white/10', 'border-zinc-950', 'dark:border-white');
};

const handleDragLeave = () => {
  cartDropZone.classList.remove('bg-zinc-900', 'dark:bg-white/10', 'border-zinc-950', 'dark:border-white');
};

cartDropZone.addEventListener('dragenter', (e) => {
  e.preventDefault();
});
cartDropZone.addEventListener('dragover', handleDragOver);
cartDropZone.addEventListener('dragleave', handleDragLeave);

// Robust Drop Action (Immediate update as requested)
const executeProductDrop = (productIdRaw) => {
  const pid = parseInt(productIdRaw || draggedCardId || window.draggedProductId);
  if (!isNaN(pid)) {
    dragCompletedSuccessful = true;
    lastDroppedId = pid;
    performAddToCart(pid);

    // Trigger bounce animation on the cart count badge
    const countSpan = document.getElementById('cartCount');
    if (countSpan) {
      countSpan.classList.add('cart-bounce-anim');
      setTimeout(() => countSpan.classList.remove('cart-bounce-anim'), 450);
    }
  }
};

cartDropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  handleDragLeave();
  const idStr = e.dataTransfer.getData('text/plain') || draggedCardId || window.draggedProductId;
  executeProductDrop(idStr);
});

cartSidebar.addEventListener('dragenter', (e) => {
  e.preventDefault();
});

cartSidebar.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

cartSidebar.addEventListener('drop', (e) => {
  e.preventDefault();
  const idStr = e.dataTransfer.getData('text/plain') || draggedCardId || window.draggedProductId;
  executeProductDrop(idStr);
});

// Configure Header Cart Button as a direct drop target too!
if (cartToggle) {
  cartToggle.addEventListener('dragenter', (e) => {
    e.preventDefault();
  });

  cartToggle.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    cartToggle.classList.add('cart-btn-drag-over');
  });

  cartToggle.addEventListener('dragleave', () => {
    cartToggle.classList.remove('cart-btn-drag-over');
  });

  cartToggle.addEventListener('drop', (e) => {
    e.preventDefault();
    cartToggle.classList.remove('cart-btn-drag-over');
    const idStr = e.dataTransfer.getData('text/plain') || draggedCardId || window.draggedProductId;
    executeProductDrop(idStr);
    openCart(); // Make sure cart slides open on direct header drop to show success state
  });
}

// Checkout Flow Multi-Step
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
// Forms
const shippingForm = document.getElementById('shippingForm');
const paymentForm = document.getElementById('paymentForm');
// Steps
const steps = ['checkoutStep1', 'checkoutStep2', 'checkoutStep3'];
let checkoutData = JSON.parse(localStorage.getItem('savedCheckoutData')) || {
  name: '', email: '', phone: '', address: '', city: '', pincode: '', payment: 'card',
  cardNum: '', cardName: '', cardExpiry: ''
};

// Helper: Go to step
function goToCheckoutStep(stepIndex) {
  // Hide all steps
  steps.forEach(id => document.getElementById(id).classList.add('hidden'));
  document.getElementById(steps[stepIndex - 1]).classList.remove('hidden');

  // Update Stepper UI
  [1, 2, 3].forEach(i => {
    const ind = document.getElementById(`step${i}Indicator`);
    const icon = document.getElementById(`step${i}Icon`);
    if(!ind || !icon) return;
    if (i < stepIndex) {
      // Completed
      ind.classList.remove('opacity-50');
      icon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>`;
      icon.className = 'w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm';
    } else if (i === stepIndex) {
      // Current
      ind.classList.remove('opacity-50');
      icon.innerHTML = i + 1;
      icon.className = 'w-8 h-8 rounded-[50%] border-[3px] border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm shadow-lg';
    } else {
      // Future
      ind.classList.add('opacity-50');
      icon.innerHTML = i + 1;
      icon.className = 'w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center font-bold text-sm';
    }
  });
}

function populateCheckoutSummary() {
  const summaryContainer = document.getElementById('chkSummaryItems');
  summaryContainer.innerHTML = state.cart.map(item => `
    <div class="flex gap-4">
      <div class="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0">
        <img src="${item.image}" alt="${item.title || item.name || ''}" class="w-full h-full object-cover" draggable="false">
      </div>
      <div class="flex-1">
        <h4 class="text-xs font-bold text-zinc-950 dark:text-white line-clamp-1">${item.title || item.name || 'Product'}</h4>
        <p class="text-[10px] text-zinc-500 mt-1">QTY: ${item.quantity}</p>
        <p class="text-xs font-black text-zinc-950 dark:text-white mt-1">₹${item.price.toFixed(2)}</p>
      </div>
    </div>
  `).join('');

  let subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = subtotal > 0 ? subtotal * 0.15 : 0; // 15% sim discount
  
  // Delivery Speed
  let deliveryCost = 0;
  const speed = document.querySelector('input[name="deliverySpeed"]:checked');
  if (speed && speed.value === 'express') deliveryCost = 1200;
  if (speed && speed.value === 'oneday') deliveryCost = 2800;
  
  let taxes = subtotal > 0 ? (subtotal - discount) * 0.085 : 0; // 8.5% tax
  let total = subtotal - discount + deliveryCost + taxes;

  document.getElementById('chkSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById('chkSavings').textContent = `-₹${discount.toFixed(2)}`;
  
  if (deliveryCost === 0) {
     document.getElementById('chkDeliveryCharge').textContent = `FREE`;
  } else {
     document.getElementById('chkDeliveryCharge').textContent = `₹${deliveryCost.toFixed(2)}`;
  }
  
  document.getElementById('chkTaxes').textContent = `₹${taxes.toFixed(2)}`;
  document.getElementById('chkTotal').textContent = `₹${total.toFixed(2)}`;
  document.getElementById('chkSummaryCount').textContent = `${state.cart.length} items`;
  
  return total;
}

// Add listeners to delivery speed radios
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="deliverySpeed"]').forEach(radio => {
        radio.addEventListener('change', populateCheckoutSummary);
    });
});

function openCheckout() {
  if (state.cart.length === 0) return;
  
  if (!state.activeUser) {
    closeCart();
    openAuthModal('checkout');
    return;
  }
  
  closeCart();
  
  // Use user's default shipping destination if they have address listings
  let finalSource = { ...checkoutData };
  if (state.activeUser) {
    const hasAddresses = state.activeUser.addresses && state.activeUser.addresses.length > 0;
    if (hasAddresses) {
      const defaultAdd = state.activeUser.addresses.find(a => a.isDefault) || state.activeUser.addresses[0];
      finalSource = {
        name: defaultAdd.name,
        phone: defaultAdd.phone,
        pincode: defaultAdd.pincode,
        city: defaultAdd.city,
        state: defaultAdd.state,
        house: defaultAdd.house,
        address: defaultAdd.address,
        landmark: defaultAdd.landmark || '',
        altPhone: defaultAdd.altPhone || '',
        payment: checkoutData.payment || 'card',
        cardNum: checkoutData.cardNum || '',
        cardName: checkoutData.cardName || '',
        cardExpiry: checkoutData.cardExpiry || ''
      };
    } else {
      // Prefill basic account name/phone
      finalSource = {
        name: `${state.activeUser.firstName} ${state.activeUser.lastName}`,
        phone: state.activeUser.phone || '',
        pincode: checkoutData.pincode || '',
        city: checkoutData.city || '',
        state: checkoutData.state || '',
        house: checkoutData.house || '',
        address: checkoutData.address || '',
        landmark: checkoutData.landmark || '',
        altPhone: checkoutData.altPhone || '',
        payment: checkoutData.payment || 'card',
        cardNum: checkoutData.cardNum || '',
        cardName: checkoutData.cardName || '',
        cardExpiry: checkoutData.cardExpiry || ''
      };
    }
  }

  // Fill form from prepared data
  if (document.getElementById('chkFullName')) document.getElementById('chkFullName').value = finalSource.name || '';
  if (document.getElementById('chkPhone')) document.getElementById('chkPhone').value = finalSource.phone || '';
  if (document.getElementById('chkPincode')) document.getElementById('chkPincode').value = finalSource.pincode || '';
  if (document.getElementById('chkCity')) document.getElementById('chkCity').value = finalSource.city || '';
  if (document.getElementById('chkState')) document.getElementById('chkState').value = finalSource.state || '';
  if (document.getElementById('chkHouse')) document.getElementById('chkHouse').value = finalSource.house || '';
  if (document.getElementById('chkAddress')) document.getElementById('chkAddress').value = finalSource.address || '';
  if (document.getElementById('chkLandmark')) document.getElementById('chkLandmark').value = finalSource.landmark || '';
  if (document.getElementById('chkAltPhone')) document.getElementById('chkAltPhone').value = finalSource.altPhone || '';
  
  try {
     document.querySelector(`input[name="paymentMethod"][value="${finalSource.payment}"]`).checked = true;
     
     // Hide both
     document.getElementById('cardFormArea').classList.add('hidden');
     document.getElementById('upiFormArea').classList.add('hidden');
     
     if (finalSource.payment === 'card') {
        document.getElementById('cardFormArea').classList.remove('hidden');
     } else if (finalSource.payment === 'upi') {
        document.getElementById('upiFormArea').classList.remove('hidden');
     }
  } catch(e) {}
  if (document.getElementById('chkCard')) document.getElementById('chkCard').value = finalSource.cardNum || '';
  if (document.getElementById('chkCardName')) document.getElementById('chkCardName').value = finalSource.cardName || '';
  if (document.getElementById('chkExpiry')) document.getElementById('chkExpiry').value = finalSource.cardExpiry || '';
  updateMockCard();

  populateCheckoutSummary();
  checkoutModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  goToCheckoutStep(1);
}

// Bind open triggers
checkoutBtn.addEventListener('click', openCheckout);
if(typeof navCheckoutBtn !== 'undefined' && navCheckoutBtn) navCheckoutBtn.addEventListener('click', (e) => { e.preventDefault(); openCheckout(); });
closeCheckoutBtn.addEventListener('click', () => {
  checkoutModal.classList.add('hidden');
  document.body.style.overflow = '';
});

// Real-time Mock card updates
function updateMockCard() {
   let name = document.getElementById('chkCardName').value || 'YOUR NAME';
   document.getElementById('mockCardName').textContent = name.toUpperCase();
}
document.getElementById('chkCardName').addEventListener('input', updateMockCard);

// Real-time Field Validation Helper Functions
function validateField(el) {
  let val = el.value || '';
  let isValid = true;
  let message = "";
  
  // Custom validation rule checks
  if (el.id === 'chkFullName') {
    isValid = val.trim().length >= 3;
    message = "Full Name must be at least 3 characters.";
  } else if (el.id === 'chkPhone') {
    isValid = /^[0-9]{10}$/.test(val);
    message = "Please enter a valid 10-digit mobile number.";
  } else if (el.id === 'chkPincode') {
    isValid = /^[0-9]{5,6}$/.test(val);
    message = "Postal Code must be a 5 or 6-digit number.";
  } else if (el.id === 'chkCity') {
    isValid = val.trim().length >= 2;
    message = "Please enter your city/town (min 2 characters).";
  } else if (el.id === 'chkState') {
    isValid = val.trim().length >= 2;
    message = "Please enter your state (min 2 characters).";
  } else if (el.id === 'chkHouse') {
    isValid = val.trim().length >= 3;
    message = "House/Apartment details are required.";
  } else if (el.id === 'chkAddress') {
    isValid = val.trim().length >= 5;
    message = "Street address is required (min 5 characters).";
  } else if (el.id === 'chkCard') {
    isValid = /^[0-9]{16}$/.test(val);
    message = "Card number must be exactly 16 digits.";
  } else if (el.id === 'chkCardName') {
    isValid = val.trim().length >= 3;
    message = "Please enter cardholder name (min 3 characters).";
  } else if (el.id === 'chkExpiry') {
    isValid = /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(val);
    message = "Please enter expiry date in MM/YY format.";
  } else if (el.id === 'chkCVV') {
    isValid = /^[0-9]{3,4}$/.test(val);
    message = "CVV must be 3 or 4 digits.";
  } else if (el.id === 'chkUpiId') {
    isValid = /^\w+@[a-zA-Z]+$/.test(val);
    message = "Please enter standard UPI format (e.g. name@bank).";
  }
  
  showFieldValidationError(el, isValid, message);
  return isValid;
}

function showFieldValidationError(inputEl, isValid, message) {
  let errId = inputEl.id + '-realtime-error';
  let errEl = document.getElementById(errId);
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.id = errId;
    errEl.className = 'text-[10px] text-red-500 font-extrabold mt-1 tracking-wide animate-fade-in block';
    
    // Position outside any relative wrapper if possible
    const targetParent = inputEl.closest('.relative') || inputEl;
    targetParent.after(errEl);
  }
  
  if (isValid) {
    errEl.style.display = 'none';
    inputEl.classList.remove('border-red-500', 'focus:ring-red-500', 'dark:border-red-500', 'dark:focus:ring-red-500');
    let stdErr = document.getElementById(inputEl.id + 'Err');
    if (stdErr) stdErr.classList.add('hidden');
  } else {
    errEl.textContent = message;
    errEl.style.display = 'block';
    inputEl.classList.add('border-red-500', 'focus:ring-red-500', 'dark:border-red-500', 'dark:focus:ring-red-500');
    let stdErr = document.getElementById(inputEl.id + 'Err');
    if (stdErr) stdErr.classList.add('hidden');
  }
}

function setupRealtimeValidation() {
  const fields = [
    'chkFullName', 'chkPhone', 'chkPincode', 'chkCity', 'chkState', 'chkHouse', 'chkAddress',
    'chkCard', 'chkCardName', 'chkExpiry', 'chkCVV', 'chkUpiId'
  ];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        validateField(el);
      });
      el.addEventListener('blur', () => {
        validateField(el);
      });
    }
  });
}

// Instantiate validation event triggers
setupRealtimeValidation();

// Handle payment method switch
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    // hide all forms first
    document.getElementById('cardFormArea').classList.add('hidden');
    document.getElementById('upiFormArea').classList.add('hidden');
    
    // clear required
    document.getElementById('chkCard').required = false;
    document.getElementById('chkCardName').required = false;
    document.getElementById('chkExpiry').required = false;
    document.getElementById('chkCVV').required = false;
    document.getElementById('chkUpiId').required = false;
    
    if(e.target.value === 'card') {
      document.getElementById('cardFormArea').classList.remove('hidden');
      document.getElementById('chkCard').required = true;
      document.getElementById('chkCardName').required = true;
      document.getElementById('chkExpiry').required = true;
      document.getElementById('chkCVV').required = true;
    } else if (e.target.value === 'upi') {
      document.getElementById('upiFormArea').classList.remove('hidden');
      document.getElementById('chkUpiId').required = true;
    }
  });
});

// Step Navigation
shippingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Real-time custom validation check before saving
  let isStep1Valid = true;
  const step1Fields = ['chkFullName', 'chkPhone', 'chkPincode', 'chkCity', 'chkState', 'chkHouse', 'chkAddress'];
  step1Fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (!validateField(el)) isStep1Valid = false;
    }
  });
  
  if (!isStep1Valid) {
    const firstInvalidId = step1Fields.find(id => {
      const el = document.getElementById(id);
      return el && !validateField(el);
    });
    if (firstInvalidId) {
      const firstInvalidEl = document.getElementById(firstInvalidId);
      if (firstInvalidEl) firstInvalidEl.focus();
    }
    return;
  }

  // Save step 1 data
  if(document.getElementById('chkFullName')) checkoutData.name = document.getElementById('chkFullName').value;
  if(document.getElementById('chkPhone')) checkoutData.phone = document.getElementById('chkPhone').value;
  if(document.getElementById('chkPincode')) checkoutData.pincode = document.getElementById('chkPincode').value;
  if(document.getElementById('chkCity')) checkoutData.city = document.getElementById('chkCity').value;
  if(document.getElementById('chkState')) checkoutData.state = document.getElementById('chkState').value;
  if(document.getElementById('chkHouse')) checkoutData.house = document.getElementById('chkHouse').value;
  if(document.getElementById('chkAddress')) checkoutData.address = document.getElementById('chkAddress').value;
  if(document.getElementById('chkLandmark')) checkoutData.landmark = document.getElementById('chkLandmark').value;
  if(document.getElementById('chkAltPhone')) checkoutData.altPhone = document.getElementById('chkAltPhone').value;
  
  localStorage.setItem('savedCheckoutData', JSON.stringify(checkoutData));
  
  goToCheckoutStep(2);
});

document.getElementById('btnBackToStep1').addEventListener('click', () => goToCheckoutStep(1));

document.getElementById('btnToStep3').addEventListener('click', () => {
    let paymentVal = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentVal === 'card') {
       let isCardValid = true;
       const cardFields = ['chkCard', 'chkCardName', 'chkExpiry', 'chkCVV'];
       cardFields.forEach(id => {
         const el = document.getElementById(id);
         if (el) {
           if (!validateField(el)) isCardValid = false;
         }
       });
       if (!isCardValid) {
         const firstInvalidId = cardFields.find(id => {
           const el = document.getElementById(id);
           return el && !validateField(el);
         });
         if (firstInvalidId) {
           const firstInvalidEl = document.getElementById(firstInvalidId);
           if (firstInvalidEl) firstInvalidEl.focus();
         }
         return;
       }
    } else if (paymentVal === 'upi') {
       const upiEl = document.getElementById('chkUpiId');
       if (upiEl) {
         if (!validateField(upiEl)) {
           upiEl.focus();
           return;
         }
       }
    }
    
    // Save Step 2 data
    checkoutData.payment = paymentVal;
    if(paymentVal === 'card') {
       checkoutData.cardNum = document.getElementById('chkCard').value;
       checkoutData.cardName = document.getElementById('chkCardName').value;
       checkoutData.cardExpiry = document.getElementById('chkExpiry').value;
    } else if (paymentVal === 'upi') {
       checkoutData.upiId = document.getElementById('chkUpiId').value;
    }
    localStorage.setItem('savedCheckoutData', JSON.stringify(checkoutData));

    // Prepare Step 3 Review Labels
    document.getElementById('reviewAddressLabel').innerHTML = `${checkoutData.name} <br> ${checkoutData.house || ''}, ${checkoutData.address || ''}`;
    document.getElementById('reviewCityLabel').textContent = `${checkoutData.city || ''}, ${checkoutData.state || ''} - ${checkoutData.pincode || ''}`;
    
    let paymentText = paymentVal === 'card' ? `Credit Card ending in ${checkoutData.cardNum.slice(-4) || '****'}` : 
                      paymentVal === 'upi' ? `UPI: ${checkoutData.upiId}` : 
                      paymentVal === 'netbanking' ? 'Net Banking (Sandbox)' : 'Cash on Delivery';
    document.getElementById('reviewPaymentLabel').textContent = paymentText;
    
    goToCheckoutStep(3);
});

document.getElementById('btnBackToStep2').addEventListener('click', () => goToCheckoutStep(2));
document.getElementById('editStep1Btn').addEventListener('click', () => goToCheckoutStep(1));
document.getElementById('editStep2Btn').addEventListener('click', () => goToCheckoutStep(2));

// Complete Checkout
document.getElementById('btnPlaceOrder').addEventListener('click', (e) => {
    let btn = e.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...`;
    
    setTimeout(() => {
       // Close modal and show timeline success view
       checkoutModal.classList.add('hidden');
       
       let finalTotal = document.getElementById('chkTotal').textContent;
       
       // Populate success details
       document.getElementById('successAddressName').textContent = checkoutData.name;
       document.getElementById('successAddressLine').textContent = checkoutData.address;
       document.getElementById('successAddressPhone').textContent = checkoutData.phone;
       document.getElementById('successAmountPaid').textContent = finalTotal;
       document.getElementById('successPaymentType').textContent = checkoutData.payment;
       
       const ordId = `ORD-${Math.floor(Math.random()*90000000)+10000000}`;
       const trkId = `TRK-${Math.floor(Math.random()*90000000)+10000000}`;
       document.getElementById('timelineOrderId').textContent = ordId;
       document.getElementById('timelineTrackId').textContent = trkId;
       
       // Record this order into our customer's account orders log dynamically
       if (state.activeUser) {
          const placedOrder = {
             orderId: ordId,
             trackId: trkId,
             orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
             status: 'Processing',
             grandTotal: finalTotal,
             paymentType: checkoutData.payment,
             items: JSON.parse(JSON.stringify(state.cart))
          };
          addActiveCustomerOrder(placedOrder);
       }

       document.getElementById('successTimelineView').classList.remove('hidden');
       document.getElementById('successTimelineView').classList.add('flex');
       
       clearCart(); 
       renderCart();
       btn.innerHTML = originalContent;
    }, 1500);
});

document.getElementById('successHomeBtn').addEventListener('click', () => {
    document.getElementById('successTimelineView').classList.add('hidden');
    document.getElementById('successTimelineView').classList.remove('flex');
    document.body.style.overflow = '';
    switchView('homeView');
});

// Initialization
function generateCategories() {
  const categoriesMap = new Map();
  state.products.forEach(p => {
    if (!categoriesMap.has(p.category)) {
      categoriesMap.set(p.category, { count: 0, image: p.image });
    }
    categoriesMap.get(p.category).count++;
  });

  const categories = Array.from(categoriesMap.entries()).map(([cat, info]) => ({ name: cat, ...info }));

  // Update topCatPills
  topCatPillsContainer.innerHTML = `<button class="top-cat-pill text-zinc-950 dark:text-white pb-1 border-b-2 border-zinc-950 dark:border-white transition-all" data-value="all">All Catalog</button>` + 
    categories.map(c => `<button class="top-cat-pill text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:text-white pb-1 border-b-2 border-transparent transition-all" data-value="${c.name}">${c.name}</button>`).join('');

  // Update sidebarCatPills
  sidebarCatPillsContainer.innerHTML = `<button class="side-cat-pill text-left px-4 py-2.5 text-xs font-bold rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 transition-all" data-value="all">All Products</button>` + 
    categories.map(c => `<button class="side-cat-pill text-left px-4 py-2.5 text-xs font-bold rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all" data-value="${c.name}">${c.name}</button>`).join('');

  // Update homeCatGrid
  homeCatGrid.innerHTML = categories.map(c => {
    return `
    <div class="home-cat-card aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 relative group cursor-pointer" data-cat="${c.name}">
      <img src="${c.image}" alt="${c.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
      <div class="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-zinc-950/90 via-white/20 dark:via-zinc-950/20 to-transparent"></div>
      <div class="absolute bottom-6 left-6">
        <h4 class="text-xl font-bold text-zinc-950 dark:text-white">${c.name}</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">${c.count} Products</p>
      </div>
    </div>`;
  }).join('');

  // Re-bind listeners
  sideCatPills = document.querySelectorAll('.side-cat-pill');
  topCatPills = document.querySelectorAll('.top-cat-pill');
  homeCatCards = document.querySelectorAll('.home-cat-card');

  homeCatCards.forEach(card => {
    card.addEventListener('click', () => {
      state.filters.category = card.getAttribute('data-cat');
      syncCategoryUI();
      switchView('catalogView');
    });
  });

  sideCatPills.forEach(pill => pill.addEventListener('click', () => updateCategory(pill.getAttribute('data-value'))));
  topCatPills.forEach(pill => pill.addEventListener('click', () => updateCategory(pill.getAttribute('data-value'))));
}

/* ==========================================
   AUTHENTICATION & PROFILE DASHBOARD LOGIC
   ========================================== */

let authRedirectTarget = null;

// Opens the Authentication Modal.
function openAuthModal(redirect = null) {
  authRedirectTarget = redirect;
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Default to sign-in tab & clear inputs
    const tabSignIn = document.getElementById('tabSignIn');
    if (tabSignIn) tabSignIn.click();
    
    // Clear warning buffers
    document.getElementById('loginErrorMsg').classList.add('hidden');
    document.getElementById('signUpErrorMsg').classList.add('hidden');
  }
}

// Closes the Authentication Modal.
function closeAuthModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  authRedirectTarget = null;
}

// Updates Header details to reflect guest/auth status
function updateAuthHeader() {
  const indicator = document.getElementById('headerUserIndicator');
  if (indicator) {
    if (state.activeUser) {
      indicator.textContent = `HI, ${state.activeUser.firstName.toUpperCase()}`;
      indicator.classList.remove('hidden');
    } else {
      indicator.textContent = 'GUEST';
      indicator.classList.add('hidden');
    }
  }
}

// Switches active panes on Profile Dashboard tab navigation
function switchProfileTab(tabName) {
  const personalInfo = document.getElementById('panelPersonalInfo');
  const addresses = document.getElementById('panelAddresses');
  const orders = document.getElementById('panelOrders');
  
  if (personalInfo) personalInfo.classList.add('hidden');
  if (addresses) addresses.classList.add('hidden');
  if (orders) orders.classList.add('hidden');
  
  const buttons = [
    { id: 'profTabInfoBtn', panel: personalInfo },
    { id: 'profTabAddressesBtn', panel: addresses },
    { id: 'profTabOrdersBtn', panel: orders }
  ];
  
  buttons.forEach(({ id, panel }) => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === tabName) {
        if (panel) panel.classList.remove('hidden');
        // Apply active pristine style list directly (fully resetting outline and ring)
        btn.className = "flex items-center gap-3 px-6 py-4 border-l-4 border-zinc-950 dark:border-white text-zinc-950 dark:text-white bg-zinc-200/50 dark:bg-zinc-800 text-xs font-black uppercase tracking-wider text-left transition-all relative outline-none focus:outline-none focus:ring-transparent focus:ring-0";
        // If it's the addresses or orders tab, draw them
        if (id === 'profTabAddressesBtn') renderAddressesTab();
        if (id === 'profTabOrdersBtn') renderOrdersTab();
      } else {
        // Apply inactive pristine style list directly (fully resetting outline and ring)
        btn.className = "flex items-center gap-3 px-6 py-4 border-l-4 border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-white text-xs font-bold uppercase tracking-wider text-left transition-all relative hover:bg-zinc-100/50 dark:hover:bg-zinc-800/10 lg:hover:bg-zinc-100/50 lg:dark:hover:bg-zinc-800/10 outline-none focus:outline-none focus:ring-transparent focus:ring-0";
      }
    }
  });
}

// Redraws Profile Details and navigation
function renderProfile() {
  if (!state.activeUser) {
    switchView('homeView');
    return;
  }
  
  // Fill text greeting headers
  const helloName = document.getElementById('profileHelloName');
  if (helloName) helloName.textContent = `Hello, ${state.activeUser.firstName} ${state.activeUser.lastName}`;
  
  const avatar = document.getElementById('profileAvatar');
  if (avatar) avatar.textContent = state.activeUser.firstName.charAt(0).toUpperCase();

  // Populate info form
  const fName = document.getElementById('profFirstName');
  const lName = document.getElementById('profLastName');
  const email = document.getElementById('profEmail');
  const phone = document.getElementById('profPhone');
  
  if (fName) fName.value = state.activeUser.firstName || '';
  if (lName) lName.value = state.activeUser.lastName || '';
  if (email) email.value = state.activeUser.email || '';
  if (phone) phone.value = state.activeUser.phone || '';
  
  if (state.activeUser.gender) {
    const genderRad = document.querySelector(`input[name="profGender"][value="${state.activeUser.gender}"]`);
    if (genderRad) genderRad.checked = true;
  }
  
  // Reset passwords and errors
  const newPass = document.getElementById('profNewPassword');
  const confirmPass = document.getElementById('profConfirmPassword');
  if (newPass) newPass.value = '';
  if (confirmPass) confirmPass.value = '';
  
  const saveMsg = document.getElementById('profileSaveMsg');
  if (saveMsg) saveMsg.classList.add('hidden');

  // Update badge
  const orderCount = state.activeUser.orders ? state.activeUser.orders.length : 0;
  const badge = document.getElementById('profileOrdersBadge');
  if (badge) badge.textContent = orderCount;

  // Render initial personal tab
  switchProfileTab('profTabInfoBtn');
}

// Address Book list drawing
function renderAddressesTab() {
  const container = document.getElementById('addressBookContainer');
  if (!container) return;
  
  const addresses = state.activeUser.addresses || [];
  
  // Clear editor forms wrapper
  const wrapper = document.getElementById('addressFormWrapper');
  if (wrapper) wrapper.classList.add('hidden');
  
  if (addresses.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center bg-zinc-50 dark:bg-[#18181b]/30 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <svg class="mx-auto h-8 w-8 text-zinc-400 dark:text-zinc-650 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <p class="text-xs font-bold text-zinc-700 dark:text-zinc-300">No alternate delivery addresses saved yet.</p>
        <p class="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">Add your home or office address for seamless one-click checkouts.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = addresses.map(add => `
    <div class="p-5 bg-white dark:bg-[#0c0c0e] border ${add.isDefault ? 'border-zinc-900 dark:border-white ring-1 ring-zinc-950 dark:ring-white/40' : 'border-zinc-150 dark:border-zinc-800'} rounded-xl transition flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div class="space-y-1 my-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded text-[9px] font-bold tracking-wider uppercase">${add.tag || 'Home'}</span>
          ${add.isDefault ? '<span class="px-2 py-0.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded text-[9px] font-black tracking-wider uppercase">DEFAULT</span>' : ''}
        </div>
        <p class="text-xs font-black text-zinc-900 dark:text-zinc-100">${add.name} <span class="pl-2 font-semibold text-zinc-500 dark:text-zinc-400">• ${add.phone}</span></p>
        <p class="text-[11px] text-zinc-650 dark:text-zinc-405 leading-relaxed select-all">${add.house}, ${add.address}</p>
        ${add.landmark ? `<p class="text-[11px] text-zinc-450 dark:text-zinc-550 italic">Landmark: ${add.landmark}</p>` : ''}
        <p class="text-[11px] font-extrabold text-zinc-800 dark:text-zinc-200">${add.city}, ${add.state} - <span class="tracking-widest capitalize">${add.pincode}</span></p>
        ${add.altPhone ? `<p class="text-[10px] text-zinc-400">Alternate No: ${add.altPhone}</p>` : ''}
      </div>
      <div class="flex gap-2 self-end sm:self-start">
        <button class="btn-edit-add px-3 py-1.5 border border-zinc-205 dark:border-zinc-805 rounded bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1 cursor-pointer" data-id="${add.id}">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          Edit
        </button>
        <button class="btn-delete-add px-3 py-1.5 border border-zinc-205 dark:border-zinc-805 rounded bg-white hover:bg-zinc-50 dark:bg-zinc-905 dark:hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1 cursor-pointer" data-id="${add.id}">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          Delete
        </button>
      </div>
    </div>
  `).join('');
  
  // Attach Address List action buttons listeners
  document.querySelectorAll('.btn-delete-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const addId = btn.getAttribute('data-id');
      if (confirm('Is it okay to remove this saved delivery address option?')) {
        deleteActiveCustomerAddress(addId);
        renderAddressesTab();
      }
    });
  });
  
  document.querySelectorAll('.btn-edit-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const addId = btn.getAttribute('data-id');
      const add = state.activeUser.addresses.find(a => a.id === addId);
      if (add) {
        // Open form in edit mode
        const wrapper = document.getElementById('addressFormWrapper');
        if (wrapper) wrapper.classList.remove('hidden');
        document.getElementById('addressFormTitle').textContent = 'Edit Delivery Address Options';
        
        document.getElementById('editAddressId').value = add.id;
        document.getElementById('addName').value = add.name || '';
        document.getElementById('addPhone').value = add.phone || '';
        document.getElementById('addPincode').value = add.pincode || '';
        document.getElementById('addCity').value = add.city || '';
        document.getElementById('addState').value = add.state || '';
        document.getElementById('addHouse').value = add.house || '';
        document.getElementById('addAddress').value = add.address || '';
        document.getElementById('addLandmark').value = add.landmark || '';
        document.getElementById('addAltPhone').value = add.altPhone || '';
        
        const tagRadio = document.querySelector(`input[name="addTag"][value="${add.tag || 'Home'}"]`);
        if (tagRadio) tagRadio.checked = true;
        
        document.getElementById('addDefaultCheckbox').checked = !!add.isDefault;
        
        // Scroll to editor
        if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Order History List drawing with dynamic track status indicators
function renderOrdersTab() {
  const container = document.getElementById('ordersHistoryContainer');
  if (!container) return;
  
  const orders = state.activeUser.orders || [];
  
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center bg-zinc-50 dark:bg-[#18181b]/30 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
         <svg class="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
         <h5 class="text-sm font-black text-zinc-950 dark:text-white">No active orders found in directory</h5>
         <p class="text-[11px] text-zinc-500 mt-1 max-w-xs mx-auto">Fill your cart with premium items to see tracking timelines live.</p>
         <button id="profileBrowseBtn" class="mt-4 px-5 py-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] uppercase tracking-widest font-extrabold rounded-lg hover:opacity-90 cursor-pointer">Browse Catalog</button>
      </div>
    `;
    
    document.getElementById('profileBrowseBtn')?.addEventListener('click', () => {
      switchView('catalogView');
    });
    return;
  }
  
  container.innerHTML = orders.map(ord => {
    // Determine tracking steps progress heights
    let step = 1; // Default Placed
    if (ord.status === 'Processing') step = 2;
    else if (ord.status === 'Shipped') step = 3;
    else if (ord.status === 'Delivered') step = 4;
    
    return `
      <div class="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-[#0c0c0e] my-4">
        <!-- header details -->
        <div class="p-4 bg-zinc-50 dark:bg-[#141416] border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap justify-between items-center gap-3 text-[11px]">
          <div>
            <p class="text-zinc-500 font-semibold uppercase tracking-wider">Placed Date</p>
            <p class="font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">${ord.orderDate}</p>
          </div>
          <div>
            <p class="text-zinc-500 font-semibold uppercase tracking-wider">Order ID Reference</p>
            <p class="font-mono mt-0.5 font-bold text-zinc-900 dark:text-zinc-100 uppercase select-all">${ord.orderId}</p>
          </div>
          <div>
            <p class="text-zinc-500 font-semibold uppercase tracking-wider">Fulfillment Total</p>
            <p class="font-black text-zinc-950 dark:text-white mt-0.5 text-xs">${ord.grandTotal}</p>
          </div>
          <div>
            <span class="px-2.5 py-1 rounded bg-[#09090b] dark:bg-white text-white dark:text-zinc-950 font-black tracking-wider text-[9px] uppercase">${ord.status}</span>
          </div>
        </div>
        
        <!-- body order items -->
        <div class="p-4 sm:p-5 flex flex-col gap-4">
          ${ord.items.map(item => `
            <div class="flex gap-4">
              <img src="${item.image}" alt="${item.title || item.name || ''}" class="w-12 h-14 object-contain rounded bg-zinc-100 dark:bg-[#18181b] p-1 border border-zinc-200 dark:border-zinc-800">
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">${item.title || item.name || 'Product'}</p>
                <p class="text-[10px] text-zinc-400 capitalize mt-0.5">${item.category}</p>
                <div class="flex items-center gap-4 mt-1">
                  <span class="text-xs font-black text-zinc-900 dark:text-zinc-100">₹${item.price.toLocaleString('en-IN')}</span>
                  <span class="text-[11px] text-zinc-500">Qty: <strong class="font-extrabold text-zinc-800 dark:text-zinc-200">${item.quantity}</strong></span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Live Timeline tracking (matching Flipkart styled circles) -->
        <div class="px-5 py-6 bg-zinc-50/50 dark:bg-[#121214]/30 border-t border-zinc-100 dark:border-zinc-850">
          <p class="text-[9px] font-extrabold text-zinc-500 uppercase tracking-wider mb-4">Real-time Delivery Logs Summary</p>
          <div class="grid grid-cols-4 relative items-center justify-items-center">
            
            <!-- Connection wire background -->
            <div class="absolute left-[12%] right-[12%] top-2 bg-zinc-200 dark:bg-zinc-800 h-0.5 z-0"></div>
            <!-- Progress visual wire fill -->
            <div class="absolute left-[12%] top-2 bg-zinc-950 dark:bg-white h-0.5 z-0 transition-all duration-1000" style="width: ${step === 1 ? '0%' : step === 2 ? '38%' : step === 3 ? '72%' : '76%'}"></div>
            
            <!-- Circle 1: Placed -->
            <div class="flex flex-col items-center text-center z-10">
              <div class="h-4 w-4 rounded-full border-2 ${step >= 1 ? 'border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white' : 'border-zinc-400 bg-white'} flex items-center justify-center text-[8px] font-bold">
                ✓
              </div>
              <p class="text-[9px] font-bold text-zinc-900 dark:text-zinc-100 mt-2">Ordered</p>
              <p class="text-[8px] text-zinc-500 mt-0.5">Approved</p>
            </div>
            
            <!-- Circle 2: Packed -->
            <div class="flex flex-col items-center text-center z-10">
              <div class="h-4 w-4 rounded-full border-2 ${step >= 2 ? 'border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white' : 'border-zinc-300 bg-white'} flex items-center justify-center text-[8px] font-bold">
                ${step >= 2 ? '✓' : ''}
              </div>
              <p class="text-[9px] font-bold text-zinc-900 dark:text-zinc-100 mt-2">Packed</p>
              <p class="text-[8px] text-zinc-500 mt-0.5">${step >= 2 ? 'Ready' : 'Pending'}</p>
            </div>
            
            <!-- Circle 3: Shipped -->
            <div class="flex flex-col items-center text-center z-10">
              <div class="h-4 w-4 rounded-full border-2 ${step >= 3 ? 'border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white' : 'border-zinc-300 bg-white'} flex items-center justify-center text-[8px] font-bold">
                ${step >= 3 ? '✓' : ''}
              </div>
              <p class="text-[9px] font-bold text-zinc-900 dark:text-zinc-100 mt-2">Shipped</p>
              <p class="text-[8px] text-zinc-500 mt-0.5">${step >= 3 ? 'In Dispatch' : 'Awaiting dispatch'}</p>
            </div>
            
            <!-- Circle 4: Delivered -->
            <div class="flex flex-col items-center text-center z-10">
              <div class="h-4 w-4 rounded-full border-2 ${step >= 4 ? 'border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white' : 'border-zinc-300 bg-white'} flex items-center justify-center text-[8px] font-bold">
                ${step >= 4 ? '✓' : ''}
              </div>
              <p class="text-[9px] font-bold text-zinc-900 dark:text-zinc-100 mt-2">Delivered</p>
              <p class="text-[8px] text-zinc-500 mt-0.5">${step >= 4 ? 'Arrived' : 'Timeline'}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Global binders setup function
function setupCustomerAuthHandlers() {
  
  // Header MyProfile click
  const navProfileBtn = document.getElementById('navProfileBtn');
  if (navProfileBtn) {
    navProfileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.activeUser) {
        switchView('profileView');
      } else {
        openAuthModal('profileView');
      }
    });
  }

  // Auth modal switch tab listeners
  const tabSignIn = document.getElementById('tabSignIn');
  const tabSignUp = document.getElementById('tabSignUp');
  const signInFormArea = document.getElementById('signInForm');
  const signUpFormArea = document.getElementById('signUpForm');
  
  if (tabSignIn && tabSignUp) {
    tabSignIn.addEventListener('click', () => {
      tabSignIn.classList.add('border-zinc-950', 'dark:border-white', 'text-zinc-950', 'dark:text-white', 'font-black');
      tabSignIn.classList.remove('border-transparent', 'text-zinc-400');
      tabSignUp.classList.remove('border-zinc-950', 'dark:border-white', 'text-zinc-950', 'dark:text-white', 'font-black');
      tabSignUp.classList.add('border-transparent', 'text-zinc-400');
      if (signInFormArea) signInFormArea.classList.remove('hidden');
      if (signUpFormArea) signUpFormArea.classList.add('hidden');
    });

    tabSignUp.addEventListener('click', () => {
      tabSignUp.classList.add('border-zinc-950', 'dark:border-white', 'text-zinc-950', 'dark:text-white', 'font-black');
      tabSignUp.classList.remove('border-transparent', 'text-zinc-400');
      tabSignIn.classList.remove('border-zinc-950', 'dark:border-white', 'text-zinc-950', 'dark:text-white', 'font-black');
      tabSignIn.classList.add('border-transparent', 'text-zinc-400');
      if (signUpFormArea) signUpFormArea.classList.remove('hidden');
      if (signInFormArea) signInFormArea.classList.add('hidden');
    });
  }

  // Close modals click handlers
  const btnCancelAuth = document.getElementById('btnCancelAuth');
  if (btnCancelAuth) btnCancelAuth.addEventListener('click', closeAuthModal);
  
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        closeAuthModal();
      }
    });
  }

  // Sign In submit
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value;
      const errorMsg = document.getElementById('loginErrorMsg');
      
      try {
        authenticateCustomer(email, pass);
        // Successful login!
        updateAuthHeader();
        closeAuthModal();
        
        // Handling auth redirects
        if (authRedirectTarget === 'profileView') {
          switchView('profileView');
        } else if (authRedirectTarget === 'checkout') {
          openCheckout();
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.textContent = err.message;
          errorMsg.classList.remove('hidden');
        }
      }
    });
  }

  // Sign Up Register submit
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fName = document.getElementById('regFirstName').value.trim();
      const lName = document.getElementById('regLastName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const pass = document.getElementById('regPassword').value;
      const gender = document.querySelector('input[name="regGender"]:checked').value;
      
      const errorMsg = document.getElementById('signUpErrorMsg');
      
      try {
        registerCustomer(fName, lName, email, phone, gender, pass);
        // Success
        updateAuthHeader();
        closeAuthModal();
        
        if (authRedirectTarget === 'profileView') {
          switchView('profileView');
        } else if (authRedirectTarget === 'checkout') {
          openCheckout();
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.textContent = err.message;
          errorMsg.classList.remove('hidden');
        }
      }
    });
  }

  // PROFILE PERSONAL DETS FORM SUBMIT
  const infoForm = document.getElementById('profileInfoForm');
  if (infoForm) {
    infoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fName = document.getElementById('profFirstName').value.trim();
      const lName = document.getElementById('profLastName').value.trim();
      const email = document.getElementById('profEmail').value.trim();
      const phone = document.getElementById('profPhone').value.trim();
      const gender = document.querySelector('input[name="profGender"]:checked')?.value || 'Male';
      
      const newPass = document.getElementById('profNewPassword').value;
      const confPass = document.getElementById('profConfirmPassword').value;
      
      const msg = document.getElementById('profileSaveMsg');
      
      if (newPass) {
        if (newPass !== confPass) {
          if (msg) {
            msg.textContent = "New secret passwords configuration do not match.";
            msg.className = "text-[11px] font-extrabold text-red-655 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded border border-red-200 dark:border-red-900";
            msg.classList.remove('hidden');
          }
          return;
        }
      }
      
      updateActiveCustomerInfo(fName, lName, email, phone, gender, newPass || null);
      updateAuthHeader();
      
      const helloName = document.getElementById('profileHelloName');
      if (helloName) {
        helloName.textContent = `Hello, ${fName} ${lName}`;
      }
      const avatar = document.getElementById('profileAvatar');
      if (avatar) avatar.textContent = fName.charAt(0).toUpperCase();

      if (msg) {
        msg.textContent = "Your premium info profile details updated successfully!";
        msg.className = "text-[11px] font-extrabold text-zinc-950 dark:text-zinc-150 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded";
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 4000);
      }
    });
  }

  // Logout trigger
  const logoutBtn = document.getElementById('profileLogoutBtn');
  const logoutModal = document.getElementById('logoutConfirmModal');
  const logoutCancel = document.getElementById('logoutCancelBtn');
  const logoutAccept = document.getElementById('logoutAcceptBtn');

  if (logoutBtn && logoutModal) {
    const closeLogoutModal = () => {
      logoutModal.classList.add('hidden');
      logoutModal.classList.remove('flex');
      document.body.style.overflow = '';
    };

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutModal.classList.remove('hidden');
      logoutModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });

    if (logoutCancel) {
      logoutCancel.addEventListener('click', closeLogoutModal);
    }

    if (logoutAccept) {
      logoutAccept.addEventListener('click', () => {
        closeLogoutModal();
        logoutCustomer();
        updateAuthHeader();
        switchView('homeView');
      });
    }
  }

  // Profile switches tabs
  document.getElementById('profTabInfoBtn')?.addEventListener('click', () => switchProfileTab('profTabInfoBtn'));
  document.getElementById('profTabAddressesBtn')?.addEventListener('click', () => switchProfileTab('profTabAddressesBtn'));
  document.getElementById('profTabOrdersBtn')?.addEventListener('click', () => switchProfileTab('profTabOrdersBtn'));

  // Open address editor in Add mode
  document.getElementById('btnAddNewAddress')?.addEventListener('click', () => {
    const wrapper = document.getElementById('addressFormWrapper');
    if (wrapper) {
      wrapper.classList.remove('hidden');
      document.getElementById('addressFormTitle').textContent = 'Add Alternative Shipping Address';
      document.getElementById('addressEditorForm').reset();
      document.getElementById('editAddressId').value = '';
      wrapper.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Cancel address editor
  document.getElementById('btnCancelAddressForm')?.addEventListener('click', () => {
    document.getElementById('addressFormWrapper')?.classList.add('hidden');
  });

  // Address Editor Form Submit
  const addressEditorForm = document.getElementById('addressEditorForm');
  if (addressEditorForm) {
    addressEditorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const addressId = document.getElementById('editAddressId').value;
      const addressData = {
        id: addressId || null,
        name: document.getElementById('addName').value.trim(),
        phone: document.getElementById('addPhone').value.trim(),
        pincode: document.getElementById('addPincode').value.trim(),
        city: document.getElementById('addCity').value.trim(),
        state: document.getElementById('addState').value.trim(),
        house: document.getElementById('addHouse').value.trim(),
        address: document.getElementById('addAddress').value.trim(),
        landmark: document.getElementById('addLandmark').value.trim(),
        altPhone: document.getElementById('addAltPhone').value.trim(),
        tag: document.querySelector('input[name="addTag"]:checked')?.value || 'Home',
        isDefault: document.getElementById('addDefaultCheckbox').checked
      };
      
      saveActiveCustomerAddress(addressData);
      renderAddressesTab();
    });
  }

}

document.addEventListener('DOMContentLoaded', () => {
  // Theme Handling
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  function initTheme() {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  initTheme();

  setupCustomerAuthHandlers();
  updateAuthHeader();

  document.getElementById('backToCatalogBtn')?.addEventListener('click', () => switchView('catalogView'));

  generateCategories();
  syncCategoryUI();
  renderProducts();
  renderCart();
  switchView('homeView');
});
