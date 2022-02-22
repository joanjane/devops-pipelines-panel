/* eslint-disable no-loop-func */
import { useCallback, useEffect, useState } from 'react';
import { devOpsApiClient } from '../api/DevOpsApiClient';
import { useDevOpsContext } from '../core/DevOpsContext';
import { useProgress } from '../shared/Progress';

const batchSize = 5;

type useDeploymentsListResult = {
  fetchAllDeployments: () => Promise<void>;
  enabled: boolean;
};
export const useDeploymentsList = (): useDeploymentsListResult => {
  let [, setController] = useState<AbortController>();

  const {
    settings: { devOpsAccount },
    pipelinesState: { pipelines },
    environmentsState: { environments },
    deploymentsState: { addDeployment, clearDeployments }
  } = useDevOpsContext();
  const { trackPendingTasks, resolveProgressTask } = useProgress();
  const [loaded, setLoaded] = useState(false);

  const getLastDeployment = useCallback(async (environmentId: number, signal?: AbortSignal) => {
    const deployment = await devOpsApiClient.getEnvironmentDeployments(devOpsAccount, environmentId, {
      top: 1
    }, signal);
    if (deployment.value[0]) {
      const deploy = deployment.value[0];

      addDeployment({
        id: deploy.id,
        name: deploy.name,
        stageName: deploy.stageName,
        environmentId: deploy.environmentId,
        result: deploy.result,
        pipelineUrl: deploy.owner._links.web.href,
        pipelineId: deploy.definition.id,
        pipelineName: deploy.definition.name,
        buildId: deploy.owner.id,
        buildName: deploy.owner.name,
        startTime: deploy.startTime,
        pendingDeployments: false
      });
    }
  }, [devOpsAccount, addDeployment]);

  const fetchAllDeployments = useCallback(async () => {
    const environmentsLoaded = environments.continuationToken === null;
    if (environmentsLoaded) {
      const abortController = new AbortController();
      setController((prev) => {
        prev?.abort();
        return abortController;
      });
      clearDeployments();
      trackPendingTasks(true, environments.value.length);
      let batch;
      let batchIndex = 0;
      do {
        batch = paginate(environments.value, batchIndex, batchSize);
        await Promise.all(batch.map(b => getLastDeployment(b.id, abortController.signal).then(() => {
          resolveProgressTask();
        })));
        batchIndex++;
      } while (batch.length > 0);
    } else {
      console.log('Skip loading deployments as environments are not synced yet');
    }
  }, [
    environments.continuationToken,
    environments.value,
    clearDeployments,
    getLastDeployment,
    trackPendingTasks,
    resolveProgressTask,
    setController]);

  useEffect(() => {
    if (!loaded && pipelines.continuationToken == null && environments.continuationToken == null) {
      setLoaded(true);
      fetchAllDeployments();
    }
  }, [environments, pipelines, loaded, fetchAllDeployments]);

  return {
    fetchAllDeployments,
    enabled: pipelines.continuationToken == null && environments.continuationToken == null
  };
};

function paginate<T>(array: Array<T>, pageIndex: number, pageSize: number): Array<T> {
  return array.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
};