// App.jsx
import React, { useState } from 'react';
import ScanMyBook from './ScanMyBook';
import DynamicWorksheetGenerator from './DynamicWorksheetGenerator';

function App() {
  // Holds text extracted from scanned book or syllabus
  const [scannedText, setScannedText] = useState('');

  // Optional: function to clear scanned text from DynamicWorksheetGenerator UI
  const clearScannedText = () => {
    setScannedText('');
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1>EdNet Worksheet Generator</h1>

      {/* Scan My Book section */}
      <ScanMyBook onTextExtracted={setScannedText} />

      <hr style={{ margin: '40px 0' }} />

      {/* Worksheet Generator section */}
      <DynamicWorksheetGenerator
        scannedText={scannedText}
        onClearScannedText={clearScannedText}
      />
    </div>
  );
}

export default App;
