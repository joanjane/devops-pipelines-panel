import { useCallback } from 'react';
import { devOpsApiClient } from '../api/DevOpsApiClient';
import { DevOpsEnvironmentList } from '../api/types';
import { useDevOpsContext } from '../core/DevOpsContext';

const envWhiteList = (process.env.REACT_APP_ENV_WHITELIST || '').split(',').filter(s => s !== '');

const pageSize = 50;
type useEnvironmentsListResult = {
  fetchEnvironments: (continuationToken: string | false) => Promise<string | false>;
  fetchAllEnvironments: () => Promise<void>;
};
export const useEnvironmentsList = (): useEnvironmentsListResult => {
  const { devOpsAccount, environmentsState: { addEnvironments, clearEnvironments } } = useDevOpsContext();

  const fetchEnvironments = useCallback(async (continuationToken: string | false) => {
    const nextToken = continuationToken === false ? null : continuationToken;
    const envsResult = await devOpsApiClient.getEnvironments(devOpsAccount, {
      continuationToken: nextToken,
      top: pageSize
    });
    filterEnvironments(envsResult);
    addEnvironments(envsResult);
    return envsResult.continuationToken;
  }, [devOpsAccount, addEnvironments]);

  const fetchAllEnvironments = useCallback(async () => {
    clearEnvironments();
    let nextToken = await fetchEnvironments(false);
    while (nextToken) {
      nextToken = await fetchEnvironments(nextToken);
    }
  }, [clearEnvironments, fetchEnvironments]);

  return {
    fetchEnvironments,
    fetchAllEnvironments
  };
};

function filterEnvironments(envsResult: DevOpsEnvironmentList) {
  if (envWhiteList.length > 0) {
    envsResult.value = envsResult.value.filter(e => envWhiteList.includes(e.name));
  }
}
