import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { Zap, Clock, Flame } from 'lucide-react';

export function DealsPage({ navigate }) {
  const { getBestDeals } = useProducts();
  const deals = getBestDeals(24);
  const [dealTime, setDealTime] = useState({ hours: 5, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setDealTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '80vh', padding: '24px 0 48px' }}>
      <div className="container" style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 16px' }}>
        {/* Deals Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #131921 0%, #232F3E 100%)',
          color: '#FFFFFF',
          borderRadius: '12px',
          padding: '28px 32px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,153,0,0.2)', color: '#FF9900', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 800, marginBottom: '8px' }}>
              <Flame size={14} /> DEALS OF THE DAY
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px 0', color: '#FFFFFF' }}>
              Mega Discounts & Limited Time Offers
            </h1>
            <p style={{ color: '#D1D5DB', fontSize: '15px', margin: 0 }}>
              Save up to 80% on top electronics, high-trend fashion, appliances, and more.
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#FF9900', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              <Clock size={13} /> SALE ENDS IN
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '1px', marginTop: '4px' }}>
              {String(dealTime.hours).padStart(2, '0')}h : {String(dealTime.minutes).padStart(2, '0')}m : {String(dealTime.seconds).padStart(2, '0')}s
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="section" style={{ padding: '24px' }}>
          <div className="section-header">
            <h2 className="section-title">
              <Zap size={20} color="#FFA41C" fill="#FFA41C" /> All Active Deals ({deals.length})
            </h2>
          </div>
          <div className="product-grid">
            {deals.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

