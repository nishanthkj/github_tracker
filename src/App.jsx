<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';  // Import Routes and Route from react-router-dom
import Navbar from './components/Navbar';  // Import Navbar
import Footer from './components/Footer';  // Import Footer
import Home from './pages/Home/Home';  // Import the Home (Dashboard) component
import About from './pages/About/About';  // Import the About component
import Contact from './pages/Contact/Contact';  // Import the Contact component
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import About from './pages/Home/About'; // Adjust the path if necessary
import Contact from './pages/Home/Contact'; // Adjust the path if necessary
>>>>>>> da11d282ff2b82196d95284949aed1f8fa36f56a

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar /> {/* No modification required to Navbar */}

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          {/* Redirect root (/) to the Home page */}
          <Route path="/" element={<Navigate to="/home" replace />} />

<<<<<<< HEAD
          {/* Route for Home (Dashboard) */}
          <Route path="/home" element={<Home />} />

          {/* Route for About */}
          <Route path="/about" element={<About />} />

          {/* Route for Contact */}
=======
          {/* Route to the Home (Dashboard) page */}
          <Route path="/dashboard" element={<Home />} />

          {/* Route to the About page */}
          <Route path="/about" element={<About />} />

          {/* Route to the Contact page */}
>>>>>>> da11d282ff2b82196d95284949aed1f8fa36f56a
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
