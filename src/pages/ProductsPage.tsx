
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Heart, ShoppingCart, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { products, categories, placeholderImage } from "@/lib/data";
import { useCart } from "@/lib/context";
import { useToast } from "@/hooks/use-toast";

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Get category from URL if it exists
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Filter products based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => 
          selectedCategories.includes(product.category)
        )
      );
    }
  }, [selectedCategories]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const handleAddToWishlist = (productId: string) => {
    toast({
      title: "Added to wishlist",
      description: "This product has been added to your wishlist",
    });
  };

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-serif">Our Collection</h1>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <h3 className="text-lg font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => handleCategoryChange(category.name)}
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="px-3 py-1">
                  {category}
                  <button 
                    className="ml-2"
                    onClick={() => handleCategoryChange(category)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedCategories([])}
                className="text-xs text-gray-500"
              >
                Clear All
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.images[0] || placeholderImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = placeholderImage;
                        }}
                      />
                    </Link>
                  </div>
                  
                  <button
                    onClick={() => handleAddToWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={18} className="text-gray-500 hover:text-aarna-primary transition-colors" />
                  </button>
                
                  {product.discountPrice && (
                    <Badge className="absolute top-3 left-3 bg-aarna-primary">
                      Sale
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-aarna-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline">
                      <span className="font-medium text-lg">
                        ₹{product.discountPrice || product.price}
                      </span>
                      {product.discountPrice && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => addToCart(product, 1)}
                      className="flex-1 bg-aarna-light text-aarna-primary hover:bg-aarna-primary hover:text-white"
                    >
                      <ShoppingCart size={16} className="mr-1" /> Add
                    </Button>
                    
                    <Button
                      size="sm"
                      asChild
                      variant="outline"
                      className="flex-1"
                    >
                      <Link to={`/products/${product.id}`}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try changing your filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategories([])}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
