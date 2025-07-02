import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function GamesPage() {
  const [activityType, setActivityType] = useState('wordPuzzle'); // default selection
  const [topic, setTopic] = useState('');
  const [generatedActivities, setGeneratedActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic for activity generation.");
      return;
    }
    setLoading(true);
    setGeneratedActivities([]);

    // Create prompt for AI/backend
    const prompt = `Generate ${activityType} activities for the topic: ${topic}`;

    try {
      // Replace URL below with your backend endpoint
      const response = await fetch('http://localhost:5001/generate-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setGeneratedActivities(data.activities || []);
    } catch (error) {
      console.error('Error generating activities:', error);
      alert('Failed to generate activities. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>EdNet Games & Activities</h2>

      <div style={{ marginBottom: 20 }}>
        <div style={{ padding: 15, border: "1px solid #ccc", borderRadius: 5, marginBottom: 15 }}>
          <h3>Chess</h3>
          <p>Classic strategy game</p>
          <Link to="/games/chess">Play Now</Link>
        </div>

        <div style={{ padding: 15, border: "1px solid #ccc", borderRadius: 5, marginBottom: 15 }}>
          <h3>Coding Puzzle</h3>
          <p>Solve code challenges</p>
          <Link to="/games/codepuzzle">Play Now</Link>
        </div>

        <div style={{ padding: 15, border: "1px solid #ccc", borderRadius: 5 }}>
          <h3>Math Quiz</h3>
          <p>Practice math skills</p>
          <Link to="/games/mathquiz">Play Now</Link>
        </div>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <div>
        <h3>AI Activity Generator</h3>
        <label>
          Select Activity Type:{" "}
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            style={{ marginRight: 10 }}
          >
            <option value="wordPuzzle">Word Puzzle</option>
            <option value="maze">Maze</option>
            <option value="chessPuzzle">Chess Puzzle</option>
            <option value="codePuzzle">Code Puzzle</option>
          </select>
        </label>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic for activities"
          style={{ width: "60%", marginRight: 10, padding: 5 }}
        />

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Activities"}
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Generated Activities</h3>
        {generatedActivities.length === 0 ? (
          <p>No activities generated yet.</p>
        ) : (
          <ul>
            {generatedActivities.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
