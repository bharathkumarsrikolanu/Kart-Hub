import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { categories } from '../data/categories.js';
import { MapPin, Search, ShoppingCart, User, Package, Heart, LogOut } from 'lucide-react';

export function Header({ navigate, currentRoute }) {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const searchRef = useRef(null);

  const userName = user ? user.name.split(' ')[0] : null;

  // Filter search suggestions
  const suggestions = searchQuery.trim().length >= 2 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      const catParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}${catParam}`);
      setShowSuggestions(false);
    }
  };

  return (
    <header className="main-header">
      <div className="header-inner">
        {/* Logo */}
        <a href="#/" className="header-logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <div>
            <div className="logo-text">Kart<span>Hub</span></div>
            <div className="logo-suffix">.com</div>
          </div>
        </a>

        {/* Deliver To */}
        <div className="header-deliver">
          <MapPin size={16} color="#CCC" />
          <div>
            <span className="deliver-label">Deliver to</span>
            <span className="deliver-location">India 🇮🇳</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="header-search" ref={searchRef}>
          <select 
            className="search-category" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search KartHub.com" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
          />
          <button className="search-btn" onClick={handleSearchSubmit} aria-label="Search">
            <Search size={20} />
          </button>

          {/* Live Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions active">
              {suggestions.map(p => (
                <div 
                  key={p.id} 
                  className="search-suggestion-item"
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    setShowSuggestions(false);
                    setSearchQuery('');
                  }}
                >
                  <Search size={16} style={{ color: '#888' }} />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="header-nav">
          {/* Account */}
          <div 
            className="header-nav-item" 
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
          >
            <span className="nav-line1">Hello, {userName || 'Sign in'}</span>
            <span className="nav-line2">Account & Lists ▾</span>

            {showAccountDropdown && (
              <div className="account-dropdown active">
                {user ? (
                  <>
                    <div className="dropdown-header">
                      <p style={{ fontSize: '14px', color: '#0F1111', fontWeight: 600 }}>Hello, {user.name}</p>
                      <p style={{ fontSize: '12px', color: '#565959' }}>{user.email}</p>
                    </div>
                    <div className="dropdown-links">
                      <a href="#/account" onClick={(e) => { e.preventDefault(); navigate('/account'); }} className="dropdown-link">
                        <User size={16} /> Your Account
                      </a>
                      <a href="#/orders" onClick={(e) => { e.preventDefault(); navigate('/orders'); }} className="dropdown-link">
                        <Package size={16} /> Your Orders
                      </a>
                      <a href="#/wishlist" onClick={(e) => { e.preventDefault(); navigate('/wishlist'); }} className="dropdown-link">
                        <Heart size={16} /> Wishlist
                      </a>
                      <a 
                        className="dropdown-link" 
                        style={{ cursor: 'pointer', color: '#DC2626' }}
                        onClick={() => { logout(); navigate('/'); }}
                      >
                        <LogOut size={16} /> Sign Out
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dropdown-header">
                      <button 
                        onClick={() => navigate('/login')} 
                        className="btn btn-primary btn-block" 
                        style={{ marginBottom: '8px' }}
                      >
                        Sign In
                      </button>
                      <p style={{ fontSize: '12px', color: '#565959' }}>
                        New customer? <a href="#/login?mode=signup" onClick={(e) => { e.preventDefault(); navigate('/login?mode=signup'); }}>Start here</a>
                      </p>
                    </div>
                    <div className="dropdown-links">
                      <a href="#/account" onClick={(e) => { e.preventDefault(); navigate('/account'); }} className="dropdown-link">
                        <User size={16} /> Your Account
                      </a>
                      <a href="#/orders" onClick={(e) => { e.preventDefault(); navigate('/orders'); }} className="dropdown-link">
                        <Package size={16} /> Your Orders
                      </a>
                      <a href="#/wishlist" onClick={(e) => { e.preventDefault(); navigate('/wishlist'); }} className="dropdown-link">
                        <Heart size={16} /> Wishlist
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Orders */}
          <a href="#/orders" onClick={(e) => { e.preventDefault(); navigate('/orders'); }} className="header-nav-item">
            <span className="nav-line1">Returns</span>
            <span className="nav-line2">& Orders</span>
          </a>

          {/* Cart */}
          <a href="#/cart" onClick={(e) => { e.preventDefault(); navigate('/cart'); }} className="header-cart">
            <div className="cart-icon-wrap">
              <ShoppingCart size={26} />
              {cartCount > 0 && (
                <span className="cart-count bounce">{cartCount}</span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </a>
        </div>
      </div>
    </header>
  );
}
