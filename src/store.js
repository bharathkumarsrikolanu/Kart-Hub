// ============================================
// KartHub — Central State Store (Connected to Database)
// ============================================
import { 
  dbGetProducts, 
  dbGetProductById, 
  dbCreateOrder, 
  dbGetUserOrders, 
  dbGetAllOrders, 
  dbSaveCart, 
  dbGetCart, 
  dbSaveWishlist, 
  dbGetWishlist,
  dbSeedProducts
} from './services/db.js';
import { 
  dbSignInUser, 
  dbSignUpUser, 
  dbSignOutUser 
} from './services/auth.js';

const STORAGE_KEYS = {
  USER: 'karthub_user',
  CART: 'karthub_cart',
  WISHLIST: 'karthub_wishlist',
  ORDERS: 'karthub_orders',
  RECENTLY_VIEWED: 'karthub_recently_viewed',
  ADDRESSES: 'karthub_addresses',
};

function getItem(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage write failed:', e);
  }
}

// ---- Event System ----
const listeners = {};

export function on(event, callback) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
}

export function off(event, callback) {
  if (!listeners[event]) return;
  listeners[event] = listeners[event].filter(cb => cb !== callback);
}

export function emit(event, data) {
  if (!listeners[event]) return;
  listeners[event].forEach(cb => {
    try {
      cb(data);
    } catch (err) {
      console.error(`Error in event listener for ${event}:`, err);
    }
  });
}

// ---- Auth ----
export function getCurrentUser() {
  return getItem(STORAGE_KEYS.USER);
}

export async function login(email, password) {
  const result = await dbSignInUser(email, password);
  if (result.success) {
    setItem(STORAGE_KEYS.USER, result.user);
    emit('auth:change', result.user);
    
    // Sync user cart and wishlist from DB
    syncUserDataFromDB(result.user.id);
  }
  return result;
}

export async function signup(name, email, phone, password) {
  const result = await dbSignUpUser({ name, email, phone, password });
  if (result.success) {
    setItem(STORAGE_KEYS.USER, result.user);
    emit('auth:change', result.user);
  }
  return result;
}

export async function logout() {
  await dbSignOutUser();
  localStorage.removeItem(STORAGE_KEYS.USER);
  emit('auth:change', null);
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

async function syncUserDataFromDB(userId) {
  if (!userId) return;
  try {
    const [dbCart, dbWishlist, dbOrders] = await Promise.all([
      dbGetCart(userId),
      dbGetWishlist(userId),
      dbGetUserOrders(userId)
    ]);

    if (dbCart && dbCart.length > 0) {
      setItem(STORAGE_KEYS.CART, dbCart);
      emit('cart:change', dbCart);
    }
    if (dbWishlist && dbWishlist.length > 0) {
      setItem(STORAGE_KEYS.WISHLIST, dbWishlist);
      emit('wishlist:change', dbWishlist);
    }
    if (dbOrders && dbOrders.length > 0) {
      setItem(STORAGE_KEYS.ORDERS, dbOrders);
      emit('orders:change', dbOrders);
    }
  } catch (e) {
    console.warn('Sync user data notice:', e);
  }
}

export function getCartUserId() {
  const user = getCurrentUser();
  if (user) {
    return user.id || user._id || user.email;
  }
  let guestId = localStorage.getItem('karthub_guest_id');
  if (!guestId) {
    guestId = 'guest_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('karthub_guest_id', guestId);
  }
  return guestId;
}

// ---- Cart ----
export function getCart() {
  return getItem(STORAGE_KEYS.CART, []);
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    const currentQty = Number(existing.qty || existing.quantity || 1);
    const newQty = Math.min(currentQty + qty, 10);
    existing.qty = newQty;
    existing.quantity = newQty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0] || product.image,
      brand: product.brand,
      qty,
      quantity: qty,
      seller: product.seller || 'KartHub',
    });
  }
  setItem(STORAGE_KEYS.CART, cart);
  emit('cart:change', cart);

  // Sync to MongoDB backend
  const cartUserId = getCartUserId();
  if (cartUserId) {
    dbSaveCart(cartUserId, cart);
  }

  return cart;
}

export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  setItem(STORAGE_KEYS.CART, cart);
  emit('cart:change', cart);

  const cartUserId = getCartUserId();
  if (cartUserId) {
    dbSaveCart(cartUserId, cart);
  }

  return cart;
}

