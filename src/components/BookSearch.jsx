import React, { useState } from 'react';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setBooks(data.docs.slice(0, 10)); // limit to top 10 results
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 ml-64 pt-24">
      <h1 className="text-3xl font-bold text-teal-400 mb-6">📚 Search Books</h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={searchBooks}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && books.length > 0 && (
        <ul className="space-y-6">
          {books.map((book, idx) => (
            <li key={idx} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-teal-300">{book.title}</h2>
              <p className="text-gray-300">Author: {book.author_name?.join(', ') || 'Unknown'}</p>
              <p className="text-gray-400">First Published: {book.first_publish_year || 'N/A'}</p>
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt="Book Cover"
                  className="w-24 mt-4 rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookSearch;
