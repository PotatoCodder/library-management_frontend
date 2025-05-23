import React, { useState, useEffect } from 'react';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('title');
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

      const filtered = books.filter((book) => {
        const targetValue = book[filterBy]?.toString().toLowerCase();
        return targetValue?.includes(query.toLowerCase());
      });

      if (filtered.length === 0) {
        setIsSuccess(false);
        setMessage('❌ No books found.');
        setResults([]);
      } else {
        setIsSuccess(true);
        setMessage(`✅ Found ${filtered.length} book(s)!`);
        setResults(filtered);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10 relative">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">Search Books</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder={`Search by ${filterBy}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Year</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded transition duration-200"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {message && (
          <div className={`text-center mb-4 font-semibold ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((book) => (
            <div
              key={book.id}
              className="bg-gray-700 rounded-lg shadow-md p-4 flex space-x-4 items-start"
            >
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded border border-gray-600"
                />
              ) : (
                <div className="w-20 h-28 bg-gray-600 flex items-center justify-center text-white text-xs rounded border border-gray-600">
                  No Image
                </div>
              )}
              <div>
                <h3 className="text-teal-300 text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-300">by {book.author}</p>
                <p className="text-gray-400 text-sm">Published: {book.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
