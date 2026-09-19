import React, { useMemo } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { Search } from 'lucide-react';

export function SearchPage({ query, navigate }) {
  const { products } = useProducts();
  const searchTerm = (query?.q || '').toLowerCase().trim();
  const categoryFilter = (query?.category || '').toLowerCase().trim();
  const maxPrice = Number(query?.maxPrice) || 0;

  const results = useMemo(() => {
    return products.filter(p => {
      if (categoryFilter && (p.category || '').toLowerCase() !== categoryFilter) return false;
      if (maxPrice > 0 && p.price > maxPrice) return false;
      if (searchTerm) {
        return (
          (p.name || '').toLowerCase().includes(searchTerm) ||
          (p.brand || '').toLowerCase().includes(searchTerm) ||
          (p.category || '').toLowerCase().includes(searchTerm) ||
          (p.subcategory || '').toLowerCase().includes(searchTerm) ||
          (p.description || '').toLowerCase().includes(searchTerm)
        );
      }
      return true;
    });
  }, [products, searchTerm, categoryFilter, maxPrice]);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '80vh', padding: '24px 0 48px' }}>
      <div className="container" style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F1111' }}>
            {searchTerm ? `Results for "${query.q}"` : (maxPrice ? `Deals Under ₹${maxPrice}` : 'Search Results')}
          </h1>
          <p style={{ color: '#565959', fontSize: 14, marginTop: 4 }}>{results.length} products found</p>
        </div>

        {results.length === 0 ? (
          <div className="section" style={{ textAlign: 'center', padding: '80px 20px' }}>
            <Search size={48} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>No matching products found</h3>
            <p style={{ color: '#565959', margin: '8px 0 20px' }}>Try checking your spelling or using more general terms.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Explore All Products</button>
          </div>
        ) : (
          <div className="section" style={{ padding: '24px' }}>
            <div className="product-grid">
              {results.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

