export const ProfileView = `
<div id="profileView" class="view-section hidden max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col lg:flex-row gap-8 animate-fade-in">
  <!-- Left Side: Profile Navigation Bar -->
  <div class="w-full lg:w-[320px] shrink-0 space-y-6">
    <!-- User Info Header Box -->
    <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
      <div class="relative group">
        <div id="profileAvatar" class="w-16 h-16 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-black text-2xl border-4 border-zinc-200 dark:border-zinc-800 overflow-hidden shadow">
          M
        </div>
        <div class="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
      </div>
      <div>
        <p class="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest leading-none mb-1">Elite Store Account</p>
        <h4 id="profileHelloName" class="text-lg font-extrabold text-zinc-950 dark:text-white leading-tight">Hello, User</h4>
        <span class="inline-block mt-1 bg-zinc-900/5 dark:bg-white/10 text-[9px] font-bold text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded uppercase tracking-wider">Premium Member</span>
      </div>
    </div>

    <!-- Navigation Menu list -->
    <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
      <nav class="flex flex-col">
        <!-- Personal Information Tab Link -->
        <button id="profTabInfoBtn" class="flex items-center gap-3 px-6 py-4 border-l-4 border-zinc-950 dark:border-white text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800/50 text-xs font-bold uppercase tracking-wider text-left transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Personal Information
        </button>

        <!-- Manage Address Tab Link -->
        <button id="profTabAddressesBtn" class="flex items-center gap-3 px-6 py-4 border-l-4 border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-white text-xs font-bold uppercase tracking-wider text-left transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Manage Addresses
        </button>

        <!-- My Orders Tab Link -->
        <button id="profTabOrdersBtn" class="flex items-center gap-3 px-6 py-4 border-l-4 border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-white text-xs font-bold uppercase tracking-wider text-left transition-all relative">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          Order History
          <span id="profileOrdersBadge" class="absolute right-6 top-1/2 -translate-y-1/2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">0</span>
        </button>

        <!-- Log Out Link -->
        <button id="profileLogoutBtn" class="flex items-center gap-3 px-6 py-4 border-l-4 border-transparent text-red-500 hover:bg-red-50/10 text-xs font-bold uppercase tracking-wider text-left transition-all mt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 focus:outline-none focus:ring-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Log Out Account
        </button>
      </nav>
    </div>
  </div>

  <!-- Right Side: Dashboard Main Pane -->
  <div class="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 lg:p-10 shadow-sm">
    
    <!-- SECTION 1: Personal Details Content Panel -->
    <div id="panelPersonalInfo" class="view-panel animate-fade-in">
      <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-8">
        <div>
          <h2 class="text-xl font-black text-zinc-950 dark:text-white">Personal Information</h2>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Manage your customer credentials, password and contact information.</p>
        </div>
        <svg class="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      </div>

      <form id="profileInfoForm" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">First Name *</label>
            <input type="text" id="profFirstName" required class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white focus:outline-none transition-all">
          </div>
          <div>
            <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Last Name *</label>
            <input type="text" id="profLastName" required class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white focus:outline-none transition-all">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2 font-mono">Email Address *</label>
            <input type="email" id="profEmail" required class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white focus:outline-none transition-all">
          </div>
          <div>
            <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2 font-mono">Mobile Number *</label>
            <input type="tel" id="profPhone" required pattern="^[0-9]{10}$" class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white focus:outline-none transition-all">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-3">Your Gender</label>
          <div class="flex gap-3">
            <label class="cursor-pointer">
              <input type="radio" name="profGender" value="Male" class="peer hidden">
              <div class="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 bg-zinc-50 dark:bg-zinc-900 peer-checked:border-zinc-950 dark:peer-checked:border-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-all">Male</div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="profGender" value="Female" class="peer hidden">
              <div class="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 bg-zinc-50 dark:bg-zinc-900 peer-checked:border-zinc-950 dark:peer-checked:border-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-all">Female</div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="profGender" value="Other" class="peer hidden">
              <div class="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 bg-zinc-50 dark:bg-zinc-900 peer-checked:border-zinc-950 dark:peer-checked:border-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-all">Other</div>
            </label>
          </div>
        </div>

        <div class="h-px bg-zinc-200 dark:bg-zinc-800 my-6"></div>

        <div>
          <h3 class="text-xs font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider mb-2">Change Password (Optional)</h3>
          <p class="text-[11px] text-zinc-400 dark:text-zinc-500 mb-4">Leave field blank if you do not want to alter your secret password.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">New Password</label>
              <input type="password" id="profNewPassword" minlength="6" placeholder="••••••••" class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white focus:outline-none transition-all">
            </div>
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Confirm Password</label>
              <input type="password" id="profConfirmPassword" minlength="6" placeholder="••••••••" class="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white focus:outline-none transition-all">
            </div>
          </div>
        </div>

        <div id="profileSaveMsg" class="hidden text-xs font-bold text-center py-2.5 px-4 rounded-xl"></div>

        <div class="pt-4 flex justify-end">
          <button type="submit" class="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 text-white dark:hover:bg-zinc-100 px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-950 cursor-pointer">
            Save Profile Details
          </button>
        </div>
      </form>
    </div>

    <!-- SECTION 2: Addresses Management Content Panel -->
    <div id="panelAddresses" class="view-panel hidden animate-fade-in">
      <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-8">
        <div>
          <h2 class="text-xl font-black text-zinc-950 dark:text-white">Manage Addresses</h2>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Manage delivery locations, home listings, and office parameters.</p>
        </div>
        <button id="btnAddNewAddress" class="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 text-white dark:hover:bg-zinc-100 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          Add Address
        </button>
      </div>

      <!-- INLINE ADD/EDIT ADDRESS FORM (Toggled) -->
      <div id="addressFormWrapper" class="hidden bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 mb-8 animate-fade-in">
        <h3 id="addressFormTitle" class="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider mb-6">Add New Delivery Location</h3>
        <form id="addressEditorForm" class="space-y-6">
          <input type="hidden" id="editAddressId">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Receiver Full Name *</label>
              <input type="text" id="addName" required class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white">
            </div>
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">10-Digit Mobile Phone *</label>
              <input type="tel" id="addPhone" required pattern="^[0-9]{10}$" class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Zip/Pin Code *</label>
              <input type="text" id="addPincode" required pattern="^[0-9]{5,6}$" class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white">
            </div>
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">City / Town *</label>
              <input type="text" id="addCity" required class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white">
            </div>
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">State *</label>
              <input type="text" id="addState" required class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">House No., Apartment, Suite, Office Tag *</label>
            <input type="text" id="addHouse" required class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white" placeholder="e.g. Flat No. A-212">
          </div>

          <div>
            <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Street Address, Colony, Locality Area *</label>
            <input type="text" id="addAddress" required class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white" placeholder="e.g. Richmond Circle">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Landmark (Optional)</label>
              <input type="text" id="addLandmark" class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white" placeholder="e.g. Near HDFC Bank">
            </div>
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Alternate Phone (Optional)</label>
              <input type="tel" id="addAltPhone" class="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white" placeholder="Alt mobile No.">
            </div>
          </div>

          <div class="flex flex-wrap gap-6 items-center">
            <div>
              <label class="block text-xs font-bold text-zinc-950 dark:text-white mb-2">Address Tag</label>
              <div class="flex gap-3">
                <label class="cursor-pointer">
                  <input type="radio" name="addTag" value="home" class="peer hidden" checked>
                  <div class="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 bg-white dark:bg-zinc-950 peer-checked:border-zinc-950 dark:peer-checked:border-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-all">Home</div>
                </label>
                <label class="cursor-pointer">
                  <input type="radio" name="addTag" value="work" class="peer hidden">
                  <div class="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 bg-white dark:bg-zinc-950 peer-checked:border-zinc-950 dark:peer-checked:border-white peer-checked:text-zinc-950 dark:peer-checked:text-white transition-all">Work</div>
                </label>
              </div>
            </div>

            <label class="flex items-center gap-2.5 mt-6 cursor-pointer select-none">
              <input type="checkbox" id="addDefaultCheckbox" checked class="w-5 h-5 rounded border-zinc-300 dark:border-zinc-850 accent-zinc-950 dark:accent-white bg-white dark:bg-zinc-950">
              <span class="text-xs font-bold text-zinc-950 dark:text-white">Make default shipping destination</span>
            </label>
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800/80">
            <button type="button" id="btnCancelAddressForm" class="px-5 py-3 text-xs font-bold text-zinc-500 hover:text-zinc-955 transition-colors cursor-pointer">Cancel</button>
            <button type="submit" class="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:opacity-90 cursor-pointer">Save Address Details</button>
          </div>
        </form>
      </div>

      <!-- ADDRESS BOOK LIST CONTAINER -->
      <div id="addressBookContainer" class="space-y-4">
        <!-- Injected Dynamically -->
      </div>
    </div>

    <!-- SECTION 3: Order History Content Panel -->
    <div id="panelOrders" class="view-panel hidden animate-fade-in animate-duration-350">
      <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-8">
        <div>
          <h2 class="text-xl font-black text-zinc-950 dark:text-white">Order History</h2>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Track open shipments, view previous checkout invoices, and secure tracking logs.</p>
        </div>
        <svg class="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
      </div>

      <!-- ORDERS LIST CONTAINER -->
      <div id="ordersHistoryContainer" class="space-y-6">
        <!-- Injected Dynamically -->
      </div>
    </div>

  </div>
</div>
`;
