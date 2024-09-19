// File: src/pages/ConsultationsPage.js

import React from 'react';
import Navbar from '../components/Navbar';

const ConsultationsPage = () => {
  const handleBookNow = async (type) => {
    try {
      const response = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultationType: type }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error('Error: ', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-5xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Book a Consultation
        </h1>
        <p className="text-lg mb-12 text-center text-gray-700">
          Choose between Group or a 1:1 consultation and get personalized guidance to unlock your full potential.
        </p>

        {/* Consultation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Group Call Option */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 relative flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Group Call</h2>
              <p className="text-gray-700 mb-6">
                Join a group session to learn with peers. Perfect for collaborative learning with ample personalized mentorship.
              </p>
            </div>
            <div className="mt-auto">
              <p className="text-xl font-bold text-gray-500 line-through mb-2">$49.99</p>
              <p className="text-2xl font-bold text-blue-600 mb-6">$24.99</p>
              <button
                onClick={() => handleBookNow('group')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:bg-glow transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* 1:1 Consultation Option */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 relative flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-600">1:1 Consultation</h2>
              <p className="text-gray-700 mb-6">
                Get personalized guidance tailored to your needs with a private session. Achieve your goals faster with one-on-one support.
              </p>
            </div>
            <div className="mt-auto">
              <p className="text-xl font-bold text-gray-500 line-through mb-2">$299.99</p>
              <p className="text-2xl font-bold text-blue-600 mb-6">$199.99</p>
              <button
                onClick={() => handleBookNow('one-on-one')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:bg-glow transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsPage;
