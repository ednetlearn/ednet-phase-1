import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import the App.css file to apply styles
import './App.css';

import Home from './Home';
import GamesPage from './GamesPage';
import WorksheetGenerator from './WorksheetGenerator';
import ScanMyBook from './ScanMyBook';
import ScanAndGameZoneUI from './ScanAndGameZoneUI';  // Import new component

function App() {
  const [count, setCount] = useState(0); // State to manage the count

  // Increment the count
  const incrementCount = () => setCount(count + 1);

  // Reset the count to 0
  const resetCount = () => setCount(0);

  return (
    <Router>
      <div className="app-container">
        {/* Navigation */}
        <nav className="nav-bar">
          <Link to="/" className="nav-link">Home</Link> |{' '}
          <Link to="/games" className="nav-link">Games</Link> |{' '}
          <Link to="/worksheets" className="nav-link">Worksheet Generator</Link> |{' '}
          <Link to="/scan" className="nav-link">Scan My Book</Link> |{' '}
          <Link to="/scangamezone" className="nav-link">Scan & Game Zone</Link>  
        </nav>

        <div className="content-container">
          {/* Title and Button Section */}
          <div className="header-section">
            <h1>Welcome to EdNet!</h1>
            <p>Count is {count}</p> {/* Display count */}
            <div className="button-group">
              <button className="increment-btn" onClick={incrementCount}>Increment</button> {/* Increment button */}
              <button className="reset-btn" onClick={resetCount}>Reset</button> {/* Reset button */}
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/worksheets" element={<WorksheetGenerator />} />
            <Route path="/scan" element={<ScanMyBook />} />
            <Route path="/scangamezone" element={<ScanAndGameZoneUI />} />
          </Routes>

          {/* Scan and Game Zone UI Component */}
          <ScanAndGameZoneUI />
        </div>
      </div>
    </Router>
  );
}

export default App;
