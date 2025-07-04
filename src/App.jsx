import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ParentPage from './pages/ParentPage';
import Register from './pages/Register';
import SamplesPreview from './pages/SamplesPreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parent" element={<ParentPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/samples" element={<SamplesPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
