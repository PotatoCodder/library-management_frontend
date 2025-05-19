import React, { useState } from 'react';

export default function AddBooks() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !year || !cover) {
      setMessage('Please fill out all fields and upload a cover image.');
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('year', year);
    formData.append('cover', cover);

    try {
      const res = await fetch('http://localhost:3001/add-book', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      setMessage(data.message || 'Book added successfully!');
      setShowModal(true);

      // Reset form
      setTitle('');
      setAuthor('');
      setYear('');
      setCover(null);
      setCoverPreview(null);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
      setShowModal(true);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 ml-64 pt-24">
      <h1 className="text-3xl font-bold text-teal-400 mb-4">📚 Add a New Book</h1>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white text-black w-96 max-w-full rounded-lg shadow-lg p-6 relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold focus:outline-none"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">📢 Message</h2>
            <p className="mb-6 text-base">{message}</p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 max-w-xl mx-auto space-y-6"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-gray-300">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Year Published */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-gray-300">Year Published</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
            className="p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Book Cover Upload */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-gray-300">Book Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
          />
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover Preview"
              className="mt-4 w-32 h-auto rounded shadow-md border border-gray-600"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
