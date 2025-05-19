import React, { useEffect, useState } from 'react';

export default function BooksAdded() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3001/books');
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const [editBook, setEditBook] = useState(null);
const [form, setForm] = useState({ title: '', author: '', year: '' });

const handleEdit = (book) => {
  setEditBook(book.id);
  setForm({ title: book.title, author: book.author, year: book.year });
};

const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this book?')) return;

  try {
    const res = await fetch(`http://localhost:3001/books/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  } catch (error) {
    console.error('Failed to delete book:', error);
  }
};

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3001/books/${editBook}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const updatedBook = { ...form, id: editBook };
        setBooks((prev) =>
          prev.map((b) => (b.id === editBook ? { ...b, ...updatedBook } : b))
        );
        setEditBook(null);
      }
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };


  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 ml-64 pt-24">
      <h1 className="text-3xl font-bold text-teal-400 mb-6">📚 Books Added</h1>

      {loading ? (
        <div className="text-center text-gray-300 text-lg">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">No books found in the database.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {books.map((book) => (
  <div
    key={book.id}
    className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center text-center relative"
  >
        {book.cover && (
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            className="w-32 h-48 object-cover rounded shadow mb-4"
          />
        )}
        <h2 className="text-xl font-semibold text-teal-300">{book.title}</h2>
        <p className="text-gray-300 mt-1">by {book.author}</p>
        <p className="text-gray-400 text-sm">Published: {book.year}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleEdit(book)}
            className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(book.id)}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ))}

    {editBook && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-left">
      <h2 className="text-2xl font-bold mb-4 text-teal-300">✏️ Edit Book</h2>

      <label className="block mb-2 text-gray-200">Title</label>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
      />

      <label className="block mb-2 text-gray-200">Author</label>
      <input
        type="text"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
      />

      <label className="block mb-2 text-gray-200">Year</label>
      <input
        type="number"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
        className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEditBook(null)}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}


        </div>
      )}
    </div>
  );
}
