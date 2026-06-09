export const ProductDetailView = `
<div id="productDetailView" class="hidden w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in flex-1">
  <div class="mb-6">
    <button id="backToCatalogBtn" class="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
      BACK TO CATALOG
    </button>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-6 lg:p-12 shadow-xl">
    <!-- Image Section -->
    <div class="flex flex-col gap-4">
      <div class="relative aspect-square w-full bg-zinc-50 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-8">
        <img id="detailImage" src="" alt="Product Image" class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 hover:scale-105">
      </div>
      <!-- Thumbnails (Placeholder) -->
      <div class="flex gap-4 overflow-x-auto pb-2">
        <div class="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-xl border-2 border-zinc-950 dark:border-white p-2 flex-shrink-0 cursor-pointer">
          <img id="detailThumb1" src="" class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal">
        </div>
      </div>
    </div>

    <!-- Details Section -->
    <div class="flex flex-col">
      <div class="mb-6">
        <p id="detailCategory" class="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2"></p>
        <h1 id="detailTitle" class="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white leading-tight mb-4"></h1>
        
        <div class="flex items-center gap-2 mb-6">
          <div id="detailStars" class="flex gap-1 text-sm"></div>
          <span id="detailRatingText" class="text-xs font-bold text-zinc-500 dark:text-zinc-400 ml-2"></span>
        </div>
        
        <div class="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-8 inline-block w-full">
          <p class="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Price</p>
          <div class="flex items-baseline gap-3">
            <span id="detailPrice" class="text-4xl font-black text-zinc-950 dark:text-white"></span>
            <span id="detailMSRP" class="text-lg font-medium text-zinc-400 dark:text-zinc-500 line-through"></span>
            <span class="text-xs font-bold text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-500/10 px-2 py-1 rounded-md ml-2 flex items-center gap-1">
               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
               Save <span id="detailSavePercent"></span>%
            </span>
          </div>
          <p class="text-[10px] text-zinc-400 dark:text-zinc-500 mt-2 font-medium">Inclusive of all taxes</p>
        </div>
        
        <div class="prose prose-sm dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 mb-10 leading-relaxed font-medium">
          <p id="detailDescription">Detailed product description goes here. Elevate your everyday with premium materials and unmatched functional design.</p>
          <ul class="mt-4 space-y-2">
             <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                In Stock & Ready to Ship
             </li>
             <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                1-Year Manufacturer Warranty
             </li>
             <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Free 30-Day Returns
             </li>
          </ul>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mt-auto">
        <button id="detailAddToCartBtn" class="flex-1 py-4 px-6 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-white border-2 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl font-bold flex items-center justify-center gap-2 transition-all focus:outline-none shadow-sm hover:shadow-md">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          ADD TO CART
        </button>
        <button id="detailBuyNowBtn" class="flex-1 py-4 px-6 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          BUY NOW
        </button>
      </div>

       <!-- Security assurances -->
       <div class="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700 flex flex-wrap gap-4 justify-between items-center opacity-70">
          <div class="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
             Secure Transaction
          </div>
          <div class="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
             All Cards Accepted
          </div>
       </div>
    </div>
  </div>
</div>
`;
