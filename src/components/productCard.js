// ============================================
// KartHub — Product Card Component
// ============================================

import { formatPrice, addToCart, toggleWishlist, isInWishlist } from '../store.js';
import { showToast } from './toast.js';
import { renderStars } from './ratingStars.js';

export function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    ${product.discount ? `<span class="discount-badge">${product.discount}% off</span>` : ''}
    <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-wishlist-id="${product.id}" title="Add to Wishlist">
      <i data-lucide="heart"></i>
    </button>
    <div class="product-image-wrap" data-navigate="/product/${product.id}">
      <img src="${product.images?.[0] || product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:linear-gradient(135deg,#F0F0F0,#E0E0E0);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;text-align:center;\\'><span style=\\'font-size:48px;margin-bottom:8px;\\'>${product.category === 'Electronics' ? '📱' : product.category === 'Fashion' ? '👕' : product.category === 'Books' ? '📚' : product.category === 'Gaming' ? '🎮' : product.category === 'Beauty' ? '💄' : product.category === 'Sports' ? '🏋️' : product.category === 'Home & Kitchen' ? '🏠' : product.category === 'Grocery' ? '🥑' : product.category === 'Tools' ? '🔧' : '🧸'}</span><span style=\\'font-size:13px;color:#565959;font-weight:500;\\'>${product.brand}</span></div>'"/>
    </div>
    <div class="product-info">
      <div class="product-brand">${product.brand}</div>
      <div class="product-title" data-navigate="/product/${product.id}">${product.name}</div>
      <div class="product-rating">
        ${renderStars(product.rating)}
        <span class="rating-count">${formatReviewCount(product.reviewCount)}</span>
      </div>
      <div class="product-price-section">
        <span class="product-price"><span class="product-price-symbol">₹</span>${product.price.toLocaleString('en-IN')}</span>
        ${product.originalPrice ? `<span class="product-mrp">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
        ${product.discount ? `<span class="product-discount">(${product.discount}% off)</span>` : ''}
      </div>
      <div class="product-delivery">
        ${product.price > 499 ? '<strong>FREE delivery</strong> by KartHub' : 'Delivery ₹40'}
      </div>
      <button class="add-to-cart-btn" data-cart-id="${product.id}">Add to Cart</button>
    </div>
  `;

  // Navigate to product on click
  card.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.hash = el.dataset.navigate;
    });
  });

  // Add to cart
  const cartBtn = card.querySelector('[data-cart-id]');
  let cardAdded = false;
  cartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (cardAdded) {
      window.location.hash = '/cart';
      return;
    }
    addToCart(product);
    showToast(`Added "${product.name.substring(0, 35)}..." to cart`, 'success');
    cardAdded = true;
    cartBtn.textContent = '✓ View in Cart →';
    cartBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
    cartBtn.style.color = '#FFFFFF';
    cartBtn.style.fontWeight = '700';
  });

  // Wishlist toggle
  const wishlistBtn = card.querySelector('[data-wishlist-id]');
  wishlistBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    wishlistBtn.classList.toggle('active', added);
    showToast(added ? 'Added to Wishlist' : 'Removed from Wishlist', added ? 'success' : 'info');
  });

  return card;
}

export function renderProductGrid(products, container, gridClass = 'product-grid') {
  container.className = gridClass;
  container.innerHTML = '';
  products.forEach(p => container.appendChild(createProductCard(p)));
  if (window.lucide) lucide.createIcons();
}

function formatReviewCount(count) {
  if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return count.toString();
}
