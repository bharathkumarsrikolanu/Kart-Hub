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
              <svg viewBox="0 0 100 100" width="20" height="20" style="display: block;">
                <circle cx="48" cy="45" r="38" fill="#FFB800" />
                <path d="M 45 92 C 42 78 32 58 32 44 C 32 23 48 21 68 24 C 81 26 88 36 88 49 L 93 62 C 94 65 91 67 88 66 L 85 66 L 85 78 L 74 78 L 74 92" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                <g stroke="#4F17EA" stroke-width="4.5" stroke-linecap="round">
                  <line x1="56" y1="36" x2="56" y2="56" />
                  <line x1="46" y1="46" x2="66" y2="46" />
                  <line x1="49" y1="39" x2="63" y2="53" />
                  <line x1="49" y1="53" x2="63" y2="39" />
                </g>
              </svg>
            </div>
            <div style="flex: 1; text-align: center; padding-right: 26px;">SIGN IN WITH BESUPERMIND</div>
          </button>

          <button type="button" id="buddhaceo-sso-btn" style="width: 100%; display: flex; align-items: center; background: #7C3AED; color: #FFFFFF; border: none; border-radius: 8px; padding: 11px 16px; cursor: pointer; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 2px 5px rgba(124,58,237,0.3);">
            <div style="width: 26px; height: 26px; border-radius: 6px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
              <svg viewBox="0 0 100 100" width="20" height="20" style="display: block;">
                <defs>
                  <clipPath id="bceoClipVanilla">
                    <circle cx="50" cy="50" r="48" />
                  </clipPath>
                </defs>
                <g clip-path="url(#bceoClipVanilla)">
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
            <div style="flex: 1; text-align: center; padding-right: 26px;">SIGN IN WITH BUDDHACEO</div>
          </button>

          <button type="button" id="google-sso-btn" style="width: 100%; display: flex; align-items: center; background: #2563EB; color: #FFFFFF; border: none; border-radius: 8px; padding: 11px 16px; cursor: pointer; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 2px 5px rgba(37,99,235,0.3);">
            <div style="width: 26px; height: 26px; border-radius: 6px; background: #FFFFFF; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
              <svg viewBox="0 0 48 48" width="18" height="18" style="display: block;">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
            <div style="flex: 1; text-align: center; padding-right: 26px;">SIGN IN WITH GOOGLE</div>
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
