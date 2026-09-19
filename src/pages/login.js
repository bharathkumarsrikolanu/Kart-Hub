// ============================================
// KartHub — Login / Signup Page
// ============================================

import { login, signup, isLoggedIn } from '../store.js';
import { navigate } from '../router.js';
import { showToast } from '../components/toast.js';

export function renderLoginPage(params, queryParams) {
  if (isLoggedIn()) {
    navigate(queryParams?.redirect ? `/${queryParams.redirect}` : '/account');
    return;
  }

  const isSignup = queryParams?.mode === 'signup';
  const redirect = queryParams?.redirect || '';
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="login-page">
      <div class="login-logo">
        <div class="logo-text">Kart<span>Hub</span></div>
      </div>

      <div class="login-card">
        <h2>${isSignup ? 'Create Account' : 'Sign In'}</h2>
        
        <form id="auth-form">
          ${isSignup ? `
            <div class="form-group">
              <label class="form-label">Your Name</label>
              <input type="text" class="form-input" id="auth-name" placeholder="First and last name" required />
            </div>
          ` : ''}

          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="auth-email" placeholder="Enter your email" required />
          </div>

          ${isSignup ? `
            <div class="form-group">
              <label class="form-label">Mobile Number</label>
              <input type="tel" class="form-input" id="auth-phone" placeholder="Enter mobile number" />
            </div>
          ` : ''}

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="auth-password" placeholder="${isSignup ? 'At least 6 characters' : 'Enter your password'}" minlength="6" required />
          </div>

          ${isSignup ? `
            <div class="form-group">
              <label class="form-label">Confirm Password</label>
              <input type="password" class="form-input" id="auth-confirm-password" placeholder="Re-enter password" minlength="6" required />
            </div>
          ` : ''}

          <button type="submit" class="btn btn-primary btn-block btn-lg" id="auth-submit-btn">
            ${isSignup ? 'Create your KartHub account' : 'Sign In'}
          </button>

          <p id="auth-error" style="color:#CC0C39;font-size:13px;margin-top:8px;display:none;"></p>
        </form>

        ${!isSignup ? `
          <p style="font-size:12px;color:#565959;margin-top:16px;">
            By continuing, you agree to KartHub's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
          </p>
        ` : ''}

        <div class="login-footer">
          ${isSignup 
            ? `Already have an account? <a href="#/login${redirect ? '?redirect=' + redirect : ''}">Sign In</a>` 
            : `New to KartHub? <a href="#/login?mode=signup${redirect ? '&redirect=' + redirect : ''}">Create your KartHub account</a>`
          }
        </div>
      </div>

      ${!isSignup ? `
        <div style="text-align:center;margin-top:20px;padding:16px;background:white;border-radius:8px;border:1px solid #EDEDED;display:flex;flex-direction:column;gap:8px;">
          <p style="font-size:13px;color:#565959;">⚡ Quick 1-Click Logins</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm" id="admin-login-btn">👑 Login as Admin</button>
            <button class="btn btn-secondary btn-sm" id="demo-login-btn">👤 Login as Demo User</button>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Form submission
  document.getElementById('auth-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById('auth-error');
    const submitBtn = document.getElementById('auth-submit-btn');
    const originalBtnText = submitBtn ? submitBtn.innerText : '';
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = isSignup ? 'Creating account...' : 'Signing in...';
    }
    
    try {
      if (isSignup) {
        const name = document.getElementById('auth-name').value.trim();
        const email = document.getElementById('auth-email').value.trim();
        const phone = document.getElementById('auth-phone')?.value?.trim() || '';
        const password = document.getElementById('auth-password').value;
        const confirmPassword = document.getElementById('auth-confirm-password').value;

        if (password !== confirmPassword) {
          errorEl.textContent = 'Passwords do not match';
          errorEl.style.display = 'block';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
          }
          return;
        }

        const result = await signup(name, email, phone, password);
        if (result.success) {
          showToast(`Welcome to KartHub, ${name}!`, 'success');
          navigate(redirect ? `/${redirect}` : '/');
        } else {
          errorEl.textContent = result.message;
          errorEl.style.display = 'block';
        }
      } else {
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;

        const result = await login(email, password);
        if (result.success) {
          showToast(`Welcome back, ${result.user.name}!`, 'success');
          if (result.user.email?.toLowerCase() === 'bharathkumaraiwork@gmail.com') {
            navigate('/admin');
          } else {
            navigate(redirect ? `/${redirect}` : '/');
          }
        } else {
          errorEl.textContent = result.message;
          errorEl.style.display = 'block';
        }
      }
    } catch (err) {
      errorEl.textContent = 'An unexpected error occurred. Please try again.';
      errorEl.style.display = 'block';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  });

  // Admin 1-Click Login
  document.getElementById('admin-login-btn')?.addEventListener('click', async () => {
    const adminBtn = document.getElementById('admin-login-btn');
    if (adminBtn) adminBtn.disabled = true;
    const result = await login('bharathkumaraiwork@gmail.com', 'admin123');
    if (result.success) {
      showToast('Welcome, Admin! 👑', 'success');
      navigate('/admin');
    }
    if (adminBtn) adminBtn.disabled = false;
  });

  // Demo login
  document.getElementById('demo-login-btn')?.addEventListener('click', async () => {
    const demoBtn = document.getElementById('demo-login-btn');
    if (demoBtn) demoBtn.disabled = true;
    
    const demoEmail = 'demo@karthub.com';
    const demoPass = 'demo123';
    await signup('Demo User', demoEmail, '9876543210', demoPass);
    const result = await login(demoEmail, demoPass);
    if (result.success) {
      showToast('Welcome, Demo User! 🎉', 'success');
      navigate(redirect ? `/${redirect}` : '/');
    }
    if (demoBtn) demoBtn.disabled = false;
  });
}
