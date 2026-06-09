export const AuthModal = `
<div id="authModal" class="fixed inset-0 bg-black/60 hidden z-[90] overflow-y-auto flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
  <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transition-all">
    <!-- Header with Toggle Tabs -->
    <div class="flex border-b border-zinc-100 dark:border-zinc-800">
      <button id="tabSignIn" class="flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-zinc-950 dark:border-white text-zinc-950 dark:text-white transition-all cursor-pointer">
        Sign In
      </button>
      <button id="tabSignUp" class="flex-1 py-4 text-xs font-black uppercase tracking-wider text-center border-b-2 border-transparent text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer">
        Create Account
      </button>
    </div>

    <!-- Content Area -->
    <div class="p-8">
      <!-- SIGN IN FORM -->
      <form id="signInForm" class="space-y-6">
        <div class="text-center mb-6">
          <h3 class="text-xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Welcome Back</h3>
          <p class="text-zinc-500 dark:text-zinc-400 text-xs mt-1 font-medium">Access your personalized elite shopping dashboard</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Email Address *</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z"/></svg>
              </span>
              <input type="email" id="loginEmail" required class="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 pl-10 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all" placeholder="e.g. customer@shopinduct.com">
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Password *</label>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </span>
              <input type="password" id="loginPassword" required class="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 pl-10 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all" placeholder="••••••••">
            </div>
          </div>
        </div>

        <div id="loginErrorMsg" class="text-red-500 text-xs font-bold text-center hidden mb-2"></div>

        <button type="submit" class="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 text-white dark:hover:bg-zinc-100 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-950 cursor-pointer">
          Sign In
        </button>
      </form>

      <!-- SIGN UP FORM -->
      <form id="signUpForm" class="space-y-4 hidden">
        <div class="text-center mb-4">
          <h3 class="text-xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Create Elite Profile</h3>
          <p class="text-zinc-500 dark:text-zinc-400 text-xs mt-1 font-medium">Join us for premium privileges and synchronized deliveries</p>
        </div>

        <div class="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">First Name *</label>
              <input type="text" id="regFirstName" required class="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400" placeholder="e.g. Manish">
            </div>
            <div>
              <label class="block text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Last Name *</label>
              <input type="text" id="regLastName" required class="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400" placeholder="e.g. Rai">
            </div>
          </div>

          <div>
            <label class="block text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1 font-mono">Email Address *</label>
            <input type="email" id="regEmail" required class="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400" placeholder="customer@email.com">
          </div>

          <div>
            <label class="block text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1 font-mono">Mobile Number (10 Digits) *</label>
            <input type="tel" id="regPhone" required pattern="^[0-9]{10}$" class="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-[#27272a] rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400" placeholder="e.g. 9876543210">
          </div>

          <div>
            <label class="block text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Gender *</label>
            <div class="flex gap-4 p-1">
              <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <input type="radio" name="regGender" value="Male" checked class="rating-radio">
                Male
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <input type="radio" name="regGender" value="Female" class="rating-radio">
                Female
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <input type="radio" name="regGender" value="Other" class="rating-radio">
                Other
              </label>
            </div>
          </div>

          <div>
            <label class="block text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1 font-mono">Secret Password *</label>
            <input type="password" id="regPassword" required minlength="6" class="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-[#27272a] rounded-xl p-3 text-xs font-bold text-zinc-950 dark:text-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:outline-none transition-all placeholder-zinc-400" placeholder="Minimum 6 characters">
          </div>
        </div>

        <div id="signUpErrorMsg" class="text-red-500 text-xs font-bold text-center hidden mb-2"></div>

        <button type="submit" class="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 text-white dark:hover:bg-zinc-100 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-zinc-950 cursor-pointer">
          Create Account
        </button>
      </form>

      <!-- Alternative Action / Guest Bypass -->
      <div class="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center flex flex-col gap-3">
        <button id="btnCancelAuth" class="text-xs font-bold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">
          Dismiss
        </button>
      </div>
    </div>
  </div>
</div>
`;
