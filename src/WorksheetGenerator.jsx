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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (validateForm()) {
      setStatusMessage('Worksheet generated successfully!');
      setStatusType('success');
      // You can perform any additional logic here (e.g., API calls, generating worksheets)
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
    </div>
  );
};

export default WorksheetGenerator;
