import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation for route-based background change

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current route
  
  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${isLandingPage ? 'bg-white' : 'bg-gradient-to-r from-purple-600 to-blue-600'} shadow-md`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link to="/" className={`${isLandingPage ? 'text-blue-600' : 'text-white'}`}>
            cs-mentor
          </Link>
        </div>

        {/* Hamburger Icon for mobile screens */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Links for larger screens */}
        <div className={`hidden lg:flex lg:items-center space-x-6`}>
          <Link
            to="/"
            className={`${isLandingPage ? 'text-gray-600' : 'text-white'} hover:text-blue-600`}
          >
            Home
          </Link>
          <Link
            to="/resources"
            className={`${isLandingPage ? 'text-gray-600' : 'text-white'} hover:text-blue-600`}
          >
            Resources
          </Link>
          <Link
            to="/consultations"
            className={`${isLandingPage ? 'text-gray-600' : 'text-white'} hover:text-blue-600`}
          >
            Consultations
          </Link>
        </div>
      </div>

      {/* Dropdown for mobile */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md py-1 px-3 space-y-1">
          <Link
            to="/"
            className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded"
          >
            Home
          </Link>
          <Link
            to="/resources"
            className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded"
          >
            Resources
          </Link>
          <Link
            to="/consultations"
            className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded"
          >
            Consultations
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
