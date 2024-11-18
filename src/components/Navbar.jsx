import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold hover:text-gray-300 cursor-pointer">
          GitHub Tracker
        </div>

        <div className="md:hidden mt-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col space-y-[5px] items-center group"
          >
            <span
              className={`block h-[3px] w-full bg-white rounded-lg transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-[3px] w-full bg-white rounded-lg transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-[3px] w-full bg-white rounded-lg transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        <div className="hidden md:flex space-x-6">
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

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-4 px-6 py-4">
            <a
              href="#home"
              className="block text-lg font-medium hover:text-gray-300 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-lg font-medium hover:text-gray-300 transition-all"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-lg font-medium hover:text-gray-300 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
