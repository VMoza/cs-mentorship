import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ConsultationCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-8">Payment Cancelled</h1>
        <p className="text-lg mb-8">
          Your payment was not completed. You can try booking again.
        </p>
        <button
          onClick={() => navigate('/consultations')}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Return to Consultations
        </button>
      </div>
    </div>
  );
};

export default ConsultationCancelPage;
