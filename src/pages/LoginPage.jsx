import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { User, Key, Eye, EyeOff, X, Sparkles } from 'lucide-react';

export function LoginPage({ query, navigate }) {
  const isSignupMode = query?.mode === 'signup';
  const { login, signup, signInWithGoogle, signInWithBeSuperMind } = useAuth();
  const { showToast } = useCart();

  const [mode, setMode] = useState(isSignupMode ? 'signup' : 'login');
  const [identifier, setIdentifier] = useState(''); // Username or email
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(null); // 'besupermind' | 'buddhaceo' | 'google' | null

  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  const handleBeSuperMindSignIn = async (orgSlug = 'bceo', providerName = 'BeSuperMind') => {
    setSsoLoading(orgSlug === 'bceo' ? 'buddhaceo' : 'besupermind');
    try {
      showToast(`Connecting to ${providerName} SSO...`, 'info');
      await signInWithBeSuperMind(orgSlug);
    } catch (err) {
      showToast(err.message || `Failed to start ${providerName} sign-in`, 'error');
      setSsoLoading(null);
    }
  };

  const handleGoogleSignInClick = () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '31259564562-k8bskvd1gnk0f8ch3acv1cv3h5pheu46.apps.googleusercontent.com';

    if (window.google?.accounts?.oauth2) {
      try {
        setSsoLoading('google');
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
          prompt: 'select_account',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              showToast(`Google Sign-In: ${tokenResponse.error}`, 'error');
              setSsoLoading(null);
              return;
            }
            if (tokenResponse.access_token) {
              try {
                showToast('Connecting to your Google Account...', 'info');
                const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const googleProfile = await userinfoRes.json();
                
                if (googleProfile.email) {
                  const res = await signInWithGoogle({
                    email: googleProfile.email,
                    name: googleProfile.name || googleProfile.email.split('@')[0],
                    avatar: googleProfile.picture || '',
                    googleId: googleProfile.sub || ''
                  });
                  showToast(`🎉 Welcome, ${res.user.name}!`, 'success');
                  navigate('/account');
                }
              } catch (err) {
                showToast('Failed to fetch Google profile', 'error');
              } finally {
                setSsoLoading(null);
              }
            }
          }
        });

        // Opens official Google account chooser popup showing all signed-in accounts
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (e) {
        console.warn('Google OAuth token client error:', e);
      }
    }

    // Direct OAuth Popup fallback URL
    const redirectOrigin = window.location.origin;
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(googleClientId)}&redirect_uri=${encodeURIComponent(redirectOrigin)}&response_type=token&scope=email%20profile%20openid&prompt=select_account`;
    const popup = window.open(oauthUrl, 'Google_Sign_In', 'width=500,height=600');
    if (!popup) {
      showToast('Please allow popups to sign in with Google.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier) {
      showToast('Please enter your username or email.', 'error');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await signup({ name: name || identifier, email: identifier, password, phone });
        showToast('🎉 Account created successfully!', 'success');
      } else {
        await login(identifier, password);
        showToast(`Welcome back, ${identifier.split('@')[0]}!`, 'success');
      }
      navigate('/account');
    } catch (err) {
      showToast(err.message || 'Authentication error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      background: '#F8FAFC'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 420,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        border: '1px solid #E2E8F0',
        padding: '36px 32px 32px'
      }}>
        
        {/* Close Button (X) */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 20,
            left: 22,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.15s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <X size={20} strokeWidth={2.2} />
        </button>

        {/* Title & Brand */}
        <div style={{ textAlign: 'center', marginBottom: 28, marginTop: 4 }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, color: '#0F172A' }}>
            Kart<span style={{ color: '#FF9900' }}>Hub</span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748B' }}>
            {mode === 'signup' ? 'Create a new account' : 'Sign in to your account'}
          </p>
        </div>

        {/* Primary Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              marginBottom: 14,
              backgroundColor: '#FFFFFF',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '0 12px', color: '#94A3B8', borderRight: '1px solid #F1F5F9', display: 'flex', alignItems: 'center' }}>
                <User size={18} />
              </div>
              <input
                type="text"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  padding: '12px 14px',
                  fontSize: 14,
                  outline: 'none',
                  color: '#1E293B',
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          )}

          {/* Username or Email Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #E2E8F0',
            borderRadius: 8,
            marginBottom: 14,
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            transition: 'border-color 0.15s ease'
          }}>
            <div style={{ padding: '0 12px', color: '#94A3B8', borderRight: '1px solid #F1F5F9', display: 'flex', alignItems: 'center' }}>
              <User size={18} />
            </div>
            <input
              type="text"
              required
              placeholder="Username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                padding: '12px 14px',
                fontSize: 14,
                outline: 'none',
                color: '#1E293B',
                backgroundColor: 'transparent'
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #E2E8F0',
            borderRadius: 8,
            marginBottom: 18,
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            transition: 'border-color 0.15s ease'
          }}>
            <div style={{ padding: '0 12px', color: '#94A3B8', borderRight: '1px solid #F1F5F9', display: 'flex', alignItems: 'center' }}>
              <Key size={18} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                padding: '12px 14px',
                fontSize: 14,
                outline: 'none',
                color: '#1E293B',
                backgroundColor: 'transparent'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 12px',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember me & LOGIN button row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              color: '#64748B',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: 16,
                  height: 16,
                  accentColor: '#2563EB',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
            >
              {loading ? '...' : (mode === 'signup' ? 'REGISTER' : 'LOGIN')}
            </button>
          </div>

          {/* Register now / Forgot password links row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
            marginBottom: 24
          }}>
            <button
              type="button"
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
              style={{
                background: 'none',
                border: 'none',
                color: '#3B82F6',
                cursor: 'pointer',
                padding: 0,
                fontSize: 13,
                fontWeight: 500
              }}
            >
              {mode === 'signup' ? 'Back to login' : 'Register now'}
            </button>

            <button
              type="button"
              onClick={() => showToast('Password reset link sent to your registered email.', 'info')}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: 0,
                fontSize: 13
              }}
            >
              Forgot password?
            </button>
          </div>
        </form>

        {/* Divider with 'or' */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '22px 0 20px',
          color: '#94A3B8'
        }}>
          <div style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
          <span style={{ padding: '0 14px', fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
        </div>

        {/* Social / Single Sign-On Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          
          {/* LOGIN WITH BESUPERMIND (Vibrant Yellow Bar) */}
          <button
            type="button"
            onClick={() => handleBeSuperMindSignIn('supermind', 'BeSuperMind')}
            disabled={Boolean(ssoLoading)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFB800',
              color: '#0F172A',
              border: 'none',
              borderRadius: 8,
              padding: '11px 16px',
              cursor: ssoLoading ? 'not-allowed' : 'pointer',
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              boxShadow: '0 2px 5px rgba(245, 158, 11, 0.3)',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E5A500')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FFB800')}
          >
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <img src="/besupermind-logo.svg" alt="BeSuperMind" style={{ width: 18, height: 18, objectFit: 'contain' }} />
            </div>
            <div style={{ flex: 1, textAlign: 'center', paddingRight: 26 }}>
              {ssoLoading === 'besupermind' ? 'CONNECTING...' : 'LOGIN WITH BESUPERMIND'}
            </div>
          </button>

          {/* LOGIN WITH BUDDHACEO (Rich Purple Bar) */}
          <button
            type="button"
            onClick={() => handleBeSuperMindSignIn('bceo', 'BuddhaCEO')}
            disabled={Boolean(ssoLoading)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '11px 16px',
              cursor: ssoLoading ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              boxShadow: '0 2px 5px rgba(124, 58, 237, 0.3)',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6D28D9')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#7C3AED')}
          >
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <img src="/buddhaceo-logo.svg" alt="BuddhaCEO" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            </div>
            <div style={{ flex: 1, textAlign: 'center', paddingRight: 26 }}>
              {ssoLoading === 'buddhaceo' ? 'CONNECTING...' : 'LOGIN WITH BUDDHACEO'}
            </div>
          </button>

          {/* LOGIN WITH GOOGLE (Blue Bar) */}
          <button
            type="button"
            onClick={handleGoogleSignInClick}
            disabled={Boolean(ssoLoading)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '11px 16px',
              cursor: ssoLoading ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              boxShadow: '0 2px 5px rgba(37, 99, 235, 0.3)',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <img src="/google-logo.svg" alt="Google" style={{ width: 16, height: 16, objectFit: 'contain' }} />
            </div>
            <div style={{ flex: 1, textAlign: 'center', paddingRight: 26 }}>
              {ssoLoading === 'google' ? 'CONNECTING...' : 'LOGIN WITH GOOGLE'}
            </div>
          </button>

        </div>

      </div>
    </div>
  );
}
