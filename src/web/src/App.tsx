import React, { useState } from 'react';
import './App.css';
import { devOpsApiClient } from './api';
import { DevOpsEnvironmentList } from './api/types';

function App() {
  const [environments, setEnvironments] = useState<DevOpsEnvironmentList>({ count: 0, value: [] });
  
  const fetchEnvironments = async () => {
    const envsResult = await devOpsApiClient.fetchEnvironments();
    setEnvironments(envsResult);
  };

  return (
    <div className="app">
      <header className="app-header">DevOps Pipelines Panel</header>
      <button onClick={() => fetchEnvironments()}>Get environments</button>

      {environments.value.map(e => <div>
        <span>{e.name}</span>
      </div>)}
    </div>
  );
}

export default App;
