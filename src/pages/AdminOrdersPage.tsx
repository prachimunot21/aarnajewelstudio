
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

// Define order status types
type OrderStatus = "all" | "processing" | "shipped" | "delivered" | "cancelled";

// Define order interface
interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  date: string;
  status: Exclude<OrderStatus, "all">;
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      phone: "+91 98765 43210",
    },
    date: "2025-04-01T10:30:00",
    status: "processing",
    total: 4999,
    items: [
      {
        id: "PROD-1",
        name: "Silver Leaf Pendant",
        price: 2999,
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        id: "PROD-4",
        name: "Silver Anklet",
        price: 1999,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    address: {
      street: "42 Green Avenue",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
    },
  },
  {
    id: "ORD-002",
    customer: {
      name: "Priya Patel",
      email: "priya.p@example.com",
      phone: "+91 77889 55664",
    },
    date: "2025-03-29T14:15:00",
    status: "shipped",
    total: 7599,
    items: [
      {
        id: "PROD-6",
        name: "Silver Bracelet Set",
        price: 7599,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    address: {
      street: "78 Lake View Road",
      city: "Bengaluru",
      state: "Karnataka",
      zipCode: "560001",
    },
  },
  {
    id: "ORD-003",
    customer: {
      name: "Amit Verma",
      email: "amit.v@example.com",
      phone: "+91 62345 67890",
    },
    date: "2025-03-25T09:45:00",
    status: "delivered",
    total: 9998,
    items: [
      {
        id: "PROD-3",
        name: "Pearl Earrings",
        price: 4999,
        quantity: 2,
        image: "/placeholder.svg",
      },
    ],
    address: {
      street: "15 Sunshine Colony",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110001",
    },
  },
];

const AdminOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  
  // States
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("all");
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  
  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!isLoggedIn || user?.role !== "admin") {
      toast.error("You don't have permission to access this page");
      navigate("/");
      return;
    }
    
    // In a real app, fetch orders from API
    // For now, use mock data
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
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
        order.customer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.customer.email.toLowerCase().includes(lowerCaseSearchTerm)
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
  
  const updateOrderStatus = (orderId: string, newStatus: Exclude<OrderStatus, "all">) => {
    // In a real app, send API request to update order status
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    toast.success(`Order #${orderId} status updated to ${newStatus}`);
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
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredOrders.length === 0 ? (
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
                          <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center md:space-x-8 flex-wrap gap-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p className="font-medium">{order.customer.name}</p>
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
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-4">
                                  <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
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
                              <p><span className="font-medium">Name:</span> {order.customer.name}</p>
                              <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                              <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
                            </div>
                            
                            <h4 className="font-medium mt-4 mb-3">Shipping Address</h4>
                            <div className="space-y-1">
                              <p>{order.address.street}</p>
                              <p>{order.address.city}, {order.address.state}</p>
                              <p>{order.address.zipCode}</p>
                            </div>
                            
                            <h4 className="font-medium mt-4 mb-3">Update Status</h4>
                            <div className="flex flex-wrap gap-2">
                              <Button 
                                variant={order.status === "processing" ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "processing")}
                                disabled={order.status === "processing"}
                              >
                                Processing
                              </Button>
                              <Button 
                                variant={order.status === "shipped" ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "shipped")}
                                disabled={order.status === "shipped"}
                              >
                                Shipped
                              </Button>
                              <Button 
                                variant={order.status === "delivered" ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "delivered")}
                                disabled={order.status === "delivered"}
                              >
                                Delivered
                              </Button>
                              <Button 
                                variant={order.status === "cancelled" ? "destructive" : "outline"}
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "cancelled")}
                                disabled={order.status === "cancelled"}
                              >
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
