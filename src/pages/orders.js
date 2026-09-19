// ============================================
// KartHub — Orders Page (Database Connected)
// ============================================

import { getOrders, isLoggedIn, formatPrice, getCurrentUser } from '../store.js';
import { dbGetUserOrders } from '../services/db.js';
import { navigate } from '../router.js';

export async function renderOrdersPage() {
  const app = document.getElementById('app');

  if (!isLoggedIn()) {
    navigate('/login?redirect=orders');
    return;
  }

  const user = getCurrentUser();
  let orders = getOrders();

  // Fetch live orders from database if user is logged in
  if (user?.id) {
    try {
      const liveOrders = await dbGetUserOrders(user.id, user.email);
      if (liveOrders && liveOrders.length > 0) {
        orders = liveOrders;
      }
    } catch (err) {
      console.warn('Live order fetch notice:', err);
    }
  }

  if (orders.length === 0) {
    app.innerHTML = `
      <div class="empty-state" style="padding:80px 20px;">
        <div style="font-size:80px;margin-bottom:20px;">📦</div>
        <h3>No orders yet</h3>
        <p>You haven't placed any orders yet. Start shopping to see your order history here.</p>
        <a href="#/" class="btn btn-primary btn-lg" style="margin-top:16px;">Start Shopping</a>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="account-page">
      <h1 style="font-size:28px;margin-bottom:24px;">Your Orders</h1>
      <p style="color:#565959;margin-bottom:24px;">${orders.length} order${orders.length !== 1 ? 's' : ''} placed</p>

      ${orders.map(order => {
        const dateStr = new Date(order.date || order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        const deliveryStr = new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
        
        return `
          <div class="order-card">
            <div class="order-card-header">
              <div class="order-header-item">
                <span class="order-header-label">Order Placed</span>
                <span class="order-header-value">${dateStr}</span>
              </div>
              <div class="order-header-item">
                <span class="order-header-label">Total</span>
                <span class="order-header-value">${formatPrice(order.total)}</span>
              </div>
              <div class="order-header-item">
                <span class="order-header-label">Ship To</span>
                <span class="order-header-value">${order.address?.name || order.customerName || 'N/A'}</span>
              </div>
              <div class="order-header-item">
                <span class="order-header-label">Order #</span>
                <span class="order-header-value" style="color:#007185;">${order.id}</span>
              </div>
            </div>
            <div class="order-card-body">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <div>
                  <span class="order-status ${order.status?.toLowerCase() || 'processing'}">
                    ${order.status === 'Delivered' ? '✅ Delivered' : order.status === 'Shipped' ? '🚚 Shipped' : '🔄 Processing'}
                  </span>
                  <p style="font-size:13px;color:#565959;margin-top:4px;">
                    ${order.status === 'Delivered' ? 'Delivered on ' + deliveryStr : 'Expected by ' + deliveryStr}
                  </p>
                </div>
                <div style="display:flex;gap:8px;">
                  <button class="btn btn-secondary btn-sm" onclick="alert('Tracking ID: TRK${order.id.slice(-6)}')">Track Package</button>
                  <button class="btn btn-secondary btn-sm" onclick="window.print()">Invoice</button>
                </div>
              </div>

              ${(order.items || []).map(item => `
                <div class="order-item">
                  <div class="order-item-image" onclick="window.location.hash='/product/${item.id}'">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80?text=Item'" />
                  </div>
                  <div style="flex:1;">
                    <p style="font-size:14px;font-weight:500;cursor:pointer;color:#007185;" onclick="window.location.hash='/product/${item.id}'" class="line-clamp-2">${item.name}</p>
                    <p style="font-size:13px;color:#565959;">Qty: ${item.qty} × ${formatPrice(item.price)}</p>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:4px;">
                    <button class="btn btn-primary btn-sm" onclick="window.location.hash='/product/${item.id}'">Buy Again</button>
                  </div>
                </div>
              `).join('')}

              <div style="margin-top:12px;padding-top:12px;border-top:1px solid #EDEDED;font-size:13px;color:#565959;">
                <p>Payment: <strong>${getPaymentLabel(order.paymentMethod)}</strong></p>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

function getPaymentLabel(method) {
  const labels = {
    upi: 'UPI',
    card: 'Credit/Debit Card',
    netbanking: 'Net Banking',
    cod: 'Cash on Delivery',
    emi: 'EMI',
    wallet: 'KartHub Wallet',
  };
  return labels[method] || method;
}
