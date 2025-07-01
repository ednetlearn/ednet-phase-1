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

const activityOptions = [
  "Logical Reasoning",
  "Chess Puzzles",
  "Word Puzzles",
  "Number Games",
  "Brain Teasers",
  "Mazes",
  "Colour the Picture",
  "Solve the Riddle",
  "Block Coding Puzzles"
];

export default function WorksheetGenerator() {
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [topics, setTopics] = useState([]);
  const [customTopic, setCustomTopic] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(10);
  const [activityPreview, setActivityPreview] = useState('');

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
      setTopics(subjectData);
    } else if (typeof subjectData === 'object') {
      setTopics(subjectData[selectedGrade] || []);
    } else {
      setTopics([]);
    }
  }, [selectedBoard, selectedSubject, selectedGrade]);

  useEffect(() => {
    if (!selectedActivity) {
      setActivityPreview('');
      return;
    }
    const preview = getSamplePreview(selectedActivity);
    setActivityPreview(preview);
  }, [selectedActivity]);

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
    setSelectedSubject('');
    setSelectedGrade('');
    setTopics([]);
    setCustomTopic('');
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedGrade('');
    setTopics([]);
    setCustomTopic('');
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
    setCustomTopic('');
  };

  const handleCustomTopicChange = (e) => {
    setCustomTopic(e.target.value);
  };

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
  };

  const getSamplePreview = (activity) => {
    switch (activity) {
      case "Logical Reasoning":
        return "Sample: If all cats are animals and some animals are dogs, are all cats dogs?";
      case "Chess Puzzles":
        return "Sample: White to move and checkmate in 2 moves.";
      case "Word Puzzles":
        return "Sample: Find the hidden word: _A_P_E";
      case "Number Games":
        return "Sample: What comes next in the sequence: 2, 4, 8, 16, ?";
      case "Brain Teasers":
        return "Sample: I speak without a mouth and hear without ears. What am I?";
      case "Mazes":
        return "Sample: Maze preview here (to be implemented)";
      case "Colour the Picture":
        return "Sample: Colour the butterfly image with given colours.";
      case "Solve the Riddle":
        return "Sample: What has keys but can't open locks?";
      case "Block Coding Puzzles":
        return "Sample: Arrange blocks to make the character move forward.";
      default:
        return "";
    }
  };

  const handleGenerate = () => {
    alert(`Generating ${numQuestions} questions for ${selectedActivity}${customTopic ? ` on topic "${customTopic}"` : ''} with a time limit of ${timeLimit} minutes.`);
    // TODO: integrate with generation API or logic
  };

  const subjects = selectedBoard ? Object.keys(boardTopics[selectedBoard]) : [];

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
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
        <label>
          Or Enter Custom Topic:
          <input
            type="text"
            value={customTopic}
            onChange={handleCustomTopicChange}
            placeholder="Type a custom topic..."
            style={{ marginLeft: 10, width: 300 }}
          />
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

      <hr style={{ marginTop: 40, marginBottom: 40 }} />

      <h2>Activity Generator</h2>

      <label>
        Select Activity:
        <select value={selectedActivity} onChange={handleActivityChange}>
          <option value="">--Select Activity--</option>
          {activityOptions.map((act) => (
            <option key={act} value={act}>{act}</option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: 10 }}>
        <label>
          Number of Questions:
          <input
            type="number"
            min="1"
            max="50"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>
          Time Limit (minutes):
          <input
            type="number"
            min="1"
            max="180"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Preview:</h3>
        <p>{activityPreview || "Select an activity to see a sample preview."}</p>
      </div>

      <button onClick={handleGenerate} disabled={!selectedActivity}>
        Generate
      </button>
    </div>
  );
}
