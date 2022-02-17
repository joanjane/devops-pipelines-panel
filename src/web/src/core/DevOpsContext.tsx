import { FC, createContext, useContext, useState } from 'react';
import { DevOpsAccount } from '../api/types';
import { useDeploymentsState, useDeploymentsStateResult } from './hooks/useDeploymentsState';
import { useEnvironmentsState, useEnvironmentsStateResult } from './hooks/useEnvironmentsState';
import { usePipelinesState, usePipelinesStateResult } from './hooks/usePipelinesState';

interface IDevOpsContext {
  devOpsAccount: DevOpsAccount;
  environmentsState: useEnvironmentsStateResult;
  deploymentsState: useDeploymentsStateResult;
  pipelinesState: usePipelinesStateResult;
}

const initialContext: IDevOpsContext = {
  devOpsAccount: null,
  pipelinesState: { pipelines: { count: 0, value: [], continuationToken: false }, addPipelines: null, clearPipelines: null },
  environmentsState: { environments: { count: 0, value: [], continuationToken: false }, addEnvironments: null, clearEnvironments: null },
  deploymentsState: { deployments: {}, addDeployment: null, clearDeployments: null },
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
