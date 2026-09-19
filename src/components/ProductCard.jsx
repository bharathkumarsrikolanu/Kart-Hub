import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Star, Heart, Check } from 'lucide-react';

export function ProductCard({ product, navigate }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const imgSrc = (Array.isArray(product.images) && product.images[0]) || product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop';
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
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
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

      {/* Image Wrap */}
      <div className="product-image-wrap">
        <img src={imgSrc} alt={product.name} loading="lazy" />
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

