import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ParentPage from './pages/ParentPage';
import SamplesPreview from './pages/SamplesPreview';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/parent">Parent Page</Link> |{' '}
        <Link to="/samples">Samples Preview</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parent" element={<ParentPage />} />
        <Route path="/samples" element={<SamplesPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
