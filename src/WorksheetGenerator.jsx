import React, { useState, useEffect } from 'react';

const boardTopics = {
  CBSE: {
    Math: ['Multiplication', 'Division', 'Fractions', 'Geometry', 'Decimals'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Tenses', 'Comprehension', 'Adjectives', 'Nouns'],
    Hindi: ['Vocabulary', 'Sentences', 'Simple Grammar'],
    EVS: {
      Grade1: ['Parts of a plant', 'Types of animals', 'Life cycle of a butterfly', 'Basic understanding of body parts', 'Healthy food', 'Uses of water', 'Importance of air'],
      Grade2: ['Habitat and adaptation', 'Sense organs', 'Living and Non-living things', 'Properties of materials', 'Weather and seasons'],
      Grade3: ['Classification of animals', 'Structure of bones and muscles', 'States of matter', 'Climate and weather', 'Forces and motion'],
      // Add more grades as needed
    },
    Geography: {
      Grade1: ['Our Environment', 'My Family, My Neighborhood', 'Basic Landforms'],
      Grade2: ['Understanding Locations', 'Types of Environment', 'Water Bodies'],
      Grade3: ['Local Geography', 'Landforms and Water Bodies', 'Introduction to Maps'],
      // Add more grades as needed
    },
    ICT: ['Basic Computer Literacy', 'MS Office', 'Internet Safety', 'Scratch Programming', 'Python Programming'],
    SocialScience: ['History', 'Geography', 'Political Science (Civics)', 'Economics'],
  },
  ICSE: {
    Math: ['Multiplication', 'Division', 'Fractions', 'Measurement'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Vocabulary', 'Tenses', 'Comprehension'],
    Hindi: ['Simple Sentences', 'Grammar', 'Comprehension'],
    EVS: {
      Grade1: ['Parts of a plant', 'Life cycle of a butterfly', 'Basic understanding of body parts', 'Healthy food', 'Uses of water'],
      Grade2: ['Habitat and adaptation', 'Living and Non-living things', 'Properties of materials', 'Weather and seasons'],
      Grade3: ['Classification of animals', 'Structure of bones and muscles', 'States of matter', 'Climate and weather', 'Forces and motion'],
      // Add more grades as needed
    },
    Geography: {
      Grade1: ['Our Environment', 'My Family, My Neighborhood', 'Basic Landforms'],
      Grade2: ['Understanding Locations', 'Types of Environment', 'Water Bodies'],
      Grade3: ['Local Geography', 'Landforms and Water Bodies', 'Introduction to Maps'],
      // Add more grades as needed
    },
    ICT: ['Basic Computer Literacy', 'MS Office', 'Internet Safety', 'Scratch Programming', 'Python Programming'],
    SocialScience: ['Indian History', 'World History', 'Geography', 'Civics'],
  },
  // Add other boards similarly ...
};

const grades = ['Grade1', 'Grade2', 'Grade3', 'Grade4', 'Grade5', 'Grade6', 'Grade7', 'Grade8', 'Grade9', 'Grade10'];

export default function WorksheetGenerator() {
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [topics, setTopics] = useState([]);

  // Update topics when selection changes
  useEffect(() => {
    if (!selectedBoard || !selectedSubject || !selectedGrade) {
      setTopics([]);
      return;
    }
    const board = boardTopics[selectedBoard];
    if (!board) {
      setTopics([]);
      return;
    }

    const subjectData = board[selectedSubject];
    if (!subjectData) {
      setTopics([]);
      return;
    }

    if (Array.isArray(subjectData)) {
      // Subject with simple array of topics
      setTopics(subjectData);
    } else if (typeof subjectData === 'object') {
      // Subject with grade-wise topics
      setTopics(subjectData[selectedGrade] || []);
    } else {
      setTopics([]);
    }
  }, [selectedBoard, selectedSubject, selectedGrade]);

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
    setSelectedSubject('');
    setSelectedGrade('');
    setTopics([]);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedGrade('');
    setTopics([]);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  // Get subjects for selected board
  const subjects = selectedBoard ? Object.keys(boardTopics[selectedBoard]) : [];

  return (
    <div style={{ padding: 20 }}>
      <h2>Worksheet Generator</h2>

      <div>
        <label>
          Select Board:
          <select value={selectedBoard} onChange={handleBoardChange}>
            <option value="">--Select Board--</option>
            {Object.keys(boardTopics).map((board) => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 20 }}>
          Select Subject:
          <select value={selectedSubject} onChange={handleSubjectChange} disabled={!selectedBoard}>
            <option value="">--Select Subject--</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 20 }}>
          Select Grade:
          <select value={selectedGrade} onChange={handleGradeChange} disabled={!selectedSubject}>
            <option value="">--Select Grade--</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginTop: 20 }}>
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
}
