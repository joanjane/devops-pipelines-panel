import { useCallback } from 'react';
import { devOpsApiClient } from '../api/DevOpsApiClient';
import { useDevOpsContext } from '../core/DevOpsContext';

type useDeploymentsListResult = {
  fetchAllDeployments: () => Promise<void>;
};
export const useDeploymentsList = (): useDeploymentsListResult => {
  const {
    devOpsAccount,
    environmentsState: { environments },
    deploymentsState: { addDeployment, clearDeployments }
  } = useDevOpsContext();

  const getLastDeployment = useCallback(async (environmentId: number) => {
    const deployment = await devOpsApiClient.getEnvironmentDeployments(devOpsAccount, environmentId, null, 1);
    if (deployment.value[0]) {
      const deploy = deployment.value[0];
      addDeployment(environmentId, {
        id: deploy.id,
        name: deploy.name,
        stageName: deploy.stageName,
        environmentId: deploy.environmentId,
        result: deploy.result,
        pipelineUrl: deploy.owner._links.web.href,
        buildId: deploy.owner.id,
        buildName: deploy.owner.name,
      });
    }
  }, [devOpsAccount, addDeployment]);

  const fetchAllDeployments = useCallback(async () => {
    if (environments.page > 0 && !environments.continuationToken) {
      clearDeployments();
      let batchIndex = 0;
      let batchSize = 5;
      let batch;
      do {
        batch = paginate(environments.value, batchIndex, batchSize);
        await Promise.all(batch.map(b => getLastDeployment(b.id)));
        batchIndex++;
      } while(batch.length > 0);
    }
  }, [environments.page, environments.continuationToken, environments.value, clearDeployments, getLastDeployment]);

  return {
    fetchAllDeployments
  };
};

function paginate<T>(array: Array<T>, pageIndex: number, pageSize: number): Array<T> {
  return array.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
};