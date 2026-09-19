// ============================================
// KartHub — Order Success Page
// ============================================

import { getOrders, formatPrice } from '../store.js';
import { navigate } from '../router.js';

export function renderOrderSuccessPage(params) {
  const app = document.getElementById('app');
  const orderId = params.id;
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    app.innerHTML = `
      <div class="empty-state">
        <h3>Order not found</h3>
        <p>We couldn't find this order.</p>
        <a href="#/" class="btn btn-primary">Go Home</a>
      </div>
    `;
    return;
  }

  const deliveryDate = new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  app.innerHTML = `
    <div class="order-success">
      <div class="success-icon">
        <i data-lucide="check" style="width:48px;height:48px;"></i>
      </div>
      
      <h1>Order Placed Successfully!</h1>
      <p class="order-id">Order #${order.id}</p>
      
      <div style="max-width:500px;margin:0 auto;text-align:left;">
        <div style="background:white;padding:24px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:24px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #EDEDED;">
            <span style="color:#565959;">Estimated Delivery</span>
            <strong style="color:#067D62;">${deliveryDate}</strong>
          </div>
          
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <span style="color:#565959;">Items (${order.items.reduce((s, i) => s + i.qty, 0)})</span>
            <span>${formatPrice(order.subtotal + order.discount)}</span>
          </div>
          ${order.discount > 0 ? `
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span style="color:#565959;">Discount</span>
              <span style="color:#067D62;">−${formatPrice(order.discount)}</span>
            </div>
          ` : ''}
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <span style="color:#565959;">Delivery</span>
            <span>${order.delivery === 0 ? 'FREE' : formatPrice(order.delivery)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding-top:12px;border-top:2px solid #EDEDED;font-size:18px;font-weight:700;">
            <span>Total Paid</span>
            <span style="color:#B12704;">${formatPrice(order.total)}</span>
          </div>
        </div>

        <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:24px;">
          <h4 style="margin-bottom:12px;">Delivery Address</h4>
          <p style="font-size:14px;color:#565959;line-height:1.6;">
            ${order.address ? `${order.address.name}<br>${order.address.address}<br>${order.address.city}, ${order.address.state} - ${order.address.pincode}<br>Phone: ${order.address.phone}` : 'Address not available'}
          </p>
        </div>

        <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:24px;">
          <h4 style="margin-bottom:12px;">Items Ordered</h4>
          ${order.items.map(item => `
            <div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid #EDEDED;align-items:center;">
              <img src="${item.image}" alt="" style="width:50px;height:50px;object-fit:contain;background:#F7F7F7;border-radius:4px;" onerror="this.src='https://via.placeholder.com/50x50?text=Item'" />
              <div style="flex:1;">
                <p style="font-size:13px;" class="line-clamp-2">${item.name}</p>
                <p style="font-size:12px;color:#565959;">Qty: ${item.qty}</p>
              </div>
              <span style="font-weight:600;">${formatPrice(item.price * item.qty)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display:flex;gap:12px;justify-content:center;margin-top:8px;">
        <a href="#/orders" class="btn btn-secondary btn-lg">View Orders</a>
        <a href="#/" class="btn btn-primary btn-lg">Continue Shopping</a>
      </div>

      <p style="margin-top:24px;font-size:13px;color:#565959;">
        A confirmation email has been sent to your registered email address.
      </p>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}
