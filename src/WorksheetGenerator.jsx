import React, { useState, useEffect } from 'react';

// Static data for topics based on board and subject
const boardTopics = {
  CBSE: {
    Math: ['Algebra', 'Geometry', 'Trigonometry'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Grammar', 'Literature'],
    Hindi: ['Grammar', 'Comprehension', 'Literature'], // Added Hindi
  },
  ICSE: {
    Math: ['Algebra', 'Geometry', 'Calculus'],
    Science: ['Physics', 'Chemistry', 'Environmental Science'],
    English: ['Writing Skills', 'Literature'],
    Hindi: ['Grammar', 'Comprehension', 'Literature'], // Added Hindi
  },
  NCERT: {
    Math: ['Number Theory', 'Calculus', 'Algebra'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Grammar', 'Comprehension'],
    Hindi: ['Grammar', 'Comprehension', 'Literature'], // Added Hindi
  },
  Cambridge: {
    Math: ['Calculus', 'Algebra', 'Statistics'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Literature', 'Writing Skills'],
    Hindi: ['Grammar', 'Comprehension', 'Literature'], // Added Hindi
  },
};

const WorksheetGenerator = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    board: '',
    subject: '',
    topic: '',
    date: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'
  const [generatedWorksheet, setGeneratedWorksheet] = useState(null);
  const [topics, setTopics] = useState([]); // Holds dynamic topics based on board and subject

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Grade change and update subject options dynamically
  const handleGradeChange = (e) => {
    const gradeSelected = e.target.value;
    setFormData({
      ...formData,
      grade: gradeSelected,
      subject: '', // Reset subject and topic
      topic: '',
    });
  };

  // Handle board change and update topics dynamically
  const handleBoardChange = (e) => {
    const boardSelected = e.target.value;
    setFormData({
      ...formData,
      board: boardSelected,
      subject: '', // Reset subject and topic
      topic: '',
    });

    // Set topics based on the selected board
    if (boardSelected) {
      setTopics(Object.keys(boardTopics[boardSelected] || []));
    } else {
      setTopics([]);
    }
  };

  // Handle subject change and update topics dynamically
  const handleSubjectChange = (e) => {
    const subjectSelected = e.target.value;
    setFormData({
      ...formData,
      subject: subjectSelected,
      topic: '', // Reset topic
    });
  };

  // Validate form
  const validateForm = () => {
    const { studentName, grade, board, subject, topic, date } = formData;
    if (!studentName || !grade || !board || !subject || !topic || !date) {
      setStatusMessage('Please fill out all fields.');
      setStatusType('error');
      return false;
    }
    return true;
  };

  // Generate Sample Worksheet Questions
  const generateWorksheet = () => {
    const sampleQuestions = {
      Math: ['Solve for x: 2x + 5 = 15', 'What is 2 + 2?', 'Find the area of a rectangle'],
      Science: ['What is Newton\'s Second Law?', 'What is the chemical formula for water?', 'Describe the process of photosynthesis'],
      English: ['Define a verb.', 'Write a short story using the word "adventure".', 'What is the past tense of "run"?'],
      Hindi: ['What is a noun?', 'Define a verb in Hindi.', 'Write a short essay on "My Family" in Hindi.'], // Added sample Hindi questions
    };

    const { subject, topic } = formData;
    const questions = sampleQuestions[subject];

    if (questions) {
      setGeneratedWorksheet(questions);
      setStatusMessage('Worksheet generated successfully!');
      setStatusType('success');
    } else {
      setStatusMessage('Unable to generate worksheet. Please check the subject and topic.');
      setStatusType('error');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      generateWorksheet();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Worksheet Generator</h2>

      {/* Display Status Messages */}
      {statusMessage && (
        <div
          style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: statusType === 'success' ? '#4CAF50' : '#f44336',
            color: 'white',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          {statusMessage}
        </div>
      )}

      {/* Form to Generate Worksheet */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="studentName" style={{ display: 'block' }}>Student Name:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="grade" style={{ display: 'block' }}>Grade:</label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleGradeChange}
            style={{ padding: '8px', width: '100%' }}
          >
            <option value="">Select Grade</option>
            <option value="primary">Primary (1-5)</option>
            <option value="middle">Middle (6-8)</option>
            <option value="high">High (9-12)</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="board" style={{ display: 'block' }}>Board:</label>
          <select
            id="board"
            name="board"
            value={formData.board}
            onChange={handleBoardChange}
            style={{ padding: '8px', width: '100%' }}
          >
            <option value="">Select Board</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="NCERT">NCERT</option>
            <option value="Cambridge">Cambridge</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="subject" style={{ display: 'block' }}>Subject:</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleSubjectChange}
            style={{ padding: '8px', width: '100%' }}
          >
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option> {/* Added Hindi */}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="topic" style={{ display: 'block' }}>Topic:</label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            style={{ padding: '8px', width: '100%' }}
          >
            <option value="">Select Topic</option>
            {boardTopics[formData.board] && boardTopics[formData.board][formData.subject]?.map((topic, index) => (
              <option key={index} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="date" style={{ display: 'block' }}>Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <button type="submit" style={{ backgroundColor: '#0b76ef', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Generate Worksheet
        </button>
      </form>

      {/* Display Generated Worksheet */}
      {generatedWorksheet && (
        <div style={{ marginTop: '30px' }}>
          <h3>Generated Worksheet:</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {generatedWorksheet.map((question, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <p>{index + 1}. {question}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorksheetGenerator;
