// ============================================
// KartHub — Admin Dashboard Page (Complete Database & Product Management)
// ============================================

import { formatPrice, getCurrentUser } from '../store.js';
import { dbGetAllOrders, dbGetAllUsers, dbUpdateOrderStatus, dbGetProducts } from '../services/db.js';
import { products, addNewProduct, updateProductById, deleteProductById, getProductById } from '../data/products.js';
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';

const ADMIN_EMAIL = 'bharathkumaraiwork@gmail.com';

const PRESET_IMAGES = [
  { name: '📱 Smartphone', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
  { name: '💻 Laptop', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
  { name: '🎧 Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { name: '👟 Shoes', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
  { name: '👕 Fashion', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=400&fit=crop' },
  { name: '⌚ Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { name: '🧴 Beauty/Care', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
  { name: '🍳 Kitchen', url: 'https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=400&h=400&fit=crop' }
];

/**
 * Compress images uploaded from PC to maximum 500x500 JPEG (~30KB)
 * Ensures instant transmission across global cloud database and prevents payload size errors
 */
function compressImageFile(file, maxWidth = 500, maxHeight = 500, quality = 0.85) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function renderAdminPage() {
  const app = document.getElementById('app');

  // Only allow admin access
  const user = getCurrentUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    app.innerHTML = `
      <div class="empty-state" style="padding:80px 20px;">
        <div style="font-size:80px;margin-bottom:20px;">🔒</div>
        <h3>Access Denied</h3>
        <p>You don't have permission to view this page.</p>
        <p style="font-size:13px;color:#888;margin-top:8px;">Admin login required (${ADMIN_EMAIL})</p>
        <a href="#/login" class="btn btn-primary btn-lg" style="margin-top:16px;">Log in as Admin</a>
      </div>
    `;
    return;
  }

  // Show loading while fetching from Database
  app.innerHTML = `
    <div style="padding:60px;text-align:center;">
      <div style="font-size:40px;animation:spin 1s linear infinite;display:inline-block;">⚡</div>
      <p style="margin-top:16px;font-weight:600;color:#555;">Loading live database records...</p>
    </div>
  `;

  // Fetch from live database (users, orders, and products)
  const [users, orders, liveProducts] = await Promise.all([
    dbGetAllUsers(),
    dbGetAllOrders(),
    dbGetProducts()
  ]);

  // Automatically sync with local CSV/JSON database files on disk
  try {
    fetch('http://localhost:3001/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users, orders })
    }).catch(() => {});
  } catch {}

  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalProducts = products.length;

  app.innerHTML = `
    <div class="container" style="padding:24px 16px;max-width:1250px;">
      <!-- Top Navigation Bar -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:16px;">
        <div>
          <h1 style="font-size:28px;font-weight:800;display:flex;align-items:center;gap:10px;">
            📊 Admin Control Panel
            <span id="db-status-badge" style="font-size:12px;font-weight:600;padding:4px 10px;border-radius:20px;background:#E8F5E9;color:#2E7D32;">
              🍃 MongoDB Active
            </span>
          </h1>
          <p style="color:#565959;margin-top:4px;">KartHub.com — Product Inventory, Customer Orders & User Accounts</p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-primary" id="open-add-product-modal" style="background:linear-gradient(135deg,#008a00,#059669);border:none;color:white;font-weight:700;box-shadow:0 4px 12px rgba(5,150,105,0.3);">
            ➕ Add New Product
          </button>
          <button class="btn" id="open-mongodb-status-btn" style="background:linear-gradient(135deg,#00684A,#13AA52);color:white;border:none;font-weight:700;box-shadow:0 4px 12px rgba(19,170,82,0.3);display:inline-flex;align-items:center;gap:6px;">
            🍃 MongoDB Status
          </button>
          <a href="/database/index.html" target="_blank" class="btn" style="background:#0F172A;color:#38BDF8;border:1px solid #334155;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">🗄️ Database Explorer</a>
          <button class="btn btn-secondary" id="admin-refresh-btn">🔄 Refresh Data</button>
          <button class="btn btn-secondary" onclick="window.location.hash='/'">← Storefront</button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;margin-bottom:32px;">
        <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);color:white;padding:22px;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
          <p style="font-size:13px;opacity:0.8;margin-bottom:6px;">📦 Active Catalog</p>
          <p style="font-size:34px;font-weight:800;" id="stat-products-count">${totalProducts}</p>
          <p style="font-size:12px;opacity:0.7;margin-top:4px;">Products live on website</p>
        </div>
        <div style="background:linear-gradient(135deg,#064e3b,#059669);color:white;padding:22px;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
          <p style="font-size:13px;opacity:0.8;margin-bottom:6px;">📑 Total Orders</p>
          <p style="font-size:34px;font-weight:800;">${totalOrders}</p>
          <p style="font-size:12px;opacity:0.7;margin-top:4px;">Customer purchases recorded</p>
        </div>
        <div style="background:linear-gradient(135deg,#7f1d1d,#dc2626);color:white;padding:22px;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
          <p style="font-size:13px;opacity:0.8;margin-bottom:6px;">💰 Gross Sales</p>
          <p style="font-size:34px;font-weight:800;">${totalRevenue > 0 ? formatPrice(totalRevenue) : '₹0'}</p>
          <p style="font-size:12px;opacity:0.7;margin-top:4px;">Total revenue generated</p>
        </div>
        <div style="background:linear-gradient(135deg,#4a1d96,#7c3aed);color:white;padding:22px;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
          <p style="font-size:13px;opacity:0.8;margin-bottom:6px;">👥 Total Users</p>
          <p style="font-size:34px;font-weight:800;">${totalUsers}</p>
          <p style="font-size:12px;opacity:0.7;margin-top:4px;">Registered accounts in DB</p>
        </div>
      </div>

      <!-- SECTION 1: PRODUCT CATALOG MANAGEMENT (ADD, EDIT & DELETE) -->
      <div style="background:white;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.06);overflow:hidden;margin-bottom:36px;border:1px solid #E2E8F0;">
        <div style="padding:20px 24px;border-bottom:1px solid #EDEDED;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;background:#FAFBFD;">
          <div>
            <h2 style="font-size:20px;font-weight:700;display:flex;align-items:center;gap:8px;">
              🛍️ Manage Website Products (<span id="products-table-count">${totalProducts}</span>)
            </h2>
            <p style="font-size:13px;color:#64748B;margin-top:2px;">Edit product names, change pictures, adjust prices, or delete items instantly</p>
          </div>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="text" id="admin-product-search" placeholder="🔍 Search products by name, brand, category..." style="padding:8px 14px;border-radius:8px;border:1px solid #CBD5E1;font-size:13px;min-width:280px;" />
            <button class="btn btn-sm btn-primary" id="btn-add-prod-top" style="background:#FF9900;color:#111;font-weight:700;">➕ Add Item</button>
            <button class="btn btn-sm btn-secondary" id="export-products-csv-btn">📥 Export Products</button>
          </div>
        </div>

        <div style="overflow-x:auto;max-height:520px;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;" id="admin-products-table">
            <thead>
              <tr style="background:#F1F5F9;text-align:left;position:sticky;top:0;z-index:2;">
                <th style="padding:12px 16px;font-weight:700;color:#475569;">Image</th>
                <th style="padding:12px 16px;font-weight:700;color:#475569;">Product Name</th>
                <th style="padding:12px 16px;font-weight:700;color:#475569;">Category</th>
                <th style="padding:12px 16px;font-weight:700;color:#475569;">Brand</th>
                <th style="padding:12px 16px;font-weight:700;color:#475569;">Price</th>
                <th style="padding:12px 16px;font-weight:700;color:#475569;">Stock</th>
                <th style="padding:12px 16px;font-weight:700;color:#475569;text-align:center;">Actions</th>
              </tr>
            </thead>
            <tbody id="admin-products-tbody">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECTION 2: CUSTOMER ORDERS TABLE -->
      <div style="background:white;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.06);overflow:hidden;margin-bottom:36px;border:1px solid #E2E8F0;">
        <div style="padding:20px 24px;border-bottom:1px solid #EDEDED;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;background:#FAFBFD;">
          <div>
            <h2 style="font-size:20px;font-weight:700;">📦 Customer Orders (${totalOrders})</h2>
            <p style="font-size:13px;color:#64748B;margin-top:2px;">Live incoming orders and delivery status tracking</p>
          </div>
          <button class="btn btn-sm btn-secondary" id="export-orders-btn">📥 Export Orders CSV</button>
        </div>

        ${orders.length === 0 ? `
          <div style="padding:48px;text-align:center;color:#565959;">
            <div style="font-size:48px;margin-bottom:12px;">📦</div>
            <p style="font-size:16px;font-weight:500;">No orders recorded in database yet</p>
          </div>
        ` : `
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <thead>
                <tr style="background:#F1F5F9;text-align:left;">
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Order ID</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Date</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Customer</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Items</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Total</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Payment</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Status / Action</th>
                </tr>
              </thead>
              <tbody>
                ${orders.map(order => {
                  const dateStr = new Date(order.date || order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                  const itemCount = (order.items || []).reduce((s, i) => s + (Number(i.qty) || 1), 0);
                  const paymentLabels = { upi: 'UPI', card: 'Card', netbanking: 'Net Banking', cod: 'COD', emi: 'EMI', wallet: 'Wallet' };
                  
                  return `
                    <tr style="border-bottom:1px solid #EDEDED;transition:background 0.15s;" onmouseenter="this.style.background='#F8FAFC'" onmouseleave="this.style.background='white'">
                      <td style="padding:12px 16px;"><code style="background:#F1F5F9;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600;">${order.id}</code></td>
                      <td style="padding:12px 16px;color:#565959;">${dateStr}</td>
                      <td style="padding:12px 16px;">
                        <strong>${order.address?.name || order.customerName || 'Customer'}</strong>
                        <div style="font-size:12px;color:#777;">${order.customerEmail || order.address?.email || ''}</div>
                      </td>
                      <td style="padding:12px 16px;">
                        ${itemCount} item${itemCount !== 1 ? 's' : ''}
                        <div style="font-size:11px;color:#888;max-width:200px;" class="line-clamp-1">
                          ${(order.items || []).map(i => i.name).join(', ')}
                        </div>
                      </td>
                      <td style="padding:12px 16px;font-weight:700;color:#B12704;">${formatPrice(order.total)}</td>
                      <td style="padding:12px 16px;">${paymentLabels[order.paymentMethod] || order.paymentMethod}</td>
                      <td style="padding:12px 16px;">
                        <select class="order-status-select" data-order-id="${order.id}" style="padding:4px 8px;border-radius:6px;border:1px solid #ccc;font-size:13px;font-weight:600;background:white;">
                          <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>🔄 Processing</option>
                          <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>🚚 Shipped</option>
                          <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
                          <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- SECTION 3: REGISTERED USERS DATABASE -->
      <div style="background:white;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.06);overflow:hidden;margin-bottom:36px;border:1px solid #E2E8F0;">
        <div style="padding:20px 24px;border-bottom:1px solid #EDEDED;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;background:#FAFBFD;">
          <div>
            <h2 style="font-size:20px;font-weight:700;">👥 Registered Accounts (${totalUsers})</h2>
            <p style="font-size:13px;color:#64748B;margin-top:2px;">Live user registrations from both website & local database</p>
          </div>
          <button class="btn btn-sm btn-secondary" id="export-users-btn">📥 Export Users CSV</button>
        </div>
        
        ${users.length === 0 ? `
          <div style="padding:48px;text-align:center;color:#565959;">
            <div style="font-size:48px;margin-bottom:12px;">👤</div>
            <p style="font-size:16px;font-weight:500;">No users in database yet</p>
          </div>
        ` : `
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <thead>
                <tr style="background:#F1F5F9;text-align:left;">
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">#</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">User ID</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Name</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Email</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Phone</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Role</th>
                  <th style="padding:12px 16px;font-weight:600;color:#475569;">Registered On</th>
                </tr>
              </thead>
              <tbody>
                ${users.map((u, index) => {
                  const regDate = u.createdAt 
                    ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                    : 'N/A';
                  return `
                    <tr style="border-bottom:1px solid #EDEDED;transition:background 0.15s;" onmouseenter="this.style.background='#F8FAFC'" onmouseleave="this.style.background='white'">
                      <td style="padding:12px 16px;color:#565959;">${index + 1}</td>
                      <td style="padding:12px 16px;"><code style="background:#F1F5F9;padding:2px 8px;border-radius:4px;font-size:12px;">${u.id || 'N/A'}</code></td>
                      <td style="padding:12px 16px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#FF9900,#FF6600);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;flex-shrink:0;">
                            ${u.name ? u.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <strong>${u.name || 'N/A'}</strong>
                        </div>
                      </td>
                      <td style="padding:12px 16px;color:#007185;">${u.email || 'N/A'}</td>
                      <td style="padding:12px 16px;">${u.phone || '—'}</td>
                      <td style="padding:12px 16px;">
                        <span style="background:${u.role === 'admin' ? '#EDE7F6;color:#6A1B9A;' : '#E3F2FD;color:#1565C0;'}padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;">
                          ${u.role || 'customer'}
                        </span>
                      </td>
                      <td style="padding:12px 16px;color:#565959;font-size:13px;">${regDate}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- ADD PRODUCT MODAL -->
      <div id="add-product-modal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;align-items:center;justify-content:center;padding:16px;">
        <div style="background:white;border-radius:16px;max-width:650px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 40px rgba(0,0,0,0.3);position:relative;animation:popIn 0.2s ease;">
          <div style="padding:20px 24px;border-bottom:1px solid #E2E8F0;display:flex;justify-content:space-between;align-items:center;background:#FAFBFD;border-radius:16px 16px 0 0;">
            <h3 style="font-size:18px;font-weight:800;display:flex;align-items:center;gap:8px;">➕ Add New Product to Website</h3>
            <button id="close-add-modal-btn" style="background:none;border:none;font-size:24px;cursor:pointer;color:#64748B;">&times;</button>
          </div>

          <form id="add-product-form" style="padding:24px;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
              <div style="grid-column:1 / -1;">
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Product Title / Name *</label>
                <input type="text" id="new-prod-name" required placeholder="e.g. Sony WH-1000XM5 Wireless Headphones" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Category *</label>
                <select id="new-prod-category" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;background:white;">
                  <option value="Electronics">Electronics</option>
                  <option value="Mobiles">Mobiles & Tablets</option>
                  <option value="Fashion">Fashion & Clothing</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Beauty">Beauty & Personal Care</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Sports">Sports & Fitness</option>
                  <option value="Toys">Toys & Games</option>
                  <option value="Books">Books</option>
                  <option value="Tools">Tools & Home Improvement</option>
                </select>
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Brand Name *</label>
                <input type="text" id="new-prod-brand" required placeholder="e.g. Sony, Apple, Nike" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Selling Price (₹) *</label>
                <input type="number" id="new-prod-price" required min="1" placeholder="e.g. 19999" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Original MRP (₹)</label>
                <input type="number" id="new-prod-mrp" min="1" placeholder="e.g. 29999 (for discount %)" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Stock Quantity</label>
                <input type="number" id="new-prod-stock" value="50" min="1" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Subcategory</label>
                <input type="text" id="new-prod-subcategory" placeholder="e.g. Headphones, Running Shoes" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div style="grid-column:1 / -1;">
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Product Picture *</label>
                <div style="display:flex;gap:12px;align-items:center;">
                  <img id="new-prod-preview-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" style="width:54px;height:54px;border-radius:8px;border:1px solid #CBD5E1;object-fit:contain;background:#fff;padding:2px;flex-shrink:0;" onerror="this.src='https://via.placeholder.com/54'" />
                  <input type="url" id="new-prod-image" required placeholder="Paste image link here (or click Upload from PC)..." value="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
                  <input type="file" id="new-prod-file-input" accept="image/*" style="display:none;" />
                  <button type="button" id="new-prod-file-btn" class="btn btn-secondary" style="white-space:nowrap;padding:10px 14px;font-size:13px;">📁 Upload from PC</button>
                </div>
                
                <!-- Preset Image Pickers -->
                <div style="margin-top:8px;">
                  <span style="font-size:11px;color:#64748B;font-weight:600;">Or pick a preset category image:</span>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
                    ${PRESET_IMAGES.map(img => `
                      <button type="button" class="preset-img-btn" data-url="${img.url}" style="font-size:11px;padding:3px 8px;border-radius:6px;border:1px solid #CBD5E1;background:#F8FAFC;cursor:pointer;">
                        ${img.name}
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>

              <div style="grid-column:1 / -1;">
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Product Description</label>
                <textarea id="new-prod-desc" rows="3" placeholder="Brief description of the product features, quality, and details..." style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;font-family:inherit;"></textarea>
              </div>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;padding-top:16px;border-top:1px solid #E2E8F0;">
              <button type="button" id="cancel-add-modal-btn" class="btn btn-secondary" style="padding:10px 20px;">Cancel</button>
              <button type="submit" class="btn btn-primary" style="background:linear-gradient(135deg,#FF9900,#FF6600);border:none;color:white;font-weight:800;padding:10px 24px;box-shadow:0 4px 12px rgba(255,153,0,0.3);">
                ✓ Publish Product to Website
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- EDIT PRODUCT MODAL -->
      <div id="edit-product-modal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;align-items:center;justify-content:center;padding:16px;">
        <div style="background:white;border-radius:16px;max-width:650px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 40px rgba(0,0,0,0.3);position:relative;animation:popIn 0.2s ease;">
          <div style="padding:20px 24px;border-bottom:1px solid #E2E8F0;display:flex;justify-content:space-between;align-items:center;background:#FAFBFD;border-radius:16px 16px 0 0;">
            <h3 style="font-size:18px;font-weight:800;display:flex;align-items:center;gap:8px;">✏️ Edit Product Details & Picture</h3>
            <button id="close-edit-modal-btn" style="background:none;border:none;font-size:24px;cursor:pointer;color:#64748B;">&times;</button>
          </div>

          <form id="edit-product-form" style="padding:24px;">
            <input type="hidden" id="edit-prod-id" />
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
              <div style="grid-column:1 / -1;">
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Product Title / Name *</label>
                <input type="text" id="edit-prod-name" required placeholder="Product Title" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Category *</label>
                <select id="edit-prod-category" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;background:white;">
                  <option value="Electronics">Electronics</option>
                  <option value="Mobiles">Mobiles & Tablets</option>
                  <option value="Fashion">Fashion & Clothing</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Beauty">Beauty & Personal Care</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Sports">Sports & Fitness</option>
                  <option value="Toys">Toys & Games</option>
                  <option value="Books">Books</option>
                  <option value="Tools">Tools & Home Improvement</option>
                </select>
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Brand Name *</label>
                <input type="text" id="edit-prod-brand" required style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Selling Price (₹) *</label>
                <input type="number" id="edit-prod-price" required min="1" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Original MRP (₹)</label>
                <input type="number" id="edit-prod-mrp" min="1" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Stock Quantity</label>
                <input type="number" id="edit-prod-stock" min="0" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div>
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Subcategory</label>
                <input type="text" id="edit-prod-subcategory" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
              </div>

              <div style="grid-column:1 / -1;">
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Product Picture *</label>
                <div style="display:flex;gap:12px;align-items:center;">
                  <img id="edit-prod-preview-img" src="" alt="Preview" style="width:54px;height:54px;border-radius:8px;border:1px solid #CBD5E1;object-fit:contain;background:#fff;padding:2px;flex-shrink:0;" onerror="this.src='https://via.placeholder.com/54'" />
                  <input type="url" id="edit-prod-image" required placeholder="Paste image link here (or click Upload from PC)..." style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;" />
                  <input type="file" id="edit-prod-file-input" accept="image/*" style="display:none;" />
                  <button type="button" id="edit-prod-file-btn" class="btn btn-secondary" style="white-space:nowrap;padding:10px 14px;font-size:13px;">📁 Upload from PC</button>
                </div>

                <!-- Preset Image Pickers for Edit -->
                <div style="margin-top:8px;">
                  <span style="font-size:11px;color:#64748B;font-weight:600;">Or pick a preset replacement image:</span>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
                    ${PRESET_IMAGES.map(img => `
                      <button type="button" class="edit-preset-img-btn" data-url="${img.url}" style="font-size:11px;padding:3px 8px;border-radius:6px;border:1px solid #CBD5E1;background:#F8FAFC;cursor:pointer;">
                        ${img.name}
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>

              <div style="grid-column:1 / -1;">
                <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px;color:#334155;">Product Description</label>
                <textarea id="edit-prod-desc" rows="3" style="width:100%;padding:10px 14px;border:1px solid #CBD5E1;border-radius:8px;font-size:14px;font-family:inherit;"></textarea>
              </div>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;padding-top:16px;border-top:1px solid #E2E8F0;">
              <button type="button" id="cancel-edit-modal-btn" class="btn btn-secondary" style="padding:10px 20px;">Cancel</button>
              <button type="submit" class="btn btn-primary" style="background:linear-gradient(135deg,#2563EB,#1D4ED8);border:none;color:white;font-weight:800;padding:10px 24px;box-shadow:0 4px 12px rgba(37,99,235,0.3);">
                💾 Save Changes & Update Picture
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- MONGODB STATUS MODAL -->
      <div id="mongodb-modal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;align-items:center;justify-content:center;padding:16px;">
        <div style="background:white;border-radius:16px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 40px rgba(0,0,0,0.3);position:relative;animation:popIn 0.2s ease;">
          <div style="padding:20px 24px;border-bottom:1px solid #E2E8F0;display:flex;justify-content:space-between;align-items:center;background:#FAFBFD;border-radius:16px 16px 0 0;">
            <h3 style="font-size:18px;font-weight:800;display:flex;align-items:center;gap:8px;">🍃 MongoDB Database Status</h3>
            <button id="close-mongodb-modal-btn" style="background:none;border:none;font-size:24px;cursor:pointer;color:#64748B;">&times;</button>
          </div>
          <div id="mongodb-status-content" style="padding:24px;">
            <p style="text-align:center;color:#666;">Loading database status...</p>
          </div>
          <div style="padding:16px 24px;border-top:1px solid #E2E8F0;text-align:right;">
            <button type="button" id="close-mongodb-modal-btn2" class="btn btn-secondary" style="padding:8px 16px;">Close</button>
          </div>
        </div>
      </div>

      <p style="text-align:center;color:#888;font-size:12px;margin-top:24px;">
        Database engine: MongoDB (via Express API). Last refreshed: ${new Date().toLocaleString('en-IN')}
      </p>
    </div>
  `;

  // Render Admin Products Table
  function renderProductsTable(filterQuery = '') {
    const tbody = document.getElementById('admin-products-tbody');
    const countEl = document.getElementById('products-table-count');
    const statEl = document.getElementById('stat-products-count');
    if (!tbody) return;

    const q = filterQuery.toLowerCase().trim();
    const filtered = products.filter(p => 
      !q || 
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.id?.toLowerCase().includes(q)
    );

    if (countEl) countEl.textContent = filtered.length;
    if (statEl) statEl.textContent = products.length;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="padding:32px;text-align:center;color:#64748B;">
            No products found matching "${filterQuery}".
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((prod) => {
      const imgUrl = Array.isArray(prod.images) && prod.images.length ? prod.images[0] : (prod.image || 'https://via.placeholder.com/40');
      return `
        <tr style="border-bottom:1px solid #E2E8F0;transition:background 0.15s;" onmouseenter="this.style.background='#F8FAFC'" onmouseleave="this.style.background='white'" id="prod-row-${prod.id}">
          <td style="padding:10px 16px;">
            <img src="${imgUrl}" alt="" style="width:42px;height:42px;object-fit:contain;border-radius:6px;border:1px solid #E2E8F0;background:#fff;padding:2px;" onerror="this.src='https://via.placeholder.com/40'" />
          </td>
          <td style="padding:10px 16px;max-width:280px;">
            <strong style="color:#0F172A;display:block;" class="line-clamp-1">${prod.name}</strong>
            <span style="font-size:11px;color:#94A3B8;font-family:monospace;">${prod.id}</span>
          </td>
          <td style="padding:10px 16px;">
            <span style="background:#E0F2FE;color:#0369A1;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;">
              ${prod.category || 'General'}
            </span>
          </td>
          <td style="padding:10px 16px;font-weight:600;color:#334155;">${prod.brand || '—'}</td>
          <td style="padding:10px 16px;">
            <strong style="color:#B12704;">${formatPrice(prod.price)}</strong>
            ${prod.discount ? `<span style="font-size:11px;color:#059669;margin-left:4px;">(${prod.discount}% off)</span>` : ''}
          </td>
          <td style="padding:10px 16px;">
            <span style="font-weight:600;color:${(prod.stock || 50) > 10 ? '#059669' : '#DC2626'};">
              ${prod.stock || 50} in stock
            </span>
          </td>
          <td style="padding:10px 16px;text-align:center;white-space:nowrap;">
            <button class="btn btn-sm btn-edit-product" data-prod-id="${prod.id}" style="background:#EEF2FF;color:#4F46E5;border:1px solid #C7D2FE;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;margin-right:6px;">
              ✏️ Edit
            </button>
            <button class="btn btn-sm btn-delete-product" data-prod-id="${prod.id}" data-prod-name="${prod.name?.replace(/"/g, '&quot;')}" style="background:#FEE2E2;color:#DC2626;border:1px solid #FECACA;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;">
              🗑️ Delete
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach Edit Listeners
    tbody.querySelectorAll('.btn-edit-product').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.dataset.prodId;
        const prod = getProductById(prodId);
        if (!prod) return;

        document.getElementById('edit-prod-id').value = prod.id;
        document.getElementById('edit-prod-name').value = prod.name || '';
        document.getElementById('edit-prod-category').value = prod.category || 'Electronics';
        document.getElementById('edit-prod-brand').value = prod.brand || '';
        document.getElementById('edit-prod-price').value = prod.price || '';
        document.getElementById('edit-prod-mrp').value = prod.originalPrice || prod.price || '';
        document.getElementById('edit-prod-stock').value = prod.stock !== undefined ? prod.stock : 50;
        document.getElementById('edit-prod-subcategory').value = prod.subcategory || '';
        const currentImg = (Array.isArray(prod.images) && prod.images[0]) || prod.image || '';
        document.getElementById('edit-prod-image').value = currentImg;
        document.getElementById('edit-prod-preview-img').src = currentImg;
        document.getElementById('edit-prod-desc').value = prod.description || '';

        const editModal = document.getElementById('edit-product-modal');
        if (editModal) editModal.style.display = 'flex';
      });
    });

    // Attach Delete Listeners
    tbody.querySelectorAll('.btn-delete-product').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.dataset.prodId;
        const prodName = btn.dataset.prodName || 'this product';
        if (confirm(`Are you sure you want to remove "${prodName}" from the website?`)) {
          deleteProductById(prodId);
          renderProductsTable(document.getElementById('admin-product-search')?.value || '');
          showToast(`✓ Removed "${prodName}" from catalog.`);
        }
      });
    });
  }

  // Initial table render
  renderProductsTable();

  // Search input listener
  document.getElementById('admin-product-search')?.addEventListener('input', (e) => {
    renderProductsTable(e.target.value);
  });

  // Add Modal open/close
  const addModal = document.getElementById('add-product-modal');
  const openAddModal = () => { if (addModal) addModal.style.display = 'flex'; };
  const closeAddModal = () => { if (addModal) addModal.style.display = 'none'; };

  document.getElementById('open-add-product-modal')?.addEventListener('click', openAddModal);
  document.getElementById('btn-add-prod-top')?.addEventListener('click', openAddModal);
  document.getElementById('close-add-modal-btn')?.addEventListener('click', closeAddModal);
  document.getElementById('cancel-add-modal-btn')?.addEventListener('click', closeAddModal);

  // Edit Modal open/close
  const editModal = document.getElementById('edit-product-modal');
  const closeEditModal = () => { if (editModal) editModal.style.display = 'none'; };
  document.getElementById('close-edit-modal-btn')?.addEventListener('click', closeEditModal);
  document.getElementById('cancel-edit-modal-btn')?.addEventListener('click', closeEditModal);

  // Dynamic Image URL preview listeners
  const newImgInput = document.getElementById('new-prod-image');
  newImgInput?.addEventListener('input', (e) => {
    const preview = document.getElementById('new-prod-preview-img');
    if (preview) preview.src = e.target.value || 'https://via.placeholder.com/54';
  });

  const editImgInput = document.getElementById('edit-prod-image');
  editImgInput?.addEventListener('input', (e) => {
    const preview = document.getElementById('edit-prod-preview-img');
    if (preview) preview.src = e.target.value || 'https://via.placeholder.com/54';
  });

  // File Upload Handlers (PC upload with auto-compression)
  const newFileInput = document.getElementById('new-prod-file-input');
  document.getElementById('new-prod-file-btn')?.addEventListener('click', () => {
    newFileInput?.click();
  });
  newFileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast('⏳ Processing & optimizing image...', 'info');
      const dataUrl = await compressImageFile(file);
      if (newImgInput) newImgInput.value = dataUrl;
      const preview = document.getElementById('new-prod-preview-img');
      if (preview) preview.src = dataUrl;
      showToast('✓ Image optimized & ready!', 'success');
    }
  });

  const editFileInput = document.getElementById('edit-prod-file-input');
  document.getElementById('edit-prod-file-btn')?.addEventListener('click', () => {
    editFileInput?.click();
  });
  editFileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast('⏳ Processing & optimizing image...', 'info');
      const dataUrl = await compressImageFile(file);
      if (editImgInput) editImgInput.value = dataUrl;
      const preview = document.getElementById('edit-prod-preview-img');
      if (preview) preview.src = dataUrl;
      showToast('✓ Image optimized & ready!', 'success');
    }
  });

  // Preset Image Clickers (Add Modal)
  document.querySelectorAll('.preset-img-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (newImgInput) {
        newImgInput.value = btn.dataset.url;
        const preview = document.getElementById('new-prod-preview-img');
        if (preview) preview.src = btn.dataset.url;
      }
    });
  });

  // Preset Image Clickers (Edit Modal)
  document.querySelectorAll('.edit-preset-img-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (editImgInput) {
        editImgInput.value = btn.dataset.url;
        const preview = document.getElementById('edit-prod-preview-img');
        if (preview) preview.src = btn.dataset.url;
      }
    });
  });

  // Handle Add Product Submit
  document.getElementById('add-product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const origBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Publishing to Cloud...';
    }

    const name = document.getElementById('new-prod-name').value.trim();
    const category = document.getElementById('new-prod-category').value;
    const brand = document.getElementById('new-prod-brand').value.trim();
    const price = Number(document.getElementById('new-prod-price').value);
    const originalPrice = Number(document.getElementById('new-prod-mrp').value) || price;
    const stock = Number(document.getElementById('new-prod-stock').value) || 50;
    const subcategory = document.getElementById('new-prod-subcategory').value.trim() || 'General';
    const image = document.getElementById('new-prod-image').value.trim();
    const description = document.getElementById('new-prod-desc').value.trim();

    if (!name || !price) {
      alert('Please fill in required fields (Name, Price).');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origBtnText; }
      return;
    }

    await addNewProduct({
      name,
      category,
      brand,
      price,
      originalPrice,
      stock,
      subcategory,
      images: [image],
      image: image,
      description: description || `${name} by ${brand}. Available now on KartHub.`
    });

    closeAddModal();
    document.getElementById('add-product-form').reset();
    renderProductsTable();
    showToast(`🎉 "${name}" published worldwide!`, 'success');
    if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origBtnText; }
  });

  // Handle Edit Product Submit
  document.getElementById('edit-product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const origBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Syncing Worldwide...';
    }

    const id = document.getElementById('edit-prod-id').value;
    const name = document.getElementById('edit-prod-name').value.trim();
    const category = document.getElementById('edit-prod-category').value;
    const brand = document.getElementById('edit-prod-brand').value.trim();
    const price = Number(document.getElementById('edit-prod-price').value);
    const originalPrice = Number(document.getElementById('edit-prod-mrp').value) || price;
    const stock = Number(document.getElementById('edit-prod-stock').value) || 50;
    const subcategory = document.getElementById('edit-prod-subcategory').value.trim() || 'General';
    const image = document.getElementById('edit-prod-image').value.trim();
    const description = document.getElementById('edit-prod-desc').value.trim();

    if (!id || !name || !price) {
      alert('Please fill in required fields (Name, Price).');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origBtnText; }
      return;
    }

    await updateProductById(id, {
      name,
      category,
      brand,
      price,
      originalPrice,
      stock,
      subcategory,
      image,
      images: [image],
      description
    });

    closeEditModal();
    renderProductsTable(document.getElementById('admin-product-search')?.value || '');
    showToast(`✓ "${name}" updated & synced worldwide!`, 'success');
    if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origBtnText; }
  });

  // Status Change Handlers
  document.querySelectorAll('.order-status-select').forEach(select => {
    select.addEventListener('change', async (e) => {
      const orderId = e.target.dataset.orderId;
      const newStatus = e.target.value;
      try {
        await dbUpdateOrderStatus(orderId, newStatus);
        e.target.style.borderColor = '#4CAF50';
        setTimeout(() => { e.target.style.borderColor = '#ccc'; }, 1000);
      } catch (err) {
        alert('Failed to update status in database');
      }
    });
  });

  // MongoDB Status Modal
  document.getElementById('open-mongodb-status-btn')?.addEventListener('click', async () => {
    const modal = document.getElementById('mongodb-modal');
    const content = document.getElementById('mongodb-status-content');
    if (modal) modal.style.display = 'flex';
    if (content) content.innerHTML = '<p style="text-align:center;color:#666;">⏳ Checking MongoDB connection...</p>';

    try {
      const res = await fetch(`${API_URL}/api/health`);
      const health = await res.json();
      const badge = document.getElementById('db-status-badge');

      if (health.database === 'MongoDB Connected') {
        if (badge) {
          badge.style.background = '#E8F5E9';
          badge.style.color = '#2E7D32';
          badge.textContent = '🍃 MongoDB Connected';
        }
        content.innerHTML = `
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;padding:14px 16px;border-radius:10px;margin-bottom:16px;">
            <p style="font-size:14px;color:#166534;margin:0;font-weight:700;">✅ MongoDB is Connected & Active</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
            <div style="background:#F8FAFC;padding:12px;border-radius:8px;border:1px solid #E2E8F0;">
              <div style="font-size:11px;color:#64748B;font-weight:600;">URI</div>
              <div style="font-size:13px;font-weight:700;margin-top:4px;">${health.uri || 'Local'}</div>
            </div>
            <div style="background:#F8FAFC;padding:12px;border-radius:8px;border:1px solid #E2E8F0;">
              <div style="font-size:11px;color:#64748B;font-weight:600;">Status</div>
              <div style="font-size:13px;font-weight:700;margin-top:4px;color:#16A34A;">${health.status}</div>
            </div>
          </div>
          <h4 style="font-size:14px;font-weight:700;margin-bottom:10px;">📊 Collection Stats</h4>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
            <div style="background:#EFF6FF;padding:12px;border-radius:8px;text-align:center;">
              <div style="font-size:22px;font-weight:800;color:#2563EB;">${health.stats?.products || 0}</div>
              <div style="font-size:11px;color:#64748B;">Products</div>
            </div>
            <div style="background:#FEF3C7;padding:12px;border-radius:8px;text-align:center;">
              <div style="font-size:22px;font-weight:800;color:#D97706;">${health.stats?.users || 0}</div>
              <div style="font-size:11px;color:#64748B;">Users</div>
            </div>
            <div style="background:#F0FDF4;padding:12px;border-radius:8px;text-align:center;">
              <div style="font-size:22px;font-weight:800;color:#16A34A;">${health.stats?.orders || 0}</div>
              <div style="font-size:11px;color:#64748B;">Orders</div>
            </div>
            <div style="background:#FDF4FF;padding:12px;border-radius:8px;text-align:center;">
              <div style="font-size:22px;font-weight:800;color:#A855F7;">${health.stats?.carts || 0}</div>
              <div style="font-size:11px;color:#64748B;">Carts</div>
            </div>
            <div style="background:#FFF1F2;padding:12px;border-radius:8px;text-align:center;">
              <div style="font-size:22px;font-weight:800;color:#F43F5E;">${health.stats?.wishlists || 0}</div>
              <div style="font-size:11px;color:#64748B;">Wishlists</div>
            </div>
            <div style="background:#ECFEFF;padding:12px;border-radius:8px;text-align:center;">
              <div style="font-size:22px;font-weight:800;color:#0891B2;">${health.stats?.reviews || 0}</div>
              <div style="font-size:11px;color:#64748B;">Reviews</div>
            </div>
          </div>
        `;
      } else {
        if (badge) {
          badge.style.background = '#FFF3E0';
          badge.style.color = '#E65100';
          badge.textContent = '⚠️ MongoDB Disconnected';
        }
        content.innerHTML = `
          <div style="background:#FEF2F2;border:1px solid #FECACA;padding:14px 16px;border-radius:10px;">
            <p style="font-size:14px;color:#991B1B;margin:0;font-weight:700;">⚠️ MongoDB is not connected</p>
            <p style="font-size:13px;color:#991B1B;margin-top:8px;">Make sure the MongoDB server is running, or check your MONGODB_URI in the .env file.</p>
          </div>
        `;
      }
    } catch (err) {
      content.innerHTML = `
        <div style="background:#FEF2F2;border:1px solid #FECACA;padding:14px 16px;border-radius:10px;">
          <p style="font-size:14px;color:#991B1B;margin:0;font-weight:700;">❌ Cannot reach backend server</p>
          <p style="font-size:13px;color:#991B1B;margin-top:8px;">Make sure the Express server is running: <code>npm run server</code></p>
        </div>
      `;
    }
  });

  const closeMongoModal = () => {
    const modal = document.getElementById('mongodb-modal');
    if (modal) modal.style.display = 'none';
  };
  document.getElementById('close-mongodb-modal-btn')?.addEventListener('click', closeMongoModal);
  document.getElementById('close-mongodb-modal-btn2')?.addEventListener('click', closeMongoModal);

  // Refresh Button
  document.getElementById('admin-refresh-btn')?.addEventListener('click', () => {
    renderAdminPage();
  });

  // Export Products CSV
  document.getElementById('export-products-csv-btn')?.addEventListener('click', () => {
    const headers = ['Product ID', 'Name', 'Category', 'Brand', 'Price (₹)', 'Original Price (₹)', 'Discount (%)', 'Stock'];
    const rows = products.map(p => [
      p.id, p.name, p.category, p.brand, p.price, p.originalPrice || p.price, p.discount || 0, p.stock || 50
    ]);
    downloadCSV('karthub_products_catalog.csv', headers, rows);
  });

  // Export Users CSV
  document.getElementById('export-users-btn')?.addEventListener('click', () => {
    if (users.length === 0) return alert('No users to export');
    const headers = ['User ID', 'Name', 'Email', 'Phone', 'Role', 'Registered On'];
    const rows = users.map(u => [
      u.id || '', u.name || '', u.email || '', u.phone || '', u.role || 'customer',
      u.createdAt ? new Date(u.createdAt).toLocaleString('en-IN') : ''
    ]);
    downloadCSV('karthub_users_database.csv', headers, rows);
  });

  // Export Orders CSV
  document.getElementById('export-orders-btn')?.addEventListener('click', () => {
    if (orders.length === 0) return alert('No orders to export');
    const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Items', 'Total', 'Payment', 'Status', 'Address'];
    const rows = orders.map(o => [
      o.id, new Date(o.date || o.createdAt).toLocaleDateString('en-IN'),
      o.address?.name || o.customerName || 'N/A',
      o.customerEmail || o.address?.email || 'N/A',
      (o.items || []).map(i => `${i.name} (x${i.qty})`).join(' | '),
      o.total, o.paymentMethod, o.status,
      o.address ? `${o.address.address}, ${o.address.city}, ${o.address.state} - ${o.address.pincode}` : 'N/A'
    ]);
    downloadCSV('karthub_orders_database.csv', headers, rows);
  });
}

function showToast(msg) {
  const existing = document.getElementById('admin-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'admin-toast';
  toast.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#0F172A;color:#38BDF8;padding:14px 22px;border-radius:10px;font-weight:700;font-size:14px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:99999;border:1px solid #334155;animation:slideUp 0.3s ease;';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function downloadCSV(filename, headers, rows) {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}


