# 🗄️ KartHub Database Architecture

This directory contains the central **Database files, Schemas, and Storage Records** for the KartHub e-commerce application.

---

## 📁 Directory Structure

```
KartHub/
└── database/
    ├── schema.sql        # Relational SQL Table Schemas (PostgreSQL / MySQL / SQLite)
    ├── products.json     # Product Catalog Database (All 55+ products & specs)
    ├── users.json        # User Accounts & Authentication Records (Customers & Admins)
    ├── orders.json       # Customer Orders & Tracking Statuses
    └── README.md         # Database Documentation (this file)
```

---

## 🗃️ Database Tables / Collections

### 1. `products` (`products.json`)
Stores all catalog items with images, pricing, discounts, stock, and specifications.

### 2. `users` (`users.json`)
Stores registered customer accounts, contact numbers, email addresses, and admin roles.

### 3. `orders` (`orders.json`)
Stores customer orders with unique Order IDs, line items, breakdown totals, shipping addresses, payment methods, and live tracking status (`Processing` ➔ `Shipped` ➔ `Delivered`).

---

## ⚡ How the Application Accesses the Database

1. **Local Development Mode**: Reads and writes persistently from the `database/` files and browser cache layer via `src/services/db.js`.
2. **Cloud Mode (Production)**: When configured in `.env`, `src/services/db.js` synchronizes in real time with Google Cloud Firestore.
3. **Admin Dashboard**: Accessible at `/#/admin` for live database querying, status editing, and CSV data export.
