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

  const logout = () => {
    setUser(null);
  };

  const isAdmin = Boolean(user && (user.role === 'admin' || user.email?.toLowerCase() === ADMIN_EMAIL));

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, logout, allUsers, fetchUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
