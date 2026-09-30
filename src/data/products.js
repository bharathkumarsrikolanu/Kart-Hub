// ============================================
// KartHub — Product Catalog (59 Products)
// ============================================

const baseProductsCatalog = [
  {
    "id": "ELEC001",
    "brand": "Samsung",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:01.955Z",
    "description": "Experience the ultimate Galaxy with the S24 Ultra featuring a 200MP camera, Snapdragon 8 Gen 3 processor, and an S Pen built right in.",
    "discount": 44,
    "features": [
      "200MP Quad Camera",
      "6.8\" Dynamic AMOLED 2X",
      "Snapdragon 8 Gen 3",
      "5000mAh Battery",
      "S Pen Built-in",
      "IP68 Water Resistant"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-CnyWN_swumN-0qjvtDDRvhSxsaiKeAJoboYSoMZ5MQ&s=10"
    ],
    "name": "Samsung Galaxy S24 Ultra 5G (Titanium Black, 256 GB, 12 GB RAM)",
    "originalPrice": 134999,
    "price": 74999,
    "rating": 4.5,
    "reviewCount": 15420,
    "seller": "KartHub Electronics",
    "specifications": {
      "Display": "6.8 inch QHD+",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12 GB",
      "Storage": "256 GB",
      "Battery": "5000 mAh",
      "OS": "Android 14"
    },
    "stock": 45,
    "subcategory": "Smartphones",
    "updatedAt": "2026-09-20T05:31:44.947Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-CnyWN_swumN-0qjvtDDRvhSxsaiKeAJoboYSoMZ5MQ&s=10"
  },
  {
    "id": "ELEC002",
    "brand": "Apple",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:02.464Z",
    "description": "iPhone 15 Pro Max with A17 Pro chip, titanium design, 48MP camera system, and USB-C connectivity.",
    "discount": 13,
    "features": [
      "A17 Pro Chip",
      "48MP Camera System",
      "Titanium Design",
      "USB-C",
      "Action Button",
      "All-day Battery Life"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinLNHu-PoxyQaq5HeKMWSu1xW8cLeSRAOrtZLvoJ0aA&s=10"
    ],
    "name": "Apple iPhone 15 Pro Max (Natural Titanium, 256 GB)",
    "originalPrice": 159900,
    "price": 139900,
    "rating": 4.7,
    "reviewCount": 28350,
    "seller": "Apple Authorized Reseller",
    "specifications": {
      "Display": "6.7 inch Super Retina XDR",
      "Processor": "A17 Pro",
      "RAM": "8 GB",
      "Storage": "256 GB",
      "Battery": "4441 mAh",
      "OS": "iOS 17"
    },
    "stock": 30,
    "subcategory": "Smartphones",
    "updatedAt": "2026-09-20T05:31:26.652Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinLNHu-PoxyQaq5HeKMWSu1xW8cLeSRAOrtZLvoJ0aA&s=10"
  },
  {
    "id": "ELEC003",
    "brand": "Apple",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:02.557Z",
    "description": "Strikingly thin and fast. MacBook Air with M3 chip delivers amazing performance with up to 18 hours of battery life.",
    "discount": 10,
    "features": [
      "Apple M3 Chip",
      "15.3\" Liquid Retina Display",
      "16GB Unified Memory",
      "512GB SSD",
      "Up to 18hr Battery",
      "MagSafe Charging"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4RrHATrPOQFJhVi0yvJgilnvIlzIgEPS1l2YJJEv1AA&s=10"
    ],
    "name": "Apple MacBook Air M3 Chip (15-inch, 16GB, 512GB SSD) — Midnight",
    "originalPrice": 149900,
    "price": 134990,
    "rating": 4.8,
    "reviewCount": 5820,
    "seller": "KartHub Electronics",
    "specifications": {
      "Display": "15.3 inch Liquid Retina",
      "Processor": "Apple M3",
      "RAM": "16 GB",
      "Storage": "512 GB SSD",
      "Battery": "Up to 18 hours",
      "Weight": "1.51 kg"
    },
    "stock": 20,
    "subcategory": "Laptops",
    "updatedAt": "2026-09-20T05:31:08.503Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4RrHATrPOQFJhVi0yvJgilnvIlzIgEPS1l2YJJEv1AA&s=10"
  },
  {
    "id": "ELEC004",
    "brand": "Sony",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:02.665Z",
    "description": "Industry-leading noise cancellation optimized just for you. Crystal clear hands-free calling with 4 beamforming microphones.",
    "discount": 34,
    "features": [
      "Industry Leading ANC",
      "30hr Battery Life",
      "Multipoint Connection",
      "LDAC Hi-Res Audio",
      "Speak-to-Chat",
      "Lightweight 250g"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS588u8me41gMN9RxfnQFVjP204RXf6jFWg5tbH2FK2Ow&s=10"
    ],
    "name": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)",
    "originalPrice": 34990,
    "price": 22990,
    "rating": 4.6,
    "reviewCount": 12340,
    "seller": "Sony Official Store",
    "specifications": {
      "Driver": "30mm",
      "Battery": "30 hours",
      "Charging": "USB-C",
      "Weight": "250g",
      "Bluetooth": "5.2",
      "Codec": "LDAC, AAC, SBC"
    },
    "stock": 80,
    "subcategory": "Headphones",
    "updatedAt": "2026-09-20T05:32:04.828Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS588u8me41gMN9RxfnQFVjP204RXf6jFWg5tbH2FK2Ow&s=10"
  },
  {
    "id": "ELEC005",
    "brand": "Apple",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:02.763Z",
    "description": "iPad Air with M2 chip. Supercharged by M2, Air has the power to bring your ideas to life.",
    "discount": 13,
    "features": [
      "Apple M2 Chip",
      "11\" Liquid Retina Display",
      "Apple Pencil Pro Compatible",
      "USB-C",
      "Touch ID",
      "12MP Camera"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIXs8xo_C3vBrcQ8bQBgpldpLhvzf0SIiQJd6UC4AQQ&s"
    ],
    "name": "iPad Air (M2) 11-inch Wi-Fi 256GB — Space Grey",
    "originalPrice": 79900,
    "price": 69900,
    "rating": 4.7,
    "reviewCount": 4250,
    "seller": "KartHub Electronics",
    "specifications": {
      "Display": "11 inch Liquid Retina",
      "Processor": "Apple M2",
      "Storage": "256 GB",
      "Battery": "Up to 10 hours",
      "Weight": "462g",
      "Connectivity": "Wi-Fi 6E"
    },
    "stock": 35,
    "subcategory": "Tablets",
    "updatedAt": "2026-09-20T05:30:39.464Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIXs8xo_C3vBrcQ8bQBgpldpLhvzf0SIiQJd6UC4AQQ&s"
  },
  {
    "id": "ELEC006",
    "brand": "Sony",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:02.827Z",
    "description": "Beyond basic. The Alpha 7 IV sets a new standard for full-frame cameras with 33MP, real-time tracking, and 4K 60p video.",
    "discount": 19,
    "features": [
      "33MP Full-Frame Sensor",
      "BIONZ XR Processor",
      "Real-Time Eye AF",
      "4K 60p Video",
      "5-Axis IBIS",
      "Dual Card Slots"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcjSzVr8UM3TBF9xZiSPP_GWQDhL2sXEIf1S42DaXfwQ&s=10"
    ],
    "name": "Sony Alpha 7 IV Full-Frame Mirrorless Camera (Body Only)",
    "originalPrice": 243490,
    "price": 196990,
    "rating": 4.8,
    "reviewCount": 2130,
    "seller": "Camera Hub India",
    "specifications": {
      "Sensor": "33MP Full-Frame",
      "ISO": "100-51200",
      "AF Points": "759",
      "Video": "4K 60p",
      "Battery": "580 shots",
      "Weight": "658g"
    },
    "stock": 8,
    "subcategory": "Cameras",
    "updatedAt": "2026-09-20T05:30:15.721Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcjSzVr8UM3TBF9xZiSPP_GWQDhL2sXEIf1S42DaXfwQ&s=10"
  },
  {
    "id": "ELEC007",
    "brand": "Dell",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:02.900Z",
    "description": "A 27-inch 4K monitor with IPS Black technology, USB-C hub, and exceptional color accuracy for professionals.",
    "discount": 25,
    "features": [
      "27\" 4K UHD (3840x2160)",
      "IPS Black Technology",
      "USB-C 90W PD",
      "sRGB 100%",
      "Built-in KVM",
      "VESA DisplayHDR 400"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXUOpZl7mx5FL5nzy9RULK6FTgal7TLKeEwmAhkfgSw&s=10"
    ],
    "name": "Dell UltraSharp 27\" 4K USB-C Hub Monitor - U2723QE",
    "originalPrice": 59990,
    "price": 44990,
    "rating": 4.5,
    "reviewCount": 3420,
    "seller": "Dell India Official",
    "specifications": {
      "Size": "27 inch",
      "Resolution": "3840x2160",
      "Panel": "IPS Black",
      "Refresh": "60Hz",
      "Ports": "USB-C, HDMI, DP",
      "Response": "5ms"
    },
    "stock": 25,
    "subcategory": "Monitors",
    "updatedAt": "2026-09-20T05:29:58.362Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXUOpZl7mx5FL5nzy9RULK6FTgal7TLKeEwmAhkfgSw&s=10"
  },
  {
    "id": "ELEC008",
    "brand": "JBL",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:03.003Z",
    "description": "Play and charge endlessly. JBL Charge 5 delivers bold JBL Original Pro Sound with its optimized racetrack-shaped driver.",
    "discount": 26,
    "features": [
      "20hr Battery",
      "IP67 Waterproof",
      "Powerbank Feature",
      "PartyBoost",
      "JBL Pro Sound",
      "Dual Passive Radiators"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ohM6dIdMYi4sLnyFp2Wv7Jci_SYnHKXEnBfZg07KYQ&s=10"
    ],
    "name": "JBL Charge 5 Portable Bluetooth Speaker (Blue)",
    "originalPrice": 18999,
    "price": 13999,
    "rating": 4.4,
    "reviewCount": 8970,
    "seller": "KartHub Electronics",
    "specifications": {
      "Output": "40W",
      "Battery": "20 hours",
      "Bluetooth": "5.1",
      "Rating": "IP67",
      "Weight": "960g",
      "Charging": "USB-C"
    },
    "stock": 60,
    "subcategory": "Speakers",
    "updatedAt": "2026-09-20T05:29:36.564Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ohM6dIdMYi4sLnyFp2Wv7Jci_SYnHKXEnBfZg07KYQ&s=10"
  },
  {
    "id": "ELEC009",
    "brand": "Samsung",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:03.108Z",
    "description": "Crystal clear, crystal 4K. See what you have been missing with 4K resolution and Dynamic Crystal Color.",
    "discount": 34,
    "features": [
      "4K UHD Resolution",
      "Crystal Processor 4K",
      "Smart TV (Tizen)",
      "HDR 10+",
      "Adaptive Sound",
      "AirSlim Design"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8ytSd33HkAhoKyp0S94WlGRqLZ9TpA1jT-Q0vrKgug&s=10"
    ],
    "name": "Samsung 55\" Crystal 4K UHD Smart TV - UA55CU8000",
    "originalPrice": 64900,
    "price": 42990,
    "rating": 4.3,
    "reviewCount": 7650,
    "seller": "Samsung Store India",
    "specifications": {
      "Size": "55 inch",
      "Resolution": "3840x2160",
      "HDR": "HDR10+",
      "Sound": "20W",
      "OS": "Tizen",
      "Ports": "3 HDMI, 1 USB"
    },
    "stock": 15,
    "subcategory": "TVs",
    "updatedAt": "2026-09-20T05:29:13.460Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8ytSd33HkAhoKyp0S94WlGRqLZ9TpA1jT-Q0vrKgug&s=10"
  },
  {
    "id": "ELEC010",
    "brand": "Apple",
    "category": "Electronics",
    "createdAt": "2026-09-19T13:55:03.221Z",
    "description": "A magical new way to use your Apple Watch. Double Tap gesture, brighter display, and the powerful S9 SiP chip.",
    "discount": 20,
    "features": [
      "S9 SiP Chip",
      "Double Tap Gesture",
      "Always-On Retina Display",
      "Blood Oxygen",
      "ECG App",
      "Water Resistant 50m"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLgYUa3I7-BEcEWPST2zM2u1BOG0N7OBK7IL8GWpFZA&s=10"
    ],
    "name": "Apple Watch Series 9 GPS 45mm (Midnight Aluminium, M/L Sport Band)",
    "originalPrice": 49900,
    "price": 39900,
    "rating": 4.6,
    "reviewCount": 6340,
    "seller": "Apple Authorized Reseller",
    "specifications": {
      "Display": "45mm OLED",
      "Chip": "S9 SiP",
      "Storage": "64 GB",
      "Battery": "Up to 18 hours",
      "Water": "50m WR",
      "Connectivity": "GPS, Bluetooth 5.3"
    },
    "stock": 40,
    "subcategory": "Smartwatches",
    "updatedAt": "2026-09-20T05:28:53.821Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLgYUa3I7-BEcEWPST2zM2u1BOG0N7OBK7IL8GWpFZA&s=10"
  },
  {
    "id": "FASH001",
    "brand": "Allen Solly",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:03.353Z",
    "description": "Premium slim fit formal shirt in sky blue. Made from 100% cotton for all-day comfort in the office.",
    "discount": 55,
    "features": [
      "100% Cotton",
      "Slim Fit",
      "Full Sleeves",
      "Button Down Collar",
      "Machine Washable",
      "Wrinkle Resistant"
    ],
    "images": [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBAQDxAQEA8QDxAQFRAQDxAPDxAQFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGBAQFy0dHSYtLS0tKy0tLS0tKy0tLS0tLS0tKy0tLi0tLS0tKy0rLSstLS0tKy0tLS0tLS0tLS0rLf/AABEIAQMAwgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA9EAACAQIDBAcEBgsBAQAAAAABAgADEQQSIQUxQVEGEyJhcYGRMqGxwSNCUnKy0QcUM2JjgpKi4fDxUzT/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAnEQEBAAMAAQQBAwUBAAAAAAAAAQIDESEEMTJBEhMiUTNCcYGxI//aAAwDAQACEQMRAD8A9ThFiTmakhFhAyQhCAEIQiBJyXS7pvTwZ6umnX1hfOobKlIWv2jbeeQnWVGABJNgASSdAAOM+bsezO4y5mzErc6s1ydWPFo5A3ttdNtoVz+1qUFIBFPD3S19Rdwcx9ZRTphtIKF/Xa4W1sxsxHi57XvlLEdH8WiK+VsuliL6ct27fKFChiFNwrHXcRdTpbUcZU/EXHKfT0Do5+krFK6JjMlekWVWcKErIL2LWXRgBra1zPU9m7So4hOsoVFqJe11N7NxBHA90+akNRSM629q+ltT3fCdT+jfbxw+OpIXPU1yKDqdVLMfo28mIF+TGK4/cD3aEWEzUI6NEfAEiwhGkCKICEYLEJixpjBYQhEBEiwjBsIsSAESLEgBCEIgw+m7MNnYwre4oNu35frf23nj/RHBtVrgX7NM5mvx4W+E93xboKbmp7GU5tL3U6EW4zyvolsGpTTFLVDI5cU9DlYgC+h4XDDXviyvJWmvG29dUKTFCAARusbWMotg0sSKaq3GygXnOPsyvTqqtJsRRBscy4outydQVItpxvpymj0ixdejQp9XUJcjtOUDEnw3TPn06ZfviltLBK1wyC/hPO8SmSqSpKlWNjusQeXcZ2lD9Zap2sRUY5iLPRRab2texXhyMz8NsVsTtT9XC3VqwL8MtIWLm43dm/mRzmmvxbGG39069v2LiXq4bD1ai5alWhSqMtrZXZAzC3iZcgqgAACwAsANwA3CLEzAjo2OgBFiWixpAimJaBjMRDCJGRYRIQB0IQiIloRYhjMkIsSAESLCIKe1aOei45Wa3PKQ1vdMLDXA7ftnVr23nw3gCwvyAnUTE2vhghUrua+nIj/szzn231Z/2s7EU1uTyF72vaYm33psiqW1IJClWU7r6gi485pYlat7oUyW3FCxB4m95z2PqVNbqHsT7N1PvkzzOuuTwsbNUZBYcI7o/TttQNRU9YalqrfwTSYn+W4TzA7ouERmZEUDMxVQNwzH/M7Do3sEYcM7BTXqaMyjS1yd9rm5117oY+axzykjbhCE0cpRFiCLAFEICLHCEQmLEMZEiQMSIywiQgR8IGEYELQiQAhAwjBIRYkQJMrpCOwn3j8JrTK6QsOrUXFzUFhfUgKb/EScvZev5RzjbQVPb7PDXQHwMx8bi0Y6MLHvE2Kyg+0Lgi05zaWHpB+wLHu3TKezsaPR+qDiaAHGqvxnpM8nwFcUKtOq17U3VyBa5ANyBfS89G6P7YTF0VrKj0w1yEqZQ+W+jaE6HfLwniufd7xpQhFlMiiLEEWICEIsoiQMWIYEaYkUxhgC3hEhAJIQhGBFiRYAkIGEAIhiypiMYBoup58P8yscLneQrlJ7p6lQLa5AubAcSd+k8+6Y7XUYrDVg+ajnr4NiNVSt2Wse/sEf8m5i8Y+evUHaejRy07jQOQWY2HOyad05jYOwKtTDV6GLJFKu3Wrf9olU2Ofxuqny7zOyel/bZ9spu5lK2KVdWW9wZk45LtmsAAZkbArVqbVcPXFqlI2PI62uDxG+b7UcyEjXTTvM83LGy8epjezsYeJoGreoylqFM6oDlNZhr1d+A3XPI99x2mxdqI4WrROm4ppdDxRgNAf9E5xEyp1VhUqEliN4W9tL+Xvl3ZOzWQ572Yi2mgA5WnratEmuSzzfd5m7bcs758Oy2ZtmlWLKLo6m2V7drS91tv8A8TRnG0cDYsQdSQ3gRf8AMjzm3hsa6gfXHEE9oeBnPs9JffEY7v5bAjpXw+JRx2T5bmHiJYnHZZeVv3pIsBCMhEMWNMCNMYY8yMxUFhEhEfE0IkWWQixBFgBGuwAud0dKOMa5twHxmunX+plxGef4zpmJxJOg0X4+MqE695j2jFHGenhrmM5HJcrUNCnq5+05PwHyk3ViCDSPEvpMbaWxVqklSKdXUipa9za1mHEGwmZsSjUdWV1KMrtTZT9Ur7VuY5HjOpq7r8owW1bmAb236TO6cbnM/uNcd+UwuH0p0MCqbhqd54mSmnJ7c4FZozRqNI8DiIlorHSIEJsbjQ778ZfwG0CTkfjub5GZ9XgO6/lICdZlt1Y5zyvDOx1UJBgq2dA3HcfGTzybOXldfe+RGmOjDAGmRkx5kbRGLwiRYgnhCEsiiLEiwAJ0vMxm1l+uey3gZk1G92s7/Rzxa5t98yFq8Y4LKtStqO/Tz4S0hnYwNtFjyIwiI+mPax8IymnoDYcjaMxT2Gm82HrJ6Y3+J98oiESBK6l2pg9td40uBZTc8h2tL77GWGO7vMQi1zb8zDgRmRsZI5lWs9oWGiq4r6ZhwCD846oe0Ry08+Mw62KviurGugZu5bA+8AjxImvS4k8i3mZKmzsKvqVPHd4j/TNmczgHyZG/e91500831WHM+unVl2EMaYpjTOZoaZG0kMiJkmIRLwgaxAQhKSURYkURhFivYbwmVfQGa2J9gzGpns+BM9H0fwv+XLv+SniWymx1FwR5ay5Se+o42PulHamq3G+TbPe6UzzpofPKJ1Vkvho3NI2bQwJsIEgYZqgHAG/pLaiR4elbXiZJy/3X8pXQjxWmXxhUbcYuKW6eEgNW6X5RQCoZUc/OTU3zKTKzHWLI45jCuP1zEtxaoi+iKD+FZ0lNt/fOEr4vJjqy/wAYH1RT852mz2zAGKeyq07dgd06LB1M1NG/dsfEaH4TnRumxsZ+wy8jf1/5OX1mP7OtNN88XzGGPMYZ5rqNaRGSNImMRkhG3hF0LkIkJaSxREiwCPEnsnymNR3sOTTXxZ7PnMQvlrFftrmHiN89T0c/Y5N/yUdqVLKw5f6I/Y1fPSptuunlcEg/CV9uNv71IkHQ970Av2KlVfVy/wAGE6azbzDUDukgW57hCmvGSoIiH5iNcx7SE33+flGD33TNOjFeBl8tKWOXcw4H3RU4bQNiVlSvo0mZ76yHHbg0V8m5npL0ZYZcfSuyu1qqjehWyK3gbWPI25zf2TogB32E6jY9IPhVVtVcVFI36FmBnFYPElWZG0ZWKEfvKbH3iYadn5ZZY/xWmePJK3kM1dkmzkc1+YmThFJ13DnLdDEhaiW3XsfPSab8e67E4XmUb5MaYsaZ4ruRtInMkcyBzFQM0JHeEXQ0YRITRJYsSLAIcaeyPGc/tdWKh6etSkc6j7Q3MvmCfdNzaB0UeMyq9hPV9LOa45Nvzc3tHGCpTzrqCL24juh0LYXxCi+jU2tw7QYevZEr7ZoFGapT9ltXQcebAc/jNDoVSTqnqKbs9UqR9lVAK/jJ8xN8vpDpkEkEQRYJNeMf32Av3DcI8yNowjaRuLi0e55yI1BAKYFtJFWW4I9PGWK2pvK1Q2ke1U6To/8A/NS8H/G05/b2yqdLEnFO4FOtqylguR1UC45gm3mTOl2SPoKVt2QTlNpq1XaFYMOzS6pUvrb6NWNvNmnDo7d9/wBunZ/TiRWNSwXrBT+71S2/m7R9LSZMEgPZ18STLmQARlMDMAOJA9Z37L4c2Pu6ExrRTGNPCr0EbmQOZI5kLyQbCNhEGpCEJokoiiNEcIwqY06jwmTtB7DRSx9BNXHHXy/OZeLsBxPdPX9P/Tji2fKuZxlWq11Cjy1mh0OplVrAgD6Qajicuvnumbtqu4pnLpc203xmyulGHwlOnSrCrndWrFlQMoBdkF7sDfscBymmWclnSmNsdxeF5zuzum2ArOKVOs3WEMQho1gTlUs1jlsbAE7+Ev4Lb2DraUcVh6h+ytamW/pveOZ437LlaNQ6HwkLkjS4PeItSsosC6AngWFz4CMMY4Yw5xhQR7VFG8j1EzcRt7Bq2RsXh1e9snXU89zuGW97wtkHFt6YlWqRKWL6SYFLh64uDYhQ7kHlZRMvEdMsDY261vCnb8REzueM+1fjXo2xz9BT8CPRiJmVaQ6+q2hJaxI7hb4C3lJOhe0ExGCpVaebIzVQAwAYZajAggE8QZVw1YtnY8atQ8eLHScvpp/7Z3/P/W234RNVe0MAL1F8QfTX5SKu3KWtkUyXJI0VePM/4vN/UZcxrPXO1sGRtHkyNjPGrtQOZE8laQPEZt4RIRE1oRYk0ICOjY6MlHGe15CZ+L3S/jvb/lEy9oVgq6kDxIE9jR8I4tnyrlNoUWq1ggJtx7hznSrsSg+Hp0K1NaiKu5h2sx1Yg7wbk6gzO2aytVFOn22btVKluyqL9VfE2HnOmIEz3Wd4vCODr9B6OGNfE4d6gy4TFhaT2ezvRZFyvvG8777984bF9Cdo0b3wzVFy+1QYVB/SO0f6Z7mRpqLwI4TDjR8/bUqvTNKmXqqww9IPSqKUCdkCwBJvu4hbSpga9UVlWk7hqjZAELDM79ldBv1YT6CrbPpu2YqQeJVmQtpbWx100lI7Dw3/AIrcNcEljrfvMX403hlatUNWoGNVrVagAbO1gGItYzawGHYgMlHEPVTthVoVDqNRckWAvaew4XAUkF0popJOoUX385NTQDQCVITzbb3RmvXxlY0EUI2R8zuFVSyi40ub3B4cY0fo/r27VakNNyq7E91za09NKxpWFxCDoBhloYEUhcClVq3LG7EkhjfkdbWHKOekwBawzEliLnUnU90VqgphmN+rJDOFF7NYLnIGtrAA+HjFNUMAQQVOoINwRNvTYTG2981G228/hUdgwBBIubeB5Tc2QtqZvxY21ubCwmO2HLmyi5LLu7iCT6ToqNIIoUcB68zMvWZzn4q04+enkyN48yN55rpQtIHMmeQPJM2ESECbEIQmqQI6NjoBlbSP0nIBRrMXH0GqWJAC7hcEsR8p0O0adyORHw/7MvaiP1Z6tghHHLmnraL3XHHs+VV9gYFafWkEFiwB1vlAF7d3tX9JrTmuhzsDiabkF+sFXjchha+v3ROlImOfyrXH2IYCESIxIid/jJCZAW1Pj8oA5Dp5t8THZhGLb3mLYRgExpMDaIxgDKjcN4OhB3GcnWx1TDYmnTXtUKlWnSKneOtcIjqeYLAHnY91uirVNZPsbZavV66ooYUwoUEXHWBswbxXQ+JBmGzO42WNcOWWX2buDw+RQOJ1P5SUx5jDOXK23tVJzwaZE8kMjaSaF5A8neQNJoNtCEJKmvCEJuzAiwgIBBjfZHj8jM+t7JvYDv0lnblF3w9UU6xoOELCqEWoVsD9VtDOQI4sSSPrMbsfMzp1+pmvHnO0p6a7bb3iTZ62xt11HU1LkG4tmS3vt6zpjOPwtTq8RTcAfSWonwYgj+4L751/CXNn6nks9f6d4S8aTEJkNepaWzNrVtQOZkT1NfQ/EfKQZu1flKePxwpVaJYXFRCov9sG4+cm02orEnSSimYynnI3BZJlbnGC5JDXbgJKVPGU6z77R9JAd86bZFPLSX94lvl8py9M6zsMN7CfcX4Ccm2tcTzGGPMYZis0yN5IZG8k0LyFxJmkLxUGQhCSbXiwEJuzEBCEAobde1B+/KvqRecJtiqRTstyzaAKCWLHRQLcbz0TG4cVKb0z9ZSB3NvB9bTz7FgLlLXAp1abngbKwJHuk33dWi+KhxCuvVisOrqU7u63UlXpoXIuCQdVtcHjO1U6TncZQpYrEq9KqlWm+JT9mc4dLr1moOlhcHzm5hD2ACbsvZP3l7Le8GdGn7jH1HnlOdpSrNLVWUqxnQ5UV5jdJqKvUwGY2C46j53zKB5kgTTZpXxLIamGzi6iulh++dE/vK+klTpYgaFuccJRI6p0lCrL1Y6ShWMKSFBrOxonsr90fCccpnYYb2E+4vwE5NrbE4xpjjEMxUYZG0kMjaI0LyF5M8iaTTMhFhEGsIQEJszEIQjAnObd6OtUY1KLC51NNtATxIP59+s6OEmrxyuN7HDbEw+NwtQBaNRaL1gatMIjIxbKhqZlBNwFBve2ms6LEUsrvbcWzeban3kzXmftFdQeYHuP+RNNV5S2Zfl54z6pmfiZoVhKGJnWwUHaUNqm6oRqVcMPvKQw94EtVjrMvFV7L91wZNpu9VgfOKRKmy6oejSPNF177WMtmVCV6xlGqZcrSjUMKIZT3zr8J+zp/cX4CchR3zrsEb0qZ/hp+ETk2NcUpiGKYhmVUYZG0kMjaI0TSFpM0heTTNhCEQawiQhNogCLCEZCEISTEp7UHYB74Ql4e5X2ZlfhKGI4xYTrjOsfFTBxx0byhCTkcdh0QJOEpX51PxtNlokJWPsVVq0o1YQjy9iiOlv8j8J2GDH0dP7i/ARYTk2NcUkQxITGqNMjaEIGjaQPCEmmbCEIg//Z"
    ],
    "name": "Allen Solly Men Slim Fit Formal Shirt — Sky Blue",
    "originalPrice": 1999,
    "price": 899,
    "rating": 4.2,
    "reviewCount": 8540,
    "seller": "Allen Solly Official",
    "specifications": {
      "Material": "100% Cotton",
      "Fit": "Slim",
      "Sleeve": "Full",
      "Collar": "Button Down",
      "Pattern": "Solid",
      "Care": "Machine Wash"
    },
    "stock": 150,
    "subcategory": "Men Clothing",
    "updatedAt": "2026-09-20T05:28:34.120Z",
    "image": "data:image/jpeg;base64,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"
  },
  {
    "id": "FASH002",
    "brand": "Levi's",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:03.440Z",
    "description": "The 511 Slim Fit Jeans are a modern slim with room to move. From hip to ankle, the 511 sits below the waist.",
    "discount": 55,
    "features": [
      "98% Cotton, 2% Elastane",
      "Slim Fit",
      "5-Pocket Styling",
      "Zip Fly",
      "Medium Wash",
      "Stretchable"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQus7rH4uZnfPhzViTrNnkcDVI-F9nVr6Tm8tQbg9kkpg&s=10"
    ],
    "name": "Levi's Men 511 Slim Fit Jeans — Dark Indigo",
    "originalPrice": 3999,
    "price": 1799,
    "rating": 4.4,
    "reviewCount": 12340,
    "seller": "Levi's Official Store",
    "specifications": {
      "Material": "98% Cotton, 2% Elastane",
      "Fit": "Slim",
      "Rise": "Mid Rise",
      "Closure": "Zip",
      "Wash": "Dark Indigo",
      "Care": "Machine Wash Cold"
    },
    "stock": 200,
    "subcategory": "Men Clothing",
    "updatedAt": "2026-09-20T05:28:16.238Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQus7rH4uZnfPhzViTrNnkcDVI-F9nVr6Tm8tQbg9kkpg&s=10"
  },
  {
    "id": "FASH003",
    "brand": "Nike",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:03.552Z",
    "description": "Nike Air Max 270 delivers visible cushioning under every step. Features Nike's biggest heel Air unit yet for a super soft ride.",
    "discount": 40,
    "features": [
      "Max Air Unit",
      "Mesh Upper",
      "Foam Midsole",
      "Rubber Outsole",
      "Pull Tab",
      "Lightweight"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtvrARVDr7sGyTF2RoRmqfaQw2VYFJpuMNlCWwDr7amA&s"
    ],
    "name": "Nike Air Max 270 Running Shoes — Red",
    "originalPrice": 14995,
    "price": 8995,
    "rating": 4.5,
    "reviewCount": 9870,
    "seller": "Nike Official Store",
    "specifications": {
      "Upper": "Mesh",
      "Sole": "Rubber",
      "Closure": "Lace-Up",
      "Cushioning": "Air Max",
      "Weight": "310g",
      "Style": "Running"
    },
    "stock": 75,
    "subcategory": "Shoes",
    "updatedAt": "2026-09-20T05:32:35.246Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtvrARVDr7sGyTF2RoRmqfaQw2VYFJpuMNlCWwDr7amA&s"
  },
  {
    "id": "FASH004",
    "brand": "Fossil",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:03.623Z",
    "description": "Classic Neutra chronograph watch with a brown leather strap. Timeless design meets modern functionality.",
    "discount": 38,
    "features": [
      "Chronograph Movement",
      "Genuine Leather Strap",
      "44mm Case",
      "Mineral Crystal Glass",
      "5 ATM Water Resistant",
      "Luminous Hands"
    ],
    "images": [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop"
    ],
    "name": "Fossil Neutra Chronograph Brown Leather Watch — Men",
    "originalPrice": 12995,
    "price": 7996,
    "rating": 4.5,
    "reviewCount": 5430,
    "seller": "Fossil India Official",
    "specifications": {
      "Movement": "Quartz",
      "Case Size": "44mm",
      "Band": "Leather",
      "Water Resistance": "5 ATM",
      "Crystal": "Mineral",
      "Clasp": "Buckle"
    },
    "stock": 45,
    "subcategory": "Accessories",
    "updatedAt": "2026-09-19T16:38:54.880Z",
    "image": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop"
  },
  {
    "id": "FASH005",
    "brand": "W",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:03.713Z",
    "description": "Beautiful printed straight kurta in mustard yellow. Perfect for office wear or casual outings.",
    "discount": 47,
    "features": [
      "Viscose Rayon",
      "Straight Fit",
      "3/4 Sleeves",
      "Round Neck",
      "Printed Pattern",
      "Knee Length"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgpA-5WBt-_1jpW6b1eBjL0uCOujV12YyfYmWpL5USiw&s=10"
    ],
    "name": "W Women Printed Straight Kurta — Mustard Yellow",
    "originalPrice": 1499,
    "price": 799,
    "rating": 4.3,
    "reviewCount": 6780,
    "seller": "W Official Store",
    "specifications": {
      "Material": "Viscose Rayon",
      "Fit": "Straight",
      "Neck": "Round",
      "Sleeve": "3/4th",
      "Length": "Knee",
      "Occasion": "Casual"
    },
    "stock": 120,
    "subcategory": "Women Clothing",
    "updatedAt": "2026-09-20T05:27:43.924Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgpA-5WBt-_1jpW6b1eBjL0uCOujV12YyfYmWpL5USiw&s=10"
  },
  {
    "id": "FASH006",
    "brand": "Ray-Ban",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:03.842Z",
    "description": "The iconic Ray-Ban Aviator Classic. Timeless style with crystal green lenses and gold-tone metal frame.",
    "discount": 39,
    "features": [
      "Crystal Green Lenses",
      "Gold Metal Frame",
      "UV400 Protection",
      "58mm Lens",
      "Adjustable Nose Pads",
      "Iconic Design Since 1937"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZda2IgyiiN1WW5ChuNu1WttAaOCQvWIyLoD9LXsVbyQ&s=10"
    ],
    "name": "Ray-Ban Aviator Classic Sunglasses ",
    "originalPrice": 11490,
    "price": 6990,
    "rating": 4.6,
    "reviewCount": 11230,
    "seller": "Ray-Ban Official",
    "specifications": {
      "Lens": "Crystal Green G-15",
      "Frame": "Gold Metal",
      "Protection": "UV400",
      "Size": "58mm",
      "Shape": "Aviator",
      "Weight": "29g"
    },
    "stock": 90,
    "subcategory": "Accessories",
    "updatedAt": "2026-09-20T05:32:56.440Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZda2IgyiiN1WW5ChuNu1WttAaOCQvWIyLoD9LXsVbyQ&s=10"
  },
  {
    "id": "FASH007",
    "brand": "Adidas",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:03.945Z",
    "description": "The adidas Superstar shoe debuted in 1969 and quickly gained fame on basketball courts. This version stays true to the original design.",
    "discount": 40,
    "features": [
      "Leather Upper",
      "Shell Toe",
      "Rubber Outsole",
      "OrthoLite Sockliner",
      "Iconic 3-Stripes",
      "Classic Silhouette"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvnjGxkUh0xqYeJBBVWVEt_dLNne24b3vpzIl9u3_mTA&s=10"
    ],
    "name": "Adidas Originals Superstar Shoes — White/Black",
    "originalPrice": 9999,
    "price": 5999,
    "rating": 4.4,
    "reviewCount": 14560,
    "seller": "Adidas Official",
    "specifications": {
      "Upper": "Leather",
      "Sole": "Rubber",
      "Closure": "Lace-Up",
      "Style": "Casual",
      "Weight": "340g",
      "Origin": "Imported"
    },
    "stock": 110,
    "subcategory": "Shoes",
    "updatedAt": "2026-09-20T05:27:08.914Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvnjGxkUh0xqYeJBBVWVEt_dLNne24b3vpzIl9u3_mTA&s=10"
  },
  {
    "id": "FASH008",
    "brand": "Wildcraft",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:04.029Z",
    "description": "45-litre trekking backpack built for adventure. Features rain cover, multiple compartments, and padded straps.",
    "discount": 50,
    "features": [
      "45L Capacity",
      "Rain Cover Included",
      "Padded Shoulder Straps",
      "Multiple Compartments",
      "Durable Polyester",
      "Chest & Waist Straps"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_ywYXctmOqamKFyHe-ZG2_AS54vK4_9Dj6wNemEgXQ&s"
    ],
    "name": "Wildcraft Unisex 45L Trekking Backpack — Black",
    "originalPrice": 4999,
    "price": 2499,
    "rating": 4.3,
    "reviewCount": 7890,
    "seller": "Wildcraft Official",
    "specifications": {
      "Capacity": "45 Litres",
      "Material": "Polyester",
      "Dimensions": "60x35x25 cm",
      "Weight": "1.2 kg",
      "Closure": "Zip",
      "Use": "Trekking"
    },
    "stock": 65,
    "subcategory": "Bags",
    "updatedAt": "2026-09-20T05:26:46.101Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_ywYXctmOqamKFyHe-ZG2_AS54vK4_9Dj6wNemEgXQ&s"
  },
  {
    "id": "FASH009",
    "brand": "U.S. Polo Assn.",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:04.105Z",
    "description": "Classic polo t-shirt in navy blue. Made from premium cotton pique fabric for a comfortable and stylish look.",
    "discount": 56,
    "features": [
      "100% Cotton Pique",
      "Regular Fit",
      "Short Sleeves",
      "Polo Collar",
      "Embroidered Logo",
      "Ribbed Cuffs"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk7zQYxb_YH-qDmEAANn2cMJ04kshm9ZG8kdomhHaUlQ&s=10"
    ],
    "name": "U.S. Polo Assn. Men Premium Polo T-Shirt — Navy Blue",
    "originalPrice": 1599,
    "price": 699,
    "rating": 4.1,
    "reviewCount": 15670,
    "seller": "US Polo Official",
    "specifications": {
      "Material": "100% Cotton",
      "Fit": "Regular",
      "Collar": "Polo",
      "Sleeve": "Half",
      "Pattern": "Solid",
      "Care": "Machine Wash"
    },
    "stock": 200,
    "subcategory": "Men Clothing",
    "updatedAt": "2026-09-20T05:26:26.006Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk7zQYxb_YH-qDmEAANn2cMJ04kshm9ZG8kdomhHaUlQ&s=10"
  },
  {
    "id": "FASH010",
    "brand": "Global Desi",
    "category": "Fashion",
    "createdAt": "2026-09-19T13:55:04.186Z",
    "description": "Gorgeous floral maxi dress in teal. Perfect for brunch dates, vacations, and casual outings.",
    "discount": 54,
    "features": [
      "Viscose Fabric",
      "Flared Fit",
      "V-Neck",
      "Short Sleeves",
      "Floral Print",
      "Ankle Length"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp4uLeI6PMR7rO211UozB3Ym4jBEn91Rg2qj5_zlycqw&s"
    ],
    "name": "Global Desi Women Floral Maxi Dress — Teal",
    "originalPrice": 2799,
    "price": 1299,
    "rating": 4.2,
    "reviewCount": 4320,
    "seller": "Global Desi Store",
    "specifications": {
      "Material": "Viscose",
      "Fit": "Flared",
      "Neck": "V-Neck",
      "Sleeve": "Short",
      "Length": "Maxi",
      "Occasion": "Casual"
    },
    "stock": 80,
    "subcategory": "Women Clothing",
    "updatedAt": "2026-09-20T05:26:05.173Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp4uLeI6PMR7rO211UozB3Ym4jBEn91Rg2qj5_zlycqw&s"
  },
  {
    "id": "HOME001",
    "brand": "Prestige",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T13:55:04.312Z",
    "description": "Prestige Iris 750W Mixer Grinder with 3 stainless steel jars. Powerful motor for all your grinding needs.",
    "discount": 47,
    "features": [
      "750W Motor",
      "3 SS Jars",
      "Super Efficient Blades",
      "Anti-Skid Feet",
      "2 Year Warranty",
      "Motor Overload Protector"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFwZ30IC1BeyluRHy_9CjWSi5g74sU9pFmpDlOLLd3tA&s=10"
    ],
    "name": "Prestige Iris 750W Mixer Grinder — 3 Jars (White)",
    "originalPrice": 4495,
    "price": 2399,
    "rating": 4.2,
    "reviewCount": 18970,
    "seller": "Prestige Store",
    "specifications": {
      "Wattage": "750W",
      "Jars": "3",
      "Material": "Stainless Steel",
      "Speed": "3 Speed + Pulse",
      "Warranty": "2 Years",
      "Color": "White"
    },
    "stock": 100,
    "subcategory": "Kitchen Appliances",
    "updatedAt": "2026-09-20T05:25:45.183Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFwZ30IC1BeyluRHy_9CjWSi5g74sU9pFmpDlOLLd3tA&s=10"
  },
  {
    "id": "HOME002",
    "brand": "Wipro",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T13:55:04.385Z",
    "description": "Wipro Smart LED Bulb with 16 million colors. Control via app or voice with Alexa & Google Home compatibility.",
    "discount": 50,
    "features": [
      "16M Colors",
      "App Control",
      "Voice Control",
      "Music Sync",
      "Schedule Timer",
      "E27 Base"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzXerwBrWzRRpSF2ZgdWQs7JsI-N3JRLzeE1P7WgXU7w&s=10"
    ],
    "name": "Wipro 10W LED Smart Bulb (Pack of 2)",
    "originalPrice": 1798,
    "price": 899,
    "rating": 4,
    "reviewCount": 6540,
    "seller": "Wipro Lighting",
    "specifications": {
      "Wattage": "10W",
      "Base": "E27",
      "Colors": "16 Million",
      "Connectivity": "WiFi",
      "Voltage": "220-240V",
      "Life": "25000 hrs"
    },
    "stock": 200,
    "subcategory": "Home Décor",
    "updatedAt": "2026-09-20T05:25:22.989Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzXerwBrWzRRpSF2ZgdWQs7JsI-N3JRLzeE1P7WgXU7w&s=10"
  },
  {
    "id": "HOME003",
    "brand": "Nilkamal",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T13:55:04.479Z",
    "description": "Elegant 4-seater dining table set in walnut finish. Sturdy engineered wood construction with premium cushioned chairs.",
    "discount": 45,
    "features": [
      "4-Seater",
      "Engineered Wood",
      "Cushioned Chairs",
      "Anti-Skid Base",
      "Easy Assembly",
      "1 Year Warranty"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn70cYmLTjo2VG0-8HEuNVsRwykYKEnbTMiPSgM0Z1uQ&s=10"
    ],
    "name": "Nilkamal Elegance Dining Table Set (1+4) — Walnut",
    "originalPrice": 28999,
    "price": 15999,
    "rating": 4.1,
    "reviewCount": 3210,
    "seller": "Nilkamal Furniture",
    "specifications": {
      "Material": "Engineered Wood",
      "Seats": "4",
      "Table Size": "120x75x76 cm",
      "Finish": "Walnut",
      "Chair Padding": "Foam",
      "Assembly": "DIY"
    },
    "stock": 12,
    "subcategory": "Furniture",
    "updatedAt": "2026-09-20T05:24:57.959Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn70cYmLTjo2VG0-8HEuNVsRwykYKEnbTMiPSgM0Z1uQ&s=10"
  },
  {
    "id": "HOME004",
    "brand": "Pigeon",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T13:55:04.543Z",
    "description": "12-litre OTG with rotisserie and auto-shutoff. Perfect for baking, grilling, and toasting.",
    "discount": 53,
    "features": [
      "12L Capacity",
      "Rotisserie Function",
      "60 Min Timer",
      "Auto Shut-off",
      "1200W Power",
      "3 Heating Modes"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvycGY9uyllTGVrIzG7dH16PW83TD2eojfuM-OUEwLcQ&s=10"
    ],
    "name": "Pigeon by Stovekraft 12-Litre Electric Oven (OTG)",
    "originalPrice": 5290,
    "price": 2499,
    "rating": 4,
    "reviewCount": 9870,
    "seller": "Pigeon Store",
    "specifications": {
      "Capacity": "12 Litres",
      "Power": "1200W",
      "Timer": "60 Minutes",
      "Temp Range": "100-250°C",
      "Functions": "Bake, Grill, Toast",
      "Accessories": "Tray, Rack, Tongs"
    },
    "stock": 50,
    "subcategory": "Kitchen Appliances",
    "updatedAt": "2026-09-20T05:24:29.961Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvycGY9uyllTGVrIzG7dH16PW83TD2eojfuM-OUEwLcQ&s=10"
  },
  {
    "id": "HOME005",
    "brand": "Dyson",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T13:55:04.648Z",
    "description": "Dyson V12 with laser dust detection and intelligent auto-mode. Deep cleans your whole home.",
    "discount": 24,
    "features": [
      "Laser Dust Detection",
      "Up to 60 Min Runtime",
      "HEPA Filtration",
      "LCD Screen",
      "Anti-tangle Head",
      "Wall Dock"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEp7kIT7Wo9yKvqzdrWIrjWVo3HPwLyps8itT-n1PGEQ&s=10"
    ],
    "name": "Dyson V12 Detect Slim Cordless Vacuum Cleaner",
    "originalPrice": 58900,
    "price": 44900,
    "rating": 4.7,
    "reviewCount": 2340,
    "seller": "Dyson India",
    "specifications": {
      "Suction": "150AW",
      "Runtime": "60 min",
      "Weight": "2.2 kg",
      "Bin": "0.35L",
      "Filtration": "HEPA",
      "Charging": "3.5 hrs"
    },
    "stock": 15,
    "subcategory": "Home Appliances",
    "updatedAt": "2026-09-20T05:24:03.091Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEp7kIT7Wo9yKvqzdrWIrjWVo3HPwLyps8itT-n1PGEQ&s=10"
  },
  {
    "id": "HOME006",
    "brand": "Borosil",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T13:55:04.753Z",
    "description": "Large 6.5L digital air fryer with 8 preset menus. Cook healthy meals with up to 90% less oil.",
    "discount": 50,
    "features": [
      "6.5L Capacity",
      "8 Preset Menus",
      "Digital Touch Screen",
      "1800W Power",
      "90% Less Oil",
      "Non-Stick Basket"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEN4M60FvPeKlLkzx7zaE_7qwx0-akgkwU29CCut007w&s"
    ],
    "name": "Borosil 6.5L Digital Air Fryer — Black",
    "originalPrice": 11990,
    "price": 5999,
    "rating": 4.3,
    "reviewCount": 7650,
    "seller": "Borosil Store",
    "specifications": {
      "Capacity": "6.5 Litres",
      "Power": "1800W",
      "Temp": "80-200°C",
      "Timer": "60 min",
      "Display": "Digital Touch",
      "Material": "Non-Stick Coated"
    },
    "stock": 40,
    "subcategory": "Kitchen Appliances",
    "updatedAt": "2026-09-20T05:23:32.092Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEN4M60FvPeKlLkzx7zaE_7qwx0-akgkwU29CCut007w&s"
  },
  {
    "id": "HOME007",
    "brand": "Solimo",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T13:55:04.865Z",
    "description": "6-piece cotton towel set. Includes 2 bath towels, 2 hand towels, and 2 face towels. Ultra soft and absorbent.",
    "discount": 47,
    "features": [
      "100% Cotton",
      "6-Piece Set",
      "500 GSM",
      "Quick Dry",
      "Machine Washable",
      "Fade Resistant"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREppCA8kd57KbfCiE4cRmIYf5oLfpBePRXJxxc5W4L_Q&s"
    ],
    "name": "Solimo 100% Cotton 6-Piece Towel Set — Navy Blue",
    "originalPrice": 1499,
    "price": 799,
    "rating": 4.1,
    "reviewCount": 14320,
    "seller": "KartHub Home",
    "specifications": {
      "Material": "100% Cotton",
      "GSM": "500",
      "Pieces": "6",
      "Includes": "2 Bath, 2 Hand, 2 Face",
      "Color": "Navy Blue",
      "Care": "Machine Wash"
    },
    "stock": 180,
    "subcategory": "Home Décor",
    "updatedAt": "2026-09-20T05:23:13.809Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREppCA8kd57KbfCiE4cRmIYf5oLfpBePRXJxxc5W4L_Q&s"
  },
  {
    "id": "HOME008",
    "brand": "IKEA",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T13:55:04.947Z",
    "description": "Versatile KALLAX shelf unit. Use it as a room divider, bookshelf, or storage unit. Smooth white finish.",
    "discount": 31,
    "features": [
      "4x4 Grid (16 compartments)",
      "Versatile Use",
      "Smooth Finish",
      "Wall Anchor Included",
      "Easy Assembly",
      "Compatible with Inserts"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmDD4HQ4IEeI-NCZ9lzzniSTJW8ZRyImcOesLu2j8TDw&s=10"
    ],
    "name": "IKEA KALLAX Shelf Unit — White (4x4)",
    "originalPrice": 12990,
    "price": 8990,
    "rating": 4.4,
    "reviewCount": 5670,
    "seller": "IKEA India",
    "specifications": {
      "Dimensions": "147x147x39 cm",
      "Material": "Particleboard",
      "Finish": "White",
      "Max Load/Shelf": "13 kg",
      "Assembly": "Required",
      "Compartments": "16"
    },
    "stock": 20,
    "subcategory": "Furniture",
    "updatedAt": "2026-09-20T05:22:47.362Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmDD4HQ4IEeI-NCZ9lzzniSTJW8ZRyImcOesLu2j8TDw&s=10"
  },
  {
    "id": "BOOK001",
    "brand": "Penguin",
    "category": "Books",
    "createdAt": "2026-09-19T13:55:05.023Z",
    "description": "The #1 New York Times bestseller. Learn how tiny changes in habits can deliver remarkable results.",
    "discount": 63,
    "features": [
      "320 Pages",
      "Paperback",
      "English",
      "International Bestseller",
      "Practical Strategies",
      "Easy to Read"
    ],
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
    ],
    "name": "Atomic Habits — James Clear (Paperback)",
    "originalPrice": 799,
    "price": 299,
    "rating": 4.7,
    "reviewCount": 145200,
    "seller": "KartHub Books",
    "specifications": {
      "Author": "James Clear",
      "Publisher": "Penguin",
      "Pages": "320",
      "Language": "English",
      "ISBN": "978-0735211292",
      "Format": "Paperback"
    },
    "stock": 500,
    "subcategory": "Self-Help",
    "updatedAt": "2026-09-19T16:38:56.319Z",
    "image": "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
  },
  {
    "id": "BOOK002",
    "brand": "Jaico Publishing",
    "category": "Books",
    "createdAt": "2026-09-19T13:55:05.090Z",
    "description": "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't about what you know. It's about how you behave.",
    "discount": 38,
    "features": [
      "252 Pages",
      "Paperback",
      "English",
      "Bestseller",
      "19 Short Stories",
      "Personal Finance"
    ],
    "images": [
      "https://covers.openlibrary.org/b/isbn/9789390166268-L.jpg"
    ],
    "name": "The Psychology of Money — Morgan Housel (Paperback)",
    "originalPrice": 399,
    "price": 249,
    "rating": 4.6,
    "reviewCount": 89540,
    "seller": "KartHub Books",
    "specifications": {
      "Author": "Morgan Housel",
      "Publisher": "Jaico",
      "Pages": "252",
      "Language": "English",
      "ISBN": "978-9390166268",
      "Format": "Paperback"
    },
    "stock": 400,
    "subcategory": "Finance",
    "updatedAt": "2026-09-19T16:38:56.405Z",
    "image": "https://covers.openlibrary.org/b/isbn/9789390166268-L.jpg"
  },
  {
    "id": "BOOK003",
    "brand": "Penguin",
    "category": "Books",
    "createdAt": "2026-09-19T13:55:05.163Z",
    "description": "Discover the Japanese concept of Ikigai — the happiness of always being busy — and how it can help you live a longer and more fulfilling life.",
    "discount": 43,
    "features": [
      "208 Pages",
      "Paperback",
      "English",
      "International Bestseller",
      "Japanese Philosophy",
      "Easy Read"
    ],
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg"
    ],
    "name": "Ikigai: The Japanese Secret to a Long and Happy Life",
    "originalPrice": 350,
    "price": 199,
    "rating": 4.5,
    "reviewCount": 76890,
    "seller": "KartHub Books",
    "specifications": {
      "Author": "Héctor García & Francesc Miralles",
      "Publisher": "Penguin",
      "Pages": "208",
      "Language": "English",
      "ISBN": "978-0143130727",
      "Format": "Paperback"
    },
    "stock": 350,
    "subcategory": "Self-Help",
    "updatedAt": "2026-09-19T16:38:56.460Z",
    "image": "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg"
  },
  {
    "id": "BOOK004",
    "brand": "Plata Publishing",
    "category": "Books",
    "createdAt": "2026-09-19T13:55:05.246Z",
    "description": "What the rich teach their kids about money that the poor and middle class do not! The #1 Personal Finance book of all time.",
    "discount": 40,
    "features": [
      "336 Pages",
      "Paperback",
      "English",
      "#1 Finance Bestseller",
      "25th Anniversary Edition",
      "Updated"
    ],
    "images": [
      "https://covers.openlibrary.org/b/isbn/9781612681139-L.jpg"
    ],
    "name": "Rich Dad Poor Dad — Robert T. Kiyosaki (Paperback)",
    "originalPrice": 499,
    "price": 299,
    "rating": 4.5,
    "reviewCount": 120340,
    "seller": "KartHub Books",
    "specifications": {
      "Author": "Robert T. Kiyosaki",
      "Publisher": "Plata Publishing",
      "Pages": "336",
      "Language": "English",
      "ISBN": "978-1612681139",
      "Format": "Paperback"
    },
    "stock": 450,
    "subcategory": "Finance",
    "updatedAt": "2026-09-19T16:38:56.546Z",
    "image": "https://covers.openlibrary.org/b/isbn/9781612681139-L.jpg"
  },
  {
    "id": "BOOK005",
    "brand": "HarperOne",
    "category": "Books",
    "createdAt": "2026-09-19T13:55:05.307Z",
    "description": "A magical fable about following your dream. Paulo Coelho's masterwork has inspired millions worldwide.",
    "discount": 36,
    "features": [
      "208 Pages",
      "Paperback",
      "English",
      "80M+ Copies Sold",
      "Translated in 80 Languages",
      "Timeless Classic"
    ],
    "images": [
      "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg"
    ],
    "name": "The Alchemist — Paulo Coelho (Paperback)",
    "originalPrice": 350,
    "price": 225,
    "rating": 4.6,
    "reviewCount": 98760,
    "seller": "KartHub Books",
    "specifications": {
      "Author": "Paulo Coelho",
      "Publisher": "HarperOne",
      "Pages": "208",
      "Language": "English",
      "ISBN": "978-0062315007",
      "Format": "Paperback"
    },
    "stock": 300,
    "subcategory": "Fiction",
    "updatedAt": "2026-09-19T16:38:56.599Z",
    "image": "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg"
  },
  {
    "id": "GAME001",
    "brand": "Sony",
    "category": "Gaming",
    "createdAt": "2026-09-19T13:55:05.392Z",
    "description": "PS5 Slim with disc drive. Experience lightning-fast loading, deeper immersion with haptic feedback, and stunning 4K gaming.",
    "discount": 9,
    "features": [
      "4K Gaming",
      "Ray Tracing",
      "1TB SSD",
      "DualSense Controller",
      "Tempest 3D Audio",
      "Backward Compatible"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8bFqgQuDPErUkkSbNPvQ45i6Imyi0NdWQGf1z9KApWg&s=10"
    ],
    "name": "Sony PlayStation 5 Slim Console (Disc Edition)",
    "originalPrice": 54990,
    "price": 49990,
    "rating": 4.8,
    "reviewCount": 18920,
    "seller": "Sony India Store",
    "specifications": {
      "Storage": "1TB SSD",
      "Resolution": "Up to 4K 120fps",
      "GPU": "10.28 TFLOPS",
      "RAM": "16 GB GDDR6",
      "Disc": "Blu-ray",
      "Ports": "USB-C, USB-A, HDMI 2.1"
    },
    "stock": 18,
    "subcategory": "Consoles",
    "updatedAt": "2026-09-20T05:22:18.384Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8bFqgQuDPErUkkSbNPvQ45i6Imyi0NdWQGf1z9KApWg&s=10"
  },
  {
    "id": "GAME002",
    "brand": "Logitech",
    "category": "Gaming",
    "createdAt": "2026-09-19T13:55:05.468Z",
    "description": "HERO 25K sensor gaming mouse. 11 customizable buttons, adjustable weight system, and RGB lighting.",
    "discount": 49,
    "features": [
      "25K DPI Sensor",
      "11 Buttons",
      "Adjustable Weights",
      "LIGHTSYNC RGB",
      "Mechanical Switches",
      "On-board Memory"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHT9FuX3uBWl5ZwmOepWY4pGSQvb-qFT1lhqgXXnrcg&s=10"
    ],
    "name": "Logitech G502 HERO Wired Gaming Mouse — Black",
    "originalPrice": 6795,
    "price": 3495,
    "rating": 4.6,
    "reviewCount": 34560,
    "seller": "Logitech India",
    "specifications": {
      "Sensor": "HERO 25K",
      "DPI": "100-25600",
      "Buttons": "11",
      "Weight": "121g (adj.)",
      "Connection": "USB Wired",
      "Cable": "2.1m Braided"
    },
    "stock": 90,
    "subcategory": "Accessories",
    "updatedAt": "2026-09-20T05:21:54.019Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHT9FuX3uBWl5ZwmOepWY4pGSQvb-qFT1lhqgXXnrcg&s=10"
  },
  {
    "id": "GAME003",
    "brand": "Nintendo",
    "category": "Gaming",
    "createdAt": "2026-09-19T13:55:05.545Z",
    "description": "Nintendo Switch with a vibrant 7-inch OLED screen. Play at home on the TV or on-the-go in handheld mode.",
    "discount": 14,
    "features": [
      "7\" OLED Screen",
      "64GB Storage",
      "Enhanced Audio",
      "Wide Adjustable Stand",
      "Wired LAN Port",
      "TV + Handheld Mode"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-tFSkRR76kQ2E3J8M-hlz9Srb00cvGM2gm7g8d-eFQ&s=10"
    ],
    "name": "Nintendo Switch OLED Model — White",
    "originalPrice": 34999,
    "price": 29999,
    "rating": 4.7,
    "reviewCount": 12340,
    "seller": "Nintendo India",
    "specifications": {
      "Screen": "7\" OLED",
      "Storage": "64 GB",
      "Battery": "4.5-9 hrs",
      "Resolution": "1280x720 (Handheld)",
      "TV Output": "1080p",
      "Weight": "420g"
    },
    "stock": 22,
    "subcategory": "Consoles",
    "updatedAt": "2026-09-20T05:21:33.490Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-tFSkRR76kQ2E3J8M-hlz9Srb00cvGM2gm7g8d-eFQ&s=10"
  },
  {
    "id": "GAME004",
    "brand": "SteelSeries",
    "category": "Gaming",
    "createdAt": "2026-09-19T13:55:05.657Z",
    "description": "Multi-platform wireless gaming headset with 38-hour battery, Nova Acoustic System, and simultaneous Bluetooth + 2.4GHz.",
    "discount": 32,
    "features": [
      "38hr Battery",
      "Dual Wireless",
      "Nova Acoustic System",
      "ClearCast Mic",
      "ComfortMax System",
      "Multi-Platform"
    ],
    "images": [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop"
    ],
    "name": "SteelSeries Arctis Nova 7 Wireless Gaming Headset",
    "originalPrice": 18999,
    "price": 12999,
    "rating": 4.5,
    "reviewCount": 6780,
    "seller": "KartHub Gaming",
    "specifications": {
      "Driver": "40mm",
      "Battery": "38 hours",
      "Wireless": "2.4GHz + Bluetooth",
      "Mic": "Retractable ClearCast",
      "Weight": "325g",
      "Platform": "PC, PS5, Switch, Mobile"
    },
    "stock": 35,
    "subcategory": "Accessories",
    "updatedAt": "2026-09-19T16:38:56.916Z",
    "image": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop"
  },
  {
    "id": "BEAU001",
    "brand": "Maybelline",
    "category": "Beauty",
    "createdAt": "2026-09-19T13:55:05.727Z",
    "description": "Lightweight matte foundation with poreless finish. Blurs pores and controls shine for a natural look.",
    "discount": 33,
    "features": [
      "Matte Finish",
      "Poreless Look",
      "Oil Control",
      "SPF 22",
      "Dermatologist Tested",
      "Available in 18 Shades"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVF5vO5ekrqOUX-dKNi04iPvqE2RpOg8zV2j-XmQsgQ&s=10"
    ],
    "name": "Maybelline New York Fit Me Matte Foundation — 128 Warm Nude",
    "originalPrice": 599,
    "price": 399,
    "rating": 4.2,
    "reviewCount": 45670,
    "seller": "Maybelline Official",
    "specifications": {
      "Volume": "30ml",
      "Finish": "Matte",
      "SPF": "22",
      "Skin Type": "Normal to Oily",
      "Coverage": "Medium",
      "Shade": "128 Warm Nude"
    },
    "stock": 200,
    "subcategory": "Makeup",
    "updatedAt": "2026-09-20T05:21:09.239Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVF5vO5ekrqOUX-dKNi04iPvqE2RpOg8zV2j-XmQsgQ&s=10"
  },
  {
    "id": "BEAU002",
    "brand": "Philips",
    "category": "Beauty",
    "createdAt": "2026-09-19T13:55:05.803Z",
    "description": "Cordless beard trimmer with DuraPower technology for 4x longer battery life. 20 length settings from 1-10mm.",
    "discount": 28,
    "features": [
      "DuraPower Technology",
      "20 Length Settings",
      "60 Min Runtime",
      "Stainless Steel Blades",
      "USB Charging",
      "Lift & Trim System"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1eo4z1H9lEle7Dm8ed3ua7c_ker49ABXmACX2AuJlng&s=10"
    ],
    "name": "Philips BT3211/15 Cordless Beard Trimmer — DuraPower",
    "originalPrice": 1795,
    "price": 1299,
    "rating": 4.3,
    "reviewCount": 56780,
    "seller": "Philips India Official",
    "specifications": {
      "Runtime": "60 min",
      "Charge Time": "1 hour",
      "Settings": "20 (0.5mm steps)",
      "Range": "1-10mm",
      "Blades": "Stainless Steel",
      "Charging": "USB"
    },
    "stock": 120,
    "subcategory": "Grooming",
    "updatedAt": "2026-09-20T05:20:41.847Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1eo4z1H9lEle7Dm8ed3ua7c_ker49ABXmACX2AuJlng&s=10"
  },
  {
    "id": "BEAU003",
    "brand": "Forest Essentials",
    "category": "Beauty",
    "createdAt": "2026-09-19T13:55:05.877Z",
    "description": "Luxurious Kumkumadi night serum infused with pure saffron. Brightens skin, reduces dark spots, and improves texture.",
    "discount": 28,
    "features": [
      "Pure Saffron",
      "Brightening",
      "Anti-aging",
      "Ayurvedic",
      "Paraben Free",
      "For All Skin Types"
    ],
    "images": [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop"
    ],
    "name": "Forest Essentials Luxury Kumkumadi Night Serum — 30ml",
    "originalPrice": 4550,
    "price": 3275,
    "rating": 4.4,
    "reviewCount": 8920,
    "seller": "Forest Essentials",
    "specifications": {
      "Volume": "30ml",
      "Key Ingredient": "Kumkumadi",
      "Type": "Night Serum",
      "Skin Type": "All",
      "Free From": "Parabens, SLS",
      "Origin": "India"
    },
    "stock": 50,
    "subcategory": "Skincare",
    "updatedAt": "2026-09-19T16:38:57.160Z",
    "image": "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop"
  },
  {
    "id": "BEAU004",
    "brand": "Nivea",
    "category": "Beauty",
    "createdAt": "2026-09-19T13:55:05.951Z",
    "description": "Refreshingly soft moisturising cream with Vitamin E and Jojoba Oil. Light, non-greasy formula for face, hands and body.",
    "discount": 30,
    "features": [
      "Vitamin E",
      "Jojoba Oil",
      "Light Formula",
      "Non-Greasy",
      "Quick Absorbing",
      "For Face & Body"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlojJaVKHyEn_4eSRp0eI037z0j9cOqzV7laQXYK1qLA&s=10"
    ],
    "name": "Nivea Soft Moisturising Cream — 300ml",
    "originalPrice": 425,
    "price": 299,
    "rating": 4.4,
    "reviewCount": 67890,
    "seller": "Nivea Official",
    "specifications": {
      "Volume": "300ml",
      "Type": "Moisturiser",
      "Key Ingredients": "Vitamin E, Jojoba Oil",
      "Skin Type": "All",
      "Usage": "Face, Hands, Body",
      "Dermatologically Tested": "Yes"
    },
    "stock": 300,
    "subcategory": "Skincare",
    "updatedAt": "2026-09-20T05:20:04.795Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlojJaVKHyEn_4eSRp0eI037z0j9cOqzV7laQXYK1qLA&s=10"
  },
  {
    "id": "SPRT001",
    "brand": "Boldfit",
    "category": "Sports",
    "createdAt": "2026-09-19T13:55:06.038Z",
    "description": "5 resistance bands with varying intensity levels. Perfect for home workouts, physiotherapy, and stretching.",
    "discount": 69,
    "features": [
      "5 Resistance Levels",
      "Natural Latex",
      "Portable",
      "Carry Bag Included",
      "Workout Guide",
      "Snap Resistant"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTywrwudA7HpMPHdM1VWQlpQr0qHunyCPXcKakwgZfabA&s=10"
    ],
    "name": "Boldfit Heavy Resistance Band Set (5 Bands) — Multi-Level",
    "originalPrice": 1299,
    "price": 399,
    "rating": 4.2,
    "reviewCount": 34560,
    "seller": "Boldfit Store",
    "specifications": {
      "Levels": "5 (Extra Light to Extra Heavy)",
      "Material": "Natural Latex",
      "Length": "30cm each",
      "Width": "5cm",
      "Includes": "5 Bands + Bag + Guide",
      "Use": "Full Body Workout"
    },
    "stock": 500,
    "subcategory": "Fitness Equipment",
    "updatedAt": "2026-09-20T05:19:41.960Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTywrwudA7HpMPHdM1VWQlpQr0qHunyCPXcKakwgZfabA&s=10"
  },
  {
    "id": "SPRT002",
    "brand": "Yonex",
    "category": "Sports",
    "createdAt": "2026-09-19T13:55:06.107Z",
    "description": "Lightweight isometric head-shaped racquet for fast swings. Built-in T-Joint for enhanced shot accuracy.",
    "discount": 28,
    "features": [
      "Isometric Head Shape",
      "Built-in T-Joint",
      "Lightweight",
      "Nano Graphite Frame",
      "Full Cover Included",
      "Strung"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIJEGZRVA9c5Ht7QFCZY8CtdP-NqXa2k_Bf6TKWtJzQ&s"
    ],
    "name": "Yonex Nanoray 7000I Badminton Racquet — Red",
    "originalPrice": 1490,
    "price": 1080,
    "rating": 4.3,
    "reviewCount": 23450,
    "seller": "Yonex India",
    "specifications": {
      "Weight": "93g",
      "Material": "Nano Graphite",
      "Head Shape": "Isometric",
      "String Tension": "24 lbs",
      "Length": "675mm",
      "Grip": "G4"
    },
    "stock": 80,
    "subcategory": "Racquet Sports",
    "updatedAt": "2026-09-20T05:18:47.957Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIJEGZRVA9c5Ht7QFCZY8CtdP-NqXa2k_Bf6TKWtJzQ&s"
  },
  {
    "id": "SPRT003",
    "brand": "Nivia",
    "category": "Sports",
    "createdAt": "2026-09-19T13:55:06.168Z",
    "description": "Machine-stitched football ideal for training and casual play. Durable rubber bladder for consistent performance.",
    "discount": 45,
    "features": [
      "Size 5",
      "Machine Stitched",
      "Rubber Bladder",
      "PVC Material",
      "All Surface",
      "Durable"
    ],
    "images": [
      "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400&h=400&fit=crop"
    ],
    "name": "Nivia Storm Football — Size 5 (Black/Yellow)",
    "originalPrice": 999,
    "price": 549,
    "rating": 4.1,
    "reviewCount": 18760,
    "seller": "Nivia Sports",
    "specifications": {
      "Size": "5",
      "Material": "PVC",
      "Bladder": "Rubber",
      "Stitching": "Machine",
      "Surface": "All",
      "Weight": "420g"
    },
    "stock": 150,
    "subcategory": "Team Sports",
    "updatedAt": "2026-09-19T16:38:57.465Z",
    "image": "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400&h=400&fit=crop"
  },
  {
    "id": "SPRT004",
    "brand": "PowerMax",
    "category": "Sports",
    "createdAt": "2026-09-19T13:55:06.298Z",
    "description": "2.0 HP motorised treadmill with 12 preset programs. Foldable design perfect for home workouts.",
    "discount": 47,
    "features": [
      "2.0 HP Motor",
      "12 Preset Programs",
      "Max Speed 14 km/h",
      "Foldable",
      "Heart Rate Sensor",
      "LCD Display"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwXZzRvpjekifOElA_wxzn4i__CNXMDEMh9b6VEsSLw&s=10"
    ],
    "name": "PowerMax Fitness TD-M1-A1 Motorised Treadmill",
    "originalPrice": 35999,
    "price": 18999,
    "rating": 4,
    "reviewCount": 7890,
    "seller": "PowerMax Fitness",
    "specifications": {
      "Motor": "2.0 HP",
      "Speed": "1-14 km/h",
      "Incline": "Manual 3-Level",
      "Running Area": "110x40 cm",
      "Max Weight": "100 kg",
      "Display": "LCD"
    },
    "stock": 10,
    "subcategory": "Fitness Equipment",
    "updatedAt": "2026-09-20T05:18:20.333Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwXZzRvpjekifOElA_wxzn4i__CNXMDEMh9b6VEsSLw&s=10"
  },
  {
    "id": "TOYS001",
    "brand": "LEGO",
    "category": "Toys & Baby",
    "createdAt": "2026-09-19T13:55:06.392Z",
    "description": "484-piece LEGO Classic set with 33 different colors. Comes with ideas booklet to get building right away.",
    "discount": 43,
    "features": [
      "484 Pieces",
      "33 Colors",
      "Ideas Booklet",
      "Ages 4+",
      "Compatible with All LEGO Sets",
      "Creative Play"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewu45YR-Qe5rqKiNxS3QoRLs3XoKcz8n8HlJS9kwZ5Q&s=10"
    ],
    "name": "LEGO Classic Creative Bricks Box (484 Pieces)",
    "originalPrice": 3499,
    "price": 1999,
    "rating": 4.8,
    "reviewCount": 23450,
    "seller": "LEGO Official Store",
    "specifications": {
      "Pieces": "484",
      "Age": "4+",
      "Colors": "33",
      "Includes": "Bricks + Eyes + Wheels",
      "Theme": "Classic",
      "Material": "ABS Plastic"
    },
    "stock": 60,
    "subcategory": "Building Toys",
    "updatedAt": "2026-09-20T05:17:44.722Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewu45YR-Qe5rqKiNxS3QoRLs3XoKcz8n8HlJS9kwZ5Q&s=10"
  },
  {
    "id": "TOYS002",
    "brand": "Funskool",
    "category": "Toys & Baby",
    "createdAt": "2026-09-19T13:55:06.463Z",
    "description": "The classic Monopoly board game. Buy, sell, and trade your way to riches. For 2-6 players.",
    "discount": 50,
    "features": [
      "2-6 Players",
      "Ages 8+",
      "Classic Gameplay",
      "Money Included",
      "Property Trading",
      "Family Game Night"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa1N86YdfHvLJj1Ie62UB1f-3IbUlWMHqD9qHXIVk4Vg&s=10"
    ],
    "name": "Funskool Monopoly Board Game — Classic Edition",
    "originalPrice": 1199,
    "price": 599,
    "rating": 4.5,
    "reviewCount": 18920,
    "seller": "Funskool India",
    "specifications": {
      "Players": "2-6",
      "Age": "8+",
      "Time": "60-90 min",
      "Includes": "Board, Cards, Money, Tokens, Dice",
      "Type": "Strategy",
      "Language": "English"
    },
    "stock": 100,
    "subcategory": "Board Games",
    "updatedAt": "2026-09-20T05:17:21.291Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa1N86YdfHvLJj1Ie62UB1f-3IbUlWMHqD9qHXIVk4Vg&s=10"
  },
  {
    "id": "TOYS003",
    "brand": "LuvLap",
    "category": "Toys & Baby",
    "createdAt": "2026-09-19T13:55:06.567Z",
    "description": "Lightweight and comfortable baby stroller with 5-point safety harness. Compact fold for easy storage and travel.",
    "discount": 50,
    "features": [
      "Lightweight",
      "5-Point Harness",
      "Compact Fold",
      "Adjustable Canopy",
      "Storage Basket",
      "Rear Wheel Brakes"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS03tK_e7UBrMPWUlFcCja6fy9jlW7vwyCEE07MGpe7Q&s=10"
    ],
    "name": "LuvLap Comfy Baby Stroller — Grey",
    "originalPrice": 7999,
    "price": 3999,
    "rating": 4.2,
    "reviewCount": 12340,
    "seller": "LuvLap India",
    "specifications": {
      "Weight Limit": "15 kg",
      "Age": "0-3 years",
      "Weight": "7.5 kg",
      "Fold": "Compact",
      "Wheels": "8",
      "Safety": "5-Point Harness"
    },
    "stock": 30,
    "subcategory": "Baby Products",
    "updatedAt": "2026-09-20T05:16:45.434Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS03tK_e7UBrMPWUlFcCja6fy9jlW7vwyCEE07MGpe7Q&s=10"
  },
  {
    "id": "GROC001",
    "brand": "Tata Tea",
    "category": "Grocery",
    "createdAt": "2026-09-19T13:55:06.648Z",
    "description": "Premium blend of 15% long leaf tea for a richer, tastier cup. Sourced from the finest tea gardens.",
    "discount": 26,
    "features": [
      "1kg Pack",
      "15% Long Leaf",
      "Premium Blend",
      "Rich Taste",
      "Fresh Aroma",
      "Sourced from Best Gardens"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSFuL8jJfUU_gfDexElmOlO5BkEUNfIaD9eRrD0F_Ew&s=10"
    ],
    "name": "Tata Gold Tea — 1kg Premium Blend",
    "originalPrice": 540,
    "price": 399,
    "rating": 4.4,
    "reviewCount": 78900,
    "seller": "KartHub Grocery",
    "specifications": {
      "Weight": "1 kg",
      "Type": "Black Tea",
      "Blend": "Premium with Long Leaf",
      "Origin": "India",
      "Pack": "Pouch",
      "Shelf Life": "18 months"
    },
    "stock": 500,
    "subcategory": "Beverages",
    "updatedAt": "2026-09-20T05:16:19.532Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSFuL8jJfUU_gfDexElmOlO5BkEUNfIaD9eRrD0F_Ew&s=10"
  },
  {
    "id": "GROC002",
    "brand": "Saffola",
    "category": "Grocery",
    "createdAt": "2026-09-19T13:55:06.707Z",
    "description": "Saffola Total blended cooking oil with Oryzanol. Helps manage cholesterol when used as part of a healthy diet.",
    "discount": 28,
    "features": [
      "5L Jar",
      "Rice Bran + Safflower",
      "Rich in Oryzanol",
      "LOSORB Technology",
      "Heart Healthy",
      "Multi-Use"
    ],
    "images": [
      "data:image/jpeg;base64,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"
    ],
    "name": "Saffola Total Pro Heart Conscious Edible Oil — 5L",
    "originalPrice": 1250,
    "price": 899,
    "rating": 4.3,
    "reviewCount": 45670,
    "seller": "KartHub Grocery",
    "specifications": {
      "Volume": "5 Litres",
      "Type": "Blended Oil",
      "Ingredients": "Rice Bran + Safflower",
      "Feature": "LOSORB",
      "Pack": "Jar",
      "Shelf Life": "12 months"
    },
    "stock": 200,
    "subcategory": "Cooking Essentials",
    "updatedAt": "2026-09-20T05:15:59.426Z",
    "image": "data:image/jpeg;base64,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"
  },
  {
    "id": "GROC003",
    "brand": "Cadbury",
    "category": "Grocery",
    "createdAt": "2026-09-19T13:55:06.808Z",
    "description": "Pack of 8 Dairy Milk Silk chocolate bars. Silkier, smoother, and creamier than ever. Perfect for gifting.",
    "discount": 32,
    "features": [
      "Pack of 8",
      "60g Each",
      "Silk Smooth",
      "Premium Cocoa",
      "Gift Pack",
      "Vegetarian"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIeZciWtBez5Sve4OW7U4J96vdqv1pwgRE5GG37MJ6HA&s=10"
    ],
    "name": "Cadbury Dairy Milk Silk Chocolate — Pack of 8 (60g each)",
    "originalPrice": 880,
    "price": 599,
    "rating": 4.6,
    "reviewCount": 56780,
    "seller": "KartHub Grocery",
    "specifications": {
      "Weight": "60g x 8",
      "Type": "Milk Chocolate",
      "Diet": "Vegetarian",
      "Pack": "Gift Box",
      "Storage": "Cool & Dry",
      "Shelf Life": "9 months"
    },
    "stock": 300,
    "subcategory": "Snacks",
    "updatedAt": "2026-09-20T05:15:07.242Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIeZciWtBez5Sve4OW7U4J96vdqv1pwgRE5GG37MJ6HA&s=10"
  },
  {
    "id": "GROC004",
    "brand": "Organic Tattva",
    "category": "Grocery",
    "createdAt": "2026-09-19T13:55:06.891Z",
    "description": "100% organic brown basmati rice. Unpolished and nutrient-rich with a nutty flavour and fluffy texture.",
    "discount": 33,
    "features": [
      "5kg Pack",
      "100% Organic",
      "Unpolished",
      "High Fiber",
      "Non-GMO",
      "USDA Certified"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhccano6cjuE6cDSl0Tle2CCTQozhE6sQJAq36cgzX3g&s=10"
    ],
    "name": "Organic Tattva Brown Basmati Rice — 5kg",
    "originalPrice": 899,
    "price": 599,
    "rating": 4.3,
    "reviewCount": 12340,
    "seller": "Organic Tattva",
    "specifications": {
      "Weight": "5 kg",
      "Type": "Brown Basmati",
      "Certification": "USDA Organic",
      "Origin": "India",
      "GMO": "Non-GMO",
      "Shelf Life": "12 months"
    },
    "stock": 100,
    "subcategory": "Staples",
    "updatedAt": "2026-09-20T05:14:47.554Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhccano6cjuE6cDSl0Tle2CCTQozhE6sQJAq36cgzX3g&s=10"
  },
  {
    "id": "TOOL001",
    "brand": "Bosch",
    "category": "Tools",
    "createdAt": "2026-09-19T13:55:06.992Z",
    "description": "Versatile 500W impact drill kit with 100 accessories. Drills through concrete, metal, and wood with ease.",
    "discount": 44,
    "features": [
      "500W Motor",
      "100 Accessories",
      "Forward/Reverse",
      "2800 RPM",
      "Variable Speed",
      "Carrying Case"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO42w53axTeBFib5AoRFJ-iZ48J_HK6c347W_IrqcBcA&s=10"
    ],
    "name": "Bosch GSB 500W Impact Drill Kit (100 Accessories)",
    "originalPrice": 4799,
    "price": 2699,
    "rating": 4.4,
    "reviewCount": 18920,
    "seller": "Bosch Professional",
    "specifications": {
      "Power": "500W",
      "Speed": "0-2800 RPM",
      "Chuck": "13mm Keyed",
      "Impact Rate": "41600 bpm",
      "Cable": "2m",
      "Weight": "1.5 kg"
    },
    "stock": 40,
    "subcategory": "Power Tools",
    "updatedAt": "2026-09-20T05:14:18.696Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO42w53axTeBFib5AoRFJ-iZ48J_HK6c347W_IrqcBcA&s=10"
  },
  {
    "id": "TOOL002",
    "brand": "Stanley",
    "category": "Tools",
    "createdAt": "2026-09-19T13:55:07.083Z",
    "description": "65-piece toolkit with all essential hand tools for home repairs, maintenance, and DIY projects.",
    "discount": 50,
    "features": [
      "65 Pieces",
      "Chrome Vanadium Steel",
      "Blow Mould Case",
      "Ratchet Set",
      "Screwdriver Set",
      "Pliers & Wrenches"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3FffnQbqnLzwvfNE0r5HapfLbp4YhiB5Q68U7eeKIw&s"
    ],
    "name": "Stanley 65-Piece Ultimate Tool Kit",
    "originalPrice": 5999,
    "price": 2999,
    "rating": 4.5,
    "reviewCount": 8970,
    "seller": "Stanley Tools India",
    "specifications": {
      "Pieces": "65",
      "Material": "CrV Steel",
      "Case": "Blow Mould",
      "Includes": "Ratchet, Sockets, Screwdrivers, Pliers",
      "Warranty": "1 Year",
      "Use": "Home & Auto"
    },
    "stock": 55,
    "subcategory": "Hand Tools",
    "updatedAt": "2026-09-20T05:13:55.311Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3FffnQbqnLzwvfNE0r5HapfLbp4YhiB5Q68U7eeKIw&s"
  },
  {
    "id": "TOOL003",
    "brand": "Havells",
    "category": "Tools",
    "createdAt": "2026-09-19T13:55:07.187Z",
    "description": "Premium decorative ceiling fan with dust-resistant finish. High air delivery with energy-efficient motor.",
    "discount": 40,
    "features": [
      "1200mm Sweep",
      "Dust Resistant",
      "High Air Delivery",
      "Double Ball Bearing",
      "Decorative Finish",
      "2 Year Warranty"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueBMENLJK9Ka-1hVAlS78Urc0foL0wjdzMZ9HEzeaKw&s"
    ],
    "name": "Havells 1200mm Ambrose Decorative Ceiling Fan — Gold Mist",
    "originalPrice": 5490,
    "price": 3299,
    "rating": 4.3,
    "reviewCount": 14560,
    "seller": "Havells India",
    "specifications": {
      "Sweep": "1200mm",
      "Speed": "380 RPM",
      "Air Delivery": "230 CMM",
      "Power": "75W",
      "Bearing": "Double Ball",
      "Finish": "Gold Mist"
    },
    "stock": 70,
    "subcategory": "Electrical",
    "updatedAt": "2026-09-20T05:13:27.045Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueBMENLJK9Ka-1hVAlS78Urc0foL0wjdzMZ9HEzeaKw&s"
  },
  {
    "id": "HOME010",
    "brand": "Samsung",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T16:38:56.109Z",
    "description": "Samsung 236 Litres Double Door Refrigerator with Digital Inverter Technology, All-Around Cooling, and Toughened Glass Shelves.",
    "discount": 31,
    "features": [
      "236L Capacity",
      "Frost Free Double Door",
      "Digital Inverter Compressor",
      "All-Around Cooling",
      "Movable Ice Maker",
      "20 Year Compressor Warranty"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFxFehhvRw5jBNBjLR2asD_2RSgAaz6nXfmZh6wxYFA&s=10"
    ],
    "name": "Samsung 236L 3 Star Digital Inverter Frost Free Double Door Refrigerator (Silver Elegance)",
    "originalPrice": 35990,
    "price": 24990,
    "rating": 4.6,
    "reviewCount": 9830,
    "seller": "Samsung Authorized Retailer",
    "specifications": {
      "Capacity": "236 Litres",
      "Energy Rating": "3 Star",
      "Defrost System": "Frost Free",
      "Compressor": "Digital Inverter",
      "Shelves": "Toughened Glass",
      "Color": "Silver Elegance"
    },
    "stock": 25,
    "subcategory": "Refrigerators",
    "updatedAt": "2026-09-19T18:08:09.798Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFxFehhvRw5jBNBjLR2asD_2RSgAaz6nXfmZh6wxYFA&s=10"
  },
  {
    "id": "HOME011",
    "brand": "LG",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T16:38:56.201Z",
    "description": "LG 7 Kg 5 Star Front Loading Washing Machine with AI Direct Drive 6 Motion technology, Steam Hygiene Wash, and Inverter Direct Drive motor.",
    "discount": 33,
    "features": [
      "7 Kg Capacity",
      "5 Star Energy Rating",
      "AI Direct Drive",
      "6 Motion DD Tech",
      "Steam Wash (Allergy Care)",
      "1200 RPM Spin Speed"
    ],
    "images": [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhMWFRUXFRgVFhUWFxUVFhcXFhYWFhYXGBUYHiggGBolGxUXITEhJSkrLi4uFx8zODUtNygtLisBCgoKDg0NFxAQFSsdHR0rKy0rLSsrLS0rKy0tKystKystLS0tNy0tNy0rLSstNzctLS0tKys4Ky4tNzcyNzcrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABgQFAQIDBwj/xABNEAABAgMEBAgJCgQFAwUAAAABAAIDBBEFEiExQVFhcQYTIjJSgZGhM0JTkpOiscHRBxQjYnKy0tPh8BVDgsIWF2Nz8aOzwyQ0RFTi/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EAB4RAQEBAQACAwEBAAAAAAAAAAABEQIhMQMSQVEE/9oADAMBAAIRAxEAPwD3FCEIBCEIBCEIBCEIBCFR8Iba4ocXDxikbwzaduoILxC8+h2lO6Y7j/TD7OapDLTm/KnzWfhVwPKEli05ryvqs/Ctxas15T1WfBMDihJ38WmvKeqz4I/i010x5rPgmBxQk7+LTXTHmt+CP4vNdIea34JgcUJO/i810h5rfgsG15vpjzW/BMDkhJn8Xm+mPNb8FqbYm+mPNZ8FMDqhJBtec8oPMZ8Fzdas75b1If4UwPaEgm053yx82H+FaPtOdp4dw23Yf4VcHoKErcHbefXiph1XHmxCAK/VNMNxTSoBCEIBCEIBCEIBCEIBCEIItpRi2GSM6tHa4A9dClpzoZNSw113imG2m1guGOJaMM+e3JJVuzcOVh8Y8xXCoADS0kk1oOVQDLSQrEqzvQ+ge1ZESH0T2hU8takB4ZSJEF+7QG6CLzYbhUEYeFYN52FWfEjpu9X8K1iOvGQ+i7tCDFh6nequXEjpO9X8K4x4kNnOiObvugdt1MNSuNh6neqs8bD1O9VR4cNrhUPcQciLlPuri8gOcC91BdpzdIOpqKncczU71Vnjmaneqq+G9pOD3djfexdC0aXu9T8KYibxzNTvVWeNh6neqoTWA5RHdXF/gWRC+u//AKf4EwTOMh6neqsF8PU71VFMH/Uif9P8CV7Q4b2fBiPgxJmMHscWuHF1oRmKiFQqBx42F0XdrfgtDHhdF3a34JHd8oVmf/Zjei1Z/wApcYnyhWbomIp3wyP/ABJ4PJ7+cwug7tHwW7YsI+I7zv0XnjvlDs/y0XzT+Uu9ncPJKLFZCZFjXnuDG8mmLiAM4esp4HobGQT/ACz536K7smJUEY0BAbU1IFBhXTjVK8CBX+ZE7W/hTHYUK61wvOdUg1cQTlSmAywSrFohCFlQhCEAhCEAhCEAhCEEG2fBO3s++1LMxDa4XXAOGogEdhTLbZ+hdvb99qWHOWolYuDUOwaMlzjzjGEBzgKgkVoMs81SWtGpGP07ofIADbwa0urXM4VpXuWYYJ/+SfSwitIuDaELS9owriQNenqK2E6zEXsRWo04GhNNVVVthP0R3edCP9qGwXXgXxnXPGJ4mgbmaktyy7EFtCmA4BwOBFR14qFNOqXja3Npfo1BEmaQ28q9nV3JFTedoaAO5c3NJL6CuLfGczR0mglBs5xa2pu0ArQMcMscCTvUaWvueQTS6AXOzxdiGsBwujt9/fizQg4Vr47357xhuVd85fDc43L4NLzRQOaQKXmg84H4akHSfm3QYjKm8x7rl6gDmOJo3LMEmlDXXhShs3uBbU6ui80Jw8XPFLkRkWYiMBYYcFrg8l9L7nNNQA0ZYhMZY6lAK/1uZ2EAqAl3YHeMmvbjSvje5eG8J5tjJ+ZJx+nfUEGlDgcjq07V7rChkA16uW5/tGC8PtxjHTs7WAYpbFiPcb9y6xpx045b1OiK59ugsc01q4PBdyhjEJNaDDCvcNyqIr2k84ZAYMplTbngsslTEeGwmkl1S1uFaCtR1XT2LWXgm82oryw0tJAqa5Y9izJI0xCuAgkk00Xf1TFwcnGPnJUUaCI8Mi7DYw88YVaAqm1obTGdSHxTQAbmFQMBowxJCuLDawTkn9GGF0WE9pBJvNc7CvLNNOiuSo99kH4Dcmmxead/xSjZsQOaC2oGWIIy3ptsXmnerUiyQhCyoQhCAQhCAQhCAQhCCs4RxLsu9xBNLhw+21JrrRbqPd8U+zzQWEEVBoCDiCKjQlEycMeI3zW/Ba5Sq2LHhvF17WuFa0c0FcRJS/kIXmq2iyLOg3sChRZVo0U7VpEcSMv5CF5v6rIs+Xz4iF5p+K2MMfslalu0qKkbgANAGAGn3rnAdyn7wPVB94XMV1+xc+KNDyiMSSajTjmglvIAqSANZIA7SocaYgHN7HbuVTsrRRvoga4OOsVefO/Vb8cD4r+78SaJMCZgDJ7Bv5PtVhCitIqHAjWCD7FTiLsf2j8S0LYZNTgddC0+d+qgvi9utRYktAJJLIZJxJLGknroobGuAwcSNFaHv0rBDtaCQ6VgdBnmD4Lk6Sg15jewLlR2tQ49ota66XGurk130rWm1BO+awug3zQujIUIeKPNCr5ebY9rn3jdaLxOBwxxF0mpwOGarYVqxooc6XgOe1rXVFyK9zXh1LkQtLQ11KmgvEYa1jruc+3b4v8AP38kt59Q2S0xDYKABo1AAJs4NTAex5bXB93HXdaf7gvNrOm2Rq0zbnS8WuGlzHOAJAPJIzB15r0fgkwCBh0v7WqzrZsY74646+vUyrpCEIyEIQgEIVXbdtMlxjynnmsGZ2nUEFhHjtYLz3BoGk4KinuEzWiraBuh8SoB+ywcpyT7Vtt7nVeb79DfEZsppP7NVTPiue6riXOPWd36LU5Q0TnDB/i3nbSRDb5rcfWUH/E8ycn3d1T94lQmWOXN5Z4tuBzocDXRuXYy0uM4rj9kfoVcE6HwnmaULg4aiPhRdoVtNdg8XTrGI+I71ViDAPNikH6ww7cFpMSrmiuBb0m4j9FYGmXjA4VqDkVEn20VBKTzoZwy0j96VezEwIkMOBQQb6LyiQ4iiR5gxDcYaN8Z2vYNnt3Z5olRp/G7DF45E+KPj/zitRLF2MQl2w5DcMlHmJqFLsq7cAMydQCWZ62o0bAchmoGmG1wxduFBvVkDTM2hAhGjntB6I5TvNGPcoEThNBGTYjtzQPvEJfgWVFdzITiM6nkN3qDaEUw+S1zHO03RVrd7tJ2BNhlNjOE8I5tiDqafuklTJa14EQgNiCpya6rHea6hXmwtKNXFrD/AEn4rvDtIHB8Mj7PKHm/or4R6cIdMWmh2e8aetbsmNDxTbo69X7ySPIWrEhEhjqhpLXNJvNqDQimcMilMKjYmuzLShzAoMHDNhzG0axtCmKtaJZtx0URHBt7i8C4tZfc3WWi66pxaKXXUBJoruHELDddzTkdX71e/Pu+XYTUip11Pu6lBT2bZ8aagvhcY6G9zWlsRzaPLWRS5t5tBccQ3OgIzujmqu+b2hBLoURkwKFxDoZlY4iXrzzcdEY1znE3jdoXADcniwoQEUUFOSe5Ziy0R1X8c+l7Ct0lprSraAU66rh8tm+ZrU76nOT0XbCsCbbWamXGGS11YBe2ISYjmuLiWta2Gagmja1riRTH0zgv4Ab/AO1qoXQ3CXfee52IoXEE5jSAFf8ABjwA3+4LfF3k66vV2rZCELSBCFpGihoLnGgAqepBAty1Wy8O9m44MbrPwGleY2laDi9znOvRHc53R2DUadis+E9qFzy85nBg6I0fHeUsQ2lx2lakxHSXguc6jc9J0BWcJwhm5DF+IcK0rjqA9yxChOwhQsXHM/v9hOHB6x2y4Ds4ml2rWAraqDI8D40TlTES79VtC4dZ5I3AHerGJwOlAMb5O2I/2A0HYr0zJJ2ahmetdI7mN0Y6visjz60uCcFteLixIZ0EucQN9+80DqS987jyrgIlCw5RG4w3faFTTfXfdqAfT5l4d4jeouB7QQku17LDi64cDzmOxa7fhWu3EqxFdMXXC+zAeM3onZsW1nzZaS05O7iqmRc6FEdAfWlKtrmWZFtdN2oodRGors40NFobx5irrgOZxOoal3mJlkCGXuyAy0k6ANpKoJSMRFLL1CHYCmYzBqc1A4Vz5iRRDB5LMT9oj3NPrLEuiJaNplxMWKak4NaPujZrOnPUFGlZ6MHXw8tOigGG6oKYrV4DPcWmViQ5kBjamHFhOo6gvBrQ6tK1psAUGNwcm4Y+klozdphvp2gUWr5InS0N8yw348V7ui55LPNGC7WTwIjzL7sO6AOe9xIDNWWJroA1Kmk4pY7DAjQvSPk74Tw2F8KO4MvEOa84NqBQtcdGihyzWFKvCL5O5iVhmNeZFYKXiwODm1wqWnMbQdKh8EbNrHY97eS0l+OkwmmKRuIhkda9X4XcJ5aHLvY17Ir3tLAxpDucKEuIwAAKRODk5xszDhmgD2xWDY58GIxve6nWrKEuJIOvlzTRxxJ16TVW9rWXGlHQ3E0LmCKxzdueGw5jIhT48pQ4po+UOWESVko4BJAuCmZL2Cg7WrWsq6x59szCxFHDBw26xsOY/wCVLkohxhuzGW0fvHqOxJNiznEx2u8V1Gu1FrjgeokHYHFOs4KFsQaD7fdWiVVvZUQNiAk0FDidy7z72ks4pzW8sGJW7ym5kY1929Vu0ZHEbjiFhY64luqvJyahmE5rSK6BXaFdcF/ADf7gkpOvBjwA3+4JOfrBboQhAKk4RTNG3a4AXnf2jtx7FdEpC4dT12EB40Q1P2dHdh1K8hNn5vjIhdorhuXSUwx0qA0q+4NyvGRWg5DlFVDPwcszi233c53cFetC2lIFcV3MvqUVrAeAalc4jqmpW1FqQoI8UJem+cd6Y4oy3pcnOcVqJVLbkuCGkAXqm6frUrSuioqEozNoxHRIfFQXPYcXuvtYBi5paWnNwplrTlbj6Qi7S17D2uDT3OKVwGtimn82riNAc2gNN4xPUlHd1qupxILwwC85rgwNrXk3S2pzqTU6AlSxJVsxGcIj3Ma684ua0PcAauwaSK4XRnlVME0yrjToD7xS1YDy0V0hoOGYutabzdRF29uBGlSfq03/AODGvAErMQIpwIDiYLzUVFGvwOGOBUSZs6clBSJx8E6w54adzmmirnzdSQabQNAPKFXHBgNatJqQcDUYqcy25i6YfHPuHAsdi3eWnmdQpgghm0YrsHvL/wDcAiHtcCR1LrKRG6cPZ+i6Nkb2QAJFcMyOTUhukcoYioxXOJALed1HQUHaeoQVXQJl7Htew0cxwe07Wmo7wpVfFccNB1fooczAcw7kDrwjjse2FNswhx2lxHQijwjO3EKfAnGzNkRGBwvS8RpqRWjXO51Ngc7zUv8ABeII0KPZ7/HHHwCfFiNFewjA7Kqv4EWk2HMRpaLyWTMJ8A18WJiYdeuo3uVRXzzakjLIUwNGuHJbUamloO0J1lZoRJeHWtXwwcjSt0Vx0JLmo168cbwc0OqBnfvGpHOJJdjhoW8tZtou4t0KO1sEtaQy+QaA44XTX9Vb6HoMs6rGnZ76juIXRcZFpEMV1/8AjhrsoBOvBfwA3+4JKTrwX8AN59gSqt0IQsjhOnkHbyfOIHvXlXD2bvTJboYAOvSvUbQdg37X9rl4tbbnRZiLdPKLyAc8jT3LU9CIDiBrTVwBtBj40zBA5cMQzXpB4qew07UsGXcDV1BSopeYXYEitGk0BpUbwtvk3jEWs46Igig7muDh/wBtSo9zgQ6ABdC1coLwcit4rsDuRUOlalcyF10da0coI0wMEu2iOWd5TFHyS/aI5R3rUSqS2x9C7e37wSPaU01saAS4C68h2wRIbwK6heYOxOtuPFwN0k17MUqPgVisdTK+4naAGtx/rd2K1InXBVhuEuJoXCJDc1sOleUxpObqcrelONB4uPEhuwF402Y3mnqBb2Jws2GA9zroq7Cusc3Mbj3qt4ZWceTMN8WjX7tDu0kH7Q1LPPtqqCdgxITg2J41XMc08h4OF5rqUGZvZU5pDSsQZgVFBTVSo0+cO/JS5edF3i30MJ+QdzQ6lKa2HU4UOg4Z10xLhrqVLdhxHaParUlMMjPUGyoJyoSDeqagsJ+jAqQKVJqpseba5tCB1A44knEOdjiKbjoSzLsiZgE7W8o93KGenUuj5k5Oz24HV4za5hRUyZywxGo5j4hayk3W612IrQY0P2TsxUBs1jmO7fq3qDaMYhwpgSAfgVBfWqwiHx0N/wBLBe0cnA3XAlpFcTdcC0/aGhVdqWhBmKxrpbEJF5gp4TCpbmSHHRrB0lRp6bdFDXOIvtLWH61G0bgM3cmmAxJ2rez7P4t2JrFOjRCbpc76+oaFqRLVhAa64Aauc55NK104NbsDqAfqvT4VjNZBaGua50Nl3EUIIaKgOyqk7gjJtizLScGQ6Fo1uaCWCuinOJ2NBzXoUZpAbDIbedRxcAAaazsJANK5NKtqyeEMsuta3U33kD1Q1ahbRHVJIyyG4YDuotUGU68F/ADefckoJ14MeAG8rNFshCFBW20+gZvPsXhlpuN9/wBt33ivbuE2EJrtTxXrDh7SF4bbDTxr2jpHvNVfxEuynwTDcYxe2KCQwNoWu6JIOVKCu9dvk1gk2kXDKGyK49Zu/wByp4EMNOA/ZrX2p3+TSXa10d/jPu9Qq4u7yO5QekQ5g6luY1RkokN67ByarZy5uKyXLg96DSYdgqO0hyjvKtozkr8Kpwtqxh5bq49FtaF3w2q8pS7ak1fe4jIclvUce/2LnHgXSyGOcAA7eamnVVdYMIMAecm8wazr6l1suAXF0V20A6ycz+9apIkwIN4YDlCmXjUw8+gA+sABmAu11r2kEAgih0gg+5bQGLpGhk8puLtLeltH1tY8bfzg8+tuxXS5JoXQXdd2ug/H351nGFooW8bD0Dx2bjmvT2Pa9pBAINQQR1EEHsol60eCWbpc0PQJw6j7j2q6FaVgwYng4waejEq0jZeGHcrH5jNU5MS+NjwQoM/Zhafp4JaekMB5wz6lF+YjxYrxvFUyJ5WjpKc01A2uaB3laRuJYDxxgl55z6viRaAUAbjcbTXpyywVb8xPjR3Hc39V1lbMYXciG+K7bV3qj4K/WG1iWeDUSzLjdMZ+LqHo6sNSsLIs3jHiDC04viOqR9p51Z0GndUq3kODMV9DGPFt6AoXdgwG813Jpk5SHCbdhtoO8nSScydqb/CRZ2NKwpeC1rQ+jcfFJe9xGF5lQ+tMuylFo5xAJNLz9WQbs2UwGyp8ZcYTBznach0v/wA6z42QwqTlziSScSVlpgLICAsoBOvBnwDd5SUnTgx4AbypRbIQhQQ7Yl+MgvYMy2o3jEd4Xh3CGFSMXaHCvZh8F76vKPlEscw3lzRyTV7evnN6ifYgRnFXvBW1OJignI4H3/vYqAraE+iD2qDMAgOaagjtCkMjheaWDwjfBwIvs1aR8f3mmmX4QS8Tmvuu0tOfWw4juTAyF65PcqaNaLWipiMaNZcQO8YKtnOE7GjkO4w/VFGbDxhwI+yHHHJMDBHdTUlC1piGHlzjec41ppOrDQAqq0OEUaJyb1NjeSOvX+8lWQgSdLnE7yTqViLAF8aIGjM4AaGjSUxiCGNDG5AU/XetbIs3im1dz3c7Z9UKS9qquDGLJC63VgtQR48sH8qpa/pjM6rw8fuO0LkDFZzm3x0odXdrec3sptU2iyEESHNseDiHDI5EbQdC5mz5Y/yYR/ob8FNjQ2vxe1rzrc1rndTiKjqK4mQhdEjdEj+y/RBHbZssP5MLzG/Bd2cWwG6GtGmgDR10WfmEPou9LG9zwujJeGDUQ2AjIkXnD+p1Xd6I4sjF/g2lw6WTPPOB6qnYu0OFTF1HHVTkDqOLzvoNi6ucTma71qgCSTUmp1lFEBZKKwsoQgE58FvAD7R9yTE5cFfAD7R9ylFwhCFAKvtyymzEIw3YHNrui7QdysEIPn23bLfLxSx7buPV1axqUABe/W5YcGaZcit3OGDm7j7sl5hbnyfzUEl0Eccz6uDwNrDn1VQKTXEZLt85qKOAO/Edi5x4bmG69pY7U4Fp7CsAhEdWRgOaxrdoAHsC1dGc40J2/srrKSz4huwmOedTGlx7k22H8nszEo6YpAbpFQ9/UBgOvsQKkpLOe4NY0uccgMT/AMbU52LYogi86hiHTobsbt2pzh2HAlZdzYLKVu3nHF7uU3N3uyVC4rUVyeuZC6OK0VGpC1IXQrQqDVCyhBhYWVhAIQhAIQiqAQsVQgFlYqsVQbJx4KeA/rd7kmJy4JH6D+s+wKUXSEIUAhCEAhCEGkWE1wo4AjUQD7VFFky9a8RCrr4tlfYpqEGsNgAoAANQFAtkIQQLdcRAiEAEht4AmgJaQaE0NMs6FefOm5jyUH08T8hehW5/7eL9gpDqrBGMzM+Sg+nifkLHziZ8lB9PE/IUqqwSqiKZiZ8lB9PE/IWpmJnyUH08T8hSkIInHzPkoPp4n5CwZiZ8jB9PE/IUwlYQQ+PmfIwfTxPyEfOJnyMH07/yFMQUEP5xM+Sg+nf+Sj5xM+Sg+mf+SpaEETj5nyUL0z/yUfOJjyUL0z/yVJe6lBpOWha1Oodp+CDhx8fyUP0z/wApHHx/JQ/Su/KWs7MRGgFsO/jQgOoQKE1xGOIA61mVjxHNq5gYceSXVOeBwFMc0G3Hx/Jw/Su/LR84jeTZ6U/lrYudqb5x/CstiV3jA+32EHrQafOIvk2+kP4E9cCnEy5qKHjHYA10N00CSbydOBB+gf8A7p+4xSqYUIQoBCEIBCEIBCEIBCEIK7hAf/TxPs+8JDqnjhQ+7KRndFl7sIPuXmBtpmoqwW15F5U5t2HqPcsfx+FqPcqi5qsVVQLfhnQe5bNtuGdB7kFqhQRabdXes/xFuooJqFD/AIi3Ue5am02aj3IJpKxVQv4o3Ue5AtNupBJeeU3r9y3UB9otvNwPjati2/ijdR7kEwrUqG61Waj3Li+2oeo9yCwJXKEcX/aH3GKtfb8MaD3LjCt+HV+Duds6DE0XlU7cBvAP/wB0/wDbhrzNtuQzoPcvR/k9jh8s9wy409zGKVTOhCFAIQhAIQhAIQhAIQhBFtOVEWDEhOAIexzSCSAagjMYjqXhkbgDbBDGNaA+8Q97jDEOhqQRiTQZZV3r31CBLZ8mchQXmxCaCp414qdOFVn/ACxs7oxfSv8AinNCBNHyZ2f0YvpXrdvycSA8WJ6Vyb0IFUcAJLVE9I5ZHAKT1RPSOTShAr/4Ck9UT0jlqeAElqiekcmpCBV/wBJaonpHLI4AyWqJ6RyaUIFU8AJLVE9I5Y/y+ktUT0jk1oQKL/k7kj5X0hXN3yayJ8t6T9E5IQJB+S2Q/wBb0n6LH+Vsh/rek6tWxPCEHz7wi4E2jBmorYEB7oFfoXNJiEimbjTMnRh71658nNnRYEhCZHh8XGN50RtSeUTQHHIloaaaEzIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQf//Z"
    ],
    "name": "LG 7 Kg 5 Star Fully-Automatic Front Load Washing Machine with AI Direct Drive",
    "originalPrice": 42990,
    "price": 28990,
    "rating": 4.6,
    "reviewCount": 8150,
    "seller": "LG Official Partner",
    "specifications": {
      "Capacity": "7.0 Kg",
      "Type": "Front Load Fully-Automatic",
      "Max Spin Speed": "1200 RPM",
      "Programs": "14 Wash Cycles",
      "Motor": "Direct Drive Inverter",
      "Warranty": "2 Years on Product, 10 Years on Motor"
    },
    "stock": 20,
    "subcategory": "Washing Machines",
    "updatedAt": "2026-09-20T05:12:28.361Z",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhMWFRUXFRgVFhUWFxUVFhcXFhYWFhYXGBUYHiggGBolGxUXITEhJSkrLi4uFx8zODUtNygtLisBCgoKDg0NFxAQFSsdHR0rKy0rLSsrLS0rKy0tKystKystLS0tNy0tNy0rLSstNzctLS0tKys4Ky4tNzcyNzcrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABgQFAQIDBwj/xABNEAABAgMEBAgJCgQFAwUAAAABAAIDBBEFEiExQVFhcQYTIjJSgZGhM0JTkpOiscHRBxQjYnKy0tPh8BVDgsIWF2Nz8aOzwyQ0RFTi/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EAB4RAQEBAQACAwEBAAAAAAAAAAABEQIhMQMSQVEE/9oADAMBAAIRAxEAPwD3FCEIBCEIBCEIBCEIBCFR8Iba4ocXDxikbwzaduoILxC8+h2lO6Y7j/TD7OapDLTm/KnzWfhVwPKEli05ryvqs/Ctxas15T1WfBMDihJ38WmvKeqz4I/i010x5rPgmBxQk7+LTXTHmt+CP4vNdIea34JgcUJO/i810h5rfgsG15vpjzW/BMDkhJn8Xm+mPNb8FqbYm+mPNZ8FMDqhJBtec8oPMZ8Fzdas75b1If4UwPaEgm053yx82H+FaPtOdp4dw23Yf4VcHoKErcHbefXiph1XHmxCAK/VNMNxTSoBCEIBCEIBCEIBCEIBCEIItpRi2GSM6tHa4A9dClpzoZNSw113imG2m1guGOJaMM+e3JJVuzcOVh8Y8xXCoADS0kk1oOVQDLSQrEqzvQ+ge1ZESH0T2hU8takB4ZSJEF+7QG6CLzYbhUEYeFYN52FWfEjpu9X8K1iOvGQ+i7tCDFh6nequXEjpO9X8K4x4kNnOiObvugdt1MNSuNh6neqs8bD1O9VR4cNrhUPcQciLlPuri8gOcC91BdpzdIOpqKncczU71Vnjmaneqq+G9pOD3djfexdC0aXu9T8KYibxzNTvVWeNh6neqoTWA5RHdXF/gWRC+u//AKf4EwTOMh6neqsF8PU71VFMH/Uif9P8CV7Q4b2fBiPgxJmMHscWuHF1oRmKiFQqBx42F0XdrfgtDHhdF3a34JHd8oVmf/Zjei1Z/wApcYnyhWbomIp3wyP/ABJ4PJ7+cwug7tHwW7YsI+I7zv0XnjvlDs/y0XzT+Uu9ncPJKLFZCZFjXnuDG8mmLiAM4esp4HobGQT/ACz536K7smJUEY0BAbU1IFBhXTjVK8CBX+ZE7W/hTHYUK61wvOdUg1cQTlSmAywSrFohCFlQhCEAhCEAhCEAhCEEG2fBO3s++1LMxDa4XXAOGogEdhTLbZ+hdvb99qWHOWolYuDUOwaMlzjzjGEBzgKgkVoMs81SWtGpGP07ofIADbwa0urXM4VpXuWYYJ/+SfSwitIuDaELS9owriQNenqK2E6zEXsRWo04GhNNVVVthP0R3edCP9qGwXXgXxnXPGJ4mgbmaktyy7EFtCmA4BwOBFR14qFNOqXja3Npfo1BEmaQ28q9nV3JFTedoaAO5c3NJL6CuLfGczR0mglBs5xa2pu0ArQMcMscCTvUaWvueQTS6AXOzxdiGsBwujt9/fizQg4Vr47357xhuVd85fDc43L4NLzRQOaQKXmg84H4akHSfm3QYjKm8x7rl6gDmOJo3LMEmlDXXhShs3uBbU6ui80Jw8XPFLkRkWYiMBYYcFrg8l9L7nNNQA0ZYhMZY6lAK/1uZ2EAqAl3YHeMmvbjSvje5eG8J5tjJ+ZJx+nfUEGlDgcjq07V7rChkA16uW5/tGC8PtxjHTs7WAYpbFiPcb9y6xpx045b1OiK59ugsc01q4PBdyhjEJNaDDCvcNyqIr2k84ZAYMplTbngsslTEeGwmkl1S1uFaCtR1XT2LWXgm82oryw0tJAqa5Y9izJI0xCuAgkk00Xf1TFwcnGPnJUUaCI8Mi7DYw88YVaAqm1obTGdSHxTQAbmFQMBowxJCuLDawTkn9GGF0WE9pBJvNc7CvLNNOiuSo99kH4Dcmmxead/xSjZsQOaC2oGWIIy3ptsXmnerUiyQhCyoQhCAQhCAQhCAQhCCs4RxLsu9xBNLhw+21JrrRbqPd8U+zzQWEEVBoCDiCKjQlEycMeI3zW/Ba5Sq2LHhvF17WuFa0c0FcRJS/kIXmq2iyLOg3sChRZVo0U7VpEcSMv5CF5v6rIs+Xz4iF5p+K2MMfslalu0qKkbgANAGAGn3rnAdyn7wPVB94XMV1+xc+KNDyiMSSajTjmglvIAqSANZIA7SocaYgHN7HbuVTsrRRvoga4OOsVefO/Vb8cD4r+78SaJMCZgDJ7Bv5PtVhCitIqHAjWCD7FTiLsf2j8S0LYZNTgddC0+d+qgvi9utRYktAJJLIZJxJLGknroobGuAwcSNFaHv0rBDtaCQ6VgdBnmD4Lk6Sg15jewLlR2tQ49ota66XGurk130rWm1BO+awug3zQujIUIeKPNCr5ebY9rn3jdaLxOBwxxF0mpwOGarYVqxooc6XgOe1rXVFyK9zXh1LkQtLQ11KmgvEYa1jruc+3b4v8AP38kt59Q2S0xDYKABo1AAJs4NTAex5bXB93HXdaf7gvNrOm2Rq0zbnS8WuGlzHOAJAPJIzB15r0fgkwCBh0v7WqzrZsY74646+vUyrpCEIyEIQgEIVXbdtMlxjynnmsGZ2nUEFhHjtYLz3BoGk4KinuEzWiraBuh8SoB+ywcpyT7Vtt7nVeb79DfEZsppP7NVTPiue6riXOPWd36LU5Q0TnDB/i3nbSRDb5rcfWUH/E8ycn3d1T94lQmWOXN5Z4tuBzocDXRuXYy0uM4rj9kfoVcE6HwnmaULg4aiPhRdoVtNdg8XTrGI+I71ViDAPNikH6ww7cFpMSrmiuBb0m4j9FYGmXjA4VqDkVEn20VBKTzoZwy0j96VezEwIkMOBQQb6LyiQ4iiR5gxDcYaN8Z2vYNnt3Z5olRp/G7DF45E+KPj/zitRLF2MQl2w5DcMlHmJqFLsq7cAMydQCWZ62o0bAchmoGmG1wxduFBvVkDTM2hAhGjntB6I5TvNGPcoEThNBGTYjtzQPvEJfgWVFdzITiM6nkN3qDaEUw+S1zHO03RVrd7tJ2BNhlNjOE8I5tiDqafuklTJa14EQgNiCpya6rHea6hXmwtKNXFrD/AEn4rvDtIHB8Mj7PKHm/or4R6cIdMWmh2e8aetbsmNDxTbo69X7ySPIWrEhEhjqhpLXNJvNqDQimcMilMKjYmuzLShzAoMHDNhzG0axtCmKtaJZtx0URHBt7i8C4tZfc3WWi66pxaKXXUBJoruHELDddzTkdX71e/Pu+XYTUip11Pu6lBT2bZ8aagvhcY6G9zWlsRzaPLWRS5t5tBccQ3OgIzujmqu+b2hBLoURkwKFxDoZlY4iXrzzcdEY1znE3jdoXADcniwoQEUUFOSe5Ziy0R1X8c+l7Ct0lprSraAU66rh8tm+ZrU76nOT0XbCsCbbWamXGGS11YBe2ISYjmuLiWta2Gagmja1riRTH0zgv4Ab/AO1qoXQ3CXfee52IoXEE5jSAFf8ABjwA3+4LfF3k66vV2rZCELSBCFpGihoLnGgAqepBAty1Wy8O9m44MbrPwGleY2laDi9znOvRHc53R2DUadis+E9qFzy85nBg6I0fHeUsQ2lx2lakxHSXguc6jc9J0BWcJwhm5DF+IcK0rjqA9yxChOwhQsXHM/v9hOHB6x2y4Ds4ml2rWAraqDI8D40TlTES79VtC4dZ5I3AHerGJwOlAMb5O2I/2A0HYr0zJJ2ahmetdI7mN0Y6visjz60uCcFteLixIZ0EucQN9+80DqS987jyrgIlCw5RG4w3faFTTfXfdqAfT5l4d4jeouB7QQku17LDi64cDzmOxa7fhWu3EqxFdMXXC+zAeM3onZsW1nzZaS05O7iqmRc6FEdAfWlKtrmWZFtdN2oodRGors40NFobx5irrgOZxOoal3mJlkCGXuyAy0k6ANpKoJSMRFLL1CHYCmYzBqc1A4Vz5iRRDB5LMT9oj3NPrLEuiJaNplxMWKak4NaPujZrOnPUFGlZ6MHXw8tOigGG6oKYrV4DPcWmViQ5kBjamHFhOo6gvBrQ6tK1psAUGNwcm4Y+klozdphvp2gUWr5InS0N8yw348V7ui55LPNGC7WTwIjzL7sO6AOe9xIDNWWJroA1Kmk4pY7DAjQvSPk74Tw2F8KO4MvEOa84NqBQtcdGihyzWFKvCL5O5iVhmNeZFYKXiwODm1wqWnMbQdKh8EbNrHY97eS0l+OkwmmKRuIhkda9X4XcJ5aHLvY17Ir3tLAxpDucKEuIwAAKRODk5xszDhmgD2xWDY58GIxve6nWrKEuJIOvlzTRxxJ16TVW9rWXGlHQ3E0LmCKxzdueGw5jIhT48pQ4po+UOWESVko4BJAuCmZL2Cg7WrWsq6x59szCxFHDBw26xsOY/wCVLkohxhuzGW0fvHqOxJNiznEx2u8V1Gu1FrjgeokHYHFOs4KFsQaD7fdWiVVvZUQNiAk0FDidy7z72ks4pzW8sGJW7ym5kY1929Vu0ZHEbjiFhY64luqvJyahmE5rSK6BXaFdcF/ADf7gkpOvBjwA3+4JOfrBboQhAKk4RTNG3a4AXnf2jtx7FdEpC4dT12EB40Q1P2dHdh1K8hNn5vjIhdorhuXSUwx0qA0q+4NyvGRWg5DlFVDPwcszi233c53cFetC2lIFcV3MvqUVrAeAalc4jqmpW1FqQoI8UJem+cd6Y4oy3pcnOcVqJVLbkuCGkAXqm6frUrSuioqEozNoxHRIfFQXPYcXuvtYBi5paWnNwplrTlbj6Qi7S17D2uDT3OKVwGtimn82riNAc2gNN4xPUlHd1qupxILwwC85rgwNrXk3S2pzqTU6AlSxJVsxGcIj3Ma684ua0PcAauwaSK4XRnlVME0yrjToD7xS1YDy0V0hoOGYutabzdRF29uBGlSfq03/AODGvAErMQIpwIDiYLzUVFGvwOGOBUSZs6clBSJx8E6w54adzmmirnzdSQabQNAPKFXHBgNatJqQcDUYqcy25i6YfHPuHAsdi3eWnmdQpgghm0YrsHvL/wDcAiHtcCR1LrKRG6cPZ+i6Nkb2QAJFcMyOTUhukcoYioxXOJALed1HQUHaeoQVXQJl7Htew0cxwe07Wmo7wpVfFccNB1fooczAcw7kDrwjjse2FNswhx2lxHQijwjO3EKfAnGzNkRGBwvS8RpqRWjXO51Ngc7zUv8ABeII0KPZ7/HHHwCfFiNFewjA7Kqv4EWk2HMRpaLyWTMJ8A18WJiYdeuo3uVRXzzakjLIUwNGuHJbUamloO0J1lZoRJeHWtXwwcjSt0Vx0JLmo168cbwc0OqBnfvGpHOJJdjhoW8tZtou4t0KO1sEtaQy+QaA44XTX9Vb6HoMs6rGnZ76juIXRcZFpEMV1/8AjhrsoBOvBfwA3+4JKTrwX8AN59gSqt0IQsjhOnkHbyfOIHvXlXD2bvTJboYAOvSvUbQdg37X9rl4tbbnRZiLdPKLyAc8jT3LU9CIDiBrTVwBtBj40zBA5cMQzXpB4qew07UsGXcDV1BSopeYXYEitGk0BpUbwtvk3jEWs46Igig7muDh/wBtSo9zgQ6ABdC1coLwcit4rsDuRUOlalcyF10da0coI0wMEu2iOWd5TFHyS/aI5R3rUSqS2x9C7e37wSPaU01saAS4C68h2wRIbwK6heYOxOtuPFwN0k17MUqPgVisdTK+4naAGtx/rd2K1InXBVhuEuJoXCJDc1sOleUxpObqcrelONB4uPEhuwF402Y3mnqBb2Jws2GA9zroq7Cusc3Mbj3qt4ZWceTMN8WjX7tDu0kH7Q1LPPtqqCdgxITg2J41XMc08h4OF5rqUGZvZU5pDSsQZgVFBTVSo0+cO/JS5edF3i30MJ+QdzQ6lKa2HU4UOg4Z10xLhrqVLdhxHaParUlMMjPUGyoJyoSDeqagsJ+jAqQKVJqpseba5tCB1A44knEOdjiKbjoSzLsiZgE7W8o93KGenUuj5k5Oz24HV4za5hRUyZywxGo5j4hayk3W612IrQY0P2TsxUBs1jmO7fq3qDaMYhwpgSAfgVBfWqwiHx0N/wBLBe0cnA3XAlpFcTdcC0/aGhVdqWhBmKxrpbEJF5gp4TCpbmSHHRrB0lRp6bdFDXOIvtLWH61G0bgM3cmmAxJ2rez7P4t2JrFOjRCbpc76+oaFqRLVhAa64Aauc55NK104NbsDqAfqvT4VjNZBaGua50Nl3EUIIaKgOyqk7gjJtizLScGQ6Fo1uaCWCuinOJ2NBzXoUZpAbDIbedRxcAAaazsJANK5NKtqyeEMsuta3U33kD1Q1ahbRHVJIyyG4YDuotUGU68F/ADefckoJ14MeAG8rNFshCFBW20+gZvPsXhlpuN9/wBt33ivbuE2EJrtTxXrDh7SF4bbDTxr2jpHvNVfxEuynwTDcYxe2KCQwNoWu6JIOVKCu9dvk1gk2kXDKGyK49Zu/wByp4EMNOA/ZrX2p3+TSXa10d/jPu9Qq4u7yO5QekQ5g6luY1RkokN67ByarZy5uKyXLg96DSYdgqO0hyjvKtozkr8Kpwtqxh5bq49FtaF3w2q8pS7ak1fe4jIclvUce/2LnHgXSyGOcAA7eamnVVdYMIMAecm8wazr6l1suAXF0V20A6ycz+9apIkwIN4YDlCmXjUw8+gA+sABmAu11r2kEAgih0gg+5bQGLpGhk8puLtLeltH1tY8bfzg8+tuxXS5JoXQXdd2ug/H351nGFooW8bD0Dx2bjmvT2Pa9pBAINQQR1EEHsol60eCWbpc0PQJw6j7j2q6FaVgwYng4waejEq0jZeGHcrH5jNU5MS+NjwQoM/Zhafp4JaekMB5wz6lF+YjxYrxvFUyJ5WjpKc01A2uaB3laRuJYDxxgl55z6viRaAUAbjcbTXpyywVb8xPjR3Hc39V1lbMYXciG+K7bV3qj4K/WG1iWeDUSzLjdMZ+LqHo6sNSsLIs3jHiDC04viOqR9p51Z0GndUq3kODMV9DGPFt6AoXdgwG813Jpk5SHCbdhtoO8nSScydqb/CRZ2NKwpeC1rQ+jcfFJe9xGF5lQ+tMuylFo5xAJNLz9WQbs2UwGyp8ZcYTBznach0v/wA6z42QwqTlziSScSVlpgLICAsoBOvBnwDd5SUnTgx4AbypRbIQhQQ7Yl+MgvYMy2o3jEd4Xh3CGFSMXaHCvZh8F76vKPlEscw3lzRyTV7evnN6ifYgRnFXvBW1OJignI4H3/vYqAraE+iD2qDMAgOaagjtCkMjheaWDwjfBwIvs1aR8f3mmmX4QS8Tmvuu0tOfWw4juTAyF65PcqaNaLWipiMaNZcQO8YKtnOE7GjkO4w/VFGbDxhwI+yHHHJMDBHdTUlC1piGHlzjec41ppOrDQAqq0OEUaJyb1NjeSOvX+8lWQgSdLnE7yTqViLAF8aIGjM4AaGjSUxiCGNDG5AU/XetbIs3im1dz3c7Z9UKS9qquDGLJC63VgtQR48sH8qpa/pjM6rw8fuO0LkDFZzm3x0odXdrec3sptU2iyEESHNseDiHDI5EbQdC5mz5Y/yYR/ob8FNjQ2vxe1rzrc1rndTiKjqK4mQhdEjdEj+y/RBHbZssP5MLzG/Bd2cWwG6GtGmgDR10WfmEPou9LG9zwujJeGDUQ2AjIkXnD+p1Xd6I4sjF/g2lw6WTPPOB6qnYu0OFTF1HHVTkDqOLzvoNi6ucTma71qgCSTUmp1lFEBZKKwsoQgE58FvAD7R9yTE5cFfAD7R9ylFwhCFAKvtyymzEIw3YHNrui7QdysEIPn23bLfLxSx7buPV1axqUABe/W5YcGaZcit3OGDm7j7sl5hbnyfzUEl0Eccz6uDwNrDn1VQKTXEZLt85qKOAO/Edi5x4bmG69pY7U4Fp7CsAhEdWRgOaxrdoAHsC1dGc40J2/srrKSz4huwmOedTGlx7k22H8nszEo6YpAbpFQ9/UBgOvsQKkpLOe4NY0uccgMT/AMbU52LYogi86hiHTobsbt2pzh2HAlZdzYLKVu3nHF7uU3N3uyVC4rUVyeuZC6OK0VGpC1IXQrQqDVCyhBhYWVhAIQhAIQiqAQsVQgFlYqsVQbJx4KeA/rd7kmJy4JH6D+s+wKUXSEIUAhCEAhCEGkWE1wo4AjUQD7VFFky9a8RCrr4tlfYpqEGsNgAoAANQFAtkIQQLdcRAiEAEht4AmgJaQaE0NMs6FefOm5jyUH08T8hehW5/7eL9gpDqrBGMzM+Sg+nifkLHziZ8lB9PE/IUqqwSqiKZiZ8lB9PE/IWpmJnyUH08T8hSkIInHzPkoPp4n5CwZiZ8jB9PE/IUwlYQQ+PmfIwfTxPyEfOJnyMH07/yFMQUEP5xM+Sg+nf+Sj5xM+Sg+mf+SpaEETj5nyUL0z/yUfOJjyUL0z/yVJe6lBpOWha1Oodp+CDhx8fyUP0z/wApHHx/JQ/Su/KWs7MRGgFsO/jQgOoQKE1xGOIA61mVjxHNq5gYceSXVOeBwFMc0G3Hx/Jw/Su/LR84jeTZ6U/lrYudqb5x/CstiV3jA+32EHrQafOIvk2+kP4E9cCnEy5qKHjHYA10N00CSbydOBB+gf8A7p+4xSqYUIQoBCEIBCEIBCEIBCEIK7hAf/TxPs+8JDqnjhQ+7KRndFl7sIPuXmBtpmoqwW15F5U5t2HqPcsfx+FqPcqi5qsVVQLfhnQe5bNtuGdB7kFqhQRabdXes/xFuooJqFD/AIi3Ue5am02aj3IJpKxVQv4o3Ue5AtNupBJeeU3r9y3UB9otvNwPjati2/ijdR7kEwrUqG61Waj3Li+2oeo9yCwJXKEcX/aH3GKtfb8MaD3LjCt+HV+Duds6DE0XlU7cBvAP/wB0/wDbhrzNtuQzoPcvR/k9jh8s9wy409zGKVTOhCFAIQhAIQhAIQhAIQhBFtOVEWDEhOAIexzSCSAagjMYjqXhkbgDbBDGNaA+8Q97jDEOhqQRiTQZZV3r31CBLZ8mchQXmxCaCp414qdOFVn/ACxs7oxfSv8AinNCBNHyZ2f0YvpXrdvycSA8WJ6Vyb0IFUcAJLVE9I5ZHAKT1RPSOTShAr/4Ck9UT0jlqeAElqiekcmpCBV/wBJaonpHLI4AyWqJ6RyaUIFU8AJLVE9I5Y/y+ktUT0jk1oQKL/k7kj5X0hXN3yayJ8t6T9E5IQJB+S2Q/wBb0n6LH+Vsh/rek6tWxPCEHz7wi4E2jBmorYEB7oFfoXNJiEimbjTMnRh71658nNnRYEhCZHh8XGN50RtSeUTQHHIloaaaEzIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQCEIQf//Z"
  },
  {
    "id": "HOME012",
    "brand": "LG",
    "category": "Home & Kitchen",
    "createdAt": "2026-09-19T16:38:56.259Z",
    "description": "LG 28 Litres Convection Microwave Oven with Charcoal Lighting Heater, 251 Auto Cook menus, and Stainless Steel cavity for healthier cooking.",
    "discount": 31,
    "features": [
      "28L Capacity",
      "Convection + Grill + Solo",
      "Charcoal Lighting Heater",
      "251 Auto Cook Menus",
      "Ghee Maker in 12 Mins",
      "Pasteurized Milk Program"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmJO44CFk7pVHfzDDGoeZYqHCm483jhPAJkfWbNRZsVQ&s"
    ],
    "name": "LG 28L Convection Microwave Oven with Charcoal Lighting Heater (Floral Black)",
    "originalPrice": 17490,
    "price": 11990,
    "rating": 4.4,
    "reviewCount": 6240,
    "seller": "LG Store India",
    "specifications": {
      "Capacity": "28 Litres",
      "Cavity": "Stainless Steel",
      "Control": "Tactile Buttons & Dial",
      "Wattage": "1950W",
      "Warranty": "1 Year on Product, 4 Years on Magnetron"
    },
    "stock": 30,
    "subcategory": "Kitchen Appliances",
    "updatedAt": "2026-09-19T17:28:39.487Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmJO44CFk7pVHfzDDGoeZYqHCm483jhPAJkfWbNRZsVQ&s"
  },
  {
    "id": "PROD1789882738958",
    "brand": "Samsung",
    "category": "Electronics",
    "createdAt": "2026-09-20T05:39:03.330Z",
    "description": "Quality product available on KartHub.",
    "discount": 38,
    "features": [
      "Genuine Brand",
      "Fast Delivery",
      "7 Days Replacement Policy"
    ],
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZoyAYr1b7XdCp46jcq1-2WwRvPYT5-lWG_psZHF_kw&s=10"
    ],
    "name": "Samsung Air Conditioner ",
    "originalPrice": 79999,
    "price": 49999,
    "rating": 4.5,
    "reviewCount": 10,
    "seller": "KartHub Authorized Retailer",
    "specifications": {
      "Brand": "Samsung",
      "Category": "Electronics"
    },
    "stock": 50,
    "subcategory": "General",
    "updatedAt": "2026-09-20T05:39:03.330Z",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZoyAYr1b7XdCp46jcq1-2WwRvPYT5-lWG_psZHF_kw&s=10"
  }
];

