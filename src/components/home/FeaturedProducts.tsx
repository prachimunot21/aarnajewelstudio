
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { useCart } from "@/lib/context";
import { placeholderImage } from "@/lib/data";

const FeaturedProducts: React.FC = () => {
  const { addToCart } = useCart();
  const featured = products.filter(product => product.featured).slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif mb-2">Featured Products</h2>
            <p className="text-gray-600">
              Discover our exquisite selection of handpicked silver jewelry
            </p>
          </div>
          <Link
            to="/products"
            className="mt-4 md:mt-0 text-aarna-primary hover:text-aarna-dark flex items-center group"
          >
            View All Products
            <ArrowRight
              size={16}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
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

              {product.discountPrice && (
                <Badge className="absolute top-2 left-2 bg-aarna-primary">
                  Sale
                </Badge>
              )}

              <div className="p-4">
                <Link to={`/products/${product.id}`} className="block">
                  <h3 className="font-medium text-lg mb-1 group-hover:text-aarna-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mt-2">
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
                  
                  <Button
                    size="sm"
                    onClick={() => addToCart(product, 1)}
                    className="bg-aarna-light text-aarna-primary hover:bg-aarna-primary hover:text-white"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
