// ============================================
// KartHub — Product Catalog (100+ Products)
// ============================================

const baseProductsCatalog = [
  // ========== ELECTRONICS ==========
  {
    id: 'ELEC001',
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 256 GB, 12 GB RAM)',
    brand: 'Samsung',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: 74999,
    originalPrice: 134999,
    discount: 44,
    rating: 4.5,
    reviewCount: 15420,
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop'],
    description: 'Experience the ultimate Galaxy with the S24 Ultra featuring a 200MP camera, Snapdragon 8 Gen 3 processor, and an S Pen built right in.',
    features: ['200MP Quad Camera', '6.8" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '5000mAh Battery', 'S Pen Built-in', 'IP68 Water Resistant'],
    specifications: { 'Display': '6.8 inch QHD+', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12 GB', 'Storage': '256 GB', 'Battery': '5000 mAh', 'OS': 'Android 14' },
    seller: 'KartHub Electronics',
    stock: 45,
  },
  {
    id: 'ELEC002',
    name: 'Apple iPhone 15 Pro Max (Natural Titanium, 256 GB)',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: 139900,
    originalPrice: 159900,
    discount: 13,
    rating: 4.7,
    reviewCount: 28350,
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'],
    description: 'iPhone 15 Pro Max with A17 Pro chip, titanium design, 48MP camera system, and USB-C connectivity.',
    features: ['A17 Pro Chip', '48MP Camera System', 'Titanium Design', 'USB-C', 'Action Button', 'All-day Battery Life'],
    specifications: { 'Display': '6.7 inch Super Retina XDR', 'Processor': 'A17 Pro', 'RAM': '8 GB', 'Storage': '256 GB', 'Battery': '4441 mAh', 'OS': 'iOS 17' },
    seller: 'Apple Authorized Reseller',
    stock: 30,
  },
  {
    id: 'ELEC003',
    name: 'Apple MacBook Air M3 Chip (15-inch, 16GB, 512GB SSD) — Midnight',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 134990,
    originalPrice: 149900,
    discount: 10,
    rating: 4.8,
    reviewCount: 5820,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
    description: 'Strikingly thin and fast. MacBook Air with M3 chip delivers amazing performance with up to 18 hours of battery life.',
    features: ['Apple M3 Chip', '15.3" Liquid Retina Display', '16GB Unified Memory', '512GB SSD', 'Up to 18hr Battery', 'MagSafe Charging'],
    specifications: { 'Display': '15.3 inch Liquid Retina', 'Processor': 'Apple M3', 'RAM': '16 GB', 'Storage': '512 GB SSD', 'Battery': 'Up to 18 hours', 'Weight': '1.51 kg' },
    seller: 'KartHub Electronics',
    stock: 20,
  },
  {
    id: 'ELEC004',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)',
    brand: 'Sony',
    category: 'Electronics',
    subcategory: 'Headphones',
    price: 22990,
    originalPrice: 34990,
    discount: 34,
    rating: 4.6,
    reviewCount: 12340,
    images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop'],
    description: 'Industry-leading noise cancellation optimized just for you. Crystal clear hands-free calling with 4 beamforming microphones.',
    features: ['Industry Leading ANC', '30hr Battery Life', 'Multipoint Connection', 'LDAC Hi-Res Audio', 'Speak-to-Chat', 'Lightweight 250g'],
    specifications: { 'Driver': '30mm', 'Battery': '30 hours', 'Charging': 'USB-C', 'Weight': '250g', 'Bluetooth': '5.2', 'Codec': 'LDAC, AAC, SBC' },
    seller: 'Sony Official Store',
    stock: 80,
  },
  {
    id: 'ELEC005',
    name: 'iPad Air (M2) 11-inch Wi-Fi 256GB — Space Grey',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Tablets',
    price: 69900,
    originalPrice: 79900,
    discount: 13,
    rating: 4.7,
    reviewCount: 4250,
    images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop'],
    description: 'iPad Air with M2 chip. Supercharged by M2, Air has the power to bring your ideas to life.',
    features: ['Apple M2 Chip', '11" Liquid Retina Display', 'Apple Pencil Pro Compatible', 'USB-C', 'Touch ID', '12MP Camera'],
    specifications: { 'Display': '11 inch Liquid Retina', 'Processor': 'Apple M2', 'Storage': '256 GB', 'Battery': 'Up to 10 hours', 'Weight': '462g', 'Connectivity': 'Wi-Fi 6E' },
    seller: 'KartHub Electronics',
    stock: 35,
  },
  {
    id: 'ELEC006',
    name: 'Sony Alpha 7 IV Full-Frame Mirrorless Camera (Body Only)',
    brand: 'Sony',
    category: 'Electronics',
    subcategory: 'Cameras',
    price: 196990,
    originalPrice: 243490,
    discount: 19,
    rating: 4.8,
    reviewCount: 2130,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop'],
    description: 'Beyond basic. The Alpha 7 IV sets a new standard for full-frame cameras with 33MP, real-time tracking, and 4K 60p video.',
    features: ['33MP Full-Frame Sensor', 'BIONZ XR Processor', 'Real-Time Eye AF', '4K 60p Video', '5-Axis IBIS', 'Dual Card Slots'],
    specifications: { 'Sensor': '33MP Full-Frame', 'ISO': '100-51200', 'AF Points': '759', 'Video': '4K 60p', 'Battery': '580 shots', 'Weight': '658g' },
    seller: 'Camera Hub India',
    stock: 8,
  },
  {
    id: 'ELEC007',
    name: 'Dell UltraSharp 27" 4K USB-C Hub Monitor - U2723QE',
    brand: 'Dell',
    category: 'Electronics',
    subcategory: 'Monitors',
    price: 44990,
    originalPrice: 59990,
    discount: 25,
    rating: 4.5,
    reviewCount: 3420,
    images: ['https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=400&h=400&fit=crop'],
    description: 'A 27-inch 4K monitor with IPS Black technology, USB-C hub, and exceptional color accuracy for professionals.',
    features: ['27" 4K UHD (3840x2160)', 'IPS Black Technology', 'USB-C 90W PD', 'sRGB 100%', 'Built-in KVM', 'VESA DisplayHDR 400'],
    specifications: { 'Size': '27 inch', 'Resolution': '3840x2160', 'Panel': 'IPS Black', 'Refresh': '60Hz', 'Ports': 'USB-C, HDMI, DP', 'Response': '5ms' },
    seller: 'Dell India Official',
    stock: 25,
  },
  {
    id: 'ELEC008',
    name: 'JBL Charge 5 Portable Bluetooth Speaker (Blue)',
    brand: 'JBL',
    category: 'Electronics',
    subcategory: 'Speakers',
    price: 13999,
    originalPrice: 18999,
    discount: 26,
    rating: 4.4,
    reviewCount: 8970,
    images: ['https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=400&fit=crop'],
    description: 'Play and charge endlessly. JBL Charge 5 delivers bold JBL Original Pro Sound with its optimized racetrack-shaped driver.',
    features: ['20hr Battery', 'IP67 Waterproof', 'Powerbank Feature', 'PartyBoost', 'JBL Pro Sound', 'Dual Passive Radiators'],
    specifications: { 'Output': '40W', 'Battery': '20 hours', 'Bluetooth': '5.1', 'Rating': 'IP67', 'Weight': '960g', 'Charging': 'USB-C' },
    seller: 'KartHub Electronics',
    stock: 60,
  },
  {
    id: 'ELEC009',
    name: 'Samsung 55" Crystal 4K UHD Smart TV - UA55CU8000',
    brand: 'Samsung',
    category: 'Electronics',
    subcategory: 'TVs',
    price: 42990,
    originalPrice: 64900,
    discount: 34,
    rating: 4.3,
    reviewCount: 7650,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop'],
    description: 'Crystal clear, crystal 4K. See what you have been missing with 4K resolution and Dynamic Crystal Color.',
    features: ['4K UHD Resolution', 'Crystal Processor 4K', 'Smart TV (Tizen)', 'HDR 10+', 'Adaptive Sound', 'AirSlim Design'],
    specifications: { 'Size': '55 inch', 'Resolution': '3840x2160', 'HDR': 'HDR10+', 'Sound': '20W', 'OS': 'Tizen', 'Ports': '3 HDMI, 1 USB' },
    seller: 'Samsung Store India',
    stock: 15,
  },
  {
    id: 'ELEC010',
    name: 'Apple Watch Series 9 GPS 45mm (Midnight Aluminium, M/L Sport Band)',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Smartwatches',
    price: 39900,
    originalPrice: 49900,
    discount: 20,
    rating: 4.6,
    reviewCount: 6340,
    images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop'],
    description: 'A magical new way to use your Apple Watch. Double Tap gesture, brighter display, and the powerful S9 SiP chip.',
    features: ['S9 SiP Chip', 'Double Tap Gesture', 'Always-On Retina Display', 'Blood Oxygen', 'ECG App', 'Water Resistant 50m'],
    specifications: { 'Display': '45mm OLED', 'Chip': 'S9 SiP', 'Storage': '64 GB', 'Battery': 'Up to 18 hours', 'Water': '50m WR', 'Connectivity': 'GPS, Bluetooth 5.3' },
    seller: 'Apple Authorized Reseller',
    stock: 40,
  },

  // ========== FASHION ==========
  {
    id: 'FASH001',
    name: 'Allen Solly Men Slim Fit Formal Shirt — Sky Blue',
    brand: 'Allen Solly',
    category: 'Fashion',
    subcategory: 'Men Clothing',
    price: 899,
    originalPrice: 1999,
    discount: 55,
    rating: 4.2,
    reviewCount: 8540,
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'],
    description: 'Premium slim fit formal shirt in sky blue. Made from 100% cotton for all-day comfort in the office.',
    features: ['100% Cotton', 'Slim Fit', 'Full Sleeves', 'Button Down Collar', 'Machine Washable', 'Wrinkle Resistant'],
    specifications: { 'Material': '100% Cotton', 'Fit': 'Slim', 'Sleeve': 'Full', 'Collar': 'Button Down', 'Pattern': 'Solid', 'Care': 'Machine Wash' },
    seller: 'Allen Solly Official',
    stock: 150,
  },
  {
    id: 'FASH002',
    name: 'Levi\'s Men 511 Slim Fit Jeans — Dark Indigo',
    brand: "Levi's",
    category: 'Fashion',
    subcategory: 'Men Clothing',
    price: 1799,
    originalPrice: 3999,
    discount: 55,
    rating: 4.4,
    reviewCount: 12340,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'],
    description: 'The 511 Slim Fit Jeans are a modern slim with room to move. From hip to ankle, the 511 sits below the waist.',
    features: ['98% Cotton, 2% Elastane', 'Slim Fit', '5-Pocket Styling', 'Zip Fly', 'Medium Wash', 'Stretchable'],
    specifications: { 'Material': '98% Cotton, 2% Elastane', 'Fit': 'Slim', 'Rise': 'Mid Rise', 'Closure': 'Zip', 'Wash': 'Dark Indigo', 'Care': 'Machine Wash Cold' },
    seller: "Levi's Official Store",
    stock: 200,
  },
  {
    id: 'FASH003',
    name: 'Nike Air Max 270 Running Shoes — Red',
    brand: 'Nike',
    category: 'Fashion',
    subcategory: 'Shoes',
    price: 8995,
    originalPrice: 14995,
    discount: 40,
    rating: 4.5,
    reviewCount: 9870,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'],
    description: 'Nike Air Max 270 delivers visible cushioning under every step. Features Nike\'s biggest heel Air unit yet for a super soft ride.',
    features: ['Max Air Unit', 'Mesh Upper', 'Foam Midsole', 'Rubber Outsole', 'Pull Tab', 'Lightweight'],
    specifications: { 'Upper': 'Mesh', 'Sole': 'Rubber', 'Closure': 'Lace-Up', 'Cushioning': 'Air Max', 'Weight': '310g', 'Style': 'Running' },
    seller: 'Nike Official Store',
    stock: 75,
  },
  {
    id: 'FASH004',
    name: 'Fossil Neutra Chronograph Brown Leather Watch — Men',
    brand: 'Fossil',
    category: 'Fashion',
    subcategory: 'Accessories',
    price: 7996,
    originalPrice: 12995,
    discount: 38,
    rating: 4.5,
    reviewCount: 5430,
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'],
    description: 'Classic Neutra chronograph watch with a brown leather strap. Timeless design meets modern functionality.',
    features: ['Chronograph Movement', 'Genuine Leather Strap', '44mm Case', 'Mineral Crystal Glass', '5 ATM Water Resistant', 'Luminous Hands'],
    specifications: { 'Movement': 'Quartz', 'Case Size': '44mm', 'Band': 'Leather', 'Water Resistance': '5 ATM', 'Crystal': 'Mineral', 'Clasp': 'Buckle' },
    seller: 'Fossil India Official',
    stock: 45,
  },
  {
    id: 'FASH005',
    name: 'W Women Printed Straight Kurta — Mustard Yellow',
    brand: 'W',
    category: 'Fashion',
    subcategory: 'Women Clothing',
    price: 799,
    originalPrice: 1499,
    discount: 47,
    rating: 4.3,
    reviewCount: 6780,
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'],
    description: 'Beautiful printed straight kurta in mustard yellow. Perfect for office wear or casual outings.',
    features: ['Viscose Rayon', 'Straight Fit', '3/4 Sleeves', 'Round Neck', 'Printed Pattern', 'Knee Length'],
    specifications: { 'Material': 'Viscose Rayon', 'Fit': 'Straight', 'Neck': 'Round', 'Sleeve': '3/4th', 'Length': 'Knee', 'Occasion': 'Casual' },
    seller: 'W Official Store',
    stock: 120,
  },
  {
    id: 'FASH006',
    name: 'Ray-Ban Aviator Classic Sunglasses — Gold/Green',
    brand: 'Ray-Ban',
    category: 'Fashion',
    subcategory: 'Accessories',
    price: 6990,
    originalPrice: 11490,
    discount: 39,
    rating: 4.6,
    reviewCount: 11230,
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'],
    description: 'The iconic Ray-Ban Aviator Classic. Timeless style with crystal green lenses and gold-tone metal frame.',
    features: ['Crystal Green Lenses', 'Gold Metal Frame', 'UV400 Protection', '58mm Lens', 'Adjustable Nose Pads', 'Iconic Design Since 1937'],
    specifications: { 'Lens': 'Crystal Green G-15', 'Frame': 'Gold Metal', 'Protection': 'UV400', 'Size': '58mm', 'Shape': 'Aviator', 'Weight': '29g' },
    seller: 'Ray-Ban Official',
    stock: 90,
  },
  {
    id: 'FASH007',
    name: 'Adidas Originals Superstar Shoes — White/Black',
    brand: 'Adidas',
    category: 'Fashion',
    subcategory: 'Shoes',
    price: 5999,
    originalPrice: 9999,
    discount: 40,
    rating: 4.4,
    reviewCount: 14560,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'],
    description: 'The adidas Superstar shoe debuted in 1969 and quickly gained fame on basketball courts. This version stays true to the original design.',
    features: ['Leather Upper', 'Shell Toe', 'Rubber Outsole', 'OrthoLite Sockliner', 'Iconic 3-Stripes', 'Classic Silhouette'],
    specifications: { 'Upper': 'Leather', 'Sole': 'Rubber', 'Closure': 'Lace-Up', 'Style': 'Casual', 'Weight': '340g', 'Origin': 'Imported' },
    seller: 'Adidas Official',
    stock: 110,
  },
  {
    id: 'FASH008',
    name: 'Wildcraft Unisex 45L Trekking Backpack — Black',
    brand: 'Wildcraft',
    category: 'Fashion',
    subcategory: 'Bags',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.3,
    reviewCount: 7890,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
    description: '45-litre trekking backpack built for adventure. Features rain cover, multiple compartments, and padded straps.',
    features: ['45L Capacity', 'Rain Cover Included', 'Padded Shoulder Straps', 'Multiple Compartments', 'Durable Polyester', 'Chest & Waist Straps'],
    specifications: { 'Capacity': '45 Litres', 'Material': 'Polyester', 'Dimensions': '60x35x25 cm', 'Weight': '1.2 kg', 'Closure': 'Zip', 'Use': 'Trekking' },
    seller: 'Wildcraft Official',
    stock: 65,
  },
  {
    id: 'FASH009',
    name: 'U.S. Polo Assn. Men Premium Polo T-Shirt — Navy Blue',
    brand: 'U.S. Polo Assn.',
    category: 'Fashion',
    subcategory: 'Men Clothing',
    price: 699,
    originalPrice: 1599,
    discount: 56,
    rating: 4.1,
    reviewCount: 15670,
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop'],
    description: 'Classic polo t-shirt in navy blue. Made from premium cotton pique fabric for a comfortable and stylish look.',
    features: ['100% Cotton Pique', 'Regular Fit', 'Short Sleeves', 'Polo Collar', 'Embroidered Logo', 'Ribbed Cuffs'],
    specifications: { 'Material': '100% Cotton', 'Fit': 'Regular', 'Collar': 'Polo', 'Sleeve': 'Half', 'Pattern': 'Solid', 'Care': 'Machine Wash' },
    seller: 'US Polo Official',
    stock: 200,
  },
  {
    id: 'FASH010',
    name: 'Global Desi Women Floral Maxi Dress — Teal',
    brand: 'Global Desi',
    category: 'Fashion',
    subcategory: 'Women Clothing',
    price: 1299,
    originalPrice: 2799,
    discount: 54,
    rating: 4.2,
    reviewCount: 4320,
    images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop'],
    description: 'Gorgeous floral maxi dress in teal. Perfect for brunch dates, vacations, and casual outings.',
    features: ['Viscose Fabric', 'Flared Fit', 'V-Neck', 'Short Sleeves', 'Floral Print', 'Ankle Length'],
    specifications: { 'Material': 'Viscose', 'Fit': 'Flared', 'Neck': 'V-Neck', 'Sleeve': 'Short', 'Length': 'Maxi', 'Occasion': 'Casual' },
    seller: 'Global Desi Store',
    stock: 80,
  },

  // ========== HOME & KITCHEN ==========
  {
    id: 'HOME001',
    name: 'Prestige Iris 750W Mixer Grinder — 3 Jars (White)',
    brand: 'Prestige',
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    price: 2399,
    originalPrice: 4495,
    discount: 47,
    rating: 4.2,
    reviewCount: 18970,
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop'],
    description: 'Prestige Iris 750W Mixer Grinder with 3 stainless steel jars. Powerful motor for all your grinding needs.',
    features: ['750W Motor', '3 SS Jars', 'Super Efficient Blades', 'Anti-Skid Feet', '2 Year Warranty', 'Motor Overload Protector'],
    specifications: { 'Wattage': '750W', 'Jars': '3', 'Material': 'Stainless Steel', 'Speed': '3 Speed + Pulse', 'Warranty': '2 Years', 'Color': 'White' },
    seller: 'Prestige Store',
    stock: 100,
  },
  {
    id: 'HOME002',
    name: 'Wipro 10W LED Smart Bulb (Pack of 2) — 16 Million Colors',
    brand: 'Wipro',
    category: 'Home & Kitchen',
    subcategory: 'Home Décor',
    price: 899,
    originalPrice: 1798,
    discount: 50,
    rating: 4.0,
    reviewCount: 6540,
    images: ['https://images.unsplash.com/photo-1550985543-49bee3167284?w=400&h=400&fit=crop'],
    description: 'Wipro Smart LED Bulb with 16 million colors. Control via app or voice with Alexa & Google Home compatibility.',
    features: ['16M Colors', 'App Control', 'Voice Control', 'Music Sync', 'Schedule Timer', 'E27 Base'],
    specifications: { 'Wattage': '10W', 'Base': 'E27', 'Colors': '16 Million', 'Connectivity': 'WiFi', 'Voltage': '220-240V', 'Life': '25000 hrs' },
    seller: 'Wipro Lighting',
    stock: 200,
  },
  {
    id: 'HOME003',
    name: 'Nilkamal Elegance Dining Table Set (1+4) — Walnut',
    brand: 'Nilkamal',
    category: 'Home & Kitchen',
    subcategory: 'Furniture',
    price: 15999,
    originalPrice: 28999,
    discount: 45,
    rating: 4.1,
    reviewCount: 3210,
    images: ['https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=400&h=400&fit=crop'],
    description: 'Elegant 4-seater dining table set in walnut finish. Sturdy engineered wood construction with premium cushioned chairs.',
    features: ['4-Seater', 'Engineered Wood', 'Cushioned Chairs', 'Anti-Skid Base', 'Easy Assembly', '1 Year Warranty'],
    specifications: { 'Material': 'Engineered Wood', 'Seats': '4', 'Table Size': '120x75x76 cm', 'Finish': 'Walnut', 'Chair Padding': 'Foam', 'Assembly': 'DIY' },
    seller: 'Nilkamal Furniture',
    stock: 12,
  },
  {
    id: 'HOME004',
    name: 'Pigeon by Stovekraft 12-Litre Electric Oven (OTG)',
    brand: 'Pigeon',
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    price: 2499,
    originalPrice: 5290,
    discount: 53,
    rating: 4.0,
    reviewCount: 9870,
    images: ['https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop'],
    description: '12-litre OTG with rotisserie and auto-shutoff. Perfect for baking, grilling, and toasting.',
    features: ['12L Capacity', 'Rotisserie Function', '60 Min Timer', 'Auto Shut-off', '1200W Power', '3 Heating Modes'],
    specifications: { 'Capacity': '12 Litres', 'Power': '1200W', 'Timer': '60 Minutes', 'Temp Range': '100-250°C', 'Functions': 'Bake, Grill, Toast', 'Accessories': 'Tray, Rack, Tongs' },
    seller: 'Pigeon Store',
    stock: 50,
  },
  {
    id: 'HOME005',
    name: 'Dyson V12 Detect Slim Cordless Vacuum Cleaner',
    brand: 'Dyson',
    category: 'Home & Kitchen',
    subcategory: 'Home Appliances',
    price: 44900,
    originalPrice: 58900,
    discount: 24,
    rating: 4.7,
    reviewCount: 2340,
    images: ['https://images.unsplash.com/photo-1527515545081-5db817172677?w=400&h=400&fit=crop'],
    description: 'Dyson V12 with laser dust detection and intelligent auto-mode. Deep cleans your whole home.',
    features: ['Laser Dust Detection', 'Up to 60 Min Runtime', 'HEPA Filtration', 'LCD Screen', 'Anti-tangle Head', 'Wall Dock'],
    specifications: { 'Suction': '150AW', 'Runtime': '60 min', 'Weight': '2.2 kg', 'Bin': '0.35L', 'Filtration': 'HEPA', 'Charging': '3.5 hrs' },
    seller: 'Dyson India',
    stock: 15,
  },
  {
    id: 'HOME006',
    name: 'Borosil 6.5L Digital Air Fryer — Black',
    brand: 'Borosil',
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    price: 5999,
    originalPrice: 11990,
    discount: 50,
    rating: 4.3,
    reviewCount: 7650,
    images: ['https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=400&h=400&fit=crop'],
    description: 'Large 6.5L digital air fryer with 8 preset menus. Cook healthy meals with up to 90% less oil.',
    features: ['6.5L Capacity', '8 Preset Menus', 'Digital Touch Screen', '1800W Power', '90% Less Oil', 'Non-Stick Basket'],
    specifications: { 'Capacity': '6.5 Litres', 'Power': '1800W', 'Temp': '80-200°C', 'Timer': '60 min', 'Display': 'Digital Touch', 'Material': 'Non-Stick Coated' },
    seller: 'Borosil Store',
    stock: 40,
  },
  {
    id: 'HOME007',
    name: 'Solimo 100% Cotton 6-Piece Towel Set — Navy Blue',
    brand: 'Solimo',
    category: 'Home & Kitchen',
    subcategory: 'Home Décor',
    price: 799,
    originalPrice: 1499,
    discount: 47,
    rating: 4.1,
    reviewCount: 14320,
    images: ['https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400&h=400&fit=crop'],
    description: '6-piece cotton towel set. Includes 2 bath towels, 2 hand towels, and 2 face towels. Ultra soft and absorbent.',
    features: ['100% Cotton', '6-Piece Set', '500 GSM', 'Quick Dry', 'Machine Washable', 'Fade Resistant'],
    specifications: { 'Material': '100% Cotton', 'GSM': '500', 'Pieces': '6', 'Includes': '2 Bath, 2 Hand, 2 Face', 'Color': 'Navy Blue', 'Care': 'Machine Wash' },
    seller: 'KartHub Home',
    stock: 180,
  },
  {
    id: 'HOME008',
    name: 'IKEA KALLAX Shelf Unit — White (4x4)',
    brand: 'IKEA',
    category: 'Home & Kitchen',
    subcategory: 'Furniture',
    price: 8990,
    originalPrice: 12990,
    discount: 31,
    rating: 4.4,
    reviewCount: 5670,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop'],
    description: 'Versatile KALLAX shelf unit. Use it as a room divider, bookshelf, or storage unit. Smooth white finish.',
    features: ['4x4 Grid (16 compartments)', 'Versatile Use', 'Smooth Finish', 'Wall Anchor Included', 'Easy Assembly', 'Compatible with Inserts'],
    specifications: { 'Dimensions': '147x147x39 cm', 'Material': 'Particleboard', 'Finish': 'White', 'Max Load/Shelf': '13 kg', 'Assembly': 'Required', 'Compartments': '16' },
    seller: 'IKEA India',
    stock: 20,
  },

  // ========== BOOKS ==========
  {
    id: 'BOOK001',
    name: 'Atomic Habits — James Clear (Paperback)',
    brand: 'Penguin',
    category: 'Books',
    subcategory: 'Self-Help',
    price: 299,
    originalPrice: 799,
    discount: 63,
    rating: 4.7,
    reviewCount: 145200,
    images: ['https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'],
    description: 'The #1 New York Times bestseller. Learn how tiny changes in habits can deliver remarkable results.',
    features: ['320 Pages', 'Paperback', 'English', 'International Bestseller', 'Practical Strategies', 'Easy to Read'],
    specifications: { 'Author': 'James Clear', 'Publisher': 'Penguin', 'Pages': '320', 'Language': 'English', 'ISBN': '978-0735211292', 'Format': 'Paperback' },
    seller: 'KartHub Books',
    stock: 500,
  },
  {
    id: 'BOOK002',
    name: 'The Psychology of Money — Morgan Housel (Paperback)',
    brand: 'Jaico Publishing',
    category: 'Books',
    subcategory: 'Finance',
    price: 249,
    originalPrice: 399,
    discount: 38,
    rating: 4.6,
    reviewCount: 89540,
    images: ['https://covers.openlibrary.org/b/isbn/9789390166268-L.jpg'],
    description: 'Timeless lessons on wealth, greed, and happiness. Doing well with money isn\'t about what you know. It\'s about how you behave.',
    features: ['252 Pages', 'Paperback', 'English', 'Bestseller', '19 Short Stories', 'Personal Finance'],
    specifications: { 'Author': 'Morgan Housel', 'Publisher': 'Jaico', 'Pages': '252', 'Language': 'English', 'ISBN': '978-9390166268', 'Format': 'Paperback' },
    seller: 'KartHub Books',
    stock: 400,
  },
  {
    id: 'BOOK003',
    name: 'Ikigai: The Japanese Secret to a Long and Happy Life',
    brand: 'Penguin',
    category: 'Books',
    subcategory: 'Self-Help',
    price: 199,
    originalPrice: 350,
    discount: 43,
    rating: 4.5,
    reviewCount: 76890,
    images: ['https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg'],
    description: 'Discover the Japanese concept of Ikigai — the happiness of always being busy — and how it can help you live a longer and more fulfilling life.',
    features: ['208 Pages', 'Paperback', 'English', 'International Bestseller', 'Japanese Philosophy', 'Easy Read'],
    specifications: { 'Author': 'Héctor García & Francesc Miralles', 'Publisher': 'Penguin', 'Pages': '208', 'Language': 'English', 'ISBN': '978-0143130727', 'Format': 'Paperback' },
    seller: 'KartHub Books',
    stock: 350,
  },
  {
    id: 'BOOK004',
    name: 'Rich Dad Poor Dad — Robert T. Kiyosaki (Paperback)',
    brand: 'Plata Publishing',
    category: 'Books',
    subcategory: 'Finance',
    price: 299,
    originalPrice: 499,
    discount: 40,
    rating: 4.5,
    reviewCount: 120340,
    images: ['https://covers.openlibrary.org/b/isbn/9781612681139-L.jpg'],
    description: 'What the rich teach their kids about money that the poor and middle class do not! The #1 Personal Finance book of all time.',
    features: ['336 Pages', 'Paperback', 'English', '#1 Finance Bestseller', '25th Anniversary Edition', 'Updated'],
    specifications: { 'Author': 'Robert T. Kiyosaki', 'Publisher': 'Plata Publishing', 'Pages': '336', 'Language': 'English', 'ISBN': '978-1612681139', 'Format': 'Paperback' },
    seller: 'KartHub Books',
    stock: 450,
  },
  {
    id: 'BOOK005',
    name: 'The Alchemist — Paulo Coelho (Paperback)',
    brand: 'HarperOne',
    category: 'Books',
    subcategory: 'Fiction',
    price: 225,
    originalPrice: 350,
    discount: 36,
    rating: 4.6,
    reviewCount: 98760,
    images: ['https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg'],
    description: 'A magical fable about following your dream. Paulo Coelho\'s masterwork has inspired millions worldwide.',
    features: ['208 Pages', 'Paperback', 'English', '80M+ Copies Sold', 'Translated in 80 Languages', 'Timeless Classic'],
    specifications: { 'Author': 'Paulo Coelho', 'Publisher': 'HarperOne', 'Pages': '208', 'Language': 'English', 'ISBN': '978-0062315007', 'Format': 'Paperback' },
    seller: 'KartHub Books',
    stock: 300,
  },

  // ========== GAMING ==========
  {
    id: 'GAME001',
    name: 'Sony PlayStation 5 Slim Console (Disc Edition)',
    brand: 'Sony',
    category: 'Gaming',
    subcategory: 'Consoles',
    price: 49990,
    originalPrice: 54990,
    discount: 9,
    rating: 4.8,
    reviewCount: 18920,
    images: ['https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'],
    description: 'PS5 Slim with disc drive. Experience lightning-fast loading, deeper immersion with haptic feedback, and stunning 4K gaming.',
    features: ['4K Gaming', 'Ray Tracing', '1TB SSD', 'DualSense Controller', 'Tempest 3D Audio', 'Backward Compatible'],
    specifications: { 'Storage': '1TB SSD', 'Resolution': 'Up to 4K 120fps', 'GPU': '10.28 TFLOPS', 'RAM': '16 GB GDDR6', 'Disc': 'Blu-ray', 'Ports': 'USB-C, USB-A, HDMI 2.1' },
    seller: 'Sony India Store',
    stock: 18,
  },
  {
    id: 'GAME002',
    name: 'Logitech G502 HERO Wired Gaming Mouse — Black',
    brand: 'Logitech',
    category: 'Gaming',
    subcategory: 'Accessories',
    price: 3495,
    originalPrice: 6795,
    discount: 49,
    rating: 4.6,
    reviewCount: 34560,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop'],
    description: 'HERO 25K sensor gaming mouse. 11 customizable buttons, adjustable weight system, and RGB lighting.',
    features: ['25K DPI Sensor', '11 Buttons', 'Adjustable Weights', 'LIGHTSYNC RGB', 'Mechanical Switches', 'On-board Memory'],
    specifications: { 'Sensor': 'HERO 25K', 'DPI': '100-25600', 'Buttons': '11', 'Weight': '121g (adj.)', 'Connection': 'USB Wired', 'Cable': '2.1m Braided' },
    seller: 'Logitech India',
    stock: 90,
  },
  {
    id: 'GAME003',
    name: 'Nintendo Switch OLED Model — White',
    brand: 'Nintendo',
    category: 'Gaming',
    subcategory: 'Consoles',
    price: 29999,
    originalPrice: 34999,
    discount: 14,
    rating: 4.7,
    reviewCount: 12340,
    images: ['https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop'],
    description: 'Nintendo Switch with a vibrant 7-inch OLED screen. Play at home on the TV or on-the-go in handheld mode.',
    features: ['7" OLED Screen', '64GB Storage', 'Enhanced Audio', 'Wide Adjustable Stand', 'Wired LAN Port', 'TV + Handheld Mode'],
    specifications: { 'Screen': '7" OLED', 'Storage': '64 GB', 'Battery': '4.5-9 hrs', 'Resolution': '1280x720 (Handheld)', 'TV Output': '1080p', 'Weight': '420g' },
    seller: 'Nintendo India',
    stock: 22,
  },
  {
    id: 'GAME004',
    name: 'SteelSeries Arctis Nova 7 Wireless Gaming Headset',
    brand: 'SteelSeries',
    category: 'Gaming',
    subcategory: 'Accessories',
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    rating: 4.5,
    reviewCount: 6780,
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop'],
    description: 'Multi-platform wireless gaming headset with 38-hour battery, Nova Acoustic System, and simultaneous Bluetooth + 2.4GHz.',
    features: ['38hr Battery', 'Dual Wireless', 'Nova Acoustic System', 'ClearCast Mic', 'ComfortMax System', 'Multi-Platform'],
    specifications: { 'Driver': '40mm', 'Battery': '38 hours', 'Wireless': '2.4GHz + Bluetooth', 'Mic': 'Retractable ClearCast', 'Weight': '325g', 'Platform': 'PC, PS5, Switch, Mobile' },
    seller: 'KartHub Gaming',
    stock: 35,
  },

  // ========== BEAUTY & PERSONAL CARE ==========
  {
    id: 'BEAU001',
    name: 'Maybelline New York Fit Me Matte Foundation — 128 Warm Nude',
    brand: 'Maybelline',
    category: 'Beauty',
    subcategory: 'Makeup',
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.2,
    reviewCount: 45670,
    images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop'],
    description: 'Lightweight matte foundation with poreless finish. Blurs pores and controls shine for a natural look.',
    features: ['Matte Finish', 'Poreless Look', 'Oil Control', 'SPF 22', 'Dermatologist Tested', 'Available in 18 Shades'],
    specifications: { 'Volume': '30ml', 'Finish': 'Matte', 'SPF': '22', 'Skin Type': 'Normal to Oily', 'Coverage': 'Medium', 'Shade': '128 Warm Nude' },
    seller: 'Maybelline Official',
    stock: 200,
  },
  {
    id: 'BEAU002',
    name: 'Philips BT3211/15 Cordless Beard Trimmer — DuraPower',
    brand: 'Philips',
    category: 'Beauty',
    subcategory: 'Grooming',
    price: 1299,
    originalPrice: 1795,
    discount: 28,
    rating: 4.3,
    reviewCount: 56780,
    images: ['https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=400&fit=crop'],
    description: 'Cordless beard trimmer with DuraPower technology for 4x longer battery life. 20 length settings from 1-10mm.',
    features: ['DuraPower Technology', '20 Length Settings', '60 Min Runtime', 'Stainless Steel Blades', 'USB Charging', 'Lift & Trim System'],
    specifications: { 'Runtime': '60 min', 'Charge Time': '1 hour', 'Settings': '20 (0.5mm steps)', 'Range': '1-10mm', 'Blades': 'Stainless Steel', 'Charging': 'USB' },
    seller: 'Philips India Official',
    stock: 120,
  },
  {
    id: 'BEAU003',
    name: 'Forest Essentials Luxury Kumkumadi Night Serum — 30ml',
    brand: 'Forest Essentials',
    category: 'Beauty',
    subcategory: 'Skincare',
    price: 3275,
    originalPrice: 4550,
    discount: 28,
    rating: 4.4,
    reviewCount: 8920,
    images: ['https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop'],
    description: 'Luxurious Kumkumadi night serum infused with pure saffron. Brightens skin, reduces dark spots, and improves texture.',
    features: ['Pure Saffron', 'Brightening', 'Anti-aging', 'Ayurvedic', 'Paraben Free', 'For All Skin Types'],
    specifications: { 'Volume': '30ml', 'Key Ingredient': 'Kumkumadi', 'Type': 'Night Serum', 'Skin Type': 'All', 'Free From': 'Parabens, SLS', 'Origin': 'India' },
    seller: 'Forest Essentials',
    stock: 50,
  },
  {
    id: 'BEAU004',
    name: 'Nivea Soft Moisturising Cream — 300ml',
    brand: 'Nivea',
    category: 'Beauty',
    subcategory: 'Skincare',
    price: 299,
    originalPrice: 425,
    discount: 30,
    rating: 4.4,
    reviewCount: 67890,
    images: ['https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop'],
    description: 'Refreshingly soft moisturising cream with Vitamin E and Jojoba Oil. Light, non-greasy formula for face, hands and body.',
    features: ['Vitamin E', 'Jojoba Oil', 'Light Formula', 'Non-Greasy', 'Quick Absorbing', 'For Face & Body'],
    specifications: { 'Volume': '300ml', 'Type': 'Moisturiser', 'Key Ingredients': 'Vitamin E, Jojoba Oil', 'Skin Type': 'All', 'Usage': 'Face, Hands, Body', 'Dermatologically Tested': 'Yes' },
    seller: 'Nivea Official',
    stock: 300,
  },

  // ========== SPORTS & FITNESS ==========
  {
    id: 'SPRT001',
    name: 'Boldfit Heavy Resistance Band Set (5 Bands) — Multi-Level',
    brand: 'Boldfit',
    category: 'Sports',
    subcategory: 'Fitness Equipment',
    price: 399,
    originalPrice: 1299,
    discount: 69,
    rating: 4.2,
    reviewCount: 34560,
    images: ['https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&h=400&fit=crop'],
    description: '5 resistance bands with varying intensity levels. Perfect for home workouts, physiotherapy, and stretching.',
    features: ['5 Resistance Levels', 'Natural Latex', 'Portable', 'Carry Bag Included', 'Workout Guide', 'Snap Resistant'],
    specifications: { 'Levels': '5 (Extra Light to Extra Heavy)', 'Material': 'Natural Latex', 'Length': '30cm each', 'Width': '5cm', 'Includes': '5 Bands + Bag + Guide', 'Use': 'Full Body Workout' },
    seller: 'Boldfit Store',
    stock: 500,
  },
  {
    id: 'SPRT002',
    name: 'Yonex Nanoray 7000I Badminton Racquet — Red',
    brand: 'Yonex',
    category: 'Sports',
    subcategory: 'Racquet Sports',
    price: 1080,
    originalPrice: 1490,
    discount: 28,
    rating: 4.3,
    reviewCount: 23450,
    images: ['https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop'],
    description: 'Lightweight isometric head-shaped racquet for fast swings. Built-in T-Joint for enhanced shot accuracy.',
    features: ['Isometric Head Shape', 'Built-in T-Joint', 'Lightweight', 'Nano Graphite Frame', 'Full Cover Included', 'Strung'],
    specifications: { 'Weight': '93g', 'Material': 'Nano Graphite', 'Head Shape': 'Isometric', 'String Tension': '24 lbs', 'Length': '675mm', 'Grip': 'G4' },
    seller: 'Yonex India',
    stock: 80,
  },
  {
    id: 'SPRT003',
    name: 'Nivia Storm Football — Size 5 (Black/Yellow)',
    brand: 'Nivia',
    category: 'Sports',
    subcategory: 'Team Sports',
    price: 549,
    originalPrice: 999,
    discount: 45,
    rating: 4.1,
    reviewCount: 18760,
    images: ['https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400&h=400&fit=crop'],
    description: 'Machine-stitched football ideal for training and casual play. Durable rubber bladder for consistent performance.',
    features: ['Size 5', 'Machine Stitched', 'Rubber Bladder', 'PVC Material', 'All Surface', 'Durable'],
    specifications: { 'Size': '5', 'Material': 'PVC', 'Bladder': 'Rubber', 'Stitching': 'Machine', 'Surface': 'All', 'Weight': '420g' },
    seller: 'Nivia Sports',
    stock: 150,
  },
  {
    id: 'SPRT004',
    name: 'PowerMax Fitness TD-M1-A1 Motorised Treadmill',
    brand: 'PowerMax',
    category: 'Sports',
    subcategory: 'Fitness Equipment',
    price: 18999,
    originalPrice: 35999,
    discount: 47,
    rating: 4.0,
    reviewCount: 7890,
    images: ['https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=400&fit=crop'],
    description: '2.0 HP motorised treadmill with 12 preset programs. Foldable design perfect for home workouts.',
    features: ['2.0 HP Motor', '12 Preset Programs', 'Max Speed 14 km/h', 'Foldable', 'Heart Rate Sensor', 'LCD Display'],
    specifications: { 'Motor': '2.0 HP', 'Speed': '1-14 km/h', 'Incline': 'Manual 3-Level', 'Running Area': '110x40 cm', 'Max Weight': '100 kg', 'Display': 'LCD' },
    seller: 'PowerMax Fitness',
    stock: 10,
  },

  // ========== TOYS & BABY ==========
  {
    id: 'TOYS001',
    name: 'LEGO Classic Creative Bricks Box (484 Pieces)',
    brand: 'LEGO',
    category: 'Toys & Baby',
    subcategory: 'Building Toys',
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    rating: 4.8,
    reviewCount: 23450,
    images: ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop'],
    description: '484-piece LEGO Classic set with 33 different colors. Comes with ideas booklet to get building right away.',
    features: ['484 Pieces', '33 Colors', 'Ideas Booklet', 'Ages 4+', 'Compatible with All LEGO Sets', 'Creative Play'],
    specifications: { 'Pieces': '484', 'Age': '4+', 'Colors': '33', 'Includes': 'Bricks + Eyes + Wheels', 'Theme': 'Classic', 'Material': 'ABS Plastic' },
    seller: 'LEGO Official Store',
    stock: 60,
  },
  {
    id: 'TOYS002',
    name: 'Funskool Monopoly Board Game — Classic Edition',
    brand: 'Funskool',
    category: 'Toys & Baby',
    subcategory: 'Board Games',
    price: 599,
    originalPrice: 1199,
    discount: 50,
    rating: 4.5,
    reviewCount: 18920,
    images: ['https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=400&fit=crop'],
    description: 'The classic Monopoly board game. Buy, sell, and trade your way to riches. For 2-6 players.',
    features: ['2-6 Players', 'Ages 8+', 'Classic Gameplay', 'Money Included', 'Property Trading', 'Family Game Night'],
    specifications: { 'Players': '2-6', 'Age': '8+', 'Time': '60-90 min', 'Includes': 'Board, Cards, Money, Tokens, Dice', 'Type': 'Strategy', 'Language': 'English' },
    seller: 'Funskool India',
    stock: 100,
  },
  {
    id: 'TOYS003',
    name: 'LuvLap Comfy Baby Stroller — Grey',
    brand: 'LuvLap',
    category: 'Toys & Baby',
    subcategory: 'Baby Products',
    price: 3999,
    originalPrice: 7999,
    discount: 50,
    rating: 4.2,
    reviewCount: 12340,
    images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop'],
    description: 'Lightweight and comfortable baby stroller with 5-point safety harness. Compact fold for easy storage and travel.',
    features: ['Lightweight', '5-Point Harness', 'Compact Fold', 'Adjustable Canopy', 'Storage Basket', 'Rear Wheel Brakes'],
    specifications: { 'Weight Limit': '15 kg', 'Age': '0-3 years', 'Weight': '7.5 kg', 'Fold': 'Compact', 'Wheels': '8', 'Safety': '5-Point Harness' },
    seller: 'LuvLap India',
    stock: 30,
  },

  // ========== GROCERY & GOURMET ==========
  {
    id: 'GROC001',
    name: 'Tata Gold Tea — 1kg Premium Blend',
    brand: 'Tata Tea',
    category: 'Grocery',
    subcategory: 'Beverages',
    price: 399,
    originalPrice: 540,
    discount: 26,
    rating: 4.4,
    reviewCount: 78900,
    images: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop'],
    description: 'Premium blend of 15% long leaf tea for a richer, tastier cup. Sourced from the finest tea gardens.',
    features: ['1kg Pack', '15% Long Leaf', 'Premium Blend', 'Rich Taste', 'Fresh Aroma', 'Sourced from Best Gardens'],
    specifications: { 'Weight': '1 kg', 'Type': 'Black Tea', 'Blend': 'Premium with Long Leaf', 'Origin': 'India', 'Pack': 'Pouch', 'Shelf Life': '18 months' },
    seller: 'KartHub Grocery',
    stock: 500,
  },
  {
    id: 'GROC002',
    name: 'Saffola Total Pro Heart Conscious Edible Oil — 5L',
    brand: 'Saffola',
    category: 'Grocery',
    subcategory: 'Cooking Essentials',
    price: 899,
    originalPrice: 1250,
    discount: 28,
    rating: 4.3,
    reviewCount: 45670,
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop'],
    description: 'Saffola Total blended cooking oil with Oryzanol. Helps manage cholesterol when used as part of a healthy diet.',
    features: ['5L Jar', 'Rice Bran + Safflower', 'Rich in Oryzanol', 'LOSORB Technology', 'Heart Healthy', 'Multi-Use'],
    specifications: { 'Volume': '5 Litres', 'Type': 'Blended Oil', 'Ingredients': 'Rice Bran + Safflower', 'Feature': 'LOSORB', 'Pack': 'Jar', 'Shelf Life': '12 months' },
    seller: 'KartHub Grocery',
    stock: 200,
  },
  {
    id: 'GROC003',
    name: 'Cadbury Dairy Milk Silk Chocolate — Pack of 8 (60g each)',
    brand: 'Cadbury',
    category: 'Grocery',
    subcategory: 'Snacks',
    price: 599,
    originalPrice: 880,
    discount: 32,
    rating: 4.6,
    reviewCount: 56780,
    images: ['https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop'],
    description: 'Pack of 8 Dairy Milk Silk chocolate bars. Silkier, smoother, and creamier than ever. Perfect for gifting.',
    features: ['Pack of 8', '60g Each', 'Silk Smooth', 'Premium Cocoa', 'Gift Pack', 'Vegetarian'],
    specifications: { 'Weight': '60g x 8', 'Type': 'Milk Chocolate', 'Diet': 'Vegetarian', 'Pack': 'Gift Box', 'Storage': 'Cool & Dry', 'Shelf Life': '9 months' },
    seller: 'KartHub Grocery',
    stock: 300,
  },
  {
    id: 'GROC004',
    name: 'Organic Tattva Brown Basmati Rice — 5kg',
    brand: 'Organic Tattva',
    category: 'Grocery',
    subcategory: 'Staples',
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.3,
    reviewCount: 12340,
    images: ['https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=400&fit=crop'],
    description: '100% organic brown basmati rice. Unpolished and nutrient-rich with a nutty flavour and fluffy texture.',
    features: ['5kg Pack', '100% Organic', 'Unpolished', 'High Fiber', 'Non-GMO', 'USDA Certified'],
    specifications: { 'Weight': '5 kg', 'Type': 'Brown Basmati', 'Certification': 'USDA Organic', 'Origin': 'India', 'GMO': 'Non-GMO', 'Shelf Life': '12 months' },
    seller: 'Organic Tattva',
    stock: 100,
  },

  // ========== TOOLS & HARDWARE ==========
  {
    id: 'TOOL001',
    name: 'Bosch GSB 500W Impact Drill Kit (100 Accessories)',
    brand: 'Bosch',
    category: 'Tools',
    subcategory: 'Power Tools',
    price: 2699,
    originalPrice: 4799,
    discount: 44,
    rating: 4.4,
    reviewCount: 18920,
    images: ['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop'],
    description: 'Versatile 500W impact drill kit with 100 accessories. Drills through concrete, metal, and wood with ease.',
    features: ['500W Motor', '100 Accessories', 'Forward/Reverse', '2800 RPM', 'Variable Speed', 'Carrying Case'],
    specifications: { 'Power': '500W', 'Speed': '0-2800 RPM', 'Chuck': '13mm Keyed', 'Impact Rate': '41600 bpm', 'Cable': '2m', 'Weight': '1.5 kg' },
    seller: 'Bosch Professional',
    stock: 40,
  },
  {
    id: 'TOOL002',
    name: 'Stanley 65-Piece Ultimate Tool Kit',
    brand: 'Stanley',
    category: 'Tools',
    subcategory: 'Hand Tools',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    rating: 4.5,
    reviewCount: 8970,
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop'],
    description: '65-piece toolkit with all essential hand tools for home repairs, maintenance, and DIY projects.',
    features: ['65 Pieces', 'Chrome Vanadium Steel', 'Blow Mould Case', 'Ratchet Set', 'Screwdriver Set', 'Pliers & Wrenches'],
    specifications: { 'Pieces': '65', 'Material': 'CrV Steel', 'Case': 'Blow Mould', 'Includes': 'Ratchet, Sockets, Screwdrivers, Pliers', 'Warranty': '1 Year', 'Use': 'Home & Auto' },
    seller: 'Stanley Tools India',
    stock: 55,
  },
  {
    id: 'TOOL003',
    name: 'Havells 1200mm Ambrose Decorative Ceiling Fan — Gold Mist',
    brand: 'Havells',
    category: 'Tools',
    subcategory: 'Electrical',
    price: 3299,
    originalPrice: 5490,
    discount: 40,
    rating: 4.3,
    reviewCount: 14560,
    images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop'],
    description: 'Premium decorative ceiling fan with dust-resistant finish. High air delivery with energy-efficient motor.',
    features: ['1200mm Sweep', 'Dust Resistant', 'High Air Delivery', 'Double Ball Bearing', 'Decorative Finish', '2 Year Warranty'],
    specifications: { 'Sweep': '1200mm', 'Speed': '380 RPM', 'Air Delivery': '230 CMM', 'Power': '75W', 'Bearing': 'Double Ball', 'Finish': 'Gold Mist' },
    seller: 'Havells India',
    stock: 70,
  },
];

