import { Routes, Route, Navigate } from 'react-router-dom';  // Import Routes and Route from react-router-dom
import Navbar from './components/Navbar';  // Import Navbar
import Footer from './components/Footer';  // Import Footer
import Home from './pages/Home/Home';  // Import the Home (Dashboard) component
import About from './pages/About/About';  // Import the About component
import Contact from './pages/Contact/Contact';  // Import the Contact component

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

          {/* Route for Home (Dashboard) */}
          <Route path="/home" element={<Home />} />

          {/* Route for About */}
          <Route path="/about" element={<About />} />

          {/* Route for Contact */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
