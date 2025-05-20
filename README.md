DATABASE QUERY


// e paste nyo to sa phpmyadmin sa sql \\
CREATE DATABASE librarymanagement;
USE librarymanagement;

CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO admin (username, password) 
VALUES ('admin', 'admin');

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  year_published YEAR,
  cover LONGBLOB
);

use librarymanagement;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);




docs

This Library Management System is a full-stack web application built using modern technologies. It allows users and admins to search, add, update, and delete books, with user authentication features like login/logout, and interfaces that are both responsive and interactive.

This system leverages the power of RESTful APIs, connecting the frontend and backend layers, and is further enriched by third-party libraries and external book data via the OpenLibrary API.

🛠️ Tools & Technologies Used
🔹 Frontend – ReactJS
ReactJS: Main frontend framework for building component-based UI

React Router DOM: For routing between pages (Login, Dashboard, Add Books, etc.)

Lucide React: Icon library for clean, modern UI elements

Framer Motion: Animation library to enhance visual transitions and interactivity

Tailwind CSS (optional if used): For styling and layout if implemented

🔹 Backend – Node.js & Express
Node.js: Runtime for server-side JavaScript

Express.js: Web framework used to build the backend REST API

CORS: To allow frontend-backend communication across domains

body-parser: Middleware to parse JSON request bodies

dotenv: To manage environment variables securely

🔹 Database
MongoDB (or MySQL, based on your actual stack): To store user data, book records, etc.


🔹 External API
OpenLibrary.org API: Used for retrieving book information via external search queries

🔗 System Architecture
plaintext
Copy
Edit
[React Frontend]  <--->  [Express Backend/API]  <--->  [Database]
       ↑
     (Search books via OpenLibrary API)
▶️ REST API Strategy:
The system follows a RESTful architecture, using HTTP methods to perform CRUD operations:

GET – Fetch books / users / session info

POST – Add new books or user registration

PUT – Update book details or user profile

DELETE – Remove books from the database

🔒 Authentication & Authorization
Login/Logout System for both users and admin

localStorage is used to store login session data like isAdmin

Access control is applied to certain routes (e.g., only admins can add books)

📚 Book Search Strategy
⚠️ Why can't some added books be searched?
The book search feature does not search local books saved to the internal database. Instead, it depends entirely on the OpenLibrary.org public API.

🔎 So:

When searching a book, the query is sent to https://openlibrary.org/search.json?q=YourBookTitle

If the book exists in OpenLibrary’s database, it is returned

Locally added books won’t show up here unless OpenLibrary already has that data

✅ Features Implemented
🔐 User & Admin login/logout

📖 Add, Edit, Delete books (CRUD)

🔍 Book Search (via OpenLibrary)

💻 Full stack integration using REST APIs

🎨 Animated, icon-rich, user-friendly UI

🧾 Session management using localStorage

🧩 Modular codebase (components, routes, controllers)

📁 Folder Structure (Simplified)
pgsql
Copy
Edit
Library-Management_System/
├── client/ (React Frontend)
│   ├── src/
|   |---|context/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── server/ (Node Backend)
│   |
│   ├── node_modules/
│   |
│   └── server.js
├── README.md
🧪 Potential Future Improvements
✍️ Save local books and search both locally and externally

🔐 Implement JWT-based authentication

🌍 Add pagination, filters, and categories for books

🧾 Admin dashboard for managing users and logs

📦 Use a package like axios for cleaner API calls on frontend

