import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CodingPuzzle() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Coding Puzzle</h2>
      <p>This is where coding puzzles and challenges will appear.</p>

      <button
        onClick={() => navigate('/games')}
        style={{ marginTop: 20, padding: '8px 16px' }}
      >
        Back to Games
      </button>
    </div>
  );
}
