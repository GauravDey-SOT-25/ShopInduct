import { state, createProductCardHtml, bindCardInteractions, showToast } from "./app.js";

export function renderCategoryPage() {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  appContainer.innerHTML = `
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
              <button type="button" class="category-pill-btn w-full text-left px-4 py-2.5 text-xs btn-premium" data-category="Home & Lifestyle">
                Home & Lifestyle
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
  `;

  initCatalogPageEvents();
  renderCatalog();
}

function initCatalogPageEvents() {
  const priceRangeInput = document.getElementById("filter-price-range");
  const priceDisplay = document.getElementById("price-range-display");
  const sortSelect = document.getElementById("catalog-sort");
  const clearBtn = document.getElementById("filters-clear-all-btn");
  const emptyClearBtn = document.getElementById("catalog-empty-clear-btn");

  if (priceRangeInput && priceDisplay) {
    priceRangeInput.value = state.filters.maxPrice;
    priceDisplay.textContent = `₹${state.filters.maxPrice}`;
    priceRangeInput.addEventListener("input", (e) => {
      priceDisplay.textContent = `₹${e.target.value}`;
      state.filters.maxPrice = parseInt(e.target.value);
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.value = state.filters.sortBy;
    sortSelect.addEventListener("change", (e) => {
      state.filters.sortBy = e.target.value;
      renderCatalog();
    });
  }

  // Category selection click handlers
  document.querySelectorAll(".category-pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute('data-category');
      if (category === 'all') {
        state.filters.categories = [];
      } else {
        state.filters.categories = [category];
      }
      renderCatalog();
    });
  });

  // Rating checks
  document.querySelectorAll(".filter-rating-radio").forEach(radio => {
    radio.addEventListener("change", (e) => {
      state.filters.minRating = parseFloat(e.target.value);
      renderCatalog();
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

  const clearAllAction = () => {
    state.filters.maxPrice = 25000;
    state.filters.minRating = 0;
    state.filters.categories = [];
    state.filters.searchQuery = '';
    state.filters.sortBy = 'featured';

    if (priceRangeInput) {
      priceRangeInput.value = 25000;
    }
    if (priceDisplay) {
      priceDisplay.textContent = '₹25000';
    }
    const allRating = document.getElementById('rating-all');
    if (allRating) allRating.checked = true;
    if (sortSelect) sortSelect.value = 'featured';

    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    const mobileSearchInput = document.getElementById('mobile-search-input');
    if (mobileSearchInput) mobileSearchInput.value = '';

    renderCatalog();
  };

  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllAction);
  }
  if (emptyClearBtn) {
    emptyClearBtn.addEventListener('click', clearAllAction);
  }
}

export function renderCatalog() {
  const activeCategory = state.filters.categories.length > 0 ? state.filters.categories[0] : 'all';
  
  // Sync sidebar pills
  document.querySelectorAll(".category-pill-btn").forEach((btn) => {
    const btnCat = btn.getAttribute('data-category');
    if (btnCat === activeCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Sync sub-navbar links
  document.querySelectorAll('.sub-nav-link').forEach(link => {
    const linkCat = link.getAttribute('data-category');
    if (linkCat === activeCategory) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Filtering
  let filtered = state.products.filter(p => {
    // Category check
    const matchesCategory = activeCategory === 'all' || 
      p.category.toLowerCase() === activeCategory.toLowerCase();

    // Price check
    const matchesPrice = p.price <= state.filters.maxPrice;

    // Rating check
    const matchesRating = p.rating >= state.filters.minRating;

    // Search query check
    const query = state.filters.searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.title.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query));

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  // Sorting
  if (state.filters.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.filters.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.filters.sortBy === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // DOM elements update
  const countEl = document.getElementById("catalog-product-count");
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} products`;
  }

  const grid = document.getElementById("catalog-products-grid");
  const emptyState = document.getElementById("catalog-empty-state");

  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      grid.innerHTML = filtered.map(p => createProductCardHtml(p, false)).join('');
      bindCardInteractions(grid);
    }
  }
}
