import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Package, Heart, Shield, LogOut, User } from 'lucide-react';

export function AccountPage({ navigate }) {
  const { user, logout } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="account-container">
      <style>{`
        .account-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 24px 16px;
          box-sizing: border-box;
          width: 100%;
        }
        .account-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .account-card {
          background: #FFF;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #E5E7EB;
          cursor: pointer;
          display: flex;
          gap: 14px;
          align-items: center;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .account-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .profile-card {
          background: #FFF;
          padding: 24px;
          border-radius: 10px;
          border: 1px solid #E5E7EB;
          margin-top: 24px;
        }
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .account-container {
            padding: 14px 10px;
          }
          .account-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .profile-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .profile-card {
            padding: 16px;
          }
        }
      `}</style>

      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: '#0F1111' }}>Your Account</h1>

      <div className="account-grid">
        <div className="account-card" onClick={() => navigate('/orders')}>
          <div style={{ background: '#EFF6FF', padding: 10, borderRadius: 8, color: '#2563EB' }}>
            <Package size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 2px' }}>Your Orders</h3>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Track, return, or buy again</p>
          </div>
        </div>

        <div className="account-card" onClick={() => navigate('/wishlist')}>
          <div style={{ background: '#FEF2F2', padding: 10, borderRadius: 8, color: '#EF4444' }}>
            <Heart size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 2px' }}>Your Wishlist</h3>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Saved items & favorite deals</p>
          </div>
        </div>

        {user.role === 'admin' && (
          <div className="account-card" onClick={() => navigate('/admin')} style={{ borderColor: '#FDE68A' }}>
            <div style={{ background: '#FFFBEB', padding: 10, borderRadius: 8, color: '#D97706' }}>
              <Shield size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 2px', color: '#B45309' }}>Admin Panel</h3>
              <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Manage inventory & orders</p>
            </div>
          </div>
        )}
      </div>

      <div className="profile-card">
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#111827' }}>Profile Information</h2>
        <div className="profile-grid">
          <div style={{ background: '#F9FAFB', padding: '12px 14px', borderRadius: 6, border: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: 12, color: '#6B7280', display: 'block', fontWeight: 600 }}>Full Name</span>
            <strong style={{ fontSize: 15, color: '#111827' }}>{user.name}</strong>
          </div>
          <div style={{ background: '#F9FAFB', padding: '12px 14px', borderRadius: 6, border: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: 12, color: '#6B7280', display: 'block', fontWeight: 600 }}>Email Address</span>
            <strong style={{ fontSize: 15, color: '#111827' }}>{user.email}</strong>
          </div>
        </div>

        <button 
          onClick={() => { logout(); navigate('/'); }}
          style={{ 
            marginTop: 20, 
            padding: '10px 18px', 
            borderRadius: 6, 
            background: '#FFF', 
            color: '#DC2626', 
            border: '1px solid #FECACA', 
            fontSize: 14, 
            fontWeight: 700, 
            cursor: 'pointer', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 6 
          }}
        >
          <LogOut size={16} /> Sign Out of Account
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
