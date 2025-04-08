
import React from "react";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Newsletter from "@/components/home/Newsletter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
