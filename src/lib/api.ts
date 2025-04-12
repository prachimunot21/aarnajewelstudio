
import { supabase } from "@/integrations/supabase/client";
import { Product, User, Order, CartItem } from "./types";
import { toast } from "sonner";

// Product API functions
export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        price: product.price,
        discount_price: product.discountPrice,
        images: product.images,
        category: product.category,
        tags: product.tags || [],
        featured: product.featured || false,
        bestseller: product.bestseller || false,
        in_stock: product.inStock,
        stock_quantity: product.stockQuantity
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success("Product created successfully");
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    toast.error("Failed to create product");
    return null;
  }
}

export async function updateProduct(id: string, product: Partial<Product>) {
  try {
    // Convert from frontend model to database model
    const dbProduct: any = {
      ...product,
      discount_price: product.discountPrice,
      in_stock: product.inStock,
      stock_quantity: product.stockQuantity
    };
    
    // Remove fields that don't map directly to db columns
    delete dbProduct.discountPrice;
    delete dbProduct.inStock;
    delete dbProduct.stockQuantity;
    delete dbProduct.createdAt;
    delete dbProduct.updatedAt;
    
    const { data, error } = await supabase
      .from('products')
      .update(dbProduct)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success("Product updated successfully");
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product");
    return null;
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    toast.success("Product deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Failed to delete product");
    return false;
  }
}

// User API functions
export async function fetchCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      wishlist: data.wishlist
    } as User;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function updateUserProfile(id: string, updates: Partial<User>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success("Profile updated successfully");
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Failed to update profile");
    return null;
  }
}

export async function addToWishlist(userId: string, productId: string) {
  try {
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('wishlist')
      .eq('id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const wishlist = profile.wishlist || [];
    
    if (!wishlist.includes(productId)) {
      const { error } = await supabase
        .from('profiles')
        .update({ wishlist: [...wishlist, productId] })
        .eq('id', userId);
      
      if (error) throw error;
      toast.success("Added to wishlist");
    }
    
    return true;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    toast.error("Failed to add to wishlist");
    return false;
  }
}

export async function removeFromWishlist(userId: string, productId: string) {
  try {
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('wishlist')
      .eq('id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const wishlist = profile.wishlist || [];
    
    const { error } = await supabase
      .from('profiles')
      .update({ wishlist: wishlist.filter(id => id !== productId) })
      .eq('id', userId);
    
    if (error) throw error;
    
    toast.success("Removed from wishlist");
    return true;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    toast.error("Failed to remove from wishlist");
    return false;
  }
}

// Order API functions
export async function createOrder(order: {
  userId: string,
  items: CartItem[],
  total: number,
  shippingAddress: any,
  paymentMethod: string
}) {
  try {
    // 1. Create the order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: order.userId,
        total: order.total,
        shipping_address: order.shippingAddress,
        payment_method: order.paymentMethod,
        status: 'pending',
        payment_status: 'pending'
      }])
      .select()
      .single();
    
    if (orderError) throw orderError;
    
    // 2. Create order items
    const orderItems = order.items.map(item => ({
      order_id: orderData.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.discountPrice || item.product.price
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;
    
    toast.success("Order placed successfully");
    return orderData;
  } catch (error) {
    console.error("Error creating order:", error);
    toast.error("Failed to place order");
    return null;
  }
}

export async function fetchUserOrders(userId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

export async function fetchAllOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(*)
        ),
        profile:profiles!user_id(name, email, phone)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    
    toast.success(`Order status updated to ${status}`);
    return data;
  } catch (error) {
    console.error("Error updating order status:", error);
    toast.error("Failed to update order status");
    return null;
  }
}

// Collection API functions
export async function fetchCollections() {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export async function fetchCollectionWithProducts(collectionId: string) {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select(`
        *,
        collection_items:collection_items(
          product:products(*)
        )
      `)
      .eq('id', collectionId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching collection with products:", error);
    return null;
  }
}

// Authentication functions
export async function signUp(email: string, password: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });
    
    if (error) throw error;
    
    toast.success("Account created successfully");
    return data;
  } catch (error: any) {
    console.error("Error signing up:", error);
    toast.error(error.message || "Failed to create account");
    return null;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    toast.success("Logged in successfully");
    return data;
  } catch (error: any) {
    console.error("Error signing in:", error);
    toast.error(error.message || "Failed to log in");
    return null;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    toast.success("Logged out successfully");
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("Failed to log out");
    return false;
  }
}
