// ============================================
// KartHub — Main App Entry Point
// ============================================

import { registerRoute, initRouter, handleRoute } from './router.js';
import { renderHeader, renderSubHeader, initHeaderListeners } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage, clearDealsTimer } from './pages/home.js';
import { renderProductPage } from './pages/product.js';
import { renderCategoryPage } from './pages/category.js';
import { renderCartPage } from './pages/cart.js';
import { renderCheckoutPage } from './pages/checkout.js';
import { renderLoginPage } from './pages/login.js';
import { renderAccountPage } from './pages/account.js';
import { renderSearchPage } from './pages/search.js';
import { renderOrdersPage } from './pages/orders.js';
import { renderOrderSuccessPage } from './pages/orderSuccess.js';
import { renderAdminPage } from './pages/admin.js';
import { products } from './data/products.js';
import { getWishlist, formatPrice } from './store.js';
import { createProductCard } from './components/productCard.js';
import { getBestDeals, getProductById } from './data/products.js';
import { lightningDeals } from './data/deals.js';

// ---- Register Routes ----
registerRoute('/', () => renderHomePage());
registerRoute('/product/:id', (params) => renderProductPage(params));
registerRoute('/category/:name', (params, query) => renderCategoryPage(params, query));
registerRoute('/cart', () => renderCartPage());
registerRoute('/checkout', () => renderCheckoutPage());
registerRoute('/login', (params, query) => renderLoginPage(params, query));
registerRoute('/account', () => renderAccountPage());
registerRoute('/search', (params, query) => renderSearchPage(params, query));
registerRoute('/orders', () => renderOrdersPage());
registerRoute('/order-success/:id', (params) => renderOrderSuccessPage(params));
registerRoute('/wishlist', () => renderWishlistPage());
registerRoute('/deals', () => renderDealsPage());
registerRoute('/admin', () => renderAdminPage());

// ---- Wishlist Page ----
function renderWishlistPage() {
  const app = document.getElementById('app');
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    app.innerHTML = `
      <div class="empty-state" style="padding:80px 20px;">
        <div style="font-size:80px;margin-bottom:20px;">💝</div>
        <h3>Your Wishlist is empty</h3>
        <p>Save items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
        <a href="#/" class="btn btn-primary btn-lg" style="margin-top:16px;">Continue Shopping</a>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="container" style="padding:20px 16px;">
      <h1 style="font-size:28px;margin-bottom:24px;">Your Wishlist (${wishlist.length} items)</h1>
      <div id="wishlist-grid" class="product-grid"></div>
    </div>
  `;

  const grid = document.getElementById('wishlist-grid');
  wishlist.forEach(item => {
    const fullProduct = products.find(p => p.id === item.id) || item;
    grid.appendChild(createProductCard(fullProduct));
  });
  if (window.lucide) lucide.createIcons();
}

// ---- Deals Page ----
function renderDealsPage() {
  const app = document.getElementById('app');
  const deals = getBestDeals(20);

  app.innerHTML = `
    <div class="container" style="padding:20px 16px;">
      <h1 style="font-size:28px;margin-bottom:8px;">🔥 Today's Deals</h1>
      <p style="color:#565959;margin-bottom:24px;">Great savings on top products. Limited time offers!</p>
      <div id="deals-page-grid" class="product-grid"></div>
    </div>
  `;

  const grid = document.getElementById('deals-page-grid');
  deals.forEach(p => grid.appendChild(createProductCard(p)));
  if (window.lucide) lucide.createIcons();
}

// ---- Initialize App ----
let appInitialized = false;

function initApp() {
  // Guard against double initialization (module scripts + DOMContentLoaded)
  if (appInitialized) return;
  appInitialized = true;

  // Render persistent components
  renderHeader();
  renderSubHeader();
  renderFooter();

  // Initialize event listeners
  initHeaderListeners();

  // Clean up deals timer on route change to prevent interval leaks
  window.addEventListener('hashchange', () => {
    clearDealsTimer();
  });

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initialize router (this will render the first page)
  initRouter();

  // Listen for Live Global Database updates (cross-device/cross-user catalog sync)
  window.addEventListener('karthub:products-updated', () => {
    // Only re-render if the user is not actively typing inside an open modal or input
    const isModalOpen = document.querySelector('#add-product-modal[style*="display: flex"], #edit-product-modal[style*="display: flex"]');
    if (!isModalOpen) {
      handleRoute();
    }
  });

  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  console.log('🛒 KartHub.com initialized successfully!');
}

// ---- Start ----
document.addEventListener('DOMContentLoaded', initApp);

// If DOM already loaded (module scripts)
if (document.readyState !== 'loading') {
  initApp();
}
