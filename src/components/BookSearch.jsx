import React, { useState, useEffect } from 'react';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:3001/books');
      const books = await res.json();

      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length === 0) {
        setIsSuccess(false);
        setMessage('❌ No books found.');
      } else {
        setResults(filtered);
        setIsSuccess(true);
        setMessage(`✅ Found ${filtered.length} book(s)!`);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setIsSuccess(false);
      setMessage('❌ Failed to fetch books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setMessage('');
    }
  }, [query]);

  const handleOkClick = () => {
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10 relative">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">Search Books</h2>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter book title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-r transition duration-200"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((book) => (
            <div
              key={book.id}
              className="bg-gray-700 rounded-lg shadow-md p-4 flex space-x-4 items-start"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-20 h-28 object-cover rounded border border-gray-600"
              />
              <div>
                <h3 className="text-teal-300 text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-300">by {book.author}</p>
                <p className="text-gray-400 text-sm">Published: {book.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <p className={`mb-4 font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
            <button
              onClick={handleOkClick}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
