import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

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
      // Post order to MongoDB API
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
    <div className="container" style={{ padding: '24px 16px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Checkout & Place Order</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Delivery Form */}
        <form onSubmit={handleSubmitOrder} style={{ background: '#FFF', padding: 24, borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>1. Delivery Address</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.fullName} 
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Mobile Phone</label>
              <input 
                type="tel" 
                required 
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Street Address</label>
            <input 
              type="text" 
              required 
              placeholder="House/Flat number, Street name, Area"
              value={formData.street} 
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>City</label>
              <input 
                type="text" 
                required 
                value={formData.city} 
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>State</label>
              <input 
                type="text" 
                required 
                value={formData.state} 
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>PIN Code</label>
              <input 
                type="text" 
                required 
                value={formData.pincode} 
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
              />
            </div>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>2. Select Payment Mode</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              { id: 'COD', label: 'Cash on Delivery (Pay on arrival)' },
              { id: 'UPI', label: 'UPI / Google Pay / PhonePe / Paytm' },
              { id: 'Card', label: 'Credit or Debit Card' }
            ].map(m => (
              <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', border: '1px solid #E5E7EB', borderRadius: 6, cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="payment" 
                  checked={formData.paymentMethod === m.id} 
                  onChange={() => setFormData({ ...formData, paymentMethod: m.id })} 
                />
                <span style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</span>
              </label>
            ))}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-primary btn-block btn-lg"
            style={{ fontWeight: 700, background: '#FFA41C', color: '#0F1111' }}
          >
            {loading ? 'Placing Order...' : `Place Your Order — ₹${cartSubtotal.toLocaleString('en-IN')}`}
          </button>
        </form>

        {/* Order Summary */}
        <div style={{ background: '#FFF', padding: 20, borderRadius: 8, border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
            <span>Items ({cart.length}):</span>
            <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: '#059669' }}>
            <span>Delivery:</span>
            <span>FREE</span>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 12, marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800 }}>
            <span>Order Total:</span>
            <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
