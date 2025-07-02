import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import CombinedWorksheetGenerator from './CombinedWorksheetGenerator';
import GamesPage from './GamesPage';
import ScanMyBook from './ScanMyBook';

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, backgroundColor: '#eee', marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 15 }}>Games</Link>
        <Link to="/worksheets" style={{ marginRight: 15 }}>Worksheet Generator</Link>
        <Link to="/scan">Scan My Book</Link>
      </nav>

      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/worksheets" element={<CombinedWorksheetGenerator />} />
        <Route path="/scan" element={<ScanMyBook />} />
      </Routes>
    </Router>
  );
}

export default App;
