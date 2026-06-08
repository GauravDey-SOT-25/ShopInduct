export const CheckoutModal = `
<div id="checkoutModal" class="fixed inset-0 bg-white dark:bg-zinc-950 hidden z-[70] overflow-y-auto flex-col animate-fade-in">
  <!-- Top Navigation -->
  <div class="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div class="flex items-center gap-2 text-xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
        <svg class="w-6 h-6 text-zinc-950 dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L13.06 5.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l5-5ZM2.47 11.97a.75.75 0 0 1 1.06 0L12 20.44l8.47-8.47a.75.75 0 1 1 1.06 1.06l-9 9a.75.75 0 0 1-1.06 0l-9-9a.75.75 0 0 1 0-1.06Z" /></svg>
        <span>Shop<span class="opacity-80">Induct</span></span>
      </div>
      
      <!-- Stepper -->
      <div class="flex items-center space-x-2 sm:space-x-6">
        <div class="flex items-center flex-col gap-2">
          <div class="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </div>
          <span class="text-[10px] sm:text-[11px] font-bold text-zinc-950 dark:text-white uppercase tracking-wider">Shopping Cart</span>
        </div>
        <div class="w-6 sm:w-12 h-0.5 bg-zinc-900 dark:bg-white mb-6"></div>
        <div class="flex items-center flex-col gap-2" id="step1Indicator">
          <div class="w-8 h-8 rounded-[50%] border-[3px] border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm" id="step1Icon">2</div>
          <span class="text-[10px] sm:text-[11px] font-bold text-zinc-950 dark:text-white uppercase tracking-wider">Shipping Address</span>
        </div>
        <div class="w-6 sm:w-12 h-0.5 bg-zinc-200 dark:bg-zinc-800 mb-6" id="stepLine1"></div>
        <div class="flex items-center flex-col gap-2 opacity-50" id="step2Indicator">
          <div class="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center font-bold text-sm" id="step2Icon">3</div>
          <span class="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" id="step2Text">Payment Mode</span>
        </div>
        <div class="w-6 sm:w-12 h-0.5 bg-zinc-200 dark:bg-zinc-800 mb-6" id="stepLine2"></div>
        <div class="flex items-center flex-col gap-2 opacity-50" id="step3Indicator">
          <div class="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center font-bold text-sm" id="step3Icon">4</div>
          <span class="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider" id="step3Text">Review & Verify</span>
        </div>
      </div>
      
      <button id="closeCheckoutBtn" class="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        <span class="hidden sm:inline">Cancel</span>
      </button>
    </div>
  </div>

  <div class="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
    <!-- Main Content Area -->
    <div class="lg:col-span-8 flex flex-col min-h-[500px]">
      
      <!-- STEP 1: Shipping Address -->
      <div id="checkoutStep1" class="animate-fade-in">
        <div class="flex items-center gap-3 mb-6 bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
           <span class="text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-2 py-1 rounded">FRESH ADDRESS</span>
           <h2 class="text-xl font-black text-zinc-950 dark:text-white">Add Delivery Address</h2>
           <svg class="w-5 h-5 ml-auto text-zinc-950 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        
        <form id="shippingForm" class="space-y-8">
          <!-- Contact Details -->
          <div>
            <div class="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
               <h3 class="text-xs font-bold uppercase tracking-widest">CONTACT DETAILS</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Contact Full Name *</label>
                <input type="text" id="chkFullName" required minlength="3" class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="e.g. Sophia Martinez">
              </div>
              <div>
                <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">10-Digit Mobile Number *</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <input type="tel" id="chkPhone" required pattern="^[0-9]{10}$" class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 pl-10 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="10-digit number">
                </div>
              </div>
            </div>
          </div>

          <div class="h-px w-full bg-zinc-200 dark:bg-zinc-800"></div>

          <!-- Postal Address -->
          <div>
            <div class="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               <h3 class="text-xs font-bold uppercase tracking-widest">POSTAL ADDRESS & DELIVERY SPOT</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Zip/Postal Pin Code *</label>
                <input type="text" id="chkPincode" required pattern="^[0-9]{5,6}$" class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="e.g. 560001, 110001">
                <p class="text-[10px] text-zinc-500 mt-1">Try 560001 or 110001 for instant lookup.</p>
              </div>
              <div>
                <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">City / District / Town *</label>
                <input type="text" id="chkCity" required class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="City">
              </div>
              <div>
                <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">State *</label>
                <input type="text" id="chkState" required class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="State">
              </div>
            </div>

            <div class="mb-4">
               <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">House No., Apartment, Suite, Building *</label>
               <input type="text" id="chkHouse" required class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="e.g. Flat No. 402, Sunset Heights">
            </div>

            <div class="mb-4">
               <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Street Address, Colony, Sector, Area *</label>
               <input type="text" id="chkAddress" required class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="e.g. 1st Main Rd, Park Avenue">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Landmark (Optional)</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>
                  </div>
                  <input type="text" id="chkLandmark" class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 pl-10 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="e.g. Next to Blue Gate Mall">
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Alternate Phone (Optional)</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <input type="tel" id="chkAltPhone" class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 pl-10 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="Any other phone number">
                </div>
              </div>
            </div>
          </div>

          <div class="h-px w-full bg-zinc-200 dark:bg-zinc-800"></div>

          <!-- Address Tag -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">ADDRESS TAG & DEFAULT</h3>
            <div class="flex gap-4">
              <label class="flex-1 cursor-pointer">
                <input type="radio" name="addressTag" value="home" class="peer hidden" checked>
                <div class="flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm font-bold text-zinc-500 dark:text-zinc-400 peer-checked:border-zinc-950 dark:peer-checked:border-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-all bg-zinc-50 dark:bg-zinc-900/50">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                  Home Delivery
                </div>
              </label>
              <label class="flex-1 cursor-pointer">
                <input type="radio" name="addressTag" value="work" class="peer hidden">
                <div class="flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm font-bold text-zinc-500 dark:text-zinc-400 peer-checked:border-zinc-950 dark:peer-checked:border-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-all bg-zinc-50 dark:bg-zinc-900/50">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Work Office
                </div>
              </label>
            </div>
            
            <label class="flex items-center gap-3 mt-6 cursor-pointer">
              <input type="checkbox" id="chkDefaultAdd" checked class="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 accent-zinc-900 dark:accent-white">
              <span class="text-sm font-bold text-zinc-950 dark:text-white">Set as my default shipping address</span>
            </label>
          </div>

          <div class="pt-6 flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800">
            <button type="button" class="px-6 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors" onclick="document.getElementById('checkoutModal').classList.add('hidden'); document.body.style.overflow = '';">Cancel</button>
            <button type="submit" id="btnToStep2" class="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl text-sm font-extrabold hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-950">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Save Delivery Spot
            </button>
          </div>
        </form>
      </div>

      <!-- STEP 2: Payment Method -->
      <div id="checkoutStep2" class="hidden animate-fade-in">
        <h2 class="text-2xl font-black text-zinc-950 dark:text-white mb-2">Select Payment Method</h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">All operations are secured via end-to-end sandbox tokens.</p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <label class="cursor-pointer group relative text-center transition-all">
            <input type="radio" name="paymentMethod" value="card" class="peer absolute opacity-0 w-full h-full cursor-pointer z-10" checked>
            <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-transparent peer-checked:border-zinc-900 dark:peer-checked:border-white hover:border-zinc-900/50 dark:hover:border-white/50 rounded-2xl p-4 transition-all">
                <svg class="w-8 h-8 mx-auto mb-2 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                <div class="text-xs font-bold text-zinc-950 dark:text-white mb-1">Credit Card</div>
                <div class="text-[10px] text-zinc-500 dark:text-zinc-400">Visa, MC, Amex</div>
            </div>
          </label>
          <label class="cursor-pointer group relative text-center transition-all">
            <input type="radio" name="paymentMethod" value="upi" class="peer absolute opacity-0 w-full h-full cursor-pointer z-10">
            <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-transparent peer-checked:border-zinc-900 dark:peer-checked:border-white hover:border-zinc-900/50 dark:hover:border-white/50 rounded-2xl p-4 transition-all">
                <svg class="w-8 h-8 mx-auto mb-2 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                <div class="text-xs font-bold text-zinc-950 dark:text-white mb-1">UPI App</div>
                <div class="text-[10px] text-zinc-500 dark:text-zinc-400">GPay, PhonePe, Paytm</div>
            </div>
          </label>
          <label class="cursor-pointer group relative text-center transition-all">
            <input type="radio" name="paymentMethod" value="netbanking" class="peer absolute opacity-0 w-full h-full cursor-pointer z-10">
            <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-transparent peer-checked:border-zinc-900 dark:peer-checked:border-white hover:border-zinc-900/50 dark:hover:border-white/50 rounded-2xl p-4 transition-all">
                <svg class="w-8 h-8 mx-auto mb-2 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>
                <div class="text-xs font-bold text-zinc-950 dark:text-white mb-1">Net Banking</div>
                <div class="text-[10px] text-zinc-500 dark:text-zinc-400">All top banks</div>
            </div>
          </label>
          <label class="cursor-pointer group relative text-center transition-all">
            <input type="radio" name="paymentMethod" value="cod" class="peer absolute opacity-0 w-full h-full cursor-pointer z-10">
            <div class="bg-zinc-50 dark:bg-zinc-900 border-2 border-transparent peer-checked:border-zinc-900 dark:peer-checked:border-white hover:border-zinc-900/50 dark:hover:border-white/50 rounded-2xl p-4 transition-all">
                <svg class="w-8 h-8 mx-auto mb-2 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                <div class="text-xs font-bold text-zinc-950 dark:text-white mb-1">Cash / COD</div>
                <div class="text-[10px] text-zinc-500 dark:text-zinc-400">Pay on delivery</div>
            </div>
          </label>
        </div>

        <!-- Card Form Mockup -->
        <div id="cardFormArea" class="bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 relative z-0 mb-8 animate-fade-in">
          <div class="relative w-full max-w-sm mx-auto h-48 md:h-56 bg-gradient-to-tr from-zinc-800 to-zinc-950 dark:from-zinc-900 dark:to-black rounded-2xl shadow-xl overflow-hidden mb-8 border border-zinc-700 p-6 flex flex-col text-white transition-transform hover:scale-[1.02]">
            <div class="flex justify-between items-start">
              <div class="w-12 h-8 bg-zinc-300/20 backdrop-blur rounded flex items-center justify-center">
                 <div class="w-6 h-4 border border-zinc-400/50 rounded-sm"></div>
              </div>
              <svg class="w-8 h-8 opacity-80 text-zinc-500" viewBox="0 0 24 24" fill="currentColor"><path d="M2.992 5.013A3 3 0 015.98 2h12.04a3 3 0 012.988 3.013 3 3 0 01-3 3.013 3 3 0 013 3.013v.006A3 3 0 0118.02 14.05a3 3 0 013 3.014A3 3 0 0118.02 20.08a3 3 0 01-3 3.013 3 3 0 01-3-3.013v-.006H8.98v.006a3 3 0 01-3 3.013A3 3 0 012.992 20.08a3 3 0 013-3.014 3 3 0 01-3-3.014v-.006a3 3 0 013-3.013 3 3 0 01-3-3.013z"/></svg>
            </div>
            <div class="mt-auto">
              <div class="font-mono text-lg md:text-xl tracking-widest mb-4 opacity-90 truncate">•••• •••• •••• ••••</div>
              <div class="flex justify-between text-[10px] uppercase tracking-wider font-bold opacity-60">
                <span>Card Holder</span>
                <span>Expires</span>
              </div>
              <div class="flex justify-between text-sm md:text-base font-bold truncate mt-1">
                <span class="truncate" id="mockCardName">YOUR NAME</span>
                <span>MM/YY</span>
              </div>
            </div>
          </div>

          <form id="paymentForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Card Number *</label>
                <input type="text" id="chkCard" required pattern="^[0-9]{16}$" maxlength="16" class="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="4111 2222 3333 4444">
                <span class="text-red-500 text-[10px] hidden mt-1.5 font-bold" id="chkCardErr">Valid 16-digit card required.</span>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Cardholder Name *</label>
                <input type="text" id="chkCardName" required minlength="3" class="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="E.G. SOPHIA MARTINEZ">
                <span class="text-red-500 text-[10px] hidden mt-1.5 font-bold" id="chkCardNameErr">Name is required.</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Expiry Date *</label>
                <input type="text" id="chkExpiry" required pattern="^(0[1-9]|1[0-2])\/[0-9]{2}$" placeholder="MM/YY" class="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600">
                <span class="text-red-500 text-[10px] hidden mt-1.5 font-bold" id="chkExpiryErr">Valid MM/YY required.</span>
              </div>
              <div>
                <label class="flex justify-between text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
                  <span>CVV *</span>
                </label>
                <input type="password" id="chkCVV" required pattern="^[0-9]{3,4}$" maxlength="4" placeholder="..." class="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm font-black tracking-widest text-zinc-950 dark:text-white focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600">
                <span class="text-red-500 text-[10px] hidden mt-1.5 font-bold" id="chkCVVErr">Valid CVV required.</span>
              </div>
            </div>
          </form>
        </div>

        <!-- UPI Form Mockup -->
        <div id="upiFormArea" class="hidden bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 relative z-0 mb-8 animate-fade-in">
          <div class="flex items-center gap-4 mb-6 text-zinc-950 dark:text-white">
            <svg class="w-8 h-8 text-zinc-950 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            <div>
              <h3 class="text-sm font-bold">Pay via Unified Payments Interface</h3>
              <p class="text-[10px] text-zinc-500">Enter your VPA (Virtual Payment Address)</p>
            </div>
          </div>
          <form id="upiForm" class="space-y-6">
            <div>
              <label class="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">UPI ID / VPA *</label>
              <div class="relative">
                 <input type="text" id="chkUpiId" required pattern="^\\w+@[a-zA-Z]+$" class="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 pl-4 pr-24 text-sm font-semibold text-zinc-950 dark:text-white focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400 dark:placeholder-zinc-600" placeholder="e.g. username@okhdfcbank">
                 <button type="button" class="absolute right-2 top-2 bottom-2 bg-zinc-100 dark:bg-zinc-800 px-4 rounded-lg text-xs font-bold text-zinc-950 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition">Verify</button>
              </div>
              <span class="text-red-500 text-[10px] hidden mt-1.5 font-bold" id="chkUpiIdErr">Valid UPI ID required (e.g. user@bank).</span>
            </div>
          </form>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 items-center pt-4">
          <button type="button" id="btnBackToStep1" class="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 order-2 sm:order-1 transition-colors">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
             Back to Shipping
          </button>
          <button type="button" id="btnToStep3" class="w-full sm:w-auto sm:ml-auto px-10 py-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded-xl text-sm font-extrabold hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-950 order-1 sm:order-2">
            Proceed to Review
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>

      <!-- STEP 3: Review & Verify -->
      <div id="checkoutStep3" class="hidden animate-fade-in text-center">
        <h2 class="text-2xl font-black text-zinc-950 dark:text-white mb-2">Review & Verify</h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-8 font-medium">Please review your order details before final execution.</p>

        <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 mb-8 overflow-hidden">
          <div class="flex flex-col items-center border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4 relative">
             <div class="flex-1 text-center">
                <h3 class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Delivery Address</h3>
                <p id="reviewAddressLabel" class="text-sm font-semibold text-zinc-950 dark:text-white mt-2 max-w-[250px] mx-auto"></p>
                <p id="reviewCityLabel" class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-[250px] mx-auto"></p>
             </div>
             <button id="editStep1Btn" class="mt-4 text-xs font-bold text-zinc-950 bg-white border border-zinc-200 hover:bg-zinc-100 dark:text-white dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 px-4 py-1.5 rounded-lg transition-colors">Edit</button>
          </div>
          <div class="flex flex-col items-center">
             <div class="flex-1 text-center">
                <h3 class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Payment Method</h3>
                <p id="reviewPaymentLabel" class="text-sm font-semibold text-zinc-950 dark:text-white mt-2 max-w-[250px] mx-auto"></p>
             </div>
             <button id="editStep2Btn" class="mt-4 text-xs font-bold text-zinc-950 bg-white border border-zinc-200 hover:bg-zinc-100 dark:text-white dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 px-4 py-1.5 rounded-lg transition-colors">Edit</button>
          </div>
        </div>
        
        <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-800/30 dark:border-zinc-200/30 rounded-2xl p-6 mb-8 flex items-center gap-4">
           <div class="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-white flex items-center justify-center shrink-0">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
           </div>
           <div>
              <p class="text-sm font-bold text-zinc-950 dark:text-white">Full Returns Warranty</p>
              <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">This process is protected. 100% money back guarantee supported.</p>
           </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 items-center pt-4">
          <button type="button" id="btnBackToStep2" class="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 order-2 sm:order-1 transition-colors">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
             Back to Payment
          </button>
          <button type="button" id="btnPlaceOrder" class="w-full sm:w-auto sm:ml-auto px-12 py-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded-xl text-base font-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-950 order-1 sm:order-2 active:scale-95 group">
            <span>Execute Order</span>
            <svg class="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </button>
        </div>
      </div>
      
    </div>

    <!-- Right Summary Section -->
    <div class="lg:col-span-4 relative border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 pt-8 lg:pt-0 lg:pl-12">
      <div class="sticky top-28 bg-white dark:bg-zinc-950 pb-20">
        
        <h3 class="flex items-center justify-between text-sm font-black text-zinc-950 dark:text-white mb-6 tracking-wide">
          ORDER SUMMARY
          <span id="chkSummaryCount" class="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500 dark:text-zinc-400">0 items</span>
        </h3>

        <div id="chkSummaryItems" class="space-y-4 max-h-[25vh] overflow-y-auto pr-2 mb-8 overscroll-contain">
          <!-- Items injected dynamically -->
        </div>

        <!-- Delivery Speed -->
        <div class="mb-8">
           <div class="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-4">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>
              <h3 class="text-[10px] font-bold uppercase tracking-widest">DELIVERY SPEED</h3>
           </div>
           
           <div class="space-y-3">
              <label class="block cursor-pointer">
                 <input type="radio" name="deliverySpeed" value="standard" class="peer hidden" checked>
                 <div class="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 peer-checked:border-zinc-900 dark:peer-checked:border-white peer-checked:ring-1 peer-checked:ring-zinc-900 dark:peer-checked:ring-white transition-all bg-zinc-50 dark:bg-zinc-900/50">
                    <div class="flex items-center justify-between mb-1">
                       <div class="flex items-center gap-3">
                          <div class="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-zinc-900 dark:peer-checked:border-white peer-checked:bg-zinc-900 dark:peer-checked:bg-white flex items-center justify-center">
                             <div class="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-950 opacity-0 peer-checked:opacity-100"></div>
                          </div>
                          <span class="text-sm font-bold text-zinc-950 dark:text-white">Standard Delivery</span>
                       </div>
                       <span class="text-xs font-black text-zinc-950 dark:text-white uppercase">FREE</span>
                    </div>
                    <p class="text-[10px] text-zinc-500 dark:text-zinc-400 pl-7">3-5 Business Days • Reliable and ecological delivery right to your door step.</p>
                 </div>
              </label>
              
              <label class="block cursor-pointer">
                 <input type="radio" name="deliverySpeed" value="express" class="peer hidden">
                 <div class="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 peer-checked:border-zinc-900 dark:peer-checked:border-white peer-checked:ring-1 peer-checked:ring-zinc-900 dark:peer-checked:ring-white transition-all bg-zinc-50 dark:bg-zinc-900/50">
                    <div class="flex items-center justify-between mb-1">
                       <div class="flex items-center gap-3">
                          <div class="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-zinc-900 dark:peer-checked:border-white peer-checked:bg-zinc-900 dark:peer-checked:bg-white flex items-center justify-center">
                             <div class="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-950 opacity-0 peer-checked:opacity-100"></div>
                          </div>
                          <span class="text-sm font-bold text-zinc-950 dark:text-white">Express Shipping</span>
                       </div>
                       <span class="text-xs font-black text-zinc-950 dark:text-white">₹1200.00</span>
                    </div>
                    <p class="text-[10px] text-zinc-500 dark:text-zinc-400 pl-7">1-2 Business Days • Fast track delivery with guaranteed prioritization.</p>
                 </div>
              </label>

              <label class="block cursor-pointer">
                 <input type="radio" name="deliverySpeed" value="oneday" class="peer hidden">
                 <div class="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 peer-checked:border-zinc-900 dark:peer-checked:border-white peer-checked:ring-1 peer-checked:ring-zinc-900 dark:peer-checked:ring-white transition-all bg-zinc-50 dark:bg-zinc-900/50">
                    <div class="flex items-center justify-between mb-1">
                       <div class="flex items-center gap-3">
                          <div class="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-zinc-900 dark:peer-checked:border-white peer-checked:bg-zinc-900 dark:peer-checked:bg-white flex items-center justify-center">
                             <div class="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-950 opacity-0 peer-checked:opacity-100"></div>
                          </div>
                          <span class="text-sm font-bold text-zinc-950 dark:text-white">One-Day Delivery</span>
                       </div>
                       <span class="text-xs font-black text-zinc-950 dark:text-white">₹2800.00</span>
                    </div>
                    <p class="text-[10px] text-zinc-500 dark:text-zinc-400 pl-7">Tomorrow, Guaranteed • Premium ultra-fast shipping. Order within the next hour!</p>
                 </div>
              </label>
           </div>
        </div>

        <!-- Coupon -->
        <div class="mb-8">
           <div class="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-4">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
              <h3 class="text-[10px] font-bold uppercase tracking-widest">PROMOTIONAL COUPON</h3>
           </div>
           <div class="flex gap-2">
              <input type="text" placeholder="SAVEMORE, AIWORLD" id="chkCouponInput" class="flex-1 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-xs font-bold text-zinc-950 dark:text-white placeholder-zinc-400 uppercase focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white">
              <button id="chkCouponBtn" class="bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-6 rounded-xl text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">Apply</button>
           </div>
        </div>

        <div class="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div class="flex justify-between items-center text-sm font-bold text-zinc-500 dark:text-zinc-400">
            <span>Subtotal</span>
            <span id="chkSubtotal" class="text-zinc-950 dark:text-white">₹0.00</span>
          </div>
          <div class="flex justify-between items-center text-sm font-bold text-zinc-950 dark:text-white">
            <span>Direct Instant Savings</span>
            <span id="chkSavings">-₹0.00</span>
          </div>
          <div class="flex justify-between items-center text-sm font-bold text-zinc-500 dark:text-zinc-400">
            <span>Delivery Charge</span>
            <span id="chkDeliveryCharge" class="text-zinc-950 dark:text-white">FREE</span>
          </div>
          <div class="flex justify-between items-center text-sm font-bold text-zinc-500 dark:text-zinc-400">
            <span>Estimated Taxes (8.5%)</span>
            <span id="chkTaxes" class="text-zinc-950 dark:text-white">₹0.00</span>
          </div>
          
          <div class="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div class="flex justify-between items-end">
              <div>
                <p class="text-xs font-bold text-zinc-950 dark:text-white mb-1">Final Order Grand Total</p>
                <div id="chkTotal" class="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">₹0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SUCCESS VIEW OVERLAY -->
<div id="successTimelineView" class="fixed inset-0 bg-white dark:bg-zinc-950 hidden z-[80] overflow-y-auto flex-col items-center justify-start pt-20 pb-20 animate-fade-in">
   <div class="w-16 h-16 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center mb-6 shadow-xl">
      <svg class="w-8 h-8 animate-[bounce_1s_ease-in-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
   </div>
   <h2 class="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white mb-2 text-center">Order Placed Successfully!</h2>
   <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center mb-8 max-w-md px-4">Thank you for your purchase. Your fulfillment cycle is active. You will receive an email confirmation shortly.</p>
   
   <div class="flex gap-4 mb-12">
      <span class="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-lg text-xs font-bold text-zinc-500 dark:text-zinc-400 font-mono flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
        <span id="timelineOrderId">ORD-000000</span>
      </span>
      <span class="bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-white px-4 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <span id="timelineTrackId">TRK-000000</span>
      </span>
   </div>

   <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
      <!-- Live Delivery Timeline -->
      <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">
         <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Live Delivery Timeline</h3>
         
         <div class="relative pl-6 space-y-8 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
            <!-- Step 1 Done -->
            <div class="relative">
               <div class="absolute -left-[30px] w-5 h-5 rounded-full bg-zinc-900 dark:bg-white ring-4 ring-white dark:ring-zinc-900 flex items-center justify-center text-white dark:text-zinc-950">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
               </div>
               <p class="text-sm font-bold text-zinc-950 dark:text-white">Order Registered</p>
               <p class="text-[11px] font-medium text-zinc-500 mt-1">Secure merchant checkout finished</p>
            </div>
            <!-- Step 2 Done -->
            <div class="relative">
               <div class="absolute -left-[30px] w-5 h-5 rounded-full bg-zinc-900 dark:bg-white ring-4 ring-white dark:ring-zinc-900 flex items-center justify-center text-white dark:text-zinc-950">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
               </div>
               <p class="text-sm font-bold text-zinc-950 dark:text-white">Payment Authenticated</p>
               <p class="text-[11px] font-medium text-zinc-500 mt-1">Gateway verified payment successfully</p>
            </div>
            <!-- Step 3 Pend -->
            <div class="relative opacity-40">
               <div class="absolute -left-[30px] w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 ring-4 ring-white dark:ring-zinc-900 flex items-center justify-center text-zinc-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-current"></div>
               </div>
               <p class="text-sm font-bold text-zinc-950 dark:text-white">Warehouse Packaging</p>
               <p class="text-[11px] font-medium text-zinc-500 mt-1">Secure bubble wrapping at fulfillment site</p>
            </div>
            <!-- Step 4 Pend -->
            <div class="relative opacity-40">
               <div class="absolute -left-[30px] w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 ring-4 ring-white dark:ring-zinc-900 flex items-center justify-center text-zinc-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-current"></div>
               </div>
               <p class="text-sm font-bold text-zinc-950 dark:text-white">Courier In Transit</p>
               <p class="text-[11px] font-medium text-zinc-500 mt-1">Dispatched via premium express logistics</p>
            </div>
         </div>
         
         <div class="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs font-bold">
            <span class="text-zinc-500">Estimated Arrival</span>
            <span class="text-zinc-950 dark:text-white" id="successArrivalDate">Tomorrow, before 5:00 PM</span>
         </div>
      </div>

      <!-- Receipt Details -->
      <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col">
         <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Receipt Details</h3>
         
         <div class="bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-4 mb-6">
            <p class="text-[9px] font-black text-zinc-950 dark:text-white uppercase tracking-widest mb-2 border-b border-zinc-200 dark:border-zinc-700 pb-2">Delivery To</p>
            <p id="successAddressName" class="text-sm font-bold text-zinc-950 dark:text-white"></p>
            <p id="successAddressLine" class="text-xs text-zinc-500 mt-1"></p>
            <p id="successAddressPhone" class="text-xs text-zinc-500 mt-1 font-mono"></p>
         </div>

         <div class="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
            <p class="text-xs font-bold text-zinc-500">Amount Paid</p>
            <p id="successAmountPaid" class="text-xl font-black text-zinc-950 dark:text-white"></p>
         </div>
         <div class="flex justify-between items-center mb-auto">
            <p class="text-xs font-bold text-zinc-500">Payment Mode</p>
            <p id="successPaymentType" class="text-sm font-bold text-zinc-950 dark:text-white uppercase"></p>
         </div>

         <div class="mt-8 flex gap-4">
            <button class="flex-1 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-xs font-bold transition-colors">Print Invoice</button>
            <button id="successHomeBtn" class="flex-1 py-3 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-xl text-xs font-bold transition-colors shadow-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-950">Checkout Home</button>
         </div>
      </div>
   </div>
</div>
`;
