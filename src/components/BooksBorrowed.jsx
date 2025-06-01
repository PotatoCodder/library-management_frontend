import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BooksBorrowed() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    let parsedUsername = '';

    try {
      const userObj = JSON.parse(storedUser);
      if (userObj?.username) parsedUsername = userObj.username;
    } catch {
      parsedUsername = storedUser;
    }

    if (!parsedUsername) {
      setError('User not logged in.');
      return;
    }

    setUsername(parsedUsername);

    axios
      .get(`http://localhost:3001/users/${parsedUsername}/borrowed-books`)
      .then((res) => {
        if (Array.isArray(res.data.borrowedBooks)) {
          setBorrowedBooks(res.data.borrowedBooks);
        } else {
          setError('Invalid data format.');
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Error fetching books');
      });
  }, []);

  const handleReturn = (bookTitle) => {
    axios
      .put(`http://localhost:3001/users/${username}/return-book`, { bookTitle })
      .then((res) => {
        // Remove the returned book from state
        setBorrowedBooks((prev) => prev.filter((title) => title !== bookTitle));
      })
      .catch((err) => {
        alert('Error returning book');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl text-center border border-gray-300">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">📚 Borrowed Books</h2>

        {error ? (
          <p className="text-red-500 font-medium">{error}</p>
        ) : borrowedBooks.length > 0 ? (
          <ul className="space-y-4">
            {borrowedBooks.map((title, index) => (
              <li
                key={index}
                className="bg-blue-50 text-gray-800 py-3 px-6 rounded-xl shadow flex justify-between items-center"
              >
                <span>{title}</span>
                <button
                  onClick={() => handleReturn(title)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Return
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No books borrowed yet.</p>
        )}
      </div>
    </div>
  );
}
