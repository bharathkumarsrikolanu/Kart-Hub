import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ShieldCheck, Lock } from 'lucide-react';

export function LoginPage({ query, navigate }) {
  const isSignupMode = query?.mode === 'signup';
  const { login, signup } = useAuth();
  const { showToast } = useCart();

  const [mode, setMode] = useState(isSignupMode ? 'signup' : 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter an email address.', 'error');
      return;
    }

    setLoading(true);
    if (mode === 'signup') {
      await signup({ name, email, password, phone });
      showToast('🎉 Account created successfully!');
    } else {
      await login(email, password);
      showToast(`Welcome back, ${email.split('@')[0]}!`);
    }

    setLoading(false);
    navigate('/');
  };

  return (
    <div className="container" style={{ padding: '60px 16px', maxWidth: 420 }}>
      <div style={{ background: '#FFF', padding: 32, borderRadius: 10, border: '1px solid #E5E7EB', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 800 }}>Kart<span style={{ color: '#FF9900' }}>Hub</span></div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>
            {mode === 'signup' ? 'Create Your Account' : 'Sign in to KartHub'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Your Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="First and last name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Mobile Number</label>
                <input 
                  type="tel" 
                  placeholder="10-digit mobile number"
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                />
              </div>
            </>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="name@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Password</label>
            <input 
              type="password" 
              placeholder="At least 6 characters"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-primary btn-block btn-lg"
            style={{ fontWeight: 700 }}
          >
            {loading ? 'Processing...' : (mode === 'signup' ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#6B7280' }}>
          {mode === 'signup' ? (
            <p>Already have an account? <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>Sign In</button></p>
          ) : (
            <p>New to KartHub? <button onClick={() => setMode('signup')} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>Create your KartHub account</button></p>
          )}
        </div>
      </div>
    </div>
  );
}
