import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export function CheckoutPage({ navigate }) {
  const { cart, cartSubtotal, clearCart, showToast } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: 'Telangana',
    pincode: '',
    paymentMethod: 'COD'
  });

  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.street || !formData.city || !formData.pincode) {
      showToast('Please fill in all delivery address fields.', 'error');
      return;
    }

    setLoading(true);

    const orderId = 'ORD' + Date.now();
    const orderPayload = {
      id: orderId,
      userId: user?.id || ('USR' + Date.now()),
      customerName: formData.fullName,
      customerEmail: formData.email || 'customer@karthub.com',
      items: cart,
      total: cartSubtotal,
      subtotal: cartSubtotal,
      paymentMethod: formData.paymentMethod,
      address: {
        name: formData.fullName,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      status: 'Processing',
      date: new Date().toISOString()
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
    } catch {}

    clearCart();
    setLoading(false);
    navigate(`/order-success/${orderId}`);
  };

  return (
    <div className="checkout-container">
      <style>{`
        .checkout-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 16px;
          box-sizing: border-box;
          width: 100%;
        }
        .checkout-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 20px;
          color: #0F1111;
        }
        .checkout-layout-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
        }
        .checkout-form-card {
          background: #FFF;
          padding: 24px;
          border-radius: 10px;
          border: 1px solid #E5E7EB;
          box-sizing: border-box;
          width: 100%;
        }
        .checkout-summary-card {
          background: #FFF;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #E5E7EB;
          box-sizing: border-box;
          width: 100%;
          position: sticky;
          top: 80px;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }
        .checkout-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #D1D5DB;
          border-radius: 6px;
          font-size: 14px;
          box-sizing: border-box;
          background: #FFF;
        }
        .checkout-input:focus {
          border-color: #FF9900;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 153, 0, 0.2);
        }

        /* Responsive Mobile adjustments */
        @media (max-width: 768px) {
          .checkout-container {
            padding: 12px 10px;
          }
          .checkout-title {
            font-size: 20px;
            margin-bottom: 14px;
          }
          .checkout-layout-grid {
            display: flex;
            flex-direction: column-reverse;
            gap: 16px;
            width: 100%;
          }
          .checkout-summary-card {
            position: static;
            padding: 16px;
          }
          .checkout-form-card {
            padding: 16px;
          }
          .form-row-2,
          .form-row-3 {
            grid-template-columns: 1fr !important;
            gap: 12px;
            margin-bottom: 12px;
          }
        }
      `}</style>

      <h1 className="checkout-title">Checkout & Place Order</h1>

      <div className="checkout-layout-grid">
        {/* Delivery Form */}
        <form onSubmit={handleSubmitOrder} className="checkout-form-card">
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#111827' }}>
            1. Delivery Address
          </h2>

          <div className="form-row-2">
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName} 
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="checkout-input"
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Mobile Phone</label>
              <input 
                type="tel" 
                required 
                placeholder="10-digit mobile number"
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="checkout-input"
              />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Street Address</label>
            <input 
              type="text" 
              required 
              placeholder="House/Flat number, Building, Street name, Area"
              value={formData.street} 
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="checkout-input"
            />
          </div>

          <div className="form-row-3">
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>City</label>
              <input 
                type="text" 
                required 
                placeholder="City"
                value={formData.city} 
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="checkout-input"
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>State</label>
              <input 
                type="text" 
                required 
                placeholder="State"
                value={formData.state} 
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="checkout-input"
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>PIN Code</label>
              <input 
                type="text" 
                required 
                placeholder="6-digit PIN"
                value={formData.pincode} 
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="checkout-input"
              />
            </div>
          </div>

          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#111827', borderTop: '1px solid #E5E7EB', paddingTop: 18 }}>
            2. Select Payment Mode
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              { id: 'COD', label: 'Cash on Delivery (Pay on arrival)' },
              { id: 'UPI', label: 'UPI / Google Pay / PhonePe / Paytm' },
              { id: 'Card', label: 'Credit or Debit Card' }
            ].map(m => (
              <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', border: formData.paymentMethod === m.id ? '2px solid #FF9900' : '1px solid #E5E7EB', borderRadius: 8, cursor: 'pointer', background: formData.paymentMethod === m.id ? '#FFFDF5' : '#FFF' }}>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={formData.paymentMethod === m.id} 
                  onChange={() => setFormData({ ...formData, paymentMethod: m.id })} 
                />
                <span style={{ fontWeight: 600, fontSize: 14, color: '#0F1111' }}>{m.label}</span>
              </label>
            ))}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 8,
              background: '#FFA41C',
              color: '#0F1111',
              border: '1px solid #FF8F00',
              fontWeight: 800,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            {loading ? 'Placing Order...' : `Place Your Order — ₹${cartSubtotal.toLocaleString('en-IN')}`}
          </button>
        </form>

        {/* Order Summary */}
        <div className="checkout-summary-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: '#111827' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: '#4B5563' }}>
            <span>Items ({cart.length}):</span>
            <span style={{ fontWeight: 600, color: '#111827' }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#059669' }}>
            <span>Delivery:</span>
            <span style={{ fontWeight: 700 }}>FREE</span>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 12, marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, color: '#0F1111' }}>
            <span>Order Total:</span>
            <span style={{ color: '#B12704' }}>₹${cartSubtotal.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lock size={14} color="#059669" /> 256-bit SSL Secure Checkout
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
