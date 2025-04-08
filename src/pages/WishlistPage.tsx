
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, X, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products, placeholderImage } from "@/lib/data";
import { useCart } from "@/lib/context";
import { useToast } from "@/hooks/use-toast";

// For demo purposes, we'll just show a few products as "wishlisted"
const wishlistedProductIds = ["1", "4", "6"];
const wishlistItems = products.filter(product => wishlistedProductIds.includes(product.id));

const WishlistPage: React.FC = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleRemoveFromWishlist = (productId: string) => {
    toast({
      title: "Removed from wishlist",
      description: "Product has been removed from your wishlist",
    });
  };
  
  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: "Product has been moved to your cart",
    });
  };

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-serif mb-8">My Wishlist</h1>
          
          {wishlistItems.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 text-left">Product</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-center">Stock Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {wishlistItems.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 flex-shrink-0">
                              <img
                                src={product.images[0] || placeholderImage}
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = placeholderImage;
                                }}
                              />
                            </div>
                            <div>
                              <Link 
                                to={`/products/${product.id}`}
                                className="font-medium hover:text-aarna-primary transition-colors"
                              >
                                {product.name}
                              </Link>
                              <p className="text-sm text-gray-500">
                                {product.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="font-medium">
                              ₹{product.discountPrice || product.price}
                            </span>
                            {product.discountPrice && (
                              <span className="text-gray-500 line-through text-sm ml-2">
                                ₹{product.price}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {product.inStock ? (
                            <span className="text-green-600 text-sm">In Stock</span>
                          ) : (
                            <span className="text-red-500 text-sm">Out of Stock</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveFromWishlist(product.id)}
                              className="text-gray-500"
                            >
                              <X size={16} />
                            </Button>
                            
                            <Button
                              size="sm"
                              onClick={() => handleMoveToCart(product)}
                              disabled={!product.inStock}
                              className="bg-aarna-primary hover:bg-aarna-dark text-white"
                            >
                              <ShoppingCart size={16} className="mr-1" /> Add to Cart
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto w-24 h-24 bg-aarna-light text-aarna-primary rounded-full flex items-center justify-center mb-6">
                <Heart size={40} />
              </div>
              <h2 className="text-2xl font-serif mb-3">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any jewelry to your wishlist yet. Explore our collections and find something you love.
              </p>
              <Button
                asChild
                className="bg-aarna-primary hover:bg-aarna-dark text-white"
              >
                <Link to="/products">
                  Browse Products
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WishlistPage;
