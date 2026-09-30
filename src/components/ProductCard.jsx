import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Star, Heart, Check } from 'lucide-react';

export function ProductCard({ product, navigate }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!product) return null;

  const rawImgs = Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'];
  const cardImages = rawImgs.filter(Boolean);
  const currentImg = cardImages[activeImgIdx] || cardImages[0];

  const sellingPrice = Number(product.price);
  const origPrice = Number(product.originalPrice || product.price);
  const discount = Number(product.discount || (origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0));
  const wishlistActive = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div 
      className="product-card" 
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseLeave={() => setActiveImgIdx(0)}
    >
      {/* Wishlist Button */}
      <button 
        className={`wishlist-btn ${wishlistActive ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        title={wishlistActive ? 'Remove from Wishlist' : 'Add to Wishlist'}
        type="button"
        aria-label="Wishlist"
      >
        <Heart size={16} fill={wishlistActive ? '#CC0C39' : 'none'} color={wishlistActive ? '#CC0C39' : '#565959'} />
      </button>

      {/* Discount Badge */}
      {discount > 0 && (
        <span className="discount-badge">{discount}% OFF</span>
      )}

      {/* Image Wrap with Multi-Image Hover Preview */}
      <div className="product-image-wrap" style={{ position: 'relative' }}>
        <img 
          src={currentImg} 
          alt={product.name} 
          loading="lazy" 
          style={{ transition: 'opacity 0.2s ease-in-out' }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1614633837748-c2721210151f?w=400&h=400&fit=crop';
          }}
        />

        {/* Multi-Image Dots / Pagination on Card */}
        {cardImages.length > 1 && (
          <div 
            style={{
              position: 'absolute',
              bottom: 6,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
              padding: '2px 0',
              zIndex: 3
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {cardImages.slice(0, 4).map((_, i) => (
              <span
                key={i}
                onMouseEnter={() => setActiveImgIdx(i)}
                style={{
                  width: activeImgIdx === i ? 14 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: activeImgIdx === i ? '#FF9900' : 'rgba(0,0,0,0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Info */}
      <div className="product-info">
        <div className="product-brand">{product.brand || 'KartHub'}</div>
        
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={13} 
                fill={i < Math.floor(product.rating || 4.5) ? '#FFA41C' : 'none'} 
                color="#FFA41C" 
              />
            ))}
          </div>
          <span className="rating-count">{product.rating || 4.5}</span>
          <span className="review-count">({(product.reviewCount || 10).toLocaleString()})</span>
        </div>

        {/* Price Section */}
        <div className="product-price-section">
          <span className="product-price">₹{sellingPrice.toLocaleString('en-IN')}</span>
          {origPrice > sellingPrice && (
            <>
              <span className="product-mrp">₹{origPrice.toLocaleString('en-IN')}</span>
              <span className="product-discount">({discount}% off)</span>
            </>
          )}
        </div>

        {/* Delivery Tag */}
        <div className="product-delivery">
          <span className="prime-badge">✓ FREE Delivery</span> <strong>Tomorrow</strong>
        </div>

        {/* Add to Cart Button */}
        <button 
          className={`add-to-cart-btn ${justAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
          type="button"
        >
          {justAdded ? (
            <>
              <Check size={16} /> Added!
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
}

