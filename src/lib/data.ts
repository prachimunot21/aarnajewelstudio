
import { Product, CartItem, User } from './types';

export const products: Product[] = [
  {
    id: "1",
    name: "Silver Leaf Pendant",
    description: "Elegant 925 silver pendant shaped like a delicate leaf. Perfect for everyday wear or special occasions.",
    price: 2499,
    images: [
      "/products/leaf-pendant-1.jpg",
      "/products/leaf-pendant-2.jpg",
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
      "/products/bangle-1.jpg",
      "/products/bangle-2.jpg",
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
      "/products/earrings-1.jpg",
      "/products/earrings-2.jpg",
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
      "/products/necklace-1.jpg",
      "/products/necklace-2.jpg",
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
      "/products/ring-1.jpg",
      "/products/ring-2.jpg",
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
      "/products/anklet-1.jpg",
      "/products/anklet-2.jpg",
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
