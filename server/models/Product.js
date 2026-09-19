import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, default: 'KartHub' },
  category: { type: String, required: true },
  subcategory: { type: String, default: 'General' },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 10 },
  images: [{ type: String }],
  description: { type: String, default: '' },
  features: [{ type: String }],
  specifications: { type: Map, of: String },
  seller: { type: String, default: 'KartHub Authorized Retailer' },
  stock: { type: Number, default: 50 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
