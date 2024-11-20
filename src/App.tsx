
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgressBar from './components/ScrollProgressBar';

import Router from "./Routes/Router";

function App() {
  return (

      <div>
        <ScrollProgressBar/>

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
