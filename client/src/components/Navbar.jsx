import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiHome } from "react-icons/fi";

function Navbar({ user, onLogout }) {
  return (
    <nav className="border-b border-gray-800 bg-gray-950 shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo and App Name */}
        <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-md">
              <span className="text-lg font-extrabold text-white">DC</span>
            </div>
            <span className="text-2xl font-bold text-white transition-colors hover:text-blue-400">
              DevConnect
            </span>
          </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 font-medium text-gray-300 transition-colors hover:text-blue-400"
          >
            <FiHome className="h-5 w-5" /> Home
          </Link>

          {/* User Menu / Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-base text-gray-300">
              Hello,{" "}
              <span className="font-semibold text-blue-400">
                {user.username}
              </span>
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-1 font-medium text-gray-300 transition-colors hover:text-red-400"
            >
              <FiLogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
