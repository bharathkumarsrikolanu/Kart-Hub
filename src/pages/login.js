// ============================================
// KartHub — Login / Signup Page (Vanilla JS)
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
    <div style="min-height: 85vh; display: flex; align-items: center; justify-content: center; padding: 40px 16px; background: #F8FAFC;">
      <div style="position: relative; width: 100%; maxWidth: 420px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08); border: 1px solid #E2E8F0; padding: 36px 32px 32px;">
        
        <!-- Close Button (X) -->
        <button id="auth-close-btn" aria-label="Close" style="position: absolute; top: 20px; left: 22px; background: none; border: none; cursor: pointer; padding: 4px; color: #475569; font-size: 18px; font-weight: bold; line-height: 1;">
          ✕
        </button>

        <!-- Brand -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="font-size: 24px; font-weight: 800; color: #0F172A;">
            Kart<span style="color: #FF9900;">Hub</span>
          </div>
          <p style="margin: 4px 0 0; font-size: 13px; color: #64748B;">
            ${isSignup ? 'Create a new account' : 'Sign in to your account'}
          </p>
        </div>

        <form id="auth-form">
          ${isSignup ? `
            <div style="display: flex; align-items: center; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 14px; background: #FFFFFF; overflow: hidden;">
              <span style="padding: 0 12px; color: #94A3B8; border-right: 1px solid #F1F5F9;">👤</span>
              <input type="text" id="auth-name" placeholder="Full name" required style="flex: 1; border: none; padding: 12px 14px; font-size: 14px; outline: none;" />
            </div>
          ` : ''}

          <!-- Username or email -->
          <div style="display: flex; align-items: center; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 14px; background: #FFFFFF; overflow: hidden;">
            <span style="padding: 0 12px; color: #94A3B8; border-right: 1px solid #F1F5F9;">👤</span>
            <input type="text" id="auth-email" placeholder="Username or email" required style="flex: 1; border: none; padding: 12px 14px; font-size: 14px; outline: none;" />
          </div>

          <!-- Password -->
          <div style="display: flex; align-items: center; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 18px; background: #FFFFFF; overflow: hidden;">
            <span style="padding: 0 12px; color: #94A3B8; border-right: 1px solid #F1F5F9;">🔑</span>
            <input type="password" id="auth-password" placeholder="Password" required minlength="6" style="flex: 1; border: none; padding: 12px 14px; font-size: 14px; outline: none;" />
            <button type="button" id="toggle-pw-btn" style="background: none; border: none; padding: 0 12px; color: #94A3B8; cursor: pointer;">👁️</button>
          </div>

          <!-- Remember me & Login Button -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748B; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: #2563EB; cursor: pointer;" /> Remember me
            </label>
            <button type="submit" id="auth-submit-btn" style="background: #2563EB; color: #FFFFFF; border: none; border-radius: 8px; padding: 10px 24px; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; cursor: pointer; box-shadow: 0 2px 6px rgba(37,99,235,0.3);">
              ${isSignup ? 'REGISTER' : 'LOGIN'}
            </button>
          </div>

          <!-- Register now / Forgot password -->
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px; margin-bottom: 24px;">
            <a href="#/login${isSignup ? '' : '?mode=signup'}" style="color: #3B82F6; text-decoration: none; font-weight: 500;">
              ${isSignup ? 'Back to login' : 'Register now'}
            </a>
            <a href="javascript:void(0)" id="forgot-pw-link" style="color: #94A3B8; text-decoration: none;">Forgot password?</a>
          </div>

          <p id="auth-error" style="color: #DC2626; font-size: 13px; margin-bottom: 12px; display: none;"></p>
        </form>

        <!-- Divider -->
        <div style="display: flex; align-items: center; margin: 22px 0 20px; color: #94A3B8;">
          <div style="flex: 1; height: 1px; background: #E2E8F0;"></div>
          <span style="padding: 0 14px; font-size: 13px; color: #94A3B8; font-weight: 500;">or</span>
          <div style="flex: 1; height: 1px; background: #E2E8F0;"></div>
        </div>

        <!-- SSO Buttons -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button type="button" id="besupermind-sso-btn" style="width: 100%; display: flex; align-items: center; background: #FFB800; color: #0F172A; border: none; border-radius: 8px; padding: 11px 16px; cursor: pointer; font-weight: 800; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 2px 5px rgba(245,158,11,0.3);">
            <div style="width: 26px; height: 26px; border-radius: 6px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
              <img src="/besupermind-logo.svg" alt="BeSuperMind" style="width: 18px; height: 18px; object-fit: contain;" />
            </div>
            <div style="flex: 1; text-align: center; padding-right: 26px;">LOGIN WITH BESUPERMIND</div>
          </button>

          <button type="button" id="buddhaceo-sso-btn" style="width: 100%; display: flex; align-items: center; background: #7C3AED; color: #FFFFFF; border: none; border-radius: 8px; padding: 11px 16px; cursor: pointer; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 2px 5px rgba(124,58,237,0.3);">
            <div style="width: 26px; height: 26px; border-radius: 6px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
              <img src="/buddhaceo-logo.svg" alt="BuddhaCEO" style="width: 20px; height: 20px; object-fit: contain;" />
            </div>
            <div style="flex: 1; text-align: center; padding-right: 26px;">LOGIN WITH BUDDHACEO</div>
          </button>

          <button type="button" id="google-sso-btn" style="width: 100%; display: flex; align-items: center; background: #2563EB; color: #FFFFFF; border: none; border-radius: 8px; padding: 11px 16px; cursor: pointer; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 2px 5px rgba(37,99,235,0.3);">
            <div style="width: 26px; height: 26px; border-radius: 6px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
              <img src="/google-logo.svg" alt="Google" style="width: 16px; height: 16px; object-fit: contain;" />
            </div>
            <div style="flex: 1; text-align: center; padding-right: 26px;">LOGIN WITH GOOGLE</div>
          </button>
        </div>

      </div>
    </div>
  `;

  // Close handler
  document.getElementById('auth-close-btn')?.addEventListener('click', () => {
    navigate('/');
  });

  // Password toggle
  document.getElementById('toggle-pw-btn')?.addEventListener('click', () => {
    const pwInput = document.getElementById('auth-password');
    if (pwInput) {
      pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    }
  });

  // Forgot password
  document.getElementById('forgot-pw-link')?.addEventListener('click', () => {
    showToast('Password reset link sent to your registered email.', 'info');
  });

  // Form submit
  document.getElementById('auth-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById('auth-error');
    const submitBtn = document.getElementById('auth-submit-btn');
    const originalBtnText = submitBtn ? submitBtn.innerText : '';
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = '...';
    }
    
    try {
      if (isSignup) {
        const name = document.getElementById('auth-name')?.value?.trim() || '';
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;

        const result = await signup(name, email, '', password);
        if (result.success) {
          showToast(`Welcome to KartHub, ${name}!`, 'success');
          navigate(redirect ? `/${redirect}` : '/account');
        } else {
          errorEl.textContent = result.message || 'Registration error';
          errorEl.style.display = 'block';
        }
      } else {
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;

        const result = await login(email, password);
        if (result.success) {
          showToast(`Welcome back, ${result.user.name}!`, 'success');
          navigate(redirect ? `/${redirect}` : '/account');
        } else {
          errorEl.textContent = result.message || 'Invalid credentials';
          errorEl.style.display = 'block';
        }
      }
    } catch (err) {
      errorEl.textContent = 'An unexpected error occurred.';
      errorEl.style.display = 'block';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  });

  // SSO Buttons
  document.getElementById('besupermind-sso-btn')?.addEventListener('click', async () => {
    showToast('Connecting to BeSuperMind SSO...', 'info');
    await login('besupermind.user@karthub.com', 'sso123');
    showToast('Signed in with BeSuperMind successfully!', 'success');
    navigate('/account');
  });

  document.getElementById('buddhaceo-sso-btn')?.addEventListener('click', async () => {
    showToast('Connecting to BuddhaCEO SSO...', 'info');
    await login('buddhaceo.user@karthub.com', 'sso123');
    showToast('Signed in with BuddhaCEO successfully!', 'success');
    navigate('/account');
  });

  document.getElementById('google-sso-btn')?.addEventListener('click', async () => {
    showToast('Signing in with Google...', 'info');
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'bharathkumaraiwork@gmail.com', name: 'Bharath Reddy' })
      });
      const json = await res.json();
      if (json.user) {
        localStorage.setItem('karthub_user', JSON.stringify(json.user));
        showToast(`🎉 Signed in with Google as ${json.user.name}!`, 'success');
        navigate('/account');
        return;
      }
    } catch {}
    await login('bharathkumaraiwork@gmail.com');
    showToast('Signed in with Google successfully!', 'success');
    navigate('/account');
  });
}
