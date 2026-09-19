// ============================================
// KartHub — Header Component
// ============================================

import { getCartCount, getCurrentUser, on } from '../store.js';
import { navigate } from '../router.js';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';

let searchTimeout = null;

export function renderHeader() {
  const user = getCurrentUser();
  const cartCount = getCartCount();
  const userName = user ? user.name.split(' ')[0] : null;

  const header = document.getElementById('main-header');
  header.className = 'main-header';
  header.innerHTML = `
    <div class="header-inner">
      <!-- Logo -->
      <a href="#/" class="header-logo" id="header-logo">
        <div>
          <div class="logo-text">Kart<span>Hub</span></div>
          <div class="logo-suffix">.com</div>
        </div>
      </a>

      <!-- Deliver To -->
      <div class="header-deliver" id="header-deliver">
        <i data-lucide="map-pin" style="width:16px;height:16px;color:#CCC"></i>
        <div>
          <span class="deliver-label">Deliver to</span>
          <span class="deliver-location">India 🇮🇳</span>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="header-search" id="header-search">
        <select class="search-category" id="search-category">
          <option value="">All</option>
          ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
        </select>
        <input type="text" class="search-input" id="search-input" placeholder="Search KartHub.com" autocomplete="off" />
        <button class="search-btn" id="search-btn">
          <i data-lucide="search"></i>
        </button>
        <div class="search-suggestions" id="search-suggestions"></div>
      </div>

      <!-- Nav Items -->
      <div class="header-nav">
        <!-- Account -->
        <div class="header-nav-item" id="header-account" style="position:relative;">
          <span class="nav-line1">Hello, ${userName || 'Sign in'}</span>
          <span class="nav-line2">Account & Lists ▾</span>
          <div class="account-dropdown" id="account-dropdown">
            ${user ? `
              <div class="dropdown-header">
                <p style="font-size:14px;color:#0F1111;font-weight:600;">Hello, ${user.name}</p>
                <p style="font-size:12px;color:#565959;">${user.email}</p>
              </div>
              <div class="dropdown-links">
                <a href="#/account" class="dropdown-link"><i data-lucide="user"></i> Your Account</a>
                <a href="#/orders" class="dropdown-link"><i data-lucide="package"></i> Your Orders</a>
                <a href="#/wishlist" class="dropdown-link"><i data-lucide="heart"></i> Wishlist</a>
                <a class="dropdown-link" id="logout-btn" style="cursor:pointer;"><i data-lucide="log-out"></i> Sign Out</a>
              </div>
            ` : `
              <div class="dropdown-header">
                <a href="#/login" class="btn btn-primary btn-block" style="margin-bottom:8px;">Sign In</a>
                <p style="font-size:12px;color:#565959;">New customer? <a href="#/login?mode=signup">Start here</a></p>
              </div>
              <div class="dropdown-links">
                <a href="#/account" class="dropdown-link"><i data-lucide="user"></i> Your Account</a>
                <a href="#/orders" class="dropdown-link"><i data-lucide="package"></i> Your Orders</a>
                <a href="#/wishlist" class="dropdown-link"><i data-lucide="heart"></i> Wishlist</a>
              </div>
            `}
          </div>
        </div>

        <!-- Orders -->
        <a href="#/orders" class="header-nav-item">
          <span class="nav-line1">Returns</span>
          <span class="nav-line2">& Orders</span>
        </a>

        <!-- Cart -->
        <a href="#/cart" class="header-cart" id="header-cart">
          <div class="cart-icon-wrap">
            <i data-lucide="shopping-cart" style="width:28px;height:28px;"></i>
            <span class="cart-count" id="cart-count" ${cartCount === 0 ? 'style="display:none"' : ''}>${cartCount}</span>
          </div>
          <span class="cart-text">Cart</span>
        </a>
      </div>
    </div>
  `;

  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  // Setup event listeners
  setupSearchListeners();
  setupAccountDropdown();
  setupLogout();
}

