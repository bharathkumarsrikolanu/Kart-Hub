import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { Order } from './models/Order.js';
import { Cart } from './models/Cart.js';
import { Wishlist } from './models/Wishlist.js';
import { Review } from './models/Review.js';
import { products as initialProducts } from '../src/data/products.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.join(__dirname, '../database');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;
let isMongoConnected = false;
let activeMongoUri = '';
let mongodInstance = null;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// ============================================
// MongoDB Initialization & Auto-Fallback
// ============================================
async function initDatabase() {
  const configuredUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/karthub';

  try {
    console.log(`📡 Connecting to MongoDB at: ${configuredUri}...`);
    await mongoose.connect(configuredUri, { serverSelectionTimeoutMS: 2500 });
    isMongoConnected = true;
    activeMongoUri = configuredUri;
    console.log('🍃 MongoDB Connected successfully to:', configuredUri);
  } catch (err) {
    console.log('⚠️ Local/Remote MongoDB not reachable:', err.message);
    console.log('🚀 Starting built-in dedicated MongoDB Engine (MongoMemoryServer)...');
    try {
      mongodInstance = await MongoMemoryServer.create({
        instance: { dbName: 'karthub' }
      });
      activeMongoUri = mongodInstance.getUri();
      await mongoose.connect(activeMongoUri);
      isMongoConnected = true;
      console.log('✅ Dedicated MongoDB Engine is LIVE and CONNECTED at:', activeMongoUri);
    } catch (inMemErr) {
      console.error('❌ Failed to initialize in-memory MongoDB:', inMemErr.message);
    }
  }

  // Seed MongoDB initial data if empty
  if (isMongoConnected) {
    try {
      const prodCount = await Product.countDocuments();
      if (prodCount === 0 && Array.isArray(initialProducts) && initialProducts.length > 0) {
        console.log(`📦 Seeding ${initialProducts.length} products to MongoDB...`);
        for (const p of initialProducts) {
          await Product.findOneAndUpdate({ id: p.id }, { ...p, updatedAt: new Date() }, { upsert: true });
        }
        console.log(`✅ Seeded ${initialProducts.length} products into MongoDB!`);
      }

      // Seed Default Admin User
      const adminEmail = 'bharathkumaraiwork@gmail.com';
      await User.findOneAndUpdate(
        { email: adminEmail },
        {
          id: 'USR1789660222554',
          name: 'Bharath Reddy (Admin)',
          email: adminEmail,
          phone: '06304505750',
          role: 'admin',
          createdAt: new Date('2026-03-10')
        },
        { upsert: true }
      );
      console.log('👤 Admin user ready in MongoDB:', adminEmail);
    } catch (seedErr) {
      console.warn('⚠️ Seeding notice:', seedErr.message);
    }
  }
}

// Helper: Sync MongoDB data to local JSON files for easy visual review
async function syncToFiles() {
  if (!isMongoConnected) return;
  try {
    const products = await Product.find().lean();
    const users = await User.find().lean();
    const orders = await Order.find().lean();

    fs.writeFileSync(path.join(DB_DIR, 'products.json'), JSON.stringify(products, null, 2), 'utf8');
    fs.writeFileSync(path.join(DB_DIR, 'users.json'), JSON.stringify(users, null, 2), 'utf8');
    fs.writeFileSync(path.join(DB_DIR, 'orders.json'), JSON.stringify(orders, null, 2), 'utf8');
  } catch {}
}

// ============================================
// 1. PRODUCTS REST API
// ============================================

