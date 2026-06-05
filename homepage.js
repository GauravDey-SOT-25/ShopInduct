import { state, createProductCardHtml, bindCardInteractions, clearAllFilters } from './app.js';
import { renderCatalog } from './categorypage.js';

export function renderHomepage() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  appContainer.innerHTML = `
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
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <!-- Electronics Category -->
          <div class="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-premium-md group category-tile" data-category="Electronics">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" alt="Electronics Category" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 class="text-lg font-bold text-white mb-1">Electronics</h3>
              <span class="text-xs text-white opacity-80">10 Products</span>
            </div>
          </div>

          <!-- Fashion Category -->
          <div class="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-premium-md group category-tile" data-category="Fashion">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" alt="Fashion Category" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 class="text-lg font-bold text-white mb-1">Fashion</h3>
              <span class="text-xs text-white opacity-80">10 Products</span>
            </div>
          </div>

          <!-- Home Category -->
          <div class="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-premium-md group category-tile" data-category="Home & Lifestyle">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" alt="Home & Lifestyle Category" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 class="text-lg font-bold text-white mb-1">Home & Kitchen</h3>
              <span class="text-xs text-white opacity-80">10 Products</span>
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
  `;

  // Bind Event Listeners
  const exploreBtn = document.getElementById('home-explore-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      clearAllFilters();
      window.location.hash = '#shop';
    });
  }

  // Bind Category Tile Clicks
  document.querySelectorAll('.category-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const category = tile.getAttribute('data-category');
      state.filters.categories = [category];
      window.location.hash = '#shop';
      
      // Trigger rendering in categorypage.js
      renderCatalog();
    });
  });

  // Populate horizontal Featured Products slider (FIX 4)
  const homeSlider = document.getElementById('home-featured-products-slider');
  if (homeSlider) {
    const featured = state.products.slice(0, 6);
    homeSlider.innerHTML = featured.map(p => createProductCardHtml(p, true)).join('');
    bindCardInteractions(homeSlider);
  }
}