function setupSearchListeners() {
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');
  const suggestions = document.getElementById('search-suggestions');
  const categorySelect = document.getElementById('search-category');

  if (!input) return;

  input.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => showSuggestions(input.value), 200);
  });

  input.addEventListener('focus', () => {
    if (input.value.length > 0) showSuggestions(input.value);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#header-search')) {
      suggestions.classList.remove('active');
    }
  });

  const doSearch = () => {
    const query = input.value.trim();
    if (query) {
      const cat = categorySelect.value;
      const catParam = cat ? `&category=${encodeURIComponent(cat)}` : '';
      navigate(`/search?q=${encodeURIComponent(query)}${catParam}`);
      suggestions.classList.remove('active');
      input.blur();
    }
  };

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });
}

function showSuggestions(query) {
  const suggestions = document.getElementById('search-suggestions');
  if (!query || query.length < 2) {
    suggestions.classList.remove('active');
    return;
  }
  const q = query.toLowerCase();
  const matches = products
    .filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    .slice(0, 8);

  if (matches.length === 0) {
    suggestions.classList.remove('active');
    return;
  }

  suggestions.innerHTML = matches.map(p => `
    <div class="search-suggestion-item" data-id="${p.id}">
      <i data-lucide="search"></i>
      <span>${highlightMatch(p.name, query)}</span>
    </div>
  `).join('');

  suggestions.classList.add('active');
  if (window.lucide) lucide.createIcons();

  suggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      navigate(`/product/${item.dataset.id}`);
      suggestions.classList.remove('active');
      document.getElementById('search-input').value = '';
    });
  });
}

function highlightMatch(text, query) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text.length > 60 ? text.substring(0, 60) + '...' : text;
  const before = text.substring(0, index);
  const match = text.substring(index, index + query.length);
  const after = text.substring(index + query.length);
  const result = `${before}<strong>${match}</strong>${after}`;
  return result.length > 80 ? result.substring(0, 80) + '...' : result;
}

function setupAccountDropdown() {
  const accountEl = document.getElementById('header-account');
  const dropdown = document.getElementById('account-dropdown');
  if (!accountEl || !dropdown) return;

  accountEl.addEventListener('mouseenter', () => dropdown.classList.add('active'));
  accountEl.addEventListener('mouseleave', () => dropdown.classList.remove('active'));
}

function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      import('../store.js').then(({ logout }) => {
        logout();
        navigate('/');
        renderHeader();
      });
    });
  }
}

// Listen for cart changes to update badge
export function initHeaderListeners() {
  on('cart:change', () => {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
      const count = getCartCount();
      countEl.textContent = count;
      countEl.style.display = count === 0 ? 'none' : 'flex';
      countEl.classList.add('bounce');
      setTimeout(() => countEl.classList.remove('bounce'), 400);
    }
  });

  on('auth:change', () => {
    renderHeader();
    renderSubHeader();
  });
}