// In-memory runtime state synced with localStorage / MongoDB
export let products = (() => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('karthub_products') || localStorage.getItem('karthub_db_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
  }
  return [...baseProductsCatalog];
})();

const API_URL = '';

// Helper to add product
export async function addProduct(newProduct) {
  const id = newProduct.id || ('PROD' + Date.now());
  const img = (Array.isArray(newProduct.images) && newProduct.images[0]) || newProduct.image || '';
  const product = {
    id,
    ...newProduct,
    image: img,
    images: [img],
    rating: newProduct.rating || 4.5,
    reviewCount: newProduct.reviewCount || 1,
    stock: Number(newProduct.stock) || 50,
    price: Number(newProduct.price) || 0,
    originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) || 0,
    discount: Number(newProduct.discount) || 0,
  };

  products.unshift(product);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('karthub_products', JSON.stringify(products));
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
      body: JSON.stringify(product)
    });
  } catch (e) {
    console.warn('MongoDB add product notice:', e);
  }

  return product;
}

// Helper to update product
export async function updateProduct(id, updatedFields) {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    const current = products[index];
    const finalImage = updatedFields.image || (Array.isArray(updatedFields.images) && updatedFields.images[0]) || current.images?.[0] || current.image || '';
    
    products[index] = {
      ...current,
      ...updatedFields,
      image: finalImage,
      images: [finalImage],
      price: updatedFields.price !== undefined ? Number(updatedFields.price) : current.price,
      originalPrice: updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : current.originalPrice,
      stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : current.stock,
      discount: updatedFields.discount !== undefined ? Number(updatedFields.discount) : current.discount,
      updatedAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('karthub_products', JSON.stringify(products));
        localStorage.setItem('karthub_db_products', JSON.stringify(products));
      } catch {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('karthub:products-updated', { detail: products }));
    }

    // Save to MongoDB via API
    try {
      await fetch(`${API_URL}/api/products/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products[index])
      });
    } catch (e) {
      console.warn('MongoDB update product notice:', e);
    }

    return products[index];
  }
  return null;
}

// Helper to delete product
export async function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    const deleted = products.splice(index, 1)[0];

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('karthub_products', JSON.stringify(products));
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
