import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export function CartPage({ navigate }) {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, cartSavings, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: 450, margin: '0 auto' }}>
          <ShoppingBag size={64} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Your KartHub Cart is empty</h2>
          <p style={{ color: '#565959', marginBottom: 24 }}>Your shopping cart is waiting. Give it purpose — fill it with electronics, fashion, groceries, and more.</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 16px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>Shopping Cart ({cartCount} items)</h1>

      <div className="cart-page" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
        {/* Cart Items List */}
        <div className="cart-items-wrapper" style={{ background: '#FFF', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20 }}>
          {cart.map(item => (
            <div key={item.id} className="cart-item" style={{ display: 'flex', gap: 20, padding: '16px 0', borderBottom: '1px solid #F3F4F6' }}>
              <div 
                className="cart-item-image"
                onClick={() => navigate(`/product/${item.id}`)}
                style={{ cursor: 'pointer', width: 140, height: 140, flexShrink: 0, borderRadius: 6, overflow: 'hidden' }}
              >
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>{item.brand}</span>
                <h3 
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{ fontSize: 16, fontWeight: 600, margin: '4px 0 8px', cursor: 'pointer', color: '#111827' }}
                >
                  {item.name}
                </h3>
                
                <div style={{ color: '#059669', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>In Stock</div>

                {/* Quantity & Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D1D5DB', borderRadius: 6 }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ padding: '4px 10px', background: '#F9FAFB', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}
                    >
                      -
                    </button>
                    <span style={{ padding: '4px 12px', fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ padding: '4px 10px', background: '#F9FAFB', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#DC2626', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: 'right', minWidth: 100 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F1111' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
                {item.originalPrice > item.price && (
                  <div style={{ fontSize: 13, color: '#6B7280', textDecoration: 'line-through' }}>
                    ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'right', marginTop: 16, fontSize: 16 }}>
            Subtotal ({cartCount} items): <strong style={{ fontSize: 20, color: '#0F1111' }}>₹{cartSubtotal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="cart-summary-box" style={{ background: '#FFF', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#059669', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            <ShieldCheck size={18} /> Part of your order qualifies for FREE Delivery.
          </div>

          <div style={{ fontSize: 18, marginBottom: 16 }}>
            Subtotal ({cartCount} items):
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0F1111', marginTop: 4 }}>
              ₹{cartSubtotal.toLocaleString('en-IN')}
            </div>
          </div>

          {cartSavings > 0 && (
            <div style={{ background: '#ECFDF5', color: '#065F46', padding: '8px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
              🎉 You are saving ₹{cartSavings.toLocaleString('en-IN')} on this order!
            </div>
          )}

          <button 
            className="btn btn-primary btn-block btn-lg"
            onClick={() => navigate('/checkout')}
            style={{ fontWeight: 700 }}
          >
            Proceed to Checkout <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
