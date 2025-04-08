
import { Product, CartItem, User } from './types';

export const products: Product[] = [
  {
    id: "1",
    name: "Silver Leaf Pendant",
    description: "Elegant 925 silver pendant shaped like a delicate leaf. Perfect for everyday wear or special occasions.",
    price: 2499,
    images: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
    ],
    category: "Pendants",
    tags: ["silver", "pendant", "leaf", "nature"],
    featured: true,
    bestseller: true,
    inStock: true,
    stockQuantity: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Twisted Silver Bangle",
    description: "Handcrafted 925 silver bangle with a modern twisted design. Adjustable size for a perfect fit.",
    price: 3599,
    discountPrice: 3299,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
    ],
    category: "Bracelets",
    tags: ["silver", "bangle", "bracelet", "twisted"],
    featured: true,
    bestseller: false,
    inStock: true,
    stockQuantity: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Silver Pearl Drop Earrings",
    description: "Elegant 925 silver earrings with freshwater pearl drops. Perfect for adding a touch of sophistication.",
    price: 1999,
    images: [
      "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?q=80&w=1000",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1000",
    ],
    category: "Earrings",
    tags: ["silver", "earrings", "pearl", "drop"],
    featured: false,
    bestseller: true,
    inStock: true,
    stockQuantity: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Silver Chain Necklace",
    description: "Classic 925 silver chain necklace with a modern twist. Versatile and perfect for layering.",
    price: 2899,
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
    ],
    category: "Necklaces",
    tags: ["silver", "necklace", "chain"],
    featured: true,
    bestseller: true,
    inStock: true,
    stockQuantity: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Silver Wave Ring",
    description: "Delicate 925 silver ring with a wave-inspired design. Perfect for stacking or wearing alone.",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
    ],
    category: "Rings",
    tags: ["silver", "ring", "wave"],
    featured: false,
    bestseller: false,
    inStock: true,
    stockQuantity: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Silver Lotus Anklet",
    description: "Elegant 925 silver anklet featuring a lotus charm. Perfect for beach days and summer outfits.",
    price: 1999,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1574740635424-4c05485d6cba?q=80&w=1000",
    ],
    category: "Anklets",
    tags: ["silver", "anklet", "lotus"],
    featured: true,
    bestseller: false,
    inStock: true,
    stockQuantity: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const categories = [
  { id: "1", name: "Pendants" },
  { id: "2", name: "Bracelets" },
  { id: "3", name: "Earrings" },
  { id: "4", name: "Necklaces" },
  { id: "5", name: "Rings" },
  { id: "6", name: "Anklets" },
];

export const featuredCollections = [
  { id: "1", name: "Summer Collection", image: "/collections/summer.jpg" },
  { id: "2", name: "Festive Collection", image: "/collections/festive.jpg" },
  { id: "3", name: "Wedding Collection", image: "/collections/wedding.jpg" }
];

export const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1f1f1'/%3E%3Cpath d='M30,40 L70,40 L70,70 L30,70 Z' fill='none' stroke='%23cccccc' stroke-width='2'/%3E%3Cpath d='M40,50 L45,60 L55,45 L65,60 L35,60 Z' fill='none' stroke='%23cccccc' stroke-width='2'/%3E%3Ccircle cx='45' cy='45' r='5' fill='none' stroke='%23cccccc' stroke-width='2'/%3E%3C/svg%3E";

// Simulation of users database
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@aarna.com",
    phone: "9876543210",
    role: "admin",
  },
  {
    id: "2",
    name: "Test Customer",
    email: "customer@example.com",
    phone: "9876543211",
    role: "customer",
  }
];

// Mock shopping cart instance
export let cart: CartItem[] = [];
