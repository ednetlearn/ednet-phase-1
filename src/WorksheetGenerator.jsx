import React, { useEffect, useState } from 'react';

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
  const [generatedWorksheet, setGeneratedWorksheet] = useState(null);

  // Change document title when the component mounts
  useEffect(() => {
    document.title = "Worksheet Generator - EdNet"; // Dynamic title
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder logic for worksheet generation
    setGeneratedWorksheet(['Sample question 1', 'Sample question 2']);
    setStatusMessage('Worksheet generated successfully!');
  };

  return (
    <div>
      <h2>Worksheet Generator</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for generating the worksheet */}
        <button type="submit">Generate Worksheet</button>
      </form>

      {statusMessage && <div>{statusMessage}</div>}

      {generatedWorksheet && (
        <div>
          <h3>Generated Worksheet</h3>
          <ul>
            {generatedWorksheet.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorksheetGenerator;
