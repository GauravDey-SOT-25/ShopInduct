import {state, createProductCardHtml, bindCardInteractions } from "./app.js";

export function renderCategoryPage() {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  appContainer.innerHTML = `
    <!-- ================= CATALOG / SHOP VIEW ================= -->
    <section id="catalog-view" class="max-w-[1280px] mx-auto px-4 py-8 pb-16 view fade-in">
      <div class="flex items-center justify-between mb-6 gap-4">
        <div class="text-sm text-text-secondary font-medium" id="catalog-product-count">Showing 12 products</div>
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

          <!-- Category Pill Buttons (FIX 3, 4) -->
          <div class="flex flex-col gap-2.5 border-b border-border-80 pb-5">
            <span class="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Category</span>
            <div class="flex flex-col gap-2" id="sidebar-categories-container">
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium active" data-category="all">
                All Products
              </button>
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Electronics">
                Electronics
              </button>
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Fashion">
                Fashion
              </button>
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Home & Lifestyle">
                Home & Lifestyle
              </button>
            </div>          </div>

          <!-- Price sliding scale filter -->
          <div class="flex flex-col gap-3 border-b border-border-80 pb-5">
            <span class="text-sm font-semibold text-text-primary">Price Range</span>
            <div class="flex flex-col gap-2">
              <input type="range" class="range-input" id="filter-price-range" min="600" max="6000" step="100" value="6000">
              <div class="flex justify-between text-xs text-text-secondary font-medium">
                <span>Min: ₹600</span>
                <span id="price-range-display" class="font-bold text-primary">₹6000</span>
              </div>
            </div>
          </div>

          <!-- Rating Stars Filter -->
          <div class="flex flex-col gap-3 pb-5">
            <span class="text-sm font-semibold text-text-primary">Minimum Rating</span>
            <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="radio" name="rating-filter" class="w-4 h-4 text-primary focus:ring-primary/20 filter-rating-radio cursor-pointer" id="rating-all" value="0">
              All Ratings
            </label>
            <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="radio" name="rating-filter" class="w-4 h-4 text-primary focus:ring-primary/20 filter-rating-radio cursor-pointer" value="4.5">
              <span class="stars-row inline-flex items-center text-rating gap-[2px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>
              </span>
              <span>4.5 & up</span>
            </label>
            <label class="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="radio" name="rating-filter" class="w-4 h-4 text-primary focus:ring-primary/20 filter-rating-radio cursor-pointer" value="4.2">
              <span class="stars-row inline-flex items-center text-rating gap-[2px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>
              </span>
              <span>4.2 & up</span>
            </label>
          </div>

          <button class="btn-premium px-6 py-2.5 text-xs mt-auto cursor-pointer" id="filters-clear-all-btn">
            Clear All Filters
          </button>
        </aside>

        <!-- Product Cards Catalog Grid -->
        <div>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="catalog-product-grid">
            <!-- Dynamic product cards -->
          </div>

          <!-- Catalog Empty Search / Filter States placeholder -->
          <div class="flex flex-col items-center justify-center text-center p-16 bg-surface border border-border rounded-2xl gap-4 max-w-[500px] mx-auto hidden" id="catalog-empty-state">
            <div class="text-text-muted bg-background-secondary p-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" /></svg>
            </div>
            <h3 class="text-lg font-bold text-text-primary">No products found</h3>
            <p class="text-sm text-text-secondary leading-relaxed">We couldn't find any products in our warehouse matching your specific filter combinations. Try resetting filters or adjust sliders.</p>
            <button class="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl text-text-inverse bg-primary hover:bg-primary-hover transition duration-150 cursor-pointer" id="catalog-empty-clear-btn">Clear All Filters</button>
          </div>
        </div>
      </div>
    </section>
  `;

  // Bind filter interactive events
  initCatalogPageEvents();
}

function initCatalogPageEvents() {
  const priceRangeInput = document.getElementById("filter-price-range");
  const priceDisplay = document.getElementById("price-range-display");
  const sortSelect = document.getElementById("catalog-sort");
  const clearBtn = document.getElementById("filters-clear-all-btn");
  const emptyClearBtn = document.getElementById("catalog-empty-clear-btn");

  // Price range slider change
  if (priceRangeInput && priceDisplay) {
    priceRangeInput.addEventListener("input", (e) => {
     priceDisplay.textContent = `₹${e.target.value}`;
    });
  }

  // Categories pills click handlers (FIX 3)
  document.querySelectorAll(".category-pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-pill-btn").forEach((b) => {
        b.className = "category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium";
      });
      btn.className = "category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium active";
    });
  });

  // Mobile drawer filter collapsible buttons
  const mobileToggle = document.getElementById("mobile-filter-toggle-btn");
  const closeFilter = document.getElementById("mobile-filter-close-btn");
  const collapsibleFilterPane = document.getElementById("catalog-filters-pane");
  const filterBackdrop = document.getElementById("filter-backdrop");

  if (mobileToggle && collapsibleFilterPane && filterBackdrop) {
    mobileToggle.addEventListener("click", () => {
      collapsibleFilterPane.classList.add("active");
      filterBackdrop.classList.add("active");
    });
    if (closeFilter) {
      closeFilter.addEventListener("click", () => {
        collapsibleFilterPane.classList.remove("active");
        filterBackdrop.classList.remove("active");
      });
    }
    filterBackdrop.addEventListener("click", () => {
      collapsibleFilterPane.classList.remove("active");
      filterBackdrop.classList.remove("active");
    });
  }

  // Clear filters click handlers
  if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    document.getElementById('filter-price-range').value = 6000;
    document.getElementById('price-range-display').textContent = '₹6000';

    const allRating = document.getElementById('rating-all');
    if (allRating) allRating.checked = true;
  });
}
}
