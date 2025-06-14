import React from "react";
import image from "../assets/graphic-insight.png"; // adjust path as needed

export default function FeaturesInsights() {
  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      {/* Header & Image */}
      <div className="grid md:grid-cols-2 items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-4">Features & Insights</h2>
          <p className="text-gray-600 max-w-xl">
            Every tool built into Vetayo exists for one reason — to get lost things
            home, quickly and securely.
          </p>
        </div>
       
                <img src={image} alt="Vetayo illustration" className="w-full max-w-md mx-auto" />
      
    
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg mb-4">
            <span className="text-xl">🎯</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Smart Matching & Easy Reporting</h3>
          <p className="text-sm text-gray-700">
            Vetayo combines intelligent item matching with a fast and user-friendly
            reporting system. Whether you’ve lost or found something, you can
            quickly submit details like item type, description, location, and photos.
            Our smart engine uses that data to suggest the most likely matches—so you
            spend less time searching and more time reconnecting with what matters.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg mb-4">
            <span className="text-xl">🔒</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Secure Claims & Real-Time Notifications</h3>
          <p className="text-sm text-gray-700">
            To protect every item, Vetayo ensures a secure and verified claim
            process. Owners must confirm unique details before receiving their
            belongings, preventing wrong handovers. Real-time notifications keep
            users informed at every step—from match alerts to pickup confirmations—
            making the process smooth, transparent, and trustworthy.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg mb-4">
            <span className="text-xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Location Filters, Safe Messaging & Low-Cost Service</h3>
          <p className="text-sm text-gray-700">
            Users can filter items based on zones, buildings, or specific areas,
            making it easier to find things in larger or busy environments. For
            added confidence, a built-in messaging option lets users communicate
            without revealing personal details. Best of all, Vetayo offers all these
            features affordably, with no hidden fees—so everyone can use it with ease.
          </p>
        </div>
      </div>
    </div>
  );
}
