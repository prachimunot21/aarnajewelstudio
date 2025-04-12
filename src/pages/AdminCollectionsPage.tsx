
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/lib/context";
import { supabase } from "@/integrations/supabase/client";
import LoadingState from "@/components/admin/orders/LoadingState";
import EmptyOrdersState from "@/components/admin/orders/EmptyOrdersState";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Collection {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  created_at: string;
}

const AdminCollectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  
  // States
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: ""
  });
  
  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!isLoggedIn) {
      toast.error("You must be logged in to access this page");
      navigate("/login", { state: { redirect: "/admin/collections" } });
      return;
    }
    
    if (user && user.role !== "admin") {
      toast.error("You don't have permission to access this page");
      navigate("/");
      return;
    }
    
    // Fetch collections from database
    const loadCollections = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("collections")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        
        setCollections(data || []);
      } catch (error) {
        console.error("Error fetching collections:", error);
        toast.error("Failed to load collections");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCollections();
  }, [isLoggedIn, navigate, user]);
  
  const openCreateDialog = () => {
    setEditingCollection(null);
    setFormData({
      name: "",
      description: "",
      image: ""
    });
    setDialogOpen(true);
  };
  
  const openEditDialog = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description || "",
      image: collection.image || ""
    });
    setDialogOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Collection name is required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (editingCollection) {
        // Update existing collection
        const { error } = await supabase
          .from("collections")
          .update({
            name: formData.name,
            description: formData.description || null,
            image: formData.image || null
          })
          .eq("id", editingCollection.id);
        
        if (error) throw error;
        
        toast.success("Collection updated successfully");
        
        // Update local state
        setCollections(prev => 
          prev.map(c => 
            c.id === editingCollection.id 
              ? { 
                  ...c, 
                  name: formData.name, 
                  description: formData.description || null, 
                  image: formData.image || null 
                } 
              : c
          )
        );
      } else {
        // Create new collection
        const { data, error } = await supabase
          .from("collections")
          .insert({
            name: formData.name,
            description: formData.description || null,
            image: formData.image || null
          })
          .select();
        
        if (error) throw error;
        
        toast.success("Collection created successfully");
        
        // Update local state
        if (data && data[0]) {
          setCollections(prev => [data[0], ...prev]);
        }
      }
      
      // Close dialog
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving collection:", error);
      toast.error("Failed to save collection");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this collection?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from("collections")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("Collection deleted successfully");
      
      // Update local state
      setCollections(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast.error("Failed to delete collection");
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
            <h1 className="text-3xl font-serif">Collection Management</h1>
            <Button 
              className="bg-aarna-primary hover:bg-aarna-dark"
              onClick={openCreateDialog}
            >
              <Plus className="mr-2" size={18} />
              New Collection
            </Button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
            {isLoading ? (
              <LoadingState message="Loading collections..." />
            ) : collections.length === 0 ? (
              <EmptyOrdersState 
                message="No collections found" 
                subMessage="Create your first collection to organize your products" 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map(collection => (
                  <Card key={collection.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle>{collection.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                        {collection.image ? (
                          <img 
                            src={collection.image} 
                            alt={collection.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg";
                            }}
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </div>
                      <p className="text-gray-600 line-clamp-2">
                        {collection.description || "No description provided"}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(collection)}
                      >
                        <Edit size={16} className="mr-1" /> Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(collection.id)}
                      >
                        <Trash2 size={16} className="mr-1" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCollection ? "Edit Collection" : "Create Collection"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid w-full items-center gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Collection Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid w-full items-center gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              
              <div className="grid w-full items-center gap-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-aarna-primary hover:bg-aarna-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {editingCollection ? "Update" : "Create"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminCollectionsPage;
