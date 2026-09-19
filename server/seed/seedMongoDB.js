import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { products } from '../../src/data/products.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/karthub';

async function seed() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected! Seeding products catalog...');

    for (const p of products) {
      await Product.findOneAndUpdate(
        { id: p.id },
        { ...p, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${products.length} products to MongoDB!`);

    // Seed default admin user
    await User.findOneAndUpdate(
      { email: 'bharathkumaraiwork@gmail.com' },
      {
        id: 'USR1789660222554',
        name: 'Bharath Reddy (Admin)',
        email: 'bharathkumaraiwork@gmail.com',
        phone: '06304505750',
        role: 'admin'
      },
      { upsert: true, new: true }
    );
    console.log('✅ Admin user profile seeded to MongoDB');

    console.log('🎉 MongoDB Seeding Complete!');
    process.exit(0);
  } catch (err) {
    console.warn('⚠️ Seeding error (Make sure MongoDB is running or MongoDB Atlas URI is set):', err.message);
    process.exit(0);
  }
}

seed();
