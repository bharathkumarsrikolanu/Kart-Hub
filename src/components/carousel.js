// ============================================
// KartHub — Carousel Component
// ============================================

import { bannerSlides } from '../data/deals.js';

// Track interval to prevent leaks on re-render
let carouselAutoSlide = null;

export function renderHeroCarousel(container) {
  let currentSlide = 0;
  const slides = bannerSlides;

  // Clear any previous auto-slide interval
  if (carouselAutoSlide) {
    clearInterval(carouselAutoSlide);
    carouselAutoSlide = null;
  }

  container.innerHTML = `
    <div class="hero-carousel">
      <div class="carousel-track" id="carousel-track">
        ${slides.map((slide, i) => `
          <div class="carousel-slide">
            <div style="width:100%;height:400px;background:${slide.gradient};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
              <div style="position:absolute;inset:0;opacity:0.1;background:url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23fff\" fill-opacity=\"0.3\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/svg%3E');"></div>
              <div style="text-align:center;z-index:2;padding:0 40px;max-width:800px;">
                <div style="font-size:60px;margin-bottom:16px;">${slide.emoji}</div>
                <h2 style="font-family:'Outfit',sans-serif;font-size:42px;font-weight:800;color:white;margin-bottom:12px;text-shadow:0 2px 20px rgba(0,0,0,0.3);">${slide.title}</h2>
                <p style="font-size:20px;color:rgba(255,255,255,0.85);margin-bottom:24px;">${slide.subtitle}</p>
                <a href="${slide.link}" style="display:inline-block;padding:12px 36px;background:${slide.accentColor};color:#0F1111;font-weight:700;border-radius:8px;text-decoration:none;font-size:16px;transition:transform 0.2s;box-shadow:0 4px 15px rgba(0,0,0,0.3);">${slide.cta}</a>
              </div>
            </div>
            <div class="carousel-gradient"></div>
          </div>
        `).join('')}
      </div>
      <button class="carousel-arrow prev" id="carousel-prev"><i data-lucide="chevron-left"></i></button>
      <button class="carousel-arrow next" id="carousel-next"><i data-lucide="chevron-right"></i></button>
      <div class="carousel-dots" id="carousel-dots">
        ${slides.map((_, i) => `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`).join('')}
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  const track = document.getElementById('carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');

  function goToSlide(index) {
    currentSlide = ((index % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  document.getElementById('carousel-prev')?.addEventListener('click', () => goToSlide(currentSlide - 1));
  document.getElementById('carousel-next')?.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index))));

  // Auto-slide
  carouselAutoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
  container.addEventListener('mouseenter', () => clearInterval(carouselAutoSlide));
  container.addEventListener('mouseleave', () => {
    carouselAutoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
  });
}