// Export live dynamic product catalog (reactive array)
export const products = [...baseProductsCatalog];

// Initialize from localStorage cache
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';

if (typeof localStorage !== 'undefined') {
  try {
    const saved = localStorage.getItem('karthub_db_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        products.length = 0;
        products.push(...parsed);
      }
    }
  } catch (e) {
    console.warn('Failed to load cached products', e);
  }
}

// Fetch products from MongoDB backend and keep in-memory catalog updated
if (typeof window !== 'undefined') {
  (async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          products.length = 0;
          products.push(...json.data);
          try {
            localStorage.setItem('karthub_db_products', JSON.stringify(products));
          } catch {}
          window.dispatchEvent(new CustomEvent('karthub:products-updated', { detail: products }));
        }
      }
    } catch (e) {
      console.warn('MongoDB products fetch notice:', e.message);
    }
  })();
}

// Add new product dynamically
export async function addNewProduct(newProd) {
  const sellingPrice = Number(newProd.price) || 999;
  const origPrice = Number(newProd.originalPrice) || sellingPrice;
  const calculatedDiscount = origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0;

  const prod = {
    id: newProd.id || ('PROD' + Date.now()),
    name: newProd.name || 'New Product',
    brand: newProd.brand || 'KartHub',
    category: newProd.category || 'Electronics',
    subcategory: newProd.subcategory || 'General',
    price: sellingPrice,
    originalPrice: origPrice,
    discount: Number(newProd.discount) || calculatedDiscount,
    rating: Number(newProd.rating) || 4.5,
    reviewCount: Number(newProd.reviewCount) || 10,
    images: Array.isArray(newProd.images) && newProd.images.length ? newProd.images : [newProd.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
    description: newProd.description || 'Quality product available on KartHub.',
    features: newProd.features || ['Genuine Brand', 'Fast Delivery', '7 Days Replacement Policy'],
    specifications: newProd.specifications || { 'Brand': newProd.brand || 'KartHub', 'Category': newProd.category || 'General' },
    seller: newProd.seller || 'KartHub Authorized Retailer',
    stock: Number(newProd.stock) || 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  products.unshift(prod);
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('karthub_db_products', JSON.stringify(products));
    } catch {}
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('karthub:products-updated', { detail: products }));
  }

  // Save to MongoDB via API
  try {
    await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prod)
    });
  } catch (e) {
    console.warn('MongoDB add product notice:', e);
  }

  return prod;
}

