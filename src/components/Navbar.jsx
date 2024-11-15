import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-2xl font-bold hover:text-gray-300 cursor-pointer">
          <Link to="/">GitHub Tracker</Link>
        </div>

        {/* Links/Buttons */}
        <div className="space-x-6">
          <Link
            to="/dashboard"
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