export function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (qty <= 0) {
      return removeFromCart(productId);
    }
    item.qty = Math.min(qty, 10);
  }
  setItem(STORAGE_KEYS.CART, cart);
  emit('cart:change', cart);

  const cartUserId = getCartUserId();
  if (cartUserId) {
    dbSaveCart(cartUserId, cart);
  }

  return cart;
}

export function clearCart() {
  setItem(STORAGE_KEYS.CART, []);
  emit('cart:change', []);

  const cartUserId = getCartUserId();
  if (cartUserId) {
    dbSaveCart(cartUserId, []);
  }
}

export function getCartCount() {
  const cart = getCart();
  return Array.isArray(cart) ? cart.length : 0;
}

export function getCartTotal() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.qty) || 1)), 0);
  const originalTotal = cart.reduce((sum, item) => sum + (((Number(item.originalPrice) || Number(item.price)) || 0) * (Number(item.qty) || 1)), 0);
  const discount = Math.max(0, originalTotal - subtotal);
  const delivery = subtotal > 499 ? 0 : 40;
  const total = subtotal + delivery;
  const totalQty = cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
  return { subtotal, originalTotal, discount, delivery, total, itemCount: cart.length, totalQty };
}

// ---- Wishlist ----
export function getWishlist() {
  return getItem(STORAGE_KEYS.WISHLIST, []);
}

export function toggleWishlist(product) {
  let wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.id === product.id);
  let added = false;
  if (index >= 0) {
    wishlist.splice(index, 1);
    added = false;
  } else {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0] || product.image,
      brand: product.brand,
    });
    added = true;
  }
  setItem(STORAGE_KEYS.WISHLIST, wishlist);
  emit('wishlist:change', wishlist);

  const cartUserId = getCartUserId();
  if (cartUserId) {
    dbSaveWishlist(cartUserId, wishlist);
  }

  return added;
}

export function isInWishlist(productId) {
  return getWishlist().some(item => item.id === productId);
}

// ---- Orders ----
export function getOrders() {
  return getItem(STORAGE_KEYS.ORDERS, []);
}

export async function placeOrder(address, paymentMethod) {
  const cart = getCart();
  if (cart.length === 0) return null;
  const totals = getCartTotal();
  const user = getCurrentUser();
  
  const order = {
    id: 'ORD' + Date.now() + Math.random().toString(36).substring(2, 6).toUpperCase(),
    userId: user?.id || 'GUEST',
    customerName: address.name || user?.name || 'Customer',
    customerEmail: address.email || user?.email || '',
    items: [...cart],
    address,
    paymentMethod,
    subtotal: totals.subtotal,
    discount: totals.discount,
    delivery: totals.delivery,
    total: totals.total,
    status: 'Processing',
    date: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  };

  // Save to database
  const createdOrder = await dbCreateOrder(order);

  // Update local cache
  const orders = getOrders();
  orders.unshift(createdOrder);
  setItem(STORAGE_KEYS.ORDERS, orders);

  clearCart();
  emit('order:placed', createdOrder);
  return createdOrder;
}

// ---- Recently Viewed ----
export function getRecentlyViewed() {
  return getItem(STORAGE_KEYS.RECENTLY_VIEWED, []);
}

export function addRecentlyViewed(product) {
  let recent = getRecentlyViewed();
  recent = recent.filter(item => item.id !== product.id);
  recent.unshift({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.images?.[0] || product.image,
    brand: product.brand,
    rating: product.rating,
    reviewCount: product.reviewCount,
    discount: product.discount,
  });
  if (recent.length > 20) recent = recent.slice(0, 20);
  setItem(STORAGE_KEYS.RECENTLY_VIEWED, recent);
}

// ---- Addresses ----
export function getAddresses() {
  return getItem(STORAGE_KEYS.ADDRESSES, []);
}

export function addAddress(address) {
  const addresses = getAddresses();
  address.id = 'ADDR' + Date.now();
  addresses.push(address);
  setItem(STORAGE_KEYS.ADDRESSES, addresses);
  return address;
}

// ---- Utility ----
export function formatPrice(price) {
  return '₹' + Number(price || 0).toLocaleString('en-IN');
}

export function formatPriceHTML(price) {
  const formatted = Number(price || 0).toLocaleString('en-IN');
  return `<span class="price-symbol">₹</span>${formatted}`;
}
