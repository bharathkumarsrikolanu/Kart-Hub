// ============================================
// KartHub — Categories Data (Standard Catalog)
// ============================================

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras', 'Monitors', 'Speakers', 'TVs', 'Smartwatches'],
    description: 'Explore the latest in electronics — phones, laptops, cameras and more',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    subcategories: ['Men Clothing', 'Women Clothing', 'Shoes', 'Accessories', 'Bags'],
    description: 'Trendy fashion for men, women & kids at best prices',
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    subcategories: ['Air Conditioners', 'Refrigerators', 'Washing Machines', 'Microwaves', 'Kitchen Appliances', 'Home Décor'],
    description: 'Everything for your home — ACs, fridges, washing machines, microwaves & kitchen appliances',
  },
  {
    id: 'books',
    name: 'Books',
    icon: '📚',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop',
    subcategories: ['Self-Help', 'Finance', 'Fiction', 'Non-Fiction', 'Academic'],
    description: 'Bestselling books across all genres',
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop',
    subcategories: ['Consoles', 'Accessories', 'Games'],
    description: 'Level up your gaming with the latest consoles & accessories',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    icon: '💄',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    subcategories: ['Makeup', 'Skincare', 'Grooming', 'Fragrance'],
    description: 'Beauty & personal care products from top brands',
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '🏋️',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
    subcategories: ['Fitness Equipment', 'Racquet Sports', 'Team Sports', 'Outdoor'],
    description: 'Sports gear, fitness equipment & activewear',
  },
  {
    id: 'grocery',
    name: 'Grocery',
    icon: '🥑',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
    subcategories: ['Beverages', 'Cooking Essentials', 'Snacks', 'Staples'],
    description: 'Daily essentials, groceries & gourmet food',
  },
  {
    id: 'toys',
    name: 'Toys & Baby',
    icon: '🧸',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop',
    subcategories: ['Building Toys', 'Board Games', 'Baby Products', 'Action Figures'],
    description: 'Toys, games & baby essentials',
  },
];

export function getCategoryById(id) {
  return categories.find(c => c.id === id);
}

export function getCategoryByName(name) {
  return categories.find(c => c.name.toLowerCase() === (name || '').toLowerCase());
}
