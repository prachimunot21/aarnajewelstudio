
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/context";
import { toast } from "sonner";
import { fetchAllOrders, updateOrderStatus } from "@/lib/api";

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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusIcon = (status: Exclude<OrderStatus, "all">) => {
    switch (status) {
      case "pending":
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Package className="h-5 w-5 text-amber-500" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
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
              Manage Products
            </Button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  placeholder="Search by order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="w-full md:w-60">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as OrderStatus)}
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter size={18} className="mr-2 text-gray-500" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-16">
                <Loader2 className="mx-auto h-12 w-12 text-aarna-primary animate-spin mb-4" />
                <h2 className="text-xl font-medium mb-2">Loading orders...</h2>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-16">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-xl font-medium mb-2">No orders found</h2>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div 
                    key={order.id}
                    className="border rounded-lg overflow-hidden bg-white"
                  >
                    <div 
                      className="p-4 flex flex-wrap items-center justify-between bg-gray-50 cursor-pointer"
                      onClick={() => toggleOrderExpand(order.id)}
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center md:space-x-8 flex-wrap gap-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p className="font-medium">{order.profile?.name || "Unknown"}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium">₹{order.total.toLocaleString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-medium capitalize">{order.status}</p>
                        </div>
                        
                        <Button variant="ghost" size="icon">
                          {expandedOrders.includes(order.id) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {expandedOrders.includes(order.id) && (
                      <div className="p-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">Order Items</h4>
                            <div className="space-y-3">
                              {order.order_items?.map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-4">
                                  <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                                    <img 
                                      src={item.product?.images?.[0] || "/placeholder.svg"}
                                      alt={item.product?.name || "Product"}
                                      className="h-full w-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{item.product?.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {item.quantity} × ₹{item.price.toLocaleString()}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">
                                      ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-4 pt-3 border-t flex justify-between">
                              <p className="font-medium">Total</p>
                              <p className="font-medium">₹{order.total.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-3">Customer Details</h4>
                            <div className="space-y-2">
                              <p><span className="font-medium">Name:</span> {order.profile?.name || "N/A"}</p>
                              <p><span className="font-medium">Email:</span> {order.profile?.email || "N/A"}</p>
                              <p><span className="font-medium">Phone:</span> {order.profile?.phone || "N/A"}</p>
                            </div>
                            
                            <h4 className="font-medium mt-4 mb-3">Shipping Address</h4>
                            <div className="space-y-1">
                              <p>{order.shipping_address?.street || "N/A"}</p>
                              <p>{order.shipping_address?.city || "N/A"}, {order.shipping_address?.state || "N/A"}</p>
                              <p>{order.shipping_address?.postalCode || "N/A"}</p>
                              <p>{order.shipping_address?.country || "N/A"}</p>
                            </div>
                            
                            <h4 className="font-medium mt-4 mb-3">Update Status</h4>
                            <div className="flex flex-wrap gap-2">
                              <Button 
                                variant={order.status === "pending" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "pending")}
                                disabled={order.status === "pending" || updatingOrder === order.id}
                              >
                                {updatingOrder === order.id ? (
                                  <Loader2 size={14} className="mr-1 animate-spin" />
                                ) : null}
                                Pending
                              </Button>
                              <Button 
                                variant={order.status === "processing" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                                disabled={order.status === "processing" || updatingOrder === order.id}
                              >
                                {updatingOrder === order.id ? (
                                  <Loader2 size={14} className="mr-1 animate-spin" />
                                ) : null}
                                Processing
                              </Button>
                              <Button 
                                variant={order.status === "shipped" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                                disabled={order.status === "shipped" || updatingOrder === order.id}
                              >
                                {updatingOrder === order.id ? (
                                  <Loader2 size={14} className="mr-1 animate-spin" />
                                ) : null}
                                Shipped
                              </Button>
                              <Button 
                                variant={order.status === "delivered" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "delivered")}
                                disabled={order.status === "delivered" || updatingOrder === order.id}
                              >
                                {updatingOrder === order.id ? (
                                  <Loader2 size={14} className="mr-1 animate-spin" />
                                ) : null}
                                Delivered
                              </Button>
                              <Button 
                                variant={order.status === "cancelled" ? "destructive" : "outline"}
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "cancelled")}
                                disabled={order.status === "cancelled" || updatingOrder === order.id}
                              >
                                {updatingOrder === order.id ? (
                                  <Loader2 size={14} className="mr-1 animate-spin" />
                                ) : null}
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminOrdersPage;
