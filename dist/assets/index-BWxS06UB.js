(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function Z(){const e=document.getElementById("app");e&&(e.innerHTML=`
    <!-- ================= CATALOG / SHOP VIEW ================= -->
    <section id="catalog-view" class="max-w-[1280px] mx-auto px-4 py-8 pb-16 view fade-in">
      <div class="flex items-center justify-between mb-6 gap-4">
        <div class="text-sm text-text-secondary font-medium" id="catalog-product-count">Showing 0 products</div>
        <div class="flex items-center gap-4">
          <!-- Premium Sort Dropdown -->
          <div class="flex items-center">
            <label for="catalog-sort" class="inline-block mb-0 mr-2 text-xs font-semibold text-text-secondary">Sort by:</label>
            <select id="catalog-sort" class="sort-select border rounded-xl text-xs py-2 px-3 outline-none cursor-pointer">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>

          <button class="inline-flex lg:hidden items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl text-text-primary bg-surface border border-border hover:bg-surface-hover transition duration-150 cursor-pointer" id="mobile-filter-toggle-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
            Filters
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        <!-- Collapsible Sidebar Filters Pane -->
        <div class="filter-drawer-backdrop" id="filter-backdrop"></div>
        <aside class="filters-pane bg-surface border border-border-80 rounded-2xl p-6 lg:sticky lg:top-[90px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto flex flex-col gap-6 shadow-premium-sm transition-colors duration-150" id="catalog-filters-pane">
          <div class="flex items-center justify-between border-b border-border-80 pb-3">
            <h3 class="text-base font-bold text-text-primary">Catalog Filters</h3>
            <button class="text-text-secondary hover:bg-surface-hover p-1 rounded-lg block lg:hidden cursor-pointer" id="mobile-filter-close-btn" title="Close filter drawer" aria-label="Close filter drawer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Category Pill Buttons -->
          <div class="flex flex-col gap-2.5 border-b border-border-80 pb-5">
            <span class="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Category</span>
            <div class="flex flex-col gap-2" id="sidebar-categories-container">
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="all">
                All Products
              </button>
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Electronics">
                Electronics
              </button>
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Clothing">
                Clothing
              </button>
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Home & Kitchen">
                Home & Kitchen
              </button>
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Books">
                Books
              </button>
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Sports">
                Sports
              </button>
            </div>
          </div>

          <!-- Price sliding scale filter -->
          <div class="flex flex-col gap-3 border-b border-border-80 pb-5">
            <span class="text-sm font-semibold text-text-primary">Price Range</span>
            <div class="flex flex-col gap-2">
              <input type="range" class="range-input" id="filter-price-range" min="0" max="25000" step="100" value="25000">
              <div class="flex justify-between text-xs text-text-secondary font-medium">
                <span>Min: ₹0</span>
                <span id="price-range-display" class="font-bold text-primary">₹25000</span>
              </div>
            </div>
          </div>

          <!-- Rating Stars Filter -->
          <div class="flex flex-col gap-3 pb-5">
            <span class="text-sm font-semibold text-text-primary">Minimum Rating</span>
            <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="radio" name="rating-filter" class="w-4 h-4 text-primary focus:ring-primary/20 filter-rating-radio cursor-pointer" id="rating-all" value="0" checked>
              All Ratings
            </label>
            <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="radio" name="rating-filter" class="w-4 h-4 text-primary focus:ring-primary/20 filter-rating-radio cursor-pointer" value="4.5">
              <span class="stars-row inline-flex items-center text-rating gap-[2px]">
                ★ 4.5 & up
              </span>
            </label>
            <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="radio" name="rating-filter" class="w-4 h-4 text-primary focus:ring-primary/20 filter-rating-radio cursor-pointer" value="4.0">
              <span class="stars-row inline-flex items-center text-rating gap-[2px]">
                ★ 4.0 & up
              </span>
            </label>
          </div>

          <!-- Search Options -->
          <div class="flex flex-col gap-3 pb-5 border-b border-border-80">
            <span class="text-sm font-semibold text-text-primary">Search Options</span>
            <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="checkbox" id="search-in-description-checkbox" class="w-4 h-4 rounded text-primary border-border focus:ring-primary/20 cursor-pointer">
              Search in Description
            </label>
          </div>

          <button class="btn-premium px-6 py-2.5 text-xs mt-auto cursor-pointer" id="filters-clear-all-btn">
            Clear All Filters
          </button>
        </aside>

        <!-- Right Side: Products Grid wrapper -->
        <div class="flex-grow flex flex-col gap-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="catalog-products-grid">
            <!-- Dynamic elements loaded via script -->
          </div>
          
          <!-- Empty state inside search results -->
          <div class="empty-state border border-border bg-surface rounded-2xl p-16 flex flex-col items-center justify-center text-center gap-4 hidden animate-fade-in" id="catalog-empty-state">
            <div class="text-text-muted bg-background-secondary p-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
            </div>
            <h3 class="text-lg font-bold text-text-primary">No products match filters</h3>
            <p class="text-xs text-text-secondary leading-relaxed max-w-[320px]">We couldn't find any premium hardware in this view. Try clearing active filters or searching for another term.</p>
            <button class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl text-text-inverse bg-primary hover:bg-primary-hover transition duration-150 cursor-pointer" id="catalog-empty-clear-btn">Reset Filters</button>
          </div>
        </div>
      </div>
    </section>
  `,z(),b())}function z(){const e=document.getElementById("filter-price-range"),r=document.getElementById("price-range-display"),t=document.getElementById("catalog-sort"),o=document.getElementById("filters-clear-all-btn"),s=document.getElementById("catalog-empty-clear-btn");e&&r&&(e.value=n.filters.maxPrice,r.textContent=`₹${n.filters.maxPrice}`,e.addEventListener("input",c=>{r.textContent=`₹${c.target.value}`,n.filters.maxPrice=parseInt(c.target.value),b()})),t&&(t.value=n.filters.sortBy,t.addEventListener("change",c=>{n.filters.sortBy=c.target.value,b()})),document.querySelectorAll(".category-pill-btn").forEach(c=>{c.addEventListener("click",()=>{const x=c.getAttribute("data-category");x==="all"?n.filters.categories=[]:n.filters.categories=[x],b()})}),document.querySelectorAll(".filter-rating-radio").forEach(c=>{c.addEventListener("change",x=>{n.filters.minRating=parseFloat(x.target.value),b()})});const i=document.getElementById("search-in-description-checkbox");i&&(i.checked=n.filters.searchInDescription,i.addEventListener("change",c=>{n.filters.searchInDescription=c.target.checked,b()}));const a=document.getElementById("mobile-filter-toggle-btn"),d=document.getElementById("mobile-filter-close-btn"),p=document.getElementById("catalog-filters-pane"),m=document.getElementById("filter-backdrop");a&&p&&m&&(a.addEventListener("click",()=>{p.classList.add("active"),m.classList.add("active")}),d&&d.addEventListener("click",()=>{p.classList.remove("active"),m.classList.remove("active")}),m.addEventListener("click",()=>{p.classList.remove("active"),m.classList.remove("active")}));const u=()=>{n.filters.maxPrice=25e3,n.filters.minRating=0,n.filters.categories=[],n.filters.searchQuery="",n.filters.sortBy="featured",n.filters.searchInDescription=!0,e&&(e.value=25e3),r&&(r.textContent="₹25000");const c=document.getElementById("rating-all");c&&(c.checked=!0),t&&(t.value="featured");const x=document.getElementById("search-input");x&&(x.value="");const h=document.getElementById("mobile-search-input");h&&(h.value="");const E=document.getElementById("search-in-description-checkbox");E&&(E.checked=!0),b()};o&&o.addEventListener("click",u),s&&s.addEventListener("click",u)}function b(){const e=n.filters.categories.length>0?n.filters.categories[0]:"all";document.querySelectorAll(".category-pill-btn").forEach(a=>{a.getAttribute("data-category")===e?a.classList.add("active"):a.classList.remove("active")}),document.querySelectorAll(".sub-nav-link").forEach(a=>{a.getAttribute("data-category")===e?a.classList.add("active"):a.classList.remove("active")});const r=document.getElementById("search-in-description-checkbox");r&&(r.checked=n.filters.searchInDescription);let t=n.products.filter(a=>{const d=e==="all"||a.category.toLowerCase()===e.toLowerCase(),p=a.price<=n.filters.maxPrice,m=a.rating>=n.filters.minRating,u=n.filters.searchQuery.toLowerCase().trim(),c=!u||a.title.toLowerCase().includes(u)||a.category.toLowerCase().includes(u)||n.filters.searchInDescription&&a.description&&a.description.toLowerCase().includes(u);return d&&p&&m&&c});n.filters.sortBy==="price-asc"?t.sort((a,d)=>a.price-d.price):n.filters.sortBy==="price-desc"?t.sort((a,d)=>d.price-a.price):n.filters.sortBy==="rating-desc"&&t.sort((a,d)=>d.rating-a.rating);const o=document.getElementById("catalog-product-count");o&&(o.textContent=`Showing ${t.length} products`);const s=document.getElementById("catalog-products-grid"),i=document.getElementById("catalog-empty-state");s&&(t.length===0?(s.innerHTML="",i&&i.classList.remove("hidden")):(i&&i.classList.add("hidden"),s.innerHTML=t.map(a=>U(a,!1)).join(""),V(s)))}function S(){const e=document.getElementById("header-container");if(!e)return;const r=n.user?`<div class="w-7 h-7 rounded-full bg-primary text-text-inverse flex items-center justify-center text-xs font-black shadow-sm">${(n.user.firstName||n.user.name||"U").charAt(0).toUpperCase()}</div>`:'<svg id="nav-profile-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>';e.innerHTML=`
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
        <div class="search-container hidden md:block flex-1 max-w-[420px] relative">
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
            ${r}
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
          <div class="flex gap-6 animate-fade-in">
            <a href="#shop" class="sub-nav-link active relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="all">All Catalog</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Electronics">Electronics</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Clothing">Clothing</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Home & Kitchen">Home & Kitchen</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Books">Books</a>
            <a href="#shop" class="sub-nav-link relative text-[11px] font-semibold text-text-secondary tracking-wider uppercase py-2 hover:text-primary transition-colors" data-category="Sports">Sports</a>
          </div>
          <div class="text-xs text-text-secondary font-medium">
            <span>🏷️ Use Code: <strong class="text-primary">INDUCT10</strong> for 10% Off!</span>
          </div>
        </div>
      </div>
    </header>
  `,G(),_(),J(),W(),Q(),Y()}function G(){const e=document.getElementById("theme-toggle-btn");if(!e)return;const r=t=>{document.documentElement.setAttribute("data-theme",t),e.innerHTML=t==="dark"?'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L7.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>':'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>'};r(n.theme),e.addEventListener("click",()=>{n.theme=n.theme==="light"?"dark":"light",localStorage.setItem("theme",n.theme),r(n.theme)})}function _(){const e=document.getElementById("cart-drawer-close-btn"),r=document.getElementById("cart-drawer-backdrop");e&&e.addEventListener("click",()=>{y(!1)}),r&&r.addEventListener("click",()=>{y(!1)})}function J(){const e=document.getElementById("nav-cart-btn");e&&e.addEventListener("click",()=>{y(!0)})}function Q(){const e=document.getElementById("nav-profile-btn");e&&e.addEventListener("click",()=>{P()})}function W(){const e=document.querySelectorAll(".sub-nav-link");e.forEach(r=>{r.addEventListener("click",t=>{t.preventDefault(),e.forEach(s=>s.classList.remove("active")),r.classList.add("active");const o=r.getAttribute("data-category");o==="all"?n.filters.categories=[]:n.filters.categories=[o],window.location.hash!=="#shop"?window.location.hash="#shop":b(),w(`Showing ${o==="all"?"All":o} products`,"info")})})}function Y(){const e=document.getElementById("search-input"),r=document.getElementById("mobile-search-input"),t=document.getElementById("search-dropdown"),o=s=>{if(n.filters.searchQuery=s,!s.trim()){t&&t.classList.add("hidden");return}const i=n.products.filter(a=>a.title.toLowerCase().includes(s.toLowerCase())||a.category.toLowerCase().includes(s.toLowerCase())||n.filters.searchInDescription&&a.description&&a.description.toLowerCase().includes(s.toLowerCase())).slice(0,5);i.length>0&&t?(t.innerHTML=i.map(a=>`
        <div class="flex items-center gap-3 p-2 hover:bg-surface-hover rounded-lg cursor-pointer search-suggest-item" data-product-id="${a.id}">
          <img src="${a.image}" class="w-8 h-8 rounded object-cover">
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-text-primary truncate">${a.title}</p>
            <p class="text-[10px] text-text-secondary">${a.category}</p>
          </div>
          <span class="text-xs font-black text-text-primary">₹${a.price}</span>
        </div>
      `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".search-suggest-item").forEach(a=>{a.onclick=()=>{const d=parseInt(a.getAttribute("data-product-id"));window.location.hash=`#product?id=${d}`,t.classList.add("hidden"),e&&(e.value=""),r&&(r.value="")}})):t&&t.classList.add("hidden")};e&&(e.addEventListener("input",s=>o(s.target.value)),e.addEventListener("keydown",s=>{s.key==="Enter"&&(n.filters.searchQuery=e.value,t&&t.classList.add("hidden"),window.location.hash="#shop",window.location.hash==="#shop"&&b())})),r&&(r.addEventListener("input",s=>{n.filters.searchQuery=s.target.value}),r.addEventListener("keydown",s=>{s.key==="Enter"&&(window.location.hash="#shop",window.location.hash==="#shop"&&b())})),document.addEventListener("click",s=>{t&&!t.contains(s.target)&&s.target!==e&&t.classList.add("hidden")})}function K(){const e=document.getElementById("footer-container");if(!e)return;e.innerHTML=`
    <!-- Global Footer -->
    <footer class="bg-background-secondary border-t border-border-80 py-16 pb-8 mt-auto transition-colors">
      <div class="max-w-[1280px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 mb-12 footer-grid">
        <div class="flex flex-col gap-4">
          <a href="#home" class="text-lg font-extrabold text-primary no-underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline"><path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L13.06 5.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l5-5ZM2.47 11.97a.75.75 0 0 1 1.06 0L12 20.44l8.47-8.47a.75.75 0 1 1 1.06 1.06l-9 9a.75.75 0 0 1-1.06 0l-9-9a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
            Shop<span class="text-text-primary">Induct</span>
          </a>
          <p class="text-sm text-text-secondary leading-relaxed">
            Building production-grade frontend solutions. Clean minimalist components inspired by premium hardware designs. Built with 100% custom styling variables.
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="text-sm font-bold text-text-primary uppercase tracking-wider">E-Store Shop</h4>
          <ul class="list-none flex flex-col gap-2 p-0">
            <li><a href="#home" id="footer-link-home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Home Page Overview</a></li>
            <li><a href="#shop" id="footer-link-shop" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Explore All Products</a></li>
            <li><button type="button" id="footer-link-electronics" class="text-left text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150 cursor-pointer bg-transparent border-0 p-0">Electronics Gear</button></li>
            <li><button type="button" id="footer-link-fashion" class="text-left text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150 cursor-pointer bg-transparent border-0 p-0">Bespoke Apparel</button></li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="text-sm font-bold text-text-primary uppercase tracking-wider">Support Center</h4>
          <ul class="list-none flex flex-col gap-2 p-0">
            <li><a href="#home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Stripe Pay Shield</a></li>
            <li><a href="#home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Delivery Schedules</a></li>
            <li><a href="#home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">30-day Exchanges Policy</a></li>
            <li><a href="#home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Customer Help Center</a></li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="text-sm font-bold text-text-primary uppercase tracking-wider">Newsletter</h4>
          <p class="text-xs text-text-secondary leading-relaxed">Subscribe to receive catalog updates, private sale invitations, and brand release drops.</p>
          <div class="flex gap-2 mt-1">
            <input type="email" id="newsletter-email-input" class="input-field w-full px-4 py-2 bg-surface border border-border-80 rounded-xl text-xs text-text-primary outline-none focus:bg-surface-elevated focus:border-primary focus-ring-primary-15 transition-all" placeholder="email@example.com" aria-label="Newsletter email input field">
            <button type="button" id="newsletter-submit-btn" class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl text-text-inverse bg-primary hover:bg-primary-600 transition duration-150 cursor-pointer">Join</button>
          </div>

        </div>
      </div>

      <div class="max-w-[1280px] mx-auto px-4 border-t border-border-80 pt-8 flex flex-col md:flex-row gap-4 items-center justify-between text-center md:text-left">
        <p class="text-xs text-text-muted">&copy; 2026 ShopInduct Premium Inc. Built as a standard web production layout demo. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="#home" class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover rounded-lg cursor-pointer transition duration-150" title="Visit our Instagram" aria-label="Visit our Instagram page">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>
          </a>
          <a href="#home" class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover rounded-lg cursor-pointer transition duration-150" title="Visit our Twitter" aria-label="Visit our Twitter page">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
          </a>
          <a href="#home" class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover rounded-lg cursor-pointer transition duration-150" title="Visit our GitHub" aria-label="Visit our GitHub page">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
          </a>
        </div>
      </div>
    </footer>
  `;const r=document.getElementById("footer-link-electronics"),t=document.getElementById("footer-link-fashion"),o=document.getElementById("footer-link-home"),s=document.getElementById("footer-link-shop"),i=a=>{n.filters.categories=[a],window.location.hash="#shop",b(),w(`Showing ${a} products`,"info")};r&&r.addEventListener("click",()=>i("Electronics")),t&&t.addEventListener("click",()=>i("Fashion")),o&&o.addEventListener("click",()=>{n.filters.categories=[],n.filters.searchQuery=""}),s&&s.addEventListener("click",()=>{n.filters.categories=[],n.filters.searchQuery="",window.location.hash==="#shop"&&b()})}function X(){const e=document.getElementById("app");if(!e)return;e.innerHTML=`
    <section id="home-view" class="view fade-in">
      <!-- Premium Hero Section -->
      <div class="py-10 border-b border-border-80 bg-[radial-gradient(circle_at_top_right,rgba(139,125,255,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(255,181,71,0.03),transparent_50%)]">
        <div class="max-w-[1280px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div class="flex flex-col items-start gap-6">
            <span class="bg-primary-10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider animate-pulse">NEW COLLECTION — OUT NOW</span>
            <h1 class="text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight leading-none text-text-primary">Discover Modern Premium Shopping Experiences</h1>
            <p class="text-base text-text-secondary leading-relaxed">
              Carefully curated, exceptional quality products built to elevate your lifestyle. Strictly designed for absolute reliability, minimal aesthetics, and outstanding longevity.
            </p>
            <div class="flex gap-4 w-full">
              <a href="#shop" class="btn-premium px-6 py-3 text-sm flex items-center justify-center gap-2">
                Shop Catalog
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </a>
              <button class="btn-premium px-6 py-3 text-sm" id="home-explore-btn">Explore Categories</button>
            </div>
          </div>
          <div class="relative rounded-2xl overflow-hidden shadow-premium-xl aspect-[16/10] bg-surface group">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80" alt="ShopInduct Premium Collection Banner">
          </div>
        </div>
      </div>

      <!-- Trust Badges Grid -->
      <div class="bg-surface border-b border-border-80 py-6 transition-colors duration-150">
        <div class="max-w-[1280px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="flex items-center gap-3">
            <div class="text-primary flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.12-1.243l1.119-10.643a1.125 1.125 0 0 1 1.12-1.243h10.643a1.125 1.125 0 0 1 1.12 1.243l1.119 10.643a1.125 1.125 0 0 1-1.12 1.243H14.25m-1.5 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.5m-9 0h-1.5" /></svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-text-primary">Free Shipping</h4>
              <p class="text-xs text-text-secondary">On orders above ₹1,999</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-primary flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0V10.5m-2.25 10.5h13.5c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H4.875c-.621 0-1.125.504-1.125 1.125v7.875c0 .621.504 1.125 1.125 1.125Z" /></svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-text-primary">Secure Checkout</h4>
              <p class="text-xs text-text-secondary">Stripe protocol systems</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-primary flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.656 48.656 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7C4.547 9.547 4.5 10.768 4.5 12s.047 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7C19.453 14.453 19.5 13.232 19.5 12Zm-5.077-3.244a1.875 1.875 0 1 1-2.652 2.653 1.875 1.875 0 0 1 2.652-2.653Zm-3 5.25a1.875 1.875 0 1 1-2.652 2.652 1.875 1.875 0 0 1 2.652-2.652Z" /></svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-text-primary">Easy 30-day Returns</h4>
              <p class="text-xs text-text-secondary">Quick hassle-free exchanges</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-primary flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-text-primary">24/7 Dedicated Support</h4>
              <p class="text-xs text-text-secondary">Premium assistance anytime</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Categories Banner Grid -->
      <div class="max-w-[1280px] mx-auto px-4 py-12">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-extrabold text-text-primary tracking-tight">Shop by Category</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <!-- Electronics Category -->
          <div class="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-premium-md group category-tile" data-category="Electronics">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" alt="Electronics Category" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 class="text-lg font-bold text-white mb-1">Electronics</h3>
              <span class="text-xs text-white opacity-80">20 Products</span>
            </div>
          </div>

          <!-- Clothing Category -->
          <div class="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-premium-md group category-tile" data-category="Clothing">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" alt="Fashion Category" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 class="text-lg font-bold text-white mb-1">Clothing</h3>
              <span class="text-xs text-white opacity-80">20 Products</span>
            </div>
          </div>

          <!-- Home Category -->
          <div class="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-premium-md group category-tile" data-category="Home & Kitchen">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" alt="Home & Lifestyle Category" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 class="text-lg font-bold text-white mb-1">Home & Kitchen</h3>
              <span class="text-xs text-white opacity-80">20 Products</span>
            </div>
          </div>

          <!-- Books Category -->
          <div class="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-premium-md group category-tile" data-category="Books">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80" alt="Books Category" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 class="text-lg font-bold text-white mb-1">Books</h3>
              <span class="text-xs text-white opacity-80">20 Products</span>
            </div>
          </div>
          <!-- Sports Category -->
          <div class="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-premium-md group category-tile" data-category="Sports">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" alt="Sports Category" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 class="text-lg font-bold text-white mb-1">Sports</h3>
              <span class="text-xs text-white opacity-80">20 Products</span>
            </div>
          </div>

          
        </div>
      </div>

      <!-- Featured Horizontal Sliding Showcase -->
      <div class="bg-background-secondary border-t border-b border-border-80 py-12 transition-colors">
        <div class="max-w-[1280px] mx-auto px-4">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-extrabold text-text-primary tracking-tight">Trending Products</h2>
            <div class="text-xs text-text-muted font-medium">Swipe / scroll horizontally →</div>
          </div>
          <div class="overflow-x-auto snap-x snap-mandatory flex gap-6 pb-4 scrollbar-thin" id="home-featured-products-slider">
            <!-- Dynamic elements loaded via script -->
          </div>
        </div>
      </div>
    </section>
  `;const r=document.getElementById("home-explore-btn");r&&r.addEventListener("click",()=>{Me(),window.location.hash="#shop"}),document.querySelectorAll(".category-tile").forEach(o=>{o.addEventListener("click",()=>{const s=o.getAttribute("data-category");n.filters.categories=[s],window.location.hash="#shop",b()})});const t=document.getElementById("home-featured-products-slider");if(t){const o=n.products.slice(0,6);t.innerHTML=o.map(s=>U(s,!0)).join(""),V(t)}}const ee=JSON.parse(localStorage.getItem("users"));let v=ee||[{id:1,email:"user1@gmail.com",password:"123456"},{id:2,email:"user2@gmail.com",password:"123456"},{id:3,email:"user3@gmail.com",password:"123456"},{id:4,email:"user4@gmail.com",password:"123456"},{id:5,email:"user5@gmail.com",password:"123456"}];function q(){localStorage.setItem("users",JSON.stringify(v))}function te(e,r){const t=v.findIndex(o=>o.id===e);if(t!==-1){v[t]={...v[t],...r},q();const o=JSON.parse(localStorage.getItem("currentUser"));return o&&o.id===e&&localStorage.setItem("currentUser",JSON.stringify(v[t])),v[t]}return null}let l=JSON.parse(localStorage.getItem("currentUser"))||null;function re(e,r){if(!e||!r)return{success:!1,message:"All fields are required"};const t=v.find(o=>o.email===e&&o.password===r);return t?(l=t,localStorage.setItem("currentUser",JSON.stringify(t)),{success:!0,message:"Login Successful",user:t}):{success:!1,message:"Invalid Email or Password"}}function oe(e,r,t={}){if(!e||!r)return{success:!1,message:"All fields are required"};if(!e.includes("@"))return{success:!1,message:"Invalid Email Format"};if(!e.endsWith("@gmail.com"))return{success:!1,message:"Only Gmail addresses are allowed"};if(r.length<6)return{success:!1,message:"Password must be at least 6 characters"};if(v.find(i=>i.email.toLowerCase()===e.toLowerCase()))return{success:!1,message:"Email already exists"};const s={id:v.length+1,email:e,password:r,...t,addresses:[],orders:[]};return v.push(s),q(),l=s,localStorage.setItem("currentUser",JSON.stringify(s)),{success:!0,message:"Registration Successful",user:s}}function se(){return l=null,localStorage.removeItem("currentUser"),{success:!0,message:"Logged Out"}}function ae(){const e=document.getElementById("app");if(!e)return;if(n.cart.length===0){e.innerHTML=`
      <section class="max-w-[1280px] mx-auto px-4 py-20 text-center view fade-in">
        <div class="text-text-muted bg-background-secondary p-6 rounded-full inline-block mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
        </div>
        <h2 class="text-2xl font-bold text-text-primary mb-2">Your shopping cart is empty</h2>
        <p class="text-xs text-text-secondary mb-6">Fill your cart with premium gadgets before checking out.</p>
        <a href="#shop" class="btn-premium px-6 py-3 text-xs uppercase tracking-wider">Start Shopping</a>
      </section>
    `;return}const r=l?`${l.firstName||l.name||""} ${l.lastName||""}`.trim():"",t=l?l.email:"",o=l&&l.phone||"",s=l&&l.address||"",i=l&&l.pincode||"";e.innerHTML=`
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
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="fullname" placeholder="John Doe" required value="${r}">
                <span class="text-xs text-danger mt-1 hidden" id="fullname-error">Full name is required (min 3 characters).</span>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="email">Email Address</label>
                <input type="email" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="email" placeholder="john.doe@example.com" required value="${t}">
                <span class="text-xs text-danger mt-1 hidden" id="email-error">Invalid email address format.</span>
              </div>

              <!-- Phone Number -->
              <div>
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="phone">Phone Number</label>
                <input type="tel" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="phone" placeholder="9876543210" required value="${o}">
                <span class="text-xs text-danger mt-1 hidden" id="phone-error">Please enter a valid 10-digit mobile number.</span>
              </div>

              <!-- Detailed Address -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="address">Street Address</label>
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="address" placeholder="Flat No., Street Name, Landmark" required value="${s}">
                <span class="text-xs text-danger mt-1 hidden" id="address-error">Address is required (min 5 characters).</span>
              </div>

              <!-- Pin Code -->
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-text-secondary mb-2" for="pincode">Pincode / Zip Code</label>
                <input type="text" class="input-field w-full px-4 py-3 bg-background-secondary border border-border-80 rounded-xl text-sm text-text-primary outline-none focus:bg-surface focus:border-primary focus-ring-primary-15 transition-all" id="pincode" placeholder="400001" required value="${i}">
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
  `,ne(),O()}let j="card";function ne(){const e=document.getElementById("tab-payment-card"),r=document.getElementById("tab-payment-upi"),t=document.getElementById("content-payment-card"),o=document.getElementById("content-payment-upi");e&&r&&t&&o&&(e.addEventListener("click",()=>{e.className="payment-tab flex-1 btn-premium active py-3 text-xs uppercase tracking-wider gap-2",r.className="payment-tab flex-1 btn-premium py-3 text-xs uppercase tracking-wider gap-2",t.classList.remove("hidden"),o.classList.add("hidden"),j="card"}),r.addEventListener("click",()=>{r.className="payment-tab flex-1 btn-premium active py-3 text-xs uppercase tracking-wider gap-2",e.className="payment-tab flex-1 btn-premium py-3 text-xs uppercase tracking-wider gap-2",o.classList.remove("hidden"),t.classList.add("hidden"),j="upi"}));const s=document.getElementById("checkout-promo-input"),i=document.getElementById("checkout-promo-apply-btn"),a=document.getElementById("checkout-promo-status");n.promoApplied&&(s&&(s.value=n.promoApplied),a&&(a.textContent=`Promo code ${n.promoApplied} applied!`,a.className="text-[11px] font-semibold mt-1 text-success",a.classList.remove("hidden"))),i&&s&&a&&(i.onclick=p=>{p.preventDefault(),s.value.trim().toUpperCase()==="INDUCT10"?(n.promoApplied="INDUCT10",a.textContent="Promo code INDUCT10 applied (10% Off!)",a.className="text-[11px] font-semibold mt-1 text-success",a.classList.remove("hidden"),O()):(a.textContent="Invalid promo code",a.className="text-[11px] font-semibold mt-1 text-danger",a.classList.remove("hidden"))});const d=document.getElementById("checkout-submit-btn");d&&(d.onclick=p=>{p.preventDefault(),ie()&&le()})}function ie(){let e=!0;const r=document.getElementById("fullname"),t=document.getElementById("email"),o=document.getElementById("phone"),s=document.getElementById("address"),i=document.getElementById("pincode"),a=(u,c)=>{const x=document.getElementById(u.id+"-error");x&&(c?(x.classList.remove("hidden"),u.classList.add("error")):(x.classList.add("hidden"),u.classList.remove("error")))};if(r.value.trim().length<3?(a(r,!0),e=!1):a(r,!1),/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.value.trim())?a(t,!1):(a(t,!0),e=!1),/^[0-9]{10}$/.test(o.value.trim())?a(o,!1):(a(o,!0),e=!1),s.value.trim().length<5?(a(s,!0),e=!1):a(s,!1),/^[0-9]{5,6}$/.test(i.value.trim())?a(i,!1):(a(i,!0),e=!1),j==="card"){const u=document.getElementById("card-number"),c=document.getElementById("card-expiry"),x=document.getElementById("card-cvv"),h=u.value.replace(/\s+/g,"");/^[0-9]{16}$/.test(h)?a(u,!1):(a(u,!0),e=!1),/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(c.value.trim())?a(c,!1):(a(c,!0),e=!1),/^[0-9]{3}$/.test(x.value.trim())?a(x,!1):(a(x,!0),e=!1)}else{const u=document.getElementById("upi-vpa");/^\w+@[a-zA-Z]+$/.test(u.value.trim())?a(u,!1):(a(u,!0),e=!1)}return e}function le(){const e=document.getElementById("checkout-submit-btn"),r=e.innerHTML;e.disabled=!0,e.innerHTML='<span class="animate-pulse">Processing Payment...</span>',setTimeout(()=>{const t=n.cart.reduce((u,c)=>u+c.price*c.quantity,0);let o=0;n.promoApplied==="INDUCT10"&&(o=Math.round(t*.1));const s=t>=1999?0:150,i=Math.round((t-o)*.18),a=t-o+s+i,d=`ORD-${Math.floor(1e5+Math.random()*9e5)}`,p=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),m={orderId:d,date:p,name:document.getElementById("fullname").value.trim(),address:document.getElementById("address").value.trim(),total:a,items:n.cart.map(u=>({id:u.id,title:u.title,quantity:u.quantity,price:u.price}))};if(l){l.orders||(l.orders=[]),l.orders.unshift(m);const u={orders:l.orders};l.phone||(u.phone=document.getElementById("phone").value.trim()),l.address||(u.address=document.getElementById("address").value.trim()),l.pincode||(u.pincode=document.getElementById("pincode").value.trim()),te(l.id,u)}Se(),e.disabled=!1,e.innerHTML=r,we(m)},1200)}function O(){const e=document.getElementById("checkout-items-summary-list");if(!e)return;const r=n.cart.reduce((d,p)=>d+p.price*p.quantity,0);e.innerHTML=n.cart.map(d=>`
    <div class="flex gap-4 p-2 bg-background-secondary border border-border-80 rounded-xl">
      <img src="${d.image}" alt="${d.title}" class="w-12 h-14 object-cover rounded bg-surface border border-border">
      <div class="flex-1 min-w-0">
        <h5 class="text-xs font-bold text-text-primary truncate">${d.title}</h5>
        <div class="flex items-center justify-between mt-1">
          <span class="text-xs text-text-secondary">Qty: ${d.quantity}</span>
          <span class="text-xs font-black text-text-primary">₹${d.price*d.quantity}</span>
        </div>
      </div>
    </div>
  `).join("");let t=0;n.promoApplied==="INDUCT10"&&(t=Math.round(r*.1));const o=r>=1999?0:150,s=Math.round((r-t)*.18),i=r-t+o+s;document.getElementById("checkout-subtotal-val").textContent=`₹${r}`;const a=document.getElementById("checkout-discount-row");t>0?(a.classList.remove("hidden"),document.getElementById("checkout-discount-val").textContent=`-₹${t}`):a.classList.add("hidden"),document.getElementById("checkout-shipping-val").textContent=o===0?"FREE":`₹${o}`,document.getElementById("checkout-tax-val").textContent=`₹${s}`,document.getElementById("checkout-total-val").textContent=`₹${i}`}const de=`
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
`;function ce(e){const r=document.getElementById("app");if(!r)return;const t=n.products.find(a=>a.id===e);if(!t){window.location.hash="#shop";return}r.innerHTML=de;const o=document.getElementById("productDetailView");o&&o.classList.remove("hidden"),document.getElementById("detailImage").src=t.image,document.getElementById("detailImage").alt=t.title,document.getElementById("detailThumb1").src=t.image,document.getElementById("detailCategory").textContent=t.category,document.getElementById("detailTitle").textContent=t.title,document.getElementById("detailStars").innerHTML=F(t.rating),document.getElementById("detailRatingText").textContent=`${t.rating} / 5`,document.getElementById("detailPrice").textContent=`₹${t.price}`;const s=Math.round(t.price*1.25);document.getElementById("detailMSRP").textContent=`₹${s}`,document.getElementById("detailSavePercent").textContent="20",document.getElementById("detailDescription").textContent=t.description||"Elevate your everyday with premium materials and unmatched functional design. This product is designed to meet your highest expectations.",document.getElementById("backToCatalogBtn").onclick=()=>{window.location.hash="#shop"},T();const i=document.getElementById("detailBuyNowBtn");i&&(i.onclick=()=>{C(t.id),l?window.location.hash="#checkout":D("checkout")})}function T(){const e=document.getElementById("productDetailView");if(!e||e.classList.contains("hidden"))return;const t=window.location.hash.split("?");if(t[1]){const o=new URLSearchParams(t[1]),s=parseInt(o.get("id")),i=n.products.find(a=>a.id===s);if(i){const a=document.getElementById("detailAddToCartBtn");a&&(n.cart.some(p=>p.id===i.id)?(a.innerHTML=`
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            ALREADY ADDED TO CART
          `,a.style.borderColor="var(--success-color)",a.style.color="var(--success-color)",a.onclick=()=>{y(!0)}):(a.innerHTML=`
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            ADD TO CART
          `,a.style.borderColor="",a.style.color="",a.onclick=()=>{C(i.id),T()}))}}}const pe="https://raw.githubusercontent.com/EKLAVYAGO/Products_main/refs/heads/main/products.json";async function ue(){return await(await fetch(pe)).json()}let me=JSON.parse(localStorage.getItem("carts")),f=me||{};function A(){localStorage.setItem("carts",JSON.stringify(f))}function xe(e,r){f[e]||(f[e]=[]);const t=f[e],o=t.find(s=>s.productId===r);return o?o.quantity++:t.push({productId:r,quantity:1}),A(),t}function fe(e,r){return f[e]&&(f[e]=f[e].filter(t=>t.productId!==r),A()),f[e]||[]}function ge(e,r,t){if(!f[e])return[];const o=f[e].find(s=>s.productId===r);return o&&(o.quantity+=t,o.quantity<=0&&(f[e]=f[e].filter(s=>s.productId!==r)),A()),f[e]||[]}function be(e){return f[e]=[],A(),[]}const n={theme:"dark",products:[],cart:[],orders:[],user:null,filters:{searchQuery:"",categories:[],maxPrice:6e3,minRating:0,sortBy:"featured",searchInDescription:!0},promoApplied:null};async function ve(){he();try{n.products=await ue()}catch(r){console.error("Failed to load products:",r)}const e=localStorage.getItem("theme")||"dark";n.theme=e,document.documentElement.setAttribute("data-theme",e),M(),S(),K(),ye(),Ce(),ke(),Le(),Ee(),window.addEventListener("hashchange",$),$(),k(),w("Welcome to ShopInduct!","info")}function I(){const e=l?l.id:"guest",r=f[e]||[];n.cart=r.map(t=>{const o=n.products.find(s=>s.id===t.productId);return o?{...o,quantity:t.quantity}:null}).filter(Boolean)}function M(){n.user=l,n.orders=l?l.orders||[]:[],I()}function he(){if(document.getElementById("cart-drawer"))return;const e=`
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

    <!-- Delete Confirmation Modal overlay -->
    <div class="modal-backdrop flex items-center justify-center p-4 bg-background-overlay/70 backdrop-blur-sm" id="delete-confirm-modal-backdrop">
      <div class="modal-content relative bg-surface border border-border rounded-2xl max-w-[400px] w-full shadow-premium-xl overflow-hidden transform scale-95 transition-all duration-300">
        <div class="p-8 flex flex-col items-center text-center gap-4">
          <div class="bg-danger-10 text-danger w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-danger-glow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
          </div>
          <h3 class="text-base font-bold text-text-primary">Delete Item from Cart?</h3>
          <p class="text-xs text-text-secondary leading-relaxed delete-confirm-message">
            Are you sure you want to remove this item from your shopping cart? This action cannot be undone.
          </p>
          <div class="flex gap-3 w-full mt-2">
            <button class="flex-1 btn-premium py-2 text-xs" id="delete-confirm-cancel-btn">Cancel</button>
            <button class="flex-1 py-2 text-xs bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 cursor-pointer shadow-md" id="delete-confirm-ok-btn">Delete</button>
          </div>
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
  `,r=document.createElement("div");for(r.innerHTML=e;r.firstChild;)document.body.appendChild(r.firstChild)}function y(e){const r=document.getElementById("cart-drawer"),t=document.getElementById("cart-drawer-backdrop");!r||!t||(e?(r.classList.add("active"),t.classList.add("active")):(r.classList.remove("active"),t.classList.remove("active")))}function ye(){const e=document.getElementById("product-modal-backdrop"),r=document.getElementById("success-modal-backdrop"),t=document.getElementById("profile-modal-backdrop"),o=document.getElementById("auth-modal-backdrop"),s=d=>{if(!d)return;const p=d.querySelector(".modal-close-btn");p&&p.addEventListener("click",()=>d.classList.remove("active")),d.addEventListener("click",m=>{m.target===d&&d.classList.remove("active")})};s(e),s(r),s(t),s(o);const i=document.getElementById("delete-confirm-modal-backdrop");if(i){const d=document.getElementById("delete-confirm-cancel-btn"),p=document.getElementById("delete-confirm-ok-btn");d&&d.addEventListener("click",()=>{i.classList.remove("active"),g&&(g(!1),g=null)}),p&&p.addEventListener("click",()=>{i.classList.remove("active"),g&&(g(!0),g=null)}),i.addEventListener("click",m=>{m.target===i&&(i.classList.remove("active"),g&&(g(!1),g=null))})}const a=document.getElementById("success-continue-btn");a&&r&&a.addEventListener("click",()=>{r.classList.remove("active"),window.location.hash="#home"}),window.addEventListener("keydown",d=>{d.key==="Escape"&&(e&&e.classList.remove("active"),r&&r.classList.remove("active"),t&&t.classList.remove("active"),o&&o.classList.remove("active"),i&&(i.classList.remove("active"),g&&(g(!1),g=null)))})}let g=null;function R(e){const r=document.getElementById("delete-confirm-modal-backdrop");if(!r)return Promise.resolve(!1);const t=r.querySelector(".delete-confirm-message");return t&&(t.textContent=e),r.classList.add("active"),new Promise(o=>{g=o})}function we(e){const r=document.getElementById("success-modal-backdrop");r&&(r.querySelector(".success-order-id").textContent=e.orderId,r.querySelector(".success-date").textContent=e.date,r.querySelector(".success-name").textContent=e.name,r.querySelector(".success-address").textContent=e.address,r.querySelector(".success-total-val").textContent=`₹${e.total}`,r.classList.add("active"),w("Order Placed Successfully!","success"))}function P(){if(!l){D("profile");return}const e=document.getElementById("profile-modal-backdrop");if(!e)return;const r=e.querySelector("#profile-avatar");if(r){const i=l.firstName||l.name||"User";r.textContent=i.charAt(0).toUpperCase()}e.querySelector("#profile-name-display").textContent=`${l.firstName||l.name||""} ${l.lastName||""}`,e.querySelector("#profile-email-display").textContent=l.email,e.querySelector("#profile-phone-display").textContent=l.phone||"N/A",e.querySelector("#profile-pincode-display").textContent=l.pincode||"N/A";const t=l.house?`${l.house}, ${l.address}`:l.address||"N/A";e.querySelector("#profile-address-display").textContent=t;const o=e.querySelector("#profile-orders-list");if(o){const i=l.orders||[];i.length===0?o.innerHTML=`
        <div class="text-center py-6 text-text-muted text-xs bg-background-secondary rounded-xl border border-border border-dashed">
          No orders placed yet.
        </div>`:o.innerHTML=i.map(a=>`
        <div class="bg-background-secondary border border-border rounded-xl p-3 flex justify-between items-center text-xs">
          <div>
            <div class="font-bold text-text-primary">${a.orderId}</div>
            <div class="text-[10px] text-text-muted mt-0.5">${a.orderDate||a.date} • ${a.items?a.items.length:0} items</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-success">${a.grandTotal||"₹"+a.total}</div>
            <div class="text-[9px] bg-success-10 text-success font-semibold px-2 py-0.5 rounded-full inline-block mt-1">Confirmed</div>
          </div>
        </div>
      `).join("")}const s=e.querySelector("#profile-logout-btn");s&&(s.onclick=()=>{e.classList.remove("active"),se(),M(),k(),S(),window.location.hash="#home",w("Logged out successfully","info")}),e.classList.add("active")}function D(e=null){L=e;const r=document.getElementById("auth-modal-backdrop");r&&r.classList.add("active")}let L=null;function ke(){const e=document.getElementById("auth-modal-backdrop"),r=document.getElementById("tabSignIn"),t=document.getElementById("tabSignUp"),o=document.getElementById("signInForm"),s=document.getElementById("signUpForm"),i=document.getElementById("btnCancelAuth");r&&t&&o&&s&&(r.addEventListener("click",()=>{r.className="flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-primary text-text-primary transition-all cursor-pointer",t.className="flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-all cursor-pointer",o.classList.remove("hidden"),s.classList.add("hidden")}),t.addEventListener("click",()=>{t.className="flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-primary text-text-primary transition-all cursor-pointer",r.className="flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-all cursor-pointer",s.classList.remove("hidden"),o.classList.add("hidden")})),i&&e&&i.addEventListener("click",()=>{e.classList.remove("active")}),o&&o.addEventListener("submit",a=>{a.preventDefault();const d=document.getElementById("loginEmail").value.trim(),p=document.getElementById("loginPassword").value,m=document.getElementById("loginErrorMsg"),u=re(d,p);u.success?(M(),S(),k(),e.classList.remove("active"),w("Welcome back!","success"),L==="profile"?P():L==="checkout"&&(window.location.hash="#checkout")):(m.textContent=u.message,m.classList.remove("hidden"))}),s&&s.addEventListener("submit",a=>{var N;a.preventDefault();const d=document.getElementById("regFirstName").value.trim(),p=document.getElementById("regLastName").value.trim(),m=document.getElementById("regEmail").value.trim(),u=document.getElementById("regPhone").value.trim(),c=((N=document.querySelector('input[name="regGender"]:checked'))==null?void 0:N.value)||"Male",x=document.getElementById("regPassword").value,h=document.getElementById("signUpErrorMsg"),E=oe(m,x,{firstName:d,lastName:p,phone:u,gender:c});E.success?(M(),S(),k(),e.classList.remove("active"),w("Account created successfully!","success"),L==="profile"?P():L==="checkout"&&(window.location.hash="#checkout")):(h.textContent=E.message,h.classList.remove("hidden"))})}function w(e,r="success"){const t=document.getElementById("toast-container");if(!t)return;const o=document.createElement("div");o.className=`toast toast-${r}`;const s=r==="success"?'<svg class="toast-icon-success text-success" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>':r==="error"?'<svg class="toast-icon-error text-danger" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>':'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px; color: var(--accent-color);"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 1.063 1.06l-.041.02a.75.75 0 0 1-1.063-1.06Zm-9.62 1.62c-.22-.387-.218-.868.004-1.253a8.966 8.966 0 0 1 2.3-2.61c.427-.34.98-.52(1.547-.506A8.96 8.96 0 0 1 12 10.25a8.96 8.96 0 0 1 6.53-2.987c.567-.014 1.12.166 1.547.506a8.966 8.966 0 0 1 2.3 2.61c.222.385.224.866.004 1.253a8.966 8.966 0 0 1-2.3 2.61c-.427.34-.98.52-1.547.506A8.96 8.96 0 0 1 12 13.75a8.96 8.96 0 0 1-6.53 2.987c-.567.014-1.12-.166-1.547-.506a8.966 8.966 0 0 1-2.3-2.61Z" /></svg>';o.innerHTML=`
    <div class="toast-icon">${s}</div>
    <div class="toast-content">
      <p class="toast-message text-text-primary text-xs font-semibold leading-relaxed">${e}</p>
    </div>
    <div class="toast-progress ${r==="success"?"toast-success-progress":r==="error"?"toast-error-progress":""}"></div>
  `,t.appendChild(o),setTimeout(()=>{o.classList.add("removing"),o.addEventListener("animationend",()=>o.remove())},2500)}function Ce(){const e=document.getElementById("back-to-top-btn");e&&(window.addEventListener("scroll",()=>{window.scrollY>400?e.classList.add("active"):e.classList.remove("active")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function U(e,r=!1){const t=`
    <div class="product-card group bg-surface border border-border rounded-2xl p-4 flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-premium-lg h-full cursor-grab active:cursor-grabbing w-full" data-product-id="${e.id}" draggable="true">
      <!-- Image Container -->
      <div class="aspect-square bg-background-secondary rounded-xl relative overflow-hidden cursor-pointer mb-3" data-action="view-details">
        <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" src="${e.image}" alt="${e.title}" loading="lazy" draggable="false">
        <!-- Price Badge on top-right of image -->
        <span class="absolute top-3 right-3 bg-constant-dark/60 text-constant-white text-xs font-bold px-2 py-1 rounded-lg shadow-premium-sm">₹${e.price}</span>
      </div>
      
      <!-- Card Body Content -->
      <div class="flex flex-col flex-1 gap-1">
        <!-- Category name in uppercase -->
        <span class="text-[10px] uppercase font-bold text-text-muted tracking-widest">${e.category}</span>
        
        <!-- Product Title -->
        <h3 class="text-sm font-bold text-text-primary leading-snug cursor-pointer line-clamp-2 h-10 hover:text-primary transition-colors mb-1" data-action="view-details">${e.title}</h3>
        
        <!-- Rating Row -->
        <div class="flex items-center gap-1 text-xs text-text-secondary mb-3">
          <span class="inline-flex items-center gap-[2px] text-rating">
            ${F(e.rating)}
          </span>
          <span class="font-extrabold text-text-primary ml-1">${e.rating}</span>
          <span class="text-text-muted">(${100+e.id*7})</span>
        </div>
        
        <!-- Full width Add to Cart button -->
        <button class="w-full mt-auto btn-premium py-2.5 text-xs gap-2 add-to-cart-btn cursor-pointer" data-product-id="${e.id}" title="Add to Cart" aria-label="Add ${e.title} to cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          Add to Cart
        </button>
      </div>
    </div>
  `;return r?`
      <div class="product-card-container w-[280px] shrink-0 snap-start">
        ${t}
      </div>
    `:t}function F(e){const r=Math.floor(e),t=e%1>=.4;let o="";for(let s=1;s<=5;s++)s<=r||s===r+1&&t?o+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5 text-rating"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>':o+='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 text-text-muted"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.15-.352.65-.352.8 0l2.122 5.101 5.5 1.002c.408.075.57.579.28.87l-4 3.902 1.082 5.48c.081.408-.344.717-.7.5l-4.9-3.003-4.9 3.003c-.356.217-.781-.092-.7-.5l1.082-5.48-4-3.902c-.29-.29-.128-.795.28-.87l5.5-1.002 2.122-5.101Z" /></svg>';return o}function B(){document.querySelectorAll(".add-to-cart-btn").forEach(r=>{const t=parseInt(r.getAttribute("data-product-id"));if(isNaN(t))return;n.cart.some(s=>s.id===t)?(r.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-emerald-500"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        Already Added
      `,r.classList.add("added")):(r.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
        Add to Cart
      `,r.classList.remove("added"))});const e=document.getElementById("product-modal-backdrop");if(e&&e.classList.contains("active")){const r=parseInt(e.getAttribute("data-product-id"));if(!isNaN(r)){const t=e.querySelector(".modal-add-to-cart-btn");t&&(n.cart.some(s=>s.id===r)?(t.innerHTML="Already Added",t.classList.add("added")):(t.innerHTML="Add to Cart",t.classList.remove("added")))}}T()}function V(e){e.querySelectorAll('[data-action="view-details"]').forEach(r=>{r.addEventListener("click",t=>{const o=t.target.closest(".product-card"),s=parseInt(o.getAttribute("data-product-id"));window.location.hash=`#product?id=${s}`})}),e.querySelectorAll(".add-to-cart-btn").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const o=t.target.closest(".product-card"),s=parseInt(o.getAttribute("data-product-id"));n.cart.some(a=>a.id===s)?y(!0):C(s)})}),B()}function Ee(){const e=document.getElementById("cart-dropzone-indicator"),r=document.getElementById("nav-cart-btn"),t=document.getElementById("cart-drawer");document.body.addEventListener("dragstart",o=>{const s=o.target.closest(".product-card");if(s){const i=s.getAttribute("data-product-id");o.dataTransfer.setData("text/plain",i),o.dataTransfer.effectAllowed="copy",e&&e.classList.add("dragover"),t&&t.classList.add("drag-active"),y(!0)}}),document.body.addEventListener("dragend",()=>{e&&e.classList.remove("dragover"),t&&t.classList.remove("drag-active")}),t&&(t.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="copy",e&&e.classList.add("dragover")}),t.addEventListener("drop",o=>{o.preventDefault();const s=parseInt(o.dataTransfer.getData("text/plain"));isNaN(s)||C(s),e&&e.classList.remove("dragover"),t&&t.classList.remove("drag-active")})),e&&(e.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="copy"}),e.addEventListener("drop",o=>{o.preventDefault();const s=parseInt(o.dataTransfer.getData("text/plain"));isNaN(s)||C(s)})),r&&(r.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="copy"}),r.addEventListener("drop",o=>{o.preventDefault();const s=parseInt(o.dataTransfer.getData("text/plain"));isNaN(s)||(C(s),y(!0))}))}function k(){const e=document.getElementById("cart-items-container"),r=document.getElementById("cart-empty-state"),t=document.getElementById("cart-drawer-footer"),o=document.getElementById("nav-cart-badge-count");if(!e)return;const s=n.cart.reduce((c,x)=>c+x.quantity,0),i=n.cart.reduce((c,x)=>c+x.price*x.quantity,0);if(o&&(s>0?(o.textContent=s,o.classList.remove("hidden")):o.classList.add("hidden")),n.cart.length===0){e.innerHTML="",r.classList.remove("hidden"),t.classList.add("hidden");return}r.classList.add("hidden"),t.classList.remove("hidden"),e.innerHTML=n.cart.map(c=>`
    <div class="flex gap-4 p-4 bg-background-secondary border border-border-80 rounded-xl relative hover:border-primary transition-all duration-300">
      <img src="${c.image}" alt="${c.title}" class="w-16 h-16 rounded-lg object-cover bg-surface border border-border">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="text-[9px] font-bold text-text-muted uppercase tracking-widest">${c.category}</span>
        <h5 class="text-xs font-bold text-text-primary mt-0.5 leading-tight line-clamp-1">${c.title}</h5>
        <div class="flex items-center justify-between mt-auto">
          <div class="flex items-center gap-2 bg-surface border border-border rounded-lg p-0.5">
            <button class="cart-qty-btn text-text-secondary hover:text-text-primary transition px-1.5 py-0.5 rounded cursor-pointer" data-product-id="${c.id}" data-delta="-1">-</button>
            <span class="text-xs font-bold text-text-primary w-4 text-center">${c.quantity}</span>
            <button class="cart-qty-btn text-text-secondary hover:text-text-primary transition px-1.5 py-0.5 rounded cursor-pointer" data-product-id="${c.id}" data-delta="1">+</button>
          </div>
          <span class="text-xs font-black text-text-primary">₹${c.price*c.quantity}</span>
        </div>
      </div>
      <button class="cart-remove-btn absolute top-3 right-3 text-text-muted hover:text-danger transition cursor-pointer" data-product-id="${c.id}" title="Remove item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
      </button>
    </div>
  `).join("");let a=0;n.promoApplied==="INDUCT10"&&(a=Math.round(i*.1));const d=i>=1999?0:150,p=Math.round((i-a)*.18),m=i-a+d+p;document.getElementById("cart-subtotal-val").textContent=`₹${i}`;const u=document.getElementById("cart-discount-row");a>0?(u.classList.remove("hidden"),document.getElementById("cart-discount-val").textContent=`-₹${a}`):u.classList.add("hidden"),document.getElementById("cart-shipping-val").textContent=d===0?"FREE":`₹${d}`,document.getElementById("cart-tax-val").textContent=`₹${p}`,document.getElementById("cart-total-val").textContent=`₹${m}`,e.querySelectorAll(".cart-qty-btn").forEach(c=>{c.onclick=()=>{const x=parseInt(c.getAttribute("data-product-id")),h=parseInt(c.getAttribute("data-delta"));Be(x,h)}}),e.querySelectorAll(".cart-remove-btn").forEach(c=>{c.onclick=()=>{const x=parseInt(c.getAttribute("data-product-id"));Ie(x)}}),B()}function Le(){const e=document.getElementById("cart-promo-apply-btn"),r=document.getElementById("cart-promo-input"),t=document.getElementById("cart-promo-status");e&&r&&(e.onclick=()=>{r.value.trim().toUpperCase()==="INDUCT10"?(n.promoApplied="INDUCT10",t.textContent="Promo code INDUCT10 applied (10% Off!)",t.className="text-[11px] font-semibold mt-1 text-success",t.classList.remove("hidden"),k()):(t.textContent="Invalid promo code",t.className="text-[11px] font-semibold mt-1 text-danger",t.classList.remove("hidden"))});const o=document.getElementById("cart-drawer-shop-btn");o&&(o.onclick=()=>{y(!1),window.location.hash="#shop"});const s=document.getElementById("cart-drawer-checkout-btn");s&&(s.onclick=()=>{y(!1),l?window.location.hash="#checkout":D("checkout")})}function C(e){const r=l?l.id:"guest";xe(r,e),I(),k(),B(),w("Added to Cart","success")}async function Ie(e){if(!await R("Are you sure you want to remove this item from your shopping cart?"))return;const t=l?l.id:"guest";fe(t,e),I(),k(),B(),w("Removed from Cart","info")}async function Be(e,r){if(r===-1){const o=n.cart.find(s=>s.id===e);if(o&&o.quantity===1&&!await R("Are you sure you want to remove this item from your cart?"))return}const t=l?l.id:"guest";ge(t,e,r),I(),k(),B()}function Se(){const e=l?l.id:"guest";be(e),I(),k()}const H={"#home":()=>X(),"#shop":()=>Z(),"#checkout":()=>ae(),"#product":()=>{const e=window.location.hash,r=e.includes("?")?e.split("?")[1]:"",t=new URLSearchParams(r),o=parseInt(t.get("id"));ce(o)}};function Me(){n.filters.searchQuery="",n.filters.categories=[],n.filters.maxPrice=6e3,n.filters.minRating=0,n.filters.sortBy="featured";const e=document.getElementById("search-input");e&&(e.value="");const r=document.getElementById("mobile-search-input");r&&(r.value="")}function $(){const r=(window.location.hash||"#home").split("?")[0],t=document.querySelector(".sub-navbar");t&&(r==="#shop"?(t.classList.remove("hidden"),t.classList.remove("md:hidden"),t.classList.add("md:block")):(t.classList.remove("md:block"),t.classList.add("md:hidden"),t.classList.add("hidden"))),document.querySelectorAll(".nav-links a").forEach(p=>{p.getAttribute("href")===r?p.classList.add("active"):p.classList.remove("active")});const s=document.querySelectorAll(".sub-nav-link"),i=n.filters.categories.length>0?n.filters.categories[0]:"all";s.forEach(p=>{p.getAttribute("data-category")===i?p.classList.add("active"):p.classList.remove("active")}),[{id:"footer-link-home",href:"#home"},{id:"footer-link-shop",href:"#shop"}].forEach(p=>{const m=document.getElementById(p.id);m&&(p.href===r?m.classList.add("active"):m.classList.remove("active"))}),(H[r]||H["#home"])(),window.scrollTo({top:0,behavior:"instant"})}document.addEventListener("DOMContentLoaded",ve);
