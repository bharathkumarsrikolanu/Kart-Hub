// ============================================
// KartHub — Unified Database Service (MongoDB Backend)
// All data is stored in MongoDB via Express REST API
// localStorage is used only as a fast read cache
// ============================================
import { products as initialProducts } from '../data/products.js';

// API base URL — points to Express backend
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';

// Local storage keys for fast read cache
const DB_KEYS = {
  PRODUCTS: 'karthub_db_products',
  ORDERS: 'karthub_db_orders',
  USERS: 'karthub_db_users',
  CARTS: 'karthub_db_carts',
  WISHLISTS: 'karthub_db_wishlists',
  REVIEWS: 'karthub_db_reviews',
  SEEDED: 'karthub_db_seeded_v1'
};

function getLocalData(key, fallback = []) {
  try {
    if (typeof localStorage === 'undefined') return fallback;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalData(key, value) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Local cache write failed:', e);
  }
}

/**
 * Helper to make API calls with error handling
 */
async function apiCall(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn(`API call failed (${endpoint}):`, err.message);
    return null;
  }
}

// ----------------------------------------------------
// 1. PRODUCTS DATABASE API
// ----------------------------------------------------

/**
 * Initializes products — checks if backend has data, seeds if needed.
 */
export async function dbSeedProducts() {
  // Try the backend API first
  const result = await apiCall('/api/products');
  if (result?.success && result.data?.length > 0) {
    setLocalData(DB_KEYS.PRODUCTS, result.data);
    return { success: true, count: result.data.length, source: 'mongodb' };
  }

  // Fallback to initial data
  const existing = getLocalData(DB_KEYS.PRODUCTS, []);
  if (!existing || existing.length === 0) {
    setLocalData(DB_KEYS.PRODUCTS, initialProducts);
  }
  return { success: true, count: initialProducts.length, source: 'local_cache' };
}

/**
 * Get all products from MongoDB backend.
 */
export async function dbGetProducts() {
  // Try API first
  const result = await apiCall('/api/products');
  if (result?.success && result.data) {
    setLocalData(DB_KEYS.PRODUCTS, result.data);
    return result.data;
  }

  // Fallback to local cache
  let local = getLocalData(DB_KEYS.PRODUCTS, []);
  if (!local || local.length === 0) {
    local = initialProducts;
    setLocalData(DB_KEYS.PRODUCTS, local);
  }
  return local;
}

/**
 * Get a single product by ID.
 */
export async function dbGetProductById(productId) {
  const result = await apiCall(`/api/products/${encodeURIComponent(productId)}`);
  if (result?.success && result.data) {
    return result.data;
  }

  // Fallback to cached products
  const products = getLocalData(DB_KEYS.PRODUCTS, initialProducts);
  return products.find(p => p.id === productId) || null;
}

/**
 * Add or update a product (Admin capability).
 */
export async function dbSaveProduct(product) {
  const prodData = {
    ...product,
    id: product.id || ('PROD' + Date.now()),
    updatedAt: new Date().toISOString()
  };

  // Send to backend API
  const result = await apiCall('/api/products', {
    method: 'POST',
    body: JSON.stringify(prodData)
  });

  if (result?.success && result.data) {
    // Refresh local cache
    const products = await dbGetProducts();
    return result.data;
  }

  // Fallback: update local cache only
  const local = getLocalData(DB_KEYS.PRODUCTS, initialProducts);
  const idx = local.findIndex(p => p.id === prodData.id);
  if (idx >= 0) {
    local[idx] = prodData;
  } else {
    local.unshift(prodData);
  }
  setLocalData(DB_KEYS.PRODUCTS, local);
  return prodData;
}

/**
 * Delete a product.
 */
export async function dbDeleteProduct(productId) {
  const result = await apiCall(`/api/products/${encodeURIComponent(productId)}`, {
    method: 'DELETE'
  });

  // Also update local cache
  const local = getLocalData(DB_KEYS.PRODUCTS, []);
  const updated = local.filter(p => p.id !== productId);
  setLocalData(DB_KEYS.PRODUCTS, updated);

  return true;
}

// ----------------------------------------------------
// 2. ORDERS DATABASE API
// ----------------------------------------------------

/**
 * Create and place a new order in MongoDB.
 */
export async function dbCreateOrder(orderData) {
  const orderId = orderData.id || ('ORD' + Date.now() + Math.random().toString(36).substring(2, 6).toUpperCase());
  const newOrder = {
    ...orderData,
    id: orderId,
    status: orderData.status || 'Processing',
    date: orderData.date || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    estimatedDelivery: orderData.estimatedDelivery || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  };

  // Send to backend API
  const result = await apiCall('/api/orders', {
    method: 'POST',
    body: JSON.stringify(newOrder)
  });

  const savedOrder = result?.success ? result.data : newOrder;

  // Update local cache
  const localOrders = getLocalData(DB_KEYS.ORDERS, []);
  localOrders.unshift(savedOrder);
  setLocalData(DB_KEYS.ORDERS, localOrders);

  return savedOrder;
}

/**
 * Get orders for a specific user.
 */
