import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
  brand: String,
  category: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  subtotal: { type: Number },
  discount: { type: Number, default: 0 },
  paymentMethod: { type: String, default: 'COD' },
  address: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  status: { 
    type: String, 
    enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'], 
    default: 'Processing' 
  },
  date: { type: Date, default: Date.now },
  estimatedDelivery: { type: Date }
}, {
  timestamps: true
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
