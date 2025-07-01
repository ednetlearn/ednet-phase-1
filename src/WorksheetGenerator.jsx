import React, { useState } from 'react';

const WorksheetGenerator = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    subject: '',
    topic: '',
    date: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'
  const [generatedWorksheet, setGeneratedWorksheet] = useState(null); // Holds generated worksheet

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form
  const validateForm = () => {
    const { studentName, subject, topic, date } = formData;
    if (!studentName || !subject || !topic || !date) {
      setStatusMessage('Please fill out all fields.');
      setStatusType('error');
      return false; // Validation failed
    }
    return true; // Validation successful
  };

  // Generate Sample Questions (mock data)
  const generateWorksheet = () => {
    // Sample questions based on subject and topic
    const sampleQuestions = {
      Math: {
        Algebra: [
          'Solve for x: 2x + 5 = 15',
          'Simplify: 3x - 4x + 7',
          'What is the value of x in the equation x + 9 = 16?',
        ],
        Geometry: [
          'Find the area of a circle with radius 5cm.',
          'What is the Pythagorean theorem?',
          'Solve for the missing angle in a triangle.',
        ],
      },
      Science: {
        Physics: [
          'What is Newton\'s First Law of Motion?',
          'Explain the concept of kinetic energy.',
          'What is the formula for speed?',
        ],
        Chemistry: [
          'What is the chemical formula for water?',
          'What is an acid-base reaction?',
          'Define the pH scale.',
        ],
      },
      English: {
        Grammar: [
          'What is a verb?',
          'Give an example of an irregular verb.',
          'Fill in the blank: "I ____ to the store."',
        ],
        Literature: [
          'Who wrote "Romeo and Juliet"?',
          'What is the theme of "The Great Gatsby"?',
          'Explain the plot of "To Kill a Mockingbird".',
        ],
      },
    };

    const { subject, topic } = formData;
    const questions = sampleQuestions[subject]?.[topic];

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

    // Validate form
    if (validateForm()) {
      generateWorksheet(); // Generate worksheet if valid
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
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
          <label htmlFor="studentName" style={{ display: 'block' }}>
            Student Name:
          </label>
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
          <label htmlFor="subject" style={{ display: 'block' }}>
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="topic" style={{ display: 'block' }}>
            Topic:
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="date" style={{ display: 'block' }}>
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#0b76ef',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Generate Worksheet
        </button>
      </form>

      {/* Display generated worksheet questions */}
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
