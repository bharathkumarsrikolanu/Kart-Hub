import mongoose from 'mongoose';

const wishlistItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String },
  brand: { type: String }
}, { _id: false });

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [wishlistItemSchema],
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
