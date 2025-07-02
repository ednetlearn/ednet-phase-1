import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { createWorker } from 'tesseract.js'; // Uncomment if using OCR

function ScanMyBook() {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /*
  const worker = createWorker({
    logger: m => console.log(m),
  });
  */

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setOcrText('');
    setError(null);

    if (!selectedFile) return;

    // For demo: simulate text extraction after file select
    // Replace with actual OCR logic if desired
    setTimeout(() => {
      const simulatedText = 'This is a simulated extracted text from the uploaded syllabus or textbook.';
      setOcrText(simulatedText);
    }, 1000);

    // Uncomment below for real OCR with Tesseract.js
    /*
    setProcessing(true);
    try {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(selectedFile);
      setOcrText(text);
    } catch (err) {
      console.error(err);
      setError('Failed to extract text from image.');
    } finally {
      setProcessing(false);
      await worker.terminate();
    }
    */
  };

  const handleUseExtractedText = () => {
    if (ocrText.trim()) {
      navigate('/worksheets', { state: { extractedText: ocrText } });
    } else {
      alert('No extracted text available.');
    }
  };

  return (
    <div>
      <h2>Scan My Book</h2>
      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      {processing && <p>Processing OCR, please wait...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ocrText && (
        <>
          <div style={{ marginTop: 20 }}>
            <h4>Extracted Text Preview:</h4>
            <textarea
              rows={8}
              style={{ width: '100%', whiteSpace: 'pre-wrap' }}
              value={ocrText}
              readOnly
            />
          </div>
          <button
            onClick={handleUseExtractedText}
            style={{ marginTop: 15 }}
          >
            Use Extracted Text in Worksheet Generator
          </button>
        </>
      )}
    </div>
  );
}

export default ScanMyBook;
