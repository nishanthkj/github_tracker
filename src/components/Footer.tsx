import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-blue-800 text-white py-2 mt-4 shadow-lg">
      <div className="container mx-auto px-6 text-center">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com/mehul-m-prajapati" target="_blank" rel="noreferrer">
            <FaGithub className="text-2xl hover:text-gray-400 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-2xl hover:text-gray-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-2xl hover:text-gray-400 transition" />
          </a>
        </div>

        {/* Credit Section */}
        <p className="text-sm md:text-base font-medium">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/mehul-m-prajapati"
            target="_blank"
            rel="noreferrer"
            className="font-semibold hover:text-gray-400 transition"
          >
            Mehul
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/mehul-m-prajapati/github_tracker"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center hover:text-gray-400 transition"
          >
            <FaGithub className="h-5 w-5 mr-1" />
            GitHub Tracker
          </a>
        </p>

        {/* Additional Info */}
        <p className="text-sm mt-4">
          <a
            href="/terms"
            className="text-red-500 hover:underline transition"
          >
            Terms of Use
          </a>{" "}
          | &copy; 2024 GitHub Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
