
import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products, featuredCollections, placeholderImage } from "@/lib/data";

const CollectionsPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId?: string }>();
  
  // If collectionId is provided, display collection products
  if (collectionId) {
    const collection = featuredCollections.find(c => c.id === collectionId);
    
    if (!collection) {
      return (
        <>
          <Navbar />
          <main className="py-16">
            <div className="container-custom">
              <div className="text-center">
                <h1 className="text-3xl font-serif mb-4">Collection Not Found</h1>
                <p className="mb-8">The collection you're looking for doesn't exist.</p>
                <Button asChild>
                  <Link to="/collections">View All Collections</Link>
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </>
      );
    }
    
    // Filter products for this collection
    // For demo purposes, this just shows a subset of products
    const collectionProducts = products.filter((_, index) => 
      collection.id === "1" ? index % 2 === 0 : 
      collection.id === "2" ? index % 3 === 0 : 
      collection.id === "3" ? index % 2 === 1 : true
    );
    
    return (
      <>
        <Navbar />
        <main className="py-8 md:py-12">
          <div className="container-custom">
            <div className="flex items-center mb-8">
              <Button asChild variant="ghost" className="mr-4">
                <Link to="/collections">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Collections
                </Link>
              </Button>
              <h1 className="text-3xl font-serif">{collection.name}</h1>
            </div>
            
            {collectionProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {collectionProducts.map(product => (
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
                    </div>
                    
                    <div className="p-4">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-medium text-lg mb-2 group-hover:text-aarna-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-baseline">
                          <span className="font-medium">
                            ₹{product.discountPrice || product.price}
                          </span>
                          {product.discountPrice && (
                            <span className="text-gray-500 line-through text-sm ml-2">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        asChild
                        variant="outline"
                        className="w-full"
                      >
                        <Link to={`/products/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found in this collection</h3>
                <p className="text-gray-500 mb-4">
                  Check back later for new additions
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Show collections overview
  return (
    <>
      <Navbar />
      <main className="py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-serif mb-8 text-center">Our Collections</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map(collection => (
              <Link
                to={`/collections/${collection.id}`}
                key={collection.id}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10"></div>
                  <img 
                    src={collection.image || placeholderImage}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = placeholderImage;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center p-6">
                      <h2 className="text-white text-2xl font-serif mb-2">{collection.name}</h2>
                      <span className="inline-block text-white border-b border-white pb-1 group-hover:border-aarna-primary transition-colors">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CollectionsPage;
