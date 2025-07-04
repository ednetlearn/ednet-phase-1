import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import GamesPage from "./GamesPage";
import WorksheetGenerator from "./WorksheetGenerator";
import ScanAndGameZoneUI from "./ScanAndGameZoneUI";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#e8f4ff" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/games" style={{ margin: "0 10px" }}>Games</Link>
        <Link to="/worksheets" style={{ margin: "0 10px" }}>Worksheet Generator</Link>
        <Link to="/scan" style={{ margin: "0 10px" }}>Scan & Game Zone</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/worksheets" element={<WorksheetGenerator />} />
        <Route path="/scan" element={<ScanAndGameZoneUI />} />
      </Routes>
    </Router>
  );
}

export default App;

