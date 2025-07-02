import React, { useState, useEffect } from "react";

// Sample syllabus data (simplified)
const syllabusData = {
  CBSE: {
    Grade6: {
      Science: ["Photosynthesis", "Food Chains", "Plant Cells"],
      Math: ["Fractions", "Decimals"],
    },
    Grade7: {
      Science: ["Respiration", "Electricity"],
      Math: ["Algebra", "Geometry"],
    },
  },
  ICSE: {
    Grade6: {
      Science: ["Nutrition", "Light"],
      Math: ["Numbers", "Geometry Basics"],
    },
  },
};

function CombinedWorksheetGenerator() {
  const [board, setBoard] = useState("CBSE");
  const [grade, setGrade] = useState("Grade6");
  const [subject, setSubject] = useState("Science");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [uploadedText, setUploadedText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update topics when board/grade/subject changes
  useEffect(() => {
    const newTopics = syllabusData[board]?.[grade]?.[subject] || [];
    setTopics(newTopics);
    setSelectedTopic(newTopics[0] || "");
  }, [board, grade, subject]);

  // Simulate text extraction from file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate extraction, replace with actual OCR if implemented
    const simulatedExtractedText =
      "This is the extracted syllabus text from the uploaded file.";
    setUploadedText(simulatedExtractedText);

    // Clear custom and selected topics since we now have uploaded text
    setCustomTopic("");
    setSelectedTopic("");
  };

  const generatePrompt = () => {
    if (uploadedText.trim()) {
      return `Generate worksheet questions based on the following syllabus content:\n${uploadedText}`;
    }
    if (customTopic.trim()) {
      return `Generate worksheet questions for the topic: "${customTopic.trim()}"`;
    }
    if (selectedTopic) {
      return `Generate worksheet questions for the topic: "${selectedTopic}"`;
    }
    return "";
  };

  const handleGenerate = async () => {
    const prompt = generatePrompt();
    if (!prompt) {
      alert(
        "Please upload a syllabus file, enter a custom topic, or select a topic from the list."
      );
      return;
    }

    setLoading(true);
    setQuestions([]);

    try {
      const response = await fetch("http://localhost:5001/generate-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error(error);
      alert("Failed to generate worksheet. Try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>EdNet Combined Worksheet Generator</h2>

      <h3>Scan My Book / Upload Syllabus</h3>
      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      {uploadedText && (
        <textarea
          style={{ width: "100%", height: 80, marginTop: 8 }}
          readOnly
          value={uploadedText}
        />
      )}

      <hr style={{ margin: "20px 0" }} />

      <h3>Or select from syllabus</h3>

      <label>
        Board:{" "}
        <select
          value={board}
          onChange={(e) => setBoard(e.target.value)}
          style={{ marginBottom: 8 }}
        >
          {Object.keys(syllabusData).map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Grade:{" "}
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{ marginBottom: 8 }}
        >
          {Object.keys(syllabusData[board] || {}).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Subject:{" "}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginBottom: 8 }}
        >
          {Object.keys(syllabusData[board]?.[grade] || {}).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Topic:{" "}
        <select
          value={selectedTopic}
          onChange={(e) => {
            setSelectedTopic(e.target.value);
            setCustomTopic(""); // clear custom topic when selecting topic
            setUploadedText(""); // clear uploaded text too
          }}
          disabled={uploadedText.trim() !== ""}
          style={{ marginBottom: 12 }}
        >
          <option value="">-- Select a topic --</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Or enter custom topic:{" "}
        <input
          type="text"
          value={customTopic}
          onChange={(e) => {
            setCustomTopic(e.target.value);
            setSelectedTopic(""); // clear selected topic when typing custom
            setUploadedText(""); // clear uploaded text too
          }}
          placeholder="e.g. Photosynthesis"
          style={{ width: "100%", marginBottom: 12, padding: 4 }}
        />
      </label>

      <br />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Worksheet"}
      </button>

      <div style={{ marginTop: 20 }}>
        <h3>Generated Questions:</h3>
        {questions.length === 0 ? (
          <p>No questions generated yet.</p>
        ) : (
          <ol>
            {questions.map((q, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                {q}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default CombinedWorksheetGenerator;
