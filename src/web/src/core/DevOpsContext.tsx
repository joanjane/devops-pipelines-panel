import { FC, createContext, useContext, useState } from 'react';
import { DevOpsAccount } from '../api/types';
import {
  useDeploymentsState,
  useDeploymentsStateResult,
  initialState as deploymentsInitialState
} from '../deployments/useDeploymentsState';
import {
  useEnvironmentsState,
  useEnvironmentsStateResult,
  initialState as environmentsInitialState
} from '../environments/useEnvironmentsState';
import {
  usePipelinesState,
  usePipelinesStateResult,
  initialState as pipelinesInitialState
} from '../pipelines/usePipelinesState';

interface IDevOpsContext {
  devOpsAccount: DevOpsAccount;
  environmentsState: useEnvironmentsStateResult;
  deploymentsState: useDeploymentsStateResult;
  pipelinesState: usePipelinesStateResult;
}

const stub = () => { };

const initialContext: IDevOpsContext = {
  devOpsAccount: null,
  pipelinesState: { pipelines: pipelinesInitialState, addPipelines: stub, clearPipelines: stub },
  environmentsState: { environments: environmentsInitialState, addEnvironments: stub, clearEnvironments: stub },
  deploymentsState: { deployments: deploymentsInitialState, addDeployment: stub, clearDeployments: stub },
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
