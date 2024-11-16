import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-2xl font-bold hover:text-gray-300 cursor-pointer">
<<<<<<< HEAD
          GitHub Tracker
=======
          <Link to="/">GitHub Tracker</Link>
>>>>>>> da11d282ff2b82196d95284949aed1f8fa36f56a
        </div>

        {/* Links/Buttons */}
        <div className="space-x-6">
          <Link
<<<<<<< HEAD
            to="/home"
=======
            to="/dashboard"
>>>>>>> da11d282ff2b82196d95284949aed1f8fa36f56a
            className="text-lg font-medium hover:text-gray-300 transition-all"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg font-medium hover:text-gray-300 transition-all"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg font-medium hover:text-gray-300 transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
