// ============================================
// KartHub — Deals & Offers Data
// ============================================

export const dealOfTheDay = [
  { productId: 'ELEC001', tagline: 'Mega Deal', endsAt: getEndTime(8) },
  { productId: 'ELEC004', tagline: 'Limited Time', endsAt: getEndTime(5) },
  { productId: 'GAME001', tagline: 'Hot Deal', endsAt: getEndTime(12) },
  { productId: 'HOME005', tagline: 'Flash Sale', endsAt: getEndTime(3) },
];

export const lightningDeals = [
  { productId: 'FASH003', tagline: 'Lightning Deal', endsAt: getEndTime(2), claimed: 67 },
  { productId: 'BEAU002', tagline: 'Lightning Deal', endsAt: getEndTime(4), claimed: 42 },
  { productId: 'SPRT001', tagline: 'Lightning Deal', endsAt: getEndTime(6), claimed: 85 },
  { productId: 'TOOL001', tagline: 'Lightning Deal', endsAt: getEndTime(3), claimed: 53 },
  { productId: 'BOOK001', tagline: 'Lightning Deal', endsAt: getEndTime(7), claimed: 91 },
  { productId: 'HOME006', tagline: 'Lightning Deal', endsAt: getEndTime(5), claimed: 38 },
];

export const bannerSlides = [
  {
    id: 1,
    badge: '★ FESTIVAL SPECIAL',
    title: 'Great Indian Festival',
    subtitle: 'Up to 75% Off on Flagship Electronics, Audio & Gadgets',
    cta: 'Shop Electronics',
    link: '#/category/Electronics',
    bgImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&h=600&fit=crop&q=80',
    gradient: 'linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.75) 45%, rgba(15, 23, 42, 0.1) 100%)',
    accentColor: '#FF9900',
  },
  {
    id: 2,
    badge: '★ TRENDING FASHION',
    title: 'Mega Fashion Fiesta',
    subtitle: 'Min 50% - 80% Off on Top Global Brands & Ethnic Wear',
    cta: 'Explore Styles',
    link: '#/category/Fashion',
    bgImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=600&fit=crop&q=80',
    gradient: 'linear-gradient(90deg, rgba(45, 10, 80, 0.92) 0%, rgba(45, 10, 80, 0.75) 45%, rgba(45, 10, 80, 0.1) 100%)',
    accentColor: '#F472B6',
  },
  {
    id: 3,
    badge: '★ HOME & LIVING',
    title: 'Home Makeover Sale',
    subtitle: 'Upgrade Your Space • Furniture & Kitchen Appliances from ₹299',
    cta: 'Revamp Home',
    link: '#/category/Home & Kitchen',
    bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=600&fit=crop&q=80',
    gradient: 'linear-gradient(90deg, rgba(6, 78, 59, 0.92) 0%, rgba(6, 78, 59, 0.75) 45%, rgba(6, 78, 59, 0.1) 100%)',
    accentColor: '#34D399',
  },
  {
    id: 4,
    badge: '★ PRO GAMING & TECH',
    title: 'Next-Gen Gaming Zone',
    subtitle: 'Consoles, Mechanical Keyboards, Headsets & High-FPS Displays',
    cta: 'Level Up',
    link: '#/category/Gaming',
    bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=600&fit=crop&q=80',
    gradient: 'linear-gradient(90deg, rgba(30, 27, 75, 0.92) 0%, rgba(30, 27, 75, 0.75) 45%, rgba(30, 27, 75, 0.1) 100%)',
    accentColor: '#818CF8',
  },
];

export const quadrantCollections = [
  {
    id: 'home-appliances',
    title: 'Appliances for your home | Up to 55% off',
    link: '#/category/Home & Kitchen',
    linkText: 'See more offers',
    items: [
      {
        title: 'Air Conditioners',
        image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=300&h=300&fit=crop',
        category: 'Home & Kitchen',
      },
      {
        title: 'Refrigerators',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop',
        category: 'Home & Kitchen',
      },
      {
        title: 'Microwaves',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=300&fit=crop',
        category: 'Home & Kitchen',
      },
      {
        title: 'Washing Machines',
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=300&h=300&fit=crop',
        category: 'Home & Kitchen',
      },
    ],
  },
  {
    id: 'latest-tech',
    title: 'Top tech & audio | Starting ₹499',
    link: '#/category/Electronics',
    linkText: 'Explore tech deals',
    items: [
      {
        title: 'Wireless Earbuds',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
        category: 'Electronics',
      },
      {
        title: 'Smartwatches',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        category: 'Electronics',
      },
      {
        title: 'Tablets & iPads',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
        category: 'Electronics',
      },
      {
        title: 'Power Banks',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
        category: 'Electronics',
      },
    ],
  },
  {
    id: 'fashion-trends',
    title: 'Up to 70% off | Fashion & beauty styles',
    link: '#/category/Fashion',
    linkText: 'End of season sale',
    items: [
      {
        title: "Men's Clothing",
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=300&fit=crop',
        category: 'Fashion',
      },
      {
        title: "Women's Fashion",
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop',
        category: 'Fashion',
      },
      {
        title: 'Footwear & Sneakers',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        category: 'Fashion',
      },
      {
        title: 'Luxury Perfumes',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&h=300&fit=crop',
        category: 'Beauty',
      },
    ],
  },
  {
    id: 'gaming-fitness',
    title: 'Gaming & Fitness | Best sellers',
    link: '#/category/Gaming',
    linkText: 'Discover best sellers',
    items: [
      {
        title: 'Consoles & VR',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop',
        category: 'Gaming',
      },
      {
        title: 'Gaming Headsets',
        image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=300&fit=crop',
        category: 'Gaming',
      },
      {
        title: 'Gym & Fitness Gear',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
        category: 'Sports',
      },
      {
        title: 'Bestselling Books',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=300&fit=crop',
        category: 'Books',
      },
    ],
  },
];

function getEndTime(hoursFromNow) {
  return new Date(Date.now() + hoursFromNow * 60 * 60 * 1000).toISOString();
}

export function getTimeRemaining(endTime) {
  const total = new Date(endTime) - new Date();
  if (total <= 0) return { total: 0, hours: 0, minutes: 0, seconds: 0 };
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  return { total, hours, minutes, seconds };
}

