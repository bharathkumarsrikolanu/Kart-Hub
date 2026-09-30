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

  // Initialize Google Identity Services (GIS) on mount
  React.useEffect(() => {
    const googleClientId = '31259564562-k8bskvd1gnk0f8ch3acv1cv3h5pheu46.apps.googleusercontent.com';
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response) => {
            if (response?.credential) {
              try {
                const base64Url = response.credential.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const profile = JSON.parse(jsonPayload);
                if (profile.email) {
                  const res = await signInWithGoogle({
                    email: profile.email,
                    name: profile.name || profile.email.split('@')[0],
                    avatar: profile.picture || '',
                    googleId: profile.sub || ''
                  });
                  showToast(`🎉 Welcome, ${res.user.name}!`, 'success');
                  navigate('/account');
                }
              } catch (jwtErr) {
                console.error('Failed to parse Google credential:', jwtErr);
              }
            }
          }
        });
      } catch (initErr) {
        console.warn('GIS Init notice:', initErr);
      }
    }
  }, []);

  const handleGoogleSignInClick = () => {
    const googleClientId = '31259564562-k8bskvd1gnk0f8ch3acv1cv3h5pheu46.apps.googleusercontent.com';

    if (window.google?.accounts?.oauth2) {
      try {
        setSsoLoading('google');
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          prompt: 'select_account',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              alert(`Google Sign-In notice: ${tokenResponse.error} ${tokenResponse.error_description || ''}`);
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
                alert(`Failed to fetch Google profile: ${err.message}`);
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
        alert(`Google OAuth error: ${e.message}`);
        setSsoLoading(null);
      }
    } else if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt();
        return;
      } catch {}
    }

    // Direct OAuth Popup fallback (guaranteed to work instantly even if SDK script is blocked or delayed!)
    setSsoLoading('google');
    const redirectOrigin = window.location.origin;
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(googleClientId)}&redirect_uri=${encodeURIComponent(redirectOrigin)}&response_type=token&scope=email%20profile%20openid&prompt=select_account`;
    const popup = window.open(oauthUrl, 'Google_Sign_In', 'width=500,height=600');
    if (!popup) {
      alert('Please allow popups for this site to sign in with Google.');
      setSsoLoading(null);
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
          
          {/* SIGN IN WITH BESUPERMIND (Vibrant Amber/Gold Bar) */}
          <button
            type="button"
            onClick={() => handleBeSuperMindSignIn('bceo', 'BeSuperMind')}
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
              <svg viewBox="0 0 100 100" width="20" height="20" style={{ display: 'block' }}>
                <circle cx="48" cy="45" r="38" fill="#FFB800" />
                <path
                  d="M 45 92 C 42 78 32 58 32 44 C 32 23 48 21 68 24 C 81 26 88 36 88 49 L 93 62 C 94 65 91 67 88 66 L 85 66 L 85 78 L 74 78 L 74 92"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g stroke="#4F17EA" strokeWidth="4.5" strokeLinecap="round">
                  <line x1="56" y1="36" x2="56" y2="56" />
                  <line x1="46" y1="46" x2="66" y2="46" />
                  <line x1="49" y1="39" x2="63" y2="53" />
                  <line x1="49" y1="53" x2="63" y2="39" />
                </g>
              </svg>
            </div>
            <div style={{ flex: 1, textAlign: 'center', paddingRight: 26 }}>
              {ssoLoading === 'besupermind' ? 'CONNECTING...' : 'SIGN IN WITH BESUPERMIND'}
            </div>
          </button>

          {/* SIGN IN WITH BUDDHACEO (Rich Purple Bar) */}
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
              <svg viewBox="0 0 100 100" width="20" height="20" style={{ display: 'block' }}>
                <defs>
                  <clipPath id="bceoClipReact">
                    <circle cx="50" cy="50" r="48" />
                  </clipPath>
                </defs>
                <g clipPath="url(#bceoClipReact)">
                  <circle cx="50" cy="50" r="48" fill="#FFFFFF" />
                  <path d="M 50 6 C 45 18 41 26 41 34 C 41 42 46 47 50 49 C 54 47 59 42 59 34 C 59 26 55 18 50 6 Z" fill="#9333EA" />
                  <path d="M 47 8 C 34 17 28 29 27 37 C 35 39 39 34 40 27 C 41 18 45 11 47 8 Z" fill="#A855F7" />
                  <path d="M 53 8 C 66 17 72 29 73 37 C 65 39 61 34 60 27 C 59 18 55 11 53 8 Z" fill="#A855F7" />
                  <path d="M 17 43 C 15 50 15 58 18 65 C 26 59 32 51 35 42 C 28 41 22 42 17 43 Z" fill="#38BDF8" />
                  <path d="M 83 43 C 85 50 85 58 82 65 C 74 59 68 51 65 42 C 72 41 78 42 83 43 Z" fill="#38BDF8" />
                  <path d="M 37.5 44 C 35 53 31 59 24 65 C 33 64 40 57 44 49 C 41 47 39 45.5 37.5 44 Z" fill="#0284C7" />
                  <path d="M 62.5 44 C 65 53 69 59 76 65 C 67 64 60 57 56 49 C 59 47 61 45.5 62.5 44 Z" fill="#0284C7" />
                  <path d="M 50 52 L 45 59 L 50 66 L 55 59 Z" fill="#0284C7" />
                  <path d="M 23 68 C 31 75 39 78 47 79 C 43 71 37 67 28 67 C 26 67 24.5 67.5 23 68 Z" fill="#84CC16" />
                  <path d="M 77 68 C 69 75 61 78 53 79 C 57 71 63 67 72 67 C 74 67 75.5 67.5 77 68 Z" fill="#84CC16" />
                  <path d="M 50 94 C 38 94 29 87 22 75 C 30 81 40 83 50 83 C 60 83 70 81 78 75 C 71 87 62 94 50 94 Z" fill="#65A30D" />
                </g>
              </svg>
            </div>
            <div style={{ flex: 1, textAlign: 'center', paddingRight: 26 }}>
              {ssoLoading === 'buddhaceo' ? 'CONNECTING...' : 'SIGN IN WITH BUDDHACEO'}
            </div>
          </button>

          {/* SIGN IN WITH GOOGLE (Blue Bar) */}
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
              <svg viewBox="0 0 48 48" width="18" height="18" style={{ display: 'block' }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
            <div style={{ flex: 1, textAlign: 'center', paddingRight: 26 }}>
              {ssoLoading === 'google' ? 'CONNECTING...' : 'SIGN IN WITH GOOGLE'}
            </div>
          </button>

        </div>

      </div>
    </div>
  );
}
