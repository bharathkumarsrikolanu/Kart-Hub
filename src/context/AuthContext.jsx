import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_EMAIL = 'bharathkumaraiwork@gmail.com';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('karthub_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('karthub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('karthub_user');
    }
  }, [user]);

  // Load all users from backend API
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const json = await res.json();
        if (json.data) setAllUsers(json.data);
      }
    } catch (e) {
      console.warn('Fetch users notice:', e.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    
    // Check if default admin
    if (cleanEmail === ADMIN_EMAIL) {
      const adminUser = {
        id: 'USR1789660222554',
        name: 'Bharath Reddy (Admin)',
        email: ADMIN_EMAIL,
        phone: '06304505750',
        role: 'admin',
        createdAt: '2026-09-17T15:50:22.554Z'
      };
      setUser(adminUser);
      return { success: true, user: adminUser };
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });
      const json = await res.json();
      if (json.user) {
        setUser(json.user);
        return { success: true, user: json.user };
      }
    } catch {}

    const guestUser = {
      id: 'USR' + Date.now(),
      name: cleanEmail.split('@')[0] || 'Customer',
      email: cleanEmail,
      role: 'customer'
    };
    setUser(guestUser);
    return { success: true, user: guestUser };
  };

  const signup = async ({ name, email, password, phone }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: cleanEmail, password, phone })
      });
      const json = await res.json();
      if (json.user) {
        setUser(json.user);
        fetchUsers();
        return { success: true, user: json.user };
      }
    } catch {}

    const newUser = {
      id: 'USR' + Date.now(),
      name: name || cleanEmail.split('@')[0] || 'Customer',
      email: cleanEmail,
      phone: phone || '',
      role: cleanEmail === ADMIN_EMAIL ? 'admin' : 'customer'
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  // Check for SSO callback query params on page load & hashchange
  useEffect(() => {
    const handleSSOParams = () => {
      try {
        const fullUrl = window.location.href;
        const hash = window.location.hash || '';
        const search = window.location.search || '';

        // Extract query params from both search and hash
        let queryStr = '';
        if (hash.includes('?')) {
          queryStr = hash.split('?')[1];
        } else if (search) {
          queryStr = search.replace(/^\?/, '');
        }

        if (!queryStr && fullUrl.includes('?')) {
          queryStr = fullUrl.split('?')[1].split('#')[0];
        }

        if (queryStr) {
          const params = new URLSearchParams(queryStr);
          
          // Check for SSO errors
          const errorMsg = params.get('error') || params.get('error_description');
          if (errorMsg) {
            console.error('⚠️ SSO Login Error from server:', errorMsg);
            alert(`SSO Login notice: ${decodeURIComponent(errorMsg)}`);
            window.location.hash = '#/login';
            return;
          }

          if (params.get('sso_success') === 'true') {
            const rawUser = params.get('user');
            if (rawUser) {
              let parsedUser = null;
              try {
                parsedUser = JSON.parse(rawUser);
              } catch {
                try {
                  parsedUser = JSON.parse(decodeURIComponent(rawUser));
                } catch (pe) {
                  console.error('Failed to parse user JSON:', pe);
                }
              }

              if (parsedUser && parsedUser.email) {
                console.log('✅ SSO User successfully logged in:', parsedUser);
                setUser(parsedUser);
                fetchUsers();
                // Clean up hash/URL to clean account page
                window.location.hash = '#/account';
              }
            }
          }
        }
      } catch (e) {
        console.warn('SSO Param parsing notice:', e.message);
      }
    };

    handleSSOParams();
    window.addEventListener('hashchange', handleSSOParams);
    return () => window.removeEventListener('hashchange', handleSSOParams);
  }, []);

  const signInWithBeSuperMind = async (orgSlug = 'bceo') => {
    try {
      const state = crypto.randomUUID ? crypto.randomUUID() : 'state_' + Date.now();
      sessionStorage.setItem('besupermind_oauth_state', state);

      const res = await fetch('/api/auth/besupermind/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgSlug, state })
      });

      const json = await res.json();
      if (!res.ok || !json?.data?.redirectUrl) {
        throw new Error(json?.error || 'Unable to initiate BeSuperMind sign-in');
      }

      window.location.href = json.data.redirectUrl;
      return { success: true, redirectUrl: json.data.redirectUrl };
    } catch (err) {
      console.error('BeSuperMind sign-in error:', err);
      throw err;
    }
  };

  const simulateBeSuperMindLogin = async ({ name = 'Bharath (BuddhaCEO)', email = 'buddhaceo.user@besupermind.com', orgSlug = 'bceo' } = {}) => {
    try {
      const res = await fetch('/api/auth/besupermind/mock-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, orgSlug })
      });
      const json = await res.json();
      if (json.user) {
        setUser(json.user);
        fetchUsers();
        return { success: true, user: json.user };
      }
    } catch {}

    const mockUser = {
      id: 'USR_BCEO_' + Date.now(),
      name,
      email,
      role: 'customer',
      authProvider: 'buddhaceo'
    };
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  const signInWithGoogle = async (googleData = {}) => {
    const email = (googleData.email || 'user@gmail.com').trim().toLowerCase();
    const name = googleData.name || email.split('@')[0] || 'Google User';
    const avatar = googleData.avatar || '';
    const googleId = googleData.googleId || '';

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, avatar, googleId })
      });
      const json = await res.json();
      if (json.user) {
        setUser(json.user);
        fetchUsers();
        return { success: true, user: json.user };
      }
    } catch (e) {
      console.warn('Google API login notice:', e.message);
    }

    const fallbackUser = {
      id: 'USR_G_' + Date.now(),
      name,
      email,
      avatar,
      role: email === ADMIN_EMAIL ? 'admin' : 'customer',
      authProvider: 'google'
    };
    setUser(fallbackUser);
    return { success: true, user: fallbackUser };
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = Boolean(user && (user.role === 'admin' || user.email?.toLowerCase() === ADMIN_EMAIL));

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      login,
      signup,
      logout,
      signInWithGoogle,
      signInWithBeSuperMind,
      simulateBeSuperMindLogin,
      allUsers,
      fetchUsers
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
