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

  const [selectedTopic, setSelectedTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');

  // Update topics when selection changes
  useEffect(() => {
    if (!selectedBoard || !selectedSubject || !selectedGrade) {
      setTopics([]);
      setSelectedTopic('');
      setCustomTopic('');
      return;
    }
    const board = boardTopics[selectedBoard];
    if (!board) {
      setTopics([]);
      setSelectedTopic('');
      setCustomTopic('');
      return;
    }

    const subjectData = board[selectedSubject];
    if (!subjectData) {
      setTopics([]);
      setSelectedTopic('');
      setCustomTopic('');
      return;
    }

    if (Array.isArray(subjectData)) {
      setTopics(subjectData);
    } else if (typeof subjectData === 'object') {
      setTopics(subjectData[selectedGrade] || []);
    } else {
      setTopics([]);
    }
    setSelectedTopic('');
    setCustomTopic('');
  }, [selectedBoard, selectedSubject, selectedGrade]);

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
    setSelectedSubject('');
    setSelectedGrade('');
    setTopics([]);
    setSelectedTopic('');
    setCustomTopic('');
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedGrade('');
    setTopics([]);
    setSelectedTopic('');
    setCustomTopic('');
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
    setSelectedTopic('');
    setCustomTopic('');
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setCustomTopic('');
  };

  const handleCustomTopicChange = (e) => {
    setCustomTopic(e.target.value);
    setSelectedTopic('');
  };

  // Get subjects for selected board
  const subjects = selectedBoard ? Object.keys(boardTopics[selectedBoard]) : [];

  // Determine which topic to use
  const topicToUse = customTopic.trim() || selectedTopic;

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

      {topics.length > 0 && (
        <>
          <div style={{ marginTop: 20 }}>
            <label>
              Select Topic:
              <select value={selectedTopic} onChange={handleTopicChange}>
                <option value="">--Select Topic--</option>
                {topics.map((topic, idx) => (
                  <option key={idx} value={topic}>{topic}</option>
                ))}
              </select>
            </label>

            <label style={{ marginLeft: 20 }}>
              Or enter your own topic:
              <input
                type="text"
                value={customTopic}
                placeholder="Type your topic here"
                onChange={handleCustomTopicChange}
                style={{ marginLeft: 10 }}
              />
            </label>
          </div>

          <div style={{ marginTop: 20 }}>
            <strong>Using Topic:</strong> {topicToUse || <em>Please select or enter a topic above.</em>}
          </div>
        </>
      )}

      {!topics.length && selectedBoard && selectedSubject && selectedGrade && (
        <p style={{ marginTop: 20 }}>No topics available for the selected board, subject, and grade.</p>
      )}
    </div>
  );
}
