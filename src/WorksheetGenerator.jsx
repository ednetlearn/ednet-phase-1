import React, { useState } from 'react';

const boardTopics = {
  // ... (paste your full boardTopics object here)
};

const WorksheetGenerator = () => {
  const [board, setBoard] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [topics, setTopics] = useState([]);

  // Handle board change
  const handleBoardChange = (e) => {
    const selectedBoard = e.target.value;
    setBoard(selectedBoard);
    setSubject('');
    setGrade('');
    setTopics([]);
  };

  // Handle subject change
  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);
    setGrade('');
    setTopics([]);
  };

  // Handle grade change
  const handleGradeChange = (e) => {
    const selectedGrade = e.target.value;
    setGrade(selectedGrade);

    // Fetch topics for the selected board, subject, and grade
    if (
      board &&
      subject &&
      grade !== ''
    ) {
      // Check if subject contains grade level subtopics (like EVS, Geography)
      const boardData = boardTopics[board];
      if (!boardData) return setTopics([]);

      const subjectData = boardData[subject];
      if (!subjectData) return setTopics([]);

      if (typeof subjectData === 'object' && subjectData !== null) {
        // Subject has grade level topics (like EVS, Geography)
        setTopics(subjectData[selectedGrade] || []);
      } else {
        // Subject has direct topic array (like Math, English)
        setTopics(subjectData || []);
      }
    } else {
      setTopics([]);
    }
  };

  // Helper to get grades list from boardTopics object (only for subjects with grade keys)
  const getGrades = () => {
    if (board && subject) {
      const subjectData = boardTopics[board]?.[subject];
      if (typeof subjectData === 'object' && subjectData !== null) {
        return Object.keys(subjectData);
      }
    }
    return [];
  };

  return (
    <div>
      <h2>Worksheet Generator</h2>

      {/* Board Dropdown */}
      <label>
        Select Board:
        <select value={board} onChange={handleBoardChange}>
          <option value="">--Select Board--</option>
          {Object.keys(boardTopics).map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </label>

      {/* Subject Dropdown */}
      <label>
        Select Subject:
        <select
          value={subject}
          onChange={handleSubjectChange}
          disabled={!board}
        >
          <option value="">--Select Subject--</option>
          {board &&
            Object.keys(boardTopics[board]).map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
        </select>
      </label>

      {/* Grade Dropdown */}
      <label>
        Select Grade:
        <select
          value={grade}
          onChange={handleGradeChange}
          disabled={!subject}
        >
          <option value="">--Select Grade--</option>
          {getGrades().map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </label>

      {/* Topics List */}
      <div>
        <h3>Topics:</h3>
        {topics.length > 0 ? (
          <ul>
            {topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        ) : (
          <p>No topics available for selected options.</p>
        )}
      </div>
    </div>
  );
};

export default WorksheetGenerator;
