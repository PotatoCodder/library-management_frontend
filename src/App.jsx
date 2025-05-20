import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import your Navbar component
import Sidebar from './components/Sidebar'; // Import your Sidebar component
import BooksAdded from './components/BooksAdded'; // Example route component
import AddBooks from './components/AddBooks'; // Example route component
import BookSearch from './components/BookSearch';
import HeroSection from './components/HeroSection';
import AdminLogin from './components/AdminLogin';
import Register from './components/RegisterUsers'

function App() {
  console.log(localStorage)
  return (
    <div className="flex">
      <Sidebar /> {/* Your Sidebar */}
      <div className="flex-grow">
        <Navbar /> {/* Your Navbar */}
        <Routes>
          <Route path='/' element={<HeroSection />}/>
          <Route path="/books" element={<BooksAdded />} />
          <Route path="/add-book" element={<AddBooks />} />
          <Route path="/search-book" element={<BookSearch />} />
          <Route path='/login' element={<AdminLogin />} />
          <Route path='/register' element={<Register />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
