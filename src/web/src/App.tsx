import './App.scss';
import { DevOpsContextProvider } from './core/DevOpsContext';
import { MainActions } from './shared/MainActions';
import { PipelineList } from './pipelines/PipelineList';
import { Progress, ProgressContextProvider } from './shared/Progress';

function App() {
  return (
    <ProgressContextProvider>
      <DevOpsContextProvider>
        <Progress />
        <div className="app">
          <header className="app-header">
            <h1>DevOps Pipelines Panel</h1>
          </header>
          <MainActions />

          <PipelineList />
        </div>
      </DevOpsContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
