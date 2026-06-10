import { state, addToCart, showToast, openAuthModal, getStarsHtml, toggleCartDrawer } from './app.js';
import { currentUser } from './auth.js';

export const ProductDetailView = `
<div id="productDetailView" class="hidden w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 animate-fade-in flex-1">
  <div class="mb-4">
    <button id="backToCatalogBtn" class="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
      BACK TO CATALOG
    </button>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-surface border border-border-80 rounded-3xl p-6 lg:p-8 shadow-xl transition-colors duration-150">
    <!-- Image Section -->
    <div class="flex flex-col gap-4">
      <div class="relative w-full h-[300px] sm:h-[400px] lg:h-[430px] bg-background-secondary rounded-2xl overflow-hidden border border-border-80 flex items-center justify-center p-6">
        <img id="detailImage" src="" alt="Product Image" class="w-full h-full object-contain transition-transform duration-500 hover:scale-105" draggable="false">
      </div>
      <!-- Thumbnails (Placeholder) -->
      <div class="flex gap-4 overflow-x-auto pb-1">
        <div class="w-16 h-16 bg-background-secondary rounded-xl border-2 border-primary p-2 flex-shrink-0 cursor-pointer">
          <img id="detailThumb1" src="" class="w-full h-full object-contain" draggable="false">
        </div>
      </div>
    </div>

    <!-- Details Section -->
    <div class="flex flex-col">
      <div class="mb-4">
        <p id="detailCategory" class="text-xs font-bold text-text-muted uppercase tracking-widest mb-1"></p>
        <h1 id="detailTitle" class="text-2xl lg:text-3xl font-extrabold text-text-primary leading-tight mb-3"></h1>
        
        <div class="flex items-center gap-2 mb-4">
          <div id="detailStars" class="flex gap-1 text-sm text-rating"></div>
          <span id="detailRatingText" class="text-xs font-bold text-text-muted ml-2"></span>
        </div>
        
        <div class="bg-background-secondary p-5 rounded-2xl border border-border-80 mb-5 inline-block w-full transition-colors duration-150">
          <p class="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Price</p>
          <div class="flex items-baseline gap-3">
            <span id="detailPrice" class="text-3xl font-black text-text-primary"></span>
            <span id="detailMSRP" class="text-sm font-medium text-text-muted line-through"></span>
            <span class="text-xs font-bold text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-500/10 px-2 py-1 rounded-md ml-2 flex items-center gap-1">
               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
               Save <span id="detailSavePercent"></span>%
            </span>
          </div>
          <p class="text-[10px] text-text-muted mt-1 font-medium">Inclusive of all taxes</p>
        </div>
        
        <div class="prose prose-sm dark:prose-invert max-w-none text-text-secondary mb-6 leading-relaxed font-medium">
          <p id="detailDescription">Detailed product description goes here. Elevate your everyday with premium materials and unmatched functional design.</p>
          <ul class="mt-3 space-y-1">
             <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                In Stock & Ready to Ship
             </li>
             <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                1-Year Manufacturer Warranty
             </li>
             <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                Free 30-Day Returns
             </li>
          </ul>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mt-auto">
        <button id="detailAddToCartBtn" class="flex-1 py-4 px-6 bg-background-secondary text-text-primary border-2 border-border-80 hover:bg-card-hover rounded-xl font-bold flex items-center justify-center gap-2 transition-all focus:outline-none shadow-sm hover:shadow-md cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          ADD TO CART
        </button>
        <button id="detailBuyNowBtn" class="flex-1 py-4 px-6 bg-primary text-text-inverse hover:bg-primary-hover rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          BUY NOW
        </button>
      </div>

       <!-- Security assurances -->
       <div class="mt-4 pt-4 border-t border-border-80 flex flex-wrap gap-4 justify-between items-center opacity-70">
          <div class="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
             Secure Transaction
          </div>
          <div class="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
             All Cards Accepted
          </div>
       </div>
    </div>
  </div>
</div>
`;

export function renderProductDetailPage(productId) {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const product = state.products.find(p => p.id === productId);
  if (!product) {
    window.location.hash = '#shop';
    return;
  }

  appContainer.innerHTML = ProductDetailView;
  
  // Show the page
  const pageView = document.getElementById('productDetailView');
  if (pageView) {
    pageView.classList.remove('hidden');
  }

  // Populate product details
  document.getElementById('detailImage').src = product.image;
  document.getElementById('detailImage').alt = product.title;
  document.getElementById('detailThumb1').src = product.image;
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailTitle').textContent = product.title;
  document.getElementById('detailStars').innerHTML = getStarsHtml(product.rating);
  document.getElementById('detailRatingText').textContent = `${product.rating} / 5`;
  document.getElementById('detailPrice').textContent = `₹${product.price}`;

  const msrp = Math.round(product.price * 1.25);
  document.getElementById('detailMSRP').textContent = `₹${msrp}`;
  document.getElementById('detailSavePercent').textContent = '20';
  document.getElementById('detailDescription').textContent = product.description || "Elevate your everyday with premium materials and unmatched functional design. This product is designed to meet your highest expectations.";

  // Event Listeners
  document.getElementById('backToCatalogBtn').onclick = () => {
    window.location.hash = '#shop';
  };

  // Sync state initially
  syncProductDetailAddToCartState();

  const buyNowBtn = document.getElementById('detailBuyNowBtn');
  if (buyNowBtn) {
    buyNowBtn.onclick = () => {
      addToCart(product.id);
      if (!currentUser) {
        openAuthModal('checkout');
      } else {
        window.location.hash = '#checkout';
      }
    };
  }
}

export function syncProductDetailAddToCartState() {
  const pageView = document.getElementById('productDetailView');
  if (!pageView || pageView.classList.contains('hidden')) return;

  const hash = window.location.hash;
  const parts = hash.split('?');
  if (parts[1]) {
    const params = new URLSearchParams(parts[1]);
    const id = parseInt(params.get('id'));
    const product = state.products.find(p => p.id === id);
    if (product) {
      const addToCartBtn = document.getElementById('detailAddToCartBtn');
      if (addToCartBtn) {
        const isInCart = state.cart.some(item => item.id === product.id);
        if (isInCart) {
          addToCartBtn.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            ALREADY ADDED TO CART
          `;
          addToCartBtn.style.borderColor = 'var(--success-color)';
          addToCartBtn.style.color = 'var(--success-color)';
          addToCartBtn.onclick = () => {
            toggleCartDrawer(true);
          };
        } else {
          addToCartBtn.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            ADD TO CART
          `;
          addToCartBtn.style.borderColor = '';
          addToCartBtn.style.color = '';
          addToCartBtn.onclick = () => {
            addToCart(product.id);
            syncProductDetailAddToCartState();
          };
        }
      }
    }
  }
}
