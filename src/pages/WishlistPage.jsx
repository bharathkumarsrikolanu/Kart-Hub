import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { Heart } from 'lucide-react';

export function WishlistPage({ navigate }) {
  const { wishlist } = useCart();
  const { getProductById } = useProducts();

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <Heart size={64} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Your Wishlist is Empty</h2>
        <p style={{ color: '#565959', marginBottom: 24 }}>Explore products and click the heart icon to save items for later.</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
          Discover Products
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 16px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>Your Wishlist ({wishlist.length} items)</h1>
      <div className="product-grid product-grid-4">
        {wishlist.map(item => {
          const fullProduct = getProductById(item.id) || item;
          return <ProductCard key={fullProduct.id} product={fullProduct} navigate={navigate} />;
        })}
      </div>
    </div>
  );
}
