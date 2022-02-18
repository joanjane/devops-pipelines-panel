import './index.scss';
import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';

interface IProgressContext {
  progress: number,
  trackPendingTasks: (clear?: boolean, tasks?: number) => void,
  resolveProgressTask: (resolved?: number) => void,
  clearProgressTasks: () => void
}

const initialContext: IProgressContext = {
  progress: 0,
  trackPendingTasks: () => { },
  resolveProgressTask: () => { },
  clearProgressTasks: () => { }
};

const ProgressContext = createContext<IProgressContext>(initialContext);
export const ProgressContextProvider: FC = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);
  const [progressTrack, setProgressTrack] = useState<{ tasks: number, resolved: number }>({
    tasks: 0,
    resolved: 0
  });

  const trackPendingTasks = useCallback((clear = false, tasks = 1) => {
    if (clear) {
      setProgressTrack({
        tasks: tasks,
        resolved: 0
      });
    } else {
      setProgressTrack(prev => ({
        tasks: prev.tasks + tasks,
        resolved: prev.resolved
      }));
    }
  }, [setProgressTrack]);

  const resolveProgressTask = useCallback((resolved = 1) => {
    setProgressTrack(prev => ({
      tasks: prev.tasks,
      resolved: prev.resolved + resolved
    }))
  }, [setProgressTrack]);

  const clearProgressTasks = useCallback(() => {
    setProgressTrack({ tasks: 0, resolved: 0 });
    setProgress(0);
  }, [setProgressTrack]);

  useEffect(() => {
    if (progressTrack.tasks) {
      setProgress(progressTrack.resolved / progressTrack.tasks);
    }
  }, [progressTrack, setProgress]);

  return (
    <ProgressContext.Provider value={{
      progress,
      trackPendingTasks,
      resolveProgressTask,
      clearProgressTasks
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): IProgressContext => useContext(ProgressContext);

export const Progress: FC<{}> = () => {
  const { progress } = useProgress();
  return (
    <div className="app-progress" hidden={progress === 0 || progress >= 1}>
      <div
        className="app-progress__fill"
        style={({ width: `${Math.floor(progress * 100)}%` })}
        aria-label={`${Math.floor(progress * 100)}%`}
      />
    </div>
  );
};

