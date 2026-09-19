import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products.js';

const ProductContext = createContext();

// Relative API base URL — works everywhere (local dev via proxy & production Render)
const API_URL = '';

const sanitizeProduct = (p) => {
  if (!p) return p;
  
  // Keep whatever image the product currently has (from MongoDB, admin edits, or initial catalog)
  let images = Array.isArray(p.images) && p.images.length > 0 
    ? [...p.images] 
    : (p.image ? [p.image] : []);

  // Filter out any known bad/broken placeholder IDs if any
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

  // Fetch live products directly from MongoDB backend
  const fetchProductsFromApi = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/products`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
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
      console.warn('MongoDB products fetch notice:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  const addProduct = async (newProd) => {
    const sellingPrice = Number(newProd.price) || 999;
    const origPrice = Number(newProd.originalPrice) || sellingPrice;
    const calculatedDiscount = origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0;
    const imgUrl = newProd.image || (Array.isArray(newProd.images) && newProd.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop';

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

    // Persist to MongoDB permanently via REST API
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
    
    // Explicitly preserve the new image if provided
    const finalImage = updatedFields.image !== undefined ? updatedFields.image : current.image;
    const finalImages = updatedFields.image 
      ? [updatedFields.image] 
      : (Array.isArray(updatedFields.images) && updatedFields.images.length > 0 ? updatedFields.images : current.images || [finalImage]);

    const updated = {
      ...current,
      ...updatedFields,
      price: sellingPrice,
      originalPrice: origPrice,
      discount: updatedFields.discount !== undefined ? Number(updatedFields.discount) : calculatedDiscount,
      image: finalImage,
      images: finalImages,
      updatedAt: new Date().toISOString()
    };

    const newProductList = products.map(p => p.id === id ? updated : p);
    setProducts(newProductList);
    saveToLocalCache(newProductList);

    // Persist permanently in MongoDB Atlas
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

    // Delete permanently from MongoDB Atlas
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
