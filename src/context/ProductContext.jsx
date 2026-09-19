import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products.js';

const ProductContext = createContext();

// API base URL — points to Express/MongoDB backend
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('karthub_db_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return initialProducts;
  });

  const [loading, setLoading] = useState(false);

  // Fetch products from MongoDB backend
  const fetchProductsFromApi = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
          try {
            localStorage.setItem('karthub_db_products', JSON.stringify(json.data));
          } catch {}
          return;
        }
      }
    } catch (e) {
      console.warn('API products fetch notice:', e.message);
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  const addProduct = async (newProd) => {
    const sellingPrice = Number(newProd.price) || 999;
    const origPrice = Number(newProd.originalPrice) || sellingPrice;
    const calculatedDiscount = origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0;

    const prod = {
      ...newProd,
      id: newProd.id || ('PROD' + Date.now()),
      price: sellingPrice,
      originalPrice: origPrice,
      discount: Number(newProd.discount) || calculatedDiscount,
      rating: Number(newProd.rating) || 4.5,
      reviewCount: Number(newProd.reviewCount) || 10,
      images: Array.isArray(newProd.images) && newProd.images.length ? newProd.images : [newProd.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
      description: newProd.description || 'Quality product available on KartHub.',
      features: newProd.features || ['Genuine Brand', 'Fast Delivery', '7 Days Replacement Policy'],
      specifications: newProd.specifications || { 'Brand': newProd.brand || 'KartHub', 'Category': newProd.category || 'General' },
      seller: newProd.seller || 'KartHub Authorized Retailer',
      stock: Number(newProd.stock) || 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProducts(prev => [prod, ...prev]);
    try {
      localStorage.setItem('karthub_db_products', JSON.stringify([prod, ...products]));
    } catch {}

    // Save to MongoDB via API
    try {
      fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod)
      }).catch(() => {});
    } catch {}

    return prod;
  };

  const updateProduct = async (id, updatedFields) => {
    const idx = products.findIndex(p => p.id === id);
    if (idx < 0) return null;

    const current = products[idx];
    const sellingPrice = updatedFields.price !== undefined ? Number(updatedFields.price) : current.price;
    const origPrice = updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : (current.originalPrice || sellingPrice);
    const calculatedDiscount = origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0;

    const updated = {
      ...current,
      ...updatedFields,
      price: sellingPrice,
      originalPrice: origPrice,
      discount: updatedFields.discount !== undefined ? Number(updatedFields.discount) : calculatedDiscount,
      images: updatedFields.image ? [updatedFields.image] : (updatedFields.images || current.images),
      image: updatedFields.image || (Array.isArray(updatedFields.images) ? updatedFields.images[0] : current.image),
      updatedAt: new Date().toISOString()
    };

    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    try {
      localStorage.setItem('karthub_db_products', JSON.stringify(products.map(p => p.id === id ? updated : p)));
    } catch {}

    // Update in MongoDB via API
    try {
      fetch(`${API_URL}/api/products/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      }).catch(() => {});
    } catch {}

    return updated;
  };

  const deleteProduct = async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      localStorage.setItem('karthub_db_products', JSON.stringify(products.filter(p => p.id !== id)));
    } catch {}

    // Delete from MongoDB via API
    try {
      fetch(`${API_URL}/api/products/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch(() => {});
    } catch {}
  };

  const getProductById = (id) => products.find(p => p.id === id);
  const getProductsByCategory = (cat) => products.filter(p => (p.category || '').toLowerCase() === (cat || '').toLowerCase());
  const getFeaturedProducts = (count = 10) => [...products].sort((a, b) => ((b.rating || 4) * (b.reviewCount || 10)) - ((a.rating || 4) * (a.reviewCount || 10))).slice(0, count);
  const getBestDeals = (count = 10) => [...products].sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, count);
  const getProductsUnderPrice = (maxPrice, count = 10) => products.filter(p => p.price <= maxPrice).sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, count);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductsByCategory,
      getFeaturedProducts,
      getBestDeals,
      getProductsUnderPrice,
      fetchProductsFromApi
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
