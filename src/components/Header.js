export const Header = `
<!-- Navbar -->
<header class="bg-white/85 dark:bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-200 dark:border-[#3f3f46] sticky top-0 z-40 transition-colors duration-300">
  <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex justify-between items-center">
    <div class="flex items-center gap-8">
      <a href="#" class="flex items-center gap-2 text-xl font-extrabold text-[#09090b] dark:text-[#ffffff] tracking-tight nav-link transition-colors" data-target="homeView">
        <svg class="w-6 h-6 text-[#09090b] dark:text-[#ffffff]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L13.06 5.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l5-5ZM2.47 11.97a.75.75 0 0 1 1.06 0L12 20.44l8.47-8.47a.75.75 0 1 1 1.06 1.06l-9 9a.75.75 0 0 1-1.06 0l-9-9a.75.75 0 0 1 0-1.06Z" />
        </svg>
        Shop<span class="opacity-80">Induct</span>
      </a>
      <nav class="hidden md:flex gap-6">
        <button class="nav-link text-sm font-bold text-[#09090b] dark:text-[#ffffff] border-b-2 border-[#09090b] dark:border-[#ffffff] pb-1 transition-all" data-target="homeView">Home</button>
        <button class="nav-link text-sm font-medium text-[#71717a] dark:text-[#a1a1aa] hover:text-[#09090b] dark:hover:text-[#ffffff] border-b-2 border-transparent pb-1 transition-all" data-target="catalogView">Shop Catalog</button>
        <button class="text-sm font-medium text-[#71717a] dark:text-[#a1a1aa] hover:text-[#09090b] dark:hover:text-[#ffffff] pb-1 transition-all" id="navCheckoutBtn">Checkout</button>
      </nav>
    </div>

    <div class="flex items-center space-x-2 sm:space-x-4">
      <div class="relative hidden sm:block w-72">
         <input type="text" id="searchInput" placeholder="Search premium items... (e.g. Headphones)" class="w-full bg-[#f4f4f5] dark:bg-[#18181b] border border-zinc-200 dark:border-[#3f3f46] rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:ring-1 focus:ring-[#09090b] dark:focus:ring-[#ffffff] outline-none text-[#09090b] dark:text-[#ffffff] placeholder-[#a1a1aa] dark:placeholder-[#71717a] transition-all">
         <svg class="absolute left-3 top-2.5 h-4 w-4 text-[#71717a] dark:text-[#a1a1aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" /></svg>
      </div>
      <button id="themeToggleBtn" class="text-[#71717a] dark:text-[#a1a1aa] hover:text-[#09090b] dark:hover:text-[#ffffff] transition p-2">
        <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
        <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
      </button>
      <button id="cartToggle" class="relative bg-[#f4f4f5] dark:bg-[#18181b] border border-zinc-200 dark:border-[#3f3f46] text-[#09090b] dark:text-[#ffffff] p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-[#27272a] transition flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path></svg>
        <span id="cartCount" class="absolute -top-1 -right-1 bg-[#09090b] dark:bg-[#ffffff] text-[#ffffff] dark:text-[#09090b] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
      </button>
      <div id="headerUserIndicator" class="hidden sm:flex items-center text-[10px] font-extrabold text-zinc-900 dark:text-zinc-100 bg-[#f4f4f5] dark:bg-[#18181b] border border-zinc-200 dark:border-[#3f3f46] px-3 py-2 rounded-lg tracking-wider uppercase leading-none">Guest</div>
      <button id="navProfileBtn" class="text-[#71717a] dark:text-[#a1a1aa] hover:text-[#09090b] dark:hover:text-[#ffffff] transition p-2 relative flex items-center gap-1.5 cursor-pointer" title="My Account Dashboard">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </button>
    </div>
  </div>
  <!-- Mobile Search inside header -->
  <div class="sm:hidden px-4 pb-4">
    <input type="text" id="mobileSearchInput" placeholder="Search premium items..." class="w-full bg-[#f4f4f5] dark:bg-[#18181b] border border-zinc-200 dark:border-[#3f3f46] rounded-xl py-2 px-4 text-xs focus:ring-1 focus:ring-[#09090b] dark:focus:ring-[#ffffff] outline-none text-[#09090b] dark:text-[#ffffff] placeholder-[#a1a1aa] dark:placeholder-[#71717a] transition-all">
  </div>
</header>
`;