export async function dbGetUserOrders(userId, userEmail = null) {
  // Build query string
  let queryParams = [];
  if (userId) queryParams.push(`userId=${encodeURIComponent(userId)}`);
  if (userEmail) queryParams.push(`email=${encodeURIComponent(userEmail)}`);
  const qs = queryParams.length > 0 ? '?' + queryParams.join('&') : '';

  const result = await apiCall(`/api/orders${qs}`);
  if (result?.success && result.data) {
    return result.data;
  }

  // Fallback to local cache
  const local = getLocalData(DB_KEYS.ORDERS, []);
  return local.filter(o =>
    (userId && o.userId === userId) ||
    (userEmail && (o.customerEmail === userEmail || o.address?.email === userEmail))
  );
}

/**
 * Get all orders (for Admin Dashboard).
 */
export async function dbGetAllOrders() {
  const result = await apiCall('/api/orders');
  if (result?.success && result.data) {
    setLocalData(DB_KEYS.ORDERS, result.data);
    return result.data;
  }

  // Fallback to local cache
  return getLocalData(DB_KEYS.ORDERS, []);
}

/**
 * Update order status (Admin function).
 */
export async function dbUpdateOrderStatus(orderId, newStatus) {
  const result = await apiCall(`/api/orders/${encodeURIComponent(orderId)}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: newStatus })
  });

  // Update local cache
  const localOrders = getLocalData(DB_KEYS.ORDERS, []);
  const target = localOrders.find(o => o.id === orderId);
  if (target) {
    target.status = newStatus;
    target.updatedAt = new Date().toISOString();
    setLocalData(DB_KEYS.ORDERS, localOrders);
  }

  return result?.data || target;
}

// ----------------------------------------------------
// 3. CART & WISHLIST DATABASE API
// ----------------------------------------------------

/**
 * Save user cart to MongoDB.
 */
export async function dbSaveCart(userId, cartItems) {
  if (!userId) return;

  // Save to local cache immediately for snappy UX
  const allCarts = getLocalData(DB_KEYS.CARTS, {});
  allCarts[userId] = cartItems;
  setLocalData(DB_KEYS.CARTS, allCarts);

  // Sync to MongoDB backend
  await apiCall(`/api/cart/${encodeURIComponent(userId)}`, {
    method: 'PUT',
    body: JSON.stringify({ items: cartItems })
  });
}

/**
 * Get user cart from MongoDB.
 */
export async function dbGetCart(userId) {
  if (!userId) return [];

  const result = await apiCall(`/api/cart/${encodeURIComponent(userId)}`);
  if (result?.success && result.data && result.data.length > 0) {
    // Update local cache
    const allCarts = getLocalData(DB_KEYS.CARTS, {});
    allCarts[userId] = result.data;
    setLocalData(DB_KEYS.CARTS, allCarts);
    return result.data;
  }

  // Fallback to local cache
  const allCarts = getLocalData(DB_KEYS.CARTS, {});
  return allCarts[userId] || [];
}

/**
 * Save user wishlist to MongoDB.
 */
export async function dbSaveWishlist(userId, wishlistItems) {
  if (!userId) return;

  // Save to local cache immediately
  const allWishlists = getLocalData(DB_KEYS.WISHLISTS, {});
  allWishlists[userId] = wishlistItems;
  setLocalData(DB_KEYS.WISHLISTS, allWishlists);

  // Sync to MongoDB backend
  await apiCall(`/api/wishlist/${encodeURIComponent(userId)}`, {
    method: 'PUT',
    body: JSON.stringify({ items: wishlistItems })
  });
}

/**
 * Get user wishlist from MongoDB.
 */
export async function dbGetWishlist(userId) {
  if (!userId) return [];

  const result = await apiCall(`/api/wishlist/${encodeURIComponent(userId)}`);
  if (result?.success && result.data && result.data.length > 0) {
    const allWishlists = getLocalData(DB_KEYS.WISHLISTS, {});
    allWishlists[userId] = result.data;
    setLocalData(DB_KEYS.WISHLISTS, allWishlists);
    return result.data;
  }

  // Fallback to local cache
  const allWishlists = getLocalData(DB_KEYS.WISHLISTS, {});
  return allWishlists[userId] || [];
}

// ----------------------------------------------------
// 4. USERS DATABASE API
// ----------------------------------------------------

/**
 * Save user profile to MongoDB.
 */
export async function dbSaveUser(userData) {
  // Save to local cache immediately
  const users = getLocalData(DB_KEYS.USERS, []);
  const idx = users.findIndex(u => u.email === userData.email || u.id === userData.id);
  if (idx >= 0) {
    users[idx] = { ...users[idx], ...userData };
  } else {
    users.push(userData);
  }
  setLocalData(DB_KEYS.USERS, users);

  // Sync to MongoDB backend
  await apiCall('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  });

  return userData;
}

/**
 * Get all registered users (for Admin Dashboard).
 */
export async function dbGetAllUsers() {
  const result = await apiCall('/api/users');
  if (result?.success && result.data) {
    setLocalData(DB_KEYS.USERS, result.data);
    return result.data;
  }

  // Fallback to local cache
  return getLocalData(DB_KEYS.USERS, []);
}

// Auto-seed on initial load
dbSeedProducts();
