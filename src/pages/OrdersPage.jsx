import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Package, CheckCircle2 } from 'lucide-react';

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
    <div className="orders-container">
      <style>{`
        .orders-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 24px 16px;
          box-sizing: border-box;
          width: 100%;
        }
        .orders-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 20px;
          color: #0F1111;
        }
        .order-card {
          background: #FFF;
          border-radius: 10px;
          border: 1px solid #E5E7EB;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .order-header-bar {
          background: #F9FAFB;
          padding: 12px 18px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #E5E7EB;
          font-size: 13px;
          color: #4B5563;
          flex-wrap: wrap;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .orders-container {
            padding: 12px 10px;
          }
          .orders-title {
            font-size: 20px;
            margin-bottom: 14px;
          }
          .order-header-bar {
            flex-direction: column;
            gap: 8px;
            padding: 10px 14px;
          }
        }
      `}</style>

      <h1 className="orders-title">Your Orders ({orders.length})</h1>

      <div>
        {orders.map(order => (
          <div key={order.id} className="order-card">
            {/* Order Header */}
            <div className="order-header-bar">
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase', fontSize: 10, fontWeight: 700, color: '#6B7280' }}>Order Placed</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>{new Date(order.date || order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase', fontSize: 10, fontWeight: 700, color: '#6B7280' }}>Total</span>
                  <span style={{ fontWeight: 800, color: '#111827' }}>₹{(order.total || 0).toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase', fontSize: 10, fontWeight: 700, color: '#6B7280' }}>Ship To</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{order.customerName}</span>
                </div>
              </div>

              <div>
                <span style={{ display: 'block', textTransform: 'uppercase', fontSize: 10, fontWeight: 700, color: '#6B7280' }}>Order #</span>
                <span style={{ fontWeight: 700, color: '#2563EB' }}>{order.id}</span>
              </div>
            </div>

            {/* Order Body */}
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#059669', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>
                <CheckCircle2 size={16} /> Status: {order.status || 'Processing'}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(order.items || []).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <img 
                      src={item.image || 'https://via.placeholder.com/60'} 
                      alt="" 
                      style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 6, background: '#F9FAFB', border: '1px solid #E5E7EB', padding: 2 }} 
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 2px', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                      <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Qty: {item.quantity || 1} • ₹{(item.price || 0).toLocaleString('en-IN')}</p>
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

export default OrdersPage;
