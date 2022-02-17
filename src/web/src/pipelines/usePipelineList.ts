import { useCallback } from 'react';
import { devOpsApiClient } from '../api/DevOpsApiClient';
import { useDevOpsContext } from '../core/DevOpsContext';

const pageSize = 50;
type usePipelineListResult = {
  fetchAllPipelines: () => Promise<void>;
};
export const usePipelineList = (): usePipelineListResult => {
  const {
    devOpsAccount,
    pipelinesState: { pipelines, addPipelines, clearPipelines }
  } = useDevOpsContext();

  const getPipelines = useCallback(async (continuationToken?: string) => {
    const pipelinesResponse = await devOpsApiClient.getPipelines(devOpsAccount, continuationToken, pageSize);
    addPipelines({
      ...pipelinesResponse,
      value: pipelinesResponse.value.map(p => ({
        id: p.id,
        name: p.name,
        folder: p.folder,
        pipelineUrl: p._links.web.href,
      }))
    });
    return pipelinesResponse.continuationToken;
  }, [devOpsAccount, addPipelines]);

  const fetchAllPipelines = useCallback(async () => {
    clearPipelines();
    let nextToken = pipelines.continuationToken;
    if (pipelines.page < 0) {
      nextToken = await getPipelines();
    }
    while (nextToken) {
      nextToken = await getPipelines(nextToken);
    }
  }, [pipelines.page, pipelines.continuationToken, clearPipelines, getPipelines]);

  return {
    fetchAllPipelines
  };
};
