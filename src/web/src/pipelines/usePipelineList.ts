import { useCallback } from 'react';
import { devOpsApiClient } from '../api/DevOpsApiClient';
import { useDevOpsContext } from '../core/DevOpsContext';
import { Pipeline } from './usePipelinesState';

const foldersWhitelist = (process.env.REACT_APP_PIPELINES_FOLDERS_WHITELIST || '').split(',').filter(s => s !== '');

const pageSize = 50;
type usePipelineListResult = {
  fetchAllPipelines: () => Promise<void>;
};
export const usePipelineList = (): usePipelineListResult => {
  const {
    devOpsAccount,
    pipelinesState: { addPipelines, clearPipelines }
  } = useDevOpsContext();

  const getPipelines = useCallback(async (continuationToken: string | false) => {
    const nextToken = continuationToken === false ? null : continuationToken;
    const pipelinesResponse = await devOpsApiClient.getPipelines(devOpsAccount, {
      continuationToken: nextToken,
      top: pageSize
    });

    addPipelines({
      ...pipelinesResponse,
      value: filterPipelines(pipelinesResponse.value.map(p => ({
        id: p.id,
        name: p.name,
        folder: p.folder,
        pipelineUrl: p._links.web.href,
      })))
    });
    return pipelinesResponse.continuationToken;
  }, [devOpsAccount, addPipelines]);

  const fetchAllPipelines = useCallback(async () => {
    clearPipelines();
    let nextToken = await getPipelines(false);
    while (nextToken) {
      nextToken = await getPipelines(nextToken);
    }
  }, [clearPipelines, getPipelines]);

  return {
    fetchAllPipelines
  };
};


function filterPipelines(pipelines: Pipeline[]): Pipeline[] {
  if (foldersWhitelist.length > 0) {
    return pipelines.filter(e => foldersWhitelist.includes(e.folder));
  }
}
