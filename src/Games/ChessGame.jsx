import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChessGame() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Chess Game</h2>
      <p>This is where the Chess game will be developed.</p>

      <button
        onClick={() => navigate('/games')}
        style={{ marginTop: 20, padding: '8px 16px' }}
      >
        Back to Games
      </button>
    </div>
  );
}
