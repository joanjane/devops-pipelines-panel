import { FC } from 'react';
import { usePipelineList } from '../pipelines/usePipelineList';
import { useEnvironmentsList } from '../environments/useEnvironmentsList';
import { useDeploymentsList } from '../deployments/useDeploymentsList';

export const MainActions: FC<{}> = () => {
  const { fetchAllPipelines } = usePipelineList();
  const { fetchAllEnvironments } = useEnvironmentsList();
  const { fetchAllDeployments } = useDeploymentsList();
  return (
    <div className="app-actions">
      <button type="button" onClick={() => {
        fetchAllPipelines();
        fetchAllEnvironments();
      }}>🔄 Sync</button>

      <button type="button" onClick={() => fetchAllDeployments()}>Get deployments</button>
    </div>
  );
};