import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MathQuiz() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Math Quiz</h2>
      <p>This is where math quizzes will be available.</p>

      <button
        onClick={() => navigate('/games')}
        style={{ marginTop: 20, padding: '8px 16px' }}
      >
        Back to Games
      </button>
    </div>
  );
}