app.get('/api/products', async (req, res) => {
  try {
    if (isMongoConnected) {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: products.length, data: products });
    }
    return res.json({ success: true, count: initialProducts.length, data: initialProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const product = await Product.findOne({ id: req.params.id });
      if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
      return res.json({ success: true, data: product });
    }
    const found = initialProducts.find(p => p.id === req.params.id);
    if (found) return res.json({ success: true, data: found });
    res.status(404).json({ success: false, error: 'Product not found' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const prodData = {
      ...req.body,
      id: req.body.id || ('PROD' + Date.now()),
      updatedAt: new Date()
    };

    if (isMongoConnected) {
      const product = await Product.findOneAndUpdate(
        { id: prodData.id },
        prodData,
        { upsert: true, new: true }
      );
      syncToFiles();
      return res.status(201).json({ success: true, data: product });
    }
    res.status(201).json({ success: true, data: prodData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      updatedAt: new Date()
    };

    if (isMongoConnected) {
      const product = await Product.findOneAndUpdate(
        { id: req.params.id },
        updatedData,
        { new: true }
      );
      if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
      syncToFiles();
      return res.json({ success: true, data: product });
    }
    res.json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      await Product.findOneAndDelete({ id: req.params.id });
      syncToFiles();
      return res.json({ success: true, message: 'Product deleted from MongoDB' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// 2. USERS & AUTH REST API
// ============================================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();
    
    const userProfile = {
      id: 'USR' + Date.now(),
      name: name || cleanEmail.split('@')[0] || 'Customer',
      email: cleanEmail,
      phone: phone || '',
      role: cleanEmail === 'bharathkumaraiwork@gmail.com' ? 'admin' : 'customer'
    };

    if (isMongoConnected) {
      let existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        existing.name = userProfile.name;
        existing.phone = userProfile.phone;
        await existing.save();
        syncToFiles();
        return res.json({ success: true, user: existing });
      }
      const newUser = await User.create({ ...userProfile, password });
      syncToFiles();
      return res.status(201).json({ success: true, user: newUser });
    }

    res.status(201).json({ success: true, user: userProfile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (cleanEmail === 'bharathkumaraiwork@gmail.com') {
      const adminUser = {
        id: 'USR1789660222554',
        name: 'Bharath Reddy (Admin)',
        email: 'bharathkumaraiwork@gmail.com',
        phone: '06304505750',
        role: 'admin'
      };
      return res.json({ success: true, user: adminUser });
    }

    if (isMongoConnected) {
      const user = await User.findOne({ email: cleanEmail });
      if (user) {
        return res.json({ success: true, user });
      }
    }

    // Auto-create guest user
    const guestUser = {
      id: 'USR' + Date.now(),
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'customer'
    };

    if (isMongoConnected) {
      await User.create(guestUser);
      syncToFiles();
    }

    res.json({ success: true, user: guestUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    if (isMongoConnected) {
      const users = await User.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: users.length, data: users });
    }
    res.json({ success: true, count: 0, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;
    if (isMongoConnected && userData.email) {
      const user = await User.findOneAndUpdate(
        { email: userData.email.toLowerCase() },
        { ...userData, id: userData.id || ('USR' + Date.now()) },
        { upsert: true, new: true }
      );
      syncToFiles();
      return res.status(201).json({ success: true, user });
    }
    res.status(201).json({ success: true, user: userData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// 3. ORDERS REST API
// ============================================

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      id: req.body.id || ('ORD' + Date.now() + Math.random().toString(36).substring(2, 6).toUpperCase()),
      date: new Date(),
      status: req.body.status || 'Processing'
    };

    if (isMongoConnected) {
      const order = await Order.create(orderData);
      syncToFiles();
      return res.status(201).json({ success: true, data: order });
    }

    res.status(201).json({ success: true, data: orderData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const { userId, email } = req.query;
      let filter = {};
      if (userId) filter.userId = userId;
      if (email) filter.customerEmail = email;

      const orders = await Order.find(filter).sort({ date: -1 });
      return res.json({ success: true, count: orders.length, data: orders });
    }
    res.json({ success: true, count: 0, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const order = await Order.findOne({ id: req.params.id });
      if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
      return res.json({ success: true, data: order });
    }
    res.status(404).json({ success: false, error: 'Order not found' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (isMongoConnected) {
      const order = await Order.findOneAndUpdate(
        { id: req.params.id },
        { status },
        { new: true }
      );
      if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
      syncToFiles();
      return res.json({ success: true, data: order });
    }
    res.json({ success: true, data: { id: req.params.id, status } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// 4. CART REST API
// ============================================

app.get('/api/cart/:userId', async (req, res) => {
  try {
    if (isMongoConnected) {
      const cart = await Cart.findOne({ userId: req.params.userId });
      return res.json({ success: true, data: cart ? cart.items : [] });
    }
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/cart/:userId', async (req, res) => {
  try {
    const { items } = req.body;
    if (isMongoConnected) {
      const cart = await Cart.findOneAndUpdate(
        { userId: req.params.userId },
        { userId: req.params.userId, items: items || [], updatedAt: new Date() },
        { upsert: true, new: true }
      );
      return res.json({ success: true, data: cart.items });
    }
    res.json({ success: true, data: items || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/cart/:userId', async (req, res) => {
  try {
    if (isMongoConnected) {
      await Cart.findOneAndUpdate(
        { userId: req.params.userId },
        { items: [], updatedAt: new Date() }
      );
    }
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// 5. WISHLIST REST API
// ============================================

app.get('/api/wishlist/:userId', async (req, res) => {
  try {
    if (isMongoConnected) {
      const wishlist = await Wishlist.findOne({ userId: req.params.userId });
      return res.json({ success: true, data: wishlist ? wishlist.items : [] });
    }
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/wishlist/:userId', async (req, res) => {
  try {
    const { items } = req.body;
    if (isMongoConnected) {
      const wishlist = await Wishlist.findOneAndUpdate(
        { userId: req.params.userId },
        { userId: req.params.userId, items: items || [], updatedAt: new Date() },
        { upsert: true, new: true }
      );
      return res.json({ success: true, data: wishlist.items });
    }
    res.json({ success: true, data: items || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// 6. REVIEWS REST API
// ============================================

app.get('/api/reviews/:productId', async (req, res) => {
  try {
    if (isMongoConnected) {
      const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
      return res.json({ success: true, count: reviews.length, data: reviews });
    }
    res.json({ success: true, count: 0, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      createdAt: new Date()
    };

    if (isMongoConnected) {
      const review = await Review.create(reviewData);
      return res.status(201).json({ success: true, data: review });
    }
    res.status(201).json({ success: true, data: reviewData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// 7. BULK SYNC ENDPOINT (legacy compat)
// ============================================

app.post('/api/sync', async (req, res) => {
  try {
    const payload = req.body;
    if (isMongoConnected) {
      if (payload.users && Array.isArray(payload.users)) {
        for (const u of payload.users) {
          if (u.email) {
            await User.findOneAndUpdate(
              { email: u.email.toLowerCase() },
              { ...u, id: u.id || ('USR' + Date.now()) },
              { upsert: true }
            );
          }
        }
      }
      if (payload.orders && Array.isArray(payload.orders)) {
        for (const o of payload.orders) {
          if (o.id) {
            await Order.findOneAndUpdate(
              { id: o.id },
              o,
              { upsert: true }
            );
          }
        }
      }
      syncToFiles();
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// 8. DATABASE HEALTH & STATUS
// ============================================

app.get('/api/health', async (req, res) => {
  let stats = {};
  if (isMongoConnected) {
    try {
      stats = {
        products: await Product.countDocuments(),
        users: await User.countDocuments(),
        orders: await Order.countDocuments(),
        carts: await Cart.countDocuments(),
        wishlists: await Wishlist.countDocuments(),
        reviews: await Review.countDocuments()
      };
    } catch {}
  }

  res.json({
    status: 'online',
    database: isMongoConnected ? 'MongoDB Connected' : 'Fallback Mode',
    uri: activeMongoUri ? (activeMongoUri.startsWith('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : activeMongoUri) : 'none',
    stats,
    timestamp: new Date()
  });
});

// Serve static frontend assets from dist in production
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start Express Server & MongoDB
initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 KartHub Full-Stack Server running on http://localhost:${PORT}`);
    console.log(`📱 Mobile Network Access: http://192.168.1.5:${PORT}`);
    console.log(`🍃 Database Status: ${isMongoConnected ? 'MongoDB Atlas Active' : 'Disconnected'}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  });
});
