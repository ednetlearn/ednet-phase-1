import React, { useState } from 'react';
import WorksheetGenerator from './WorksheetGenerator';
import ScanMyBook from './ScanMyBook';

const CombinedWorksheetGenerator = () => {
  const [activeTab, setActiveTab] = useState('manual');

  return (
    <div>
      <h1>Worksheet Zone</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('manual')}>Manual Worksheet</button>
        <button onClick={() => setActiveTab('scan')}>Scan My Book</button>
      </div>
      <div>
        {activeTab === 'manual' && <WorksheetGenerator />}
        {activeTab === 'scan' && <ScanMyBook />}
      </div>
    </div>
  );
};

export default CombinedWorksheetGenerator;
