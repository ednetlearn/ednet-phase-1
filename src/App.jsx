import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Parent from './Pages/Parent';
import Register from './Pages/Register';
import Samples from './Pages/Samples';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/parent" style={{ marginRight: '10px' }}>Parent</Link>
        <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        <Link to="/samples">Samples</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/samples" element={<Samples />} />
      </Routes>
    </Router>
  );
}

export default App;
