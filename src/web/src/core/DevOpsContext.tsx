import { FC, createContext, useContext } from 'react';
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
import { useSettingsState, useSettingsStateResult } from './Settings/useSettingsState';

interface IDevOpsContext {
  settings: useSettingsStateResult;
  environmentsState: useEnvironmentsStateResult;
  deploymentsState: useDeploymentsStateResult;
  pipelinesState: usePipelinesStateResult;
}

const stub = () => { };

const initialContext: IDevOpsContext = {
  settings: {
    devOpsAccount: null,
    setDevOpsAccount: stub
  },
  pipelinesState: {
    pipelines: pipelinesInitialState,
    addPipelines: stub,
    clearPipelines: stub
  },
  environmentsState: {
    environments: environmentsInitialState,
    addEnvironments: stub,
    clearEnvironments: stub
  },
  deploymentsState: {
    deployments: deploymentsInitialState,
    addDeployment: stub,
    clearDeployments: stub
  },
};
const DevOpsContext = createContext<IDevOpsContext>(initialContext);

export const DevOpsContextProvider: FC = ({ children }) => {
  const settings = useSettingsState();

  const environmentsState = useEnvironmentsState();
  const deploymentsState = useDeploymentsState();
  const pipelinesState = usePipelinesState();

  return (
    <DevOpsContext.Provider value={{
      settings,
      environmentsState,
      deploymentsState,
      pipelinesState
    }}>
      {children}
    </DevOpsContext.Provider>
  );
};

export const useDevOpsContext = (): IDevOpsContext => useContext(DevOpsContext);
