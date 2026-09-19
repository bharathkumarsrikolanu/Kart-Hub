// ============================================
// KartHub — Home Page
// ============================================

import { renderHeroCarousel } from '../components/carousel.js';
import { createProductCard } from '../components/productCard.js';
import { categories } from '../data/categories.js';
import { products, getFeaturedProducts, getBestDeals, getProductsUnderPrice } from '../data/products.js';
import { lightningDeals } from '../data/deals.js';
import { getProductById } from '../data/products.js';
import { getRecentlyViewed, formatPrice } from '../store.js';
import { getTimeRemaining } from '../data/deals.js';

export function renderHomePage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="hero-carousel-container"></div>
    <div class="container">
      <!-- Category Strip -->
      <section class="section" id="category-section">
        <div class="section-header">
          <h2 class="section-title">Shop by Category</h2>
        </div>
        <div class="category-strip" id="category-strip"></div>
      </section>

      <!-- Deal of the Day -->
      <section class="section" id="deals-section">
        <div class="section-header">
          <h2 class="section-title">⚡ Lightning Deals</h2>
          <a href="#/deals" class="section-link">See all deals →</a>
        </div>
        <div class="deals-scroll" id="deals-scroll"></div>
      </section>

      <!-- Best Sellers -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Best Sellers</h2>
          <a href="#/category/Electronics" class="section-link">See more →</a>
        </div>
        <div id="best-sellers-grid" class="product-grid"></div>
      </section>

      <!-- Under ₹999 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Under ₹999</h2>
          <a href="#/search?q=under999" class="section-link">See more →</a>
        </div>
        <div id="under-999-grid" class="product-grid"></div>
      </section>

      <!-- Trending in Fashion -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">👕 Trending in Fashion</h2>
          <a href="#/category/Fashion" class="section-link">See more →</a>
        </div>
        <div id="fashion-grid" class="product-grid"></div>
      </section>

      <!-- Home & Kitchen -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🏠 Home & Kitchen</h2>
          <a href="#/category/Home & Kitchen" class="section-link">See more →</a>
        </div>
        <div id="home-kitchen-grid" class="product-grid"></div>
      </section>

      <!-- Books -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">📚 Books</h2>
          <a href="#/category/Books" class="section-link">See more →</a>
        </div>
        <div id="books-grid" class="product-grid"></div>
      </section>

      <!-- Gaming -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🎮 Gaming</h2>
          <a href="#/category/Gaming" class="section-link">See more →</a>
        </div>
        <div id="gaming-grid" class="product-grid"></div>
      </section>

      <!-- Beauty -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">💄 Beauty & Personal Care</h2>
          <a href="#/category/Beauty" class="section-link">See more →</a>
        </div>
        <div id="beauty-grid" class="product-grid"></div>
      </section>

      <!-- Sports -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🏋️ Sports & Fitness</h2>
          <a href="#/category/Sports" class="section-link">See more →</a>
        </div>
        <div id="sports-grid" class="product-grid"></div>
      </section>

      <!-- Toys -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🧸 Toys & Baby</h2>
          <a href="#/category/Toys & Baby" class="section-link">See more →</a>
        </div>
        <div id="toys-grid" class="product-grid"></div>
      </section>

      <!-- Grocery -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🥑 Grocery & Essentials</h2>
          <a href="#/category/Grocery" class="section-link">See more →</a>
        </div>
        <div id="grocery-grid" class="product-grid"></div>
      </section>

      <!-- Tools -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🔧 Tools & Hardware</h2>
          <a href="#/category/Tools" class="section-link">See more →</a>
        </div>
        <div id="tools-grid" class="product-grid"></div>
      </section>

      <!-- Recently Viewed -->
      <section class="section" id="recently-viewed-section" style="display:none;">
        <div class="section-header">
          <h2 class="section-title">Your Recently Viewed Items</h2>
        </div>
        <div id="recently-viewed-grid" class="product-grid"></div>
      </section>
    </div>
  `;

  // Render carousel
  renderHeroCarousel(document.getElementById('hero-carousel-container'));

  // Render category strip
  renderCategoryStrip();

  // Render deals
  renderDealsSection();

  // Render product sections — all categories
  renderProductSection('best-sellers-grid', getFeaturedProducts(5));
  renderProductSection('under-999-grid', getProductsUnderPrice(999, 5));
  renderProductSection('fashion-grid', products.filter(p => (p.category || '').toLowerCase() === 'fashion').slice(0, 5));
  renderProductSection('home-kitchen-grid', products.filter(p => (p.category || '').toLowerCase() === 'home & kitchen').slice(0, 5));
  renderProductSection('books-grid', products.filter(p => (p.category || '').toLowerCase() === 'books').slice(0, 5));
  renderProductSection('gaming-grid', products.filter(p => (p.category || '').toLowerCase() === 'gaming').slice(0, 5));
  renderProductSection('beauty-grid', products.filter(p => (p.category || '').toLowerCase() === 'beauty').slice(0, 5));
  renderProductSection('sports-grid', products.filter(p => (p.category || '').toLowerCase() === 'sports').slice(0, 5));
  renderProductSection('toys-grid', products.filter(p => (p.category || '').toLowerCase() === 'toys & baby' || (p.category || '').toLowerCase() === 'toys').slice(0, 5));
  renderProductSection('grocery-grid', products.filter(p => (p.category || '').toLowerCase() === 'grocery').slice(0, 5));
  renderProductSection('tools-grid', products.filter(p => (p.category || '').toLowerCase() === 'tools').slice(0, 5));

  // Render recently viewed
  renderRecentlyViewed();

  if (window.lucide) lucide.createIcons();
}

function renderCategoryStrip() {
  const strip = document.getElementById('category-strip');
  if (!strip) return;

  strip.innerHTML = categories.map(cat => `
    <a href="#/category/${cat.name}" class="category-card" style="text-decoration:none;">
      <div class="cat-icon">
        <img src="${cat.image}" alt="${cat.name}" loading="lazy" onerror="this.parentElement.innerHTML='<span style=\\'font-size:48px\\'>${cat.icon}</span>'" />
      </div>
      <div class="cat-name">${cat.name}</div>
    </a>
  `).join('');
}

// Track the deals timer interval globally so it can be cleaned up
let dealsTimerInterval = null;

export function clearDealsTimer() {
  if (dealsTimerInterval) {
    clearInterval(dealsTimerInterval);
    dealsTimerInterval = null;
  }
}

function renderDealsSection() {
  const container = document.getElementById('deals-scroll');
  if (!container) return;

  // Clear any previous timer
  clearDealsTimer();

  container.innerHTML = lightningDeals.map((deal, index) => {
    const product = getProductById(deal.productId);
    if (!product) return '';
    const time = getTimeRemaining(deal.endsAt);
    return `
      <div class="deal-card" onclick="window.location.hash='/product/${product.id}'">
        <div class="deal-card-image">
          <img src="${product.images?.[0] || product.image}" alt="${product.name}" loading="lazy" />
        </div>
        <div class="deal-card-info">
          <span class="deal-badge">${product.discount}% off</span>
          <div style="margin-top:4px;">
            <span class="deal-price">${formatPrice(product.price)}</span>
            <span class="deal-original">${formatPrice(product.originalPrice)}</span>
          </div>
          <p style="font-size:12px;color:#565959;margin-top:4px;" class="line-clamp-2">${product.name}</p>
          <div class="deal-timer" style="margin-top:8px;">
            <span>⏱</span>
            <span class="deal-timer-unit" data-deal-hours="${index}">${String(time.hours).padStart(2, '0')}</span>:
            <span class="deal-timer-unit" data-deal-minutes="${index}">${String(time.minutes).padStart(2, '0')}</span>:
            <span class="deal-timer-unit" data-deal-seconds="${index}">${String(time.seconds).padStart(2, '0')}</span>
          </div>
          <div style="margin-top:8px;">
            <div style="background:#EAEDED;border-radius:4px;height:6px;overflow:hidden;">
              <div style="background:linear-gradient(90deg,#CC0C39,#FF6B6B);height:100%;width:${deal.claimed}%;border-radius:4px;"></div>
            </div>
            <p style="font-size:11px;color:#CC0C39;margin-top:2px;">${deal.claimed}% claimed</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Start live countdown — update every second
  dealsTimerInterval = setInterval(() => {
    let allExpired = true;
    lightningDeals.forEach((deal, index) => {
      const time = getTimeRemaining(deal.endsAt);
      const hEl = document.querySelector(`[data-deal-hours="${index}"]`);
      const mEl = document.querySelector(`[data-deal-minutes="${index}"]`);
      const sEl = document.querySelector(`[data-deal-seconds="${index}"]`);
      if (hEl) hEl.textContent = String(time.hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(time.minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(time.seconds).padStart(2, '0');
      if (time.total > 0) allExpired = false;
    });
    // If all deals expired, stop the interval
    if (allExpired) clearDealsTimer();
  }, 1000);
}

function renderProductSection(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  productList.forEach(p => container.appendChild(createProductCard(p)));
  if (window.lucide) lucide.createIcons();
}

function renderRecentlyViewed() {
  const recent = getRecentlyViewed();
  const section = document.getElementById('recently-viewed-section');
  if (!section || recent.length === 0) return;

  section.style.display = 'block';
  const grid = document.getElementById('recently-viewed-grid');
  grid.innerHTML = '';
  recent.slice(0, 5).forEach(p => {
    // Recently viewed items are stored as minimal objects
    const fullProduct = products.find(fp => fp.id === p.id) || p;
    grid.appendChild(createProductCard(fullProduct));
  });
  if (window.lucide) lucide.createIcons();
}
