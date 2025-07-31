import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiHome } from 'react-icons/fi'; 

function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-dark-primary shadow-lg border-b border-dark-secondary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-accent-teal rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
              <span className="text-white font-extrabold text-lg">DC</span>
            </div>
            <span className="text-2xl font-bold text-text-white hover:text-accent-teal transition-colors duration-200">DevConnect</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="text-text-white hover:text-accent-teal flex items-center gap-1 font-medium transition-colors duration-200"
            >
              <FiHome className="w-5 h-5" /> Home
            </Link>
            {/* Profile, Add Project, Search will be handled within Dashboard or as modals */}
            {/* <Link
              to={`/profile/${user._id}`} // This route is removed from App.jsx, will be a modal
              className="text-text-white hover:text-accent-teal flex items-center gap-1 font-medium transition-colors duration-200"
            >
              <FiUser className="w-5 h-5" /> Profile
            </Link>
            <Link
              to="/projects/add" // This route is removed from App.jsx, will be a modal
              className="text-text-white hover:text-accent-teal flex items-center gap-1 font-medium transition-colors duration-200"
            >
              <FiPlusCircle className="w-5 h-5" /> Add Project
            </Link>
            <Link
              to="/search" // This route is removed from App.jsx, will be a modal
              className="text-text-white hover:text-accent-teal flex items-center gap-1 font-medium transition-colors duration-200"
            >
              <FiSearch className="w-5 h-5" /> Search
            </Link> */}

            {/* User Menu / Logout */}
            <div className="flex items-center space-x-4">
              <span className="text-text-white text-base">
                Hello, <span className="font-semibold text-accent-teal">{user.username}</span>
              </span>
              <button
                onClick={onLogout}
                className="text-text-white hover:text-danger flex items-center gap-1 font-medium transition-colors duration-200"
              >
                <FiLogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
