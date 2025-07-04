import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import GamesPage from './Pages/GamesPage';
import WorksheetGenerator from './Pages/WorksheetGenerator';
import ScanAndGameZoneUI from './Pages/ScanAndGameZoneUI';
import LoginAccount from './Pages/LoginAccount';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/games">Games</Link> |{' '}
        <Link to="/worksheets">Worksheet Generator</Link> |{' '}
        <Link to="/scan">Scan & Game Zone</Link> |{' '}
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/worksheets" element={<WorksheetGenerator />} />
        <Route path="/scan" element={<ScanAndGameZoneUI />} />
        <Route path="/login" element={<LoginAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