// Sub-header needs to be importable
export function renderSubHeader() {
  const subHeader = document.getElementById('sub-header');
  subHeader.className = 'sub-header';
  subHeader.innerHTML = `
    <div class="sub-header-inner">
      <a class="sub-header-item mega-menu-trigger" id="mega-menu-btn">
        <i data-lucide="menu" style="width:18px;height:18px;"></i>
        All
      </a>
      <a href="#/" class="sub-header-item" style="font-weight:600;">🏠 Home</a>
      <a href="#/category/Electronics" class="sub-header-item">Electronics</a>
      <a href="#/category/Fashion" class="sub-header-item">Fashion</a>
      <a href="#/category/Home & Kitchen" class="sub-header-item">Home & Kitchen</a>
      <a href="#/category/Books" class="sub-header-item">Books</a>
      <a href="#/category/Gaming" class="sub-header-item">Gaming</a>
      <a href="#/category/Beauty" class="sub-header-item">Beauty</a>
      <a href="#/category/Sports" class="sub-header-item">Sports</a>
      <a href="#/deals" class="sub-header-item featured">Today's Deals</a>
      <a href="#/category/Grocery" class="sub-header-item">Grocery</a>
      <a href="#/category/Toys %26 Baby" class="sub-header-item">Toys & Baby</a>
      ${getCurrentUser()?.email === 'bharathkumaraiwork@gmail.com' ? '<a href="#/admin" class="sub-header-item" style="margin-left:auto;color:#FF9900;font-weight:700;">⚙ Admin</a>' : ''}
    </div>
    <div class="mega-menu-overlay" id="mega-menu-overlay"></div>
    <div class="mega-menu" id="mega-menu">
      <div class="mega-menu-header">
        <i data-lucide="user" style="width:24px;height:24px;"></i>
        Hello, ${getCurrentUser()?.name?.split(' ')[0] || 'Sign in'}
      </div>
      <div class="mega-menu-section">
        <div class="mega-menu-section-title">Shop By Category</div>
        ${categories.map(cat => `
          <a href="#/category/${cat.name}" class="mega-menu-link">
            <span>${cat.icon} ${cat.name}</span>
            <i data-lucide="chevron-right" style="width:16px;height:16px;"></i>
          </a>
        `).join('')}
      </div>
      <div class="mega-menu-section">
        <div class="mega-menu-section-title">Help & Settings</div>
        <a href="#/account" class="mega-menu-link"><span>Your Account</span></a>
        <a href="#/orders" class="mega-menu-link"><span>Your Orders</span></a>
        ${getCurrentUser() ? '<a class="mega-menu-link" id="mega-logout"><span>Sign Out</span></a>' : '<a href="#/login" class="mega-menu-link"><span>Sign In</span></a>'}
      </div>
      <div class="mega-menu-section">
        <div class="mega-menu-section-title">📞 Help & Support</div>
        <a href="mailto:bharathkumaraiwork@gmail.com" class="mega-menu-link"><span>📧 bharathkumaraiwork@gmail.com</span></a>
        <a href="tel:+916304505750" class="mega-menu-link"><span>📞 +91 6304505750</span></a>
        <a href="#/" class="mega-menu-link"><span>❓ FAQ</span></a>
        <a href="#/" class="mega-menu-link"><span>🔄 Returns & Refunds</span></a>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Mega menu toggle
  const megaBtn = document.getElementById('mega-menu-btn');
  const megaMenu = document.getElementById('mega-menu');
  const megaOverlay = document.getElementById('mega-menu-overlay');

  const closeMega = () => {
    megaMenu.classList.remove('active');
    megaOverlay.classList.remove('active');
  };

  megaBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    megaMenu.classList.toggle('active');
    megaOverlay.classList.toggle('active');
  });
  megaOverlay?.addEventListener('click', closeMega);

  // Close mega menu on link click
  megaMenu?.querySelectorAll('.mega-menu-link').forEach(link => {
    link.addEventListener('click', closeMega);
  });

  // Mega menu logout
  const megaLogout = document.getElementById('mega-logout');
  if (megaLogout) {
    megaLogout.addEventListener('click', () => {
      import('../store.js').then(({ logout }) => {
        logout();
        closeMega();
        navigate('/');
      });
    });
  }

  // Highlight active nav item
  highlightActiveNav();
  window.addEventListener('hashchange', highlightActiveNav);
}

function highlightActiveNav() {
  const hash = window.location.hash || '#/';
  const items = document.querySelectorAll('.sub-header-item');
  
  items.forEach(item => {
    if (item.classList.contains('mega-menu-trigger')) return;
    item.classList.remove('active');
    
    const href = item.getAttribute('href');
    if (!href) return;
    
    // Exact match for Home
    if (href === '#/' && hash === '#/') {
      item.classList.add('active');
    }
    // Match category pages
    else if (href !== '#/' && hash.startsWith(href)) {
      item.classList.add('active');
    }
    // Match deals page
    else if (href === '#/deals' && hash.startsWith('#/deals')) {
      item.classList.add('active');
    }
  });
}
