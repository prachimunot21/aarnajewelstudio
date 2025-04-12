
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Upload, Plus, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/lib/data";
import { placeholderImage } from "@/lib/data";
import { createProduct } from "@/lib/api";
import { useAuth } from "@/lib/context";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [bestseller, setBestseller] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [stockQuantity, setStockQuantity] = useState("50");
  const [images, setImages] = useState<string[]>([placeholderImage, placeholderImage]);
  const [imageInputs, setImageInputs] = useState<string[]>(["", ""]);
  
  // Check if user is admin
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive"
      });
      navigate("/login", { state: { redirect: "/admin" } });
      return;
    }
    
    if (user && user.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [isLoggedIn, user, navigate, toast]);
  
  const handleImageChange = (index: number, value: string) => {
    const newInputs = [...imageInputs];
    newInputs[index] = value;
    setImageInputs(newInputs);
    
    // Update preview
    const newImages = [...images];
    newImages[index] = value || placeholderImage;
    setImages(newImages);
  };
  
  const addImageField = () => {
    setImageInputs([...imageInputs, ""]);
    setImages([...images, placeholderImage]);
  };
  
  const removeImageField = (index: number) => {
    if (imageInputs.length > 1) {
      const newInputs = imageInputs.filter((_, i) => i !== index);
      setImageInputs(newInputs);
      
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !description || !price || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Filter out empty image URLs
      const productImages = imageInputs.filter(url => url.trim() !== '');
      
      if (productImages.length === 0) {
        toast({
          title: "Error",
          description: "Please add at least one product image",
          variant: "destructive"
        });
        return;
      }
      
      // Create product using the API
      const tagArray = tags.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
        
      await createProduct({
        name,
        description,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
        images: productImages,
        category,
        tags: tagArray,
        featured,
        bestseller,
        inStock,
        stockQuantity: parseInt(stockQuantity)
      });
      
      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setDiscountPrice("");
      setCategory("");
      setTags("");
      setFeatured(false);
      setBestseller(false);
      setInStock(true);
      setStockQuantity("50");
      setImages([placeholderImage, placeholderImage]);
      setImageInputs(["", ""]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
            <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-medium mb-6">Add New Product</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                      Product Name *
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Silver Leaf Pendant"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="description">
                      Description *
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Elegant 925 silver pendant shaped like a delicate leaf..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="price">
                        Price (₹) *
                      </label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="2499"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="discountPrice">
                        Discount Price (₹)
                      </label>
                      <Input
                        id="discountPrice"
                        type="number"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        placeholder="1999"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="category">
                      Category *
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="tags">
                      Tags (comma separated)
                    </label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="silver, pendant, leaf, nature"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="stockQuantity">
                        Stock Quantity *
                      </label>
                      <Input
                        id="stockQuantity"
                        type="number"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        placeholder="50"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inStock"
                        checked={inStock}
                        onCheckedChange={(checked) => setInStock(checked as boolean)}
                      />
                      <label htmlFor="inStock" className="text-sm font-medium">
                        In Stock
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={featured}
                        onCheckedChange={(checked) => setFeatured(checked as boolean)}
                      />
                      <label htmlFor="featured" className="text-sm font-medium">
                        Featured Product
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bestseller"
                        checked={bestseller}
                        onCheckedChange={(checked) => setBestseller(checked as boolean)}
                      />
                      <label htmlFor="bestseller" className="text-sm font-medium">
                        Bestseller
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Product Images
                  </label>
                  
                  {imageInputs.map((input, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex space-x-3 mb-2">
                        <Input
                          value={input}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder="Image URL"
                          className="flex-1"
                        />
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeImageField(index)}
                          disabled={imageInputs.length <= 1}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                      
                      <div className="h-32 w-32 border rounded-md overflow-hidden">
                        <img
                          src={images[index]}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = placeholderImage;
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageField}
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-1" /> Add Image
                  </Button>
                </div>
              </div>
              
              <div className="border-t mt-8 pt-6 flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/products")}
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
                      <Loader2 size={16} className="mr-2 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" /> Save Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
