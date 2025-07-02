// ScanMyBook.jsx
import React, { useState } from 'react';
// Uncomment and install tesseract.js for OCR functionality
// import { createWorker } from 'tesseract.js';

function ScanMyBook({ onTextExtracted }) {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Uncomment and configure Tesseract worker if integrating OCR
  /*
  const worker = createWorker({
    logger: m => console.log(m), // optional logger
  });
  */

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setOcrText('');
    setError(null);

    if (!selectedFile) return;

    // For now, simulate extracted text (replace this with actual OCR)
    // onTextExtracted("This is sample extracted text from the scanned book.");

    // --- Uncomment below to enable OCR with Tesseract.js ---
    /*
    setProcessing(true);
    try {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const {
        data: { text },
      } = await worker.recognize(selectedFile);

      setOcrText(text);
      onTextExtracted(text);

      await worker.terminate();
    } catch (err) {
      console.error(err);
      setError('Failed to extract text from image.');
    } finally {
      setProcessing(false);
    }
    */
  };

  // For demo without OCR, simulate extraction after file select
  const simulateExtraction = () => {
    const simulatedText =
      'This is a simulated extracted text from the uploaded syllabus or textbook.';
    setOcrText(simulatedText);
    onTextExtracted(simulatedText);
  };

  return (
    <div>
      <h2>Scan My Book</h2>
      <input
        type="file"
        accept=".pdf,image/*"
        onChange={handleFileChange}
      />
      {/* Demo button to simulate OCR extraction */}
      {file && !processing && !ocrText && (
        <button onClick={simulateExtraction} style={{ marginTop: 10 }}>
          Simulate Text Extraction
        </button>
      )}

      {processing && <p>Processing OCR, please wait...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {ocrText && (
        <div style={{ marginTop: 20 }}>
          <h4>Extracted Text Preview:</h4>
          <textarea
            rows={8}
            style={{ width: '100%', whiteSpace: 'pre-wrap' }}
            value={ocrText}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default ScanMyBook;
