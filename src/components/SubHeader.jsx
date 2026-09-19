import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { categories } from '../data/categories.js';
import { Menu, ChevronRight, User, Settings, Phone, Mail, HelpCircle, RotateCcw } from 'lucide-react';

export function SubHeader({ navigate, currentRoute }) {
  const { user, isAdmin, logout } = useAuth();
  const [megaOpen, setMegaOpen] = useState(false);

  const isActive = (path) => currentRoute === path;

  return (
    <>
      <nav className="sub-header">
        <div className="sub-header-inner">
          <button 
            className="sub-header-item mega-menu-trigger" 
            onClick={() => setMegaOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Menu size={18} />
            <span>All</span>
          </button>

          <a 
            href="#/" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }} 
            className={`sub-header-item ${isActive('/') ? 'active' : ''}`}
            style={{ fontWeight: 600 }}
          >
            🏠 Home
          </a>
          <a 
            href="#/category/Electronics" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Electronics'); }} 
            className={`sub-header-item ${currentRoute.includes('Electronics') ? 'active' : ''}`}
          >
            Electronics
          </a>
          <a 
            href="#/category/Fashion" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Fashion'); }} 
            className={`sub-header-item ${currentRoute.includes('Fashion') ? 'active' : ''}`}
          >
            Fashion
          </a>
          <a 
            href="#/category/Home & Kitchen" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Home & Kitchen'); }} 
            className={`sub-header-item ${currentRoute.includes('Home') ? 'active' : ''}`}
          >
            Home & Kitchen
          </a>
          <a 
            href="#/category/Books" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Books'); }} 
            className={`sub-header-item ${currentRoute.includes('Books') ? 'active' : ''}`}
          >
            Books
          </a>
          <a 
            href="#/category/Gaming" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Gaming'); }} 
            className={`sub-header-item ${currentRoute.includes('Gaming') ? 'active' : ''}`}
          >
            Gaming
          </a>
          <a 
            href="#/category/Beauty" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Beauty'); }} 
            className={`sub-header-item ${currentRoute.includes('Beauty') ? 'active' : ''}`}
          >
            Beauty
          </a>
          <a 
            href="#/category/Sports" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Sports'); }} 
            className={`sub-header-item ${currentRoute.includes('Sports') ? 'active' : ''}`}
          >
            Sports
          </a>
          <a 
            href="#/deals" 
            onClick={(e) => { e.preventDefault(); navigate('/deals'); }} 
            className={`sub-header-item ${isActive('/deals') ? 'active' : ''}`}
          >
            Today's Deals
          </a>
          <a 
            href="#/category/Grocery" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Grocery'); }} 
            className={`sub-header-item ${currentRoute.includes('Grocery') ? 'active' : ''}`}
          >
            Grocery
          </a>
          <a 
            href="#/category/Toys %26 Baby" 
            onClick={(e) => { e.preventDefault(); navigate('/category/Toys %26 Baby'); }} 
            className={`sub-header-item ${currentRoute.includes('Toys') ? 'active' : ''}`}
          >
            Toys & Baby
          </a>

          {isAdmin && (
            <a 
              href="#/admin" 
              onClick={(e) => { e.preventDefault(); navigate('/admin'); }} 
              className={`sub-header-item ${isActive('/admin') ? 'active' : ''}`}
              style={{ marginLeft: 'auto', color: '#FF9900', fontWeight: 700 }}
            >
              ⚙ Admin Panel
            </a>
          )}
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      {megaOpen && (
        <>
          <div className="mega-menu-overlay active" onClick={() => setMegaOpen(false)}></div>
          <div className="mega-menu active">
            <div className="mega-menu-header">
              <User size={24} />
              <span>Hello, {user ? user.name.split(' ')[0] : 'Sign in'}</span>
            </div>

            <div className="mega-menu-section">
              <div className="mega-menu-section-title">Shop By Category</div>
              {categories.map(cat => (
                <a 
                  key={cat.name}
                  href={`#/category/${encodeURIComponent(cat.name)}`}
                  className="mega-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/category/${encodeURIComponent(cat.name)}`);
                    setMegaOpen(false);
                  }}
                >
                  <span>{cat.icon} {cat.name}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
            </div>

            <div className="mega-menu-section">
              <div className="mega-menu-section-title">Help & Settings</div>
              <a href="#/account" className="mega-menu-link" onClick={(e) => { e.preventDefault(); navigate('/account'); setMegaOpen(false); }}>
                <span>Your Account</span>
              </a>
              <a href="#/orders" className="mega-menu-link" onClick={(e) => { e.preventDefault(); navigate('/orders'); setMegaOpen(false); }}>
                <span>Your Orders</span>
              </a>
              {user ? (
                <a className="mega-menu-link" onClick={() => { logout(); setMegaOpen(false); navigate('/'); }} style={{ cursor: 'pointer' }}>
                  <span>Sign Out</span>
                </a>
              ) : (
                <a href="#/login" className="mega-menu-link" onClick={(e) => { e.preventDefault(); navigate('/login'); setMegaOpen(false); }}>
                  <span>Sign In</span>
                </a>
              )}
            </div>

            <div className="mega-menu-section">
              <div className="mega-menu-section-title">📞 Help & Support</div>
              <a href="mailto:bharathkumaraiwork@gmail.com" className="mega-menu-link">
                <span><Mail size={14} style={{ display: 'inline', marginRight: 6 }} /> bharathkumaraiwork@gmail.com</span>
              </a>
              <a href="tel:+916304505750" className="mega-menu-link">
                <span><Phone size={14} style={{ display: 'inline', marginRight: 6 }} /> +91 6304505750</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
