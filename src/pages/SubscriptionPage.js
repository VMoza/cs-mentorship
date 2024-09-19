import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51PyhbLHbl2elS2AtBMDVqkcKwaHJue4vzhJVViMmdvm8GW9Nm17RW9vhw4o6HCZZwB4TFy65650PpmNl6ztq4iry005p8GEGxF');

const SubscriptionPage = () => {
    const handleSubscription = async () => {
        const stripe = await stripePromise;
      
        const response = await fetch('http://localhost:3001/create-checkout-session', {
          method: 'POST',
        });
      
        const session = await response.json();
      
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      
        if (result.error) {
          console.error(result.error.message);
        }
      };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8">Subscribe to cs-mentor</h2>
      <p className="text-lg mb-6">Unlock access to premium system design questions and more.</p>
      <button
        onClick={handleSubscription}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Subscribe Now
      </button>
    </div>
  );
};

export default SubscriptionPage;
