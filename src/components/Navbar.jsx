import React from 'react';
import { Book } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white h-16 ml-64 fixed top-0 left-0 right-0 z-20 shadow-md">
      <div className="flex justify-between items-center h-full px-6">
        
        {/* Title */}
        <div className="text-2xl font-bold tracking-wide text-teal-400">
          Library Management
        </div>

        {/* Book Icon */}
        <Book className="w-6 h-6 text-teal-400 hover:text-teal-500 transition duration-300 cursor-pointer" />

      </div>
    </nav>
  );
}
