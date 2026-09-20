import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { bannerSlides } from '../data/deals.js';
import { ChevronLeft, ChevronRight, Zap, Clock, Sparkles, TrendingUp, Tag } from 'lucide-react';

export function HomePage({ navigate }) {
  const { products, getBestDeals, getProductsUnderPrice, getProductsByCategory } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dealTime, setDealTime] = useState({ hours: 4, minutes: 28, seconds: 15 });

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer for deals
  useEffect(() => {
    const timer = setInterval(() => {
      setDealTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = products.slice(0, 4);
  const under999 = getProductsUnderPrice(999, 4);
  const fashionTrends = getProductsByCategory('Fashion').slice(0, 4);
  const homeKitchen = getProductsByCategory('Home & Kitchen').slice(0, 4);
  const books = getProductsByCategory('Books').slice(0, 4);
  const gaming = getProductsByCategory('Gaming').slice(0, 4);
  const beauty = getProductsByCategory('Beauty').slice(0, 4);
  const sports = getProductsByCategory('Sports').slice(0, 4);
  const deals = getBestDeals(4);

  return (
    <div className="home-page" style={{ background: 'var(--bg-primary)', paddingBottom: '40px' }}>
      {/* Hero Carousel */}
      <div className="hero-carousel">
        {bannerSlides.map((slide, idx) => (
          <div 
            key={slide.id}
            className={`carousel-slide ${idx === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.bgImage})`,
            }}
          >
            {/* Dark gradient overlay for guaranteed text legibility */}
            <div 
              className="carousel-overlay"
              style={{
                background: slide.gradient || 'linear-gradient(90deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.1) 100%)',
              }}
            />

            <div className="carousel-content">
              {slide.badge && (
                <span className="carousel-badge">{slide.badge}</span>
              )}
              <h1 className="carousel-title">{slide.title}</h1>
              <p className="carousel-subtitle">{slide.subtitle}</p>
              <button 
                className="carousel-cta-btn"
                onClick={() => navigate(slide.link.replace('#', ''))}
                type="button"
              >
                {slide.cta} →
              </button>
            </div>
          </div>
        ))}

        {/* Carousel Bottom Mask blending with page background */}
        <div className="carousel-bottom-mask" />

        {/* Carousel Arrows */}
        <button 
          className="carousel-btn prev" 
          onClick={() => setCurrentSlide(prev => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          className="carousel-btn next" 
          onClick={() => setCurrentSlide(prev => (prev + 1) % bannerSlides.length)}
          aria-label="Next Slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots */}
        <div className="carousel-dots">
          {bannerSlides.map((_, i) => (
            <button 
              key={i} 
              className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 16px', marginTop: '20px' }}>

        {/* Lightning Deals */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <Zap size={22} color="#FFA41C" fill="#FFA41C" /> 
              <span>Today's Lightning Deals</span>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: '#CC0C39', 
                background: '#FFF0F1', 
                padding: '4px 10px', 
                borderRadius: '20px', 
                marginLeft: '10px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '5px' 
              }}>
                <Clock size={13} /> Ends in {String(dealTime.hours).padStart(2, '0')}h : {String(dealTime.minutes).padStart(2, '0')}m : {String(dealTime.seconds).padStart(2, '0')}s
              </span>
            </h2>
            <a href="#/deals" onClick={(e) => { e.preventDefault(); navigate('/deals'); }} className="section-link">
              See all deals →
            </a>
          </div>
          <div className="product-grid">
            {deals.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp size={20} color="#FF9900" /> Best Sellers
            </h2>
            <a href="#/category/Electronics" onClick={(e) => { e.preventDefault(); navigate('/category/Electronics'); }} className="section-link">
              Explore more →
            </a>
          </div>
          <div className="product-grid">
            {bestSellers.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </section>

        {/* Under ₹999 Budget Corner */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <Tag size={20} color="#067D62" /> Under ₹999 Budget Corner
            </h2>
            <a href="#/search?maxPrice=999" onClick={(e) => { e.preventDefault(); navigate('/search?maxPrice=999'); }} className="section-link">
              View all under ₹999 →
            </a>
          </div>
          <div className="product-grid">
            {under999.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </section>

        {/* Trending in Fashion */}
        {fashionTrends.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                <Sparkles size={20} color="#EC4899" /> Trending in Fashion & Apparel
              </h2>
              <a href="#/category/Fashion" onClick={(e) => { e.preventDefault(); navigate('/category/Fashion'); }} className="section-link">
                View all fashion →
              </a>
            </div>
            <div className="product-grid">
              {fashionTrends.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </section>
        )}

        {/* Home & Kitchen */}
        {homeKitchen.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">🏠 Home & Kitchen Specials</h2>
              <a href="#/category/Home %26 Kitchen" onClick={(e) => { e.preventDefault(); navigate('/category/Home %26 Kitchen'); }} className="section-link">
                Explore home →
              </a>
            </div>
            <div className="product-grid">
              {homeKitchen.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </section>
        )}

        {/* Gaming Arena */}
        {gaming.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">🎮 Next-Gen Gaming & Consoles</h2>
              <a href="#/category/Gaming" onClick={(e) => { e.preventDefault(); navigate('/category/Gaming'); }} className="section-link">
                View gaming store →
              </a>
            </div>
            <div className="product-grid">
              {gaming.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </section>
        )}

        {/* Books & Bestsellers */}
        {books.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">📚 Top Rated Books & Audiobooks</h2>
              <a href="#/category/Books" onClick={(e) => { e.preventDefault(); navigate('/category/Books'); }} className="section-link">
                Browse books →
              </a>
            </div>
            <div className="product-grid">
              {books.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </section>
        )}

        {/* Beauty & Personal Care */}
        {beauty.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">💄 Beauty & Personal Grooming</h2>
              <a href="#/category/Beauty" onClick={(e) => { e.preventDefault(); navigate('/category/Beauty'); }} className="section-link">
                Explore beauty →
              </a>
            </div>
            <div className="product-grid">
              {beauty.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </section>
        )}

        {/* Sports & Fitness */}
        {sports.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">🏋️ Gym & Fitness Essentials</h2>
              <a href="#/category/Sports" onClick={(e) => { e.preventDefault(); navigate('/category/Sports'); }} className="section-link">
                View sports gear →
              </a>
            </div>
            <div className="product-grid">
              {sports.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

