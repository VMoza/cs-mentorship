import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ConsultationSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the session_id from the URL
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      // Optionally, you can fetch session details from your backend
      // and store booking information in your database
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-8">Thank You for Your Purchase!</h1>
        <p className="text-lg mb-8">
          Your payment was successful. We will contact you shortly with the booking details.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ConsultationSuccessPage;
