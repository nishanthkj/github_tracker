// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Home Page Content */}
      <main className="flex-grow">
        <section id="home" className="bg-blue-100 py-32 px-4 md:px-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
              Welcome to GitHub Tracker
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              This is the home page. Start building your app with React and
              Tailwind CSS. Tailwind makes it easy to style your components with
              utility-first classes.
            </p>
            <div className="mt-8">
              <a
                href="#about"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