// Update existing product dynamically
export async function updateProductById(id, updatedFields) {
  const idx = products.findIndex(p => p.id === id);
  if (idx >= 0) {
    const current = products[idx];
    const sellingPrice = updatedFields.price !== undefined ? Number(updatedFields.price) : current.price;
    const origPrice = updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : (current.originalPrice || sellingPrice);
    const calculatedDiscount = origPrice > sellingPrice ? Math.round(((origPrice - sellingPrice) / origPrice) * 100) : 0;

    const updated = {
      ...current,
      ...updatedFields,
      price: sellingPrice,
      originalPrice: origPrice,
      discount: updatedFields.discount !== undefined ? Number(updatedFields.discount) : calculatedDiscount,
      images: updatedFields.image ? [updatedFields.image] : (updatedFields.images || current.images),
      image: updatedFields.image || (Array.isArray(updatedFields.images) ? updatedFields.images[0] : current.image),
      updatedAt: new Date().toISOString()
    };

    products[idx] = updated;
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('karthub_db_products', JSON.stringify(products));
      } catch {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('karthub:products-updated', { detail: products }));
    }

    // Update in MongoDB via API
    try {
      await fetch(`${API_URL}/api/products/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('MongoDB update product notice:', e);
    }

    return updated;
  }
  return null;
}

// Delete product dynamically
export async function deleteProductById(id) {
  const idx = products.findIndex(p => p.id === id);
  if (idx >= 0) {
    const deleted = products.splice(idx, 1)[0];
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('karthub_db_products', JSON.stringify(products));
      } catch {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('karthub:products-updated', { detail: products }));
    }

    // Delete from MongoDB via API
    try {
      await fetch(`${API_URL}/api/products/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn('MongoDB delete product notice:', e);
    }

    return deleted;
  }
  return null;
}

