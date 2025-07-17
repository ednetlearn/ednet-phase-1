import React, { useState } from "react";

export default function SyllabusUploader() {
  const [uploadedText, setUploadedText] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulated extraction text for now
    const simulatedExtractedText = "This is the extracted syllabus text from the uploaded file.";
    setUploadedText(simulatedExtractedText);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Upload Syllabus / Scan My Book</h2>
      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      {uploadedText && (
        <textarea
          style={{ width: "100%", height: 100, marginTop: 12 }}
          value={uploadedText}
          readOnly
        />
      )}
    </div>
  );
}

