
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-8 w-8 text-aarna-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-serif">Privacy Policy</h1>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-8">
              Last Updated: April 12, 2025
            </p>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-medium mb-3">1. Introduction</h2>
                <p>
                  Aarna Silver ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and 
                  safeguard your information when you visit our website www.aarnasilver.com (the "Site") or make a purchase from us.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">2. Information We Collect</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium">Personal Information</h3>
                    <p>When you create an account, place an order, or subscribe to our newsletter, we may collect:</p>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Billing and shipping address</li>
                      <li>Payment information (note: we do not store complete payment information)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Automatically Collected Information</h3>
                    <p>When you access our Site, we automatically collect certain information, including:</p>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Device information</li>
                      <li>Pages visited and time spent</li>
                      <li>Referring websites or sources</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">3. How We Use Your Information</h2>
                <p className="mb-2">We use the information we collect to:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about orders, products, and services</li>
                  <li>Provide customer support</li>
                  <li>Improve our website and product offerings</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">4. Information Sharing and Disclosure</h2>
                <p className="mb-3">
                  We may share your information with third parties in the following circumstances:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>With service providers who help us operate our business (payment processors, shipping companies, etc.)</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and the rights of others</li>
                  <li>In connection with a business transfer (merger, acquisition, etc.)</li>
                  <li>With your consent or at your direction</li>
                </ul>
                <p className="mt-3">
                  We do not sell, rent, or lease your personal information to third parties.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">5. Cookies and Tracking Technologies</h2>
                <p className="mb-2">
                  We use cookies and similar tracking technologies to collect information about your browsing activities and to improve your experience on our Site.
                </p>
                <p>
                  You can manage your cookie preferences through your browser settings. However, disabling cookies may limit your ability to use some features of our Site.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">6. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. 
                  However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">7. Your Rights and Choices</h2>
                <p className="mb-2">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your information</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                </ul>
                <p className="mt-2">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">8. Children's Privacy</h2>
                <p>
                  Our Site is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. 
                  If we learn that we have collected personal information from a child under 16, we will take steps to delete that information.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">9. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the top of this policy. 
                  We encourage you to review this Privacy Policy periodically.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-medium mb-3">10. Contact Information</h2>
                <p>
                  If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-2">
                  <p>Email: privacy@aarnasilver.com</p>
                  <p>Address: 123 Silver Street, Mumbai, Maharashtra 400001, India</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;
