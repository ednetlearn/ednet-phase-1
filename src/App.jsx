import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import GamesPage from './GamesPage';
import WorksheetGenerator from './WorksheetGenerator';
import ScanMyBook from './ScanMyBook';
import SyllabusUploader from './SyllabusUploader';  // Import the new component

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, backgroundColor: '#eee', marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 15 }}>Home</Link>
        <Link to="/games" style={{ marginRight: 15 }}>Games</Link>
        <Link to="/worksheets" style={{ marginRight: 15 }}>Worksheet Generator</Link>
        <Link to="/scan" style={{ marginRight: 15 }}>Scan My Book</Link>
        <Link to="/upload-syllabus" style={{ marginRight: 15 }}>Upload Syllabus</Link> {/* New link */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/worksheets" element={<WorksheetGenerator />} />
        <Route path="/scan" element={<ScanMyBook />} />
        <Route path="/upload-syllabus" element={<SyllabusUploader />} />  {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
