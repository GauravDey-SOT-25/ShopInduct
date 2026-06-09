import { state, toggleCartDrawer, openProductModal, 
  openProfileModal, 
 showToast } from './app.js';
import { renderCatalog } from './categorypage.js';

export function renderHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  container.innerHTML = `
    <!-- Announcement Bar -->
    <marquee scrollamount="12" class="bg-surface border-b border-border text-text-primary text-center py-2 px-4 text-xs font-semibold tracking-wider relative z-[40]" id="announcement-bar">
      ✨ SPECIAL OPENING OFFER: GET FREE SHIPPING ON ALL ORDERS ABOVE ₹1,999!
    </marquee>

    <!-- Global Sticky Header -->
    <header class="sticky top-0 z-[50] bg-background-85 backdrop-blur-md border-b border-border-80 transition-colors duration-250">
      <div class="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-[72px] gap-4">
        <!-- Logo & Desktop Navigation Links -->
        <div class="flex items-center gap-4 sm:gap-6">
          <a href="#home" class="text-base sm:text-xl font-extrabold tracking-tight text-primary no-underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L13.06 5.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l5-5ZM2.47 11.97a.75.75 0 0 1 1.06 0L12 20.44l8.47-8.47a.75.75 0 1 1 1.06 1.06l-9 9a.75.75 0 0 1-1.06 0l-9-9a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
            Shop<span class="text-text-primary transition-colors">Induct</span>
          </a>
          <ul class="nav-links flex gap-2 sm:gap-4 lg:gap-6 list-none">
            <li><a href="#home" id="nav-link-home" class="active relative text-xs sm:text-sm font-medium text-text-secondary hover:text-primary transition-colors py-2">Home</a></li>
            <li><a href="#shop" id="nav-link-shop" class="relative text-xs sm:text-sm font-medium text-text-secondary hover:text-primary transition-colors py-2">Shop Catalog</a></li>
            <li><a href="#checkout" id="nav-link-checkout" class="relative text-xs sm:text-sm font-medium text-text-secondary hover:text-primary transition-colors py-2">Checkout</a></li>
          </ul>
        </div>

        <!-- Live Search Bar Container (Desktop) -->
        <div class="search-container hidden md:block flex-1 max-w-[500px] relative">
          <div class="relative w-full">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" /></svg>
            <input type="text" class="w-full pl-10 pr-4 py-2 bg-surface-elevated-40 border border-border rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="search-input" placeholder="Search premium items... (e.g. Headphones)" autocomplete="off">
          </div>
          <!-- Live autocomplete suggestions dropdown -->
          <div class="search-results-dropdown absolute top-[calc(100%+8px)] left-0 right-0 bg-surface border border-border rounded-xl shadow-premium-lg max-h-[350px] overflow-y-auto z-[100] p-2 hidden" id="search-dropdown"></div>
        </div>

        <!-- Action Utilities -->
        <div class="flex items-center gap-2">
          <!-- Light / Dark Toggler -->
          <button class="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg cursor-pointer transition-colors duration-150" id="theme-toggle-btn" title="Toggle Light/Dark Theme" aria-label="Toggle light and dark themes">
            <!-- Dynamically swapped -->
          </button>

          <!-- Shopping Cart Icon -->
          <button class="relative w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary bg-surface border border-border rounded-lg cursor-pointer transition-all duration-150" id="nav-cart-btn" title="Open Cart" aria-label="Open shopping cart drawer">
            <svg id="nav-cart-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            <span class="cart-count absolute -top-[2px] -right-[2px] bg-rating text-constant-dark text-[10px] font-bold h-4 min-w-[16px] rounded-full flex items-center justify-center px-1 shadow-[0_0_0_2px_var(--bg-color)] hidden" id="nav-cart-badge-count">0</span>
          </button>

          <!-- User Profile Icon -->
          <button class="relative w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary bg-surface border border-border rounded-lg cursor-pointer transition-all duration-150" id="nav-profile-btn" title="View Profile" aria-label="Open user profile modal">
            <svg id="nav-profile-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          </button>
        </div>
      </div>

      <!-- Mobile Real-time Search Row (Visible only on tablets and phones) -->
      <div class="mobile-search-bar-row block md:hidden px-4 py-3 border-b border-border bg-surface">
        <div class="relative w-full">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" /></svg>
          <input type="text" class="w-full pl-9 pr-4 py-2 bg-surface-elevated border border-border rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="mobile-search-input" placeholder="Search premium items..." autocomplete="off">
        </div>
      </div>

      <!-- Category Sub-Navbar (Visible on desktop/tablets) -->
      <div class="sub-navbar border-t border-border-80 bg-background-85 backdrop-blur-md hidden">
        <div class="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-[44px]">
          <div class="flex gap-6">
            <a href="#shop" class="sub-nav-link active relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="all">All Catalog</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Electronics">Electronics</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Fashion">Fashion</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Home & Lifestyle">Home & Lifestyle</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Books">Books</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Sports">Sports</a>
          </div>
          <div class="text-xs text-text-secondary font-medium">
            <span>🏷️ Use Code: <strong class="text-primary">INDUCT10</strong> for 10% Off!</span>
          </div>
        </div>
      </div>
    </header>
  `;

  // Bind modern addEventListeners
  initThemeToggler();
  initCartDrawerControls();
  initCartDrawerBtn();
  initSubNavbarLinks();
  initProfileBtn();
}

function initThemeToggler() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  const updateThemeUI = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggleBtn.innerHTML = theme === 'dark' 
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L7.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>` 
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>`;
  };

  updateThemeUI(state.theme);

  themeToggleBtn.addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    updateThemeUI(state.theme);
    // showToast(`Theme switched to ${state.theme} mode`, "info");
  });
}

function initCartDrawerControls() {
  const closeBtn = document.getElementById('cart-drawer-close-btn');
  const backdrop = document.getElementById('cart-drawer-backdrop');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      toggleCartDrawer(false);
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      toggleCartDrawer(false);
    });
  }
}

function initCartDrawerBtn() {
  const cartBtn = document.getElementById('nav-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      toggleCartDrawer(true);
    });
  }
}

function initProfileBtn() {
  const profileBtn = document.getElementById('nav-profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      openProfileModal();
    });
  }
}

function initSubNavbarLinks() {
  const subNavLinks = document.querySelectorAll('.sub-nav-link');
  subNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      subNavLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const category = link.getAttribute('data-category');

      if (category === 'all') {
        state.filters.categories = [];
      } else {
        state.filters.categories = [category];
      }

      if (window.location.hash !== '#shop') {
        window.location.hash = '#shop';
      } else {
        renderCatalog();
      }

      showToast(`Showing ${category === 'all' ? 'All' : category} products`, "info");
    });
  });
}
