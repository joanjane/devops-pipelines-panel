import { useCallback, useState } from 'react';
import { PipelineResult } from '../../api/types';

export type Deployment = {
  id: number;
  name: string;
  environmentId: number;
  stageName: string;
  result: PipelineResult;
  pipelineId: number;
  pipelineName: string;
  pipelineUrl: string;
  buildId: number;
  buildName: string;
  startTime: string;
};
// Dictionary where key is pipelineId
export type Deployments = Record<number, Deployment[]>;

const initialState: Deployments = {};

export type useDeploymentsStateResult = {
  deployments: Deployments;
  addDeployment: (deployment: Deployment) => void;
  clearDeployments: () => void;
};
export const useDeploymentsState = (): useDeploymentsStateResult => {
  const [deployments, setDeployments] = useState<Deployments>(initialState);

  const addDeployment = useCallback(async (deployment: Deployment) => {
    setDeployments(prev => {
      const envDeploys = prev[deployment.pipelineId] || [];
      return {
        ...prev,
        [deployment.pipelineId]: [...envDeploys, deployment].sort(sortDeployments)
      };
    });
  }, [setDeployments]);

  const clearDeployments = useCallback(() => {
    setDeployments(initialState);
  }, [setDeployments]);

  return {
    deployments,
    addDeployment,
    clearDeployments
  };
};

function sortDeployments(a: Deployment, b: Deployment): number {
  // show new runs first
  if (a.buildName === b.buildName) {
    return a.startTime > b.startTime ? 1 : -1;
  } else {
    return a.buildName <= b.buildName ? 1 : -1;
  }
}