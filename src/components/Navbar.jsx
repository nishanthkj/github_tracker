// src/components/Navbar.jsx

function Navbar() {
  return (
    <nav className="bg-gray-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-2xl font-bold hover:text-gray-300 cursor-pointer">
          GitHub Tracker
        </div>

        {/* Links/Buttons */}
        <div className="space-x-6">
          <a
            href="/"
            className="text-lg font-medium hover:text-gray-300 transition-all"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-lg font-medium hover:text-gray-300 transition-all"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-lg font-medium hover:text-gray-300 transition-all"
          >
            Contact
          </a>
          <a
            href="/contributors"
            className="text-lg font-medium hover:text-gray-300 transition-all"
          >
            Contributors
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
