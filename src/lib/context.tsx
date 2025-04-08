
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, User } from "./types";
import { products, users, cart as initialCart } from "./data";
import { toast } from "sonner";

interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("aarna-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Validate each item in the cart against our products
        const validatedCart = parsedCart.filter((item: CartItem) => {
          const product = products.find(p => p.id === item.product.id);
          return product && item.quantity > 0;
        });
        setCart(validatedCart);
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        setCart([]);
      }
    } else {
      setCart(initialCart);
    }
  }, []);

  // Update localStorage and calculate totals when cart changes
  useEffect(() => {
    localStorage.setItem("aarna-cart", JSON.stringify(cart));
    
    // Calculate totals
    const items = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalItems(items);
    
    const total = cart.reduce((sum, item) => 
      sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);
    setCartTotal(total);
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if product already in cart
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stockQuantity) {
          toast.error("Sorry, we don't have enough in stock");
          return prevCart;
        }
        
        const updatedCart = prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        );
        toast.success(`Updated ${product.name} quantity in your cart`);
        return updatedCart;
      } else {
        // Add new product to cart
        if (quantity > product.stockQuantity) {
          toast.error("Sorry, we don't have enough in stock");
          return prevCart;
        }
        
        toast.success(`Added ${product.name} to your cart`);
        return [...prevCart, { id: crypto.randomUUID(), product, quantity }];
      }
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === itemId);
      if (!item) return prevCart;
      
      if (quantity > item.product.stockQuantity) {
        toast.error("Sorry, we don't have enough in stock");
        return prevCart;
      }
      
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== itemId);
      }
      
      return prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === itemId);
      if (item) {
        toast.success(`Removed ${item.product.name} from your cart`);
      }
      return prevCart.filter(item => item.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Your cart has been cleared");
  };

  return (
    <CartContext.Provider value={{
      cart,
      totalItems,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing login on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("aarna-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is just a mock implementation - in a real app, use an API call
    const foundUser = users.find(u => u.email === email);
    
    // Special case for admin login
    if (email === "admin@aarna.com" && password === "admin123") {
      const adminUser: User = {
        id: "admin",
        name: "Admin User",
        email: "admin@aarna.com",
        role: "admin"
      };
      
      setUser(adminUser);
      localStorage.setItem("aarna-user", JSON.stringify(adminUser));
      toast.success("Logged in as Admin");
      return true;
    }
    
    if (foundUser && password === "password") {  // Mock password validation
      const userWithRole: User = {
        ...foundUser,
        role: "customer"
      };
      
      setUser(userWithRole);
      localStorage.setItem("aarna-user", JSON.stringify(userWithRole));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    }
    
    toast.error("Invalid email or password");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aarna-user");
    toast.success("You've been logged out");
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContext");
  }
  return context;
};
