import { state, showToast } from './app.js';
import { renderCatalog } from './categorypage.js';

export function renderFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;

  container.innerHTML = `
    <!-- Global Footer -->
    <footer class="bg-background-secondary border-t border-border-80 py-16 pb-8 mt-auto transition-colors">
      <div class="max-w-[1280px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 mb-12 footer-grid">
        <div class="flex flex-col gap-4">
          <a href="#home" class="text-lg font-extrabold text-primary no-underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline"><path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L13.06 5.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l5-5ZM2.47 11.97a.75.75 0 0 1 1.06 0L12 20.44l8.47-8.47a.75.75 0 1 1 1.06 1.06l-9 9a.75.75 0 0 1-1.06 0l-9-9a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
            Shop<span class="text-text-primary">Induct</span>
          </a>
          <p class="text-sm text-text-secondary leading-relaxed">
            Building production-grade frontend solutions. Clean minimalist components inspired by premium hardware designs. Built with 100% custom styling variables.
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="text-sm font-bold text-text-primary uppercase tracking-wider">E-Store Shop</h4>
          <ul class="list-none flex flex-col gap-2 p-0">
            <li><a href="#home" id="footer-link-home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Home Page Overview</a></li>
            <li><a href="#shop" id="footer-link-shop" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Explore All Products</a></li>
            <li><button type="button" id="footer-link-electronics" class="text-left text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150 cursor-pointer bg-transparent border-0 p-0">Electronics Gear</button></li>
            <li><button type="button" id="footer-link-fashion" class="text-left text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150 cursor-pointer bg-transparent border-0 p-0">Bespoke Apparel</button></li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="text-sm font-bold text-text-primary uppercase tracking-wider">Support Center</h4>
          <ul class="list-none flex flex-col gap-2 p-0">
            <li><a href="#home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Stripe Pay Shield</a></li>
            <li><a href="#home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Delivery Schedules</a></li>
            <li><a href="#home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">30-day Exchanges Policy</a></li>
            <li><a href="#home" class="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all duration-150">Customer Help Center</a></li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h4 class="text-sm font-bold text-text-primary uppercase tracking-wider">Newsletter</h4>
          <p class="text-xs text-text-secondary leading-relaxed">Subscribe to receive catalog updates, private sale invitations, and brand release drops.</p>
          <div class="flex gap-2 mt-1">
            <input type="email" id="newsletter-email-input" class="input-field w-full px-4 py-2 bg-surface border border-border-80 rounded-xl text-xs text-text-primary outline-none focus:bg-surface-elevated focus:border-primary focus-ring-primary-15 transition-all" placeholder="email@example.com" aria-label="Newsletter email input field">
            <button type="button" id="newsletter-submit-btn" class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl text-text-inverse bg-primary hover:bg-primary-600 transition duration-150 cursor-pointer">Join</button>
          </div>

        </div>
      </div>

      <div class="max-w-[1280px] mx-auto px-4 border-t border-border-80 pt-8 flex flex-col md:flex-row gap-4 items-center justify-between text-center md:text-left">
        <p class="text-xs text-text-muted">&copy; 2026 ShopInduct Premium Inc. Built as a standard web production layout demo. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="#home" class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover rounded-lg cursor-pointer transition duration-150" title="Visit our Instagram" aria-label="Visit our Instagram page">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>
          </a>
          <a href="#home" class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover rounded-lg cursor-pointer transition duration-150" title="Visit our Twitter" aria-label="Visit our Twitter page">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
          </a>
          <a href="#home" class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover rounded-lg cursor-pointer transition duration-150" title="Visit our GitHub" aria-label="Visit our GitHub page">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
          </a>
        </div>
      </div>
    </footer>
  `;

  // Bind category redirection links inside footer
  const electLink = document.getElementById('footer-link-electronics');
  const fashLink = document.getElementById('footer-link-fashion');
  const homeLink = document.getElementById('footer-link-home');
  const shopLink = document.getElementById('footer-link-shop');

  const handleFooterCategoryRedirect = (category) => {
    state.filters.categories = [category];
    window.location.hash = '#shop';
    renderCatalog();
    showToast(`Showing ${category} products`, "info");
  };

  if (electLink) {
    electLink.addEventListener('click', () => handleFooterCategoryRedirect('Electronics'));
  }
  if (fashLink) {
    fashLink.addEventListener('click', () => handleFooterCategoryRedirect('Fashion'));
  }
  if (homeLink) {
    homeLink.addEventListener('click', () => {
      state.filters.categories = [];
      state.filters.searchQuery = '';
    });
  }
  if (shopLink) {
    shopLink.addEventListener('click', () => {
      state.filters.categories = [];
      state.filters.searchQuery = '';
      if (window.location.hash === '#shop') {
        renderCatalog();
      }
    });
  }
}
