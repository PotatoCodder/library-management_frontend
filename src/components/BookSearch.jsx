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
      const rawBooks = await res.json();

      // Normalize isBorrowed to a boolean
      const books = rawBooks.map(book => ({
        ...book,
        isBorrowed: book.isBorrowed === 1
      }));

      // Filter only books that are NOT borrowed and match the query
      const filtered = books
        .filter(book => !book.isBorrowed)
        .filter(book => {
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

  const handleBorrow = async (book) => {
    const username = localStorage.getItem('user');

    if (!username) {
      alert('⚠️ You must be logged in to borrow a book.');
      return;
    }

    try {
      await fetch(`http://localhost:3001/books/borrow/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      await fetch(`http://localhost:3001/users/borrow/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookTitle: book.title })
      });

      alert(`✅ You borrowed "${book.title}"!`);
      handleSearch(); // refresh list
    } catch (error) {
      console.error('Borrow error:', error);
      alert('❌ Failed to borrow book.');
    }
  };

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setMessage('');
    }
  }, [query]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">
          Search Books
        </h2>

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
          <div
            className={`text-center mb-4 font-semibold ${
              isSuccess ? 'text-green-400' : 'text-red-400'
            }`}
          >
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
              <div className="flex-grow">
                <h3 className="text-teal-300 text-lg font-semibold">
                  {book.title}
                </h3>
                <p className="text-gray-300">by {book.author}</p>
                <p className="text-gray-400 text-sm">
                  Published: {book.year}
                </p>
              </div>
              <button
                onClick={() => handleBorrow(book)}
                className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Borrow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
