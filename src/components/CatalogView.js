export const CatalogView = `
<div id="catalogView" class="view-section hidden animate-in fade-in duration-500">
  <!-- Subnav -->
  <div class="border-b border-zinc-200 dark:border-zinc-700 text-[10px] font-bold tracking-widest uppercase bg-white dark:bg-zinc-950">
     <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between overflow-x-auto overflow-y-hidden whitespace-nowrap">
       <div class="flex gap-8" id="topCatPills">
         <!-- Injected here -->
       </div>
       <div class="text-[#f59e0b] flex-shrink-0 ml-4 hidden sm:block">
         🎟️ Use Code: INDUCT10 for 10% Off!
       </div>
     </div>
  </div>

  <main class="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Filters Sidebar -->
    <aside class="w-full lg:w-[260px] flex-shrink-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl h-fit lg:sticky lg:top-32 lg:max-h-[calc(100vh-140px)] overflow-y-auto shadow-sm">
      <h2 class="text-base font-bold mb-6 text-zinc-950 dark:text-white pb-4 border-b border-zinc-200 dark:border-zinc-700">Catalog Filters</h2>
      
      <div class="mb-6">
        <h3 class="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">Category</h3>
        <div class="flex flex-col gap-2" id="sidebarCatPills">
          <!-- Injected here -->
        </div>
      </div>
      
      <div class="mb-8">
        <div class="flex justify-between items-end mb-4">
          <h3 class="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Price Range</h3>
        </div>
        <input type="range" id="priceFilter" min="0" max="25000" step="100" value="25000" class="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white">
        <div class="flex justify-between text-[10px] font-bold text-zinc-500 dark:text-zinc-400 mt-3">
          <span>Min: ₹0</span>
          <span class="text-zinc-950 dark:text-white">Max: ₹<span id="priceValue">25000</span></span>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Minimum Rating</h3>
        <div class="flex flex-col gap-3">
          <label class="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer hover:text-zinc-950 dark:text-white transition-colors">
            <input type="radio" name="rate" value="0" class="rating-radio accent-zinc-900 dark:accent-white" checked /> All Ratings
          </label>
          <label class="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer hover:text-zinc-950 dark:text-white transition-colors">
            <input type="radio" name="rate" value="4.5" class="rating-radio accent-zinc-900 dark:accent-white" /> <span class="text-[#f59e0b]">★</span> 4.5 & up
          </label>
          <label class="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer hover:text-zinc-950 dark:text-white transition-colors">
            <input type="radio" name="rate" value="4" class="rating-radio accent-zinc-900 dark:accent-white" /> <span class="text-[#f59e0b]">★</span> 4.0 & up
          </label>
        </div>
      </div>
      <button id="resetFiltersBtn" class="w-full py-3 mt-4 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-950 text-zinc-950 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-950 dark:ring-white focus:ring-offset-white dark:ring-offset-zinc-950">Clear All Filters</button>
    </aside>

    <!-- Products Grid Config -->
    <div class="flex-1 min-w-0">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Showing <span id="productCount" class="font-bold text-zinc-950 dark:text-white">0</span> products</h2>
        <div class="flex items-center gap-3 text-xs">
          <span class="text-zinc-500 dark:text-zinc-400 font-bold">Sort by:</span>
          <select id="sortSelect" class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:ring-white outline-none cursor-pointer">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- Products will be injected here -->
      </div>
    </div>
  </main>
</div>
`;
