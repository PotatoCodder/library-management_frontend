import React from 'react';
import { Book } from 'lucide-react';
import logo from '../assets/logo-ptc.png';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white h-16 ml-64 fixed top-0 left-0 right-0 z-20 shadow-md">
      <div className="flex justify-between items-center h-full px-6">

        {/* Left Side: Logo + Title */}
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <img
            src={logo}
            alt="PTC Logo"
            className="h-10 w-10 object-contain rounded-full shadow-sm border border-teal-500"
          />

          {/* Title */}
          <span className="text-2xl font-bold tracking-wide text-teal-400">
            Library Management
          </span>
        </div>

        {/* Right Side: Book Icon */}
        <Book className="w-6 h-6 text-teal-400 hover:text-teal-500 transition duration-300 cursor-pointer" />

      </div>
    </nav>
  );
}
