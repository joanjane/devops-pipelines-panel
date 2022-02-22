import { useCallback, useEffect, useState } from 'react';
import { DevOpsPagedList } from '../api/types';

export type Pipeline = {
  id: number;
  name: string;
  pipelineUrl: string;
  folder: string;
};
const localStoragePipelinesKey = 'pipelines.list';

export const initialState: DevOpsPagedList<Pipeline> = { value: [], count: 0, continuationToken: false };
export type usePipelinesStateResult = {
  pipelines: DevOpsPagedList<Pipeline>;
  addPipelines: (deployment: DevOpsPagedList<Pipeline>) => void;
  clearPipelines: () => void;
};
export const usePipelinesState = (): usePipelinesStateResult => {
  const [pipelines, setPipelines] = useState<DevOpsPagedList<Pipeline>>(initialState);

  useEffect(() => {
    const envs = localStorage.getItem(localStoragePipelinesKey);
    if (envs) {
      setPipelines(JSON.parse(envs));
    }
  }, [setPipelines]);

  useEffect(() => {
    localStorage.setItem(localStoragePipelinesKey, JSON.stringify(pipelines));
  }, [pipelines]);

  const addPipelines = useCallback(async (pipelines: DevOpsPagedList<Pipeline>) => {
    setPipelines(prev => {
      return {
        ...pipelines,
        value: [...prev.value, ...pipelines.value]
      };
    });
  }, [setPipelines]);

  const clearPipelines = useCallback(() => {
    localStorage.removeItem(localStoragePipelinesKey);
    setPipelines(initialState);
  }, [setPipelines]);

  return {
    pipelines,
    addPipelines,
    clearPipelines
  };
};
