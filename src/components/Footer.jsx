import React from 'react';
import { Mail, Phone, ChevronUp } from 'lucide-react';

export function Footer({ navigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer">
      <div className="footer-back-to-top" onClick={scrollToTop}>
        <ChevronUp size={16} style={{ display: 'inline', marginRight: 4 }} />
        Back to top
      </div>

      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Get to Know Us</h3>
            <ul>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>About KartHub</a></li>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Careers</a></li>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Press Releases</a></li>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>KartHub Science</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Connect with Us</h3>
            <ul>
              <li><a href="mailto:bharathkumaraiwork@gmail.com"><Mail size={14} style={{ display: 'inline', marginRight: 6 }} /> Email Support</a></li>
              <li><a href="tel:+916304505750"><Phone size={14} style={{ display: 'inline', marginRight: 6 }} /> +91 6304505750</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Make Money with Us</h3>
            <ul>
              <li><a href="#/admin" onClick={(e) => { e.preventDefault(); navigate('/admin'); }}>Sell on KartHub</a></li>
              <li><a href="#/admin" onClick={(e) => { e.preventDefault(); navigate('/admin'); }}>Seller Hub</a></li>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Become an Affiliate</a></li>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Fulfilment by KartHub</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Let Us Help You</h3>
            <ul>
              <li><a href="#/account" onClick={(e) => { e.preventDefault(); navigate('/account'); }}>Your Account</a></li>
              <li><a href="#/orders" onClick={(e) => { e.preventDefault(); navigate('/orders'); }}>Returns Centre</a></li>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>100% Purchase Protection</a></li>
              <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Help</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <div className="logo-text" style={{ fontSize: '22px', fontWeight: 800, color: '#FFF' }}>
              Kart<span style={{ color: '#FF9900' }}>Hub</span>.com
            </div>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} KartHub.com, Inc. Built with React.js, Node.js & MongoDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
