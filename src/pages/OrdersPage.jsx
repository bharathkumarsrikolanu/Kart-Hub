import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Package, Clock, CheckCircle2, Truck, ArrowRight } from 'lucide-react';

export function OrdersPage({ navigate }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            // Filter for current user if logged in
            if (user?.email && user.role !== 'admin') {
              setOrders(json.data.filter(o => o.customerEmail?.toLowerCase() === user.email.toLowerCase()));
            } else {
              setOrders(json.data);
            }
          }
        }
      } catch {}
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 16px', textAlign: 'center' }}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <Package size={64} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>No Orders Placed Yet</h2>
        <p style={{ color: '#565959', marginBottom: 24 }}>You haven't placed any orders yet. Discover items and start shopping today.</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 16px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>Your Orders ({orders.length})</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {orders.map(order => (
          <div key={order.id} style={{ background: '#FFF', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
            {/* Order Header */}
            <div style={{ background: '#F9FAFB', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', fontSize: 13, color: '#4B5563' }}>
              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase', fontSize: 11, fontWeight: 600 }}>Order Placed</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{new Date(order.date || order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase', fontSize: 11, fontWeight: 600 }}>Total</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>₹{(order.total || 0).toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase', fontSize: 11, fontWeight: 600 }}>Ship To</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{order.customerName}</span>
                </div>
              </div>

              <div>
                <span style={{ display: 'block', textTransform: 'uppercase', fontSize: 11, fontWeight: 600 }}>Order #</span>
                <span style={{ fontWeight: 700, color: '#2563EB' }}>{order.id}</span>
              </div>
            </div>

            {/* Order Body */}
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#059669', fontWeight: 700, marginBottom: 16 }}>
                <CheckCircle2 size={18} /> Status: {order.status || 'Processing'}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(order.items || []).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <img 
                      src={item.image || 'https://via.placeholder.com/60'} 
                      alt="" 
                      style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 4, background: '#F3F4F6' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>{item.name}</h4>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Qty: {item.quantity || 1} • ₹{(item.price || 0).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
