// src/components/Footer.jsx
import React from 'react';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon from react-icons

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-pink-800 to-red-800 text-white py-8 mt-16 shadow-lg">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base font-medium flex justify-center items-center space-x-2">
          <span>Made with ❤️ by <span className="font-semibold">Mehul</span></span>
          <span>|</span>
          <a
            href="https://github.com/mehul-m-prajapati/github_tracker"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center text-purple-400 hover:text-purple-600 transition duration-300 ease-in-out"
          >
            <FaGithub className="h-5 w-5 mr-2" /> {/* Using FaGithub icon */}
            GitHub Tracker
          </a>
        </p>
        <p className="text-sm md:text-base font-light mt-2">
          &copy; 2024 <span className="font-semibold">My App</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
