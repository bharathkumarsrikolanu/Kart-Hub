// ============================================
// KartHub — Cloud Database Service (DEPRECATED)
// All cloud sync functionality has been migrated to MongoDB.
// This file exports no-op stubs for backward compatibility.
// ============================================

/**
 * @deprecated Use db.js dbSaveUser() instead — data goes to MongoDB
 */
export async function cloudSaveUser(user) {
  // No-op: MongoDB handles all persistence now
}

/**
 * @deprecated Use db.js dbCreateOrder() instead — data goes to MongoDB
 */
export async function cloudSaveOrder(order) {
  // No-op: MongoDB handles all persistence now
}

/**
 * @deprecated Use db.js dbGetAllUsers() instead — data comes from MongoDB
 */
export async function cloudGetAllUsers() {
  return [];
}

/**
 * @deprecated Use db.js dbGetAllOrders() instead — data comes from MongoDB
 */
export async function cloudGetAllOrders() {
  return [];
}

/**
 * @deprecated Use db.js dbSaveProduct() instead — data goes to MongoDB
 */
export async function cloudSaveProduct(product, isNew = false) {
  // No-op: MongoDB handles all persistence now
}

/**
 * @deprecated Use db.js dbDeleteProduct() instead — data goes to MongoDB
 */
export async function cloudDeleteProduct(productId) {
  // No-op: MongoDB handles all persistence now
}

/**
 * @deprecated Use db.js dbGetProducts() instead — data comes from MongoDB
 */
export async function cloudGetMergedProducts(baseProducts = []) {
  return baseProducts;
}