// Helper to get product by ID
export function getProductById(id) {
  return products.find(p => p.id === id);
}

// Helper to get products by category
export function getProductsByCategory(category) {
  return products.filter(p => (p.category || '').toLowerCase() === (category || '').toLowerCase());
}

// Helper to get products by subcategory
export function getProductsBySubcategory(subcategory) {
  return products.filter(p => (p.subcategory || '').toLowerCase() === (subcategory || '').toLowerCase());
}

// Helper to search products
export function searchProducts(query) {
  const q = (query || '').toLowerCase();
  return products.filter(p =>
    (p.name || '').toLowerCase().includes(q) ||
    (p.brand || '').toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q) ||
    (p.subcategory || '').toLowerCase().includes(q) ||
    (p.description || '').toLowerCase().includes(q)
  );
}

// Helper to get featured/trending products
export function getFeaturedProducts(count = 10) {
  return [...products].sort((a, b) => ((b.rating || 4) * (b.reviewCount || 10)) - ((a.rating || 4) * (a.reviewCount || 10))).slice(0, count);
}

// Helper to get best deals
export function getBestDeals(count = 10) {
  return [...products].sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, count);
}

// Helper to get products under a price
export function getProductsUnderPrice(maxPrice, count = 10) {
  return products.filter(p => p.price <= maxPrice).sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, count);
}

// Get unique brands from a category
export function getBrandsByCategory(category) {
  const filtered = category ? products.filter(p => (p.category || '').toLowerCase() === (category || '').toLowerCase()) : products;
  return [...new Set(filtered.map(p => p.brand).filter(Boolean))].sort();
}

// Get all categories
export function getAllCategories() {
  return [...new Set(products.map(p => p.category).filter(Boolean))];
}

// Get subcategories for a category
export function getSubcategories(category) {
  return [...new Set(products.filter(p => (p.category || '').toLowerCase() === (category || '').toLowerCase()).map(p => p.subcategory).filter(Boolean))];
}

