import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import About from './pages/Home/About'; // Adjust the path if necessary
import Contact from './pages/Home/Contact'; // Adjust the path if necessary

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          {/* Redirect from root (/) to the dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Route to the Home (Dashboard) page */}
          <Route path="/dashboard" element={<Home />} />

          {/* Route to the About page */}
          <Route path="/about" element={<About />} />

          {/* Route to the Contact page */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
