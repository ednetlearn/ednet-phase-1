// DynamicWorksheetGenerator.jsx
import React, { useState, useEffect } from 'react';

function DynamicWorksheetGenerator({ scannedText, onClearScannedText }) {
  const [manualTopic, setManualTopic] = useState('');
  const [board, setBoard] = useState('CBSE');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // When scannedText changes, clear manualTopic to avoid conflicts
  useEffect(() => {
    if (scannedText) {
      setManualTopic('');
    }
  }, [scannedText]);

  const generatePrompt = () => {
    if (scannedText) {
      return `Generate worksheet questions based on the following textbook content for board ${board}:\n\n${scannedText}`;
    }
    if (manualTopic.trim() !== '') {
      return `Generate worksheet questions for the topic "${manualTopic}" for board ${board}.`;
    }
    return '';
  };

  const handleGenerate = async () => {
    const prompt = generatePrompt();
    if (!prompt) {
      alert('Please enter a topic or scan a book to generate worksheet.');
      return;
    }

    setLoading(true);
    setQuestions([]);
    try {
      const response = await fetch('http://localhost:5000/generate-worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error('Error generating worksheet:', error);
      alert('Failed to generate worksheet. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Worksheet Generator</h2>

      <label>
        Select Board:
        <select
          value={board}
          onChange={(e) => setBoard(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="State Board">State Board</option>
        </select>
      </label>

      {!scannedText && (
        <div style={{ marginTop: 10 }}>
          <label>
            Enter Topic:
            <input
              type="text"
              value={manualTopic}
              onChange={(e) => setManualTopic(e.target.value)}
              style={{ marginLeft: 10, width: '60%' }}
              placeholder="e.g. Photosynthesis"
            />
          </label>
        </div>
      )}

      {scannedText && (
        <div style={{ marginTop: 20 }}>
          <h4>Using Scanned Text for Worksheet Generation</h4>
          <textarea
            value={scannedText}
            readOnly
            rows={8}
            style={{ width: '100%', whiteSpace: 'pre-wrap' }}
          />
          <button
            onClick={() => {
              if (onClearScannedText) onClearScannedText();
            }}
            style={{ marginTop: 10 }}
          >
            Clear Scanned Text
          </button>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{ padding: '8px 16px', fontSize: 16 }}
        >
          {loading ? 'Generating...' : 'Generate Worksheet'}
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Generated Questions:</h3>
        {questions.length === 0 ? (
          <p>No questions generated yet.</p>
        ) : (
          <ol>
            {questions.map((q, idx) => (
              <li key={idx} style={{ marginBottom: 10 }}>
                {q}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default DynamicWorksheetGenerator;
