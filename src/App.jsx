import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import GamesPage from "./GamesPage";
import WorksheetGenerator from "./WorksheetGenerator";
import ScanMyBook from "./ScanMyBook";
import SyllabusUploader from "./SyllabusUploader";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/games">Games</Link> |{" "}
        <Link to="/worksheets">Worksheet Generator</Link> |{" "}
        <Link to="/scan">Scan My Book</Link> |{" "}
        <Link to="/upload-syllabus">Upload Syllabus</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/worksheets" element={<WorksheetGenerator />} />
        <Route path="/scan" element={<ScanMyBook />} />
        <Route path="/upload-syllabus" element={<SyllabusUploader />} />
      </Routes>
    </Router>
  );
}

export default App;
