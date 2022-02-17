import { FC, createContext, useContext, useState, useCallback } from 'react';
import { DevOpsAccount, DevOpsEnvironmentList, DevOpsPagedList } from '../api/types';

interface IDevOpsContext {
  devOpsAccount: DevOpsAccount;
  environmentsState: useEnvironmentsStateResult;
  deploymentsState: useDeploymentsStateResult;
  pipelinesState: usePipelinesStateResult;
}

const initialContext: IDevOpsContext = {
  devOpsAccount: null,
  environmentsState: { environments: { count: 0, value: [], page: -1 }, setEnvironments: null },
  deploymentsState: { deployments: {}, addDeployment: null, clearDeployments: null },
  pipelinesState: { pipelines: { count: 0, value: [], page: -1 }, addPipelines: null, clearPipelines: null },
};

const DevOpsContext = createContext<IDevOpsContext>(initialContext);

export const DevOpsContextProvider: FC = ({ children }) => {
  const [devOpsAccount] = useState<DevOpsAccount>({
    organization: process.env.REACT_APP_DEVOPS_ORG,
    project: process.env.REACT_APP_DEVOPS_PROJECT,
    pat: process.env.REACT_APP_DEVOPS_PAT
  });

  const environmentsState = useEnvironmentsState();
  const deploymentsState = useDeploymentsState();
  const pipelinesState = usePipelinesState();
  return (
    <DevOpsContext.Provider value={{
      devOpsAccount,
      environmentsState,
      deploymentsState,
      pipelinesState
    }}>
      {children}
    </DevOpsContext.Provider>
  );
};

export const useDevOpsContext = (): IDevOpsContext => useContext(DevOpsContext);

type useEnvironmentsStateResult = {
  environments: DevOpsEnvironmentList;
  setEnvironments: React.Dispatch<React.SetStateAction<DevOpsEnvironmentList>>;
}
const useEnvironmentsState = (): useEnvironmentsStateResult => {
  const [environments, setEnvironments] = useState<DevOpsEnvironmentList>({ count: 0, value: [], page: -1 });

  return {
    environments,
    setEnvironments
  };
};

// Dictionary where key is pipelineId
type Deployment = {
  id: number;
  name: string;
  environmentId: number;
  stageName: string;
  result: 'succeeded' | 'failed' | 'inprogress';
  pipelineId: number;
  pipelineName: string;
  pipelineUrl: string;
  buildId: number;
  buildName: string;
};
type Deployments = Record<number, Deployment[]>;
type useDeploymentsStateResult = {
  deployments: Deployments;
  addDeployment: (deployment: Deployment) => void;
  clearDeployments: () => void;
};
const useDeploymentsState = (): useDeploymentsStateResult => {
  const [deployments, setDeployments] = useState<Deployments>({});

  const addDeployment = useCallback(async (deployment: Deployment) => {
    setDeployments(prev => {
      const envDeploys = prev[deployment.pipelineId] || [];
      return {
        ...prev,
        [deployment.pipelineId]: [...envDeploys, deployment]
      };
    });
  }, [setDeployments]);

  const clearDeployments = useCallback(() => {
    setDeployments({});
  }, [setDeployments]);

  return {
    deployments,
    addDeployment,
    clearDeployments
  };
};

type Pipeline = {
  id: number;
  name: string;
  pipelineUrl: string;
  folder: string;
};
type usePipelinesStateResult = {
  pipelines: DevOpsPagedList<Pipeline>;
  addPipelines: (deployment: DevOpsPagedList<Pipeline>) => void;
  clearPipelines: () => void;
};
const usePipelinesState = (): usePipelinesStateResult => {
  const [pipelines, setPipelines] = useState<DevOpsPagedList<Pipeline>>({ value: [], count: 0, page: -1 });

  const addPipelines = useCallback(async (pipelines: DevOpsPagedList<Pipeline>) => {
    setPipelines(prev => {
      return {
        ...pipelines,
        value: [...prev.value, ...pipelines.value]
      };
    });
  }, [setPipelines]);

  const clearPipelines = useCallback(() => {
    setPipelines({ value: [], count: 0, page: -1 });
  }, [setPipelines]);

  return {
    pipelines,
    addPipelines,
    clearPipelines
  };
};
