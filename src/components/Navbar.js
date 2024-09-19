import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">cs-mentor</Link> {/* Wrap the logo in a Link */}
        </div>
        <div>
          <Link to="/" className="text-gray-600 px-4">Home</Link>
          <Link to="/resources" className="text-gray-600 px-4">Resources</Link>
          <Link to="/consultations" className="text-gray-600 px-4">Consultations</Link> {/* New link */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
