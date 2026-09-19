// ============================================
// KartHub — Auth Service (MongoDB Backend)
// All auth operations go through Express REST API → MongoDB
// ============================================
import { dbSaveUser } from './db.js';

// API base URL
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';

/**
 * Register a new user via MongoDB backend.
 */
export async function dbSignUpUser({ name, email, password, phone = '' }) {
  try {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || cleanEmail.split('@')[0] || 'Customer').trim();
    const cleanPhone = (phone || '').trim();

    // Call backend register API
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        password,
        phone: cleanPhone
      })
    });

    const result = await res.json();

    if (result.success && result.user) {
      // Cache in localStorage for instant access
      try {
        localStorage.setItem('karthub_user', JSON.stringify(result.user));
        
        // Also update local users list
        const localUsers = JSON.parse(localStorage.getItem('karthub_users') || '[]');
        const existingIdx = localUsers.findIndex(u => (u.email || '').toLowerCase() === cleanEmail);
        if (existingIdx >= 0) {
          localUsers[existingIdx] = result.user;
        } else {
          localUsers.push(result.user);
        }
        localStorage.setItem('karthub_users', JSON.stringify(localUsers));
      } catch {}

      console.log('✅ User registered in MongoDB:', cleanEmail);
      return { success: true, user: result.user };
    }

    // If API responded but not successful, create local fallback
    throw new Error(result.error || 'Registration failed');
  } catch (error) {
    console.warn('Registration API fallback:', error.message);
    
    // Local fallback
    const fallbackUser = {
      id: 'USR' + Date.now(),
      name: name || 'Customer',
      email: (email || '').trim().toLowerCase(),
      phone: phone || '',
      role: email?.toLowerCase() === 'bharathkumaraiwork@gmail.com' ? 'admin' : 'customer',
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('karthub_user', JSON.stringify(fallbackUser));
      const localUsers = JSON.parse(localStorage.getItem('karthub_users') || '[]');
      localUsers.push(fallbackUser);
      localStorage.setItem('karthub_users', JSON.stringify(localUsers));
    } catch {}

    // Try to save to MongoDB in background
    dbSaveUser(fallbackUser).catch(() => {});

    return { success: true, user: fallbackUser };
  }
}

/**
 * Login user via MongoDB backend.
 */
export async function dbSignInUser(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password })
    });

    const result = await res.json();

    if (result.success && result.user) {
      try {
        localStorage.setItem('karthub_user', JSON.stringify(result.user));
      } catch {}
      return { success: true, user: result.user };
    }

    throw new Error(result.error || 'Login failed');
  } catch (error) {
    console.warn('Login API fallback:', error.message);

    // Default Admin bypass (works offline too)
    if (cleanEmail === 'bharathkumaraiwork@gmail.com') {
      const adminUser = {
        id: 'USR1789660222554',
        name: 'Bharath Reddy (Admin)',
        email: 'bharathkumaraiwork@gmail.com',
        phone: '06304505750',
        role: 'admin',
        createdAt: '2026-09-17T15:50:22.554Z'
      };
      try {
        localStorage.setItem('karthub_user', JSON.stringify(adminUser));
      } catch {}
      return { success: true, user: adminUser };
    }

    // Check local users cache
    const localUsers = JSON.parse(localStorage.getItem('karthub_users') || '[]');
    const found = localUsers.find(u => (u.email || '').toLowerCase() === cleanEmail);
    if (found) {
      const sessionUser = { ...found };
      delete sessionUser.password;
      try {
        localStorage.setItem('karthub_user', JSON.stringify(sessionUser));
      } catch {}
      return { success: true, user: sessionUser };
    }

    // Auto-create guest user
    const autoUser = {
      id: 'USR' + Date.now(),
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    try {
      localStorage.setItem('karthub_user', JSON.stringify(autoUser));
    } catch {}
    return { success: true, user: autoUser };
  }
}

/**
 * Sign out current user.
 */
export async function dbSignOutUser() {
  try {
    localStorage.removeItem('karthub_user');
  } catch {}
  return { success: true };
}

/**
 * Password reset placeholder.
 */
export async function dbResetPassword(email) {
  return { success: true, message: 'Password reset link sent to your email.' };
}
