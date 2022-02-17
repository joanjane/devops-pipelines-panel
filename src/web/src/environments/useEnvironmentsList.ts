import { useCallback } from 'react';
import { devOpsApiClient } from '../api/DevOpsApiClient';
import { DevOpsEnvironmentList } from '../api/types';
import { useDevOpsContext } from '../core/DevOpsContext';

const envWhiteList = (process.env.REACT_APP_ENV_WHITELIST || '').split(',');

const pageSize = 50;
type useEnvironmentsListResult = {
  fetchEnvironments: () => Promise<string>;
  nextEnvironments: () => Promise<string>;
  fetchAllEnvironments: () => Promise<void>;
};
export const useEnvironmentsList = (): useEnvironmentsListResult => {
  const { devOpsAccount, environmentsState: { environments, setEnvironments } } = useDevOpsContext();

  const fetchEnvironments = useCallback(async () => {
    const envsResult = await devOpsApiClient.getEnvironments(devOpsAccount, null, pageSize);
    filterEnvironments(envsResult);
    setEnvironments({ ...envsResult, page: 0 });

    return envsResult.continuationToken;
  }, [devOpsAccount, setEnvironments]);

  const nextEnvironments = useCallback(async (continuationToken?: string) => {
    continuationToken = continuationToken ?? environments.continuationToken
    const envsResult = await devOpsApiClient.getEnvironments(devOpsAccount, continuationToken, pageSize);
    filterEnvironments(envsResult);

    setEnvironments(prev => ({ ...envsResult, value: [...prev.value, ...envsResult.value], page: prev.page + 1 }));

    return envsResult.continuationToken;
  }, [devOpsAccount, setEnvironments, environments.continuationToken]);

  const fetchAllEnvironments = useCallback(async () => {
    let nextToken = environments.continuationToken;
    if (environments.page < 0) {
      nextToken = await fetchEnvironments();
    }
    while (nextToken) {
      nextToken = await nextEnvironments(nextToken);
    }
  }, [fetchEnvironments, nextEnvironments, environments.page, environments.continuationToken]);

  return {
    fetchEnvironments,
    nextEnvironments,
    fetchAllEnvironments
  };
};

function filterEnvironments(envsResult: DevOpsEnvironmentList) {
  if (envWhiteList.length > 0) {
    envsResult.value = envsResult.value.filter(e => envWhiteList.includes(e.name));
  }
}
