// ============================================
// KartHub — Cart Page (Robust & Responsive)
// ============================================

import { getCart, getCartTotal, removeFromCart, updateCartQty, formatPrice } from '../store.js';
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';

export function renderCartPage() {
  const app = document.getElementById('app');
  if (!app) return;

  const rawCart = getCart() || [];
  // Clean & sanitize cart items
  const cart = rawCart.filter(item => item && (item.id || item.name)).map(item => ({
    id: item.id || ('ITEM_' + Math.random().toString(36).substr(2, 5)),
    name: item.name || 'Product',
    price: Number(item.price) || 0,
    originalPrice: Number(item.originalPrice) || Number(item.price) || 0,
    qty: Math.max(1, Number(item.qty) || 1),
    image: item.image || item.images?.[0] || 'https://via.placeholder.com/180x180?text=Product',
    brand: item.brand || 'KartHub'
  }));

  if (cart.length === 0) {
    app.innerHTML = `
      <div class="empty-state" style="padding:80px 20px;text-align:center;">
        <div style="font-size:80px;margin-bottom:20px;">🛒</div>
        <h3 style="font-size:24px;font-weight:700;margin-bottom:8px;">Your KartHub Cart is empty</h3>
        <p style="color:#565959;margin-bottom:20px;">Looks like you haven't added anything to your cart yet.</p>
        <a href="#/" class="btn btn-primary btn-lg" style="display:inline-block;padding:12px 32px;font-size:16px;font-weight:700;text-decoration:none;">Shop Today's Deals</a>
      </div>
    `;
    return;
  }

  const totals = getCartTotal();

  app.innerHTML = `
    <div class="cart-page" style="max-width:1200px;margin:24px auto;padding:0 16px;display:grid;grid-template-columns:1fr 340px;gap:24px;">
      <!-- Cart Items Section -->
      <div class="cart-items-section" style="background:#FFFFFF;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);border:1px solid #EDEDED;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;border-bottom:2px solid #EDEDED;">
          <h2 style="font-size:24px;font-weight:800;">Shopping Cart (${totals.itemCount} items)</h2>
          <span style="font-size:14px;font-weight:600;color:#565959;">Price</span>
        </div>

        <div id="cart-items-list">
          ${cart.map(item => renderCartItem(item)).join('')}
        </div>

        <div style="text-align:right;padding-top:20px;border-top:1px solid #EDEDED;font-size:18px;">
          Subtotal (${totals.itemCount} items): <strong style="font-size:22px;color:#0F1111;">${formatPrice(totals.subtotal)}</strong>
        </div>
      </div>

      <!-- Cart Summary Section -->
      <div class="cart-summary" style="background:#FFFFFF;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);border:1px solid #EDEDED;height:fit-content;position:sticky;top:90px;">
        ${totals.discount > 0 ? `
          <div style="background:#E7F7F2;padding:12px 16px;border-radius:8px;margin-bottom:16px;border:1px solid #A3E0CE;">
            <p style="color:#067D62;font-size:14px;font-weight:700;">🎉 You're saving ${formatPrice(totals.discount)} on this order!</p>
          </div>
        ` : ''}
        
        <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #EDEDED;">Order Summary</h3>
        
        <div class="cart-summary-row" style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:14px;color:#565959;">
          <span>Items (${totals.itemCount}):</span>
          <span style="color:#0F1111;font-weight:600;">${formatPrice(totals.originalTotal)}</span>
        </div>
        
        ${totals.discount > 0 ? `
          <div class="cart-summary-row" style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:14px;color:#067D62;">
            <span>Discount:</span>
            <span class="savings" style="font-weight:600;">−${formatPrice(totals.discount)}</span>
          </div>
        ` : ''}
        
        <div class="cart-summary-row" style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:14px;color:#565959;">
          <span>Delivery:</span>
          <span style="color:${totals.delivery === 0 ? '#067D62' : '#0F1111'};font-weight:600;">
            ${totals.delivery === 0 ? 'FREE' : formatPrice(totals.delivery)}
          </span>
        </div>
        
        <div class="cart-summary-row total" style="display:flex;justify-content:space-between;margin-top:16px;padding-top:16px;border-top:2px solid #EDEDED;font-size:18px;font-weight:800;">
          <span>Order Total:</span>
          <span style="color:#B12704;font-size:22px;">${formatPrice(totals.total)}</span>
        </div>

        <button class="btn btn-primary btn-block btn-lg" style="margin-top:20px;width:100%;padding:14px;font-size:16px;font-weight:800;border-radius:8px;" id="checkout-btn">
          Proceed to Checkout (${totals.itemCount} items) →
        </button>

        <div style="margin-top:16px;display:flex;align-items:center;gap:8px;justify-content:center;">
          <i data-lucide="shield-check" style="width:16px;height:16px;color:#067D62;"></i>
          <span style="font-size:12px;color:#565959;">100% Safe & Secure Checkout</span>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Event listeners
  setupCartEventListeners();

  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    navigate('/checkout');
  });
}

function renderCartItem(item) {
  const totalPrice = item.price * item.qty;
  return `
    <div class="cart-item" id="cart-item-${item.id}" style="display:flex;gap:20px;padding:20px 0;border-bottom:1px solid #EDEDED;align-items:center;">
      <div class="cart-item-image" onclick="window.location.hash='/product/${item.id}'" style="width:140px;height:140px;flex-shrink:0;background:#F7F7F7;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:8px;border:1px solid #EDEDED;">
        <img src="${item.image}" alt="${item.name}" style="max-width:100%;max-height:100%;object-fit:contain;" onerror="this.src='https://via.placeholder.com/140x140?text=Product'" />
      </div>
      <div class="cart-item-details" style="flex:1;">
        <h3 onclick="window.location.hash='/product/${item.id}'" style="font-size:16px;font-weight:600;cursor:pointer;color:#007185;margin-bottom:6px;" class="line-clamp-2">${item.name}</h3>
        ${item.brand ? `<p style="font-size:13px;color:#565959;margin-bottom:6px;">Brand: <strong>${item.brand}</strong></p>` : ''}
        <p style="font-size:13px;color:#067D62;font-weight:600;margin-bottom:6px;">In Stock</p>
        
        <div class="cart-item-actions" style="display:flex;align-items:center;gap:16px;margin-top:12px;">
          <div class="qty-selector" style="display:inline-flex;align-items:center;border:1px solid #D5D9D9;border-radius:6px;overflow:hidden;background:#F0F2F2;">
            <button class="cart-qty-btn" data-id="${item.id}" data-action="minus" style="padding:6px 12px;border:none;background:transparent;cursor:pointer;font-weight:700;font-size:16px;">−</button>
            <span class="qty-value" style="padding:0 12px;font-weight:700;font-size:14px;background:#FFF;display:flex;align-items:center;height:32px;">${item.qty}</span>
            <button class="cart-qty-btn" data-id="${item.id}" data-action="plus" style="padding:6px 12px;border:none;background:transparent;cursor:pointer;font-weight:700;font-size:16px;">+</button>
          </div>
          <button class="btn btn-text cart-remove-btn" data-id="${item.id}" style="color:#CC0C39;font-size:13px;font-weight:600;background:transparent;border:none;cursor:pointer;">🗑️ Delete</button>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <p style="font-size:20px;font-weight:800;color:#0F1111;">${formatPrice(totalPrice)}</p>
        ${item.originalPrice > item.price ? `
          <p style="font-size:12px;color:#565959;text-decoration:line-through;margin-top:2px;">${formatPrice(item.originalPrice * item.qty)}</p>
        ` : ''}
      </div>
    </div>
  `;
}

function setupCartEventListeners() {
  // Quantity buttons
  document.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const cart = getCart();
      const item = cart.find(i => i.id === id);
      if (!item) return;

      const newQty = action === 'plus' ? item.qty + 1 : item.qty - 1;
      if (newQty <= 0) {
        removeFromCart(id);
        showToast('Item removed from cart', 'info');
      } else {
        updateCartQty(id, newQty);
      }
      renderCartPage();
    });
  });

  // Remove buttons
  document.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromCart(btn.dataset.id);
      showToast('Item removed from cart', 'info');
      renderCartPage();
    });
  });
}
