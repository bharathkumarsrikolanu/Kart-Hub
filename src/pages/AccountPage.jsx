import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { User, Package, Heart, Shield, LogOut } from 'lucide-react';

export function AccountPage({ navigate }) {
  const { user, logout } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container" style={{ padding: '32px 16px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Your Account</h1>

      <div className="account-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        <div 
          onClick={() => navigate('/orders')}
          style={{ background: '#FFF', padding: 24, borderRadius: 8, border: '1px solid #E5E7EB', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center' }}
        >
          <Package size={36} color="#2563EB" />
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>Your Orders</h3>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Track, return, or buy again</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/wishlist')}
          style={{ background: '#FFF', padding: 24, borderRadius: 8, border: '1px solid #E5E7EB', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center' }}
        >
          <Heart size={36} color="#EF4444" />
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>Your Wishlist</h3>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Saved items & favorite deals</p>
          </div>
        </div>

        {user.role === 'admin' && (
          <div 
            onClick={() => navigate('/admin')}
            style={{ background: '#FFF', padding: 24, borderRadius: 8, border: '1px solid #FEF3C7', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center' }}
          >
            <Shield size={36} color="#F59E0B" />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px', color: '#B45309' }}>Admin Panel</h3>
              <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Manage inventory & orders</p>
            </div>
          </div>
        )}
      </div>

      <div style={{ background: '#FFF', padding: 24, borderRadius: 8, border: '1px solid #E5E7EB', marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Profile Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>Full Name</span>
            <strong style={{ fontSize: 15 }}>{user.name}</strong>
          </div>
          <div>
            <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>Email Address</span>
            <strong style={{ fontSize: 15 }}>{user.email}</strong>
          </div>
        </div>

        <button 
          onClick={() => { logout(); navigate('/'); }}
          className="btn btn-outline" 
          style={{ marginTop: 24, color: '#DC2626', borderColor: '#FECACA', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <LogOut size={16} /> Sign Out of Account
        </button>
      </div>
    </div>
  );
}
