import React, { useState, useCallback } from 'react';

const gamesList = [
  { id: 1, name: 'Chess', enabled: true },
  { id: 2, name: 'Minecraft', enabled: true },
  { id: 3, name: 'Scratch', enabled: true }, // Enabled for now for testing
  { id: 4, name: 'Teachable Machine', enabled: true },
  { id: 5, name: 'Blockly', enabled: true },
  { id: 6, name: 'PictoBlox', enabled: true },
];

const parentalControlEnabled = true; // Toggle this to simulate parental controls

export default function ScanAndGameZoneUI() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [scanPreviewUrl, setScanPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection (from input or drop)
  const handleFile = useCallback((file) => {
    if (!file) return;

    setUploadedFile(file);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setScanPreviewUrl(url);
    } else {
      setScanPreviewUrl(null);
    }
  }, []);

  // On file input change
  const onFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // Drag and drop handlers
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Scan Your Book / Document</h2>

      {/* File upload / drag-drop area */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById('fileInput').click()}
        style={{
          border: '3px dashed #666',
          borderColor: dragActive ? '#0b76ef' : '#666',
          padding: 40,
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: 20,
          borderRadius: 8,
          color: dragActive ? '#0b76ef' : '#444',
          userSelect: 'none',
        }}
      >
        {uploadedFile ? (
          <p>
            Selected File: <strong>{uploadedFile.name}</strong>
          </p>
        ) : (
          <p>Click or drag & drop an image or PDF file here to upload</p>
        )}

        <input
          type="file"
          id="fileInput"
          accept="image/*,application/pdf"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>

      {/* Scan preview for images */}
      {scanPreviewUrl && (
        <div style={{ marginBottom: 20 }}>
          <h4>Scan Preview:</h4>
          <img
            src={scanPreviewUrl}
            alt="Scan preview"
            style={{ maxWidth: '100%', borderRadius: 4, boxShadow: '0 0 8px rgba(0,0,0,0.15)' }}
          />
        </div>
      )}

      {/* Game Zone List */}
      <h2>Game Zone</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {gamesList.map((game) => {
          const disabled = !game.enabled || !parentalControlEnabled;
          return (
            <li key={game.id} style={{ marginBottom: 12 }}>
              <button
                disabled={disabled}
                onClick={() => alert(`Launching ${game.name}...`)}
                style={{
                  padding: '8px 16px',
                  fontSize: 16,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  backgroundColor: disabled ? '#ccc' : '#0b76ef',
                  color: disabled ? '#666' : '#fff',
                  border: 'none',
                  borderRadius: 4,
                  transition: 'background-color 0.3s ease',
                }}
              >
                {game.name} {disabled && '(Disabled)'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
