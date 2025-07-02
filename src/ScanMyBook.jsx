import React, { useState } from "react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" },
  { code: "kn", name: "Kannada" },
  { code: "mr", name: "Marathi" },
  { code: "bn", name: "Bengali" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  // add more if needed
];

export default function ScanMyBookTranslation() {
  const [extractedText, setExtractedText] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [step, setStep] = useState(1);

  // Replace this with your actual OCR text extraction logic or pass as prop
  const handleExtractText = () => {
    // demo text for now
    const demoText = `This is sample extracted text from OCR.\nYou can replace this with your OCR output.`;
    setExtractedText(demoText);
  };

  const handleTranslate = async () => {
    if (!extractedText.trim()) return alert("No text to translate.");

    setIsTranslating(true);
    setTranslatedText("");

    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: extractedText,
          source: "en", // Assuming OCR extracts English; adjust if needed
          target: targetLang,
          format: "text",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Translation failed");

      const data = await response.json();
      setTranslatedText(data.translatedText);
      setStep(3); // Move to translated preview step
    } catch (error) {
      alert("Error during translation: " + error.message);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, fontFamily: "sans-serif" }}>
      <h2>Scan My Book - OCR & Translation Workflow</h2>

      {/* Step 1: Extract OCR Text */}
      {step === 1 && (
        <div>
          <p>
            Press below to simulate text extraction from scanned page. Replace this logic with your OCR engine.
          </p>
          <button onClick={handleExtractText}>Extract Text from Page (Demo)</button>
        </div>
      )}

      {/* Step 2: Show extracted text and select language */}
      {step >= 2 && (
        <div style={{ marginTop: 20 }}>
          <h3>Extracted Text Preview</h3>
          <textarea
            rows={8}
            style={{ width: "100%" }}
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
          />
          <div style={{ marginTop: 10 }}>
            <label>
              Select Language for Translation:{" "}
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ marginTop: 10 }}>
            <button onClick={handleTranslate} disabled={isTranslating}>
              {isTranslating ? "Translating..." : "Translate"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Show translated text */}
      {step === 3 && (
        <div style={{ marginTop: 30 }}>
          <h3>Translated Text Preview ({LANGUAGES.find((l) => l.code === targetLang)?.name})</h3>
          <textarea
            rows={8}
            style={{ width: "100%" }}
            value={translatedText}
            onChange={(e) => setTranslatedText(e.target.value)}
          />
          <div style={{ marginTop: 10 }}>
            <button onClick={() => alert("Proceed to content generation with translated text.")}>
              Proceed with Quiz / Summary Generation
            </button>
            <button style={{ marginLeft: 10 }} onClick={() => setStep(2)}>
              Back to Edit Extracted Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
