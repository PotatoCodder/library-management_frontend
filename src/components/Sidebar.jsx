// Sidebar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, PlusCircle, Search, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = !!role;
  const isAdmin = role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg z-50">
      {/* Sidebar Header */}
      <div className="mt-16 flex items-center justify-between p-6 bg-gray-800 border-b border-gray-700">
        <div className="text-3xl font-semibold text-teal-400 tracking-wide">
          Menu
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-6 px-4 space-y-3">
        <ul>
          <Link
            to="/register"
            className="flex items-center space-x-4 p-3 rounded-lg text-lg font-medium hover:bg-teal-600 transition duration-200"
          >
            <PlusCircle className="text-xl text-teal-400" />
            <span>register</span>
          </Link>
          {isLoggedIn && isAdmin && (
            <>
              <li>
                <Link
                  to="/add-book"
                  className="flex items-center space-x-4 p-3 rounded-lg text-lg font-medium hover:bg-teal-600 transition duration-200"
                >
                  <PlusCircle className="text-xl text-teal-400" />
                  <span>Add Books</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/books"
                  className="flex items-center space-x-4 p-3 rounded-lg text-lg font-medium hover:bg-teal-600 transition duration-200"
                >
                  <Book className="text-xl text-teal-400" />
                  <span>Books Added</span>
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li>
                <Link
                  to="/search-book"
                  className="flex items-center space-x-4 p-3 rounded-lg text-lg font-medium hover:bg-teal-600 transition duration-200"
                >
                  <Search className="text-xl text-teal-400" />
                  <span>Search Books</span>
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-4 p-3 rounded-lg text-lg font-medium hover:bg-red-600 transition duration-200"
                >
                  <LogOut className="text-xl text-red-400" />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <li>
              <Link
                to="/login"
                className="flex items-center space-x-4 p-3 rounded-lg text-lg font-medium hover:bg-teal-600 transition duration-200"
              >
                <User className="text-xl text-teal-400" />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 bg-gray-800 text-center text-sm border-t border-gray-700">
        <p>© 2025 Library Management</p>
      </div>
    </div>
  );
}
