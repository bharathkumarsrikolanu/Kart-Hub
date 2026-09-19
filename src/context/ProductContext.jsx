import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products.js';

const ProductContext = createContext();

// API base URL — points to Express/MongoDB backend
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';

const sanitizeProduct = (p) => {
  if (!p) return p;
  let images = Array.isArray(p.images) ? [...p.images] : (p.image ? [p.image] : []);
  
  if (p.id === 'HOME009') {
    images = [
      'https://images.unsplash.com/photo-1614633837748-c2721210151f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&h=600&fit=crop'
    ];
  } else if (p.id === 'HOME010') {
    images = [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop'
    ];
  } else if (p.id === 'HOME011') {
    images = [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=600&fit=crop'
    ];
  } else if (p.id === 'HOME012') {
    images = [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&h=600&fit=crop'
    ];
  }

  images = images.filter(url => typeof url === 'string' && !url.includes('1527011046414') && !url.includes('1628744448840'));

  if (images.length === 0) {
    images = ['https://images.unsplash.com/photo-1614633837748-c2721210151f?w=600&h=600&fit=crop'];
  }

  return {
    ...p,
    image: images[0],
    images
  };
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('karthub_products') || localStorage.getItem('karthub_db_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(sanitizeProduct);
      }
    } catch {}
    return initialProducts.map(sanitizeProduct);
  });

  const [loading, setLoading] = useState(false);

  // Helper to persist in local storage cache
  const saveToLocalCache = (list) => {
    try {
      const cleaned = list.map(sanitizeProduct);
      localStorage.setItem('karthub_products', JSON.stringify(cleaned));
      localStorage.setItem('karthub_db_products', JSON.stringify(cleaned));
    } catch (e) {
      console.warn('LocalStorage save notice:', e);
    }
  };

  // Fetch products from MongoDB backend
  const fetchProductsFromApi = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const cleaned = json.data.map(sanitizeProduct);
          setProducts(cleaned);
          saveToLocalCache(cleaned);
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
    const imgUrl = newProd.image || (Array.isArray(newProd.images) && newProd.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop';

    const prod = {
      ...newProd,
      id: newProd.id || ('PROD' + Date.now()),
      price: sellingPrice,
      originalPrice: origPrice,
      discount: Number(newProd.discount) || calculatedDiscount,
      rating: Number(newProd.rating) || 4.5,
      reviewCount: Number(newProd.reviewCount) || 10,
      image: imgUrl,
      images: Array.isArray(newProd.images) && newProd.images.length ? newProd.images : [imgUrl],
      description: newProd.description || 'Quality product available on KartHub.',
      features: newProd.features || ['Genuine Brand', 'Fast Delivery', '7 Days Replacement Policy'],
      specifications: newProd.specifications || { 'Brand': newProd.brand || 'KartHub', 'Category': newProd.category || 'General' },
      seller: newProd.seller || 'KartHub Authorized Retailer',
      stock: Number(newProd.stock) || 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedList = [prod, ...products];
    setProducts(updatedList);
    saveToLocalCache(updatedList);

    // Add to MongoDB via API
    try {
      await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod)
      });
    } catch (err) {
      console.warn('API add product notice:', err.message);
    }

    return prod;
  };

  const updateProduct = async (id, updatedFields) => {
    const idx = products.findIndex(p => p.id === id);
    if (idx < 0) return null;

    const current = products[idx];
    const sellingPrice = updatedFields.price !== undefined ? Number(updatedFields.price) : current.price;
    const origPrice = updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : (current.originalPrice || sellingPrice);
    const calculatedDiscount = origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0;
    const finalImage = updatedFields.image || (Array.isArray(updatedFields.images) && updatedFields.images[0]) || current.image;

    const updated = {
      ...current,
      ...updatedFields,
      price: sellingPrice,
      originalPrice: origPrice,
      discount: updatedFields.discount !== undefined ? Number(updatedFields.discount) : calculatedDiscount,
      image: finalImage,
      images: updatedFields.image ? [updatedFields.image] : (updatedFields.images || current.images || [finalImage]),
      updatedAt: new Date().toISOString()
    };

    const newProductList = products.map(p => p.id === id ? updated : p);
    setProducts(newProductList);
    saveToLocalCache(newProductList);

    // Update in MongoDB via API
    try {
      await fetch(`${API_URL}/api/products/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.warn('API update product notice:', err.message);
    }

    return updated;
  };

  const deleteProduct = async (id) => {
    const newProductList = products.filter(p => p.id !== id);
    setProducts(newProductList);
    saveToLocalCache(newProductList);

    // Delete from MongoDB via API
    try {
      await fetch(`${API_URL}/api/products/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('API delete product notice:', err.message);
    }
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
