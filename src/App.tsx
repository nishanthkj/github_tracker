
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer

import Router from "./Routes/Router";

function App() {
  return (

      <div>
        {/* Navbar */}
        <Navbar />

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
