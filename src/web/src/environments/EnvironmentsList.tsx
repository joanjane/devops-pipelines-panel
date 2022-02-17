import './EnvironmentsList.css';

import { FC } from 'react';
import { useDevOpsContext } from '../core/DevOpsContext';
import { EnvironmentDeployments } from '../deployments/EnvironmentDeployments';
import { useDeploymentsList } from '../deployments/useDeploymentsList';
import { useEnvironmentsList } from './useEnvironmentsList';

export const EnvironmentsList: FC<{}> = () => {
  const { environmentsState: { environments } } = useDevOpsContext();
  const { nextEnvironments, fetchAllEnvironments } = useEnvironmentsList();
  const { fetchAllDeployments } = useDeploymentsList();

  return (
    <div className="app-environments">
      <div className="app-environments__actions">
        <button type="button" onClick={() => fetchAllEnvironments()}>Get all environments</button>
        <button type="button" onClick={() => fetchAllDeployments()}>Get all deployments</button>
      </div>

      {environments.value.map(e => <div className="app-environments__item" key={e.id}>
        <strong>{e.name}</strong>
        <EnvironmentDeployments environmentId={e.id} />
      </div>)}

      {environments.continuationToken &&
        <button type="button" onClick={() => nextEnvironments()}>Load next</button>}
    </div>
  );
}