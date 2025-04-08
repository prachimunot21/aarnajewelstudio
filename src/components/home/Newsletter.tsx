
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-16 bg-aarna-primary text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-3">Join Our Community</h2>
          <p className="text-gray-100 mb-8">
            Subscribe to our newsletter for exclusive offers, jewelry care tips, and updates on new arrivals.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button 
              type="submit" 
              className="bg-white text-aarna-primary hover:bg-gray-100 rounded-md px-6 py-3 h-auto"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-sm text-gray-300">
            By subscribing, you agree to our Privacy Policy and consent to receive marketing communications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
