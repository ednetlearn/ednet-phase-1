// src/GamesPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ActivityGenerator Component (inline here or put in separate file)
function ActivityGenerator() {
  const [topic, setTopic] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateActivities = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }
    setLoading(true);
    setActivities([]);

    try {
      const response = await fetch('http://localhost:5001/generate-worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Generate fun learning activities for the topic: ${topic}` }),
      });
      const data = await response.json();
      setActivities(data.questions || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate activities');
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 40, padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h3>AI Activity Generator</h3>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic for activities"
        style={{ width: '70%', padding: 8, marginRight: 8 }}
      />
      <button onClick={generateActivities} disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? 'Generating...' : 'Generate Activities'}
      </button>

      {activities.length > 0 && (
        <ul style={{ marginTop: 20 }}>
          {activities.map((activity, index) => (
            <li key={index} style={{ marginBottom: 8 }}>
              {activity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const gamesList = [
  { id: 1, name: 'Chess', description: 'Classic strategy game', url: '/games/chess' },
  { id: 2, name: 'Coding Puzzle', description: 'Solve code challenges', url: '/games/coding-puzzle' },
  { id: 3, name: 'Math Quiz', description: 'Practice math skills', url: '/games/math-quiz' },
  // Add more games here
];

function GamesPage() {
  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>EdNet Games & Activities</h2>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {gamesList.map((game) => (
          <li
            key={game.id}
            style={{
              marginBottom: 16,
              border: '1px solid #ccc',
              padding: 12,
              borderRadius: 6,
            }}
          >
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <Link to={game.url}>Play Now</Link>
          </li>
        ))}
      </ul>

      {/* Integrated AI Activity Generator */}
      <ActivityGenerator />
    </div>
  );
}

export default GamesPage;
