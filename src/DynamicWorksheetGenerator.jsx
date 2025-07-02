import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

const boards = ["CBSE", "ICSE", "NCERT", "International"];
const activities = [
  "Logical Reasoning",
  "Chess Puzzles",
  "Word Puzzles",
  "Number Games",
  "Brain Teasers",
  "Mazes",
  "Colour the Picture",
  "Solve the Riddle",
  "Block Coding Puzzles",
];

export default function DynamicWorksheetGenerator() {
  // Worksheet generator states
  const [board, setBoard] = useState("");
  const [manualTopic, setManualTopic] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [worksheetQuestions, setWorksheetQuestions] = useState([]);
  const [isGeneratingWorksheet, setIsGeneratingWorksheet] = useState(false);

  // Activity generator states
  const [selectedActivity, setSelectedActivity] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(10);
  const [activityItems, setActivityItems] = useState([]);
  const [isGeneratingActivity, setIsGeneratingActivity] = useState(false);

  // Ref for printable area
  const worksheetRef = useRef();
  const activityRef = useRef();

  // Build prompt preview for worksheet
  useEffect(() => {
    if (!board && !manualTopic && !uploadedFile) {
      setPrompt("");
      return;
    }
    let p = `Generate worksheet questions`;
    if (manualTopic) p += ` on the topic: "${manualTopic}"`;
    if (board) p += ` for the ${board} board`;
    if (uploadedFile) p += `. Content from uploaded syllabus file should be considered.`;
    p += `. Include varied question types suitable for the topic.`;
    setPrompt(p);
  }, [board, manualTopic, uploadedFile]);

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    } else {
      setUploadedFile(null);
    }
  };

  // Enable conditions for generate buttons
  const canGenerateWorksheet =
    prompt.trim().length > 0;

  const canGenerateActivity = selectedActivity !== "";

  // Simulated worksheet generation
  const generateWorksheet = () => {
    if (!canGenerateWorksheet) return;
    setIsGeneratingWorksheet(true);

    setTimeout(() => {
      setWorksheetQuestions([
        `Explain the main points of the topic.`,
        `Provide 3 multiple choice questions.`,
        `Write a short answer question.`,
        `List important keywords related to the topic.`,
      ]);
      setIsGeneratingWorksheet(false);
    }, 1500);
  };

  // Simulated activity generation
  const generateActivity = () => {
    if (!canGenerateActivity) return;
    setIsGeneratingActivity(true);

    setTimeout(() => {
      const items = [];
      for (let i = 1; i <= numQuestions; i++) {
        items.push(`${selectedActivity} Question ${i}`);
      }
      setActivityItems(items);
      setIsGeneratingActivity(false);
    }, 1500);
  };

  // Print content by ref
  const handlePrint = (ref) => {
    if (!ref.current) return;
    const printContents = ref.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Download content as PDF using html2pdf
  const handleDownloadPdf = (ref, filename) => {
    if (!ref.current) return;
    html2pdf().from(ref.current).set({
      margin: 1,
      filename: filename,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }).save();
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Dynamic Worksheet Generator</h2>

      {/* Worksheet Generator Section */}
      <div style={{ border: "1px solid #ccc", padding: 15, marginBottom: 40 }}>
        <h3>Worksheet Generator</h3>

        <div>
          <label>
            Select Board:{" "}
            <select value={board} onChange={(e) => setBoard(e.target.value)}>
              <option value="">--Select Board--</option>
              {boards.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>
            Enter Topic Manually:{" "}
            <input
              type="text"
              value={manualTopic}
              onChange={(e) => setManualTopic(e.target.value)}
              placeholder="Type your topic here"
              style={{ width: "70%" }}
            />
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>
            Upload Syllabus File:{" "}
            <input type="file" onChange={handleFileChange} />
            {uploadedFile && (
              <span style={{ marginLeft: 10 }}>{uploadedFile.name}</span>
            )}
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>
            AI Prompt Preview (editable):<br />
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <button
          onClick={generateWorksheet}
          disabled={!canGenerateWorksheet || isGeneratingWorksheet}
          style={{ marginTop: 10 }}
        >
          {isGeneratingWorksheet ? "Generating..." : "Generate Worksheet"}
        </button>

        {/* Preview & actions */}
        <div
          ref={worksheetRef}
          style={{
            marginTop: 30,
            padding: 10,
            border: "1px solid #aaa",
            minHeight: 120,
          }}
        >
          <h4>Generated Worksheet Preview:</h4>
          {worksheetQuestions.length === 0 ? (
            <p>No questions generated yet.</p>
          ) : (
            <ul>
              {worksheetQuestions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ marginTop: 10 }}>
          <button onClick={() => handlePrint(worksheetRef)}>Print Worksheet</button>
          <button
            onClick={() => handleDownloadPdf(worksheetRef, "worksheet.pdf")}
            style={{ marginLeft: 10 }}
          >
            Download Worksheet (PDF)
          </button>
        </div>
      </div>

      {/* Activity Generator Section */}
      <div style={{ border: "1px solid #ccc", padding: 15 }}>
        <h3>Activity Generator</h3>

        <div>
          <label>
            Select Activity:{" "}
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
            >
              <option value="">--Select Activity--</option>
              {activities.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>
            Number of Questions:{" "}
            <input
              type="number"
              min={1}
              max={100}
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
            />
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>
            Time Limit (minutes):{" "}
            <input
              type="number"
              min={1}
              max={180}
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            />
          </label>
        </div>

        <button
          onClick={generateActivity}
          disabled={!canGenerateActivity || isGeneratingActivity}
          style={{ marginTop: 10 }}
        >
          {isGeneratingActivity ? "Generating..." : "Generate Activity"}
        </button>

        {/* Preview & actions */}
        <div
          ref={activityRef}
          style={{
            marginTop: 30,
            padding: 10,
            border: "1px solid #aaa",
            minHeight: 120,
          }}
        >
          <h4>Generated Activity Preview:</h4>
          {activityItems.length === 0 ? (
            <p>Select an activity to see a sample preview.</p>
          ) : (
            <ul>
              {activityItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ marginTop: 10 }}>
          <button onClick={() => handlePrint(activityRef)}>Print Activity</button>
          <button
            onClick={() => handleDownloadPdf(activityRef, "activity.pdf")}
            style={{ marginLeft: 10 }}
          >
            Download Activity (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
