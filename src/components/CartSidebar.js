export const CartSidebar = `
<div id="cartSidebar" class="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-700 shadow-2xl transform translate-x-full transition-transform duration-300 z-50 flex flex-col">
  <div class="p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center bg-white dark:bg-zinc-950">
    <h2 class="font-bold text-sm tracking-tight flex items-center gap-3 text-zinc-950 dark:text-white">
      <svg class="w-5 h-5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      Shopping Cart
    </h2>
    <button id="closeCartBtn" class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:text-white bg-[#27272a] border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 rounded-full p-1 transition cursor-pointer">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  </div>
  
  <!-- Drag and Drop target area -->
  <div id="cartDropZone" class="bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center py-6 text-center border-b border-dashed border-zinc-200 dark:border-zinc-700 transition-colors gap-2 group cursor-pointer">
    <div class="p-2 rounded-full bg-[#27272a] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:text-white transition-colors pointer-events-none">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
    </div>
    <div class="pointer-events-none">
      <p class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:text-white transition-colors">DRAG ITEMS HERE</p>
      <p class="text-[9px] text-zinc-400 dark:text-zinc-500">to quickly add to your collection</p>
    </div>
  </div>
  
  <div id="cartItems" class="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#3f3f46] scrollbar-track-transparent">
    <!-- Cart items injected here -->
  </div>
  
  <div class="p-6 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950">
    <div class="flex justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
      <span>Subtotal</span>
      <span>₹<span id="cartSubtotal">0.00</span></span>
    </div>
    <div class="flex justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-700">
      <span>Shipping</span>
      <span class="text-emerald-500 uppercase font-bold">Free</span>
    </div>
    <div class="flex justify-between font-black text-xl mb-4 text-zinc-950 dark:text-white">
      <span>Total</span>
      <span>₹<span id="cartTotal">0.00</span></span>
    </div>
    <button id="checkoutBtn" class="w-full mt-2 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-black text-sm hover:scale-[1.02] transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:ring-white focus:ring-offset-2 focus:ring-offset-white dark:ring-offset-zinc-950">SECURE CHECKOUT</button>
  </div>

  <!-- Absolute localized cart item removal confirmation modal overlay -->
  <div id="cartRemoveConfirmModal" class="hidden absolute inset-0 bg-zinc-950/80 backdrop-blur-md z-50 flex-col items-center justify-center p-6 text-center animate-fade-in">
    <div class="bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl max-w-xs w-full transform scale-100 transition-all duration-300">
      <div class="w-12 h-12 bg-red-100 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      <h3 class="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">Remove from Cart?</h3>
      <p id="removeConfirmItemTitle" class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 px-1"></p>
      
      <div class="grid grid-cols-2 gap-3 mt-6">
        <button id="btnCancelRemove" class="w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer">
          Keep It
        </button>
        <button id="btnAcceptRemove" class="w-full py-2.5 bg-red-600 text-white hover:bg-red-700 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-red-500/20 transition cursor-pointer">
          Remove
        </button>
      </div>
    </div>
  </div>
</div>
`;
