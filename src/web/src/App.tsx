import './App.css';
import { DevOpsContextProvider } from './core/DevOpsContext';
import { EnvironmentsList } from './environments/EnvironmentsList';

function App() {
  return (
    <DevOpsContextProvider>
      <div className="app">
        <header className="app-header">DevOps Pipelines Panel</header>
        <EnvironmentsList />
      </div>
    </DevOpsContextProvider>
  );
}

export default App;
