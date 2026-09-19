import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { categories } from '../data/categories.js';
import { 
  Package, Users, ShoppingBag, DollarSign, Plus, Edit, Trash2, 
  Download, Search, Upload, Check, RefreshCw, Database, CheckCircle2 
} from 'lucide-react';

const PRESET_IMAGES = [
  { name: '📱 Smartphone', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
  { name: '💻 Laptop', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
  { name: '🎧 Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { name: '👟 Shoes', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
  { name: '👕 Fashion', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=400&fit=crop' },
  { name: '⌚ Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { name: '🧴 Beauty', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
  { name: '🍳 Kitchen', url: 'https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=400&h=400&fit=crop' }
];

async function compressImageFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const max = 500;
        if (width > height && width > max) {
          height = Math.round((height * max) / width);
          width = max;
        } else if (height > max) {
          width = Math.round((width * max) / height);
          height = max;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
    };
  });
}

export function AdminPage({ navigate }) {
  const { user, isAdmin, allUsers, fetchUsers } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [orders, setOrders] = useState([]);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form States
  const [newProd, setNewProd] = useState({
    name: '', category: 'Electronics', brand: '', price: '', originalPrice: '', stock: 50, image: '', description: ''
  });
  const [editProd, setEditProd] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const json = await res.json();
        if (json.data) setOrders(json.data);
      }
    } catch {}
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      showToast(`✓ Order status updated to "${newStatus}"!`);
    } catch {
      showToast('Status updated locally.', 'info');
    }
  };

  // CSV Export helper
  const exportToCsv = (type) => {
    let headers = [];
    let rows = [];
    let filename = `karthub_${type}_${new Date().toISOString().split('T')[0]}.csv`;

    if (type === 'products') {
      headers = ['ID', 'Name', 'Brand', 'Category', 'Price', 'MRP', 'Discount', 'Stock', 'Rating'];
      rows = products.map(p => [
        `"${p.id}"`, `"${p.name.replace(/"/g, '""')}"`, `"${p.brand}"`, `"${p.category}"`,
        p.price, p.originalPrice || p.price, p.discount || 0, p.stock || 50, p.rating || 4.5
      ]);
    } else if (type === 'orders') {
      headers = ['Order ID', 'Customer Name', 'Email', 'Total', 'Payment Method', 'Status', 'Date'];
      rows = orders.map(o => [
        `"${o.id}"`, `"${o.customerName}"`, `"${o.customerEmail}"`, o.total, `"${o.paymentMethod}"`, `"${o.status}"`, `"${new Date(o.date || o.createdAt).toLocaleDateString()}"`
      ]);
    } else {
      headers = ['User ID', 'Name', 'Email', 'Phone', 'Role', 'Created Date'];
      rows = allUsers.map(u => [
        `"${u.id}"`, `"${u.name}"`, `"${u.email}"`, `"${u.phone || ''}"`, `"${u.role}"`, `"${new Date(u.createdAt).toLocaleDateString()}"`
      ]);
    }

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    showToast(`✓ Exported ${type}.csv for Excel!`);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      showToast('Product name and price are required.', 'error');
      return;
    }

    await addProduct({
      ...newProd,
      images: [newProd.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop']
    });

    setShowAddModal(false);
    setNewProd({ name: '', category: 'Electronics', brand: '', price: '', originalPrice: '', stock: 50, image: '', description: '' });
    showToast('✓ Product added successfully to catalog and database!');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editProd || !editProd.name || !editProd.price) return;

    await updateProduct(editProd.id, editProd);
    setShowEditModal(false);
    setEditProd(null);
    showToast('✓ Product changes saved to database!');
  };

  const handleDelete = async (prodId, prodName) => {
    if (window.confirm(`Are you sure you want to delete "${prodName}" from the store and database?`)) {
      await deleteProduct(prodId);
      showToast(`✓ Removed "${prodName}" from catalog.`);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || (p.category || '').toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  if (!isAdmin) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <h2>Admin Access Restricted</h2>
        <p style={{ color: '#565959', margin: '12px 0 24px' }}>Please sign in with the admin account to access the dashboard.</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>Sign in as Admin</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 16px', maxWidth: 1250 }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111827' }}>⚙ KartHub MERN Management Console</h1>
          <p style={{ color: '#6B7280', fontSize: 14 }}>Connected with MongoDB, Node.js REST API & Cloud Storage</p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}
          >
            <Plus size={18} /> Add New Product
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => exportToCsv(activeTab)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, background: '#FFF' }}
          >
            <Download size={16} /> Export to Excel (.CSV)
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#FFF', padding: 20, borderRadius: 8, border: '1px solid #E5E7EB', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ background: '#EEF2FF', padding: 12, borderRadius: 8, color: '#4F46E5' }}><Package size={24} /></div>
          <div>
            <span style={{ fontSize: 13, color: '#6B7280' }}>Total Products</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0' }}>{products.length}</h3>
          </div>
        </div>

        <div style={{ background: '#FFF', padding: 20, borderRadius: 8, border: '1px solid #E5E7EB', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ background: '#ECFDF5', padding: 12, borderRadius: 8, color: '#059669' }}><ShoppingBag size={24} /></div>
          <div>
            <span style={{ fontSize: 13, color: '#6B7280' }}>Total Orders</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0' }}>{orders.length}</h3>
          </div>
        </div>

        <div style={{ background: '#FFF', padding: 20, borderRadius: 8, border: '1px solid #E5E7EB', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ background: '#FEF3C7', padding: 12, borderRadius: 8, color: '#D97706' }}><DollarSign size={24} /></div>
          <div>
            <span style={{ fontSize: 13, color: '#6B7280' }}>Total Revenue</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0' }}>₹{totalRevenue.toLocaleString('en-IN')}</h3>
          </div>
        </div>

        <div style={{ background: '#FFF', padding: 20, borderRadius: 8, border: '1px solid #E5E7EB', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ background: '#F3E8FF', padding: 12, borderRadius: 8, color: '#9333EA' }}><Users size={24} /></div>
          <div>
            <span style={{ fontSize: 13, color: '#6B7280' }}>Registered Users</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0' }}>{Math.max(allUsers.length, 1)}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #E5E7EB', marginBottom: 20 }}>
        {['products', 'orders', 'users'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              fontWeight: 700,
              fontSize: 15,
              textTransform: 'capitalize',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === tab ? '#FF9900' : '#4B5563',
              borderBottom: activeTab === tab ? '3px solid #FF9900' : '3px solid transparent',
              marginBottom: -2
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div style={{ background: '#FFF', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: 300 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input 
                  type="text" 
                  placeholder="Search by name, brand, ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
                />
              </div>

              {/* Category Filter Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Category:</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid #D1D5DB',
                    fontSize: 14,
                    fontWeight: 600,
                    background: '#F9FAFB',
                    cursor: 'pointer'
                  }}
                >
                  <option value="All">All Categories ({products.length})</option>
                  {categories.map(cat => {
                    const count = products.filter(p => (p.category || '').toLowerCase() === cat.name.toLowerCase()).length;
                    return (
                      <option key={cat.name} value={cat.name}>
                        {cat.name} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {categoryFilter !== 'All' && (
                <button
                  onClick={() => setCategoryFilter('All')}
                  style={{ padding: '6px 12px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#4F46E5' }}
                >
                  Clear Filter
                </button>
              )}
              <span style={{ fontSize: 14, color: '#6B7280' }}>Showing {filteredProducts.length} items</span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>Product</th>
                  <th style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>Category</span>
                      <select 
                        value={categoryFilter} 
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, border: '1px solid #D1D5DB', background: '#FFF', fontWeight: 600, cursor: 'pointer' }}
                        title="Filter by category"
                      >
                        <option value="All">All</option>
                        {categories.map(c => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </th>
                  <th style={{ padding: '10px 12px' }}>Price</th>
                  <th style={{ padding: '10px 12px' }}>Stock</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img 
                        src={(Array.isArray(p.images) && p.images[0]) || p.image || 'https://via.placeholder.com/44'} 
                        alt="" 
                        style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 4, background: '#F9FAFB' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827' }}>{p.name}</div>
                        <span style={{ fontSize: 12, color: '#6B7280' }}>ID: {p.id} • {p.brand}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px' }}><span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{p.category}</span></td>
                    <td style={{ padding: '10px 12px', fontWeight: 700 }}>₹{Number(p.price).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '10px 12px', color: (p.stock || 50) > 10 ? '#059669' : '#DC2626', fontWeight: 600 }}>{p.stock || 50} units</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => {
                          setEditProd({
                            ...p,
                            image: (Array.isArray(p.images) && p.images[0]) || p.image || ''
                          });
                          setShowEditModal(true);
                        }}
                        style={{ padding: '4px 10px', background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE', borderRadius: 6, fontWeight: 700, cursor: 'pointer', marginRight: 6 }}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id, p.name)}
                        style={{ padding: '4px 10px', background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div style={{ background: '#FFF', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20 }}>
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', padding: 40, color: '#6B7280' }}>No customer orders yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>Order ID</th>
                  <th style={{ padding: '10px 12px' }}>Customer</th>
                  <th style={{ padding: '10px 12px' }}>Total Amount</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                  <th style={{ padding: '10px 12px' }}>Change Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#2563EB' }}>{o.id}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>{o.customerEmail}</div>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 700 }}>₹{(o.total || 0).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700,
                        background: o.status === 'Delivered' ? '#D1FAE5' : '#FEF3C7',
                        color: o.status === 'Delivered' ? '#065F46' : '#92400E'
                      }}>
                        {o.status || 'Processing'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <select 
                        value={o.status || 'Processing'} 
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 13 }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div style={{ background: '#FFF', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>User ID</th>
                <th style={{ padding: '10px 12px' }}>Name</th>
                <th style={{ padding: '10px 12px' }}>Email</th>
                <th style={{ padding: '10px 12px' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{u.id}</td>
                  <td style={{ padding: '10px 12px' }}>{u.name}</td>
                  <td style={{ padding: '10px 12px' }}>{u.email}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ 
                      padding: '3px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700,
                      background: u.role === 'admin' ? '#FEF3C7' : '#EEF2FF',
                      color: u.role === 'admin' ? '#B45309' : '#4F46E5'
                    }}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#FFF', width: '100%', maxWidth: 540, borderRadius: 10, padding: 24, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Add New Product</h2>
            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Product Title</label>
                <input 
                  type="text" required 
                  placeholder="e.g. Apple iPhone 16 Pro 256GB"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Category</label>
                  <select 
                    value={newProd.category} 
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  >
                    {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Brand</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Apple, Samsung, Nike"
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Selling Price (₹)</label>
                  <input 
                    type="number" required 
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>M.R.P. (₹)</label>
                  <input 
                    type="number" 
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Stock Units</label>
                  <input 
                    type="number" 
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Product Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6, marginBottom: 8 }}
                />

                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>Or pick a preset:</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {PRESET_IMAGES.map(img => (
                    <button 
                      key={img.name}
                      type="button"
                      onClick={() => setNewProd({ ...newProd, image: img.url })}
                      style={{ fontSize: 11, padding: '4px 8px', borderRadius: 4, border: '1px solid #D1D5DB', background: '#F9FAFB', cursor: 'pointer' }}
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 700 }}>Add Product to Catalog</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {showEditModal && editProd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#FFF', width: '100%', maxWidth: 540, borderRadius: 10, padding: 24, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Edit Product ({editProd.id})</h2>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Product Title</label>
                <input 
                  type="text" required 
                  value={editProd.name}
                  onChange={(e) => setEditProd({ ...editProd, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Category</label>
                  <select 
                    value={editProd.category} 
                    onChange={(e) => setEditProd({ ...editProd, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  >
                    {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Brand</label>
                  <input 
                    type="text" 
                    value={editProd.brand}
                    onChange={(e) => setEditProd({ ...editProd, brand: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Selling Price (₹)</label>
                  <input 
                    type="number" required 
                    value={editProd.price}
                    onChange={(e) => setEditProd({ ...editProd, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>M.R.P. (₹)</label>
                  <input 
                    type="number" 
                    value={editProd.originalPrice || editProd.price}
                    onChange={(e) => setEditProd({ ...editProd, originalPrice: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Stock Units</label>
                  <input 
                    type="number" 
                    value={editProd.stock !== undefined ? editProd.stock : 50}
                    onChange={(e) => setEditProd({ ...editProd, stock: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Product Image URL</label>
                <input 
                  type="url" 
                  value={editProd.image || ''}
                  onChange={(e) => setEditProd({ ...editProd, image: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: 6, marginBottom: 8 }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 700 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
