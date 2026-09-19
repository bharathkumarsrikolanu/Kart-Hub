import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, Share2, ShoppingCart, Check } from 'lucide-react';

export function ProductPage({ params, navigate }) {
  const { getProductById, getProductsByCategory } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const product = getProductById(params.id);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: '#565959', margin: '12px 0 24px' }}>The product you requested could not be located in the catalog.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'];

  const sellingPrice = Number(product.price);
  const origPrice = Number(product.originalPrice || product.price);
  const discount = Number(product.discount || (origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0));
  const wishlistActive = isInWishlist(product.id);
  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="container" style={{ padding: '20px 16px' }}>
      {/* Breadcrumbs */}
      <div className="breadcrumb" style={{ marginBottom: 16 }}>
        <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
        <span className="separator">›</span>
        <a href={`#/category/${encodeURIComponent(product.category)}`} onClick={(e) => { e.preventDefault(); navigate(`/category/${encodeURIComponent(product.category)}`); }}>
          {product.category}
        </a>
        <span className="separator">›</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail">
        {/* Left: Images Gallery */}
        <div className="product-gallery">
          <div className="gallery-main-image">
            <img src={images[selectedImg] || images[0]} alt={product.name} />
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbnails">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  className={`gallery-thumb ${i === selectedImg ? 'active' : ''}`}
                  onClick={() => setSelectedImg(i)}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Center: Details */}
        <div className="product-info">
          <span className="product-brand-tag">{product.brand}</span>
          <h1 className="product-title-lg">{product.name}</h1>

          {/* Ratings */}
          <div className="product-rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating || 4.5) ? '#FFA41C' : 'none'} color="#FFA41C" />
              ))}
            </div>
            <span className="rating-score">{product.rating || 4.5}</span>
            <span className="rating-reviews">{(product.reviewCount || 10).toLocaleString()} customer ratings</span>
          </div>

          <div className="divider"></div>

          {/* Pricing */}
          <div className="product-price-section">
            <div className="price-row">
              {discount > 0 && <span className="discount-tag">-{discount}%</span>}
              <span className="price-main">₹{sellingPrice.toLocaleString('en-IN')}</span>
            </div>
            {origPrice > sellingPrice && (
              <div className="mrp-row">
                <span>M.R.P.: </span>
                <span className="mrp-strike">₹{origPrice.toLocaleString('en-IN')}</span>
              </div>
            )}
            <p className="tax-inclusive">Inclusive of all taxes</p>
          </div>

          <div className="divider"></div>

          {/* Features */}
          <div className="product-features">
            <h3>About this item</h3>
            <ul>
              {product.description && <li>{product.description}</li>}
              {Array.isArray(product.features) && product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Assurances */}
          <div className="product-badges-row">
            <div className="badge-item">
              <Truck size={20} color="#2563EB" />
              <span>Free Delivery</span>
            </div>
            <div className="badge-item">
              <RotateCcw size={20} color="#2563EB" />
              <span>7 Days Return</span>
            </div>
            <div className="badge-item">
              <ShieldCheck size={20} color="#2563EB" />
              <span>KartHub Certified</span>
            </div>
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="buy-box">
          <div className="buy-box-price">₹{sellingPrice.toLocaleString('en-IN')}</div>
          <div className="buy-box-delivery">
            <span style={{ color: '#059669', fontWeight: 600 }}>FREE delivery</span> Tomorrow.
          </div>
          <div className="buy-box-stock" style={{ color: (product.stock || 50) > 0 ? '#059669' : '#DC2626', fontWeight: 700, margin: '12px 0' }}>
            {(product.stock || 50) > 0 ? 'In Stock' : 'Currently Unavailable'}
          </div>

          <div className="quantity-row" style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, fontWeight: 600, marginRight: 8 }}>Quantity:</label>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #D1D5DB' }}
            >
              {[1, 2, 3, 4, 5, 10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <button 
            className="btn btn-primary btn-block" 
            onClick={() => addToCart(product, quantity)}
            style={{ marginBottom: 10 }}
          >
            Add to Cart
          </button>

          <button 
            className="btn btn-buy-now btn-block" 
            onClick={() => {
              addToCart(product, quantity);
              navigate('/checkout');
            }}
            style={{ marginBottom: 12, background: '#FFA41C', color: '#0F1111', fontWeight: 700 }}
          >
            Buy Now
          </button>

          <button 
            className="btn btn-outline btn-block"
            onClick={() => toggleWishlist(product)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <Heart size={16} fill={wishlistActive ? '#EF4444' : 'none'} color={wishlistActive ? '#EF4444' : '#565959'} />
            {wishlistActive ? 'In Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section" style={{ marginTop: 48 }}>
          <div className="section-header">
            <h2 className="section-title">Similar Products You Might Like</h2>
          </div>
          <div className="product-grid product-grid-4">
            {related.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
