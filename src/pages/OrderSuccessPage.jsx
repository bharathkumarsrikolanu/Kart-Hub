import React from 'react';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

export function OrderSuccessPage({ params, navigate }) {
  const orderId = params.id || ('ORD' + Date.now());

  return (
    <div className="container" style={{ padding: '60px 16px', maxWidth: 600, textAlign: 'center' }}>
      <div style={{ background: '#FFF', padding: 40, borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 16px' }} />
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#065F46', marginBottom: 8 }}>Order Placed Successfully!</h1>
        <p style={{ color: '#4B5563', fontSize: 16, marginBottom: 20 }}>Thank you for shopping with KartHub.</p>

        <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: 8, marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Order Reference ID:</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '4px 0 0' }}>{orderId}</p>
        </div>

        <p style={{ color: '#059669', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
          📦 Estimated Delivery: Within 3 to 5 business days
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-outline" onClick={() => navigate('/orders')}>
            <Package size={16} style={{ display: 'inline', marginRight: 4 }} /> View Your Orders
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
