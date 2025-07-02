// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CombinedWorksheetGenerator from './CombinedWorksheetGenerator';
import GamesPage from './GamesPage';
import ChessGame from './games/ChessGame';
import CodingPuzzle from './games/CodingPuzzle';
import MathQuiz from './games/MathQuiz';

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
