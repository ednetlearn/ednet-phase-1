import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import CombinedWorksheetGenerator from './CombinedWorksheetGenerator';
import GamesPage from './GamesPage';
import ScanMyBook from './ScanMyBook';

// Import game components with correct casing for folder "Games"
import ChessGame from './Games/ChessGame.jsx';
import CodingPuzzle from './Games/CodingPuzzle.jsx';
import MathQuiz from './Games/MathQuiz.jsx';

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, background: '#eee', marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 15 }}>Worksheet Generator</Link>
        <Link to="/games" style={{ marginRight: 15 }}>Games</Link>
        <Link to="/scan">Scan My Book</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CombinedWorksheetGenerator />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/chess" element={<ChessGame />} />
        <Route path="/games/codingpuzzle" element={<CodingPuzzle />} />
        <Route path="/games/mathquiz" element={<MathQuiz />} />
        <Route path="/scan" element={<ScanMyBook />} />
      </Routes>
    </Router>
  );
}

export default App;
