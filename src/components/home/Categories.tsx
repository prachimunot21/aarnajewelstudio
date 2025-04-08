
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/lib/data";
import { placeholderImage } from "@/lib/data";

const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-aarna-light">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif mb-2">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our extensive collection of 925 silver jewelry, categorized to help you find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name}`}
              className="group"
            >
              <div className="relative bg-white rounded-lg overflow-hidden aspect-square shadow-sm group-hover:shadow-md transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={placeholderImage}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center z-20">
                  <h3 className="text-white font-medium text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
