import { useCallback, useState } from 'react';
import { DevOpsEnvironmentList } from '../api/types';

export const initialState: DevOpsEnvironmentList = { count: 0, value: [], continuationToken: false };
export type useEnvironmentsStateResult = {
  environments: DevOpsEnvironmentList;
  addEnvironments: (environments: DevOpsEnvironmentList) => void;
  clearEnvironments: () => void;
}
export const useEnvironmentsState = (): useEnvironmentsStateResult => {
  const [environments, setEnvironments] = useState<DevOpsEnvironmentList>(initialState);

  const addEnvironments = useCallback(async (pipelines: DevOpsEnvironmentList) => {
    setEnvironments(prev => {
      return {
        ...pipelines,
        value: [...prev.value, ...pipelines.value]
      };
    });
  }, [setEnvironments]);

  const clearEnvironments = useCallback(() => {
    setEnvironments(initialState);
  }, [setEnvironments]);

  return {
    environments,
    addEnvironments,
    clearEnvironments
  };
};