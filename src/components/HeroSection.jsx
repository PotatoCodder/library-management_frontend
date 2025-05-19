import React from 'react';

export default function HeroSection() {
  return (
    <div className="ml-64 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center px-10 relative overflow-hidden">
      
      {/* Background Animated Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-teal-700 opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-teal-500 opacity-20 rounded-full animate-ping"></div>

      <div className="max-w-3xl text-center z-10">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight text-teal-400">
          Manage Your Library Effortlessly
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Add, search, and organize books in seconds. A powerful yet simple system to streamline your library.
        </p>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}
