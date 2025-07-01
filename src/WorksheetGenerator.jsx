import React, { useState } from 'react';

// Static data for topics based on board and subject
const boardTopics = {
  CBSE: {
    Math: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Money'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Simple Sentences', 'Tenses', 'Prepositions', 'Comprehension'],
    Hindi: ['Vocabulary', 'Basic Grammar', 'Sentences'],
    EVS: ['Plants', 'Animals', 'Water', 'Transport', 'Our Helpers'],
  },
  ICSE: {
    Math: ['Addition', 'Subtraction', 'Shapes', 'Multiplication', 'Division'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Simple Sentences', 'Comprehension', 'Tenses'],
    Hindi: ['Simple Sentences', 'Vocabulary', 'Pronouns'],
    EVS: ['Food', 'Clothes', 'Home', 'Transport', 'Environment'],
  },
  NCERT: {
    Math: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Money'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Simple Sentences', 'Tenses', 'Prepositions', 'Comprehension'],
    Hindi: ['Vocabulary', 'Basic Grammar', 'Sentences'],
    EVS: ['Plants', 'Animals', 'Water', 'Transport', 'Our Helpers'],
  },
  Cambridge: {
    Math: ['Calculus', 'Algebra', 'Statistics'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Literature', 'Writing Skills'],
    Hindi: ['Grammar', 'Comprehension', 'Literature'],
    EVS: ['Geography', 'History', 'Biology'],
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
      Hindi: ['What is a noun?', 'Define a verb in Hindi.', 'Write a short essay on "My Family" in Hindi.'],
      EVS: ['Describe the water cycle.', 'What are the basic needs of animals?', 'What is photosynthesis?'],
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
            <option value="primary">Grade 1</option>
            <option value="middle">Grade 2</option>
            <option value="high">
