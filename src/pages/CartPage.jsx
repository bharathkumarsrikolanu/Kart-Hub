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
    <div className="cart-container">
      <style>{`
        .cart-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 24px 16px;
          box-sizing: border-box;
          width: 100%;
        }
        .cart-title {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 20px;
          color: #0F1111;
        }
        .cart-main-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
        }
        .cart-items-card {
          background: #FFF;
          border-radius: 10px;
          border: 1px solid #E5E7EB;
          padding: 20px;
          box-sizing: border-box;
        }
        .cart-summary-card {
          background: #FFF;
          border-radius: 10px;
          border: 1px solid #E5E7EB;
          padding: 20px;
          box-sizing: border-box;
          position: sticky;
          top: 80px;
        }
        .cart-single-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #F3F4F6;
          align-items: center;
        }
        .cart-item-img-box {
          width: 110px;
          height: 110px;
          flex-shrink: 0;
          border-radius: 6px;
          overflow: hidden;
          background: #FAFAFA;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .cart-item-img-box img {
          max-width: 92%;
          max-height: 92%;
          object-fit: contain;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .cart-container {
            padding: 12px 10px;
          }
          .cart-title {
            font-size: 20px;
            margin-bottom: 14px;
          }
          .cart-main-grid {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .cart-items-card,
          .cart-summary-card {
            padding: 14px;
          }
          .cart-summary-card {
            position: static;
          }
          .cart-single-item {
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 12px;
            align-items: start;
          }
          .cart-item-img-box {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>

      <h1 className="cart-title">Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h1>

      <div className="cart-main-grid">
        {/* Cart Items List */}
        <div className="cart-items-card">
          {cart.map(item => (
            <div key={item.id} className="cart-single-item">
              <div 
                className="cart-item-img-box"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>{item.brand}</span>
                <h3 
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{ 
                    fontSize: 15, 
                    fontWeight: 600, 
                    margin: '3px 0 6px', 
                    cursor: 'pointer', 
                    color: '#111827',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {item.name}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#0F1111' }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice > item.price && (
                    <span style={{ fontSize: 12, color: '#6B7280', textDecoration: 'line-through' }}>
                      ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Quantity & Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D1D5DB', borderRadius: 6, background: '#F9FAFB' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ padding: '3px 9px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700 }}
                    >
                      -
                    </button>
                    <span style={{ padding: '3px 10px', fontSize: 13, fontWeight: 700 }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ padding: '3px 9px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700 }}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#DC2626', fontSize: 13, cursor: 'pointer', fontWeight: 600, padding: 0 }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'right', marginTop: 16, fontSize: 15 }}>
            Subtotal ({cartCount} items): <strong style={{ fontSize: 19, color: '#0F1111' }}>₹{cartSubtotal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="cart-summary-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#059669', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            <ShieldCheck size={18} /> Part of your order qualifies for FREE Delivery.
          </div>

          <div style={{ fontSize: 16, marginBottom: 16 }}>
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
            onClick={() => navigate('/checkout')}
            style={{ 
              width: '100%', 
              padding: '12px 18px', 
              borderRadius: 8, 
              background: '#FFD814', 
              color: '#0F1111', 
              border: '1px solid #FCD200', 
              fontWeight: 800, 
              fontSize: 15, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            Proceed to Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
