// ============================================
// KartHub — Checkout Page
// ============================================

import { getCart, getCartTotal, formatPrice, placeOrder, getCurrentUser, addAddress, getAddresses, isLoggedIn } from '../store.js';
import { navigate } from '../router.js';
import { showToast } from '../components/toast.js';

let currentStep = 1;

export function renderCheckoutPage() {
  const app = document.getElementById('app');
  const cart = getCart();

  if (cart.length === 0) {
    navigate('/cart');
    return;
  }

  if (!isLoggedIn()) {
    showToast('Please sign in to checkout', 'warning');
    navigate('/login?redirect=checkout');
    return;
  }

  currentStep = 1;
  renderCheckoutContent();
}

function renderCheckoutContent() {
  const app = document.getElementById('app');
  const totals = getCartTotal();
  const cart = getCart();
  const user = getCurrentUser();
  const addresses = getAddresses();

  app.innerHTML = `
    <div class="checkout-page">
      <h1 style="font-size:28px;margin-bottom:24px;">Checkout</h1>

      <!-- Steps Indicator -->
      <div class="checkout-steps">
        <div class="checkout-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}">
          <span class="step-number">${currentStep > 1 ? '✓' : '1'}</span>
          <span>Address</span>
        </div>
        <div class="checkout-step-line ${currentStep > 1 ? 'completed' : ''}"></div>
        <div class="checkout-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}">
          <span class="step-number">${currentStep > 2 ? '✓' : '2'}</span>
          <span>Payment</span>
        </div>
        <div class="checkout-step-line ${currentStep > 2 ? 'completed' : ''}"></div>
        <div class="checkout-step ${currentStep >= 3 ? 'active' : ''}">
          <span class="step-number">3</span>
          <span>Review</span>
        </div>
      </div>

      ${currentStep === 1 ? renderAddressStep(addresses, user) : ''}
      ${currentStep === 2 ? renderPaymentStep() : ''}
      ${currentStep === 3 ? renderReviewStep(cart, totals) : ''}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
  setupStepListeners();
}

function renderAddressStep(addresses, user) {
  return `
    <div class="checkout-section">
      <h2><i data-lucide="map-pin" style="width:20px;height:20px;display:inline;vertical-align:middle;margin-right:8px;"></i>Delivery Address</h2>
      
      ${addresses.length > 0 ? `
        <div style="margin-bottom:20px;">
          <h4 style="margin-bottom:12px;">Saved Addresses</h4>
          ${addresses.map((addr, i) => `
            <div class="radio-wrap ${i === 0 ? 'selected' : ''}" style="margin-bottom:8px;">
              <input type="radio" name="saved-address" value="${addr.id}" ${i === 0 ? 'checked' : ''} />
              <div>
                <strong>${addr.name}</strong>
                <p style="font-size:13px;color:#565959;margin-top:2px;">${addr.address}, ${addr.city}, ${addr.state} - ${addr.pincode}</p>
                <p style="font-size:13px;color:#565959;">Phone: ${addr.phone}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="divider">Or add a new address</div>
      ` : ''}

      <form id="address-form">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-input" id="addr-name" value="${user?.name || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number *</label>
            <input type="tel" class="form-input" id="addr-phone" value="${user?.phone || ''}" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Address (Street, Area) *</label>
          <input type="text" class="form-input" id="addr-address" placeholder="House no., Street, Area, Landmark" required />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
          <div class="form-group">
            <label class="form-label">City *</label>
            <input type="text" class="form-input" id="addr-city" required />
          </div>
          <div class="form-group">
            <label class="form-label">State *</label>
            <select class="form-select" id="addr-state" required>
              <option value="">Select</option>
              <option>Andhra Pradesh</option><option>Bihar</option><option>Delhi</option>
              <option>Gujarat</option><option>Karnataka</option><option>Kerala</option>
              <option>Madhya Pradesh</option><option>Maharashtra</option><option>Punjab</option>
              <option>Rajasthan</option><option>Tamil Nadu</option><option>Telangana</option>
              <option>Uttar Pradesh</option><option>West Bengal</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Pincode *</label>
            <input type="text" class="form-input" id="addr-pincode" maxlength="6" required />
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" id="address-next-btn" style="margin-top:8px;">
          Deliver to this address
        </button>
      </form>
    </div>
  `;
}

function renderPaymentStep() {
  return `
    <div class="checkout-section">
      <h2><i data-lucide="credit-card" style="width:20px;height:20px;display:inline;vertical-align:middle;margin-right:8px;"></i>Payment Method</h2>
      
      <div class="payment-methods" id="payment-methods">
        <div class="payment-method selected" data-method="upi">
          <input type="radio" name="payment" value="upi" checked />
          <div class="payment-method-icon" style="background:#E8F5E9;">
            <span style="font-size:20px;">📱</span>
          </div>
          <div class="payment-method-details">
            <h4>UPI (Google Pay, PhonePe, Paytm)</h4>
            <p>Pay directly from your bank account using UPI</p>
          </div>
        </div>

        <div class="payment-method" data-method="card">
          <input type="radio" name="payment" value="card" />
          <div class="payment-method-icon" style="background:#E3F2FD;">
            <span style="font-size:20px;">💳</span>
          </div>
          <div class="payment-method-details">
            <h4>Credit / Debit Card</h4>
            <p>Visa, Mastercard, RuPay accepted</p>
          </div>
        </div>

        <div class="payment-method" data-method="netbanking">
          <input type="radio" name="payment" value="netbanking" />
          <div class="payment-method-icon" style="background:#FFF3E0;">
            <span style="font-size:20px;">🏦</span>
          </div>
          <div class="payment-method-details">
            <h4>Net Banking</h4>
            <p>All major banks supported</p>
          </div>
        </div>

        <div class="payment-method" data-method="emi">
          <input type="radio" name="payment" value="emi" />
          <div class="payment-method-icon" style="background:#F3E5F5;">
            <span style="font-size:20px;">📊</span>
          </div>
          <div class="payment-method-details">
            <h4>EMI (Easy Monthly Installments)</h4>
            <p>No cost EMI available on select cards</p>
          </div>
        </div>

        <div class="payment-method" data-method="wallet">
          <input type="radio" name="payment" value="wallet" />
          <div class="payment-method-icon" style="background:#E0F7FA;">
            <span style="font-size:20px;">👛</span>
          </div>
          <div class="payment-method-details">
            <h4>KartHub Wallet / Pay Later</h4>
            <p>Use your KartHub balance or pay later</p>
          </div>
        </div>

        <div class="payment-method" data-method="cod">
          <input type="radio" name="payment" value="cod" />
          <div class="payment-method-icon" style="background:#FBE9E7;">
            <span style="font-size:20px;">💵</span>
          </div>
          <div class="payment-method-details">
            <h4>Cash on Delivery</h4>
            <p>Pay when your order is delivered</p>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:12px;margin-top:24px;">
        <button class="btn btn-secondary" id="payment-back-btn">← Back</button>
        <button class="btn btn-primary btn-lg" id="payment-next-btn" style="flex:1;">Continue</button>
      </div>
    </div>
  `;
}

function renderReviewStep(cart, totals) {
  return `
    <div class="checkout-section">
      <h2><i data-lucide="clipboard-list" style="width:20px;height:20px;display:inline;vertical-align:middle;margin-right:8px;"></i>Review Your Order</h2>
      
      <div style="background:#F7F7F7;padding:16px;border-radius:8px;margin-bottom:20px;">
        <p style="font-size:14px;color:#565959;margin-bottom:8px;">Delivering to:</p>
        <p style="font-weight:600;" id="review-address-display">Loading...</p>
      </div>

      <h4 style="margin-bottom:12px;">Items (${totals.itemCount})</h4>
      ${cart.map(item => `
        <div style="display:flex;gap:16px;padding:12px 0;border-bottom:1px solid #EDEDED;align-items:center;">
          <img src="${item.image}" alt="" style="width:60px;height:60px;object-fit:contain;background:#F7F7F7;border-radius:4px;" onerror="this.src='https://via.placeholder.com/60x60?text=Item'" />
          <div style="flex:1;">
            <p style="font-size:14px;font-weight:500;" class="line-clamp-2">${item.name}</p>
            <p style="font-size:13px;color:#565959;">Qty: ${item.qty}</p>
          </div>
          <p style="font-weight:600;">${formatPrice(item.price * item.qty)}</p>
        </div>
      `).join('')}

      <div style="margin-top:20px;padding:16px;background:#F7F7F7;border-radius:8px;">
        <div class="cart-summary-row">
          <span>Items:</span><span>${formatPrice(totals.originalTotal)}</span>
        </div>
        ${totals.discount > 0 ? `<div class="cart-summary-row"><span>Discount:</span><span class="savings">−${formatPrice(totals.discount)}</span></div>` : ''}
        <div class="cart-summary-row">
          <span>Delivery:</span><span>${totals.delivery === 0 ? 'FREE' : formatPrice(totals.delivery)}</span>
        </div>
        <div class="cart-summary-row total">
          <span>Order Total:</span><span style="color:#B12704;">${formatPrice(totals.total)}</span>
        </div>
      </div>

      <div style="display:flex;gap:12px;margin-top:24px;">
        <button class="btn btn-secondary" id="review-back-btn">← Back</button>
        <button class="btn btn-orange btn-lg" id="place-order-btn" style="flex:1;">
          <i data-lucide="lock" style="width:16px;height:16px;"></i>
          Place Order & Pay ${formatPrice(totals.total)}
        </button>
      </div>
    </div>
  `;
}

let savedAddress = null;
let savedPayment = 'upi';

function setupStepListeners() {
  // Step 1: Address
  const addressForm = document.getElementById('address-form');
  addressForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Check saved address first
    const savedAddrRadio = document.querySelector('input[name="saved-address"]:checked');
    if (savedAddrRadio) {
      const addresses = getAddresses();
      savedAddress = addresses.find(a => a.id === savedAddrRadio.value);
      if (savedAddress) {
        currentStep = 2;
        renderCheckoutContent();
        return;
      }
    }

    const name = document.getElementById('addr-name')?.value?.trim();
    const phone = document.getElementById('addr-phone')?.value?.trim();
    const address = document.getElementById('addr-address')?.value?.trim();
    const city = document.getElementById('addr-city')?.value?.trim();
    const state = document.getElementById('addr-state')?.value;
    const pincode = document.getElementById('addr-pincode')?.value?.trim();

    if (!name || !phone || !address || !city || !state || !pincode) {
      showToast('Please fill in all address fields', 'error');
      return;
    }
    if (pincode.length !== 6 || isNaN(pincode)) {
      showToast('Please enter a valid 6-digit pincode', 'error');
      return;
    }

    savedAddress = addAddress({ name, phone, address, city, state, pincode });
    currentStep = 2;
    renderCheckoutContent();
  });

  // Step 2: Payment
  const paymentMethods = document.querySelectorAll('.payment-method');
  paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
      paymentMethods.forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
      method.querySelector('input[type="radio"]').checked = true;
      savedPayment = method.dataset.method;
    });
  });

  document.getElementById('payment-next-btn')?.addEventListener('click', () => {
    currentStep = 3;
    renderCheckoutContent();
    // Update review address display
    setTimeout(() => {
      const display = document.getElementById('review-address-display');
      if (display && savedAddress) {
        display.textContent = `${savedAddress.name}, ${savedAddress.address}, ${savedAddress.city}, ${savedAddress.state} - ${savedAddress.pincode} | ${savedAddress.phone}`;
      }
    }, 100);
  });

  document.getElementById('payment-back-btn')?.addEventListener('click', () => {
    currentStep = 1;
    renderCheckoutContent();
  });

  // Step 3: Review
  document.getElementById('review-back-btn')?.addEventListener('click', () => {
    currentStep = 2;
    renderCheckoutContent();
  });

  document.getElementById('place-order-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('place-order-btn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span style="display:inline-block;animation:spin 1s linear infinite;margin-right:8px;">⏳</span> Placing Your Order...`;
    }
    try {
      const order = await placeOrder(savedAddress, savedPayment);
      if (order) {
        navigate(`/order-success/${order.id}`);
      }
    } catch (err) {
      console.error('Order placement failed:', err);
      alert('Could not place order. Please try again.');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="lock" style="width:16px;height:16px;"></i> Place Order & Pay`;
      }
    }
  });

  // Update review address display if already on step 3
  if (currentStep === 3 && savedAddress) {
    const display = document.getElementById('review-address-display');
    if (display) {
      display.textContent = `${savedAddress.name}, ${savedAddress.address}, ${savedAddress.city}, ${savedAddress.state} - ${savedAddress.pincode} | ${savedAddress.phone}`;
    }
  }
}
