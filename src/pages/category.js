// ============================================
// KartHub — Category Page
// ============================================

import { products, getBrandsByCategory, getSubcategories } from '../data/products.js';
import { createProductCard } from '../components/productCard.js';

export function renderCategoryPage(params, queryParams) {
  const categoryName = decodeURIComponent(params.name);
  const app = document.getElementById('app');
  const subFilter = (queryParams?.sub || '').toLowerCase();

  let filtered = products.filter(p => (p.category || '').toLowerCase() === categoryName.toLowerCase());
  const brands = getBrandsByCategory(categoryName);
  const subcategories = getSubcategories(categoryName);

  if (subFilter) {
    filtered = filtered.filter(p => (p.subcategory || '').toLowerCase() === subFilter);
  }

  app.innerHTML = `
    <div class="container" style="padding-top:8px;">
      <div class="breadcrumb">
        <a href="#/">Home</a> <span class="separator">›</span>
        <span>${categoryName}</span>
        ${subFilter ? `<span class="separator">›</span><span>${subFilter}</span>` : ''}
      </div>
    </div>
    <div class="page-with-sidebar">
      <!-- Filter Overlay (mobile) -->
      <div class="filter-overlay" id="filter-overlay"></div>
      <!-- Sidebar Filters -->
      <aside class="sidebar" id="filter-sidebar">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="font-size:16px;font-weight:700;">Filters</h3>
          <button id="close-filters" style="background:none;border:none;cursor:pointer;font-size:22px;color:#565959;display:none;" class="close-filter-mobile">✕</button>
        </div>
        
        <!-- Subcategories -->
        <div class="sidebar-section">
          <h4>Category</h4>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <label class="checkbox-wrap">
              <input type="checkbox" class="sub-filter" value="" ${!subFilter ? 'checked' : ''} /> All ${categoryName}
            </label>
            ${subcategories.map(sub => `
              <label class="checkbox-wrap">
                <input type="radio" name="subcategory" class="sub-filter" value="${sub}" ${sub === subFilter ? 'checked' : ''} /> ${sub}
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Brands -->
        <div class="sidebar-section">
          <h4>Brand</h4>
          <div id="brand-filters" style="display:flex;flex-direction:column;gap:4px;">
            ${brands.map(b => `
              <label class="checkbox-wrap">
                <input type="checkbox" class="brand-filter" value="${b}" /> ${b}
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Price Range -->
        <div class="sidebar-section">
          <h4>Price</h4>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <label class="checkbox-wrap"><input type="radio" name="price-range" class="price-filter" value="" checked /> All Prices</label>
            <label class="checkbox-wrap"><input type="radio" name="price-range" class="price-filter" value="0-500" /> Under ₹500</label>
            <label class="checkbox-wrap"><input type="radio" name="price-range" class="price-filter" value="500-1000" /> ₹500 - ₹1,000</label>
            <label class="checkbox-wrap"><input type="radio" name="price-range" class="price-filter" value="1000-5000" /> ₹1,000 - ₹5,000</label>
            <label class="checkbox-wrap"><input type="radio" name="price-range" class="price-filter" value="5000-20000" /> ₹5,000 - ₹20,000</label>
            <label class="checkbox-wrap"><input type="radio" name="price-range" class="price-filter" value="20000-" /> Over ₹20,000</label>
          </div>
        </div>

        <!-- Rating -->
        <div class="sidebar-section">
          <h4>Customer Rating</h4>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <label class="checkbox-wrap"><input type="radio" name="rating-filter" class="rating-filter" value="" checked /> All</label>
            <label class="checkbox-wrap"><input type="radio" name="rating-filter" class="rating-filter" value="4" /> 4★ & above</label>
            <label class="checkbox-wrap"><input type="radio" name="rating-filter" class="rating-filter" value="3" /> 3★ & above</label>
          </div>
        </div>

        <!-- Discount -->
        <div class="sidebar-section">
          <h4>Discount</h4>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <label class="checkbox-wrap"><input type="radio" name="discount-filter" class="discount-filter" value="" checked /> All</label>
            <label class="checkbox-wrap"><input type="radio" name="discount-filter" class="discount-filter" value="10" /> 10% off or more</label>
            <label class="checkbox-wrap"><input type="radio" name="discount-filter" class="discount-filter" value="25" /> 25% off or more</label>
            <label class="checkbox-wrap"><input type="radio" name="discount-filter" class="discount-filter" value="50" /> 50% off or more</label>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 style="font-size:22px;font-weight:700;">${subFilter || categoryName}</h1>
            <p style="font-size:14px;color:#565959;margin-top:2px;"><span id="result-count">${filtered.length}</span> results</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button id="filter-toggle-btn" class="filter-toggle-mobile" style="display:none;align-items:center;gap:6px;padding:8px 16px;border:1px solid #D5D9D9;border-radius:8px;background:#fff;cursor:pointer;font-size:14px;font-weight:600;color:#0F1111;">☰ Filters</button>
            <label style="font-size:14px;font-weight:500;">Sort by:</label>
            <select class="form-select" id="sort-select" style="width:auto;min-width:180px;">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Avg. Customer Rating</option>
              <option value="discount">Discount</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
        <div id="category-products-grid" class="product-grid"></div>
        <div id="no-results" class="empty-state" style="display:none;">
          <h3>No products found</h3>
          <p>Try adjusting your filters to find what you're looking for.</p>
        </div>
      </div>
    </div>
  `;

  // Initial render
  let currentProducts = [...filtered];
  renderGrid(currentProducts);

  // Filter logic
  const applyFilters = () => {
    let result = products.filter(p => p.category === categoryName);

    // Subcategory
    const subVal = document.querySelector('.sub-filter:checked')?.value;
    if (subVal) result = result.filter(p => p.subcategory === subVal);

    // Brands
    const checkedBrands = [...document.querySelectorAll('.brand-filter:checked')].map(c => c.value);
    if (checkedBrands.length > 0) result = result.filter(p => checkedBrands.includes(p.brand));

    // Price range
    const priceVal = document.querySelector('.price-filter:checked')?.value;
    if (priceVal) {
      const [min, max] = priceVal.split('-').map(Number);
      result = result.filter(p => p.price >= (min || 0) && (!max || p.price <= max));
    }

    // Rating
    const ratingVal = document.querySelector('.rating-filter:checked')?.value;
    if (ratingVal) result = result.filter(p => p.rating >= Number(ratingVal));

    // Discount
    const discountVal = document.querySelector('.discount-filter:checked')?.value;
    if (discountVal) result = result.filter(p => (p.discount || 0) >= Number(discountVal));

    // Sort
    const sortVal = document.getElementById('sort-select')?.value;
    result = sortProducts(result, sortVal);

    currentProducts = result;
    renderGrid(result);
  };

  // Attach filter listeners
  document.querySelectorAll('.sub-filter, .brand-filter, .price-filter, .rating-filter, .discount-filter').forEach(el => {
    el.addEventListener('change', applyFilters);
  });
  document.getElementById('sort-select')?.addEventListener('change', applyFilters);

  // Mobile filter toggle
  const sidebar = document.getElementById('filter-sidebar');
  const overlay = document.getElementById('filter-overlay');
  const openFilters = () => { sidebar?.classList.add('mobile-open'); overlay?.classList.add('active'); };
  const closeFilters = () => { sidebar?.classList.remove('mobile-open'); overlay?.classList.remove('active'); };

  document.getElementById('filter-toggle-btn')?.addEventListener('click', openFilters);
  document.getElementById('close-filters')?.addEventListener('click', closeFilters);
  overlay?.addEventListener('click', closeFilters);
}

function sortProducts(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
    case 'discount': return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    case 'newest': return sorted.reverse();
    default: return sorted;
  }
}

function renderGrid(productList) {
  const grid = document.getElementById('category-products-grid');
  const noResults = document.getElementById('no-results');
  const countEl = document.getElementById('result-count');

  if (!grid) return;
  grid.innerHTML = '';

  if (productList.length === 0) {
    grid.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  } else {
    grid.style.display = '';
    if (noResults) noResults.style.display = 'none';
    productList.forEach(p => grid.appendChild(createProductCard(p)));
  }

  if (countEl) countEl.textContent = productList.length;
  if (window.lucide) lucide.createIcons();
}
