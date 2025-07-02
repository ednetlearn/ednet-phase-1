
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScanMyBook from './ScanMyBook';
import DynamicWorksheetGenerator from './DynamicWorksheetGenerator';
import CombinedWorksheetGenerator from './CombinedWorksheetGenerator.jsx';
import GamesPage from './GamesPage.jsx';
import ChessGame from './games/ChessGame.jsx';
import CodingPuzzle from './games/CodingPuzzle.jsx';
import MathQuiz from './games/MathQuiz.jsx';


function App() {
  return (
    <Router>
      <nav style={{ padding: 10, background: '#eee', marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 15 }}>Worksheet Generator</Link>
        <Link to="/games">Games</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CombinedWorksheetGenerator />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/chess" element={<ChessGame />} />
        <Route path="/games/coding-puzzle" element={<CodingPuzzle />} />
        <Route path="/games/math-quiz" element={<MathQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
