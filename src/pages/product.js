// ============================================
// KartHub — Product Detail Page
// ============================================

import { getProductById, products } from '../data/products.js';
import { renderStars, renderRatingBadge } from '../components/ratingStars.js';
import { formatPrice, addToCart, getCart, addRecentlyViewed, toggleWishlist, isInWishlist } from '../store.js';
import { showToast } from '../components/toast.js';
import { createProductCard } from '../components/productCard.js';
import { navigate } from '../router.js';

export function renderProductPage(params) {
  const product = getProductById(params.id);
  const app = document.getElementById('app');

  if (!product) {
    app.innerHTML = `<div class="empty-state"><h3>Product not found</h3><p>The product you're looking for doesn't exist.</p><a href="#/" class="btn btn-primary">Go Home</a></div>`;
    return;
  }

  addRecentlyViewed(product);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
  const deliveryStr = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  app.innerHTML = `
    <div class="container" style="padding-top:8px;">
      <div class="breadcrumb">
        <a href="#/">Home</a> <span class="separator">›</span>
        <a href="#/category/${product.category}">${product.category}</a> <span class="separator">›</span>
        <a href="#/category/${product.category}?sub=${encodeURIComponent(product.subcategory)}">${product.subcategory}</a> <span class="separator">›</span>
        <span>${product.brand}</span>
      </div>
    </div>
    <div class="product-detail">
      <!-- Image Gallery -->
      <div class="product-gallery">
        <div class="product-main-image" id="main-image-container">
          <img src="${product.images[0]}" alt="${product.name}" id="main-product-image" onerror="this.src='https://via.placeholder.com/500x500?text=${encodeURIComponent(product.brand)}'" />
        </div>
        <div class="product-thumbnails">
          ${product.images.map((img, i) => `
            <div class="product-thumb ${i === 0 ? 'active' : ''}" data-img="${img}">
              <img src="${img}" alt="View ${i + 1}" onerror="this.parentElement.style.display='none'" />
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info-section">
        <h1>${product.name}</h1>
        <a href="#/search?q=${encodeURIComponent(product.brand)}" class="product-brand-link">Visit the ${product.brand} Store</a>
        
        <div class="product-meta-row">
          ${renderRatingBadge(product.rating)}
          ${renderStars(product.rating, 16)}
          <a href="#" style="font-size:14px;" class="rating-count">${product.reviewCount.toLocaleString()} ratings</a>
        </div>

        <div class="product-price-block">
          ${product.discount ? `<p class="price-discount" style="font-size:14px;">Deal of the Day</p>` : ''}
          <div style="display:flex;align-items:baseline;gap:8px;margin-top:4px;">
            ${product.discount ? `<span style="color:#CC0C39;font-size:20px;font-weight:600;">-${product.discount}%</span>` : ''}
            <span class="price-large">${formatPrice(product.price)}</span>
          </div>
          ${product.originalPrice ? `
            <p style="font-size:14px;color:#565959;margin-top:4px;">
              M.R.P.: <span class="price-original">${formatPrice(product.originalPrice)}</span>
            </p>
            <p class="price-savings" style="margin-top:2px;">You save: ${formatPrice(savings)} (${product.discount}%)</p>
          ` : ''}
          <p style="font-size:12px;color:#565959;margin-top:4px;">Inclusive of all taxes</p>
          ${product.price >= 3000 ? `<p style="font-size:13px;color:#007185;margin-top:4px;">EMI starts at ${formatPrice(Math.round(product.price / 12))}/month</p>` : ''}
        </div>

        <div class="product-features">
          <h4>About this item</h4>
          <ul>
            ${product.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        ${product.specifications ? `
          <div class="product-specs">
            <h4 style="margin-bottom:12px;">Technical Details</h4>
            <table>
              ${Object.entries(product.specifications).map(([key, val]) => `
                <tr><td>${key}</td><td>${val}</td></tr>
              `).join('')}
            </table>
          </div>
        ` : ''}

        <div style="padding:16px 0;">
          <p style="font-size:14px;color:#565959;line-height:1.6;">${product.description}</p>
        </div>
      </div>

      <!-- Buy Box -->
      <div class="buy-box">
        <div style="font-size:28px;font-weight:700;margin-bottom:4px;">${formatPrice(product.price)}</div>
        ${product.price > 499 
          ? `<p style="font-size:14px;color:#565959;margin-bottom:12px;"><strong style="color:#0F1111;">FREE delivery</strong> ${deliveryStr}</p>` 
          : `<p style="font-size:14px;color:#565959;margin-bottom:12px;">Delivery ₹40 — ${deliveryStr}</p>`}
        
        <div class="delivery-info">
          <p><i data-lucide="map-pin" style="width:14px;height:14px;color:#007185;flex-shrink:0;"></i> Deliver to India</p>
        </div>

        <p class="stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
          ${product.stock > 0 ? (product.stock < 10 ? `Only ${product.stock} left in stock` : 'In Stock') : 'Out of Stock'}
        </p>

        ${product.stock > 0 ? `
          <div style="margin:12px 0;">
            <label style="font-size:14px;font-weight:500;">Qty: </label>
            <div class="qty-selector" id="qty-selector">
              <button id="qty-minus">−</button>
              <span class="qty-value" id="qty-value">1</span>
              <button id="qty-plus">+</button>
            </div>
          </div>

          <div class="buy-actions">
            <button class="btn btn-primary btn-block btn-lg" id="add-to-cart-btn">
              <i data-lucide="shopping-cart" style="width:18px;height:18px;"></i>
              Add to Cart
            </button>
            <button class="btn btn-orange btn-block btn-lg" id="buy-now-btn">
              <i data-lucide="zap" style="width:18px;height:18px;"></i>
              Buy Now
            </button>
          </div>
        ` : `
          <div class="buy-actions">
            <button class="btn btn-secondary btn-block btn-lg" disabled>Currently Unavailable</button>
          </div>
        `}

        <button class="btn btn-text btn-block" id="wishlist-toggle-btn" style="margin-top:8px;">
          <i data-lucide="heart" style="width:16px;height:16px;${isInWishlist(product.id) ? 'fill:#CC0C39;color:#CC0C39;' : ''}"></i>
          ${isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>

        <div class="seller-info" style="margin-top:16px;padding-top:12px;border-top:1px solid #EDEDED;">
          <p>Sold by <a href="#">${product.seller}</a></p>
          <p style="margin-top:4px;">Fulfilled by <strong>KartHub</strong></p>
        </div>

        <div style="margin-top:16px;display:flex;gap:16px;justify-content:center;">
          <div style="text-align:center;">
            <div style="width:40px;height:40px;margin:0 auto 4px;border-radius:50%;background:#F0F0F0;display:flex;align-items:center;justify-content:center;">
              <i data-lucide="rotate-ccw" style="width:18px;height:18px;color:#007185;"></i>
            </div>
            <span style="font-size:11px;color:#007185;">7 Days<br>Replacement</span>
          </div>
          <div style="text-align:center;">
            <div style="width:40px;height:40px;margin:0 auto 4px;border-radius:50%;background:#F0F0F0;display:flex;align-items:center;justify-content:center;">
              <i data-lucide="truck" style="width:18px;height:18px;color:#007185;"></i>
            </div>
            <span style="font-size:11px;color:#007185;">Free<br>Delivery</span>
          </div>
          <div style="text-align:center;">
            <div style="width:40px;height:40px;margin:0 auto 4px;border-radius:50%;background:#F0F0F0;display:flex;align-items:center;justify-content:center;">
              <i data-lucide="shield-check" style="width:18px;height:18px;color:#007185;"></i>
            </div>
            <span style="font-size:11px;color:#007185;">Secure<br>Payment</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Products -->
    <div class="container" style="padding-bottom:40px;">
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Similar Products</h2>
        </div>
        <div id="similar-products-grid" class="product-grid"></div>
      </section>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Thumbnail switching
  document.querySelectorAll('.product-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      document.getElementById('main-product-image').src = thumb.dataset.img;
    });
  });

  // Quantity selector
  let qty = 1;
  const qtyValue = document.getElementById('qty-value');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (qty > 1) { qty--; qtyValue.textContent = qty; }
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    if (qty < 10) { qty++; qtyValue.textContent = qty; }
  });

  // Add to cart
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  let isAdded = false;

  addToCartBtn?.addEventListener('click', () => {
    if (isAdded) {
      navigate('/cart');
      return;
    }
    addToCart(product, qty);
    showToast(`Added ${qty}x "${product.name.substring(0, 30)}..." to cart`, 'success');
    
    isAdded = true;
    addToCartBtn.innerHTML = `✓ Added to Cart — <strong>Go to Cart →</strong>`;
    addToCartBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
    addToCartBtn.style.color = '#FFFFFF';
    addToCartBtn.style.boxShadow = '0 4px 14px rgba(5, 150, 105, 0.4)';
  });

  // Buy now
  document.getElementById('buy-now-btn')?.addEventListener('click', () => {
    addToCart(product, qty);
    navigate('/checkout');
  });

  // Wishlist
  document.getElementById('wishlist-toggle-btn')?.addEventListener('click', () => {
    const added = toggleWishlist(product);
    showToast(added ? 'Added to Wishlist' : 'Removed from Wishlist', added ? 'success' : 'info');
    const btn = document.getElementById('wishlist-toggle-btn');
    const icon = btn.querySelector('i');
    if (added) {
      icon.style.fill = '#CC0C39';
      icon.style.color = '#CC0C39';
      btn.innerHTML = '<i data-lucide="heart" style="width:16px;height:16px;fill:#CC0C39;color:#CC0C39;"></i> Remove from Wishlist';
    } else {
      btn.innerHTML = '<i data-lucide="heart" style="width:16px;height:16px;"></i> Add to Wishlist';
    }
    if (window.lucide) lucide.createIcons();
  });

  // Similar products
  const similar = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  const similarGrid = document.getElementById('similar-products-grid');
  similar.forEach(p => similarGrid.appendChild(createProductCard(p)));
  if (window.lucide) lucide.createIcons();
}
