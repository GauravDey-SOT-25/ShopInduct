export const SuccessModal = `
<div id="successModal" class="fixed inset-0 bg-zinc-900/40 dark:bg-black/80 hidden z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
  <div class="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl transform scale-100 transition-transform">
    <div class="w-20 h-20 bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-700 text-[#10b981] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
    </div>
    <h2 class="text-3xl font-black mb-3 text-zinc-950 dark:text-white tracking-tight">Order Confirmed!</h2>
    <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-10 leading-relaxed">Thank you for your premium purchase. We will email your receipt and tracking details shortly.</p>
    <button id="successCloseBtn" class="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-6 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform text-sm shadow-xl focus:outline-none">Continue Shopping</button>
  </div>
</div>
`;
