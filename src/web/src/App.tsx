import './App.css';
import { DevOpsContextProvider } from './core/DevOpsContext';
import { EnvironmentsList } from './environments/EnvironmentsList';

function App() {
  return (
    <DevOpsContextProvider>
      <div className="app">
        <header className="app-header">
          <h1>DevOps Pipelines Panel</h1>
        </header>

        <EnvironmentsList />
      </div>
    </DevOpsContextProvider>
  );
}

export default App;
