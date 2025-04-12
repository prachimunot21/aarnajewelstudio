
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, User } from "./types";
import { products, cart as initialCart } from "./data";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { fetchCurrentUser, signIn, signOut as apiSignOut } from "./api";
import { useNavigate } from "react-router-dom";

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
  session: any;
  loading: boolean;
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
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state and listen for changes
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        
        if (newSession) {
          // Fetch the user profile when session changes
          const userProfile = await fetchCurrentUser();
          setUser(userProfile);
        } else {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        
        if (initialSession) {
          const userProfile = await fetchCurrentUser();
          setUser(userProfile);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const data = await signIn(email, password);
      return !!data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiSignOut();
    // Note: We don't need to call navigate here as the auth state change will be detected
    // by the components and they will handle redirection appropriately
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      login,
      logout,
      isLoggedIn: !!session
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
