
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer

import Router from "./Routes/Router";

function App() {
  return (
    
      <div>
        {/* Navbar */}
        <Navbar /> {/* No modification required to Navbar */}
        {/* Main content */}
        <main className="flex-grow">
          <Router/>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    
  );
}

export default App;
