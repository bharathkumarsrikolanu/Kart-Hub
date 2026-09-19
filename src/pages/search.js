// ============================================
// KartHub — Search Results Page
// ============================================

import { searchProducts, products, getBrandsByCategory } from '../data/products.js';
import { createProductCard } from '../components/productCard.js';

export function renderSearchPage(params, queryParams) {
  const query = queryParams?.q || '';
  const categoryFilter = queryParams?.category || '';
  const app = document.getElementById('app');

  let results = query === 'under999'
    ? products.filter(p => p.price <= 999)
    : searchProducts(query);

  if (categoryFilter) {
    results = results.filter(p => p.category === categoryFilter);
  }

  const brands = [...new Set(results.map(p => p.brand))].sort();
  const displayQuery = query === 'under999' ? 'Under ₹999' : query;

  app.innerHTML = `
    <div class="container" style="padding-top:8px;">
      <div class="breadcrumb">
        <a href="#/">Home</a> <span class="separator">›</span>
        <span>Search: "${displayQuery}"</span>
      </div>
    </div>
    <div class="page-with-sidebar">
      <aside class="sidebar">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:16px;">Filters</h3>

        <div class="sidebar-section">
          <h4>Brand</h4>
          <div id="search-brand-filters" style="display:flex;flex-direction:column;gap:4px;">
            ${brands.map(b => `
              <label class="checkbox-wrap">
                <input type="checkbox" class="search-brand-filter" value="${b}" /> ${b}
              </label>
            `).join('')}
          </div>
        </div>

        <div class="sidebar-section">
          <h4>Price</h4>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <label class="checkbox-wrap"><input type="radio" name="search-price" class="search-price-filter" value="" checked /> All</label>
            <label class="checkbox-wrap"><input type="radio" name="search-price" class="search-price-filter" value="0-500" /> Under ₹500</label>
            <label class="checkbox-wrap"><input type="radio" name="search-price" class="search-price-filter" value="500-2000" /> ₹500 - ₹2,000</label>
            <label class="checkbox-wrap"><input type="radio" name="search-price" class="search-price-filter" value="2000-10000" /> ₹2,000 - ₹10,000</label>
            <label class="checkbox-wrap"><input type="radio" name="search-price" class="search-price-filter" value="10000-" /> Over ₹10,000</label>
          </div>
        </div>

        <div class="sidebar-section">
          <h4>Rating</h4>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <label class="checkbox-wrap"><input type="radio" name="search-rating" class="search-rating-filter" value="" checked /> All</label>
            <label class="checkbox-wrap"><input type="radio" name="search-rating" class="search-rating-filter" value="4" /> 4★ & above</label>
            <label class="checkbox-wrap"><input type="radio" name="search-rating" class="search-rating-filter" value="3" /> 3★ & above</label>
          </div>
        </div>
      </aside>

      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 style="font-size:22px;">Results for "<span style="color:#C45500;">${displayQuery}</span>"</h1>
            <p style="font-size:14px;color:#565959;margin-top:2px;"><span id="search-result-count">${results.length}</span> results</p>
          </div>
          <select class="form-select" id="search-sort" style="width:auto;min-width:180px;">
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Avg. Rating</option>
            <option value="discount">Discount</option>
          </select>
        </div>

        <div id="search-results-grid" class="product-grid"></div>

        <div id="search-no-results" class="empty-state" style="display:${results.length === 0 ? 'block' : 'none'};">
          <div style="font-size:64px;margin-bottom:16px;">🔍</div>
          <h3>No results found for "${displayQuery}"</h3>
          <p>Try checking your spelling or using more general terms.</p>
          <a href="#/" class="btn btn-primary" style="margin-top:16px;">Back to Home</a>
        </div>
      </div>
    </div>
  `;

  renderSearchGrid(results);

  // Filters
  const applySearchFilters = () => {
    let filtered = query === 'under999'
      ? products.filter(p => p.price <= 999)
      : searchProducts(query);

    if (categoryFilter) filtered = filtered.filter(p => p.category === categoryFilter);

    const checkedBrands = [...document.querySelectorAll('.search-brand-filter:checked')].map(c => c.value);
    if (checkedBrands.length) filtered = filtered.filter(p => checkedBrands.includes(p.brand));

    const priceVal = document.querySelector('.search-price-filter:checked')?.value;
    if (priceVal) {
      const [min, max] = priceVal.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= (min || 0) && (!max || p.price <= max));
    }

    const ratingVal = document.querySelector('.search-rating-filter:checked')?.value;
    if (ratingVal) filtered = filtered.filter(p => p.rating >= Number(ratingVal));

    const sortVal = document.getElementById('search-sort')?.value;
    switch (sortVal) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'discount': filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
    }

    renderSearchGrid(filtered);
  };

  document.querySelectorAll('.search-brand-filter, .search-price-filter, .search-rating-filter').forEach(el => {
    el.addEventListener('change', applySearchFilters);
  });
  document.getElementById('search-sort')?.addEventListener('change', applySearchFilters);
}

function renderSearchGrid(list) {
  const grid = document.getElementById('search-results-grid');
  const noResults = document.getElementById('search-no-results');
  const countEl = document.getElementById('search-result-count');
  if (!grid) return;

  grid.innerHTML = '';
  if (list.length === 0) {
    grid.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  } else {
    grid.style.display = '';
    if (noResults) noResults.style.display = 'none';
    list.forEach(p => grid.appendChild(createProductCard(p)));
  }
  if (countEl) countEl.textContent = list.length;
  if (window.lucide) lucide.createIcons();
}
