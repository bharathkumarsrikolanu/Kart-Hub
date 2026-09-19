import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for fast lookups by product
reviewSchema.index({ productId: 1 });

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
