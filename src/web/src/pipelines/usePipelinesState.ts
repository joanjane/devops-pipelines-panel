import { useCallback, useState } from 'react';
import { DevOpsPagedList } from '../api/types';

export type Pipeline = {
  id: number;
  name: string;
  pipelineUrl: string;
  folder: string;
};

export const initialState: DevOpsPagedList<Pipeline> = { value: [], count: 0, continuationToken: false };
export type usePipelinesStateResult = {
  pipelines: DevOpsPagedList<Pipeline>;
  addPipelines: (deployment: DevOpsPagedList<Pipeline>) => void;
  clearPipelines: () => void;
};
export const usePipelinesState = (): usePipelinesStateResult => {
  const [pipelines, setPipelines] = useState<DevOpsPagedList<Pipeline>>(initialState);

  const addPipelines = useCallback(async (pipelines: DevOpsPagedList<Pipeline>) => {
    setPipelines(prev => {
      return {
        ...pipelines,
        value: [...prev.value, ...pipelines.value]
      };
    });
  }, [setPipelines]);

  const clearPipelines = useCallback(() => {
    setPipelines(initialState);
  }, [setPipelines]);

  return {
    pipelines,
    addPipelines,
    clearPipelines
  };
};
