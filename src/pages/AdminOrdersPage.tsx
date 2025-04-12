
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { toast } from "sonner";
import { fetchAllOrders, updateOrderStatus } from "@/lib/api";
import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrderList from "@/components/admin/orders/OrderList";

// Define order status types
type OrderStatus = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled";

// Define order interface
interface OrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  user_id: string;
  profile: {
    name: string;
    email: string;
    phone: string;
  };
  created_at: string;
  status: Exclude<OrderStatus, "all">;
  total: number;
  order_items: OrderItem[];
  shipping_address: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

const AdminOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  
  // States
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("all");
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  
  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!isLoggedIn) {
      toast.error("You must be logged in to access this page");
      navigate("/login", { state: { redirect: "/admin/orders" } });
      return;
    }
    
    if (user && user.role !== "admin") {
      toast.error("You don't have permission to access this page");
      navigate("/");
      return;
    }
    
    // Fetch orders from database
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const allOrders = await fetchAllOrders();
        setOrders(allOrders as unknown as Order[]);
        setFilteredOrders(allOrders as unknown as Order[]);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrders();
  }, [isLoggedIn, navigate, user]);
  
  // Filter orders based on search term and status
  useEffect(() => {
    let result = orders;
    
    if (statusFilter !== "all") {
      result = result.filter(order => order.status === statusFilter);
    }
    
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(lowerCaseSearchTerm) ||
        (order.profile?.name || "").toLowerCase().includes(lowerCaseSearchTerm) ||
        (order.profile?.email || "").toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter]);
  
  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };
  
  const handleUpdateOrderStatus = async (orderId: string, newStatus: Exclude<OrderStatus, "all">) => {
    try {
      setUpdatingOrder(orderId);
      await updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setUpdatingOrder(null);
    }
  };

  if (!isLoggedIn || (user && user.role !== "admin")) {
    return null; // Don't render anything while checking permissions
  }

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-serif">Order Management</h1>
            <Button 
              variant="outline" 
              className="border-aarna-primary text-aarna-primary"
              onClick={() => navigate("/admin")}
            >
              <Package className="mr-2" size={18} />
              Manage Products
            </Button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
            <OrderFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
            
            <OrderList
              orders={filteredOrders}
              expandedOrders={expandedOrders}
              toggleOrderExpand={toggleOrderExpand}
              isLoading={isLoading}
              updatingOrder={updatingOrder}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminOrdersPage;
