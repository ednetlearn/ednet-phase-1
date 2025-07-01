import React from 'react';
import { lastUpdated } from './lastUpdated';  // Import lastUpdated

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the EdNet application!</p>
    <p>Use the navigation links above to explore.</p>
    <p style={{ marginTop: '1.5em', fontStyle: 'italic', color: '#555' }}>
      Last Updated: {lastUpdated}
    </p>  {/* Display Last Updated info */}
  </div>
);

export default Home;
