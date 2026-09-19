import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbSaveCart, dbSaveWishlist } from '../services/db.js';
import { getCartUserId } from '../store.js';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('karthub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('karthub_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('karthub_cart', JSON.stringify(cart));
      const uid = getCartUserId();
      if (uid) {
        dbSaveCart(uid, cart);
      }
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('karthub_wishlist', JSON.stringify(wishlist));
      const uid = getCartUserId();
      if (uid) {
        dbSaveWishlist(uid, wishlist);
      }
    } catch {}
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx >= 0) {
        return prev.map((item, i) => {
          if (i === idx) {
            const currentQty = Number(item.quantity || item.qty || 1);
            const newQty = Math.min(currentQty + quantity, 10);
            return { ...item, quantity: newQty, qty: newQty };
          }
          return item;
        });
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        originalPrice: Number(product.originalPrice || product.price),
        discount: Number(product.discount || 0),
        image: Array.isArray(product.images) && product.images[0] ? product.images[0] : (product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'),
        brand: product.brand || 'KartHub',
        category: product.category,
        seller: product.seller,
        stock: product.stock,
        quantity: Number(quantity),
        qty: Number(quantity)
      }];
    });
    showToast(`✓ Added "${product.name?.substring(0, 30)}..." to cart!`);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Number(quantity), qty: Number(quantity) } : item));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Removed item from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast('Removed from Wishlist.', 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast('❤️ Added to Wishlist!');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const cartCount = cart.reduce((total, item) => total + Number(item.quantity || item.qty || 1), 0);
  const cartSubtotal = cart.reduce((total, item) => total + (Number(item.price) * Number(item.quantity || item.qty || 1)), 0);
  const cartSavings = cart.reduce((total, item) => total + ((Number(item.originalPrice || item.price) - Number(item.price)) * Number(item.quantity || item.qty || 1)), 0);

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      cartCount,
      cartSubtotal,
      cartSavings,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
      showToast,
      toasts
    }}>
      {children}
      {/* Toast Notification Container */}
      <div className="toast-container" style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 99999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: t.type === 'error' ? '#EF4444' : t.type === 'info' ? '#3B82F6' : '#10B981',
            color: '#FFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {t.message}
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
