
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />
      <main className="py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif mb-2">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our products or need assistance? We're here to help!
              Reach out to us using any of the methods below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-lg shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aarna-primary"
                      required
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-aarna-primary hover:bg-aarna-dark text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-xl font-serif mb-4">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin
                      size={24}
                      className="text-aarna-primary flex-shrink-0 mr-3 mt-1"
                    />
                    <div>
                      <h4 className="font-medium mb-1">Store Address</h4>
                      <p className="text-gray-600">
                        72, Vinod Nagar,<br />
                        Beawar, Rajasthan,<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone
                      size={24}
                      className="text-aarna-primary flex-shrink-0 mr-3 mt-1"
                    />
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-gray-600">
                        <a href="tel:+919571839844" className="hover:text-aarna-primary">
                          +91 9571 839 844
                        </a>
                        <br />
                        Prateek Munot
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail
                      size={24}
                      className="text-aarna-primary flex-shrink-0 mr-3 mt-1"
                    />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-gray-600">
                        <a href="mailto:contact@aarnajewels.com" className="hover:text-aarna-primary">
                          contact@aarnajewels.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-xl font-serif mb-4">Store Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">10:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">12:00 PM - 6:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
