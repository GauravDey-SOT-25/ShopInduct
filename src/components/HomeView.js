export const HomeView = `
<div id="homeView" class="view-section block animate-in fade-in duration-500">
  <!-- Hero Section -->
  <section class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col md:flex-row gap-12 lg:gap-16 items-center min-h-[500px]">
     <div class="flex-1 space-y-8">
        <div class="inline-block bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-1.5 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">
          NEW COLLECTION &mdash; OUT NOW
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-[4.2rem] font-black tracking-tight leading-[1.05] text-zinc-950 dark:text-white">
          Discover Modern Premium Shopping Experiences
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
          Carefully curated, exceptional quality products built to elevate your lifestyle. Strictly designed for absolute reliability, minimal aesthetics, and outstanding longevity.
        </p>
        <div class="flex flex-wrap gap-4 pt-4">
          <button class="nav-link bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2" data-target="catalogView">
            Shop Catalog <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
          <button class="nav-link bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-6 py-3 rounded-lg text-sm font-bold transition-all text-zinc-950 dark:text-white" data-target="catalogView">
            Explore Categories
          </button>
        </div>
     </div>
     <div class="flex-1 w-full relative">
        <div class="aspect-[5/4] sm:aspect-[4/3] lg:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl relative border border-zinc-200 dark:border-zinc-700">
           <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80" alt="Premium Storefront" class="w-full h-full object-cover">
           <div class="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-zinc-950/80 via-transparent to-transparent"></div>
        </div>
     </div>
  </section>

  <!-- Trust Badges -->
  <section class="border-y border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50">
     <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Badge 1 -->
        <div class="flex items-center gap-4">
           <div class="text-zinc-950 dark:text-white">
             <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
           </div>
           <div>
             <h4 class="text-sm font-bold text-zinc-950 dark:text-white mb-0.5">Free Shipping</h4>
             <p class="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight">On orders above ₹1,999</p>
           </div>
        </div>
        <!-- Badge 2 -->
        <div class="flex items-center gap-4">
           <div class="text-zinc-950 dark:text-white">
             <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
           </div>
           <div>
             <h4 class="text-sm font-bold text-zinc-950 dark:text-white mb-0.5">Secure Checkout</h4>
             <p class="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight">Stripe protocol systems</p>
           </div>
        </div>
        <!-- Badge 3 -->
        <div class="flex items-center gap-4">
           <div class="text-zinc-950 dark:text-white">
             <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
           </div>
           <div>
             <h4 class="text-sm font-bold text-zinc-950 dark:text-white mb-0.5">Easy 30-day Returns</h4>
             <p class="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight">Quick hassle-free exchanges</p>
           </div>
        </div>
        <!-- Badge 4 -->
        <div class="flex items-center gap-4">
           <div class="text-zinc-950 dark:text-white">
             <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
           </div>
           <div>
             <h4 class="text-sm font-bold text-zinc-950 dark:text-white mb-0.5">24/7 Dedicated Support</h4>
             <p class="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight">Premium assistance anytime</p>
           </div>
        </div>
     </div>
  </section>

  <!-- Shop by Category Grids -->
  <section class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
     <h3 class="text-2xl font-bold tracking-tight mb-8 text-zinc-950 dark:text-white">Shop by Category</h3>
     <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="homeCatGrid">
        <!-- Categories injected here -->
     </div>
  </section>
</div>
`;
