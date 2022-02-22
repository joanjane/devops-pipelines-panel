import { useCallback, useEffect, useState } from 'react';
import { DevOpsEnvironmentList } from '../api/types';

const localStorageEnvironmentsKey = 'environments.list';
export const initialState: DevOpsEnvironmentList = { count: 0, value: [], continuationToken: false };
export type useEnvironmentsStateResult = {
  environments: DevOpsEnvironmentList;
  addEnvironments: (environments: DevOpsEnvironmentList) => void;
  clearEnvironments: () => void;
}
export const useEnvironmentsState = (): useEnvironmentsStateResult => {
  const [environments, setEnvironments] = useState<DevOpsEnvironmentList>(initialState);

  useEffect(() => {
    const envs = localStorage.getItem(localStorageEnvironmentsKey);
    if (envs) {
      setEnvironments(JSON.parse(envs));
    }
  }, [setEnvironments]);

  useEffect(() => {
    localStorage.setItem(localStorageEnvironmentsKey, JSON.stringify(environments));
  }, [environments]);

  const addEnvironments = useCallback(async (pipelines: DevOpsEnvironmentList) => {
    setEnvironments(prev => {
      return {
        ...pipelines,
        value: [...prev.value, ...pipelines.value]
      };
    });
  }, [setEnvironments]);

  const clearEnvironments = useCallback(() => {
    localStorage.removeItem(localStorageEnvironmentsKey);
    setEnvironments(initialState);
  }, [setEnvironments]);

  return {
    environments,
    addEnvironments,
    clearEnvironments
  };
};