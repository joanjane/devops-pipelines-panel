import { FC, createContext, useContext, useState, useCallback } from 'react';
import { DevOpsAccount, DevOpsEnvironmentList } from '../api/types';

interface IDevOpsContext {
  devOpsAccount: DevOpsAccount;
  environmentsState: useEnvironmentsStateResult;
  deploymentsState: useDeploymentsStateResult;
}

const initialContext: IDevOpsContext = {
  devOpsAccount: null,
  environmentsState: { environments: { count: 0, value: [], page: -1 }, setEnvironments: null },
  deploymentsState: { deployments: { }, addDeployment: null, clearDeployments: null }
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
  return (
    <DevOpsContext.Provider value={{
      devOpsAccount,
      environmentsState,
      deploymentsState
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

// Dictionary where key is environmentId
type Deployment = {
  id: number;
  name: string;
  environmentId: number;
  stageName: string;
  result: 'succeeded' | 'failed';
  pipelineUrl: string;
  buildId: number;
  buildName: string;
};
type Deployments = Record<number, Deployment[]>;
type useDeploymentsStateResult = {
  deployments: Deployments;
  addDeployment: (environmentId: number, deployment: Deployment) => void;
  clearDeployments: () => void;
};
const useDeploymentsState = (): useDeploymentsStateResult => {
  const [deployments, setDeployments] = useState<Deployments>({});

  const addDeployment = useCallback(async (environmentId: number, deployment: Deployment) => {
    setDeployments(prev => {
      const envDeploys = prev[environmentId] || [];
      return {
        ...prev,
        [environmentId]: [...envDeploys, deployment]
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
