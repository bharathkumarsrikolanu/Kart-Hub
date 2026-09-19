import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String },
  brand: { type: String },
  qty: { type: Number, default: 1 },
  seller: { type: String, default: 'KartHub' }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
