import './App.css';
import { DevOpsContextProvider } from './core/DevOpsContext';
import { MainActions } from './shared/MainActions';
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
      </div>
    </DevOpsContextProvider>
  );
}

export default App;
