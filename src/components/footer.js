// ============================================
// KartHub — Footer Component
// ============================================

export function renderFooter() {
  const footer = document.getElementById('main-footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-back-top" id="footer-back-top">Back to top</div>
    <div class="footer-main">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Get to Know Us</h4>
          <a href="#">About KartHub</a>
          <a href="#">Careers</a>
          <a href="#">Press Releases</a>
          <a href="#">KartHub Science</a>
        </div>
        <div class="footer-col">
          <h4>Make Money with Us</h4>
          <a href="#">Sell on KartHub</a>
          <a href="#">Sell under KartHub Accelerator</a>
          <a href="#">Protect and Build Your Brand</a>
          <a href="#">KartHub Global Selling</a>
          <a href="#">Become an Affiliate</a>
        </div>
        <div class="footer-col">
          <h4>KartHub Payment</h4>
          <a href="#">KartHub Pay UPI</a>
          <a href="#">KartHub Pay Later</a>
          <a href="#">KartHub Business Card</a>
          <a href="#">Shop with EMI</a>
          <a href="#">Gift Cards</a>
          <a href="#">KartHub Currency Converter</a>
        </div>
        <div class="footer-col">
          <h4>Help & Support</h4>
          <a href="mailto:bharathkumaraiwork@gmail.com" style="display:flex;align-items:center;gap:6px;">📧 bharathkumaraiwork@gmail.com</a>
          <a href="tel:+916304505750" style="display:flex;align-items:center;gap:6px;">📞 +91 6304505750</a>
          <a href="#/account">Your Account</a>
          <a href="#">Returns Centre</a>
          <a href="#">100% Purchase Protection</a>
          <a href="#">Help</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <div class="footer-logo">Kart<span>Hub</span>.com</div>
        <div class="footer-legal-links">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Interest-Based Ads</a>
        </div>
        <p class="footer-legal">© 2024-${new Date().getFullYear()} KartHub.com. All rights reserved.</p>
      </div>
    </div>
  `;

  document.getElementById('footer-back-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
