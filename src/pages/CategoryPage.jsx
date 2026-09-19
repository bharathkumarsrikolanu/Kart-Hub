import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export function CategoryPage({ params, query, navigate }) {
  const { products } = useProducts();
  const categoryName = decodeURIComponent(params.name);
  const subFilter = (query?.sub || '').toLowerCase();

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return products.filter(p => (p.category || '').toLowerCase() === categoryName.toLowerCase());
  }, [products, categoryName]);

  // Extract unique brands and subcategories
  const brands = useMemo(() => {
    return [...new Set(categoryProducts.map(p => p.brand).filter(Boolean))].sort();
  }, [categoryProducts]);

  const subcategories = useMemo(() => {
    return [...new Set(categoryProducts.map(p => p.subcategory).filter(Boolean))].sort();
  }, [categoryProducts]);

  // Apply filters & sorting
  const filteredProducts = useMemo(() => {
    let list = categoryProducts.filter(p => {
      if (subFilter && (p.subcategory || '').toLowerCase() !== subFilter) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'discount') list.sort((a, b) => (b.discount || 0) - (a.discount || 0));

    return list;
  }, [categoryProducts, subFilter, selectedBrands, maxPrice, sortBy]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="container" style={{ padding: '16px' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ marginBottom: 16 }}>
        <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
        <span className="separator">›</span>
        <span>{categoryName}</span>
        {subFilter && (
          <>
            <span className="separator">›</span>
            <span style={{ textTransform: 'capitalize' }}>{subFilter}</span>
          </>
        )}
      </div>

      <div className="category-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>{categoryName}</h1>
          <p style={{ color: '#565959', fontSize: 14 }}>{filteredProducts.length} items found</p>
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      <div className="page-with-sidebar">
        {/* Sidebar Filters */}
        <aside className={`sidebar ${mobileFilterOpen ? 'active' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Filters</h3>
            {selectedBrands.length > 0 && (
              <button 
                onClick={() => setSelectedBrands([])}
                style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <div className="sidebar-section">
              <h4>Subcategories</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="checkbox-wrap" style={{ cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="subcategory" 
                    checked={!subFilter} 
                    onChange={() => navigate(`/category/${encodeURIComponent(categoryName)}`)} 
                  /> All {categoryName}
                </label>
                {subcategories.map(sub => (
                  <label key={sub} className="checkbox-wrap" style={{ cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="subcategory" 
                      checked={subFilter === sub.toLowerCase()} 
                      onChange={() => navigate(`/category/${encodeURIComponent(categoryName)}?sub=${encodeURIComponent(sub)}`)} 
                    /> {sub}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Brands */}
          {brands.length > 0 && (
            <div className="sidebar-section">
              <h4>Brand</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 200, overflowY: 'auto' }}>
                {brands.map(b => (
                  <label key={b} className="checkbox-wrap" style={{ cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(b)} 
                      onChange={() => toggleBrand(b)} 
                    /> {b}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div className="sidebar-section">
            <h4>Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h4>
            <input 
              type="range" 
              min="500" 
              max="200000" 
              step="500" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <main className="content-area">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F9FAFB', borderRadius: 8 }}>
              <h3>No products match your filters</h3>
              <p style={{ color: '#565959', margin: '8px 0 16px' }}>Try adjusting or resetting your filter selections.</p>
              <button 
                className="btn btn-outline" 
                onClick={() => { setSelectedBrands([]); setMaxPrice(200000); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="product-grid product-grid-3">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
