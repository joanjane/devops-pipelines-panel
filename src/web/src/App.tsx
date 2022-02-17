import './App.css';
import { DevOpsContextProvider } from './core/DevOpsContext';
import { MainActions } from './core/MainActions';
import { EnvironmentsList } from './environments/EnvironmentsList';
import { PipelineList } from './pipelines/PipelineList';

function App() {
  return (
    <DevOpsContextProvider>
      <div className="app">
        <header className="app-header">
          <h1>DevOps Pipelines Panel</h1>
        </header>
        <MainActions />

        <PipelineList />
        <EnvironmentsList />
      </div>
    </DevOpsContextProvider>
  );
}

export default App;
