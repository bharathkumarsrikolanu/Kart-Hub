import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, CheckCircle2, ChevronRight } from 'lucide-react';

export function ProductPage({ params, navigate }) {
  const { getProductById, getProductsByCategory } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useCart();

  const product = getProductById(params.id);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div style={{ maxWidth: 600, margin: '60px auto', padding: 20, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Product Not Found</h2>
        <p style={{ color: '#565959', margin: '0 0 24px' }}>The product you requested could not be located in the catalog.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  const rawImages = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://images.unsplash.com/photo-1614633837748-c2721210151f?w=600&h=600&fit=crop'];

  // Clean and ensure valid appliance images
  const images = rawImages
    .filter(img => typeof img === 'string' && !img.includes('1527011046414') && !img.includes('1628744448840'))
    .map(img => img ? img.replace('w=400&h=400', 'w=800&h=800') : 'https://images.unsplash.com/photo-1614633837748-c2721210151f?w=800&h=800&fit=crop');

  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1614633837748-c2721210151f?w=800&h=800&fit=crop');
  }

  const activeImgUrl = images[selectedImg] || images[0];

  const sellingPrice = Number(product.price) || 0;
  const origPrice = Number(product.originalPrice || product.price) || sellingPrice;
  const discount = Number(product.discount || (origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0));
  const wishlistActive = isInWishlist(product.id);
  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    if (showToast) showToast(`✓ Added ${quantity} × ${product.name.slice(0, 24)}... to Cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="product-view-container">
      {/* Embedded scoped responsive CSS to ensure zero-collision fluid scrolling */}
      <style>{`
        .product-view-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 14px;
          width: 100%;
          box-sizing: border-box;
          position: relative;
        }
        .product-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #565959;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .product-breadcrumbs a {
          color: #007185;
          text-decoration: none;
        }
        .product-breadcrumbs a:hover {
          text-decoration: underline;
        }
        
        /* Grid Layout */
        .product-main-grid {
          display: grid;
          grid-template-columns: 440px 1fr 300px;
          gap: 28px;
          align-items: start;
          position: static;
        }

        /* Gallery Column */
        .product-gallery-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: static;
        }
        .product-gallery-box {
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 16px;
          width: 100%;
          box-sizing: border-box;
          position: static;
        }
        .product-gallery-main-img {
          width: 100%;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FAFAFA;
          border-radius: 8px;
          overflow: hidden;
          position: static;
        }
        .product-gallery-main-img img {
          max-width: 92%;
          max-height: 92%;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }
        .product-thumbs-strip {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 12px;
        }
        .product-thumb-btn {
          width: 54px;
          height: 54px;
          border-radius: 6px;
          background: #ffffff;
          padding: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s ease;
        }

        /* Details Column */
        .product-details-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: static;
        }

        /* BuyBox Column */
        .product-buybox-col {
          position: static;
        }
        .product-buybox-card {
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          position: static;
        }

        /* Tablet Responsive (769px to 1024px) */
        @media (max-width: 1024px) {
          .product-main-grid {
            grid-template-columns: 360px 1fr;
            gap: 20px;
          }
          .product-buybox-col {
            grid-column: 1 / -1;
          }
          .product-gallery-main-img {
            height: 320px;
          }
        }

        /* Mobile Responsive (under 768px) - 100% Smooth Natural Flow */
        @media (max-width: 768px) {
          .product-view-container {
            padding: 10px 12px;
          }
          .product-main-grid {
            display: flex;
            flex-direction: column;
            gap: 16px;
            position: static;
          }
          .product-gallery-col,
          .product-details-col,
          .product-buybox-col,
          .product-gallery-box,
          .product-gallery-main-img,
          .product-buybox-card {
            position: static !important;
            top: auto !important;
            float: none !important;
            width: 100% !important;
          }
          .product-gallery-box {
            padding: 10px;
            border-radius: 8px;
          }
          .product-gallery-main-img {
            height: 260px !important;
          }
        }
      `}</style>

      {/* Breadcrumbs */}
      <div className="product-breadcrumbs">
        <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
        <ChevronRight size={14} color="#888" />
        <a href={`#/category/${encodeURIComponent(product.category)}`} onClick={(e) => { e.preventDefault(); navigate(`/category/${encodeURIComponent(product.category)}`); }}>
          {product.category}
        </a>
        <ChevronRight size={14} color="#888" />
        <span style={{ color: '#111827', fontWeight: 600 }}>{product.brand || product.category}</span>
      </div>

      {/* Main Grid */}
      <div className="product-main-grid">
        
        {/* Left Column: Gallery */}
        <div className="product-gallery-col">
          <div className="product-gallery-box">
            <div className="product-gallery-main-img">
              <img 
                src={activeImgUrl} 
                alt={product.name} 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1614633837748-c2721210151f?w=600&h=600&fit=crop';
                }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="product-thumbs-strip">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    type="button"
                    className="product-thumb-btn"
                    onClick={() => setSelectedImg(i)}
                    style={{
                      border: i === selectedImg ? '2px solid #FF9900' : '1px solid #D1D5DB',
                    }}
                  >
                    <img src={img} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assurances Badges below gallery on desktop / mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <div style={{ textAlign: 'center', padding: '10px 4px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <Truck size={18} color="#2563EB" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>Free Delivery</div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 4px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <RotateCcw size={18} color="#059669" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>7 Days Return</div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 4px', background: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <ShieldCheck size={18} color="#D97706" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>KartHub Assured</div>
            </div>
          </div>
        </div>

        {/* Center Column: Product Details & Specs */}
        <div className="product-details-col">
          {/* Brand Tag */}
          <div>
            <span style={{ display: 'inline-block', background: '#EEF2FF', color: '#4F46E5', fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 4, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {product.brand}
            </span>
            <h1 style={{ fontSize: 21, fontWeight: 700, color: '#0F1111', lineHeight: 1.35, margin: '0 0 10px' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating || 4.5) ? '#FFA41C' : 'none'} color="#FFA41C" />
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#0F1111' }}>{product.rating || 4.5}</span>
              <span style={{ color: '#D1D5DB' }}>|</span>
              <span style={{ color: '#007185', fontSize: 14, fontWeight: 500 }}>
                {(product.reviewCount || 10).toLocaleString('en-IN')} ratings
              </span>
            </div>
          </div>

          {/* Pricing Card */}
          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
              {discount > 0 && (
                <span style={{ color: '#CC0C39', fontSize: 24, fontWeight: 400 }}>-{discount}%</span>
              )}
              <span style={{ fontSize: 28, fontWeight: 800, color: '#0F1111' }}>
                ₹{sellingPrice.toLocaleString('en-IN')}
              </span>
            </div>
            {origPrice > sellingPrice && (
              <div style={{ fontSize: 13, color: '#565959', marginBottom: 4 }}>
                M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{origPrice.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#059669', fontWeight: 600 }}>
              <CheckCircle2 size={15} /> Inclusive of all taxes • Instant Dispatch
            </div>
          </div>

          {/* About this item (Bullet points) */}
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 14 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F1111', marginBottom: 10 }}>About this item</h3>
            <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#374151', lineHeight: 1.5 }}>
              {product.description && <li style={{ fontWeight: 500 }}>{product.description}</li>}
              {Array.isArray(product.features) && product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Technical Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F1111', marginBottom: 12 }}>Product Specifications</h3>
              <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={key} style={{ background: idx % 2 === 0 ? '#F9FAFB' : '#FFF', borderBottom: '1px solid #E5E7EB' }}>
                        <td style={{ padding: '8px 14px', color: '#6B7280', fontWeight: 600, width: '40%' }}>{key}</td>
                        <td style={{ padding: '8px 14px', color: '#111827', fontWeight: 500 }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Buy Box */}
        <div className="product-buybox-col">
          <div className="product-buybox-card">
            <div style={{ fontSize: 14, color: '#059669', fontWeight: 600, marginBottom: 6 }}>
              FREE delivery <span style={{ color: '#111827', fontWeight: 700 }}>Tomorrow</span>
            </div>

            <div style={{ fontSize: 14, fontWeight: 700, color: (product.stock || 50) > 0 ? '#059669' : '#DC2626', marginBottom: 14 }}>
              {(product.stock || 50) > 0 ? '✓ In Stock' : 'Currently Unavailable'}
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Quantity:</label>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #D1D5DB',
                  fontSize: 14,
                  fontWeight: 600,
                  background: '#F9FAFB',
                  cursor: 'pointer'
                }}
              >
                {[1, 2, 3, 4, 5, 10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'unit' : 'units'}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button 
                type="button"
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: '#FFD814',
                  color: '#0F1111',
                  border: '1px solid #FCD200',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>

              <button 
                type="button"
                onClick={handleBuyNow}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: '#FFA41C',
                  color: '#0F1111',
                  border: '1px solid #FF8F00',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer'
                }}
              >
                Buy Now
              </button>

              <button 
                type="button"
                onClick={() => toggleWishlist(product)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 8,
                  background: '#FFF',
                  color: wishlistActive ? '#DC2626' : '#374151',
                  border: '1px solid #D1D5DB',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <Heart size={16} fill={wishlistActive ? '#DC2626' : 'none'} color={wishlistActive ? '#DC2626' : '#6B7280'} />
                {wishlistActive ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #E5E7EB', fontSize: 12, color: '#6B7280', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div>Ships from: <strong style={{ color: '#111827' }}>KartHub Direct</strong></div>
              <div>Sold by: <strong style={{ color: '#111827' }}>{product.seller || 'KartHub Retailer'}</strong></div>
            </div>
          </div>
        </div>

      </div>

      {/* Similar Products Section */}
      {related.length > 0 && (
        <section style={{ marginTop: 36, borderTop: '1px solid #E5E7EB', paddingTop: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>Similar Products in {product.category}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {related.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductPage;
