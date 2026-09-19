// ============================================
// KartHub — Account Page
// ============================================

import { getCurrentUser, isLoggedIn, getOrders, getWishlist, getAddresses, logout } from '../store.js';
import { navigate } from '../router.js';

export function renderAccountPage() {
  const app = document.getElementById('app');

  if (!isLoggedIn()) {
    navigate('/login?redirect=account');
    return;
  }

  const user = getCurrentUser();
  const orders = getOrders();
  const wishlist = getWishlist();
  const addresses = getAddresses();

  app.innerHTML = `
    <div class="account-page">
      <h1 style="font-size:28px;margin-bottom:24px;">Your Account</h1>

      <!-- Profile Card -->
      <div style="background:white;padding:24px;border-radius:12px;box-shadow:0 2px 5px rgba(0,0,0,0.08);margin-bottom:24px;display:flex;align-items:center;gap:20px;">
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#FF9900,#FF6600);display:flex;align-items:center;justify-content:center;color:white;font-size:28px;font-weight:800;">
          ${user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 style="font-size:22px;margin-bottom:4px;">${user.name}</h2>
          <p style="font-size:14px;color:#565959;">${user.email}</p>
          ${user.phone ? `<p style="font-size:14px;color:#565959;">${user.phone}</p>` : ''}
        </div>
      </div>

      <div class="account-grid">
        <div class="account-card" onclick="window.location.hash='/orders'">
          <div class="account-card-icon">
            <i data-lucide="package"></i>
          </div>
          <div>
            <h4>Your Orders</h4>
            <p>${orders.length} order${orders.length !== 1 ? 's' : ''} placed</p>
          </div>
        </div>

        <div class="account-card" onclick="window.location.hash='/wishlist'">
          <div class="account-card-icon">
            <i data-lucide="heart"></i>
          </div>
          <div>
            <h4>Wishlist</h4>
            <p>${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>

        <div class="account-card" id="addresses-card">
          <div class="account-card-icon">
            <i data-lucide="map-pin"></i>
          </div>
          <div>
            <h4>Addresses</h4>
            <p>${addresses.length} address${addresses.length !== 1 ? 'es' : ''} saved</p>
          </div>
        </div>

        <div class="account-card" onclick="window.location.hash='/login'">
          <div class="account-card-icon">
            <i data-lucide="shield"></i>
          </div>
          <div>
            <h4>Login & Security</h4>
            <p>Manage password & security</p>
          </div>
        </div>

        <div class="account-card">
          <div class="account-card-icon">
            <i data-lucide="credit-card"></i>
          </div>
          <div>
            <h4>Payment Options</h4>
            <p>Manage payment methods</p>
          </div>
        </div>

        <div class="account-card" id="logout-card" style="border-color:#FEE2E2;">
          <div class="account-card-icon" style="background:#FEE2E2;">
            <i data-lucide="log-out" style="color:#CC0C39;"></i>
          </div>
          <div>
            <h4 style="color:#CC0C39;">Sign Out</h4>
            <p>Log out of your account</p>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      ${orders.length > 0 ? `
        <section style="margin-top:32px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h3 style="font-size:20px;">Recent Orders</h3>
            <a href="#/orders" style="font-size:14px;">View all →</a>
          </div>
          ${orders.slice(0, 3).map(order => `
            <div class="order-card" style="margin-bottom:12px;">
              <div class="order-card-header">
                <div class="order-header-item">
                  <span class="order-header-label">Order ID</span>
                  <span class="order-header-value">${order.id}</span>
                </div>
                <div class="order-header-item">
                  <span class="order-header-label">Date</span>
                  <span class="order-header-value">${new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div class="order-header-item">
                  <span class="order-header-label">Total</span>
                  <span class="order-header-value">₹${order.total.toLocaleString('en-IN')}</span>
                </div>
                <span class="order-status ${order.status.toLowerCase()}">${order.status === 'Processing' ? '🔄' : order.status === 'Shipped' ? '🚚' : '✅'} ${order.status}</span>
              </div>
            </div>
          `).join('')}
        </section>
      ` : ''}
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  document.getElementById('logout-card')?.addEventListener('click', async () => {
    await logout();
    navigate('/');
  });
}
