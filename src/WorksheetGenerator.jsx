import React, { useState } from 'react';

// Static data for topics based on board and subject
const boardTopics = {
  CBSE: {
    Math: ['Multiplication', 'Division', 'Geometry', 'Fractions', 'Decimals'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Tenses', 'Comprehension', 'Adjectives', 'Nouns'],
    Hindi: ['Vocabulary', 'Sentences', 'Simple Grammar'],
    EVS: ['Earth', 'Water', 'Plants', 'Animals', 'Human Body'],
  },
  ICSE: {
    Math: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Geometry'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Comprehension', 'Composition', 'Tenses'],
    Hindi: ['Simple Sentences', 'Grammar', 'Comprehension'],
    EVS: ['Earth', 'Water', 'Animals', 'Plants', 'Pollution'],
  },
  NCERT: {
    Math: ['Multiplication', 'Division', 'Geometry', 'Fractions', 'Decimals'],
    Science: ['Physics', 'Chemistry', 'Biology'],
    English: ['Tenses', 'Comprehension', 'Adjectives', 'Nouns'],
    Hindi: ['Vocabulary', 'Sentences', 'Simple Grammar'],
    EVS: ['Earth', 'Water', 'Plants', 'Animals', 'Human Body'],
  },
  International: {
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
      Math: {
        CBSE: ['Solve for x: 2x + 5 = 15', 'What is 2 + 2?', 'Find the area of a rectangle'],
        ICSE: ['Multiply 25 x 5', 'What is the square of 12?', 'Solve 100 ÷ 4'],
        International: ['Calc]()
