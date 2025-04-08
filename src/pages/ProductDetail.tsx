
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, placeholderImage } from "@/lib/data";
import { useCart } from "@/lib/context";
import { useToast } from "@/hooks/use-toast";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <>
        <Navbar />
        <main className="py-16">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
              <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/products">Back to Products</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container-custom">
          <nav className="flex mb-8 text-sm">
            <Link to="/" className="text-gray-500 hover:text-aarna-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-aarna-primary">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{product.name}</span>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-white border rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[activeImage] || placeholderImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderImage;
                  }}
                />
              </div>
              
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-24 h-24 border rounded overflow-hidden flex-shrink-0 ${
                      activeImage === index ? 'border-aarna-primary ring-1 ring-aarna-primary' : 'border-gray-200'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image || placeholderImage}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholderImage;
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-serif font-medium mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-6">
                  <Badge variant="outline" className="mr-2">
                    {product.category}
                  </Badge>
                  
                  {product.inStock ? (
                    <span className="text-green-600 text-sm">In Stock</span>
                  ) : (
                    <span className="text-red-500 text-sm">Out of Stock</span>
                  )}
                </div>
                
                <div className="flex items-center mb-6">
                  <span className="text-2xl font-medium mr-3">
                    ₹{product.discountPrice || product.price}
                  </span>
                  
                  {product.discountPrice && (
                    <>
                      <span className="text-gray-500 line-through text-lg">
                        ₹{product.price}
                      </span>
                      <Badge className="ml-3 bg-aarna-primary">
                        Save ₹{product.price - product.discountPrice}
                      </Badge>
                    </>
                  )}
                </div>
                
                <p className="text-gray-700 mb-8">{product.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <span className="mr-4">Quantity:</span>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="h-9 w-9"
                      >
                        <Minus size={16} />
                      </Button>
                      
                      <span className="mx-4 w-8 text-center">{quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stockQuantity}
                        className="h-9 w-9"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      className="flex-1 bg-aarna-primary hover:bg-aarna-dark"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="mr-2" size={18} />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-12"
                      onClick={handleAddToWishlist}
                    >
                      <Heart size={18} />
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-8">
                  <h3 className="font-medium mb-2">Product Details:</h3>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Type:</strong> {product.category}</li>
                    <li><strong>Material:</strong> 925 Sterling Silver</li>
                    <li><strong>Stock:</strong> {product.stockQuantity} units available</li>
                    <li><strong>SKU:</strong> AARNA-{product.id}</li>
                  </ul>
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-medium mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
